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
- Status: draft
- Date:

## 1. Research or Product Question

Does access to, or use of, an AI writing assistant improve the quality of student analytical memos?

A stronger analytical version is:

Among students writing analytical memos for a structured curriculum assignment, what is the effect of using an AI writing assistant during drafting and revision on the evaluated quality of the final memo, relative to writing without AI assistance, as judged by a rubric that measures causal reasoning, assumption awareness, evidence use, structure, and interpretation discipline?

The decision context matters. If the question is pedagogical, the relevant decision is whether instructors should permit, require, restrict, or scaffold AI writing assistant use. If the question is product-oriented, the relevant decision is whether a learning platform should integrate AI writing support and under what governance conditions.

This memo treats the question as a causal and infrastructural problem, not merely as a comparison of average grades. The same observed score difference could reflect real learning, better surface polish, differential access, evaluator bias, altered student effort, or changes in how the memo was produced as data.

## 2. Causal Claim

The effect of using an AI writing assistant on analytical memo quality for students completing structured analytical memo assignments over the drafting and revision period.

A precise claim would be:

For students assigned to write an analytical memo under comparable instructional conditions, using an AI writing assistant during the writing process causes a change in final memo quality, as measured by a predefined analytical writing rubric, compared with not using an AI writing assistant.

The claim should not initially be stated as "AI improves learning." Memo quality is an observable product. Learning is a deeper construct that may or may not be captured by the final artifact.

## 3. Treatment or Intervention

The treatment is student use of an AI writing assistant during the production of an analytical memo.

A well-defined treatment must specify:

- what changes: the student has access to an AI writing assistant for brainstorming, outlining, drafting, revising, clarifying concepts, identifying weaknesses, or improving style;
- who receives it: students in the treatment condition, or students whose actual use meets a defined exposure threshold;
- when it occurs: during the memo planning, drafting, and revision window before final submission;
- how exposure is assigned or observed: either randomized access, randomized encouragement, platform log measurement, or self-reported use;
- whether treatment intensity varies: students may use the assistant once, repeatedly, superficially, or deeply;
- what counts as non-treatment: no AI writing assistant access or no recorded use of AI writing assistance during the assignment period.

The treatment is not a single natural object. "Using an AI writing assistant" can include several different interventions:

- idea generation;
- sentence-level editing;
- rubric-based critique;
- causal reasoning feedback;
- citation or evidence support;
- rewriting student prose;
- producing large sections of the memo.

These modes may have different effects. A student who uses AI for targeted critique may improve reasoning, while a student who uses AI to outsource drafting may submit a polished but shallow memo. Therefore, the treatment should either be standardized or decomposed into treatment variants.

Preferred operational definition:

Students in the treatment group receive access to a specified AI writing assistant and a permitted-use protocol. The protocol allows brainstorming, outlining, critique, and revision suggestions, but requires the student to make final decisions and disclose use. Platform logs record timing, prompts, response length, and revision behavior.

## 4. Outcome

The primary outcome is analytical memo quality.

Outcome definition:

- outcome name: final analytical memo quality score;
- unit of measurement: rubric score at the memo level, possibly decomposed into criterion-level scores;
- time window: final submission at the end of the assignment period;
- source system: learning management system submission, grading platform, rubric scoring database, and possibly blind evaluator forms;
- whether directly observed or constructed: constructed from evaluator judgments using a rubric;
- whether proxy for deeper value: yes, memo quality is a proxy for analytical judgment, causal reasoning, assumption awareness, and communication skill.

A defensible outcome should avoid reducing quality to generic writing fluency. The outcome should include dimensions aligned with the curriculum:

- clarity of research question;
- treatment, outcome, population, and estimand definition;
- counterfactual reasoning;
- identification assumptions;
- data-generating process awareness;
- measurement and selection analysis;
- limitation discipline;
- professional communication.

Possible primary metric:

Mean blind rubric score on a 1 to 4 scale, averaged across the following domains:

- causal question specification;
- counterfactual logic;
- identification strategy;
- assumption defense;
- data-generating process analysis;
- measurement pipeline awareness;
- limitation articulation;
- interpretation discipline.

Possible secondary outcomes:

- revision quality between draft and final memo;
- time to completion;
- student confidence;
- evaluator perception of originality;
- oral defense performance;
- retention of concepts on a later assessment.

The oral defense outcome is important because final memo quality alone may overstate learning if the AI assistant helped produce claims the student cannot defend.

## 5. Population and Unit of Analysis

Target population:

Students who are learning to produce analytical memos in courses or curricula involving causal inference, policy analysis, data analysis, product analytics, economics, or research methods.

Observed population:

Students enrolled in a specific course, program, workshop, or curriculum sequence where analytical memo assignments are administered and AI assistant use can be governed or observed.

Unit of analysis:

The primary unit of analysis is the student-memo assignment. If each student writes one memo, the unit is the student. If each student writes multiple memos, the unit is the memo nested within student.

Inclusion criteria:

- students assigned the same or comparable analytical memo task;
- students with baseline writing or analytical skill measures available;
- students whose final memo can be scored by the same rubric;
- students whose AI exposure status can be assigned or measured.

Exclusion criteria:

- submissions with missing final memo files;
- students who opt out of data use;
- students with unobservable treatment status if the design requires verified exposure;
- assignments using substantially different prompts, rubrics, or grading conditions unless modeled explicitly.

Representativeness:

The observed data may not represent the target population. Students in a highly structured analytical curriculum may use AI differently from students in general education courses. Students willing to disclose AI use may differ from students who hide it. Students with better prior writing ability may also be more effective at prompting, evaluating, and revising AI output.

## 6. Estimand

The preferred estimand depends on the design.

If access to the AI assistant is randomized:

The primary estimand is the Intent-to-Treat effect.

Plain English:

The average effect of being offered access to an AI writing assistant, under a defined use protocol, on final analytical memo quality among students in the study population.

Formal notation:

E[Y_i(Z = 1) - Y_i(Z = 0)]

where Z is assignment to AI assistant access.

If actual use is analyzed:

The estimand may be the Average Treatment Effect on the Treated.

Plain English:

The average effect of actually using the AI writing assistant on final analytical memo quality among students who used it.

Formal notation:

E[Y_i(1) - Y_i(0) | D_i = 1]

where D_i is actual AI use.

The Intent-to-Treat estimand is usually more credible if assignment is randomized because it preserves the comparison created by randomization. The effect of actual use is substantively interesting but harder to identify because actual use is likely selected. Students who use the assistant may be more motivated, more anxious, weaker writers, stronger self-regulators, or more comfortable with technology.

A secondary Conditional Average Treatment Effect may be useful:

The effect of AI assistant access by baseline writing skill, prior AI familiarity, English language background, or initial causal reasoning ability.

This matters because AI assistance may reduce gaps for some students while amplifying advantages for students who already know how to ask better questions and evaluate outputs.

## 7. Comparison or Counterfactual

The missing counterfactual is:

For each student who used or had access to the AI writing assistant, what would the quality of that student's memo have been if the same student had completed the same assignment under the same conditions without AI assistance?

This cannot be directly observed. A credible design must construct a comparison group that approximates this missing counterfactual.

Possible comparison strategies:

1. Randomized access design

Students are randomly assigned to AI assistant access or no AI assistant access. The comparison group is students assigned to write without AI access. This is the strongest simple design for estimating the effect of access.

2. Randomized encouragement design

All students are allowed to use AI, but some are randomly encouraged or trained to use it. This estimates the effect of encouragement and may identify a Local Average Treatment Effect for students induced to use AI by the encouragement.

3. Within-student crossover design

Students write multiple memos, some with AI assistance and some without, with assignment order randomized. This controls for stable student-level traits but introduces risks of carryover learning and task difficulty differences.

4. Observational comparison

Students who use AI are compared with students who do not. This design is weakest unless there is rich baseline measurement and a credible adjustment strategy.

Most credible default:

A randomized access or randomized encouragement design with blind rubric scoring and baseline covariate measurement.

Remaining alternative explanations:

- treated students may spend more time revising because the intervention increases engagement;
- control students may use external AI tools despite restrictions;
- evaluators may detect AI-like prose and score differently;
- AI use may improve grammar without improving reasoning;
- students may use AI to mask weak understanding;
- task prompts may be more or less suited to AI assistance;
- students with stronger baseline skills may benefit more from AI because they can better judge its suggestions.

## 8. Identification Assumptions

| Assumption | Why It Matters | Evidence or Diagnostic | Risk If False |
|---|---|---|---|
| Random assignment creates comparable groups | Needed for the treatment and control groups to differ only by AI access in expectation | Check baseline balance on prior writing scores, prior grades, AI familiarity, language background, and causal reasoning pretest | Estimated effect may reflect pre-existing differences rather than AI assistance |
| Stable Unit Treatment Value Assumption | One student's treatment status should not affect another student's outcome, and treatment should be sufficiently well-defined | Monitor collaboration, sharing of AI-generated outlines, peer feedback channels, and group work | Control students may indirectly receive AI benefits from treated peers |
| Treatment compliance is measured or assignment is interpreted as access | Actual use may differ from assigned access | Use platform logs, disclosure forms, and usage audits; distinguish ITT from treatment-on-the-treated | A null effect of access may hide strong effects among actual users, or apparent effects may reflect selective use |
| No hidden AI use in control condition | Control condition must represent non-use or lower use | Require disclosure, use controlled writing environment if appropriate, compare stylometric or process logs cautiously | Control contamination biases access effects toward zero |
| Outcome scoring is blind to treatment | Evaluator knowledge of AI use may affect scoring | Blind graders to treatment status; remove AI disclosure from grading packets; use multiple raters | Scores may measure evaluator attitudes toward AI rather than memo quality |
| Rubric validly measures analytical memo quality | The outcome must correspond to the construct of interest | Align rubric with causal reasoning and assumption-awareness criteria; estimate inter-rater reliability | The study may detect polish rather than analytical quality |
| Assignment prompt is equivalent across groups | Different prompts or task conditions would confound the effect | Use the same prompt, deadline, resources, and instructions except for AI access | Effect may reflect assignment variation rather than AI assistance |
| No differential attrition | Missing submissions should not differ systematically by treatment | Compare submission rates and missingness by group; analyze attrition reasons | Treatment may appear beneficial if weaker treated students fail to submit or harmful if control students drop out |
| No major instrumentation change during study | Scoring, logging, or AI model behavior should not change in ways that differ by group | Version AI system, freeze rubric, log model versions, document platform changes | Observed effects may reflect infrastructure drift rather than treatment |
| Baseline skill measures capture key heterogeneity | Needed for subgroup analysis and precision | Collect pretest memo, prior rubric scores, or diagnostic writing task | Heterogeneous effects may be misinterpreted or hidden |
| Student authorship remains meaningful | The memo should still be evidence of student judgment | Require process notes, AI-use appendix, and oral defense | Final memo quality may not indicate student understanding |

## 9. Data-Generating Process

The data does not simply exist. It is produced by a sequence of educational, technical, and evaluative systems.

Source systems:

- course roster or learning platform;
- assignment prompt and instruction documents;
- AI writing assistant platform;
- platform logs recording access, prompts, timestamps, and responses;
- document editor revision history;
- learning management system submission records;
- rubric scoring interface;
- evaluator forms;
- optional oral defense records;
- student surveys or disclosure forms.

Human inputs:

- students draft prompts, interpret AI responses, accept or reject suggestions, and revise memos;
- instructors define the assignment, permissible AI use, and scoring rubric;
- evaluators apply rubric criteria to final submissions;
- administrators or researchers define what counts as use, quality, compliance, and exclusion.

Event logs:

Relevant events may include:

- assignment release;
- AI assistant account activation;
- first AI interaction;
- number of prompts;
- prompt categories;
- response length;
- copy or export events if available;
- document edits;
- draft submission;
- final submission;
- grading events;
- oral defense completion.

Forms:

- consent form;
- baseline survey;
- AI familiarity survey;
- AI-use disclosure form;
- evaluator rubric form;
- post-assignment reflection;
- oral defense scoring sheet.

APIs:

If platform data are collected programmatically, APIs may provide:

- user identifiers;
- timestamps;
- prompt and response metadata;
- model version;
- session counts;
- document states;
- submission records;
- rubric scores.

Administrative categories:

The system must define:

- student;
- assignment;
- memo;
- treatment assignment;
- AI access;
- actual AI use;
- final submission;
- rubric score;
- evaluator;
- valid submission;
- missing submission;
- policy violation.

Timestamps:

Time matters because writing is a process. Important timestamps include assignment start, AI access activation, AI interactions, draft creation, major revisions, submission, grading, and oral defense.

Incentives shaping recording:

- students may underreport AI use if they fear punishment;
- students may overreport use if they believe it is expected;
- instructors may define AI use differently from students;
- evaluators may reward polished prose even when reasoning is weak;
- platform logs may record access but not cognitive reliance;
- students may use external AI tools outside the monitored system.

Possible changes over time:

- the AI model may be updated;
- the assignment prompt may be revised;
- students may learn better prompting over time;
- institutional AI policies may change;
- evaluator norms may drift after seeing many AI-assisted memos;
- public familiarity with AI writing may increase.

## 10. Measurement Pipeline

| Stage | Transformation | Assumption | Possible Failure |
|---|---|---|---|
| Raw event | Student thinks, drafts, prompts AI, revises, and submits a memo | The relevant writing process leaves observable traces | Important cognitive work occurs offline or in unmonitored tools |
| Logged record | AI platform records prompts, responses, timestamps, and user IDs | Logs accurately capture AI exposure and timing | External AI use, deleted sessions, shared accounts, or missing logs distort exposure |
| Stored table | Raw logs, roster data, submissions, and rubric scores are stored in structured databases | User IDs, assignment IDs, and timestamps can be linked correctly | Identity mismatches, duplicate records, timezone errors, or schema changes corrupt joins |
| Cleaned data | Records are deduplicated, linked, filtered, and transformed | Cleaning rules preserve meaningful variation and remove only invalid records | Cleaning may exclude noncompliant or low-resource students systematically |
| Analytical variable | AI use, treatment status, memo quality, baseline skill, and covariates are constructed | Operational definitions match the causal concepts | "Use" may measure login frequency rather than substantive assistance |
| Final metric | Rubric scores are averaged or modeled to estimate treatment effects | Rubric scores validly and reliably measure analytical memo quality | Scores may reflect style, grammar, or evaluator preference rather than reasoning quality |

The measurement pipeline should preserve criterion-level scores rather than only a total score. A total score can hide whether AI improves surface clarity while weakening identification logic, or improves organization while leaving assumptions implicit.

## 11. Missingness, Selection, Logging, and Instrumentation Bias

### Missingness

Potentially missing data include:

- unsubmitted memos;
- drafts created outside the monitored editor;
- use of external AI tools;
- peer or tutor assistance;
- deleted AI sessions;
- incomplete disclosure forms;
- missing baseline writing scores;
- evaluator comments;
- oral defense responses.

Missingness may be informative. For example, students struggling most with the assignment may be more likely to rely on unobserved tools, miss deadlines, or submit incomplete work. If missingness differs by treatment condition, complete-case analysis may be misleading.

### Selection

Selection enters at multiple levels:

- who enrolls in the course or curriculum;
- who consents to data collection;
- who complies with assigned AI access rules;
- who chooses to use AI when access is available;
- who has prior experience with AI tools;
- who has enough confidence to revise AI output critically;
- which memos are scorable.

If treatment is actual AI use rather than randomized access, selection is central. AI users may differ from non-users in motivation, time constraints, writing confidence, prior achievement, technical comfort, or willingness to experiment.

### Logging Bias

Logging may be inconsistent across tools and contexts. A monitored institutional assistant may produce detailed logs, while external tools produce no logs. A student who uses the approved assistant appears treated; a student who uses a personal AI account may appear untreated.

Other logging risks:

- session timeout may split one writing episode into multiple events;
- copy-paste behavior may not be captured;
- prompt content may be unavailable for privacy reasons;
- usage intensity may be measured by count rather than pedagogical substance;
- students may share AI outputs outside the platform.

### Instrumentation Bias

The measurement system may alter behavior.

If students know AI use is monitored, they may use it less, use it differently, or craft prompts that look compliant. If students know their memos will be checked for AI use, they may focus on avoiding detection rather than improving reasoning. If evaluators expect AI-assisted prose to sound polished, they may penalize generic writing or reward human-like imperfection.

The AI assistant itself is also an instrument. Its interface, guardrails, model version, latency, prompt suggestions, and feedback style shape the treatment. The same student might produce different outcomes under a critique-oriented assistant than under a full-draft generator.

### Definition Drift

Definitions may drift over time:

- "AI use" may expand from grammar correction to substantive reasoning support;
- "memo quality" may shift as evaluators adapt to AI-polished prose;
- the rubric may be interpreted differently after graders see many examples;
- AI model updates may change the quality of assistance;
- student norms may change as AI becomes routine;
- institutional policy may redefine acceptable assistance.

Versioning is therefore part of causal validity. The study should record the AI model version, prompt policy, rubric version, assignment prompt version, and scoring protocol version.

## 12. What the Data Can Support

If assignment to AI access is randomized, compliance is measured, outcomes are blindly scored, and the rubric is valid, the data could support a claim such as:

In this instructional setting, offering students access to a specified AI writing assistant under a defined use protocol caused an average change in final analytical memo quality, as measured by blind rubric scores, relative to students not offered that access.

If actual AI use is analyzed with appropriate caution, the data may also support descriptive or secondary claims such as:

- students used AI assistance more for structure and revision than for identification logic;
- AI access improved clarity but not assumption defense;
- effects varied by baseline writing skill or prior causal reasoning ability;
- AI-assisted memos required oral defense evidence to distinguish polished output from durable understanding.

The strongest credible claim is design-dependent. A randomized access study supports an effect of access. A randomized encouragement study supports an effect of encouragement, and possibly a local effect of use for compliers. An observational study supports weaker claims unless the selection process is unusually well measured and defended.

## 13. What the Data Cannot Support

The analysis cannot automatically establish that AI writing assistants improve student learning. A better final memo may reflect better editing, clearer structure, or AI-generated reasoning rather than improved student understanding.

Causal limits:

- If use is not randomized, differences between users and non-users may reflect selection.
- If control students use external AI, treatment contrast is weakened.
- If students collaborate across conditions, spillovers may contaminate estimates.
- If the treatment combines many kinds of AI use, the study may not identify which component caused the effect.

Measurement limits:

- Rubric scores are constructed judgments, not direct observations of quality.
- Writing fluency may be easier to score than causal reasoning.
- A total score may hide tradeoffs across criteria.
- Platform logs may measure exposure but not reliance, understanding, or judgment.

Generalization limits:

- Results from one course, assignment, model, rubric, or student population may not generalize.
- Effects may differ for novice and advanced students.
- Effects may change as AI systems and student norms evolve.

Institutional limits:

- A study of memo quality does not by itself determine academic integrity policy.
- The effect on grades may differ from the effect on learning.
- Instructors may need different policies for practice assignments, assessments, and portfolio artifacts.

Ethical limits:

- Students should not be unknowingly subjected to invasive monitoring.
- AI-use logs may contain sensitive cognitive, personal, or academic information.
- Restrictions on AI may disadvantage students who already rely on assistive technologies.
- Permissive AI policies may advantage students with better prompting skills or prior tool access.
- Any deployment should distinguish learning support from authorship substitution.

## 14. Portfolio-Facing Interpretation

This memo demonstrates the ability to integrate causal identification with data-generating process analysis. It treats the question "Does AI improve memo quality?" as a disciplined research design problem rather than a generic debate about technology.

Competencies evidenced:

- defining treatment, outcome, population, and estimand;
- distinguishing access, use, compliance, and encouragement;
- identifying the missing counterfactual;
- connecting identification assumptions to specific diagnostics;
- analyzing how educational data are produced by platforms, rubrics, logs, incentives, and human judgment;
- separating observable product quality from deeper learning;
- stating what the data can and cannot support.

As a portfolio case study, this artifact could become a research design memo for an education technology team, university writing program, AI governance committee, or learning analytics group. A reviewer or interviewer would learn that the author does not treat data as neutral residue or causal claims as automatic outputs of comparison. The memo shows attention to construct validity, measurement infrastructure, policy stakes, and interpretation discipline.

To strengthen the artifact further, the next version could add:

- a DAG showing baseline skill, AI use, motivation, prior achievement, and memo quality;
- a proposed randomized design;
- a scoring rubric appendix;
- a data schema for the logging and grading pipeline;
- a sensitivity analysis plan;
- an oral defense protocol to distinguish memo quality from student understanding.

## 15. Oral-Defense Questions

1. What is the treatment, and why is it well-defined?

The treatment is use of a specified AI writing assistant during the memo production process under a defined protocol. It is well-defined only if the protocol states what kinds of AI assistance are allowed, when assistance occurs, how access is assigned or measured, and what counts as non-use. Without this specificity, "AI use" mixes editing, brainstorming, critique, and ghostwriting into one vague treatment.

2. What is the missing counterfactual?

For each student who used or had access to the AI assistant, the missing counterfactual is the quality of that same student's memo if the student had completed the same assignment without AI assistance under otherwise identical conditions.

3. What assumption is most fragile?

The most fragile assumption is likely that observed AI use is as-if random if the design is observational. Students choose whether and how to use AI, and that choice is related to motivation, prior skill, confidence, time pressure, and technical fluency. If access is randomized, the most fragile assumptions may instead be no control contamination and valid measurement of memo quality.

4. How was the outcome produced as data?

The outcome was produced through a chain: students submitted memos, evaluators applied a rubric, criterion-level judgments were entered into a scoring system, scores were cleaned and linked to treatment data, and final metrics were constructed. The outcome is therefore not a natural fact. It is a measured construct shaped by rubric design, evaluator training, platform workflow, and institutional definitions of quality.

5. What could make the observed data misleading?

The data could be misleading if control students used external AI, if evaluators were not blind to treatment, if rubric scores rewarded polish more than reasoning, if weaker students were more likely to have missing submissions, if logs failed to capture actual AI reliance, or if the AI model changed during the study.

6. What claim would you refuse to make from this data?

I would refuse to claim that AI writing assistants improve student learning unless the study included evidence beyond final memo scores, such as oral defense performance, delayed assessments, revision analysis, or independent demonstrations of conceptual understanding. I would also refuse to generalize from one course, model, assignment, or rubric to all students or all analytical writing contexts.

## Artifact Registry Entry

```json
{
  "artifact_id": "AOS-COMB-001",
  "title": "AI Writing Assistance and the Quality of Student Analytical Memos",
  "type": "combined_identification_data_generating_process_memo",
  "path": "artifacts/projects/combined_identification_data_generating_process_memo_ai_writing_assistant.md",
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
  "status": "draft",
  "rubrics_used": [
    "Assumption-Awareness in Technical Work",
    "Causal Reasoning Quality"
  ],
  "created_at": "",
  "updated_at": "",
  "notes": "Draft combined memo integrating identification strategy with data-generating process analysis for the question of whether AI writing assistant use improves student analytical memo quality."
}
```
