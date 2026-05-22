# Combined Identification and Data-Generating Process Memo

## Artifact Metadata

- Artifact Title: AI Writing Assistance and the Quality of Student Analytical Memos
- Artifact ID: AOS-COMB-001
- Primary Modules:
  - 03 Causal Inference, Scientific Reasoning, and Identification
  - 07 Data Engineering, Infrastructure, MLOps, and Production Systems
- Primary Competencies:
  - Causal Identification and Counterfactual Reasoning
  - Epistemic Infrastructure Design
- Secondary Competencies:
  - Model Construction and Assumption Analysis
  - Synthesis, Communication, and Intellectual Production
- Status: revised draft
- Date: 2026-05-21

## 1. Research or Product Question

Does access to, or use of, an AI writing assistant improve the quality of student analytical memos?

A more precise version is:

Among students completing a structured analytical memo assignment, what is the effect of being offered access to a specified AI writing assistant, under a defined permitted-use protocol, on the evaluated quality of the final memo, relative to completing the same assignment without offered access to that assistant?

This question has both a pedagogical and a product interpretation.

For an instructor, the decision may be whether to permit, require, restrict, or scaffold AI writing assistance in analytical writing assignments. For an education technology team, the decision may be whether to integrate AI writing support into a learning platform and what governance, disclosure, logging, and assessment infrastructure should accompany that integration.

The question should not be reduced to a comparison of average grades. A difference in memo scores could reflect improved analytical reasoning, better organization, more polished prose, altered effort, differential access to external tools, evaluator bias, control-group contamination, or changes in how the writing process is recorded and scored. The relevant problem is therefore not only whether scores differ, but whether the comparison supports a credible causal interpretation and whether the outcome is produced through a valid measurement process.

## 2. Causal Claim

The causal claim under consideration is:

The effect of AI writing assistant access on final analytical memo quality for students completing structured analytical memo assignments during a defined drafting and revision period.

A precise primary claim would be:

For students assigned to write an analytical memo under comparable instructional conditions, being offered access to a specified AI writing assistant under a defined use protocol causes a change in final memo quality, as measured by blind rubric scoring, compared with not being offered that access.

This claim is intentionally about access, not necessarily actual use. If access is randomized, the strongest primary estimand is the effect of assignment to AI access. Actual use is substantively important, but it is harder to interpret causally because students decide whether and how to use the assistant.

The claim should not be stated as "AI improves learning" without additional evidence. Final memo quality is an observable product constructed through a scoring process. Learning is a deeper construct that may require oral defense, delayed assessment, independent problem solving, or revision analysis to support.

## 3. Treatment or Intervention

The primary treatment is assignment to governed access to a specified AI writing assistant during the production of an analytical memo.

This treatment has several components:

- access to a named AI writing assistant or platform;
- availability during a defined assignment window;
- a permitted-use protocol;
- student-facing guidance on acceptable use;
- logging or disclosure infrastructure;
- a boundary between assistance and authorship substitution.

The preferred operational treatment definition is:

Students in the treatment group are offered access to a specified AI writing assistant for the duration of the memo planning, drafting, and revision window. The permitted-use protocol allows brainstorming, outlining, clarification of concepts, critique of draft arguments, identification of missing assumptions, revision suggestions, and style improvements. The protocol does not permit undisclosed generation of the final memo as a substitute for student authorship. Students must submit an AI-use disclosure describing how the assistant was used, and platform logs record session timing, prompt metadata, model version, and interaction counts when feasible.

The comparison condition is:

Students in the control group complete the same assignment with the same prompt, deadline, rubric, instructional materials, and access to ordinary non-AI course resources, but they are not offered access to the study-provided AI writing assistant during the assignment window.

This treatment definition separates several concepts that are often collapsed:

- assignment to access: whether the student was offered the assistant;
- actual use: whether the student interacted with the assistant;
- intensity of use: how often and how extensively the student used the assistant;
- mode of use: whether the assistant was used for brainstorming, critique, editing, drafting, or rewriting;
- compliance: whether the student followed the assigned condition and disclosure rules;
- contamination: whether control students used external AI tools.

The primary design should analyze assignment to access. Secondary analyses may examine actual use or use modes, but those analyses require stronger assumptions because use is selected. Students who use the assistant may differ from non-users in motivation, prior writing ability, anxiety, time pressure, technical fluency, or comfort evaluating AI output.

The treatment is not "AI" in general. It is a specific sociotechnical intervention: a particular model, interface, policy, assignment context, disclosure regime, and scoring environment. A critique-oriented assistant and a full-draft generator may have different effects. A version that explains weaknesses in causal reasoning may differ from one that primarily improves grammar. The treatment must therefore be versioned and documented.

## 4. Outcome

The primary outcome is final analytical memo quality.

Operational definition:

- Outcome name: final analytical memo quality score.
- Unit of measurement: memo-level blind rubric score, with preserved criterion-level subscores.
- Time window: final submission at the end of the assignment period.
- Source systems: learning management system submission, grading platform, evaluator rubric forms, and scoring database.
- Directly observed or constructed: constructed from evaluator judgments using a predefined rubric.
- Proxy status: proxy for analytical judgment, causal reasoning, assumption awareness, data-generating process awareness, interpretation discipline, and professional communication.

The outcome should not be treated as a natural fact. It is produced through a rubric, evaluator training, scoring workflow, platform interface, and institutional definition of quality.

The primary metric should be:

Mean blind rubric score on a 1 to 4 scale, averaged across prespecified analytical domains, with criterion-level scores retained for interpretation.

The recommended domains are:

- research question specification;
- treatment definition;
- outcome definition;
- population and unit of analysis;
- estimand clarity;
- counterfactual reasoning;
- identification assumptions;
- data-generating process analysis;
- measurement pipeline awareness;
- missingness, selection, logging, and instrumentation bias;
- limitation discipline;
- interpretation discipline;
- professional communication.

Criterion-level scores are essential. A total score could hide important tradeoffs. For example, AI access might improve organization and grammar while leaving identification assumptions weak. It might improve surface clarity while reducing evidence of independent reasoning. It might improve the final artifact but weaken oral defense performance.

Recommended secondary outcomes include:

- revision quality between draft and final memo;
- criterion-level improvement in causal reasoning;
- criterion-level improvement in assumption awareness;
- quality of the AI-use disclosure;
- oral defense performance;
- delayed assessment of core concepts;
- time to completion;
- student confidence or perceived usefulness.

Secondary outcomes should be interpreted carefully. Time to completion and confidence are not substitutes for analytical quality. Oral defense and delayed assessment are especially important if the decision question concerns learning rather than final artifact quality.

## 5. Population and Unit of Analysis

Target population:

Students learning to write analytical memos in courses, workshops, or curricula involving causal inference, policy analysis, economics, product analytics, data analysis, research methods, or AI governance.

Observed population:

Students enrolled in a specific course, program, workshop, or curriculum sequence where analytical memo assignments are administered and where AI assistant access, disclosure, submissions, and scoring can be governed or observed.

Primary unit of analysis:

The student-memo assignment. If each student writes one memo, the unit is the student. If each student writes multiple memos, memos are nested within students and the design must account for repeated observations.

Inclusion criteria:

- students assigned the same or comparable analytical memo task;
- students eligible for the same instructional resources except for randomized AI access;
- students with baseline writing or analytical skill measures available;
- students whose final memo can be scored with the same rubric;
- students whose assignment status and AI exposure status can be recorded.

Exclusion criteria:

- students who opt out of data use where consent is required;
- final submissions missing the memo file;
- assignments using substantially different prompts, rubrics, deadlines, or grading rules unless modeled explicitly;
- cases where treatment status cannot be determined and the design requires verified assignment or exposure.

Representativeness is limited. Students in a structured analytical curriculum may not represent all students. Students willing to disclose AI use may differ from those who hide it. Students with stronger prior writing ability may be better at prompting, evaluating, and revising AI outputs. These limits affect external validity even if internal validity is strong.

## 6. Estimand

The primary estimand should match the primary design.

### Primary Estimand: Intent-to-Treat Effect

If access to the AI assistant is randomized, the primary estimand is the Intent-to-Treat effect.

Plain English:

The average effect of being offered access to a specified AI writing assistant, under a defined permitted-use protocol, on final analytical memo quality among students in the study population.

Formal notation:

E[Y_i(Z_i = 1) - Y_i(Z_i = 0)]

where:

- i indexes students or student-memo assignments;
- Z_i = 1 means the student was assigned to AI assistant access;
- Z_i = 0 means the student was not assigned to AI assistant access;
- Y_i(Z_i = 1) is the potential memo quality score under assigned access;
- Y_i(Z_i = 0) is the potential memo quality score without assigned access.

This estimand is appropriate for the policy question: "What happens if an instructor or platform offers governed AI writing assistance?"

### Secondary Estimand: Effect of Actual Use

If actual use is analyzed, a possible secondary estimand is the Average Treatment Effect on the Treated.

Plain English:

The average effect of actually using the AI writing assistant on final analytical memo quality among students who used it.

Formal notation:

E[Y_i(D_i = 1) - Y_i(D_i = 0) | D_i = 1]

where D_i indicates actual AI use.

This estimand is harder to identify because actual use is not random in most settings. It may be related to motivation, baseline skill, confidence, time constraints, prior AI familiarity, or need for assistance. It should be treated as secondary unless there is a credible design such as randomized encouragement with appropriate assumptions.

### Secondary Estimand: Local Average Treatment Effect

If the study uses randomized encouragement rather than randomized access, the relevant estimand may be a Local Average Treatment Effect for compliers.

Plain English:

The average effect of actual AI use among students whose use of the assistant was changed by the randomized encouragement or training.

This estimand may be useful for product teams evaluating onboarding, nudges, or training, but it does not describe all students. It describes the subgroup induced to use the tool by the encouragement.

### Conditional Effects

Conditional Average Treatment Effects may be relevant by:

- baseline writing skill;
- prior causal reasoning ability;
- prior AI familiarity;
- language background;
- assignment difficulty;
- mode of AI use.

These subgroup analyses should be prespecified. They matter because AI assistance may reduce gaps for some students while amplifying advantages for students who already know how to ask strong questions and evaluate model output.

### Estimand to Decision Mapping

| Decision | Most Relevant Estimand | Additional Evidence Needed |
|---|---|---|
| Should instructors offer governed AI access? | Intent-to-Treat effect of assigned access | Blind rubric scores, contamination checks, attrition analysis, criterion-level outcomes |
| Should a platform integrate AI writing support? | Effect of offered access or randomized encouragement | Usage logs, model versioning, subgroup effects, privacy and governance review |
| Does actual AI use improve analytical reasoning? | Effect of actual use, preferably with encouragement design or strong adjustment | Oral defense, delayed assessment, revision analysis, baseline skill measures |
| Does AI improve learning rather than artifact quality? | Not established by memo score alone | Independent assessments, oral defense, delayed transfer tasks |
| Which forms of AI help are pedagogically acceptable? | Effects by use mode or treatment variant | Mode classification, disclosure quality, process evidence, criterion-level outcomes |

## 7. Comparison or Counterfactual

The core counterfactual is:

For each student assigned to AI assistant access, what would that same student's final memo quality have been if the student had completed the same assignment without being offered access to the assistant, under otherwise identical instructional and assessment conditions?

This counterfactual cannot be observed directly. The design must construct a comparison group that approximates it.

### Primary Comparison Strategy: Randomized Access

Students are randomly assigned to be offered AI assistant access or not offered study-provided access. Both groups receive the same assignment prompt, deadline, rubric, instructional materials, and grading process. This design is the most credible default for estimating the effect of offered access.

Its main advantage is that randomization makes treatment and control groups comparable in expectation. Its main limitation is that it estimates access, not necessarily actual use. Noncompliance and external AI use can weaken the contrast.

### Alternative Strategy: Randomized Encouragement

All students may be permitted to use AI, but some are randomly encouraged, trained, or scaffolded to use it. This design may be more feasible in environments where restricting access is unrealistic or undesirable. It estimates the effect of encouragement and may identify a local effect of use among students induced by the encouragement.

### Alternative Strategy: Within-Student Crossover

Students complete multiple memos, some with AI assistance and some without, with order randomized. This controls for stable student traits but creates risks of carryover learning, prompt difficulty differences, and contamination across assignments.

### Weakest Strategy: Observational Use Comparison

Students who use AI are compared with students who do not. This comparison is vulnerable because use is selected. It may be useful for descriptive analysis, but it is not a strong causal design unless the selection process is unusually well measured and defended.

### Remaining Alternative Explanations

Even with randomization, alternative explanations may remain:

- control students may use external AI tools;
- treated students may receive help from peers or tutors differently;
- evaluators may infer AI use from prose style;
- AI access may increase time spent revising rather than directly improving reasoning;
- AI may improve grammar but not causal reasoning;
- students may use AI to substitute for understanding;
- effects may depend on baseline skill or prompting ability;
- the AI model, rubric, or assignment prompt may change during the study.

A credible memo must state these threats before estimating effects.

## 8. Identification Assumptions

| Assumption | Why It Matters | Evidence or Diagnostic | Risk If False |
|---|---|---|---|
| Random assignment is implemented correctly | Needed for assigned access and non-access groups to be comparable in expectation | Audit assignment records; verify allocation rule; check baseline balance on prior writing scores, grades, AI familiarity, language background, and causal reasoning pretest | Estimated effect may reflect pre-existing differences |
| Treatment condition is well-defined | Required for interpreting what the effect is an effect of | Document platform, model version, interface, access dates, permitted-use protocol, and student instructions | The estimate may combine incompatible interventions |
| Control condition is meaningful | Needed for a real contrast between offered access and non-access | Define allowed resources; collect disclosure forms; monitor external AI risk where ethically feasible | The treatment contrast may be diluted or misdescribed |
| Stable Unit Treatment Value Assumption holds approximately | One student's treatment should not affect another student's outcome | Monitor collaboration, peer sharing, group work, shared documents, and reuse of AI-generated outlines | Control students may indirectly receive AI benefits |
| Compliance is measured or the estimand remains assignment-based | Actual use may differ from assigned access | Use platform logs, disclosure forms, and usage summaries; report take-up rates | ITT may be misinterpreted as the effect of actual use |
| Hidden AI use in the control group is limited or bounded | Control contamination biases effects toward zero and changes interpretation | Disclosure forms, process notes, controlled writing sessions where appropriate, sensitivity analysis for contamination | A null effect may reflect contamination rather than no effect |
| Outcome scoring is blind to treatment | Evaluator knowledge can affect scores | Remove treatment labels and AI disclosures from grading packets; use anonymized submissions; use multiple raters | Scores may measure evaluator attitudes toward AI |
| Rubric validly measures analytical memo quality | The outcome must match the construct | Align rubric to causal reasoning and assumption-awareness criteria; retain criterion-level scores; use rater training | Study may detect polish rather than analytical quality |
| Scoring is reliable across evaluators | Random or systematic rater differences can distort results | Estimate inter-rater reliability; use adjudication; include rater identifiers | Effects may reflect rater severity rather than memo quality |
| Assignment prompt is equivalent across groups | Prompt differences could confound treatment effects | Use same prompt, deadline, resources, and instructions except AI access | Effects may reflect assignment variation |
| No differential attrition | Missing submissions should not depend jointly on treatment and potential outcomes | Compare submission rates by group; document reasons for missingness; conduct attrition sensitivity analysis | Complete-case results may be biased |
| No inappropriate adjustment for post-treatment variables | Variables affected by treatment can block mechanisms or induce bias | Prespecify covariates; treat time spent revising and number of drafts as possible mediators, not baseline confounders | Estimated effect may be overcontrolled or distorted |
| Instrumentation is stable | Changes in model, logs, rubric, or platform can mimic treatment effects | Version model, rubric, prompt, platform, and scoring protocol | Observed differences may reflect infrastructure drift |
| Authorship remains meaningful | Final memo should remain evidence of student judgment | Require process notes, AI-use appendix, and oral defense | Memo quality may not indicate student understanding |

## 9. Causal Structure and Adjustment Logic

A simplified causal structure would include:

- baseline writing skill;
- prior analytical reasoning ability;
- motivation and time availability;
- prior AI familiarity;
- prompting skill;
- assignment to AI access;
- actual AI use;
- mode and intensity of use;
- revision behavior;
- final memo quality;
- evaluator scoring.

In a randomized access design, baseline variables are not needed to remove confounding between assignment and outcome, but they can improve precision and support subgroup analysis. They can also reveal implementation problems if randomization failed.

The analysis should avoid adjusting for variables affected by treatment when estimating the total effect of access. Examples include number of AI prompts, time spent revising, draft length, revision count, or confidence after using the assistant. These may be mediators rather than confounders. They can be analyzed descriptively or in mechanism analyses, but they should not be automatically included in the primary adjustment set.

A text DAG can be stated as:

Baseline skill, prior achievement, motivation, AI familiarity, and language background may affect actual AI use and memo quality. Randomized assignment affects access. Access affects actual use. Actual use may affect revision behavior, memo structure, reasoning quality, and final memo quality. Evaluator scoring converts memo quality into measured outcome. If assignment is randomized, the primary comparison between assigned access and assigned non-access does not require conditioning on baseline traits for identification, though baseline traits may improve precision.

## 10. Data-Generating Process

The data do not simply exist. They are produced by a chain of educational, technical, and evaluative systems.

### Source Systems

Relevant source systems include:

- course roster or learning platform;
- assignment prompt and instruction documents;
- AI writing assistant platform;
- platform logs for access, sessions, prompts, responses, and timestamps;
- document editor revision history if available;
- learning management system submission records;
- rubric scoring platform;
- evaluator forms;
- AI-use disclosure forms;
- baseline surveys or diagnostic writing tasks;
- optional oral defense records.

### Human Inputs

The data are shaped by human decisions:

- students decide whether to use AI, what to ask, what to accept, what to reject, and what to disclose;
- instructors define the assignment, permitted-use policy, and scoring rubric;
- evaluators interpret rubric criteria and assign scores;
- administrators define categories such as valid submission, policy violation, treatment assignment, and missing work;
- researchers decide how raw traces become analytical variables.

### Event Logs

Potential events include:

- assignment release;
- treatment assignment;
- AI account activation;
- first AI interaction;
- prompt submission;
- assistant response;
- document edit;
- draft save;
- draft submission;
- final submission;
- AI-use disclosure submission;
- evaluator scoring;
- adjudication;
- oral defense completion.

Each event should have a timestamp, user identifier or pseudonymous key, assignment identifier, and version fields where relevant.

### Administrative Categories

The system must define:

- student;
- assignment;
- memo;
- treatment assignment;
- offered access;
- actual use;
- use intensity;
- use mode;
- valid submission;
- missing submission;
- evaluator;
- rubric score;
- oral defense record;
- disclosure status;
- policy violation;
- excluded case.

These categories are not neutral. For example, defining "AI use" as any login will produce a different measure from defining it as substantive prompt-response interaction during drafting. Defining "quality" as total score will produce a different outcome from preserving causal reasoning and assumption-awareness subscores.

### Incentives Shaping Recording

The recorded data may be shaped by incentives:

- students may underreport AI use if they fear punishment;
- students may overreport use if they believe it is expected;
- students may use unmonitored external AI tools;
- evaluators may reward polished prose even when reasoning is weak;
- instructors may unintentionally signal preferred conclusions;
- platform logs may record access but not cognitive reliance;
- privacy rules may restrict collection of prompt content.

### Changes Over Time

The study should track:

- AI model version;
- interface version;
- system prompt or guardrail changes;
- assignment prompt version;
- rubric version;
- scoring protocol version;
- evaluator training version;
- institutional AI policy changes.

Versioning is part of causal validity because changes in the intervention or measurement system can produce changes in observed outcomes.

## 11. Measurement Pipeline

| Stage | Transformation | Assumption | Possible Failure |
|---|---|---|---|
| Raw writing process | Student thinks, drafts, prompts AI, revises, consults resources, and submits a memo | Relevant work leaves interpretable traces | Cognitive work occurs offline, in private notes, peer conversations, or external tools |
| Treatment assignment record | Student is assigned to offered access or non-access | Assignment is recorded accurately and linked to the right student | Assignment errors, late access activation, or identity mismatches |
| AI interaction log | Platform records sessions, prompts, responses, timestamps, model version, and user ID | Logs capture relevant study-provided AI exposure | External AI use, deleted sessions, shared accounts, missing logs, or privacy redaction |
| Disclosure form | Student reports whether and how AI was used | Students understand the policy and report honestly | Fear, confusion, or strategic reporting distorts use measures |
| Submission record | Learning platform stores final memo and submission time | Final file is complete and linked to the correct assignment | Wrong file, late upload, duplicate submission, or missing metadata |
| Scoring record | Evaluators score anonymized memos using a rubric | Raters apply criteria consistently and remain blind to treatment | Rater bias, rubric drift, recognition of AI-like style, or inconsistent interpretation |
| Cleaned analytical table | Records are linked, deduplicated, filtered, and transformed | Cleaning rules preserve meaningful variation | Exclusion rules remove noncompliant, struggling, or low-resource students |
| Analytical variables | Treatment, outcome, baseline covariates, compliance, and missingness flags are constructed | Operational variables match causal concepts | "Use" measures login rather than assistance; "quality" measures polish rather than reasoning |
| Final metric | Effects are estimated using prespecified comparisons | Model and estimand align | Result is interpreted as learning, mechanism, or general effect beyond what design supports |

The pipeline should preserve criterion-level scores, rater identifiers, version fields, missingness indicators, and assignment status. It should not collapse the entire process into a single total score without retaining the information needed to diagnose construct validity.

## 12. Proposed Data Schema

A portfolio-ready implementation would require a minimal schema such as:

| Table | Key Fields | Purpose |
|---|---|---|
| students | student_id, baseline_skill_score, prior_ai_familiarity, language_background_indicator, consent_status | Defines observed population and baseline covariates |
| assignments | assignment_id, prompt_version, rubric_version, deadline, course_context | Documents task context |
| treatment_assignment | student_id, assignment_id, assigned_access, assignment_timestamp, randomization_block | Records randomized condition |
| ai_sessions | session_id, student_id, assignment_id, model_version, start_time, end_time, prompt_count | Measures study-provided AI exposure |
| ai_events | event_id, session_id, timestamp, event_type, prompt_category, response_metadata | Captures interaction patterns without requiring unsupported claims about cognition |
| submissions | submission_id, student_id, assignment_id, submission_time, valid_submission_flag, file_version | Links final artifacts to students and assignments |
| disclosures | disclosure_id, student_id, assignment_id, reported_use, use_modes, narrative_summary | Captures self-reported use and compliance |
| rubric_scores | score_id, submission_id, rater_id, criterion, score, comment, scoring_timestamp | Preserves criterion-level outcome data |
| raters | rater_id, training_version, role, calibration_status | Supports reliability and bias checks |
| oral_defense | defense_id, student_id, assignment_id, score, evaluator_id, completion_status | Supports claims about understanding beyond the final memo |

This schema is illustrative rather than empirical. It specifies what would need to be collected for a credible study; it does not claim that such data already exist.

## 13. Missingness, Selection, Logging, and Instrumentation Bias

### Missingness

Potentially missing data include:

- unsubmitted memos;
- incomplete drafts;
- writing done outside the monitored editor;
- external AI use;
- peer or tutor assistance;
- deleted AI sessions;
- incomplete disclosure forms;
- missing baseline writing scores;
- missing evaluator comments;
- missing oral defense records.

Missingness may be informative. Students struggling most with the assignment may be more likely to miss deadlines, use unobserved help, submit incomplete work, or avoid disclosure. If missingness differs by treatment condition, complete-case analysis may be misleading.

### Selection

Selection enters through:

- course enrollment;
- consent to data use;
- compliance with assigned condition;
- choice to use AI when access is offered;
- prior familiarity with AI tools;
- ability to evaluate AI suggestions;
- willingness to disclose use;
- availability for oral defense.

If the analysis focuses on actual use rather than randomized access, selection becomes central. AI users and non-users may differ before the treatment in ways that affect memo quality.

### Logging Bias

Logging is partial. A monitored institutional assistant may produce detailed logs, while personal AI tools may produce no accessible records. Login counts may not measure substantive assistance. Prompt counts may not measure quality of use. A student who asks one high-value critique question may receive more meaningful assistance than a student who submits many superficial prompts.

Other logging risks include:

- session timeouts splitting one writing episode into many sessions;
- shared accounts;
- missing copy-paste traces;
- privacy redaction of prompt content;
- timestamp errors;
- schema changes during the study.

### Instrumentation Bias

Measurement can change behavior. If students know AI use is monitored, they may use it less, use it differently, or write disclosures strategically. If evaluators expect AI-assisted prose to sound polished, they may penalize generic style or reward apparently human imperfection.

The AI assistant is itself an instrument. Its interface, latency, guardrails, prompt suggestions, response style, and model version shape the treatment. The study must treat the tool as part of the intervention, not as a neutral delivery mechanism.

### Definition Drift

Definitions may change over time:

- "AI use" may expand from grammar correction to substantive reasoning support;
- "memo quality" may shift as evaluators adapt to AI-polished prose;
- rubric interpretation may drift after repeated scoring;
- model updates may change the quality of assistance;
- institutional policy may redefine acceptable help;
- student norms may change as AI becomes routine.

Definition drift should be managed through versioning, documentation, and prespecified scoring rules.

## 14. Diagnostics, Robustness, and Sensitivity Plan

A stronger design should include prespecified diagnostics.

Recommended diagnostics:

- randomization audit;
- baseline balance table;
- take-up rate among assigned-access students;
- reported external AI use among control students;
- submission and attrition rates by condition;
- inter-rater reliability for rubric scores;
- rater severity checks;
- criterion-level outcome analysis;
- model, rubric, prompt, and platform version audit;
- missingness comparison by treatment group.

Recommended robustness checks:

- estimate effects with and without baseline covariate adjustment;
- report total score and criterion-level scores separately;
- exclude or separately flag cases with high authorship-substitution risk;
- conduct sensitivity analysis for control contamination;
- conduct attrition bounds if missingness differs by condition;
- estimate results by baseline skill subgroup if prespecified;
- compare results using alternative outcome aggregations;
- include rater fixed effects or rater calibration adjustments where appropriate.

These checks should not be used to search for a favorable result. They should be tied to the most fragile assumptions: control contamination, outcome validity, scoring reliability, differential attrition, compliance, and authorship.

## 15. What the Data Can Support

If assignment to AI access is randomized, compliance and contamination are measured, outcomes are blindly scored, and the rubric is valid and reliable, the data could support a claim such as:

In this instructional setting, offering students access to a specified AI writing assistant under a defined permitted-use protocol caused an average change in final analytical memo quality, as measured by blind rubric scores, relative to students not offered that access.

The data may also support more specific claims if the evidence is collected and analyzed appropriately:

- whether AI access changed criterion-level scores in causal reasoning, assumption awareness, or communication;
- whether effects differed by baseline skill or prior AI familiarity;
- whether access affected revision behavior;
- whether final memo gains were accompanied by oral defense performance;
- whether usage patterns suggest critique, editing, or drafting as plausible mechanisms.

The strongest claim is design-dependent. A randomized access study supports the effect of offered access. A randomized encouragement study supports the effect of encouragement and may identify a local effect for compliers. An observational use comparison supports weaker causal claims unless selection is exceptionally well measured and justified.

## 16. What the Data Cannot Support

The analysis cannot automatically establish that AI writing assistants improve student learning. A better final memo may reflect better editing, clearer structure, more fluent prose, or AI-generated reasoning rather than durable student understanding.

Causal limits:

- If access is not randomized, differences may reflect selection.
- If control students use external AI, the treatment contrast is weakened.
- If students share AI-generated outlines or feedback, spillovers contaminate estimates.
- If the treatment combines many modes of AI use, the estimate may not identify which component caused the effect.
- If post-treatment variables are adjusted for incorrectly, the estimate may block part of the treatment effect.

Measurement limits:

- Rubric scores are constructed judgments, not direct observations of quality.
- Writing fluency may be easier to score than causal reasoning.
- A total score may hide tradeoffs across criteria.
- Platform logs measure recorded interactions, not cognitive reliance.
- AI-use disclosures may be inaccurate or strategically written.

Generalization limits:

- Results from one course, assignment, model, rubric, or student population may not generalize.
- Effects may differ for novice and advanced students.
- Effects may change as AI systems and student norms evolve.
- A governed assistant in a structured curriculum may not generalize to unrestricted public AI use.

Institutional limits:

- A study of memo quality does not by itself determine academic integrity policy.
- The effect on grades may differ from the effect on learning.
- Instructors may need different rules for practice assignments, graded assessments, and portfolio artifacts.
- Product usefulness does not automatically imply pedagogical appropriateness.

Ethical limits:

- Students should not be unknowingly subjected to invasive monitoring.
- AI-use logs may contain sensitive cognitive, academic, or personal information.
- Restrictions on AI may disadvantage students who rely on assistive technologies.
- Permissive AI policies may advantage students with stronger prompting skills.
- Governance should distinguish learning support from authorship substitution.

## 17. Portfolio-Facing Interpretation

This memo demonstrates how to transform a vague AI impact question into a disciplined causal and infrastructural research design. It does not ask only whether "AI works." It asks what the treatment is, what the outcome measures, what counterfactual is missing, what assumptions make the comparison credible, and how the data are produced.

Competencies evidenced:

- defining treatment, outcome, population, and estimand;
- distinguishing access, actual use, encouragement, compliance, and contamination;
- aligning estimands with decision contexts;
- identifying the missing counterfactual;
- tying identification assumptions to diagnostics;
- separating product quality from learning;
- treating educational data as produced through platforms, policies, rubrics, logs, and human judgment;
- preserving interpretation discipline under uncertainty.

As a portfolio artifact, this memo could serve as a technical research design case study for education technology, learning analytics, AI governance, product experimentation, or curriculum assessment roles. It shows that the author can reason across causal inference, measurement validity, data infrastructure, institutional constraints, and ethical stakes.

A reviewer or interviewer should learn that the author does not treat data as neutral residue, does not treat AI as a single uniform intervention, and does not treat score differences as automatic causal evidence. The professional signal is disciplined judgment: the ability to define a decision-relevant question, specify the evidence required, and state what the evidence cannot prove.

## 18. Oral-Defense Questions

1. What is the treatment, and why is it not simply "AI use"?

The treatment is governed access to a specified AI writing assistant under a defined permitted-use protocol during a defined assignment window. It is not simply "AI use" because use can mean brainstorming, critique, editing, drafting, rewriting, or authorship substitution. These modes may have different effects.

2. What is the primary estimand in a randomized access design?

The primary estimand is the Intent-to-Treat effect: the average effect of being offered access to the AI writing assistant on final analytical memo quality among students in the study population.

3. Why is the effect of actual use harder to identify?

Actual use is selected. Students who use the assistant may differ from non-users in motivation, baseline skill, anxiety, time constraints, AI familiarity, or prompting ability. Randomized access protects the assignment comparison, but it does not make actual use random.

4. What is the missing counterfactual?

For each student assigned to AI access, the missing counterfactual is the quality of that same student's memo if the student had completed the same assignment without being offered AI access under otherwise identical conditions.

5. What assumption is most fragile?

In a randomized access design, the most fragile assumptions are likely limited control contamination, valid measurement of memo quality, and meaningful student authorship. In an observational use design, the most fragile assumption is that selection into use can be adequately measured and adjusted for.

6. Why might final memo quality overstate learning?

The final memo may reflect AI-supported organization, editing, or generated reasoning that the student cannot independently explain. Learning requires additional evidence such as oral defense, delayed assessment, revision analysis, or independent application.

7. How is the outcome produced as data?

Students submit memos, evaluators apply a rubric, scores are entered into a platform, records are linked to treatment assignment and baseline data, and final metrics are constructed. The outcome is therefore a measured construct shaped by rubric design, evaluator training, platform workflow, and institutional definitions of quality.

8. What claim would you refuse to make?

I would refuse to claim that AI writing assistants improve student learning in general based only on final memo scores from one setting. I would also refuse to generalize from one assistant, assignment, rubric, course, or student population to all AI-assisted writing contexts.

## Revision Note

This revision strengthens the original memo by making the primary treatment a governed access intervention rather than a vague category of AI use. It sharpens the outcome definition by treating final memo quality as a constructed rubric-based measure with criterion-level subscores, rather than a simple total score. It clarifies the primary estimand as an Intent-to-Treat effect under randomized access and separates it from actual-use, encouragement, local-effect, and subgroup estimands.

The revision also strengthens the counterfactual by tying it to the primary access design, expands the identification assumptions into a more diagnostic table, adds causal structure and adjustment logic, and warns against inappropriate adjustment for post-treatment variables. It deepens the data-generating process section by specifying source systems, event logs, administrative categories, incentives, and versioning requirements. It adds a measurement pipeline and illustrative data schema to make the infrastructure more operational while avoiding unsupported empirical claims.

Finally, the revision strengthens limitations, diagnostics, sensitivity analysis, and portfolio framing. It preserves the original artifact's purpose: to show that evaluating AI writing assistance requires causal identification, construct-valid measurement, and data-generating process awareness rather than simple comparison of observed scores.
