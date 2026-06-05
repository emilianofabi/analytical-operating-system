Lesson Status: Draft / Not reviewed / Not audited / Not closed

# Causal Inference — Lesson 1: Correlation Is Not a Cause

## Module

Causal Inference

## Lesson Status

Draft / Not reviewed / Not audited / Not closed

## Central Question

When two things move together, what would we need to know before saying one caused the other?

## Plain-Language Explanation

Causal inference asks whether an action, exposure, policy, product change, or treatment actually changed an outcome. Two variables can be correlated without one causing the other. A third factor may influence both, or the apparent relationship may come from selection bias.

This lesson introduces the causal habit of asking what comparison would be fair. The goal is not to estimate an effect yet. The goal is to notice when a causal claim needs a design, not just a chart.

## Key Concepts

- Correlation: two variables move together in the observed data.
- Causation: one thing changes another thing.
- Treatment: the action, exposure, or intervention being evaluated.
- Outcome: the result we care about measuring.
- Confounding: a third factor affects both the treatment and the outcome.
- Counterfactual: what would have happened to the same unit without the treatment.
- Selection bias: treated and untreated groups differ in ways that affect the outcome.
- Causal diagram / DAG: a simple directed graph that shows assumed causal relationships.

## First Mental Model

Treat causal inference as structured skepticism about comparisons. The first question is not "did the line go up?" but "compared with what, and were the groups comparable?"

## System Analogy

In an operating system, a bug report is not the same as a root-cause analysis. Seeing that an error happened after a deployment may be useful, but the team still needs evidence that the deployment caused the error. Causal inference applies the same discipline to data claims.

## Mini-Artifact

Simple DAG: confounding can create a misleading relationship

```text
Motivation  -> Training
Motivation  -> Promotion
Training    -> Promotion
```

In this diagram, training appears related to promotion. But motivation may influence both who chooses training and who gets promoted. Without addressing motivation, the relationship between training and promotion may overstate the effect of training.

## Career Translation

In a work setting, this lesson supports the habit of asking whether a claimed impact has a credible comparison group or design.

## Overclaiming Warning

Do not claim causal impact without a design that supports it. A before-and-after change, dashboard trend, or correlation is not enough by itself.

## What This Lesson Does Not Prove Yet

This lesson does not prove mastery of causal identification, experiments, difference-in-differences, instrumental variables, matching, or DAG theory. It does not show that the learner can estimate causal effects. It only creates an introductory orientation artifact about correlation, causation, and confounding.

## Review Questions

1. Why is correlation not the same as causation?
2. What is a confounder in the training and promotion example?
3. What kind of comparison would make a causal claim more credible?

## Closure Criteria

The lesson is closed only when:

- the note exists
- the mini-artifact exists
- the artifact was reviewed
- defects were revised
- audit decision was made
- safe career claim was identified

## Safe Career Claim

I can explain, at an introductory level, why a correlation is not enough to claim causal impact and why a causal design matters.

## Notes / Open Questions

- Later lessons should connect this orientation to randomized experiments, counterfactual reasoning, and identification assumptions.
- Review should check whether the DAG is simple enough for Lesson 1 while still showing confounding clearly.
