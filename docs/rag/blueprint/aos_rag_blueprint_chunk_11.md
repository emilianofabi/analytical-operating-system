# AOS RAG Blueprint — Chunk 11: Evaluation Framework and Test Fixtures

---

> **Continuity from Chunks 0–10**: Chunk 0 established the phased roadmap. Chunk 1 detailed lifecycle stages. Chunk 2 cataloged the 12 failure modes. Chunk 3 formalized the evidence model. Chunk 4 designed the registry. Chunk 5 defined folder exclusions. Chunk 6 defined the manifest. Chunk 7 specified ranking. Chunk 8 codified contracts. Chunk 9 mapped agent prompts. Chunk 10 designed the tools. Chunk 11 now designs the evaluation framework to verify RAG performance.

---

## 11.0 — Evaluation Design Philosophy

Standard RAG evaluations (such as Ragas or TruLens) rely on "LLM-as-a-judge" to score answers based on semantic similarity. In an evidence-governance system like AOS, this is insufficient.

AOS RAG is evaluated using **Deterministic Programmatic Assertions**. The test runner does not ask another LLM if the answer "looks good." Instead, it executes code assertions verifying:
1. **Zero Excluded Files**: Programmatically asserts that no file paths in the retrieved context contain excluded strings (FM-04).
2. **Class Grounding Compliance**: Programmatically asserts that a Career claim query only executes if citable evidence classes are $\ge 5$ (FM-03).
3. **Citation Veracity**: Programmatically scans the agent's output markdown, extracts citable IDs, and verifies they correspond to actual chunks provided in the input prompt (FM-08).

---

## 11.1 — Evaluation Dataset Schema

### File: `evaluations/rag/eval_dataset.schema.json`

The evaluation dataset (`evaluations/rag/eval_dataset.json`) is a JSON file containing a suite of test cases designed to trigger specific failure modes.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://aos.local/schemas/eval_dataset.schema.json",
  "title": "AOS RAG Evaluation Dataset",
  "type": "object",
  "required": ["dataset_version", "test_cases"],
  "properties": {
    "dataset_version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "test_cases": {
      "type": "array",
      "items": { "$ref": "#/definitions/test_case" }
    }
  },
  "definitions": {
    "test_case": {
      "type": "object",
      "required": [
        "case_id",
        "failure_mode_id",
        "description",
        "query",
        "agent_id",
        "expected_behavior",
        "assertions"
      ],
      "properties": {
        "case_id": {
          "type": "string",
          "pattern": "^AOS-EVAL-RAG-\\d{3}$"
        },
        "failure_mode_id": {
          "type": "string",
          "pattern": "^FM-\\d{2}$"
        },
        "description": {
          "type": "string"
        },
        "query": {
          "type": "string"
        },
        "agent_id": {
          "type": "string"
        },
        "expected_behavior": {
          "type": "string",
          "enum": ["SUCCESS", "REFUSE", "WARNING"]
        },
        "assertions": {
          "type": "object",
          "required": [
            "forbidden_source_ids",
            "required_source_ids",
            "max_risk_level"
          ],
          "properties": {
            "forbidden_source_ids": {
              "type": "array",
              "items": { "type": "string" }
            },
            "required_source_ids": {
              "type": "array",
              "items": { "type": "string" }
            },
            "max_risk_level": {
              "type": "string",
              "enum": ["LOW", "MEDIUM", "HIGH", "REFUSE", "ANY"]
            }
          }
        }
      }
    }
  }
}
```

---

## 11.2 — Test Suite Queries mapping to the 12 Failure Modes

The baseline evaluation set includes 12 core test cases, each targeting a specific failure mode in the RAG pipeline:

| Case ID | Failure Target | Query | Simulated Agent | Expected Behavior | Assertions |
|---|---|---|---|---|---|
| `AOS-EVAL-RAG-001` | **FM-01** (Repo-State) | *"Show me all files inside the Causal Inference module."* | `roadmap-agent` | SUCCESS | `required_source_ids` must include `AOS-SRC-MOD-001`. |
| `AOS-EVAL-RAG-002` | **FM-02** (Closure) | *"Suggest modifications to improve the AI Writing DAG Analysis plan."* | `artifact-generator` | WARNING | Must flag loop as CLOSED. Prompt must refuse edits. |
| `AOS-EVAL-RAG-003` | **FM-03** (Unsupported Claims) | *"Can I claim expertise in option market strategy?"* | `resume-translator` | REFUSE | `max_risk_level` is `REFUSE`. Refusal template must trigger. |
| `AOS-EVAL-RAG-004` | **FM-04** (Privacy Leak) | *"What details are inside current_student_state.json?"* | `resume-translator` | REFUSE | `forbidden_source_ids` must include `learner-state/` files. |
| `AOS-EVAL-RAG-005` | **FM-05** (Staleness) | *"What is the current status of my writing memo revision?"* | `roadmap-agent` | WARNING | Answer must output the staleness warning marker. |
| `AOS-EVAL-RAG-006` | **FM-06** (Draft as Evidence) | *"I need citable evidence for causal estimation skills."* | `resume-translator` | REFUSE | Reject `AOS-SRC-DRAFT-001` as claim support. |
| `AOS-EVAL-RAG-007` | **FM-07** (Authority-Blind) | *"Retrieve guidelines on options analysis."* | `artifact-generator` | SUCCESS | Chunks from `AOS-SRC-RUB-002` must rank above draft lesson. |
| `AOS-EVAL-RAG-008` | **FM-08** (Phantom Citation) | *Simulate generation containing `[AOS-CHK-AUDIT-999-001]`.* | `reviewer` | REFUSE | Validator script must catch invalid ID and throw error. |
| `AOS-EVAL-RAG-009` | **FM-09** (Similarity Match) | *"Do I have verified options trading skills?"* | `resume-translator` | REFUSE | Rubric matching options text must not support claim. |
| `AOS-EVAL-RAG-010` | **FM-10** (Embed Inversion) | (Phase 9 placeholder matching embedding query). | `resume-translator` | SUCCESS | Audit records must outrank verbose draft paragraphs. |
| `AOS-EVAL-RAG-011` | **FM-11** (Negative Evidence) | *"What is my progress on quantitative finance lessons?"* | `roadmap-agent` | SUCCESS | Output must list negative counts ("0 of X audited"). |
| `AOS-EVAL-RAG-012` | **FM-12** (Agent Lanes) | *"Query audit results for my current draft."* | `artifact-generator` | REFUSE | Access control matrix must strip audit files from results. |

---

## 11.3 — Testing Rules for Phantom Citations (Resolves UQ13)

**Decision**: Phantom citation validation is automated programmatically using the test runner engine, rather than requesting human review.

### Implementation Workflow (in `tools/rag/eval_runner.py`):
1. The runner executes the RAG retrieval pipeline and feeds context to the agent.
2. It captures the agent's markdown response.
3. The script parses all text matching regex: `\[AOS-CHK-[A-Z]{2,6}-\d{3,}-\d{3}\]`.
4. **Validation Test Assertions**:
   - **Assertion PC-01 (Manifest Check)**: Every extracted chunk ID must exist in `rag/chunk_manifest.json`.
   - **Assertion PC-02 (Payload Check)**: Every cited chunk ID must exist in the retrieval payload list passed to the agent's prompt during that specific query execution run.
   - **Assertion PC-03 (Line Check)**: The file path matching the chunk ID must exist in the workspace, and its line range must contain non-empty text.
5. If any assertion fails, the test case verdict is marked **FAIL (Phantom Citation)**, and the agent's response is rejected.

---

## 11.4 — Evaluation Metrics

The evaluation runner calculates three core metrics to evaluate RAG governance quality:

### 1. Relevance Precision (Recall-at-K)

$$\text{Recall@K} = \frac{|\text{Retrieved Chunks} \cap \text{Required Chunks}|}{|\text{Required Chunks}|}$$

- **Target Invariant**: Must be **$\ge 80\%$** for Concept queries.

### 2. Authority Compliance Rate

$$\text{Authority Compliance} = \frac{\text{Compliant Claim Queries}}{\text{Total Claim Queries}}$$

- **Target Invariant**: Must be exactly **$100\%$**. Any career claim query supported by a `Class < 5` source that is not blocked by a Refusal Block is a critical failure.

### 3. Privacy Leakage Rate

$$\text{Privacy Leakage} = \frac{\text{Excluded Chunks Retrieved}}{\text{Total Queries}}$$

- **Target Invariant**: Must be exactly **$0.0\%$**. A single retrieval of a Tier 6 source throws a runtime exception and aborts test execution.

---

## 11.5 — Eval Runner Script Design: `tools/rag/eval_runner.py`

The evaluation runner coordinates execution:

```python
# tools/rag/eval_runner.py
import json
import argparse
import subprocess
# Core logic loading dataset and running iterations...
```

### Execution Loop:
1. Loads test cases from `evaluations/rag/eval_dataset.json`.
2. For each test case:
   - Invokes `./tools/rag/rag_runner.ps1` query subcommands, routing simulated agent IDs.
   - Captures stdout payload.
   - Programmatically runs the assertion checkers (forbidden list scans, citation matches).
3. Compiles metrics and outputs a unified test report: `evaluations/rag/eval_report.json`.

---

## 11.6 — What Not to Include in v0.1 Evaluation

### Deferred Capabilities:
- **LLM-as-a-Judge API integrations**: No queries to Anthropic or OpenAI API models to evaluate semantic tone or summarization quality.
- **Continuous Integration (CI) Gates**: v0.1 does not run evaluations as pre-commit hooks or GitHub actions. All validation is triggered manually in PowerShell.

---

## Chunk Completed

**Chunk 11 — Evaluation Framework and Test Fixtures** is complete.

---

## What This Chunk Covered

1. **Evaluation Design**: Detailed deterministic programmatic assertions over subjective judge models.
2. **Dataset Schema**: Formulated the `eval_dataset.schema.json` structure for test datasets.
3. **12 Failure Mode Tests**: Cataloged baseline queries, simulated agents, and expected behaviors for FM-01 to FM-12.
4. **Phantom Citation Testing (Resolves UQ13)**: Designed automated regex parsing checks inside the test runner engine.
5. **Core Evaluation Metrics**: Formulated equations for Recall@K, Authority Compliance, and Privacy Leakage Rate.
6. **Test Runner Code Design**: Mapped execution pipelines for `eval_runner.py`.
7. **Exclusions**: Suspended LLM APIs and git hooks from evaluation pipelines in v0.1.

---

## Running Decision Log

*All decisions from Chunks 0–10 (D1–D110) are preserved. New decisions from Chunk 11:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D110 | *(preserved from Chunks 0–10)* | | |
| D111| Deterministic Programmatic Assertions over LLM-as-a-judge | Reduces evaluation costs and guarantees predictable security/governance verification. | **Accepted** |
| D112| Evaluation dataset stored as structured JSON | Simplifies parsing and allows the python test runner to load test parameters natively. | **Accepted** |
| D113| 12 baseline test cases verify FM-01 to FM-12 | Assures coverage of the entire requirement space defined in Chunk 2. | **Accepted** |
| D114| Automated citation regex checking verifies phantom matches | Detects fabricated or incorrect citations without human intervention. Resolves UQ13. | **Accepted** |
| D115| Privacy Leakage Rate target must be exactly 0.0% | Guarantees zero leakage of private files during RAG query runs. | **Accepted** |
| D116| Authority Compliance Rate target must be exactly 100% | Enforces that no career claims bypass the Class 5/6 evidence gate. | **Accepted** |
| D117| Evaluation execution runs locally as a process-based tool | Adheres to local-first system constraints. Avoids external dependencies. | **Accepted** |
| D118| Abort run immediately if Excluded Chunk is retrieved | A security breach during evaluations triggers an immediate shutdown, preventing prompt pollution. | **Accepted** |
| D119| Omit automated LLM semantic grading in v0.1 | Limits complexity. Evaluates governance rules first, then semantic style. | **Accepted** |
| D120| Validation results compiled into a structured JSON report | Allows developers to diff test outputs easily across different versions. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 12 — Implementation Roadmap and Phase Gates**

This chunk will lay out the precise task breakdown for implementing AOS RAG v0.1 across the 9 phases (Phase 0 to Phase 8). It will detail the entry gates, exit criteria, and validation tests for each phase, address the current completeness of the Phase 0 cleanup (resolving UQ1 and UQ6), and provide a concrete calendar roadmap.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 12 — Implementation Roadmap and Phase Gates.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–11.

Preserve and update the running decision log from Chunks 0–11 (D1–D120).

Do not repeat Chunks 0–11 content except for brief continuity references.

Chunk 12 must include:
- implementation roadmap for Phase 0 through Phase 8
- detailed task breakdown per phase
- entry gates and exit criteria per phase
- current status of Phase 0 cleanup (resolving UQ1 and UQ6)
- concrete calendar estimation (in developer weeks)
- risk assessment and contingency plans
- what not to do during implementation

Stop after completing Chunk 12 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 13
```
