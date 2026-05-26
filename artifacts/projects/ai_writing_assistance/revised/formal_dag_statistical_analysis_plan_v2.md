# Formal DAG and Statistical Analysis Plan: AI Writing Assistance and Memo Quality

## Artifact Metadata

- Title: Formal DAG and Statistical Analysis Plan for AI Writing Assistance and Memo Quality
- Related project: AI Writing Assistance and the Quality of Student Analytical Memos
- Artifact type: Revised causal protocol appendix
- Primary modules: 03 Causal Inference, Scientific Reasoning, and Identification; 07 Data Engineering, Infrastructure, MLOps, and Production Systems; 12 Technical Communication and Portfolio
- Primary competencies: Causal Identification and Counterfactual Reasoning; Model Construction and Assumption Analysis; Assumption-Awareness in Technical Work; Epistemic Infrastructure Design
- Status: revised final artifact
- Date: 2026-05-25

## 1. Research Question and Estimands

### Research Question

Among students completing a structured analytical memo assignment, what is the effect of being offered governed access to a specified AI writing assistant, under a defined permitted-use protocol, on the evaluated quality of the final memo, relative to completing the same assignment without offered access to that assistant?

This plan treats the question as a causal design problem rather than a generic comparison between observed AI users and non-users. The central distinction is between being offered access and actually using the assistant.

### Primary Estimand: ITT / Offered-Access Effect

The primary causal target is the effect of assignment or offered access:

```
Z -> Y
```

The primary estimand is the intent-to-treat effect of being offered governed AI access:

```
E[Y_i(Z_i = 1) - Y_i(Z_i = 0)]
```

In plain English, this asks: how much does final memo quality change when a student is offered governed AI writing assistance, compared with not being offered that access?

This is the effect of being offered governed AI access. It is not the effect of actual AI use. The estimand maps to the instructional or policy decision of whether a course, instructor, or program should offer governed access to the assistant.

### Secondary Estimand: Actual-Use Effect

The secondary causal question is the effect of actual AI use:

```
D -> Y
```

A possible actual-use estimand is:

```
E[Y_i(D_i = 1) - Y_i(D_i = 0)]
```

In plain English, this asks: how much does final memo quality change when a student actually uses AI, compared with not using AI?

This analysis is secondary and exploratory because actual use is selected post-assignment behavior. Students decide whether and how to use the assistant after access is offered. That decision can be shaped by baseline writing skill, motivation, AI familiarity, outside support, time availability, and unmeasured traits such as confidence, anxiety, conscientiousness, and help-seeking behavior. A user/non-user comparison may therefore combine the effect of AI use with selection into use.

### Treatment, Outcome, Population, Comparison, and Time Horizon

The primary treatment is assignment to governed access to a specified AI writing assistant during a defined memo planning, drafting, and revision window. The treatment includes the named assistant or platform, model and interface version, access dates, permitted-use policy, prohibited uses, disclosure requirements, and feasible logging of access and interaction metadata.

The primary outcome is final analytical memo quality, measured by a blind rubric score on the final submitted memo. The preferred outcome is a 1 to 4 rubric score averaged across prespecified domains, with criterion-level subscores retained for secondary analysis.

The target population is students learning to write analytical memos in courses, workshops, or curricula involving causal inference, policy analysis, economics, product analytics, data analysis, research methods, or AI governance. The primary unit of analysis is the student-memo assignment. If each student submits one memo, the unit is the student. If students submit multiple memos, the analysis must account for repeated observations.

The comparison group is students assigned not to receive study-provided AI assistant access during the assignment window. They receive the same assignment prompt, deadline, rubric, ordinary non-AI course resources, instructional materials, and scoring process as the offered-access group.

The primary time horizon is the assignment production window from assignment release to final memo submission. Claims about learning, retention, or transfer require additional outcomes such as oral defense, delayed assessment, or independent transfer tasks.

## 2. Plain-English Causal Spine

The simplified causal spine is:

```
Z = offered or assigned access to the AI writing assistant
D = actual AI use
Y = final memo quality

Primary causal target:   Z -> Y
Secondary causal target: D -> Y
```

The primary analysis estimates whether being offered governed AI access changes final memo quality. This is the ITT or offered-access effect. It is the cleanest causal target because `Z` can be assigned by the study design.

Actual AI use matters substantively, but it is not the primary treatment for causal identification. Actual use occurs after assignment and can be influenced by student characteristics, practical constraints, and unmeasured traits. The analysis must therefore avoid sliding from the clean question, "What is the effect of offering governed access?" to the more fragile question, "What is the effect of actual AI use?"

A useful mechanism path is:

```
Z -> D -> R -> Q -> Y
```

In plain English: offered access may increase actual use; actual use may change revision behavior; revision behavior may affect latent memo quality; latent memo quality is then translated into a measured rubric score.

This mechanism path should not be confused with the primary estimand. The primary total-effect analysis asks whether `Z` changes `Y`, including any pathways through actual use, revision behavior, confidence, process changes, and other downstream consequences of the offer.

## 3. Variable Definitions

| Variable | Role | Definition | Measurement Source | Notes |
|---|---|---|---|---|
| `Z_i`: assigned or offered AI access | Primary treatment assignment | Indicator for student `i` being assigned offered access to the study-provided AI assistant | Randomization record or treatment assignment table | Primary treatment for ITT analysis |
| `D_i`: actual AI use | Post-treatment exposure | Indicator for whether student `i` used the assistant during the assignment window | Platform logs, access records, disclosure form | Secondary and exploratory because use is selected |
| Use intensity | Mediator or descriptive process variable | Prompt count, session count, duration, interaction volume, or related use measure | AI platform logs | Do not adjust for this in the primary ITT model |
| Use mode | Mediator or mechanism variable | Brainstorming, outlining, critique, editing, rewriting, style improvement, or other use category | Disclosure form, prompt metadata, coded logs where appropriate | Classification may be noisy and privacy-limited |
| Revision behavior `R` | Mediator | Draft count, revision count, edit distance, time spent revising, or revision quality | Document history, LMS draft submissions, editor metadata | May transmit part of the effect of access |
| Latent memo quality `Q` | Latent construct | Underlying quality of the final analytical memo before measurement | Not directly observed | Translated into `Y` through the scoring process |
| Final memo quality `Y_i` | Primary outcome | Blind rubric score for the final analytical memo | Rubric scoring platform or evaluator form | Primary outcome; retain criterion-level subscores |
| Criterion-level rubric scores | Secondary outcomes | Scores for causal reasoning, assumption awareness, data-generating process awareness, communication, and related domains | Rubric scoring platform | Require multiple-comparison discipline if used inferentially |
| Baseline writing skill | Pre-treatment covariate; confounder for actual use | Prior writing diagnostic, prior memo score, placement score, or instructor-rated baseline writing | Baseline task, prior course records, diagnostic writing sample | Precision covariate for ITT; confounder for actual-use analysis |
| Baseline causal reasoning ability | Pre-treatment covariate; confounder for actual use | Pretest score or prior artifact score for causal reasoning | Baseline assessment or learner record | Supports balance checks and subgroup analysis |
| Prior achievement | Pre-treatment covariate | Prior grades, course performance, or related performance measures | Administrative or course records | May predict both use and outcome |
| Motivation and time availability | Pre-treatment covariate; confounder for actual use | Self-reported motivation, expected time available, workload, attendance, or competing obligations | Baseline survey or course records | Hard to measure completely |
| Prior AI familiarity | Pre-treatment covariate; confounder for actual use | Prior AI use, prompting comfort, or AI literacy | Baseline survey | May affect take-up and quality of use |
| Prompting skill | Pre-treatment or early process variable | Ability to ask useful questions and evaluate AI output | Baseline AI literacy task, if collected | If measured after access, treat as post-treatment |
| Language background | Pre-treatment covariate | Measure relevant to writing support needs | Baseline survey or administrative record, with safeguards | Sensitive variable; use only with clear purpose and governance |
| Peer or tutor assistance | Confounder or interference pathway | Help from classmates, tutors, writing center, or informal networks | Survey or disclosure form | May affect memo quality and interact with treatment |
| External AI use | Contamination variable | Use of non-study AI tools by students, especially controls | Disclosure forms, surveys, process notes | Used for sensitivity analysis, not to redefine assignment |
| Valid submission indicator | Missingness or selection variable; possible collider | Indicator for whether a final memo is submitted and analyzable | LMS submission records | Do not condition on without sensitivity analysis |
| Disclosure completion and content | Missingness, compliance, or possible collider | Whether and how AI use is disclosed | Disclosure system | May be affected by treatment, use, fear of sanctions, and memo quality |
| Assignment prompt version | Context or design variable | Version of the memo prompt assigned to students | Assignment metadata | Should be constant or explicitly modeled |
| Rubric version | Measurement variable | Version of scoring rubric used | Scoring metadata | Required for measurement stability |
| Rater identifier | Measurement variable | Identifier for evaluator scoring the memo | Scoring platform | Use only under appropriate scoring design conditions |
| Rater blinding or suspicion | Measurement threat | Whether scorer knows or can infer treatment status or AI use | Scoring workflow documentation; rater survey | Rater suspicion is post-treatment and should not be controlled for in the ITT model |
| Model or platform version | Treatment implementation variable | AI model, interface, and system configuration | Platform metadata | Required to define the treatment |
| Governance policy | Treatment implementation and institutional context | Permitted-use policy, consent, privacy, logging, disclosure, and enforcement rules | Study protocol and course documentation | Part of what makes the treatment well-defined |
| Unmeasured student traits `U` | Unobserved confounding for actual use | Confidence, anxiety, conscientiousness, help-seeking behavior, comfort with rules, or other traits | Not directly observed | Major reason `D -> Y` is exploratory |

## 4. Formal DAG

### DAG Purpose

The DAG represents a randomized offered-access design while making visible the distinction between assignment, actual use, mediating processes, measurement, missingness, and selection. It is not a claim that every edge can be estimated precisely. Its purpose is to discipline the analysis: identify the primary estimand, protect it from inappropriate adjustment, and clarify why actual-use analysis is more fragile.

### Nodes

- `Z`: randomized assignment to offered AI assistant access
- `A`: actual access activation and availability
- `D`: actual AI assistant use
- `M`: mode and intensity of AI use
- `R`: revision behavior and writing-process changes
- `Q`: latent final analytical memo quality
- `Y`: measured final memo quality score
- `BWS`: baseline writing skill
- `BCR`: baseline causal reasoning ability
- `PA`: prior achievement
- `MOT`: motivation, effort orientation, and time availability
- `AIF`: prior AI familiarity
- `PS`: prompting skill and ability to evaluate AI output
- `LB`: language background and writing support needs
- `PR`: peer, tutor, or informal assistance
- `EXT`: external AI use outside the study platform
- `SUB`: valid final submission or analyzable memo indicator
- `DISC`: AI-use disclosure completion and content
- `RATE`: rater identity, rater severity, and rater training
- `BLIND`: rater blinding to treatment or inferred AI use
- `PROMPT`: assignment prompt, deadline, and instructional materials
- `RUBRIC`: rubric version and scoring protocol
- `MODEL`: AI model, interface, and platform version
- `GOV`: permitted-use policy, consent, privacy, and logging governance
- `U`: unmeasured student traits affecting use and memo quality

### Directed Edges

Core assignment, use, and outcome edges:

```
Z -> A
Z -> D
Z -> SUB
Z -> DISC
A -> D
A -> M
D -> M
D -> R
D -> Q
M -> R
M -> Q
R -> Q
Q -> Y
Q -> SUB
Q -> DISC
```

Design, implementation, and measurement edges:

```
GOV -> Z
GOV -> A
GOV -> D
GOV -> DISC
MODEL -> A
MODEL -> D
MODEL -> M
MODEL -> R
PROMPT -> Q
PROMPT -> Y
RUBRIC -> Y
RATE -> Y
BLIND -> Y
SUB -> Y
```

Baseline and selection edges:

```
BWS -> D
BWS -> M
BWS -> R
BWS -> Q
BWS -> SUB
BCR -> D
BCR -> M
BCR -> Q
BCR -> SUB
PA -> D
PA -> Q
PA -> SUB
MOT -> D
MOT -> R
MOT -> Q
MOT -> SUB
AIF -> D
AIF -> M
AIF -> Q
PS -> D
PS -> M
PS -> Q
LB -> D
LB -> R
LB -> Q
PR -> D
PR -> R
PR -> Q
EXT -> D
EXT -> R
EXT -> Q
U -> D
U -> Q
U -> SUB
D -> DISC
M -> DISC
```

### Confounders

For the primary ITT effect `Z -> Y`, valid randomization is intended to eliminate confounding of assignment by baseline variables in expectation. The minimal adjustment set for identifying the ITT effect is therefore empty aside from design features such as blocks or strata, assuming randomization is correctly implemented.

Baseline variables should still be measured for balance checks, precision improvement, subgroup analysis, and diagnosis of randomization problems. These include baseline writing skill, baseline causal reasoning ability, prior achievement, motivation and time availability, prior AI familiarity, prompting skill if measured before treatment, language background when appropriate, peer or tutor support patterns, and section, instructor, or cohort if relevant to the design.

For the secondary actual-use question `D -> Y`, these same variables become potential confounders because they may affect both actual use and memo quality. Actual users may differ from non-users before any AI effect occurs.

### Mediators

Mediators are variables through which assigned access may affect final memo quality. They include actual AI use, use intensity, use mode, revision behavior, draft organization, time spent revising after access, feedback received from the assistant, post-treatment confidence, and disclosure behavior if disclosure changes writing behavior.

These variables may be analyzed descriptively or in a separate mechanism analysis, but they should not be included as ordinary covariates in the primary model estimating the total ITT effect.

### Colliders

Potential colliders include valid final submission, disclosure completion, observed platform logs among users, complete-case inclusion, and rater suspicion of AI use. These variables may be affected by treatment, actual use, baseline traits, latent memo quality, fear of sanctions, external tool substitution, privacy restrictions, or evaluator inference.

Conditioning on colliders can introduce bias. The analysis should report missingness, compliance, and scoring patterns rather than silently restricting to a selected sample without sensitivity checks.

### Adjustment Set

For the primary randomized ITT analysis, the proposed adjustment set is limited to:

- randomization block or stratum indicators, if blocking or stratification is used;
- prespecified baseline writing skill;
- prespecified baseline causal reasoning ability;
- prespecified prior achievement or prior memo score;
- prespecified prior AI familiarity;
- cohort, section, or instructor indicators only if they are pre-treatment or part of the design;
- rater indicators only if raters score memos across both treatment arms or rater assignment is randomized or balanced, and blinding is maintained.

These covariates are for precision, diagnostics, and design alignment. They are not needed for identification under valid randomization.

The primary ITT model must not adjust for post-treatment variables, including actual AI use, prompt count, session count, use intensity, use mode, revision behavior, draft count after assignment, time spent revising after assignment, disclosure content, post-treatment confidence, valid submission status without sensitivity analysis, or rater suspicion of AI use.

For secondary observational actual-use analysis, a defensible adjustment set would need at minimum baseline writing skill, baseline causal reasoning ability, prior achievement, motivation and time availability, prior AI familiarity, prompting skill measured before treatment, language background if appropriate, peer or tutor support, section or instructor, assignment prompt version, and external AI use. Even with this adjustment set, causal interpretation remains weak because unmeasured selection into actual use is plausible.

## 5. Identification Strategy

### Primary Identification Strategy: Randomized Offered Access

The preferred identification strategy is randomized offered access. Students are randomly assigned to be offered governed access to the AI assistant or not offered study-provided access. Both groups receive the same assignment, deadline, rubric, ordinary course resources, instructional materials, and scoring process.

Under valid randomization, the primary contrast identifies the ITT effect of `Z` on `Y`: the effect of being offered access, not the effect of actual AI use.

### Consistency

Each student's observed outcome under the assigned condition must correspond to the potential outcome for that condition. This requires a well-defined treatment: assistant name, model version, interface, access window, permitted-use policy, disclosure requirements, logging regime, assignment context, and ordinary course resources.

If treatment implementation varies across students in undocumented ways, the estimate becomes an average over multiple interventions rather than the effect of a defined assistant-access policy.

### Exchangeability

For the primary ITT estimand, randomization should make potential outcomes independent of treatment assignment in expectation. This requires correct allocation, no manipulation of assignment, and a reproducible assignment record.

Diagnostics should include a randomization audit, allocation reproducibility record, baseline balance table, and review of late adds, opt-outs, crossovers, and access activation errors.

For actual-use analyses, exchangeability is much less credible because actual use is selected. Students who use the assistant may differ from non-users in ways that affect memo quality.

### Positivity

Each eligible student must have a positive probability of assignment to each condition within the relevant design strata. If some sections, instructors, or student groups are always treated or always control, causal effects for those strata cannot be estimated without extrapolation.

### Measurement Validity

The measured outcome must validly represent analytical memo quality. This requires a rubric aligned to analytical reasoning rather than only surface polish, criterion-level scoring, rater training, calibration examples, blind scoring where feasible, inter-rater reliability checks, and stable rubric versioning.

A positive effect on total memo score does not automatically imply stronger causal reasoning or deeper learning. Criterion-level outcomes, oral defense, delayed assessment, and independent transfer tasks are needed for stronger learning claims.

### No Unblocked Backdoor Paths

Under valid randomization, there should be no open backdoor path from assigned access to potential memo quality. Baseline covariate adjustment can improve precision and detect imbalance, but it is not the basis of identification.

If assignment is not randomized, backdoor paths through baseline skill, motivation, prior AI familiarity, prompting skill, language background, time availability, peer help, and external AI access become central threats.

### No Inappropriate Adjustment for Mediators or Colliders

The primary total-effect analysis must not condition on post-treatment mediators such as actual use, use intensity, use mode, revision count, time spent revising, disclosure content, or post-treatment confidence. Conditioning on these variables can block part of the effect of assigned access.

The analysis must also avoid unexamined restriction to colliders such as valid submissions, complete cases, disclosure completers, observed platform users, or cases where raters did not suspect AI use. If restrictions are necessary, they should be reported and accompanied by sensitivity checks.

### Interference, Spillovers, and Contamination

One student's treatment should not substantially affect another student's outcome. This may fail if treated students share AI-generated outlines, feedback, examples, or strategies with control students. If spillovers are likely, the interpretation may shift from an individual-level effect to an effect of access in a partially contaminated learning environment, or the design may need cluster randomization.

Treatment students may not use the assistant, and control students may use external AI tools. For the ITT analysis, non-use among assigned-access students is part of the offered-access effect. External AI use among controls is a contamination threat that may dilute the treatment contrast.

### Authorship and Construct Validity

The study assumes that final memo quality remains meaningful evidence of student analytical judgment. If the assistant substitutes for reasoning rather than supporting critique, revision, or organization, final memo scores may overstate learning. Process notes, AI-use appendices, oral defense, and delayed assessments can help bound this risk.

## 6. Statistical Analysis Plan

### Primary ITT Analysis

The primary analysis estimates the effect of being offered governed AI access on final memo quality:

```
Y_i = alpha + beta Z_i + gamma'X_i + delta_s + epsilon_i
```

Where:

- `Y_i` is the final memo quality score for student `i`.
- `Z_i` is whether student `i` was offered or assigned AI access.
- `X_i` is a prespecified vector of baseline covariates chosen before outcome analysis.
- `delta_s` is a design term such as a randomization block, stratum, section, or instructor indicator, if used in the design.
- `epsilon_i` is the error term.
- `beta` is the primary ITT estimate.

In plain English, `beta` estimates the average effect of being offered governed AI writing assistance on final memo quality. It is an offered-access effect. It is not the effect of actually using AI.

The unadjusted difference in means is also a valid primary estimator under valid randomization:

```
mean(Y_i | Z_i = 1) - mean(Y_i | Z_i = 0)
```

If no blocking or baseline covariates are used, the simple difference in means remains the primary causal estimator under valid randomization.

#### Primary Outcome Scale

The primary outcome is the final memo's blind rubric score, measured on a 1 to 4 scale and averaged across prespecified domains. Criterion-level scores remain available for secondary analysis.

If multiple raters score each memo, the primary outcome can be the mean of blinded rater scores after any prespecified adjudication process. Rater-level data should be retained for reliability and severity checks.

#### Primary Covariates

Prespecified baseline covariates may include baseline writing skill, baseline causal reasoning pretest, prior achievement or prior memo score, prior AI familiarity, language background if appropriate and governed, and section, cohort, or instructor indicators if relevant to the randomization design.

Covariates should be measured before treatment assignment or before treatment exposure. The covariate list should be finalized before outcome analysis.

#### Rater and Scoring Model

If each memo is scored by multiple raters, use one of the following prespecified approaches:

1. Average the blinded rater scores and analyze the averaged score.
2. Estimate a rater-level model with rater fixed effects, but only if raters score memos across both treatment arms or rater assignment is randomized or balanced:

```
Y_ir = alpha + beta Z_i + gamma'X_i + delta_s + rho_r + epsilon_ir
```

Here, `Y_ir` is the score assigned by rater `r` to memo `i`, and `rho_r` denotes rater indicators. Rater adjustment is for measurement precision and rater severity. It is not a substitute for blinding, and it should not be used to control for rater suspicion of AI use.

#### Primary ITT Warning: Do Not Control for Post-Treatment Variables

Do not adjust the primary ITT model for actual use or other post-treatment variables.

The primary model must not control for:

- actual AI use `D`;
- prompt count;
- session count;
- use intensity;
- use mode;
- revision behavior;
- draft count after treatment assignment;
- time spent revising after treatment assignment;
- disclosure content;
- post-treatment confidence;
- valid submission status without sensitivity analysis;
- rater suspicion of AI use;
- any other variable measured after assignment that may be affected by offered access.

These variables may be downstream of `Z`, may mediate the effect of access, or may operate as colliders. Controlling for them can block part of the causal effect, induce selection bias, or change the estimand from the offered-access effect to a different question.

#### Uncertainty Estimates

The analysis should report the point estimate for `beta`, standard error, 95 percent confidence interval, p-value as secondary to the estimate and interval, sample size by condition, and missing outcome count by condition.

If each student contributes one memo, heteroskedasticity-robust standard errors are acceptable. If students contribute multiple memos, standard errors should be clustered at the student level or a mixed model should account for repeated observations. If randomization occurs by classroom, section, or group, standard errors should account for the cluster-randomized design.

#### Missing-Data Strategy

The analysis should report missingness before modeling it. Required diagnostics include final submission rate by condition, valid rubric score rate by condition, disclosure completion rate by condition, baseline covariate missingness by condition, and reasons for missing final outcomes where known.

The primary analysis should follow the randomized assignment sample as closely as possible. If outcome data are missing, the report should include complete-case analysis with explicit denominators, comparison of baseline covariates for observed versus missing outcomes, sensitivity analysis using plausible bounds for missing outcomes, and multiple imputation only if missingness assumptions are defensible and documented.

Valid submission status should not be treated as an ordinary covariate in the primary ITT model without sensitivity analysis, because submission can be affected by assignment, baseline traits, and potential outcomes.

### Secondary Mechanism and Compliance Analyses

Secondary analyses should describe implementation, compliance, and plausible pathways. They may examine:

```
Z -> D
Z -> use intensity
Z -> use mode
Z -> revision behavior
Z -> criterion-level scores
Z -> oral defense score
Z -> delayed assessment score
```

These analyses help explain how offered access changed behavior and how the treatment was implemented. They should not replace the primary ITT estimate.

Compliance and contamination reporting should include take-up among students assigned access, non-use among assigned-access students, external AI use among controls, crossovers or access violations, treatment activation failures, disclosure rates, and the distribution of use modes and intensity among treated users.

Criterion-level outcomes should be interpreted as a profile of effects rather than as independent confirmatory tests unless a multiple-comparison procedure is prespecified.

Subgroup analyses should be prespecified and limited. Candidate subgroups include baseline writing skill, baseline causal reasoning ability, prior AI familiarity, language background if appropriate, assignment difficulty, and novice versus advanced students. Subgroup findings should be treated as exploratory unless the study is powered for them and they are prespecified.

### Exploratory Actual-Use Analysis

Actual-use analysis asks whether actually using the assistant changes memo quality:

```
D -> Y
```

A descriptive or adjusted model might be:

```
Y_i = alpha + theta D_i + lambda'W_i + epsilon_i
```

Here, `theta` compares students who actually used AI with students who did not, after adjustment for observed variables `W_i`.

This estimate is not automatically causal. Actual use is shaped by baseline writing skill, baseline causal reasoning ability, prior achievement, motivation, prior AI familiarity, prompting skill, outside support, time availability, language background, comfort with disclosure rules, and unmeasured traits. Even rich adjustment may not remove selection bias.

Therefore, actual-use analysis should be labeled secondary and exploratory unless the design adds stronger support, such as randomized encouragement, credible instrumental-variable assumptions, or explicit sensitivity analysis. A naive user/non-user comparison should not be presented as the causal effect of AI use.

### Power and Minimum Detectable Effect

Before implementation, the study should conduct a power or minimum detectable effect calculation using expected sample size, allocation ratio, outcome standard deviation, planned covariate adjustment, clustering or repeated-measure structure, and the target minimum effect size on the 1 to 4 rubric scale.

This artifact does not report a power calculation because no empirical sample size or outcome variance has been provided.

## 7. Threats to Validity

### Selection Bias

Randomized assignment addresses selection into offered access, but it does not make actual use random. Actual-use comparisons remain vulnerable to selection by motivation, baseline skill, prior AI familiarity, time pressure, prompting skill, confidence, and need for assistance.

### Omitted Variables

If the design becomes observational, omitted variables become severe. Unmeasured student traits, outside help, instructor differences, assignment difficulty, and unobserved AI use could bias estimates.

### Measurement Error

Rubric scores may measure polish, fluency, or evaluator preference more easily than causal reasoning. Platform logs may measure recorded interactions rather than cognitive reliance. Disclosure forms may be incomplete or strategic. Prompt counts may not capture quality of use.

### Rater Bias and Imperfect Blinding

Evaluators may infer AI use from prose style, formatting, or generic phrasing even if treatment labels are removed. If raters reward or penalize perceived AI use, measured scores may reflect evaluator attitudes rather than memo quality.

### Interference and Spillovers

Students may share AI-generated outlines, feedback, examples, or strategies. If control students indirectly receive AI assistance through peers, the estimated ITT effect may be diluted or reinterpreted as the effect of access in a contaminated learning environment.

### Contamination

Control students may use public AI tools. Treated students may use external tools in addition to the study assistant. This weakens the treatment contrast and complicates interpretation.

### Attrition and Missingness

Missing final submissions, incomplete scoring, missing disclosures, or missing baseline covariates may be informative. If missingness is affected by treatment and potential memo quality, complete-case analysis may be biased.

### Construct Validity

Final memo quality is not the same as student learning. A stronger final memo may reflect AI-supported editing, organization, or generated reasoning. Claims about learning require oral defense, delayed assessment, independent transfer tasks, or process evidence.

### Instrumentation and Version Drift

Model updates, interface changes, rubric revisions, evaluator retraining, prompt revisions, or policy changes during the study can create differences that are not attributable to assigned access alone.

### Generalizability

Results from one course, assignment, AI model, rubric, institution, or student population may not generalize to other settings. Effects may change as AI tools improve and student norms adapt.

### Ethical and Institutional Validity

A positive effect on memo scores would not by itself settle academic integrity policy, privacy policy, disability accommodation, or pedagogical appropriateness. The study must separate empirical effects from governance decisions.

## 8. Interpretation Boundaries

The study can support a causal claim about the effect of offered access only if randomization is correctly implemented, the treatment is well-defined, contamination is measured or bounded, outcomes are blindly and reliably scored, missingness is addressed, and assumptions are plausible.

A defensible positive finding would be stated as:

```
In this instructional setting, offering students governed access to the specified AI writing assistant caused an average change in final analytical memo quality, as measured by blind rubric scores, relative to students not offered that study-provided access.
```

The study cannot automatically claim that:

- AI writing assistants improve student learning;
- AI use improves causal reasoning;
- actual AI use caused the observed score difference;
- the assistant improves all forms of writing;
- the effect generalizes to every course, student population, model, rubric, or institution;
- improved final memo quality implies improved independent analytical judgment;
- product usefulness implies pedagogical appropriateness;
- score gains justify invasive monitoring;
- a total score improvement means all rubric dimensions improved.

If final memo scores improve but oral defense or delayed assessment does not, the appropriate interpretation may be that AI access improved artifact production more than durable understanding. If prose quality improves but causal reasoning and assumption awareness do not, the result should be interpreted as improvement in communication or polish, not as improvement in analytical judgment.

## 9. Portfolio Translation

This artifact strengthens the AI writing assistance project by converting a conceptual design memo into an implementation-ready causal protocol. It makes visible the chain from research question to estimand, DAG, adjustment logic, identification assumptions, estimator, diagnostics, sensitivity analysis, and interpretation boundaries.

Its portfolio value is not that it reports empirical results. It does not. Its value is that it demonstrates disciplined analytical judgment:

- the treatment is defined as governed access, not vague AI use;
- the outcome is treated as a constructed rubric-based measure, not a natural fact;
- the estimand is separated from the estimator, sample, mechanism, and decision target;
- randomized access is distinguished from actual use;
- mediators and colliders are not incorrectly adjusted for in the primary total-effect analysis;
- actual-use analysis is handled without overclaiming causal identification;
- robustness checks are tied to fragile assumptions rather than used to search for favorable results;
- limitations define what the evidence can and cannot support.

As a portfolio appendix, this plan should be paired with the existing research design memo, artifact review, and case study. Its next extensions would be a concrete randomization protocol, scoring rubric and rater reliability guide, privacy and governance appendix, power analysis, and schema validation plan.

## Revision Note

This revision cleans the artifact into a single coherent Markdown protocol, removes loose fragments and duplicated formatting, and foregrounds the simplified causal spine: `Z` as offered access, `D` as actual use, and `Y` as final memo quality. It defines the ITT estimand `E[Y_i(Z_i = 1) - Y_i(Z_i = 0)]` as the primary offered-access effect, defines the actual-use estimand `E[Y_i(D_i = 1) - Y_i(D_i = 0)]` as secondary and exploratory, separates the statistical plan into primary ITT, secondary mechanism and compliance, and exploratory actual-use analyses, and adds a prominent warning against controlling for post-treatment variables in the primary ITT model.
