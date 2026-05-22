# Combined Identification and Data-Generating Process Memo Template

## Artifact Metadata

- Artifact Title:
- Artifact ID:
- Primary Modules:
  - 03 Causal Inference, Scientific Reasoning, and Identification
  - 07 Data Engineering, Infrastructure, MLOps, and Production Systems
- Primary Competencies:
  - Causal Identification and Counterfactual Reasoning
  - Epistemic Infrastructure Design
- Secondary Competencies:
  - Model Construction and Assumption Analysis
  - Synthesis, Communication, and Intellectual Production
- Status:
- Date:

## 1. Research or Product Question

State the question in a form that can be analyzed.

A weak version names a broad topic.

A stronger version specifies the intervention, population, outcome, and decision context.

## 2. Causal Claim

State the causal claim being considered.

Format:

"The effect of [treatment/intervention] on [outcome] for [population] over [time horizon]."

## 3. Treatment or Intervention

Define the treatment precisely.

Include:

- what changes;
- who receives it;
- when it occurs;
- how exposure is assigned or observed;
- whether treatment intensity varies;
- what would count as non-treatment.

## 4. Outcome

Define the outcome precisely.

Include:

- outcome name;
- unit of measurement;
- time window;
- source system;
- whether the outcome is directly observed or constructed;
- whether the outcome is a proxy for a deeper value.

## 5. Population and Unit of Analysis

Define:

- target population;
- observed population;
- unit of analysis;
- inclusion criteria;
- exclusion criteria;
- whether the observed data represents the target population.

## 6. Estimand

Define the causal quantity of interest.

Choose one if appropriate:

- Average Treatment Effect;
- Average Treatment Effect on the Treated;
- Intent-to-Treat Effect;
- Local Average Treatment Effect;
- Conditional Average Treatment Effect;
- other.

Write the estimand in plain English first.

Optional formal notation:

E[Y(1) - Y(0)]

or

E[Y_i(1) - Y_i(0) | i in target population]

## 7. Comparison or Counterfactual

Define the comparison condition.

Ask:

- What would have happened without the treatment?
- Who or what provides the comparison?
- Why is this comparison credible or not credible?
- What alternative explanations remain?

## 8. Identification Assumptions

List the assumptions required for the causal claim to be credible.

| Assumption | Why It Matters | Evidence or Diagnostic | Risk If False |
|---|---|---|---|
|  |  |  |  |

## 9. Data-Generating Process

Describe how the data required for the analysis comes into existence.

Include:

- source systems;
- human inputs;
- event logs;
- forms;
- APIs;
- sensors;
- administrative categories;
- timestamps;
- incentives shaping recording;
- possible changes over time.

## 10. Measurement Pipeline

Describe how raw events become analytical variables.

| Stage | Transformation | Assumption | Possible Failure |
|---|---|---|---|
| Raw event |  |  |  |
| Logged record |  |  |  |
| Stored table |  |  |  |
| Cleaned data |  |  |  |
| Analytical variable |  |  |  |
| Final metric |  |  |  |

## 11. Missingness, Selection, Logging, and Instrumentation Bias

Analyze possible data distortions.

### Missingness

What data might be absent?

### Selection

Who or what enters the dataset, and who or what is excluded?

### Logging Bias

What events may be recorded inconsistently?

### Instrumentation Bias

Could the measurement system change the observed outcome?

### Definition Drift

Could the meaning of a variable change over time?

## 12. What the Data Can Support

State the strongest credible claim the data could support if assumptions hold.

## 13. What the Data Cannot Support

State what the analysis cannot establish.

Be explicit about:

- causal limits;
- measurement limits;
- generalization limits;
- institutional limits;
- ethical limits.

## 14. Portfolio-Facing Interpretation

Translate the artifact into a professional signal.

Answer:

- What does this memo demonstrate?
- Which competencies does it evidence?
- How could it become a portfolio case study?
- What would a reviewer or interviewer learn about your judgment?

## 15. Oral-Defense Questions

1. What is the treatment, and why is it well-defined?
2. What is the missing counterfactual?
3. What assumption is most fragile?
4. How was the outcome produced as data?
5. What could make the observed data misleading?
6. What claim would you refuse to make from this data?
