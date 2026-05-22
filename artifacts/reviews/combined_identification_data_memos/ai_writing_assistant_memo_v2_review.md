# Artifact Review

## Artifact Metadata

- Artifact Title: AI Writing Assistance and the Quality of Student Analytical Memos
- Artifact Type: Combined identification and data-generating process memo
- Module: 03 Causal Inference, Scientific Reasoning, and Identification; 07 Data Engineering, Infrastructure, MLOps, and Production Systems
- Primary Competency: Causal Identification and Counterfactual Reasoning
- Secondary Competencies: Epistemic Infrastructure Design; Model Construction and Assumption Analysis; Synthesis, Communication, and Intellectual Production
- Reviewer: Hermes curriculum reviewer
- Date: 2026-05-22

## 1. Artifact Claim

The artifact claims that evaluating AI writing assistance requires a disciplined causal and infrastructural research design rather than a simple comparison of final grades or observed memo scores.

Its central claim is that "being offered access to a specified AI writing assistant under a defined use protocol causes a change in final memo quality, as measured by blind rubric scoring, compared with not being offered that access." The artifact correctly narrows the claim to governed access, not AI in general and not necessarily actual AI use. It also explicitly refuses overclaiming: "The claim should not be stated as "AI improves learning" without additional evidence."

The artifact demonstrates the ability to:

- define treatment, outcome, population, estimand, and counterfactual;
- distinguish assignment to access from actual use, intensity, mode, compliance, and contamination;
- map decision contexts to estimands;
- specify identification assumptions and diagnostics;
- describe the data-generating process behind educational measurement;
- state what the proposed data can and cannot support.

## 2. Method

The artifact uses a combined causal identification memo and data-generating process memo.

The causal method is centered on a randomized access design, with the primary estimand specified as an Intent-to-Treat effect:

`E[Y_i(Z_i = 1) - Y_i(Z_i = 0)]`

The memo also considers secondary estimands, including effect of actual use, Local Average Treatment Effect under randomized encouragement, and Conditional Average Treatment Effects by baseline skill, prior causal reasoning ability, prior AI familiarity, language background, assignment difficulty, and mode of AI use.

The data infrastructure method traces how the outcome is produced through source systems, event logs, administrative categories, measurement pipelines, schemas, missingness, selection, logging bias, and instrumentation bias. This is especially strong because the memo treats final memo quality as a constructed measurement object rather than as a directly observed natural fact.

## 3. Evidence

The artifact supports its claim through design specification rather than empirical results. Its evidence consists of:

- precise treatment definition: governed access to a specified AI writing assistant under a defined permitted-use protocol;
- precise comparison condition: same prompt, deadline, rubric, instructional materials, and ordinary non-AI resources, without offered access to the study-provided assistant;
- explicit estimand definition and notation;
- counterfactual statement for each treated student;
- assumption table with diagnostics and risks if false;
- causal structure and adjustment logic;
- data-generating process analysis across source systems, human inputs, event logs, administrative categories, incentives, and versioning;
- measurement pipeline table;
- proposed data schema;
- diagnostics, robustness checks, and sensitivity plan;
- disciplined limitation statements.

Specific evidence includes the claim that "the outcome should not be treated as a natural fact" because it is produced through "a rubric, evaluator training, scoring workflow, platform interface, and institutional definition of quality." The artifact also states that "criterion-level scores are essential" because a total score could hide tradeoffs, such as improved organization and grammar without stronger identification assumptions.

## 4. Assumptions

| Assumption | Stated or Implicit | Importance | Reviewer Comment |
|---|---|---|---|
| Random assignment is implemented correctly | Stated | High | The artifact explicitly ties randomization to comparability and recommends auditing assignment records and checking baseline balance. |
| Treatment condition is well-defined | Stated | High | The artifact strongly specifies model, interface, permitted-use protocol, access dates, disclosure, and logging. This is one of the memo's strongest features. |
| Control condition is meaningful | Stated | High | The memo recognizes external AI use and contamination as major threats. It recommends disclosure forms and sensitivity analysis. |
| Outcome scoring is blind to treatment | Stated | High | The artifact correctly identifies evaluator bias as a threat and recommends anonymized submissions, multiple raters, and removal of treatment labels. |
| Rubric validly measures analytical memo quality | Stated | High | The artifact recognizes that final memo quality is a constructed proxy, not a direct measure of learning or reasoning. |
| Scoring is reliable across evaluators | Stated | High | The memo recommends inter-rater reliability, adjudication, and rater identifiers. |
| Stable Unit Treatment Value Assumption holds approximately | Stated | High | The memo identifies peer sharing, collaboration, shared documents, and reuse of AI-generated outlines as possible violations. |
| Compliance is measured or the estimand remains assignment-based | Stated | High | The artifact distinguishes ITT from actual use and warns against interpreting ITT as the effect of actual AI use. |
| Hidden AI use in the control group is limited or bounded | Stated | High | The memo treats this as a fragile assumption and proposes disclosure, process notes, controlled sessions where appropriate, and sensitivity analysis. |
| No inappropriate adjustment for post-treatment variables | Stated | High | The artifact explicitly warns against adjusting for number of AI prompts, time spent revising, draft length, revision count, or post-use confidence when estimating the total effect. |
| Authorship remains meaningful | Stated | High | The memo identifies process notes, AI-use appendix, and oral defense as needed to interpret memo quality as evidence of student judgment. |
| Data linkage preserves meaningful variation | Mostly stated | Medium | The measurement pipeline notes linkage, deduplication, filtering, and transformation risks, but the artifact could further specify concrete validation rules for record linkage and exclusion decisions. |
| Ethical acceptability of monitoring | Stated but less operationalized | High | The memo notes that students should not be subjected to invasive monitoring and that logs may contain sensitive information. It would be stronger with a governance and consent protocol. |

## 5. Limitations

The artifact does not establish an empirical effect. It specifies what a credible study would require, but it does not analyze actual randomized data, estimate treatment effects, calculate uncertainty, or present observed diagnostics.

The artifact also does not fully specify:

- a concrete randomization protocol, including blocking, stratification, allocation concealment, and reproducibility;
- a statistical analysis plan, including model form, standard errors, clustering, multiple comparisons, and handling of repeated memos;
- a power or minimum detectable effect analysis;
- a concrete rubric instrument for scoring final memo quality;
- an inter-rater reliability threshold or adjudication rule;
- a detailed privacy, consent, data retention, and access-control plan for AI-use logs;
- a formal DAG diagram beyond the text DAG;
- operational definitions for prompt categories, use modes, authorship substitution risk, and disclosure quality.

The artifact is therefore strong as a research design memo but not yet complete as an implementation-ready study protocol.

## 6. Rubric Scores

| Rubric | Criterion | Score 1-4 | Evidence for Score |
|---|---|---:|---|
| Causal Reasoning Quality | Causal Question | 4 | The artifact defines the question as: "Among students completing a structured analytical memo assignment, what is the effect of being offered access to a specified AI writing assistant, under a defined permitted-use protocol, on the evaluated quality of the final memo, relative to completing the same assignment without offered access to that assistant?" It specifies treatment, outcome, population, and decision context, and later distinguishes estimand from estimator, sample, and decision target through the estimand-to-decision table. |
| Causal Reasoning Quality | Counterfactual Logic | 4 | The memo states the core counterfactual directly: "For each student assigned to AI assistant access, what would that same student's final memo quality have been if the student had completed the same assignment without being offered access to the assistant, under otherwise identical instructional and assessment conditions?" It also compares randomized access, randomized encouragement, within-student crossover, and observational use comparison. |
| Causal Reasoning Quality | Identification Strategy | 4 | The artifact chooses randomized access as the primary comparison strategy and explains why it estimates assigned access rather than actual use. It defends alternatives, including randomized encouragement and crossover, and labels observational use comparison as the weakest strategy because use is selected. |
| Causal Reasoning Quality | Assumption Defense | 4 | The identification assumptions table links each assumption to why it matters, evidence or diagnostics, and risk if false. Examples include random assignment, treatment definition, control contamination, blinding, valid scoring, reliability, no differential attrition, and instrumentation stability. |
| Causal Reasoning Quality | Threats to Validity | 4 | The memo identifies design-specific threats: control students may use external AI tools, evaluators may infer AI use from prose style, AI may improve grammar but not causal reasoning, post-treatment adjustment may distort estimates, and model, rubric, or assignment prompt may change during the study. It matches these to diagnostics and robustness checks. |
| Causal Reasoning Quality | Interpretation Discipline | 4 | The artifact repeatedly restricts claims to what the design can support. It states that the analysis cannot automatically establish that AI writing assistants improve student learning and distinguishes final memo quality from learning, mechanism, external validity, and policy decisions. |
| Assumption-Awareness in Technical Work | Problem Framing | 4 | The problem is framed around pedagogical and product decisions, not a generic tool evaluation. The memo says the question should not be reduced to average grades and identifies stakes for instructors, education technology teams, governance, disclosure, logging, and assessment infrastructure. |
| Assumption-Awareness in Technical Work | Assumption Identification | 4 | Assumptions are not merely listed. They are prioritized through diagnostic relevance and risk if false. The artifact identifies fragile assumptions such as control contamination, outcome validity, scoring reliability, differential attrition, compliance, and authorship. |
| Assumption-Awareness in Technical Work | Data-Generating Process | 4 | The artifact strongly explains that data are produced by educational, technical, and evaluative systems. It specifies source systems, human inputs, event logs, administrative categories, incentives shaping recording, and changes over time. It states that categories such as "AI use" and "quality" are not neutral. |
| Assumption-Awareness in Technical Work | Method Fit | 4 | The method fits the question because randomized access aligns with the policy decision of whether to offer governed AI assistance. The artifact defends why actual use is harder to identify and why observational use comparison is weak. |
| Assumption-Awareness in Technical Work | Diagnostics and Sensitivity | 4 | The artifact proposes diagnostics and robustness checks tied to key assumptions: randomization audit, baseline balance table, take-up rates, external AI use, attrition rates, inter-rater reliability, rater severity, criterion-level outcomes, version audits, contamination sensitivity, and attrition bounds. |
| Assumption-Awareness in Technical Work | Limitation Articulation | 4 | Limitations are tied directly to conclusions. The memo separates causal limits, measurement limits, generalization limits, institutional limits, and ethical limits. It explicitly refuses claims about learning in general from final memo scores alone. |

## 7. Strengths

- The artifact makes the causal estimand unusually clear. It distinguishes assignment to access from actual use, encouragement, compliance, contamination, mode of use, and intensity of use.

- The artifact shows strong interpretation discipline. It refuses to collapse final memo quality into learning, product usefulness into pedagogical appropriateness, or observed score differences into causal evidence.

- The artifact treats educational data as produced rather than found. The sections on source systems, human inputs, event logs, administrative categories, incentives, versioning, measurement pipeline, and schema provide strong evidence of epistemic infrastructure thinking.

- The assumption table is diagnostic rather than decorative. Each assumption is connected to why it matters, what evidence could support it, and what would go wrong if it failed.

- The memo has strong portfolio signal because it integrates causal inference, AI governance, measurement validity, learning analytics, and data infrastructure in one coherent artifact.

## 8. Highest-Leverage Revisions

1. Add a concrete statistical analysis plan.

   The artifact currently specifies the estimand and design very well, but it does not yet specify the estimator and analysis model. Add a concise section defining the primary estimator for the ITT effect, treatment of baseline covariates, clustering or repeated-measure handling if students submit multiple memos, standard errors, missing-data strategy, subgroup analysis rules, and multiple-comparison discipline for criterion-level outcomes.

2. Add a formal randomization and implementation protocol.

   The memo should specify how students are randomized, whether blocking or stratification is used, who generates the allocation, when access is activated, how assignment integrity is audited, and how late adds, opt-outs, noncompliance, and crossovers are handled. This would move the artifact from a strong conceptual design to an implementation-ready study protocol.

3. Add a governance and privacy appendix for AI-use logs.

   The artifact recognizes that AI-use logs may contain sensitive cognitive, academic, or personal information, but it should operationalize this concern. Add consent language, data minimization principles, retention limits, access controls, deidentification or pseudonymization rules, prompt-content handling, and a distinction between research use, grading use, and disciplinary use.

4. Define the scoring rubric and rater reliability standard.

   Because the outcome depends on blind rubric scoring, the artifact should include or reference the actual scoring rubric, rater training plan, calibration examples, acceptable inter-rater reliability threshold, adjudication process, and rule for preserving criterion-level scores.

5. Convert the text DAG into a formal diagram or adjacency list.

   The text DAG is conceptually sound, but a formal DAG would strengthen identification defense. It should distinguish baseline confounders of actual use from randomized assignment, mediators such as revision behavior, measurement nodes such as evaluator scoring, and post-treatment variables that should not be adjusted for in the primary total-effect estimate.

## 9. Portfolio Readiness

Strong portfolio signal

The artifact is already strong enough to signal advanced analytical judgment in a portfolio context. It demonstrates the capacity to turn a vague AI impact question into a disciplined causal, measurement, and infrastructure design. However, it would become more implementation-ready and interview-defensible after adding a statistical analysis plan, randomization protocol, governance appendix, scoring protocol, and formal DAG.

## 10. Portfolio Translation Recommendation

This should become a portfolio case study and technical research design memo.

Recommended portfolio framing:

- Title: Evaluating AI Writing Assistance: A Causal Identification and Data Infrastructure Case Study
- Audience: education technology teams, learning analytics teams, AI governance teams, product experimentation teams, curriculum assessment groups
- Format: public-facing case study with a linked technical appendix
- Best use: interview artifact for roles involving AI product analytics, causal inference, education data science, responsible AI governance, or learning infrastructure
- Supporting materials to add: DAG, analysis plan, schema diagram, rubric sample, governance appendix, and a short executive summary for nontechnical readers

## 11. Oral-Defense Questions

1. Why is "assigned access to AI" a better primary treatment than "actual AI use" for this design?

2. What would make the ITT estimate misleading even if randomization was implemented correctly?

3. Which assumption is most fragile in the proposed randomized access design, and what diagnostic would you prioritize first?

4. Why is final memo quality not sufficient evidence of student learning?

5. How would you distinguish AI assistance that improves reasoning from AI assistance that merely improves polish?

6. Which variables should not be adjusted for when estimating the total effect of access, and why?

7. How would you handle control-group contamination by external AI tools?

8. What privacy risks are created by logging AI interactions, and how should the study govern them?

9. If the artifact were implemented in a real course, what minimum data schema would be required before estimation?

10. What claim would you refuse to make even after finding a positive effect on final memo quality?

## 12. Recommended Competency Progress Updates

| Competency | Current Level in Learner State | Recommended Update | Evidence |
|---|---|---|---|
| Causal Identification and Counterfactual Reasoning | Emerging | Update to proficient | The artifact clearly defines treatment, outcome, population, estimand, counterfactual, identification strategy, assumptions, threats, diagnostics, and interpretation limits. The causal reasoning quality scores are consistently 4. |
| Model Construction and Assumption Analysis | Developing | Update to proficient | The artifact identifies assumptions, connects them to method and interpretation, and prioritizes them through diagnostics and risks if false. It treats models as controlled omissions and avoids overclaiming. |
| Epistemic Infrastructure Design | Emerging | Update to developing or proficient | The data-generating process, measurement pipeline, event logs, source systems, schema, missingness, logging bias, and instrumentation sections show strong infrastructure awareness. If the curriculum requires built implementation artifacts for proficiency, update to developing. If design memos are accepted as evidence, update to proficient. |
| Synthesis, Communication, and Intellectual Production | Developing | Maintain developing with strong positive evidence | The artifact is coherent, portfolio-facing, and interdisciplinary. However, it would be stronger with an executive summary, visual DAG, schema diagram, and implementation appendix before advancing this competency. |

Recommended learner-state notes:

- Add this artifact as evidence for causal_identification_and_counterfactual_reasoning.
- Add this artifact as evidence for model_construction_and_assumption_analysis.
- Add this artifact as evidence for epistemic_infrastructure_design.
- Update next step for causal identification to: "Convert the AI writing assistant memo into an implementation-ready study protocol with randomization plan, statistical analysis plan, and DAG."
- Update next step for epistemic infrastructure to: "Add governance, privacy, schema validation, and measurement pipeline implementation details."

## 13. Recommended Artifact Registry Update

Recommended registry entry:

```json
{
  "artifact_id": "AOS-COMB-001",
  "title": "AI Writing Assistance and the Quality of Student Analytical Memos",
  "type": "combined_identification_and_data_generating_process_memo",
  "path": "artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md",
  "module_id": "03_07",
  "module_name": "Causal Inference, Scientific Reasoning, and Identification; Data Engineering, Infrastructure, MLOps, and Production Systems",
  "primary_competencies": [
    "Causal Identification and Counterfactual Reasoning",
    "Epistemic Infrastructure Design"
  ],
  "secondary_competencies": [
    "Model Construction and Assumption Analysis",
    "Synthesis, Communication, and Intellectual Production"
  ],
  "status": "strong_portfolio_signal_revised_draft",
  "rubrics_used": [
    "causal_reasoning_quality",
    "assumption_awareness"
  ],
  "created_at": "",
  "updated_at": "2026-05-22",
  "notes": "Reviewed as a strong combined causal identification and data-generating process memo. Highest-leverage revisions: add statistical analysis plan, randomization protocol, privacy and governance appendix, scoring and rater reliability protocol, and formal DAG."
}
```
