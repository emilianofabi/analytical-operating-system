# AOS RAG Blueprint — Chunk 8: Answer Contracts and Citation Protocols

---

> **Continuity from Chunks 0–7**: Chunk 0 established the blueprint framework. Chunk 1 detailed the evidence classes. Chunk 2 cataloged failure modes. Chunk 3 mapped authority tiers. Chunk 4 designed the registry. Chunk 5 defined exclusions. Chunk 6 designed the chunk manifest. Chunk 7 specified retrieval and ranking. Chunk 8 now codifies the rigid answer contracts and citation formats that agents must use to structure their outputs, preventing hallucinated and unsupported claims.

---

## 8.0 — The Concept of an Answer Contract

In standard RAG applications, the LLM is instructed to "use the retrieved context to answer the user's query." This results in unstructured, conversational responses that are difficult to verify.

AOS RAG implements **Structured Answer Contracts**. An answer is not an open-ended conversational response. It is a formatted document containing mandatory sections. If an agent outputs a response that does not match the contract's markdown structure, the post-processing validator (`tools/rag/validate_answer_format.py`) rejects it, preventing **FM-03 (Unsupported Career Claims)** and **FM-08 (Phantom Citations)**.

---

## 8.1 — Citation Protocol Format

Citations must be precise, verifiable, and structurally anchored to the text.

### In-Line Citation Syntax
- Citations must use the exact chunk ID format: `[AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}]` (e.g., `[AOS-CHK-AUDIT-001-002]`).
- Citations must be placed at the end of the specific clause or sentence they support, prior to punctuation.
- **Example**: *The AI Writing Memo passed its final semantic audit on May 25, 2026 [AOS-CHK-AUDIT-001-001].*

### Exclusion Invariants:
1. **No General Citations**: Citations like "based on your project folders" or "referencing the audits" are forbidden. Every claim must list exact chunk IDs.
2. **Retrieve-Only Constraint (Control C-28)**: An agent is forbidden from citing any chunk ID that was not provided in the prompt's retrieved context block for that query. If an agent inserts an un-retrieved ID, the validator raises an error.

---

## 8.2 — Mandatory Output Schema Sections

Every RAG-grounded answer must conform to the following markdown template:

```markdown
### 1. Answer
[A direct, concise answer to the query, embedded with citable chunk IDs.]

### 2. Evidence Chain
- **[AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}]**: [Relative File Path] | [Evidence Class] | [Tier]
- **[AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}]**: [Relative File Path] | [Evidence Class] | [Tier]

### 3. Missing and Negative Evidence
- [Document any expected evidence that is missing, such as missing audits or reviews.]
- [List any REJECT audits or failed evaluations that contradict the claim.]

### 4. Overclaiming Risk Assessment
- **Risk Level**: [LOW / MEDIUM / HIGH / REFUSE]
- **Rationale**: [Explain why the risk level was assigned based on the citable evidence classes.]

### 5. Safer Wording / Recommended Actions
- **Safer Wording**: [Alternative phrasing of the claim to match evidence classes.]
- **Next Steps**: [Actionable steps, such as completing a draft lesson or requesting an audit.]
```

---

## 8.3 — Answer Contracts by Query Type

The classifier (from Chunk 7) determines which contract rules the agent must obey.

### 8.3.1 — CAREER_CLAIM Contract
- **Query Profile**: *"Can I list options pricing proficiency on my resume?"*
- **Constraint**: Strict enforcement of all 5 sections.
- **Rules**:
  - If the evidence chain contains only `CLASS 2 (DRAFT)` sources, the Risk Level must be set to `REFUSE`.
  - Section 5 must generate a complete, copy-pasteable alternative statement that aligns with `CLASS 2` limits (e.g., "Introductory self-study of options pricing theory").

### 8.3.2 — STATUS_STATE Contract
- **Query Profile**: *"Has the quantitative lesson passed audit?"*
- **Constraint**: Sections 1, 2, and 3 are mandatory. Sections 4 and 5 are merged into a "Status Warnings" block.
- **Rules**:
  - If any citable chunk has a `FreshnessFactor < 0.6`, the "Status Warnings" section must print: `[STALENESS WARNING: Source status.md was last modified X days ago. Live verification required.]`.

### 8.3.3 — CONCEPT_LEARNING Contract
- **Query Profile**: *"Explain DAG-based causal identification."*
- **Constraint**: Sections 1 and 2 are mandatory. Section 3 is labeled "Prerequisite / Topic Gaps". Sections 4 and 5 are omitted.
- **Rules**:
  - Focuses on retrieving Tier 2 `rubric` and `module_definition` documents to explain concepts, citing criteria IDs.

### 8.3.4 — OPS_TOOLING Contract
- **Query Profile**: *"How do I quarantine a failed audit?"*
- **Constraint**: Sections 1 and 2 are mandatory. References relative paths to scripts. Omit sections 3, 4, and 5.

---

## 8.4 — Agent Refusal Contract

When a claim query cannot be supported because zero matching sources exist, the agent must output a standardized **Refusal Block** rather than generating a speculative response.

### Refusal Template:
```markdown
### 1. Answer
Refusal: The query requests verification of a skill or project claim, but no supporting evidence exists in the repository.

### 2. Evidence Chain
- No citable chunks retrieved.

### 3. Missing and Negative Evidence
- **Missing Artifact**: No project files or lesson files related to this query were found in the indexable directories.
- **Missing Audits**: No audit files exist.

### 4. Overclaiming Risk Assessment
- **Risk Level**: REFUSE
- **Rationale**: Zero evidence exists to support this claim.

### 5. Safer Wording / Recommended Actions
- **Safer Wording**: Remove this claim from your resume/portfolio.
- **Next Steps**: Initialize a new artifact from the module template, complete the tasks, and submit it to the Reviewer agent.
```

---

## 8.5 — Citation Validation and Verification (Control C-26)

To prevent phantom citations, the RAG toolchain executes a validator script (`tools/rag/validate_citations.py`) after the LLM completes generation:

```
                  Generated Agent Output
                            │
                            ▼
             Extract all [AOS-CHK-*] citation tokens
                            │
                            ▼
      Are all extracted IDs in the prompt context? ──► NO  ──► REJECT output
                            │                                  (Phantom Citation)
                            ▼ YES
     Verify ID mappings (File Path, Tier, Class)
     match the source registry records? ─────────────► NO  ──► REJECT output
                            │                                  (Registry Mismatch)
                            ▼ YES
     Approve Output for Rendering
```

- **Execution Gate**: If the validator rejects an output, the system discards the response and logs the error details to `scratch/citation_failures.log`. In developer mode, it prompts the generator agent to regenerate the output with the correct context.

---

## 8.6 — UI Rendering of Citations

When citable markdown is rendered in the CLI or the Evidence Browser (Phase 10):
1. **Interactive Links**: The citation token `[AOS-CHK-AUDIT-001-002]` is parsed and rendered as a link: `[AOS-CHK-AUDIT-001-002](file:///C:/Users/chefi/Projects/analytical-operating-system/audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md#L45-L60)`.
2. **FS Navigation**: Clicking the link opens the local file system editor (VS Code or Obsidian) at the exact source file and starting line range.

---

## 8.7 — What Not to Include in v0.1 Contracts

### Deferred Capabilities:
- **Pydantic Validation**: Avoid complex JSON schema validation at the raw LLM prompt boundary (e.g., forcing the LLM to output pure JSON data structures via API tooling). Markdown structure parsing is easier to write, debug, and log in local-first terminal apps.
- **Auto-Correction Engine**: The validator will not attempt to rewrite or fix broken citations. If a citation is invalid, the output is rejected.

---

## Chunk Completed

**Chunk 8 — Answer Contracts and Citation Protocols** is complete.

---

## What This Chunk Covered

1. **Answer Contract Principle**: Enforced structural schemas for agent outputs.
2. **Citation Syntax**: Formulated the `[AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}]` format.
3. **Mandatory Sections**: Designed the 5-part output structure (Answer, Chain, Missing, Risk, Action).
4. **Query Contracts**: Tailored rules for Career, Status, Concept, and Ops query pipelines.
5. **Standard Refusal Template**: Specified the refusal format for empty contexts.
6. **Automated Post-Processor (Control C-26)**: Designed `validate_citations.py` to prevent phantom matches.
7. **Interactive Rendering**: Explained link generation for filesystem navigation.
8. **Anti-Goals**: Excluded Pydantic runtime enforcement and auto-correction.

---

## Running Decision Log

*All decisions from Chunks 0–7 (D1–D80) are preserved. New decisions from Chunk 8:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D80 | *(preserved from Chunks 0–7)* | | |
| D81 | Strict markdown schema validation on all agent outputs | Prevents agents from generating unstructured, unverifiable text. | **Accepted** |
| D82 | In-line citation token format matches Chunk 6 IDs | Ensures citations map directly to entries in the chunk manifest. | **Accepted** |
| D83 | Retrieve-Only constraint culls un-retrieved citation IDs | Eliminates the possibility of agents inventing valid-looking references. | **Accepted** |
| D84 | Mandatory Risk Assessment outputs in all Career claims | Forces agents to explicitly flag overclaiming risks using evidence class criteria. | **Accepted** |
| D85 | Omit risk sections in Concept and Ops queries | Minimizes prompt overhead for queries that do not verify competence or progress. | **Accepted** |
| D86 | Standardized Refusal Block for empty context sets | Replaces LLM apologies or speculative answers with structured next steps. | **Accepted** |
| D87 | Post-processing validator script rejects formatting failures | Ensures that bad outputs are discarded before being written to handoffs or logs. | **Accepted** |
| D88 | Citations render as active filesystem protocol links | Connects the user interface directly to local file source line ranges. | **Accepted** |
| D89 | Reject auto-correcting citation parsers in v0.1 | Hard failure on bad citations is safer than guess-based automated corrections. | **Accepted** |
| D90 | Markdown output validation over API-level JSON constraints | Reduces API complexity and keeps local markdown files readable. | **Accepted** |

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

**Chunk 9 — Agent Integration and Ecology Modifications**

This chunk will define how RAG integrates into the existing AOS agent ecology. It will specify modifications for the 11 agent prompts (Artifact Generator, Reviewer, Auditor, Resume Translator, etc.), how agents trigger retrieval, how RAG outputs are injected into prompt contexts, and how agent lane boundaries are enforced at runtime.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 9 — Agent Integration and Ecology Modifications.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–8.

Preserve and update the running decision log from Chunks 0–8 (D1–D90).

Do not repeat Chunks 0–8 content except for brief continuity references.

Chunk 9 must include:
- RAG integration points for the 11 AOS agents
- modifications needed for prompts/agents/ prompts
- how agents invoke the retriever tool
- context injection prompt patterns
- enforcing lane boundaries in agent-retriever interactions
- sequence diagrams for RAG-assisted artifact generation, review, audit, and resume translation
- handling agent-specific retrieval filters
- preventing agent self-auditing through RAG constraints
- what not to change in v0.1 agent prompts

Stop after completing Chunk 9 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 10
```
