Lesson Status: Draft / Not reviewed / Not audited / Not closed

# Experimental Design and Metrics — Lesson 1: Measuring Whether Something Worked

## Module

Experimental Design and Metrics

## Lesson Status

Draft / Not reviewed / Not audited / Not closed

## Central Question

How can we measure whether an intervention improved an outcome instead of just noticing that the outcome changed?

## Plain-Language Explanation

Experimental design creates structured comparisons. Instead of asking whether a metric went up after a change, it asks whether the change produced a better result than a credible alternative. Metrics define what success means; design defines how fair the comparison is.

This lesson introduces the idea that measurement must be planned before a claim is made. The goal is not to run a full experiment. The goal is to define a small test with a treatment, control, metric, and baseline.

## Key Concepts

- Experiment: a structured comparison used to evaluate an intervention.
- Treatment: the version, workflow, or intervention being tested.
- Control: the comparison condition that does not receive the new intervention.
- Metric: the measured outcome used to judge performance.
- Baseline: the starting level of performance or current condition.
- Randomization: assigning units to treatment or control by chance.
- Sample size: the number of observations in the test.
- Effect size: the size of the observed difference between groups.
- Statistical power: the chance that a test can detect a real effect of a given size.

## First Mental Model

Treat an experiment as a fair comparison machine. The design should make it harder to confuse normal variation, selection, or timing with the effect of the intervention.

## System Analogy

When testing a software change, a team does not only ask whether the system worked once after deployment. It compares expected behavior against observed behavior under controlled conditions. Experimental design applies that same discipline to product, policy, workflow, and AI-assistant changes.

## Mini-Artifact

Simple A/B test design for an AI assistant

Test question: Does adding a checklist prompt to an AI support assistant improve answer completeness?

Treatment: users receive assistant answers generated with the checklist prompt.

Control: users receive assistant answers generated with the current prompt.

Metric: percentage of answers that include all required support-policy elements.

Baseline: current prompt performance before the test.

Assignment: randomly route comparable support questions to treatment or control during the test window.

## Career Translation

In a work setting, this lesson supports the habit of defining the comparison, metric, and baseline before claiming that a product, workflow, or AI change worked.

## Overclaiming Warning

Do not claim a tool improved performance unless the measurement design supports it. A metric moving upward after launch may reflect timing, selection, noise, or unrelated changes.

## What This Lesson Does Not Prove Yet

This lesson does not prove mastery of experimental design, power analysis, causal inference, metric governance, or A/B testing operations. It does not show that the learner can run a valid production experiment. It only creates an introductory orientation artifact about designing a small comparison.

## Review Questions

1. What is the difference between a treatment and a control?
2. Why should the success metric be chosen before evaluating the result?
3. What could go wrong if treatment and control groups are not comparable?

## Closure Criteria

The lesson is closed only when:

- the note exists
- the mini-artifact exists
- the artifact was reviewed
- defects were revised
- audit decision was made
- safe career claim was identified

## Safe Career Claim

I can outline, at an introductory level, a simple A/B test with a treatment, control, metric, and baseline while avoiding unsupported improvement claims.

## Notes / Open Questions

- Later lessons should connect this orientation to sample-size planning, power, metric tradeoffs, and experiment validity.
- Review should check whether the A/B test design is concrete but still small enough for Lesson 1.
