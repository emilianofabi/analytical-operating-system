# Lesson 1: The Fundamental Problem of Causal Inference

## 1. The Serious Conceptual Problem

A society that wants to act must reason about consequences.

Should a city expand housing vouchers? Should a hospital change its triage protocol? Should a platform alter its recommendation algorithm? Should a school adopt a new tutoring program? Should a central bank raise interest rates?

Each question asks not merely what happened, nor what tends to be associated with what, but what would happen under an intervention.

That is the central problem of causal inference: we want to compare the world that occurred with worlds that did not occur.

For any unit, at any moment, under any policy, only one version of reality is observed. The same person cannot both receive and not receive a treatment at the same time under the same conditions. The same city cannot both adopt and not adopt a law in the same historical trajectory. The same model deployment cannot both influence and not influence a user in the same interaction.

Causal inference begins from this missingness.

The fundamental problem is not insufficient data in the ordinary sense. It is not solved by larger datasets, more features, more compute, or better prediction alone. The problem is that causal questions require counterfactual comparisons, and counterfactual outcomes are structurally unobserved.

The serious conceptual tension is therefore:

How can we make disciplined claims about the effects of actions when the direct comparison required to know those effects is impossible to observe?

This is why the curriculum principle Î“Ã‡Â£identification before estimationÎ“Ã‡Â¥ is central. Estimation is the act of calculating a quantity from data. Identification is the prior argument that the quantity can be learned from the available data under stated assumptions. Without identification, estimation can produce precise numbers with no causal meaning.

## 2. Association Is Not Causation

Suppose we observe that people who complete a job-training program earn more afterward than people who do not.

A predictive question asks:

Can program participation help predict later earnings?

A causal question asks:

Did the program cause higher earnings?

These are different questions.

The predictive relationship may be real and useful even if the causal claim is false. People who enroll may differ from those who do not. They may be more motivated, better connected, less constrained by childcare, more informed about labor-market opportunities, or already on a different earnings trajectory.

The observed comparison combines at least two things:

1. the effect of the program;
2. pre-existing differences between treated and untreated people.

A causal design must separate these.

Prediction is not explanation. A model that accurately forecasts earnings may exploit correlations that do not correspond to manipulable causes. It may learn that prior income, neighborhood, credential status, or platform behavior predicts outcomes. That does not imply that changing one of those variables would produce the predicted change in the outcome.

Causal inference asks about intervention, not merely information.

## 3. Units, Treatments, Outcomes, and Potential Outcomes

To reason causally, we must define the object of study precisely.

A unit is the entity to which treatment could be assigned.

Examples:

- a person;
- a household;
- a school;
- a firm;
- a city;
- a user session;
- a model response;
- a policy jurisdiction.

A treatment is an intervention or condition whose effect is being studied.

Examples:

- receiving a tutoring program;
- being exposed to a recommendation algorithm;
- adopting a minimum wage law;
- receiving a medication;
- using an automated decision system;
- being assigned to a human reviewer.

An outcome is the variable whose response to treatment is of interest.

Examples:

- earnings;
- test scores;
- mortality;
- employment;
- click-through;
- appeal rate;
- housing stability;
- model error rate;
- civic trust.

For each unit \(i\), define two potential outcomes:

\[
Y_i(1)
\]

the outcome unit \(i\) would have if treated, and

\[
Y_i(0)
\]

the outcome unit \(i\) would have if untreated.

The individual causal effect is:

\[
\tau_i = Y_i(1) - Y_i(0)
\]

This expression is conceptually clear but empirically impossible to observe directly, because for each unit we observe only one treatment status.

Let treatment assignment be:

\[
D_i \in \{0,1\}
\]

where \(D_i = 1\) means treated and \(D_i = 0\) means untreated.

The observed outcome is:

\[
Y_i = D_iY_i(1) + (1-D_i)Y_i(0)
\]

If \(D_i = 1\), then:

\[
Y_i = Y_i(1)
\]

and \(Y_i(0)\) is missing.

If \(D_i = 0\), then:

\[
Y_i = Y_i(0)
\]

and \(Y_i(1)\) is missing.

This missing counterfactual outcome is the fundamental problem of causal inference.

## 4. Why Individual Causal Effects Are Usually Not Identified

For a treated person, we observe what happened after treatment, but not what would have happened without it. For an untreated person, we observe what happened without treatment, but not what would have happened with it.

Therefore, the individual treatment effect

\[
\tau_i = Y_i(1)-Y_i(0)
\]

requires two potential outcomes, only one of which is observed.

This is not a measurement error problem. It is a structural missing-data problem generated by reality itself.

The direct individual causal effect is usually unknowable from observed data alone.

Causal inference therefore often shifts from individual effects to population-level estimands.

## 5. Causal Estimands

An estimand is the target quantity we want to learn.

The average treatment effect is:

\[
ATE = \mathbb{E}[Y(1)-Y(0)]
\]

It asks:

What would be the average difference in outcomes if everyone in the population were treated versus if everyone were untreated?

The average treatment effect on the treated is:

\[
ATT = \mathbb{E}[Y(1)-Y(0)\mid D=1]
\]

It asks:

For those who actually received the treatment, how different were their outcomes from what they would have experienced without treatment?

The average treatment effect on the untreated is:

\[
ATU = \mathbb{E}[Y(1)-Y(0)\mid D=0]
\]

It asks:

For those who did not receive treatment, how different would their outcomes have been if they had received it?

These estimands answer different policy questions.

If deciding whether to universalize a program, the ATE may be relevant.

If evaluating whether an existing program helped its participants, the ATT may be relevant.

If deciding whether to expand a program to currently untreated people, the ATU may be relevant.

Purpose before technique: the estimand must match the decision problem.

## 6. The Naive Difference in Means

A common empirical comparison is:

\[
\mathbb{E}[Y \mid D=1] - \mathbb{E}[Y \mid D=0]
\]

This is the observed difference between treated and untreated units.

But substitute the observed outcome equation:

\[
\mathbb{E}[Y \mid D=1] = \mathbb{E}[Y(1)\mid D=1]
\]

\[
\mathbb{E}[Y \mid D=0] = \mathbb{E}[Y(0)\mid D=0]
\]

So the observed difference is:

\[
\mathbb{E}[Y(1)\mid D=1] - \mathbb{E}[Y(0)\mid D=0]
\]

For the ATT, add and subtract \(\mathbb{E}[Y(0)\mid D=1]\):

\[
\mathbb{E}[Y(1)\mid D=1] - \mathbb{E}[Y(0)\mid D=0]
\]

\[
=
\mathbb{E}[Y(1)-Y(0)\mid D=1]
+
\left(
\mathbb{E}[Y(0)\mid D=1] - \mathbb{E}[Y(0)\mid D=0]
\right)
\]

Thus:

\[
\text{Observed Difference}
=
ATT
+
\text{Selection Bias}
\]

where:

\[
\text{Selection Bias}
=
\mathbb{E}[Y(0)\mid D=1] - \mathbb{E}[Y(0)\mid D=0]
\]

This term asks:

Would the treated and untreated groups have had different outcomes even if no one had been treated?

If yes, the naive comparison is not a causal effect.

## 7. A Simple Example

Suppose a voluntary analytics bootcamp reports that graduates earn more than non-participants.

Let:

- \(D=1\): enrolled in the bootcamp;
- \(D=0\): did not enroll;
- \(Y\): salary six months later.

The observed difference is:

\[
\mathbb{E}[Y \mid D=1] - \mathbb{E}[Y \mid D=0]
\]

But bootcamp participants may differ before enrollment. They may have more time, stronger prior technical skills, better professional networks, fewer caregiving constraints, more savings, or greater willingness to take risks.

The causal question is not:

Do bootcamp participants earn more?

The causal question is:

For comparable people, what would earnings have been under bootcamp participation versus non-participation?

The phrase Î“Ã‡Â£comparable peopleÎ“Ã‡Â¥ hides the entire identification problem. Causal inference forces us to state what comparability means, why it is credible, and what could make it fail.

## 8. Identification

Identification is the process of showing that a causal estimand can be expressed in terms of observable quantities under assumptions.

The estimand may involve unobserved potential outcomes:

\[
\mathbb{E}[Y(1)-Y(0)]
\]

The identified expression must involve only observed data:

\[
Y, D, X
\]

where \(X\) represents observed covariates.

For example, under certain assumptions, the ATE can be identified as:

\[
ATE
=
\mathbb{E}_X
\left[
\mathbb{E}[Y \mid D=1, X]
-
\mathbb{E}[Y \mid D=0, X]
\right]
\]

This equation is not automatically true. It becomes valid only if the assumptions connecting observed comparisons to counterfactual outcomes are credible.

The discipline of causal inference is not primarily about clever estimators. It is about the defensible movement from causal question to estimand to assumptions to identification strategy to estimation to interpretation.

## 9. Core Assumptions

### 9.1 Consistency

Consistency means that the observed outcome equals the potential outcome corresponding to the treatment actually received:

\[
Y = Y(D)
\]

If \(D=1\), then \(Y=Y(1)\). If \(D=0\), then \(Y=Y(0)\).

This requires that the treatment be well-defined. If Î“Ã‡Â£job trainingÎ“Ã‡Â¥ includes radically different programs, instructors, durations, supports, and labor-market connections, then \(Y(1)\) may not refer to a single coherent intervention.

Failure mode: vague treatment definition.

If treatment is not well-defined, causal claims become ambiguous. Î“Ã‡Â£The effect of education,Î“Ã‡Â¥ Î“Ã‡Â£the effect of AI,Î“Ã‡Â¥ or Î“Ã‡Â£the effect of regulationÎ“Ã‡Â¥ may be too broad unless the intervention is specified.

### 9.2 Exchangeability

Exchangeability means that treatment assignment is independent of potential outcomes, possibly conditional on covariates.

Unconditional exchangeability:

\[
(Y(1),Y(0)) \perp D
\]

Conditional exchangeability:

\[
(Y(1),Y(0)) \perp D \mid X
\]

This means that, after conditioning on \(X\), treated and untreated units are comparable with respect to the outcomes they would have had under either treatment condition.

Failure mode: confounding.

If people select into treatment based on unobserved traits that also affect outcomes, then conditional exchangeability fails.

### 9.3 Positivity

Positivity means that each relevant type of unit has a nonzero probability of receiving each treatment condition:

\[
0 < P(D=1 \mid X=x) < 1
\]

for all covariate values \(x\) where causal comparisons are desired.

If every high-risk patient receives treatment and no high-risk patient is untreated, then the data contain no empirical comparison for untreated high-risk patients.

Failure mode: extrapolation disguised as estimation.

A model may still output predictions, but the causal comparison is unsupported by observed overlap.

### 9.4 No Interference

No interference means one unitÎ“Ã‡Ã–s treatment does not affect another unitÎ“Ã‡Ã–s outcome.

Formally, for unit \(i\):

\[
Y_i(D_1,D_2,\ldots,D_n) = Y_i(D_i)
\]

This says unit \(i\)'s potential outcome depends only on its own treatment.

Failure mode: spillovers.

Vaccination, tutoring, platform ranking, policing, housing policy, and social network interventions often violate no interference because one personÎ“Ã‡Ã–s treatment may alter another personÎ“Ã‡Ã–s environment.

### 9.5 Stable Unit Treatment Value Assumption

The Stable Unit Treatment Value Assumption, often called SUTVA, combines no interference with no hidden versions of treatment.

It requires:

1. no interference between units;
2. no multiple hidden versions of the treatment.

Failure mode: sociotechnical treatments.

In real institutions, treatments are implemented through people, rules, software, incentives, and local context. The Î“Ã‡Â£sameÎ“Ã‡Â¥ treatment may not be the same across sites. Infrastructure is epistemic: how the treatment is implemented affects what can be known about it.

## 10. Computational Representation

A simple causal inference workflow can be represented as a pipeline, but the pipeline must not hide the assumptions.

```text
Decision problem
    Î“Ã¥Ã´
Causal question
    Î“Ã¥Ã´
Unit / treatment / outcome definition
    Î“Ã¥Ã´
Estimand
    Î“Ã¥Ã´
Identification assumptions
    Î“Ã¥Ã´
Research design
    Î“Ã¥Ã´
Data-generating process audit
    Î“Ã¥Ã´
Estimation
    Î“Ã¥Ã´
Sensitivity analysis
    Î“Ã¥Ã´
Interpretation for action
```

A predictive machine-learning workflow may begin with available data and optimize performance:

```text
Data
    Î“Ã¥Ã´
Features
    Î“Ã¥Ã´
Model
    Î“Ã¥Ã´
Predictions
    Î“Ã¥Ã´
Performance metric
```

A causal workflow must begin earlier:

```text
Purpose
    Î“Ã¥Ã´
Intervention
    Î“Ã¥Ã´
Counterfactual contrast
    Î“Ã¥Ã´
Assumptions
    Î“Ã¥Ã´
Evidence
    Î“Ã¥Ã´
Judgment
```

This is the architectural difference. Prediction systems ask whether the output tracks future observations. Causal systems ask whether an intervention claim survives a chain of assumptions linking observed evidence to unobserved counterfactuals.

## 11. Architectural Formalization: Causal Claims as System Objects

In an analytical operating system, a causal claim should not appear as an isolated sentence. It should be represented as an object with dependencies.

A minimal causal-claim schema might be:

```yaml
causal_claim:
  decision_context: "Whether to expand the tutoring program to all ninth-grade students"
  unit: "student"
  treatment: "offer of two weekly tutoring sessions for one semester"
  comparison: "no offer of tutoring"
  outcome: "end-of-year algebra assessment score"
  estimand: "ATT"
  identification_strategy: "randomized offer among eligible students"
  assumptions:
    - "random assignment was implemented as designed"
    - "no differential attrition by treatment status"
    - "no spillovers between treated and untreated students"
    - "the tutoring offer is a well-defined intervention"
  observed_data:
    - "assignment indicator"
    - "attendance records"
    - "baseline math score"
    - "end-of-year assessment"
  threats:
    - "noncompliance"
    - "peer spillovers"
    - "missing outcomes"
    - "teacher-level implementation variation"
  sensitivity_checks:
    - "balance tests"
    - "attrition analysis"
    - "intent-to-treat and treatment-on-treated distinction"
  interpretation_limits:
    - "effect applies to eligible students in this district under this implementation"
```

This schema expresses a core curriculum principle: synthesis requires visible artifacts. Causal reasoning should leave a trace that can be inspected, challenged, revised, and governed.

## 12. Data Is Produced, Not Found

Causal inference depends on how data came to exist.

A dataset is not a neutral container of facts. It is the residue of institutional choices:

- who was eligible for treatment;
- who was offered treatment;
- who accepted treatment;
- who was measured;
- when outcomes were recorded;
- which outcomes were valued;
- which records were linked;
- which cases disappeared;
- which implementation details were ignored.

If the data-generating process reflects selection, exclusion, surveillance, administrative convenience, or unequal institutional contact, then causal claims inherit those conditions.

For example, arrest data are not simply crime data. Hospital records are not simply health data. Platform engagement logs are not simply preference data. School disciplinary records are not simply behavior data.

Data is produced, not found. Causal inference must audit the production process.

## 13. Metrics Are Proxies, Not Values

Even when a causal effect is identified, the chosen outcome may not capture the value at stake.

A tutoring program may increase test scores but reduce student autonomy.

A recommendation system may increase engagement but worsen informational quality.

A policing intervention may reduce recorded incidents but increase unreported harm.

A hospital triage model may reduce average waiting time but worsen equity for a subgroup.

The causal estimate answers only the question encoded by the outcome. It does not settle the normative question of what should matter.

Metrics are proxies, not values. Responsible causal inference requires asking whether the outcome is a defensible representation of the purpose.

## 14. Common Failure Modes

### 14.1 Confusing Prediction with Causation

A model predicts \(Y\) well from \(X\), so the analyst treats important predictors as causes.

Why this fails:

Predictive importance measures information, not intervention effect.

### 14.2 Controlling for the Wrong Variables

An analyst conditions on variables affected by the treatment, thereby blocking part of the causal effect or inducing bias.

Why this fails:

Not all covariates are confounders. Some are mediators or colliders.

### 14.3 Treating Regression as Identification

An analyst estimates:

\[
Y_i = \alpha + \beta D_i + \gamma X_i + \epsilon_i
\]

and interprets \(\beta\) as causal because controls were included.

Why this fails:

Regression is an estimator, not an identification strategy. The causal meaning of \(\beta\) depends on assumptions about treatment assignment, omitted variables, measurement, timing, and functional form.

### 14.4 Ignoring Treatment Variation

An analyst studies Î“Ã‡Â£the effect of AI adoptionÎ“Ã‡Â¥ without defining which system, used by whom, under what workflow, with what governance, and with what fallback procedures.

Why this fails:

The treatment is not well-defined. The estimate averages over incompatible interventions.

### 14.5 Ignoring Spillovers

An analyst assumes treated and untreated units are independent when treatment changes the environment shared by both.

Why this fails:

The untreated group may no longer represent the counterfactual world without treatment.

### 14.6 Overgeneralizing from a Local Design

An effect identified in one institution is treated as universal.

Why this fails:

Causal effects are often context-dependent. The same intervention may operate differently across populations, institutions, infrastructures, and time.

### 14.7 Mistaking Statistical Precision for Causal Credibility

A large dataset yields a narrow confidence interval around a biased estimate.

Why this fails:

More data can reduce variance without reducing bias. Precision does not repair a broken design.

## 15. The First Discipline of Causal Inference

Before estimating anything, the analyst must be able to state:

1. What decision or action motivates the question?
2. What is the treatment?
3. What is the comparison condition?
4. What is the outcome?
5. What is the unit?
6. What estimand is being targeted?
7. What counterfactual is missing?
8. What assumptions would make the missing counterfactual recoverable?
9. How were the data produced?
10. What would make the claim fail?

This is not preliminary paperwork. It is the causal argument.

The purpose of causal inference is not to decorate regression tables with stronger language. It is to discipline claims about action under uncertainty.

## 16. Exercise: Build a Causal Claim Object

Choose one policy, product, institutional, or technical intervention.

Examples:

- a rent subsidy;
- a tutoring program;
- a hospital triage algorithm;
- a recommendation-system change;
- a job-training bootcamp;
- a remote-work policy;
- a predictive policing tool;
- an AI writing assistant in a classroom.

Create a one-page causal claim object with the following fields:

```yaml
causal_claim:
  decision_context:
  unit:
  treatment:
  comparison:
  outcome:
  estimand:
  observed_difference:
  missing_counterfactual:
  identification_strategy:
  assumptions:
  data_production_process:
  likely_failure_modes:
  ethical_or_governance_concerns:
  interpretation_limit:
```

Then prepare a three-minute oral defense answering:

1. Why is your estimand aligned with the decision problem?
2. What counterfactual outcome is missing?
3. What assumption is most vulnerable?
4. What kind of evidence would make your causal claim more credible?
5. What should a responsible decision-maker not conclude from your analysis?

