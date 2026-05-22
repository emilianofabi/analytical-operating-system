# Semantic Audit Report

## Artifact Path

`artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md`

## Expected Artifact Type

`portfolio_case_study_template`

## Audit Status

PASS_WITH_MINOR_FIXES

## Summary Judgment

The artifact is a valid portfolio case study. It substantially follows the expected portfolio case study template, makes a clear and defensible claim, explains method and evidence, includes assumptions and limitations, avoids major unsupported empirical claims, connects to the correct active modules, demonstrates portfolio value, and includes both resume bullets and an interview story.

It is ready for portfolio use after minor structural cleanup.

## Template Compliance

Status: Mostly compliant

The expected template requires these sections:

- Project Title
- One-Sentence Summary
- Problem
- Why It Matters
- My Role
- Methods and Tools
- Architecture or Workflow
- Evidence
- Key Decisions
- Assumptions and Limitations
- Results or Outputs
- What I Learned
- Competencies Demonstrated
- Repository or Artifact Links
- Interview Story Version

The artifact includes nearly all required sections in the correct order. However, it uses the top-level H1 title as the project title instead of including the explicit template heading:

`## Project Title`

This is a minor template deviation, not a substantive failure.

## Hermes CLI Errors or PowerShell Traces

Status: Clean

No evidence of Hermes CLI error dumps, PowerShell traces, remote exceptions, stack traces, or mojibake error artifacts was found.

Checked against common failure patterns:

- `usage: hermes`: not present
- `hermes: error`: not present
- `invalid choice`: not present
- `unrecognized arguments`: not present
- `System.Management.Automation.RemoteException`: not present
- `Traceback`: not present
- `Exception:`: not present
- mojibake sequences such as `ΓÇ£`, `ΓÇ¥`, `ΓÇÖ`, `ΓÇô`, `ΓÇö`, `┬á`: not present

Minor note: the file appears to begin with a UTF-8 BOM. This is usually harmless, but if the repository requires strict plain ASCII output, remove it.

## Clear Claim

Status: Pass

The artifact makes a clear claim:

> The project translated a vague question about whether AI writing assistants improve student memos into a disciplined causal and data-infrastructure design specifying treatment, outcome, estimand, counterfactual, assumptions, measurement pipeline, and limits of interpretation.

This claim is specific, portfolio-relevant, and aligned with the artifact's evidence. It avoids claiming that AI writing assistants empirically improve student writing. Instead, it claims that the author produced a defensible research design and infrastructure reasoning artifact.

## Method and Evidence

Status: Pass

The artifact explains method and evidence clearly.

Method evidence includes:

- treatment definition
- outcome definition
- Intent-to-Treat estimand
- counterfactual statement
- randomized access design
- randomized encouragement alternative
- within-student crossover alternative
- observational use comparison critique
- data-generating process analysis
- measurement pipeline
- schema design
- missingness and logging bias analysis
- diagnostics and robustness checks

The Evidence section correctly frames the artifact as a design and reasoning artifact rather than an empirical results report:

> The project is a design and reasoning artifact rather than an empirical results report.

This is important because the artifact does not overstate its evidentiary basis.

## Assumptions and Limitations

Status: Pass

The artifact includes a strong assumptions and limitations section.

It identifies:

- random assignment assumptions
- treatment definition assumptions
- control condition assumptions
- contamination risks
- spillover risks
- compliance issues
- outcome scoring validity
- scoring reliability
- missingness
- post-treatment adjustment risks
- versioning requirements
- authorship concerns

It also separates limitations into:

- causal limitations
- measurement limitations
- generalization limitations
- institutional and ethical limitations
- implementation limitations

This exceeds the basic template requirement and aligns well with the synthesis portfolio rubric.

## Unsupported Empirical Claims

Status: Pass with minor caution

The artifact mostly avoids unsupported empirical claims. It repeatedly states that this is a design artifact, not an empirical results report. It does not claim that AI writing assistance improves student memo quality.

The main phrase to revise is:

> The project produced a portfolio-ready technical research design memo...

This is not a serious problem, but "portfolio-ready" is an evaluative claim. It is supported indirectly by the case study's structure and review link, but it would be stronger if phrased more modestly:

Recommended revision:

> The project produced a technical research design memo intended for portfolio use.

Another phrase to watch:

> The review found that it had strong portfolio signal...

This may be acceptable because the artifact links to a review, but the case study should ensure the linked review actually supports that statement.

## Module Alignment

Status: Pass

The artifact connects to the correct active modules from `learner-state/current_student_state.json`:

- `03_causal_inference`
- `07_data_engineering_infrastructure`

The repository links section explicitly identifies:

- Primary module: `modules/03_causal_inference.md`
- Secondary module: `modules/07_data_engineering_infrastructure.md`

This is correct.

The artifact also substantively aligns with the module cards:

### Module 03: Causal Inference

Relevant alignment:

- treatment
- outcome
- population
- estimand
- counterfactual
- randomized design
- selection bias
- contamination
- threats to validity
- interpretation discipline

The artifact directly reflects Module 03 governing principles, especially:

- identification before estimation
- counterfactuals define causal claims
- assumptions must be stated before results are interpreted
- causal conclusions must be proportional to design credibility

### Module 07: Data Engineering and Infrastructure

Relevant alignment:

- data-generating process
- source systems
- event logs
- schemas
- measurement pipeline
- missingness
- logging bias
- instrumentation bias
- versioning
- governance

The artifact directly reflects Module 07 governing principles, especially:

- data is produced, not found
- schemas are theories of the domain
- pipelines are chains of assumptions
- governance is infrastructure

## Portfolio Value

Status: Pass

The artifact demonstrates strong portfolio value.

It makes visible the learner's ability to integrate:

- causal inference
- data infrastructure
- educational measurement
- responsible AI governance
- product and institutional decision-making
- technical communication

The portfolio signal is clear in this passage:

> The artifact shows that I can reason across causal inference, measurement validity, data engineering, AI governance, educational assessment, and technical communication.

This aligns with the `synthesis_portfolio_quality.md` rubric, especially:

- Claim and Argument
- Domain Integration
- Method and Evidence Fit
- Limitation and Critique
- Portfolio Signal

## Resume Bullets and Interview Story

Status: Pass

The artifact includes a dedicated resume bullet section and an interview story section.

The resume bullets are specific and high-signal. They name concrete work products and competencies:

- causal identification framework
- Intent-to-Treat randomized access design
- data-generating process and schema
- validity threats
- measurement pipeline
- AI governance and educational assessment

The interview story follows the expected structure:

- Situation
- Task
- Action
- Result
- Reflection
- Limitation

This satisfies the template expectation.

## Rubric-Based Assessment

Using `rubrics/synthesis_portfolio_quality.md`:

| Criterion | Assessment | Rationale |
|---|---|---|
| Central Question | Advanced | The question is sharply framed around evaluating governed AI writing assistance. |
| Claim and Argument | Advanced | The claim is explicit, scoped, and supported by method, evidence, assumptions, and limitations. |
| Domain Integration | Advanced | Causal inference and infrastructure are not merely listed; they are integrated into the argument. |
| Method and Evidence Fit | Advanced | The method fits the claim, and the evidence is properly described as design coherence rather than empirical results. |
| Artifact Design | Proficient to Advanced | The case study is polished and portfolio-facing, with minor template cleanup needed. |
| Communication Clarity | Advanced | Writing is clear, structured, technical, and audience-aware. |
| Limitation and Critique | Advanced | Limitations are specific and strengthen credibility. |
| Portfolio Signal | Advanced | The artifact demonstrates integrated analytical judgment across multiple domains. |

Overall rubric judgment: Advanced, with minor formatting/template cleanup.

## Detected Issues

1. Missing explicit `## Project Title` heading

Evidence:

The artifact begins with:

`# Evaluating AI Writing Assistance: A Causal Identification and Data Infrastructure Case Study`

The template expects:

`## Project Title`

Required fix:

Add a `## Project Title` section or convert the opening structure to match the template exactly.

Safe automatic repair: Yes

2. Possible UTF-8 BOM at start of file

Evidence:

The file content begins with a visible BOM marker before the H1 heading.

Required fix:

Remove the BOM if strict ASCII compatibility is required.

Safe automatic repair: Yes

3. Slightly self-certifying portfolio claim

Evidence:

`The project produced a portfolio-ready technical research design memo...`

Required fix:

Revise to a less self-certifying phrasing, such as:

`The project produced a technical research design memo intended for portfolio use...`

Safe automatic repair: Yes

4. Review-based claim should be verifiable

Evidence:

`The review found that it had strong portfolio signal...`

Required fix:

Ensure the linked review actually supports this claim, or soften the wording.

Safe automatic repair: Yes, if softened.

## Likely Cause

The artifact appears to have been generated as a polished case study rather than filled mechanically into the exact template. This explains why the substantive sections are strong but the opening template heading is slightly different.

There is no evidence of CLI failure, PowerShell contamination, or corrupted generation.

## Required Fix

Minimum required fixes before final portfolio publication:

1. Add or normalize the `## Project Title` section.
2. Remove the BOM if plain ASCII output is required.
3. Soften or verify the phrase "portfolio-ready."
4. Confirm that the linked review supports the statement about "strong portfolio signal."

## Automatic Repair Safety

Automatic repair is safe.

The artifact is substantively valid and does not need regeneration. The required fixes are limited to formatting and minor claim calibration.

## Recommended Next Command or Action

Revise the artifact in place with a minor cleanup pass:

- normalize the title section to match `portfolio_case_study_template`;
- remove the BOM;
- soften self-certifying claims;
- preserve the existing structure, evidence, assumptions, limitations, resume bullets, and interview story.

## Final Portfolio Readiness

Ready for portfolio use: Yes, after minor fixes.

Final status: PASS_WITH_MINOR_FIXES
