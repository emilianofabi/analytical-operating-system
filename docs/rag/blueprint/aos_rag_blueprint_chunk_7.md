# AOS RAG Blueprint — Chunk 7: Retrieval Architecture and Ranking Engine

---

> **Continuity from Chunks 0–6**: Chunk 0 established the RAG blueprint. Chunk 1 described the lifecycle and evidence classes. Chunk 2 cataloged failure modes and controls. Chunk 3 mapped source authority tiers. Chunk 4 designed the registry. Chunk 5 defined directory exclusions. Chunk 6 detailed the chunking rules and manifest. Chunk 7 now designs the retrieval pipeline and ranking engine that queries this manifest.

---

## 7.0 — The Two-Stage Retrieval Pipeline

To prevent **FM-04 (Private Data Leakage)** and **FM-07 (Authority-Blind Retrieval)**, AOS RAG enforces a strict separation between **filtration** and **ranking**. The pipeline executes in two distinct stages:

```
        Input Query (User or Agent)
                     │
                     ▼
  ┌─────────────────────────────────────┐
  │ Stage 1: Metadata Filtration        │
  │ - Strip Tier 6 (Excluded) paths     │  ◄── Enforces security and
  │ - Filter by Agent Lane permissions  │      privacy boundaries (no read)
  │ - Apply Visibility constraint       │
  └──────────────────┬──────────────────┘
                     │
                     ▼ Valid Candidate Chunks
  ┌─────────────────────────────────────┐
  │ Stage 2: Similarity & Weighting     │
  │ - Run local BM25 keyword matching   │  ◄── Calculates topical match
  │ - Apply Configurable Authority modifier│  ◄── Weights by evidence tier
  │ - Deduct dynamic Staleness penalty  │  ◄── Penalizes stale status files
  └──────────────────┬──────────────────┘
                     │
                     ▼ Sorted Candidates
  ┌─────────────────────────────────────┐
  │ Rank List Pruning & Budgets         │
  │ - Trim to Top-K                     │  ◄── Fits context limits
  │ - Validate Claim Eligibility (Cls 5)│  ◄── Rejects low-class evidence
  └──────────────────┬──────────────────┘
                     │
                     ▼
        Final Context to Agent Prompt
```

---

## 7.1 — Stage 1: Metadata Filtration Rules

Before any text matching occurs, the retriever scans the query metadata context and filters the chunk list from `rag/chunk_manifest.json` against these rules:

1. **Exclusion Hard-Boundary**: Chunks with `authority_tier: 6` (or file paths matching the structural exclusion list) are stripped from the candidate list. No keyword matches can override this.
2. **Visibility Scoping**:
   - If the system flags the request as **public-facing**, only chunks with `visibility: "public"` are retained.
   - If internal, both `public` and `internal` chunks are allowed.
   - `visibility: "private"` chunks are always blocked (Tier 6).
3. **Agent Lane Scoping (FM-12 Prevention)**:
   - If the calling agent's ID is provided, the retriever filters out unauthorized source types (e.g., if the **Artifact Generator** is calling, rubrics and templates are allowed, but audit verdicts are removed).
4. **Lifecycle Exclusions**:
   - Chunks from files marked `lifecycle_status: "deprecated"` are stripped.

---

## 7.2 — Stage 2: BM25/Keyword Retrieval

AOS RAG v0.1 implements a local, pure-python BM25 ranking algorithm. This avoids database dependencies and allows execution inside local environments.

### BM25 Formulation
For a query $q$ containing terms $t_1, t_2, \dots, t_n$, the similarity score of a chunk $c$ is calculated as:

$$\text{Similarity}(c, q) = \sum_{i=1}^{n} \text{IDF}(t_i) \cdot \frac{f(t_i, c) \cdot (k_1 + 1)}{f(t_i, c) + k_1 \cdot \left(1 - b + b \cdot \frac{|c|}{\text{avgdl}}\right)}$$

Where:
- $f(t_i, c)$ is the term frequency of term $t_i$ inside chunk $c$ (including the injected heading context breadcrumbs).
- $|c|$ is the length of chunk $c$ in characters.
- $\text{avgdl}$ is the average chunk length across all chunks in the manifest.
- $k_1$ is the term frequency saturation parameter (default: $1.2$).
- $b$ is the length normalization parameter (default: $0.75$).
- $\text{IDF}(t_i)$ is calculated as:

$$\text{IDF}(t_i) = \ln \left( \frac{N - n(t_i) + 0.5}{n(t_i) + 0.5} + 1 \right)$$

Where $N$ is the total number of chunks and $n(t_i)$ is the number of chunks containing term $t_i$.

---

## 7.3 — Query Classification Logic

To ensure the ranking engine weights authority correctly, the incoming query must be classified. AOS RAG implements a local rule-based query classifier (`tools/rag/query_classifier.py`):

```
       Query Text
           │
           ├─► Matches "can I claim", "resume", "portfolio", "competency"? ─► CAREER_CLAIM
           │
           ├─► Matches "status", "current state", "complete", "progress"?  ─► STATUS_STATE
           │
           ├─► Matches "how to", "explain", "what is", "concept"?          ─► CONCEPT_LEARNING
           │
           └─► Matches "script", "run", "ops", "runner", "command"?        ─► OPS_TOOLING
```

### Classification Impact on Authority Multipliers:
The classifier assigns a query type token, which dictates which modifier matrix to load from the configuration file.

---

## 7.4 — Mathematical Ranking Formula (Resolves UQ14)

The final score for a candidate chunk $c$ given a classified query $q$ of type $T$ is computed as:

$$\text{Score}(c, q) = \text{Similarity}(c, q) \cdot \left[ \text{BaseWeight}(tier) \cdot \text{QueryModifier}(T, tier) \cdot \text{FreshnessFactor}(c) \right]$$

### Tunable Configuration: `rag/retrieval_config.json`

**Decision**: All base weights, query modifiers, and BM25 parameters must be stored in a JSON configuration file. This permits automated parameter optimization during evaluations without touching the core search scripts.

```json
{
  "$schema": "https://aos.local/schemas/retrieval_config.schema.json",
  "bm25_params": {
    "k1": 1.2,
    "b": 0.75,
    "heading_boost": 1.5
  },
  "base_authority_weights": {
    "tier_1": 1.0,
    "tier_2": 0.8,
    "tier_3": 0.5,
    "tier_4": 0.3,
    "tier_5": 0.2,
    "tier_6": 0.0
  },
  "query_type_modifiers": {
    "CAREER_CLAIM": {
      "tier_1": 1.5,
      "tier_2": 0.5,
      "tier_3": 0.3,
      "tier_4": 0.1,
      "tier_5": 0.0
    },
    "STATUS_STATE": {
      "tier_1": 1.2,
      "tier_2": 1.0,
      "tier_3": 0.8,
      "tier_4": 0.6,
      "tier_5": 0.2
    },
    "CONCEPT_LEARNING": {
      "tier_1": 0.8,
      "tier_2": 1.2,
      "tier_3": 1.0,
      "tier_4": 0.5,
      "tier_5": 0.5
    },
    "OPS_TOOLING": {
      "tier_1": 0.3,
      "tier_2": 0.5,
      "tier_3": 1.5,
      "tier_4": 1.0,
      "tier_5": 0.5
    }
  }
}
```

---

## 7.5 — Dynamic Staleness Penalties

The `FreshnessFactor(c)` penalizes time-sensitive sources that have not been modified or verified recently, preventing **FM-05 (Stale Context Poisoning)**.

Let $D$ represent the number of days elapsed since the chunk's source file was last modified:

$$D = \text{CurrentDate} - \text{LastModifiedDate}$$

The freshness factor is calculated dynamically based on the source's staleness category:

| Category | Decay Rate | Mathematical Formula | Minimum Floor |
|---|---|---|---|
| **Anchored** | None | $\text{FreshnessFactor} = 1.0$ | $1.0$ |
| **Slow Decay** | Annual | $\text{FreshnessFactor} = \max\left(0.7, 1.0 - \left(\frac{D}{365}\right) \cdot 0.3\right)$ | $0.7$ |
| **Medium Decay** | Monthly | $\text{FreshnessFactor} = \max\left(0.5, 1.0 - \left(\frac{D}{30}\right) \cdot 0.5\right)$ | $0.5$ |
| **Rapid Decay** | Weekly | $\text{FreshnessFactor} = \max\left(0.2, 1.0 - \left(\frac{D}{14}\right) \cdot 0.8\right)$ | $0.2$ |

### Staleness Warn Trigger:
If a retrieved chunk's computed `FreshnessFactor(c) < 0.6`, the retriever prepends a warning marker: `[STALENESS WARNING: last modified {D} days ago]` to the citable context.

---

## 7.6 — Rank Pruning and Token Budgets

To keep LLM context windows efficient and citable:
1. **Top-K Chunks**: The engine trims the ranked candidate list to the top **$K$** chunks (default: $K = 5$ for Career queries, $K = 8$ for Concept queries).
2. **Context Token Budget**: The cumulative token count of the returned chunks must not exceed **4,000 tokens**. If adding the next chunk would exceed this budget, the pipeline stops and discards remaining candidates.
3. **Evidence Class Refusal Rule (Control C-04)**: If the query is classified as a `CAREER_CLAIM` and the highest-scoring candidate has an `evidence_class < 5`, the engine aborts the answer generation pipeline and triggers an immediate **Refusal Block**:
   - *"Refusal: The highest-scoring evidence available is Class {class} ({status}). A minimum of Class 5 (Audited-PASS) is required to support resume skill or competency claims."*

---

## 7.7 — What Not to Build in v0.1 Retrieval

### Deferred Capabilities:
- **Vector Databases**: No ChromaDB, pgvector, or Milvus connections. All operations run against the static JSON manifest loaded in memory.
- **Cross-Encoder Rerankers**: No Cohere Rerank, BERT-based cross-attention layers, or local transformer-based reranking. The BM25 score modified by authority weights is the sole sorting signal.
- **Hypothetical Document Embeddings (HyDE)**: Defer query-expansion modeling. The query text is processed directly.

---

## Chunk Completed

**Chunk 7 — Retrieval Architecture and Ranking Engine** is complete.

---

## What This Chunk Covered

1. **Two-Stage Ingestion/Retrieval**: Enforced pre-filtering boundaries followed by authority-weighted ranking.
2. **Stage 1 Filtration**: Outlined the security, visibility, and agent lane filters.
3. **BM25 Invariant Implementation**: Documented term frequency, inverse document frequency, length normalization, and average document length parameters.
4. **Query Classification**: Created mapping rules for Career, Status, Concept, and Ops queries.
5. **Configurability (Resolves UQ14)**: Designed `rag/retrieval_config.json` to allow off-line tuning of BM25 parameters, base weights, and query modifiers.
6. **Freshness Mathematical Models**: Formulated decay math for Anchored, Slow, Medium, and Rapid decay profiles.
7. **Pruning Limits**: Configured Top-K parameters, 4,000 token limit buffers, and claim refusal gates.
8. **Anti-Goals**: Excluded vector engines, neural re-rankers, and HyDE models from the v0.1 baseline.

---

## Running Decision Log

*All decisions from Chunks 0–6 (D1–D70) are preserved. New decisions from Chunk 7:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D70 | *(preserved from Chunks 0–6)* | | |
| D71 | Rigid Two-Stage Retrieval pipeline (Filtration before Search) | Guarantees that forbidden files (private/excluded) never get scanned or matched by search keywords. | **Accepted** |
| D72 | Local Python BM25 over database search engine | Eliminates external infrastructure dependencies, preserving local execution constraints. | **Accepted** |
| D73 | Rule-Based Query Classification pre-sorts modifier matrices | Ensures that query intent determines how authority weights scale relative to text similarity scores. | **Accepted** |
| D74 | Authority weights and modifiers are tunable via JSON config | Decouples parameters from search logic, enabling automated optimization. Resolves UQ14. | **Accepted** |
| D75 | Heading breadcrumbs are boosted by 1.5x during matching | Ensures keyword searches retrieve nested sub-elements when search matches parent headers. | **Accepted** |
| D76 | Dynamic decay-based staleness penalties applied to score | Mitigates poisoning by older status files without manually removing them. | **Accepted** |
| D77 | In-line staleness warn string injected if Freshness < 0.6 | Alerts agents that citable context is stale, prompting them to output a live-verification caveat. | **Accepted** |
| D78 | Token-budget ceiling of 4,000 tokens for retrieved contexts | Prevents context window dilution and controls API consumption costs. | **Accepted** |
| D79 | Immediate claim refusal if candidate evidence Class < 5 | Enforces the core evidence standard at the retrieval layer before generator agents evaluate claims. | **Accepted** |
| D80 | Neural re-rankers and HyDE models are excluded from v0.1 | Minimizes system complexity and resource requirements for local execution. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ12 | Should the control register be a trackable repo file? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 8 — Answer Contracts and Citation Protocols**

This chunk will define the rigid schemas and output formats that agents must use when generating grounded answers. It will establish the exact citation format (`[AOS-CHK-TYPE-NNN-NNN]`), the mandatory output sections ("Answer", "Evidence Chain", "What Is Missing/Negative Evidence", "Overclaiming Risk Assessment", "Safer Wording"), and the refusal prompts for unsupported queries.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 8 — Answer Contracts and Citation Protocols.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–7.

Preserve and update the running decision log from Chunks 0–7 (D1–D80).

Do not repeat Chunks 0–7 content except for brief continuity references.

Chunk 8 must include:
- answer contracts per query type (Career, Status, Concept, Ops)
- citation protocol format ([AOS-CHK-TYPE-NNN-NNN])
- mandatory output schema sections (Answer, Evidence Chain, Missing/Negative Evidence, Risk Assessment, Safer Wording)
- citation validation rules (verifying paths and hashes match)
- agent refusal contracts for unsupported claims
- format constraint examples (markdown wrappers)
- handling citation formatting in UI rendering
- what not to build in v0.1 contracts

Stop after completing Chunk 8 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 9
```
