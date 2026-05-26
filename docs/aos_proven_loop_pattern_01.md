# AOS Proven Loop Pattern #1

## Purpose

Capture a proven lightweight artifact loop for AOS work without turning it into a governance system.

The loop exists to move one concrete learning artifact from draft to reviewed, revised, audited, and commit-ready form. It is meant to preserve evidence of judgment while avoiding process weight.

Closed examples:

- AI Writing Assistance DAG / Statistical Analysis Plan
- Quant/options Lesson 1

Core loop:

```text
artifact -> review -> revision -> audit -> commit
```

## Required Stages

1. Artifact
2. Review
3. Revision
4. Audit
5. Commit

## Definition of Done by Stage

### 1. Artifact

Done when:

- A concrete artifact exists in clean Markdown or valid structured format.
- The artifact has a clear purpose, audience, and scope.
- The artifact is specific enough to review.
- The artifact does not contain terminal logs, tool traces, or placeholder governance language.

### 2. Review

Done when:

- A separate review identifies strengths, gaps, and revision priorities.
- The review focuses on the artifact itself, not the whole curriculum architecture.
- The review gives actionable changes rather than broad advice.
- The review ends with a clear outcome: pass, revise, or reject.

### 3. Revision

Done when:

- The artifact has been revised in response to the review.
- Changes are targeted and traceable to review findings.
- The artifact remains within its original purpose and scope.
- No unrelated lesson, module, learner-state, or architecture changes were introduced.

### 4. Audit

Done when:

- A final audit checks the revised artifact against the requested criteria.
- The audit is concise and decision-oriented.
- The audit identifies any remaining blockers.
- The audit gives a commit recommendation only if the artifact is ready.

### 5. Commit

Done when:

- Only the intended artifact-loop files are included.
- Unrelated modified or untracked files are excluded.
- The commit message names the completed artifact loop.
- The latest commit can be inspected and matches the requested scope.

## Files Usually Involved

A lightweight cycle usually includes some subset of:

- Source artifact: `artifacts/...`
- Review: `artifacts/reviews/...`
- Revised artifact: `artifacts/.../revised/...` or an updated source artifact
- Audit: `audits/...`
- Optional state update proposal: `artifacts/generated/state_updates/...`

Use only the files needed for the current cycle. Do not create supporting files just to make the loop look complete.

## What Not to Do

- Do not create a new governance system.
- Do not propose new architecture.
- Do not expand the loop into a standing committee, registry, or dashboard.
- Do not generate downstream lessons before the current loop is closed.
- Do not revise forever after the audit has passed.
- Do not bundle unrelated cleanup into the commit.
- Do not mutate learner state unless explicitly requested.
- Do not treat the loop as a substitute for judgment.

## When to Commit

Commit only after:

- The artifact exists.
- The review is complete.
- The revision addresses the review.
- The audit passes or explicitly recommends commit.
- The staged file list contains only the intended files.

If the audit says revise, do not commit yet unless the user explicitly asks to preserve the current draft state.

## When to Stop Revising

Stop revising when:

- The audit finds no blocking issues.
- Remaining improvements are optional refinements, not correctness problems.
- The artifact satisfies its stated purpose.
- Further edits would broaden scope rather than improve the current artifact.

A closed loop is not a perfect artifact. It is an artifact that has enough review, revision, and audit evidence to stand as a completed learning cycle.

## How to Choose the Next Cycle

Choose the next cycle by asking:

1. What completed artifact creates the strongest foundation for the next one?
2. What learner need is now visible because the prior loop closed?
3. What artifact can be completed with the same lightweight loop?
4. What should not be started yet because it depends on a missing review, revision, or audit?

Prefer the next small artifact that extends demonstrated competence rather than the largest possible new build.

## Recommended Next Cycle

Recommended next cycle: Quant/options Lesson 2.

Do not generate Lesson 2 as part of this checklist. Start it only when explicitly requested, using the same lightweight loop:

```text
artifact -> review -> revision -> audit -> commit
```
