# Module 03: Causal Inference, Scientific Reasoning, and Identification

## Track
Methods & Systems

## Credit Hours
5

## Core Purpose

Cultivate causal judgment: the ability to distinguish association, prediction, explanation, and causal identification, and to justify claims about effects through explicit counterfactual reasoning.

## Governing Principles

1. Identification before estimation.
2. Counterfactuals define causal claims.
3. Research design determines what can be claimed.
4. No estimator can rescue an unidentified causal question.
5. Assumptions must be stated before results are interpreted.
6. Causal conclusions must be proportional to design credibility.

## Core Questions

- What is the treatment?
- What is the outcome?
- What is the population?
- What is the counterfactual?
- What is the estimand?
- What assumptions identify the effect?
- What threats to validity remain?
- What alternative explanations must be ruled out?
- What causal claim is warranted, unwarranted, or conditional?

## Competencies

- Causal Identification and Counterfactual Reasoning
- Statistical Inference and Uncertainty Quantification
- Model Construction and Assumption Analysis
- Institutional, Market, and Policy Judgment Under Uncertainty

## Prerequisites

- Probability and Statistical Thinking
- Regression, Statistical Modeling, and Inference
- Research Methods
- Economic Reasoning

## Technical Tools

- Python
- R when useful
- Pandas
- Polars
- Statsmodels
- causal inference libraries
- DAG tools
- visualization tools

## Major Topics

- Potential outcomes
- Counterfactual reasoning
- Treatment effects
- Randomized experiments
- Selection bias
- Confounding
- DAGs
- Backdoor and front-door criteria
- Instrumental variables
- Difference-in-differences
- Regression discontinuity
- Matching and weighting
- Synthetic control
- Heterogeneous treatment effects
- Sensitivity analysis

## Lesson Structure

Every lesson should follow this structure:

1. Causal problem
2. Counterfactual framing
3. Identification strategy
4. Formal model
5. Empirical or computational analysis
6. Threats to validity
7. Interpretation discipline
8. Synthesis and transfer

## Assessment Artifacts

- Identification memo
- DAG and adjustment set
- Pre-analysis plan
- Causal research notebook
- Robustness appendix
- Oral defense

## Rubrics

- Causal Reasoning Quality
- Assumption-Awareness in Technical Work

## Lesson 1

### Title
The Fundamental Problem of Causal Inference

### Central Problem
Causal inference begins from a missing-data problem. For any unit, we can observe the outcome under treatment or the outcome under control, but not both at the same time. Every causal design is an attempt to justify a counterfactual comparison.

### Required Concepts

- potential outcomes
- treatment
- control
- observed outcome
- missing counterfactual
- individual treatment effect
- average treatment effect
- selection bias
- identification

### Required Outputs

- short memo defining a causal question using treatment, outcome, population, and estimand
- counterfactual table showing observed and missing potential outcomes
- oral-defense answer explaining why causal inference is not the same as prediction

## Default Instruction

Don't evaluate, just proceed with lesson 1.
