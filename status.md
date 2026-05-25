# Current Curriculum Status

Last updated: 2026-05-25

## 1. Current Tier

Foundational

Note: the active work is already spanning Methods and Systems and Integration and Judgment modules. This is acceptable as a portfolio-driven loop, but it creates a routing risk if prerequisites from the dependency graph are treated as fully completed rather than previewed or scaffolded.

## 2. Active Modules

From `learner-state/current_student_state.json`:

- `03_causal_inference`
- `07_data_engineering_infrastructure`
- `12_technical_communication_portfolio`

Module index alignment:

| Module | Module name | Track | Primary competency |
|---|---|---|---|
| 03 | Causal Inference, Scientific Reasoning, and Identification | Methods and Systems | Causal Identification and Counterfactual Reasoning |
| 07 | Data Engineering, Infrastructure, MLOps, and Production Systems | Methods and Systems | Epistemic Infrastructure Design |
| 12 | Technical Communication, Portfolio Strategy, and Career Positioning | Integration and Judgment | Communication and Portfolio Synthesis |

## 3. Completed Artifact Loop

The completed loop is a combined causal identification, data infrastructure, review, and portfolio translation cycle around AI writing assistance and analytical memo quality.

| Step | Artifact | Path | Status |
|---|---|---|---|
| Lesson foundation | The Fundamental Problem of Causal Inference | `artifacts/lessons/03_causal_inference/lesson_01_fundamental_problem.md` | draft |
| Lesson foundation | Data Is Produced, Not Found | `artifacts/lessons/07_data_engineering_infrastructure/lesson_01_data_is_produced_not_found.md` | draft |
| Technical memo | AI Writing Assistance and the Quality of Student Analytical Memos | `artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md` | revised |
| Review | AI writing assistant memo review | `artifacts/reviews/combined_identification_data_memos/ai_writing_assistant_memo_v2_review.md` | used as evidence |
| Portfolio translation | Evaluating AI Writing Assistance: A Causal Identification and Data Infrastructure Case Study | `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md` | portfolio_ready |
| Semantic audit | Case study repair audit | `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md` | PASS |

Artifact registry entries now include:

- `AOS-L03-001`
- `AOS-L07-001`
- `AOS-COMB-001`
- `AOS-PORT-001`

## 4. Portfolio-Ready Artifacts

| Artifact ID | Title | Type | Path | Rubrics used |
|---|---|---|---|---|
| `AOS-PORT-001` | Evaluating AI Writing Assistance: A Causal Identification and Data Infrastructure Case Study | portfolio_case_study | `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md` | `synthesis_portfolio_quality`, `causal_reasoning_quality`, `assumption_awareness` |

Portfolio signal:

- Integrates causal inference, data engineering, AI governance, educational measurement, and technical communication.
- Separates assigned access from actual use.
- Treats final memo quality as a constructed rubric-based outcome rather than direct evidence of learning.
- Refuses unsupported claims that AI improves student learning from final artifact quality alone.

## 5. Current Competency Evidence

From `learner-state/current_student_state.json`:

### Model Construction and Assumption Analysis

Level: proficient

Evidence:

- `artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md`
- `artifacts/reviews/combined_identification_data_memos/ai_writing_assistant_memo_v2_review.md`
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md`

Next step:

- Add a formal model limitations appendix that distinguishes total effects, mediated pathways, measurement processes, post-treatment variables, and unsupported learning claims.

### Causal Identification and Counterfactual Reasoning

Level: proficient

Evidence:

- `artifacts/lessons/03_causal_inference/lesson_01_fundamental_problem.md`
- `artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md`
- `artifacts/reviews/combined_identification_data_memos/ai_writing_assistant_memo_v2_review.md`
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md`

Next step:

- Add a formal DAG and statistical analysis plan to convert the design memo into an implementation-ready study protocol.

### Epistemic Infrastructure Design

Level: developing

Evidence:

- `artifacts/lessons/07_data_engineering_infrastructure/lesson_01_data_is_produced_not_found.md`
- `artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md`
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md`

Next step:

- Add governance, privacy, schema validation, linkage validation, retention, access-control, and measurement-pipeline implementation details for AI-use logs and rubric-scored memo outcomes.

### Synthesis, Communication, and Intellectual Production

Level: proficient

Evidence:

- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md`
- `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md`

Next step:

- Prepare an executive summary and visual appendix for public-facing portfolio presentation.

## 6. Latest Audit Status

Latest audit consulted:

`audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md`

Audit status: PASS

Final judgment:

- The case study is ready for portfolio use as a polished translation of the revised technical memo.
- Remaining improvements are optional substantive enhancements, not blocking repairs.

Clean checks from the audit:

- No unsupported empirical claim that AI writing assistance improves memo quality or student learning.
- No Hermes CLI error text, PowerShell trace, stack trace, or known mojibake sequence expected after repair.
- Opening structure, template compliance, BOM removal, and claim calibration were repaired.

## 7. Current Broken or Risky Items

### Not broken, but still implementation-incomplete

The portfolio artifact is ready, but the underlying study protocol is not implementation-ready yet. Missing items listed in the case study include:

- formal DAG diagram;
- concrete statistical analysis plan;
- randomization protocol, including blocking, stratification, allocation concealment, late adds, and opt-outs;
- power analysis;
- operational scoring rubric and rater reliability threshold;
- governance appendix for privacy, consent, retention, deidentification, and access control.

### Routing and dependency risk

The learner is marked as `Foundational`, but the active loop uses Methods and Systems modules and an Integration and Judgment portfolio module. The dependency graph allows this as preview or scaffolded work, but future status updates should avoid implying that all prerequisites are completed unless they are explicitly evidenced or waived.

Relevant dependency graph points:

- 02 Probability and Statistics precedes 03 Causal Inference.
- 10 Programming precedes 07 Data Engineering and Infrastructure.
- 12 Technical Communication and Portfolio precedes 25 Capstone Integration.
- 03 Causal Inference and 07 Data Engineering and Infrastructure both feed 25 Capstone Integration.

### Repository state risk

Current working tree includes modified and untracked files. No commit has been made. Before a future commit, review the full diff and decide whether generated state-update files and audit files should be committed together.

## 8. Best Next Step

Create an implementation-ready study protocol appendix for the AI writing assistance memo.

Priority sequence:

1. Formal DAG and variable glossary.
2. Statistical analysis plan for the Intent-to-Treat estimate.
3. Randomization protocol and contamination handling plan.
4. Rubric scoring protocol with rater training and reliability threshold.
5. Governance appendix for privacy, consent, retention, deidentification, and access control.

This best next step directly advances the weakest remaining area: moving from strong design reasoning to an executable empirical protocol.

## 9. Suggested Next Artifact

Suggested artifact:

`artifacts/projects/combined_identification_data_memos/appendices/ai_writing_assistant_study_protocol_appendix.md`

Proposed title:

`Implementation Protocol Appendix for Evaluating AI Writing Assistance in Analytical Memo Assignments`

Recommended sections:

1. Research question and estimand recap
2. Formal DAG and node definitions
3. Treatment assignment and randomization protocol
4. Outcome construction and rubric scoring protocol
5. Statistical analysis plan
6. Missingness, attrition, noncompliance, and contamination handling
7. Power analysis placeholder or assumptions table
8. Data schema and linkage validation checklist
9. Privacy, consent, retention, and access-control appendix
10. Interpretation boundaries and forbidden claims

Recommended rubrics:

- `causal_reasoning_quality`
- `assumption_awareness`
- `technical_artifact_quality`
- `responsible_system_design`

## 10. Files Changed in This Session

Known from current working tree status and this update:

| File | State | Notes |
|---|---|---|
| `learner-state/current_student_state.json` | modified | Competency evidence and artifact registry were updated. |
| `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md` | modified | Portfolio case study was repaired and calibrated. |
| `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md` | untracked | Semantic repair audit reports PASS. |
| `artifacts/generated/state_updates/ai_writing_assistant_memo_portfolio_loop_state_update_2026-05-25.json` | untracked | Generated state-update proposal file. |
| `status.md` | created or updated | Current curriculum status summary. |

No commit has been made.
