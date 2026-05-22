# Artifact Review

## Artifact Metadata

- Artifact Title: AI Writing Assistance and the Quality of Student Analytical Memos
- Artifact Type: Combined identification and data-generating process memo
- Module: 03 Causal Inference, Scientific Reasoning, and Identification; 07 Data Engineering, Infrastructure, MLOps, and Production Systems
- Primary Competency: Causal Identification and Counterfactual Reasoning
- Secondary Competencies: Model Construction and Assumption Analysis; Epistemic Infrastructure Design; Synthesis, Communication, and Intellectual Production
- Reviewer: Hermes curriculum orchestrator
- Date: 2026-05-21

## 1. Artifact Claim

The artifact claims that the question "Does access to, or use of, an AI writing assistant improve the quality of student analytical memos?" should be treated as both a causal identification problem and a data-generating process problem, not as a simple comparison of average grades.

The central causal claim is stated as:

"For students assigned to write an analytical memo under comparable instructional conditions, using an AI writing assistant during the writing process causes a change in final memo quality, as measured by a predefined analytical writing rubric, compared with not using an AI writing assistant."

The artifact also claims that final memo quality is not equivalent to learning. It explicitly states that "Memo quality is an observable product. Learning is a deeper construct that may or may not be captured by the final artifact." This is a strong interpretive constraint and prevents the memo from overstating what the proposed evidence could support.

## 2. Method

The artifact uses a research design memo structure. Its method is to decompose the question into:

- treatment definition;
- outcome definition;
- population and unit of analysis;
- estimand;
- comparison or counterfactual;
- identification assumptions;
- data-generating process;
- measurement pipeline;
- missingness, selection, logging, and instrumentation bias;
- supportable and unsupported claims.

The memo considers several possible designs, including randomized access, randomized encouragement, within-student crossover, and observational comparison. It identifies randomized access or randomized encouragement with blind rubric scoring and baseline covariate measurement as the most credible default design.

The memo also uses data infrastructure analysis as part of causal reasoning. It describes source systems, human inputs, event logs, forms, APIs, administrative categories, timestamps, incentives shaping recording, and definition drift.

## 3. Evidence

The artifact supports its claim through conceptual and design evidence rather than empirical results. The strongest evidence includes:

- A specific treatment definition: students receive access to a specified AI writing assistant and a permitted-use protocol, with platform logs recording timing, prompts, response length, and revision behavior.
- A structured outcome definition: final analytical memo quality score, constructed from blind rubric scoring and decomposed into criterion-level scores.
- A clear estimand distinction: intent-to-treat for randomized access, average treatment effect on the treated for actual use, and conditional average treatment effects for subgroup analysis.
- An explicit counterfactual: what each student's memo quality would have been under the same conditions without AI assistance.
- An identification assumption table connecting assumptions to diagnostics and risks.
- A measurement pipeline table tracing raw writing behavior into logged records, stored tables, cleaned data, analytical variables, and final metrics.
- A limitations section separating causal limits, measurement limits, generalization limits, institutional limits, and ethical limits.

The artifact does not yet provide empirical evidence, a DAG, simulated data, a concrete statistical specification, a scoring appendix, or a data schema. It is therefore strongest as a research design and identification memo, not yet as an executable empirical study.

## 4. Assumptions

| Assumption | Stated or Implicit | Importance | Reviewer Comment |
|---|---|---|---|
| Random assignment creates comparable groups | Stated | High | The memo correctly ties this to baseline balance checks on writing scores, prior grades, AI familiarity, language background, and causal reasoning pretests. This is central if the proposed design uses randomized access. |
| Stable Unit Treatment Value Assumption | Stated | High | The memo identifies peer sharing, collaboration, and group work as possible spillover channels. This is especially important in educational settings where students may exchange AI-generated outlines or feedback. |
| Treatment compliance is measured or assignment is interpreted as access | Stated | High | The memo makes a strong distinction between access, actual use, encouragement, and compliance. This supports disciplined separation of ITT, treatment-on-the-treated, and local effects. |
| No hidden AI use in the control condition | Stated | High | The memo correctly identifies control contamination as a major threat. This is one of the most fragile assumptions because external AI tools are easy to access and difficult to observe. |
| Outcome scoring is blind to treatment | Stated | High | The memo recognizes that evaluator knowledge of AI use could cause scores to measure evaluator attitudes rather than memo quality. This is an important construct validity and bias concern. |
| Rubric validly measures analytical memo quality | Stated | High | The artifact appropriately treats memo quality as a constructed measure, not a natural fact. It should be strengthened by adding a scoring rubric appendix and inter-rater reliability plan. |
| Assignment prompt is equivalent across groups | Stated | Medium-high | The memo correctly notes that prompt, deadline, resources, and instructions must remain stable except for AI access. |
| No differential attrition | Stated | High | The memo identifies missing submissions and attrition reasons as diagnostic targets. This is important because treatment effects could be distorted if weaker students are selectively missing. |
| No major instrumentation change during study | Stated | High | The memo's attention to model versions, rubric versions, prompt versions, and platform drift is a major strength. |
| Baseline skill measures capture key heterogeneity | Stated | Medium-high | The memo identifies baseline writing skill, AI familiarity, English language background, and causal reasoning ability as moderators. This is useful for subgroup analysis but needs a more concrete measurement plan. |
| Student authorship remains meaningful | Stated | High | The memo appropriately adds process notes, AI-use appendices, and oral defense as evidence that final memo quality reflects student judgment rather than authorship substitution. |

## 5. Limitations

The artifact is analytically strong, but it does not yet establish the following:

- It does not estimate an effect. No data, model, sample, or result is provided.
- It does not yet choose one final design. It compares several possible designs and names a default, but the design is not fully specified.
- It does not include a DAG. The artifact itself notes this as a next revision.
- It does not provide a statistical analysis plan, such as regression specification, clustering choice, covariate adjustment, randomization inference, or missing-data strategy.
- It does not include a power analysis or minimum detectable effect.
- It does not include a concrete data schema for logs, submissions, rubrics, users, assignment status, or evaluator records.
- It does not include an evaluator training protocol or inter-rater reliability threshold.
- It does not fully distinguish the decision target from the estimand. The memo names pedagogical and product decision contexts, but it could more explicitly connect each decision to a different acceptable estimand and evidence standard.
- It does not yet specify how privacy, consent, and governance constraints would alter feasible measurement.

## 6. Rubric Scores

| Rubric | Criterion | Score 1-4 | Evidence for Score |
|---|---|---:|---|
| Causal Reasoning Quality | Causal Question | 4 | The artifact names the treatment, outcome, population, and estimand. It states the stronger question as: "Among students writing analytical memos for a structured curriculum assignment, what is the effect of using an AI writing assistant during drafting and revision on the evaluated quality of the final memo..." It also distinguishes pedagogical and product decision contexts. |
| Causal Reasoning Quality | Counterfactual Logic | 4 | The memo explicitly states the missing counterfactual: "For each student who used or had access to the AI writing assistant, what would the quality of that student's memo have been if the same student had completed the same assignment under the same conditions without AI assistance?" It also compares randomized access, randomized encouragement, crossover, and observational alternatives. |
| Causal Reasoning Quality | Identification Strategy | 3 | The artifact identifies randomized access or randomized encouragement with blind scoring and baseline covariates as the most credible default. It also explains why observational comparison is weakest. It earns proficient because the design fits the causal structure, but not advanced because it has not yet committed to one design with full implementation details, statistical specification, or robustness plan. |
| Causal Reasoning Quality | Assumption Defense | 4 | The identification assumptions table connects each assumption to why it matters, evidence or diagnostic checks, and risk if false. Examples include baseline balance checks, monitoring collaboration, platform logs, disclosure forms, blind grading, inter-rater reliability, attrition analysis, and versioning. |
| Causal Reasoning Quality | Threats to Validity | 4 | The memo names design-specific threats including control contamination, evaluator bias, spillovers, multi-component treatment, task prompt suitability, heterogeneous effects by baseline skill, missingness, logging bias, instrumentation bias, and definition drift. These are prioritized across causal, measurement, generalization, institutional, and ethical limits. |
| Causal Reasoning Quality | Interpretation Discipline | 4 | The memo repeatedly prevents overclaiming. It states that final memo quality is not the same as learning, that randomized access identifies access rather than necessarily actual use, and that observational use comparisons are weaker unless selection is unusually well measured. |
| Assumption-Awareness in Technical Work | Problem Framing | 4 | The problem is framed with purpose, audience, claim, and stakes. The memo distinguishes pedagogical decisions from product decisions and explicitly refuses to treat the question as a simple average-grade comparison. |
| Assumption-Awareness in Technical Work | Assumption Identification | 4 | Assumptions are not merely listed. They are connected to diagnostics, interpretation, and failure risks. The memo prioritizes fragile assumptions such as hidden control AI use, outcome validity, compliance, and authorship. |
| Assumption-Awareness in Technical Work | Data-Generating Process | 4 | The memo strongly satisfies this criterion. It states that "The data does not simply exist" and identifies source systems, human inputs, logs, forms, APIs, administrative categories, timestamps, incentives, and changes over time. It analyzes how institutional and technical systems shape what the data can mean. |
| Assumption-Awareness in Technical Work | Method Fit | 3 | The method fits the question and the memo explains why randomized access or encouragement is preferable. It earns proficient rather than advanced because plausible alternatives are discussed but not fully defended through a final design choice, feasibility comparison, or decision-specific tradeoff analysis. |
| Assumption-Awareness in Technical Work | Diagnostics and Sensitivity | 3 | The memo proposes many diagnostics: baseline balance, disclosure forms, usage audits, blind grading, multiple raters, attrition analysis, model versioning, and criterion-level scores. It does not yet provide a sensitivity analysis plan, robustness table, or pre-analysis diagnostic threshold. |
| Assumption-Awareness in Technical Work | Limitation Articulation | 4 | Limitations are extensive and tied to conclusions. The memo separates what the data can support from what it cannot support and explicitly refuses claims about learning without additional evidence such as oral defense, delayed assessment, revision analysis, or independent conceptual demonstration. |

## 7. Strengths

- The artifact shows strong identification discipline. It distinguishes access, use, encouragement, compliance, ITT, treatment-on-the-treated, and local effects rather than collapsing them into one vague treatment effect.
- The artifact treats outcome measurement as a constructed process. It recognizes that rubric scores are evaluator-produced measures shaped by scoring protocols, platform systems, and institutional definitions of quality.
- The artifact has unusually strong limitation discipline. It refuses to infer learning from final memo quality alone and names oral defense, delayed assessment, and revision analysis as needed supporting evidence.
- The treatment definition is thoughtful. It recognizes that "AI writing assistant use" may include brainstorming, editing, rubric critique, causal reasoning feedback, evidence support, rewriting, or producing large sections of text.
- The data-generating process section is a major portfolio strength. It demonstrates the curriculum principle that data are produced, not found.
- The memo is audience-aware. It can speak to instructors, education technology teams, AI governance committees, learning analytics groups, and portfolio reviewers.

## 8. Highest-Leverage Revisions

1. Commit to one primary design and make it executable.

   The artifact should choose a primary design, likely randomized access or randomized encouragement, and specify assignment mechanism, sample, compliance measurement, analysis population, primary estimand, covariate adjustment, clustering, missingness handling, and decision rule. This would move the memo from excellent conceptual design toward an implementable study protocol.

2. Add a DAG and use it to discipline the adjustment strategy.

   The memo already identifies baseline skill, motivation, prior achievement, AI familiarity, prompting skill, treatment use, and memo quality. A DAG would clarify which variables are confounders, mediators, moderators, colliders, or post-treatment variables. This would also prevent inappropriate adjustment for variables affected by treatment, such as time spent revising.

3. Add a measurement and scoring appendix.

   The outcome is central and constructed. The next version should include criterion-level scoring definitions, rater training rules, blind scoring protocol, inter-rater reliability target, adjudication procedure, and a plan for preserving criterion-level scores rather than only total scores.

4. Add a data schema for the logging and grading pipeline.

   The data-generating process section is strong but would become more operational with tables for student, assignment, treatment assignment, AI session, prompt event, document revision, submission, rubric score, evaluator, disclosure, and oral defense. Include keys, timestamps, version fields, and privacy constraints.

5. Add a sensitivity and robustness plan.

   The memo names threats but should specify tests or bounds. Examples include contamination sensitivity, attrition bounds, alternate outcome definitions, excluding high-copy AI usage, separate analysis of critique-only versus drafting-heavy use, rater fixed effects, and subgroup estimates by baseline skill.

6. More explicitly connect estimand to decision target.

   The memo names pedagogical and product decisions, but each decision may require different evidence. For example, "Should instructors permit AI?" may prioritize ITT under governed access, while "Does use improve reasoning?" may require oral defense and delayed assessment. The revised artifact should map decisions to estimands and required evidence.

## 9. Portfolio Readiness

Draft portfolio-ready after revision

Rationale: The artifact is already a strong signal of analytical judgment, especially in causal identification, assumption analysis, and data-generating process awareness. It is not yet fully portfolio-ready because it remains a design memo without a final design choice, DAG, data schema, scoring appendix, or analysis plan. With those additions, it could become a high-signal portfolio case study for education technology, AI governance, learning analytics, or product experimentation roles.

## 10. Portfolio Translation Recommendation

This should become a portfolio case study and technical research design memo.

Recommended portfolio framing:

- Title: Designing a Causal Study of AI Writing Assistance in Analytical Education
- Audience: education technology team, university writing program, learning analytics group, AI governance committee, or product experimentation team
- Format: public-facing case study plus technical appendix
- Core signal: the author can transform a vague AI impact question into a disciplined causal design and measurement infrastructure plan
- Suggested appendices:
  - DAG;
  - randomized access or encouragement protocol;
  - rubric scoring appendix;
  - data schema;
  - measurement pipeline;
  - privacy and governance note;
  - oral defense protocol;
  - sensitivity analysis plan.

The artifact should not be rewritten as a generic essay about AI in education. Its value is that it shows design judgment: treatment clarity, counterfactual reasoning, construct validity, and data infrastructure awareness.

## 11. Oral-Defense Questions

1. Why is "using an AI writing assistant" not a sufficiently precise treatment definition?

2. If randomized access is the primary design, what exactly is the estimand, and why is it not the same as the effect of actual use?

3. What variables would appear in your DAG, and which would you refuse to adjust for because they are post-treatment?

4. How would you detect or bound control-group contamination from external AI tools?

5. Why might final memo quality overstate actual student learning?

6. How would you design the oral defense so that it measures student understanding rather than performance confidence?

7. What would make blind rubric scoring invalid or unreliable in this setting?

8. If AI improves grammar but weakens independent causal reasoning, how would your outcome design detect that tradeoff?

9. Which assumption is most fragile in a randomized access design? Which is most fragile in an observational use design?

10. What claim would be justified for a product team but not for an instructor deciding an academic integrity policy?

## 12. Recommended Competency Progress Updates

| Competency | Current Level | Recommended Level | Evidence | Recommended Next Step |
|---|---|---|---|---|
| Causal Identification and Counterfactual Reasoning | emerging | developing, with evidence toward proficient | The artifact defines treatment, outcome, population, estimand, and counterfactual; distinguishes ITT, treatment-on-the-treated, encouragement, and observational comparison; and ties assumptions to identification. | Add a DAG and a final primary design with statistical specification, robustness checks, and decision-linked estimand. |
| Model Construction and Assumption Analysis | developing | proficient | The artifact identifies and prioritizes assumptions, connects them to diagnostics, and explains how violations would alter interpretation. | Convert the assumption table into a design checklist with diagnostic thresholds and sensitivity analyses. |
| Epistemic Infrastructure Design | emerging | developing, with evidence toward proficient | The artifact gives a strong account of source systems, human inputs, event logs, APIs, administrative categories, measurement pipeline, logging bias, and definition drift. | Add a concrete data schema and governance constraints for the logging, scoring, and oral-defense pipeline. |
| Synthesis, Communication, and Intellectual Production | developing | developing, strengthened evidence | The memo integrates causal inference, data infrastructure, measurement validity, educational policy, and AI governance in a coherent portfolio-facing artifact. | Convert the memo into a portfolio case study with a concise executive summary and technical appendix. |

Recommended learner-state evidence additions:

- Add `artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md` as evidence for `causal_identification_and_counterfactual_reasoning`.
- Add the same artifact as evidence for `model_construction_and_assumption_analysis`.
- Add the same artifact as evidence for `epistemic_infrastructure_design`.
- Add the same artifact as evidence for `synthesis_communication_and_intellectual_production`.

Recommended next steps:

- For causal identification: "Revise the AI writing assistant memo by adding a DAG, final primary design, estimand-to-decision mapping, and robustness plan."
- For model construction and assumption analysis: "Convert the assumption table into a prioritized diagnostic and sensitivity plan."
- For epistemic infrastructure design: "Add a logging, grading, disclosure, and oral-defense data schema with versioning and privacy constraints."
- For synthesis communication: "Translate the revised memo into a portfolio case study with a technical appendix."

## 13. Recommended Artifact Registry Update

Recommended registry entry:

```json
{
  "artifact_id": "AOS-COMB-001",
  "title": "AI Writing Assistance and the Quality of Student Analytical Memos",
  "type": "combined_identification_data_generating_process_memo",
  "path": "artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md",
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
  "status": "draft_portfolio_ready_after_revision",
  "rubrics_used": [
    "causal_reasoning_quality",
    "assumption_awareness"
  ],
  "review_status": "reviewed",
  "review_date": "2026-05-21",
  "portfolio_readiness": "draft_portfolio_ready_after_revision",
  "notes": "Strong combined identification and data-generating process memo. Highest-leverage revisions are to add a DAG, commit to a primary design, add scoring and data schema appendices, and specify sensitivity analyses."
}
```

Important correction: the artifact's embedded registry entry lists the path as `artifacts/projects/combined_identification_data_generating_process_memo_ai_writing_assistant.md`, but the reviewed file path is `artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md`. The registry should use the actual reviewed path unless the file is renamed.
