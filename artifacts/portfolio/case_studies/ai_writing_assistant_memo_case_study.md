# Evaluating AI Writing Assistance: A Causal Identification and Data Infrastructure Case Study

## One-Sentence Summary

I translated a vague question about whether AI writing assistants improve student memos into a disciplined causal and data-infrastructure design that specifies the treatment, outcome, estimand, counterfactual, assumptions, measurement pipeline, and limits of interpretation.

## Problem

The project addressed a deceptively simple question: does access to an AI writing assistant improve the quality of student analytical memos?

The initial question is too broad to support a credible answer. "AI assistance" can mean brainstorming, outlining, critique, editing, rewriting, or substitution for student authorship. "Memo quality" can mean grammar, organization, causal reasoning, assumption awareness, or evaluator perception. A difference in final scores could reflect learning, polish, bias, selection, contamination, or measurement drift.

The project therefore reframed the problem as a research design question:

Among students completing a structured analytical memo assignment, what is the effect of being offered access to a specified AI writing assistant, under a defined permitted-use protocol, on the evaluated quality of the final memo, relative to completing the same assignment without offered access to that assistant?

The central challenge was not merely estimating a difference in scores. It was determining what comparison would make a causal interpretation credible and what data infrastructure would be required for the resulting evidence to mean what it claims to mean.

## Why It Matters

This project matters because education, product, and AI governance decisions increasingly depend on claims about whether AI tools improve performance, learning, productivity, or quality. Those claims are often made from weak evidence: observed users are compared with non-users, final artifacts are treated as direct evidence of skill, and platform logs are treated as neutral records of behavior.

In this setting, the stakes are pedagogical, technical, institutional, and ethical.

For instructors, the decision may be whether to permit, require, restrict, or scaffold AI writing assistance in analytical assignments. For education technology teams, the decision may be whether to integrate AI writing support into a learning platform and what governance, logging, disclosure, and assessment systems should accompany that integration. For students, the decision environment affects authorship, privacy, access, fairness, and what kinds of work count as evidence of understanding.

The project shows that responsible evaluation requires two forms of judgment at once:

- Causal judgment: defining the treatment, outcome, population, estimand, counterfactual, assumptions, and threats to validity.
- Infrastructure judgment: understanding how educational data are produced through platforms, policies, rubrics, logs, evaluator behavior, administrative categories, and versioned systems.

The central contribution is the refusal to treat "AI works" as a self-evident empirical question. The project instead asks: what exactly is the intervention, what exactly is being measured, what comparison is credible, and what can the evidence not prove?

## My Role

I developed the research design memo as an integrated causal identification and data-generating process artifact.

My work included:

- defining the research question in decision-relevant terms;
- distinguishing assigned access from actual use, use intensity, use mode, compliance, and contamination;
- specifying the primary treatment as governed access to a named AI writing assistant under a permitted-use protocol;
- defining final analytical memo quality as a constructed rubric-based outcome rather than a natural fact;
- identifying the primary estimand as an Intent-to-Treat effect under randomized access;
- mapping alternative estimands to different product and instructional decisions;
- articulating the missing counterfactual;
- comparing randomized access, randomized encouragement, within-student crossover, and observational use designs;
- constructing an identification assumptions table with diagnostics and risks if assumptions fail;
- analyzing the data-generating process behind student writing, AI-use logs, disclosures, submissions, scoring, and analytical datasets;
- proposing a measurement pipeline and minimal data schema;
- identifying missingness, selection, logging bias, instrumentation bias, and definition drift;
- stating what the data could support and what they could not support.

The project was designed as evidence of analytical judgment: the ability to move from a broad real-world question to a defensible claim, a coherent method, and honest limitations.

## Methods and Tools

Methods and frameworks used:

- Causal inference
- Potential outcomes reasoning
- Treatment, outcome, population, and estimand specification
- Intent-to-Treat design logic
- Counterfactual reasoning
- Randomized access design
- Randomized encouragement design
- Selection and contamination analysis
- Assumption and threat-to-validity analysis
- Data-generating process analysis
- Measurement pipeline design
- Schema design
- Missingness and logging bias analysis
- Rubric-based outcome construction
- AI governance and educational measurement reasoning
- Portfolio synthesis and technical communication

Primary conceptual tools:

- Identification before estimation
- Data is produced, not found
- Metrics are proxies, not values
- Prediction is not explanation
- Infrastructure is epistemic
- Causal conclusions must be proportional to design credibility

## Architecture or Workflow

The project followed a structured analytical workflow.

1. Start with the decision problem

The original question, "Does AI writing assistance improve memo quality?", was reframed around actual decisions:

- Should instructors offer governed AI access?
- Should a platform integrate AI writing support?
- Does actual use improve analytical reasoning?
- Does AI improve learning rather than only final artifact quality?
- Which forms of AI assistance are pedagogically acceptable?

This step prevented the project from collapsing into a generic tool evaluation.

2. Define the intervention

The treatment was defined as governed access to a specified AI writing assistant during a defined memo planning, drafting, and revision window.

The treatment included:

- access to a named AI assistant or platform;
- a permitted-use protocol;
- student guidance on acceptable use;
- disclosure requirements;
- feasible logging infrastructure;
- a boundary between assistance and authorship substitution.

This avoided treating "AI" as a single uniform intervention.

3. Define the outcome

The primary outcome was final analytical memo quality, measured through blind rubric scoring.

The memo treated this outcome as constructed, not directly observed. The score is produced through a rubric, evaluator training, scoring workflow, platform interface, and institutional definition of quality.

The design preserved criterion-level subscores so that a total score would not hide important differences, such as improved prose but weak causal reasoning.

4. Specify the estimand

The primary estimand was the Intent-to-Treat effect:

E[Y_i(Z_i = 1) - Y_i(Z_i = 0)]

where Z_i = 1 means the student was assigned to AI assistant access and Z_i = 0 means the student was not assigned to that access.

This estimand fits the policy question: what happens if an instructor or platform offers governed AI writing assistance?

5. Identify the counterfactual

The missing counterfactual was:

For each student assigned to AI access, what would that same student's final memo quality have been if the student had completed the same assignment without being offered AI access under otherwise identical instructional and assessment conditions?

Because that counterfactual cannot be observed directly, the design requires a comparison group that approximates it.

6. Evaluate design options

The project compared four design strategies:

- Randomized access: strongest default for estimating the effect of offered access.
- Randomized encouragement: useful when restriction is infeasible and the goal is to estimate the effect of encouragement or local use among compliers.
- Within-student crossover: useful for controlling stable student traits but vulnerable to carryover and prompt differences.
- Observational use comparison: weakest for causal claims because actual use is selected.

7. Build the data-generating process model

The project traced how evidence would be produced through:

- course rosters;
- assignment prompts;
- AI platform logs;
- editor or revision records;
- learning management system submissions;
- disclosure forms;
- rubric scoring platforms;
- evaluator records;
- baseline surveys or diagnostic writing tasks;
- optional oral defense records.

This step made the infrastructure visible as part of the epistemic claim.

8. Define diagnostics and robustness checks

The design proposed diagnostics such as:

- randomization audit;
- baseline balance table;
- take-up rate among assigned-access students;
- external AI use checks among control students;
- attrition analysis;
- inter-rater reliability;
- rater severity checks;
- criterion-level outcome analysis;
- version audits for model, rubric, prompt, and platform;
- missingness comparison by condition.

The purpose was not to search for favorable results, but to test the assumptions most likely to fail.

## Evidence

The project is a design and reasoning artifact rather than an empirical results report. Its evidence consists of the internal coherence among claim, method, assumptions, data infrastructure, and limitations.

Key evidence includes:

- a precise research question tied to instructional and product decisions;
- a treatment definition that separates access, actual use, intensity, mode, compliance, and contamination;
- an outcome definition that treats memo quality as a constructed rubric-based measure;
- an Intent-to-Treat estimand aligned with randomized access;
- a counterfactual statement that clarifies the missing comparison;
- a comparison of feasible and weak identification strategies;
- an assumption table linking each assumption to diagnostics and risks if false;
- a causal structure distinguishing baseline traits, assignment, actual use, revision behavior, final memo quality, and evaluator scoring;
- a data-generating process analysis of source systems, human inputs, event logs, administrative categories, incentives, and versioning;
- a measurement pipeline showing how raw writing activity becomes analytical variables and final metrics;
- an illustrative schema for students, assignments, treatment assignment, AI sessions, AI events, submissions, disclosures, rubric scores, raters, and oral defense records;
- a limitations section separating causal, measurement, generalization, institutional, and ethical limits.

The strongest evidence of judgment is the project's interpretation discipline. It states that even a positive effect on final memo quality would not automatically prove that AI improves student learning. Learning would require additional evidence such as oral defense, delayed assessment, revision analysis, or independent transfer tasks.

## Key Decisions

| Decision | Rationale | Tradeoff |
|---|---|---|
| Define the primary treatment as assigned access, not actual use | Assignment can be randomized and supports a cleaner causal comparison | The estimate describes the effect of being offered access, not necessarily the effect of actually using AI |
| Treat AI assistance as a governed sociotechnical intervention | The model, interface, policy, assignment context, disclosure regime, and scoring environment all shape the treatment | The design becomes more complex and less general than a broad claim about "AI" |
| Use final memo quality as the primary outcome | It matches the immediate instructional and product question | It is only a proxy for learning and may capture polish more easily than reasoning |
| Preserve criterion-level rubric scores | Total scores can hide tradeoffs between organization, grammar, causal reasoning, and assumption awareness | Requires more scoring discipline, rater training, and data structure |
| Prioritize a randomized access design | It best supports the policy question of whether to offer governed AI access | Noncompliance and external AI use may dilute or complicate the contrast |
| Treat actual use analyses as secondary | Actual use is selected and may reflect motivation, baseline skill, anxiety, time pressure, or AI familiarity | Product teams may care deeply about actual use, but causal interpretation is harder |
| Include disclosure and logging infrastructure | Needed to understand compliance, contamination, use modes, and treatment fidelity | Raises privacy, consent, and governance concerns |
| Require blind scoring | Reduces evaluator bias about AI-assisted writing | Full blinding may be difficult if prose style reveals AI-like features |
| Avoid adjusting for post-treatment variables in the primary total-effect estimate | Revision count, prompt count, time spent, and confidence may be mediators rather than confounders | Mechanism analysis must be separated from the primary causal estimate |
| Refuse broad claims about learning from final scores alone | Final artifacts may reflect assistance rather than durable understanding | Stronger learning claims require additional assessments and more data collection |

## Assumptions and Limitations

This project is honest about what the design assumes and what it cannot claim.

Core assumptions:

- Random assignment is implemented correctly.
- The treatment condition is well-defined and versioned.
- The control condition creates a meaningful contrast.
- Control-group contamination by external AI tools is limited or bounded.
- Students do not substantially affect one another's outcomes through spillovers.
- Compliance is measured or the analysis remains assignment-based.
- Outcome scoring is blind to treatment.
- The rubric validly measures analytical memo quality.
- Scoring is reliable across evaluators.
- Missing submissions do not bias the results in unaddressed ways.
- Post-treatment variables are not incorrectly adjusted for in the primary total-effect estimate.
- Model, rubric, platform, prompt, and scoring protocol versions remain documented.
- Student authorship remains meaningful enough for the final memo to serve as evidence of judgment.

Causal limitations:

- If access is not randomized, differences may reflect selection.
- If control students use external AI tools, the treatment contrast is weakened.
- If students share AI-generated outlines or feedback, spillovers may contaminate estimates.
- If the treatment combines many forms of assistance, the estimate may not identify which component caused the effect.
- If the analysis adjusts for post-treatment variables incorrectly, it may block part of the treatment effect or introduce bias.

Measurement limitations:

- Rubric scores are constructed judgments, not direct observations of quality.
- Writing fluency may be easier to score than causal reasoning.
- A total score may hide tradeoffs across criteria.
- Platform logs measure recorded interactions, not cognitive reliance.
- AI-use disclosures may be inaccurate, incomplete, or strategically written.
- Evaluators may infer AI use from prose style even if treatment labels are removed.

Generalization limitations:

- Results from one course, assignment, model, rubric, or student population may not generalize.
- Effects may differ for novice and advanced students.
- Effects may change as AI systems and student norms evolve.
- A governed assistant in a structured curriculum may not generalize to unrestricted public AI use.

Institutional and ethical limitations:

- A study of memo quality does not by itself determine academic integrity policy.
- Product usefulness does not automatically imply pedagogical appropriateness.
- AI-use logs may contain sensitive academic, cognitive, or personal information.
- Students should not be subjected to invasive monitoring without consent and governance.
- Restrictive AI policies may disadvantage students who rely on assistive technologies.
- Permissive AI policies may advantage students with stronger prompting and evaluation skills.

Implementation limitations:

- The artifact does not yet include a complete statistical analysis plan.
- It does not yet specify the full randomization protocol, including blocking, stratification, allocation concealment, or handling of late adds and opt-outs.
- It does not yet include a concrete power analysis.
- It does not yet include a fully operational scoring rubric and rater reliability threshold.
- It does not yet include a formal DAG diagram.
- It does not yet include a complete governance appendix for privacy, consent, data retention, deidentification, and access control.

## Results or Outputs

The project produced a portfolio-ready technical research design memo that demonstrates how to evaluate AI writing assistance without overclaiming.

Primary outputs:

- a refined research question;
- a causal claim scoped to governed access rather than AI in general;
- a treatment definition with protocol, logging, disclosure, and authorship boundaries;
- an outcome definition based on blind rubric scoring and criterion-level subscores;
- a population and unit-of-analysis definition;
- primary, secondary, and conditional estimands;
- an estimand-to-decision mapping table;
- a counterfactual statement;
- comparison of identification strategies;
- identification assumptions and diagnostics;
- causal structure and adjustment logic;
- data-generating process analysis;
- measurement pipeline;
- proposed data schema;
- missingness, selection, logging, and instrumentation bias analysis;
- diagnostics, robustness, and sensitivity plan;
- interpretation boundaries;
- oral-defense questions.

Portfolio signal:

The artifact shows that I can reason across causal inference, measurement validity, data engineering, AI governance, educational assessment, and technical communication. It demonstrates that I do not treat data as neutral residue, AI as a single uniform treatment, or score differences as automatic evidence of learning.

## What I Learned

This project strengthened my ability to treat analytical work as a chain of disciplined choices rather than a collection of techniques.

The most important lesson was that a causal question must be specified before it can be estimated. A broad question like "Does AI improve student writing?" becomes answerable only after defining the intervention, comparison, outcome, population, estimand, and assumptions. Without that structure, estimates can appear technical while remaining conceptually ambiguous.

I also learned that measurement is itself an institutional process. Final memo quality is not simply observed; it is produced through rubrics, evaluator training, platform workflows, scoring interfaces, and administrative definitions. This matters because a metric can improve while the underlying construct remains unchanged, or even weakens. For example, AI access might improve organization and grammar while leaving causal reasoning unchanged.

The project also sharpened my understanding of infrastructure as epistemic. Logs, schemas, disclosures, timestamps, version fields, rater identifiers, and missingness flags are not administrative details. They determine what the organization can know. If a system cannot distinguish assigned access from actual use, or login from substantive assistance, or final score from criterion-level reasoning, then it cannot support the claim stakeholders want to make.

Finally, I learned that strong analytical judgment includes refusing claims. A positive effect on final memo scores would not be enough to claim that AI improves learning. A product improvement would not automatically settle a pedagogical question. A well-designed analysis must state not only what the data can support, but also what they cannot support.

## Competencies Demonstrated

- Causal Identification and Counterfactual Reasoning
  - Defined treatment, outcome, population, estimand, and counterfactual.
  - Distinguished randomized access from actual use.
  - Identified selection, contamination, spillovers, and post-treatment adjustment risks.
  - Matched causal claims to design credibility.

- Epistemic Infrastructure Design
  - Treated educational data as produced through systems rather than found.
  - Specified source systems, event logs, administrative categories, schemas, and measurement pipelines.
  - Identified missingness, logging bias, instrumentation bias, and definition drift.
  - Connected infrastructure design to what an organization can credibly know.

- Model Construction and Assumption Analysis
  - Built an explicit model of how AI access could affect memo quality.
  - Identified assumptions and tied them to diagnostics.
  - Distinguished total effects, mechanism questions, and subgroup questions.
  - Treated the model as a controlled omission rather than a complete representation of reality.

- Measurement and Evaluation Judgment
  - Treated rubric scores as proxies rather than direct measures.
  - Preserved criterion-level outcomes to avoid misleading aggregates.
  - Identified rater bias, reliability, blinding, and construct validity concerns.
  - Separated final artifact quality from durable learning.

- Responsible AI and Sociotechnical System Design
  - Recognized that AI tools operate through policies, interfaces, incentives, monitoring, and institutional norms.
  - Identified privacy and consent issues in AI-use logging.
  - Distinguished learning support from authorship substitution.
  - Refused to let product usefulness substitute for pedagogical appropriateness.

- Synthesis, Communication, and Intellectual Production
  - Integrated causal inference, data engineering, AI governance, and educational assessment.
  - Communicated a complex design in a structured memo.
  - Produced a portfolio-facing artifact with interview relevance.
  - Made limitations visible as part of the credibility of the work.

## Resume Bullet Section

- Designed a causal identification and data-infrastructure framework for evaluating AI writing assistance in student analytical memo assignments, specifying treatment, outcome, estimand, counterfactual, assumptions, diagnostics, and measurement pipeline.

- Translated a broad AI impact question into an Intent-to-Treat randomized access design, distinguishing assigned access from actual use, use intensity, use mode, compliance, contamination, and selection.

- Developed a data-generating process and schema for education technology evaluation, including AI session logs, disclosure forms, submissions, rubric scores, rater metadata, versioning, missingness flags, and oral defense records.

- Identified threats to validity in AI-assisted writing evaluation, including control contamination, evaluator bias, rubric drift, post-treatment adjustment, authorship substitution, logging bias, and measurement validity.

- Produced a portfolio-ready research design memo demonstrating analytical judgment across causal inference, learning analytics, data engineering, AI governance, and educational assessment.

## Repository or Artifact Links

- Technical memo: artifacts/projects/combined_identification_data_memos/revised/ai_writing_assistant_memo_v2.md
- Review: artifacts/reviews/combined_identification_data_memos/ai_writing_assistant_memo_v2_review.md
- Primary module: modules/03_causal_inference.md
- Secondary module: modules/07_data_engineering_infrastructure.md
- Portfolio rubric: rubrics/synthesis_portfolio_quality.md

## Interview Story Version

Situation:

I worked on a research design problem about whether AI writing assistants improve the quality of student analytical memos. At first, the question sounded straightforward, but it was actually underspecified. "AI use" could mean many different things, and "memo quality" could reflect writing polish, reasoning, evaluator bias, or actual learning.

Task:

My task was to turn that vague AI impact question into a credible analytical artifact. I needed to define what claim could be made, what design would support it, what data infrastructure would be required, and what limitations would remain.

Action:

I reframed the project around governed access to a specified AI writing assistant under a defined permitted-use protocol. I made assigned access the primary treatment because it could be randomized, while actual use would be selected. I defined the primary outcome as blind rubric-scored final memo quality, but I treated that outcome as a constructed measure rather than a direct observation of learning.

I specified the primary estimand as an Intent-to-Treat effect: the average effect of being offered AI access on final memo quality. I then mapped alternative designs, including randomized encouragement, within-student crossover, and observational use comparison. I identified the main assumptions, including correct randomization, limited contamination, valid and reliable scoring, blinding, stable treatment definitions, and meaningful authorship.

I also built out the data-generating process. I traced how the evidence would be produced through course rosters, assignment prompts, AI platform logs, disclosure forms, LMS submissions, rubric scoring systems, evaluator records, and optional oral defense records. I proposed a measurement pipeline and schema so that the system could distinguish assigned access from actual use, login from substantive assistance, and total score from criterion-level reasoning.

Result:

The final artifact became a combined causal identification and data infrastructure memo. It showed how to evaluate AI writing support without making unsupported claims. The review found that it had strong portfolio signal because it integrated causal inference, AI governance, measurement validity, learning analytics, and data infrastructure.

Reflection:

The main judgment I demonstrated was interpretation discipline. I did not treat a difference in final scores as automatic evidence that AI improves learning. I separated product usefulness from pedagogical appropriateness, and I made clear that final memo quality is only one proxy. To claim learning, I would need additional evidence such as oral defense, delayed assessment, revision analysis, or transfer tasks.

Limitation:

The artifact is a strong research design memo, but it is not yet an implementation-ready study protocol. It still needs a concrete statistical analysis plan, a formal randomization protocol, a power analysis, a fully specified scoring rubric, a rater reliability standard, a formal DAG, and a governance appendix for privacy, consent, retention, and access control.
