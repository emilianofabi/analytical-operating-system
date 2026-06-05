# Generate Introductory Lesson 1 Batch

Use this prompt to generate a small batch of AOS introductory Lesson 1 artifacts.

## Source Template

Use:

```text
templates/lessons/intro_lesson_1_template.md
```

## Scope

Generate a batch of no more than 4 modules.

Do not generate all 18 introductory lessons at once.

Each lesson must remain introductory. Lesson 1 is not mastery; Lesson 1 is orientation plus one visible output.

## Required Lesson Rules

Each generated lesson must:

- start with `Lesson Status: Draft / Not reviewed / Not audited / Not closed`
- avoid mastery claims
- avoid claims of review, audit, closure, or portfolio readiness
- include one mini-artifact
- include one safe career translation
- include one overclaiming warning
- include AOS closure criteria
- identify what the lesson does not prove yet
- be small enough for later review, revision, audit, and closure

## Repository Safety Rules

Do not:

- modify unrelated files
- modify closed artifacts
- edit learner-state files
- edit frontend files
- edit RAG files
- commit files
- stage files
- run `git add`

## Output Expectations

For each module in the batch:

- create or update only the intended lesson artifact
- preserve existing content unless a minimal safe addition is needed
- keep the content scoped to introductory orientation
- leave the artifact in draft status

End with a short summary of files created or changed and any files intentionally left untouched.
