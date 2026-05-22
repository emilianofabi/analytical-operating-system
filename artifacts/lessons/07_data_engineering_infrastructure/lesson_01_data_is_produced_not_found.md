# Lesson 1: Data Is Produced, Not Found

## 1. Production Problem

The serious conceptual problem is this: analytical systems often treat datasets as if they were discovered objects, when they are actually produced artifacts.

A dataset does not simply appear in the world. It is created by instruments, software systems, organizational routines, legal categories, user interfaces, economic incentives, human decisions, defaults, sensors, forms, APIs, logs, and failures. Before a dataset can be analyzed, modeled, visualized, automated, or used for decision-making, we must ask how it came to exist.

If we skip this question, we mistake administrative residue for reality.

A row in a table is not automatically an observation of the world. A column is not automatically a valid measure. A missing value is not automatically random. A timestamp is not automatically the time an event occurred. A category is not automatically a natural kind. A metric is not automatically a value. A dataset is not automatically evidence.

The first responsibility of data engineering is therefore epistemic: to understand and document the conditions under which data was produced.

This lesson begins with the principle:

Data is produced, not found.

This principle belongs to the broader Toward an Analytical Operating System curriculum because it disciplines how we move from purpose to evidence, from evidence to method, and from method to judgment. It also protects us from a common failure: building technically sophisticated systems on conceptually unstable data.

## 2. Conceptual Framework

### 2.1 Data

Data is structured representation produced by a system for some purpose.

This definition matters because data is not identical to reality. Data is a representation of selected features of reality, recorded through some process, using some schema, under some institutional and technical constraints.

A dataset should therefore be understood as the output of a production process:

```text
world process -> observation system -> recording system -> storage system -> analytical dataset
```

Each arrow introduces assumptions, omissions, transformations, and possible failures.

### 2.2 Data-Generating Process

A data-generating process is the set of mechanisms by which observations become recorded data.

In statistics, the term often refers to the probabilistic process that generates observations. In production systems, the concept must be expanded. A real data-generating process includes:

- the real-world process being represented;
- the instruments or interfaces that observe it;
- the rules deciding what is recorded;
- the schema into which observations are encoded;
- the software systems that transform and store records;
- the institutional incentives that shape behavior;
- the failures, defaults, and exclusions that determine what is missing.

A useful definition is:

```text
A data-generating process is the sociotechnical mechanism that maps states and events in the world into records in a dataset.
```

Formally, let:

```text
W = relevant world state
E = event or condition of interest
O = observation mechanism
C = classification or coding rule
S = schema
T = technical transformation pipeline
D = resulting dataset
```

Then data production can be represented as:

```text
D = T(S(C(O(W, E))))
```

This expression is not meant to imply that data production is clean or deterministic. It is meant to expose that the dataset is downstream of many transformations.

If any component changes, the meaning of the dataset can change.

### 2.3 Measurement

Measurement is the assignment of values to properties according to a rule.

A measurement is not merely a number. It is a number produced by a procedure.

For example, "income" may be measured as:

- self-reported annual household income;
- taxable income from administrative records;
- monthly payroll deposits;
- modeled income from credit bureau data;
- business revenue;
- disposable income after transfers and taxes.

These are not interchangeable. Each measure answers a different question.

A measurement definition should specify:

- the construct being measured;
- the observable proxy;
- the unit of measurement;
- the timing of measurement;
- the source system;
- the collection procedure;
- the expected errors;
- the population for which the measure is valid.

The principle "metrics are proxies, not values" applies here. A measured field is a proxy for a concept. It is not the concept itself.

### 2.4 Event Logging

Event logging is the recording of discrete actions, changes, or signals as events.

A typical event record may contain:

```text
event_id
entity_id
event_type
event_timestamp
recorded_timestamp
source_system
metadata
```

Event logs are common in websites, applications, payment systems, sensors, operational platforms, and machine learning systems.

However, event logs are not neutral traces of behavior. They depend on instrumentation choices.

For example, suppose an application records the event:

```text
button_clicked
```

This event exists only if:

- the button was instrumented;
- the user interface loaded correctly;
- the client sent the event;
- the network request succeeded;
- the logging service accepted it;
- the event was not filtered, sampled, or deduplicated;
- the pipeline preserved it;
- the analyst correctly interpreted it.

A logged event is therefore not simply "what happened." It is what the system was designed and able to record.

### 2.5 Institutional Categories

Institutional categories are classifications created by organizations, laws, platforms, policies, or administrative routines.

Examples include:

- enrolled student;
- active customer;
- unemployed worker;
- high-risk borrower;
- completed order;
- fraudulent transaction;
- eligible patient;
- churned subscriber;
- verified account.

These categories may look objective inside a database, but they are often produced by rules, thresholds, forms, incentives, and institutional decisions.

For example, "unemployed" is not merely a natural condition. It depends on labor force definitions, survey questions, search behavior, eligibility rules, reporting systems, and time periods.

A data engineer must ask:

- Who created this category?
- For what purpose?
- What rule assigns cases to it?
- Who is excluded?
- Has the definition changed over time?
- What incentives does the category create?
- What downstream decisions depend on it?

This is why schemas are theories of the domain. A schema encodes what kinds of things the organization believes exist and what relations among them are worth recording.

### 2.6 Row-Level Meaning

Row-level meaning is the interpretation of what one row in a dataset represents.

This is one of the most important questions in data engineering:

What does one row represent?

Possible answers include:

- one person;
- one account;
- one transaction;
- one event;
- one session;
- one device;
- one order line;
- one organization;
- one measurement at one time;
- one model prediction;
- one entity-state snapshot;
- one relationship between two entities.

Ambiguity about row-level meaning causes analytical errors.

For example, a table with one row per order is different from a table with one row per order item. If an analyst sums revenue in the wrong table without accounting for row grain, revenue may be duplicated.

The grain of a table is the level of detail represented by each row.

A precise table definition should include:

```text
Table name:
Row grain:
Primary entity:
Event or state represented:
Time meaning:
Primary key:
Foreign keys:
Update behavior:
Known exclusions:
Known duplication risks:
```

### 2.7 Provenance

Provenance is the documented origin and transformation history of data.

Provenance answers:

- Where did this data come from?
- Who or what produced it?
- When was it produced?
- What systems transformed it?
- What filters were applied?
- What definitions were used?
- What quality checks were performed?
- What changed since the previous version?

A dataset without provenance cannot be fully trusted because its meaning cannot be audited.

In production systems, provenance should be treated as infrastructure. It should not depend only on informal memory.

### 2.8 Missingness

Missingness is the absence of a value that might have been expected to appear in a dataset.

Missingness is not a single phenomenon. It can occur for many reasons:

- the event did not occur;
- the event occurred but was not observed;
- the event was observed but not recorded;
- the value was recorded but later removed;
- the value was intentionally withheld;
- the field was not applicable;
- the source system failed;
- the user skipped a form field;
- the organization changed its schema;
- privacy rules suppressed the value;
- a join failed;
- a pipeline dropped the record.

In statistical terms, missingness is often described using three categories:

```text
MCAR: Missing completely at random.
MAR: Missing at random conditional on observed variables.
MNAR: Missing not at random, depending on unobserved values or on the missing value itself.
```

These categories are not merely technical details. They determine whether an analysis can be trusted.

For example, if low-income users are less likely to report income, missing income is not random. Imputing average income may produce biased conclusions.

### 2.9 Selection

Selection occurs when some units, events, or observations are included in a dataset while others are excluded.

Selection can arise from:

- eligibility rules;
- platform access;
- measurement constraints;
- opt-in behavior;
- survival through a funnel;
- institutional reporting requirements;
- sampling;
- sensor coverage;
- user behavior;
- business processes;
- historical archives.

A dataset is always a selected view of the world.

The analytical danger is to infer from the observed population to a broader target population without justifying the link.

Formally, let:

```text
Y = outcome of interest
X = observed features
S = indicator that a unit appears in the dataset
```

If:

```text
P(S = 1 | X, Y) != P(S = 1)
```

then inclusion in the dataset is not random. The observed data distribution may differ from the target distribution.

The analyst observes:

```text
P(X, Y | S = 1)
```

but often wants to reason about:

```text
P(X, Y)
```

The gap between these two distributions is a source of bias.

### 2.10 Schema as Theory

A schema is a formal structure that defines entities, attributes, relationships, constraints, and allowed values.

But a schema is more than a technical structure. It is a theory of the domain.

A schema asserts:

- what entities exist;
- what properties matter;
- which relationships are meaningful;
- which categories are allowed;
- which events deserve recording;
- which constraints should hold;
- what counts as valid data.

For example, a healthcare schema may define patients, visits, diagnoses, providers, claims, medications, and outcomes. This schema is not just storage design. It encodes a theory of healthcare as an administrative and clinical process.

A bad schema can make some truths impossible to express.

## 3. Architectural Model

A dataset can be understood as the product of a layered architecture.

```text
1. World layer
   Real events, entities, states, actions, interactions, institutions.

2. Observation layer
   Sensors, forms, user interfaces, surveys, APIs, logs, administrative systems.

3. Encoding layer
   Categories, identifiers, timestamps, units, labels, missing-value conventions.

4. Transport layer
   Message queues, API calls, file transfers, batch exports, streaming systems.

5. Storage layer
   Databases, warehouses, lakes, object stores, indexes, vector stores.

6. Transformation layer
   Cleaning, joining, deduplication, aggregation, validation, feature generation.

7. Consumption layer
   Dashboards, reports, experiments, models, products, policies, decisions.
```

Each layer can preserve, distort, enrich, or erase information.

A production-grade data engineer asks not only "Can I query this table?" but also:

- What real process produced these records?
- What does each row mean?
- What assumptions were introduced at each layer?
- What failures can occur at each layer?
- What decisions will this data support?
- What evidence is needed before this data can be trusted?

This is the principle "infrastructure is epistemic." Infrastructure shapes what an organization can know.

## 4. Formalizing Data Production

Consider a simplified production system.

Let:

```text
U = set of users in the target population
A = set of actions users may take
I = instrumentation function
L = logging system
P = pipeline transformation
Q = quality filter
D = analytical dataset
```

A user action `a` by user `u` becomes a record in the dataset only if it passes through the production chain:

```text
(u, a) -> I(u, a) -> L(I(u, a)) -> P(L(I(u, a))) -> Q(P(L(I(u, a)))) -> D
```

This means the dataset includes only actions satisfying the condition:

```text
record_in_D = 1
```

where:

```text
record_in_D = observed_by_instrumentation
              AND accepted_by_logging_system
              AND preserved_by_pipeline
              AND passed_quality_filter
              AND represented_by_schema
```

Even if the real action occurred, the record may not appear.

This distinction matters because the analyst usually observes `D`, not the full set of real-world actions.

If the analyst estimates:

```text
conversion_rate = purchases / page_views
```

the estimate depends on how purchases and page views were produced as records.

Possible questions include:

- Are page views logged on page load or after full render?
- Are bot visits included?
- Are repeated refreshes counted?
- Are purchases counted when initiated, authorized, captured, shipped, or completed?
- Are failed payments included?
- Are refunds subtracted?
- Are mobile and web events logged consistently?
- Are events deduplicated?
- Are late-arriving events included?
- Has instrumentation changed over time?

The formula is simple. The data production process is not.

## 5. Implementation: Reading a Dataset as Produced Evidence

When encountering a new dataset, do not begin by modeling it. Begin by reconstructing its production.

A disciplined first pass includes the following steps.

### Step 1: Identify the Claimed Purpose

Ask:

```text
What is this dataset supposed to help us understand or decide?
```

A dataset used for operational monitoring may not be valid for causal inference. A dataset used for billing may not be valid for measuring user satisfaction. A dataset used for compliance may not be valid for prediction.

Purpose before technique.

### Step 2: Identify the Unit of Analysis

Ask:

```text
What does one row represent?
```

Document the row grain. If row grain is unclear, analysis should pause.

Example:

```text
Table: orders
Row grain: one row per order placed
Primary key: order_id
Time meaning: order_created_at records when checkout was submitted
Update behavior: status may change after order creation
Known risk: refunded orders remain present unless filtered
```

### Step 3: Identify Entities and Events

Separate entities from events.

Entities are things with continuity over time:

- user;
- account;
- patient;
- household;
- product;
- organization;
- device.

Events are occurrences at a time:

- signup;
- login;
- purchase;
- visit;
- diagnosis;
- payment;
- cancellation;
- model prediction.

Many analytical errors occur when events are mistaken for entities or entities are mistaken for events.

### Step 4: Identify Measurement Rules

For each important field, ask:

```text
What rule produced this value?
```

A field dictionary should include:

```text
Field name:
Definition:
Type:
Unit:
Allowed values:
Source:
Collection method:
Time of measurement:
Known errors:
Missingness meaning:
Owner:
```

### Step 5: Identify Provenance

Ask:

```text
Where did this table come from, and what transformations produced it?
```

At minimum, document:

- source system;
- extraction method;
- pipeline name;
- transformation logic;
- refresh schedule;
- data quality checks;
- last updated timestamp;
- upstream dependencies;
- known incidents.

### Step 6: Identify Selection Mechanisms

Ask:

```text
Who or what is excluded from this dataset?
```

Selection is often invisible because absent records do not announce themselves.

Examples:

- only logged-in users are recorded;
- only successful transactions appear;
- only institutions using a specific software vendor are included;
- only users who consented to tracking appear;
- only claims submitted for reimbursement are observed;
- only sensors that were online produced readings.

### Step 7: Identify Failure Modes

Ask:

```text
How could this data be wrong?
```

Failure analysis is not pessimism. It is part of responsible system design.

## 6. Assumptions

Every dataset carries assumptions. Some are statistical. Some are computational. Some are institutional.

Common assumptions include:

### 6.1 Stability Assumption

The meaning of fields and categories is stable over time.

Failure example:

A company changes the definition of "active user" from "logged in during the last 30 days" to "opened the app during the last 30 days." Historical comparisons become invalid unless the definition change is documented and adjusted.

### 6.2 Completeness Assumption

The dataset contains all relevant units or events.

Failure example:

A transaction table includes only completed purchases. Analysts use it to study checkout abandonment, but abandoned checkouts were never recorded.

### 6.3 Measurement Validity Assumption

The recorded field is a valid proxy for the intended concept.

Failure example:

A school uses homework submission timestamps as a measure of student effort. The measure confounds effort with internet access, caregiving responsibilities, time zones, and platform reliability.

### 6.4 Consistent Instrumentation Assumption

Events are logged consistently across platforms, time periods, and user groups.

Failure example:

Mobile app clicks and web clicks are logged under different event names. A dashboard undercounts total engagement.

### 6.5 Identity Resolution Assumption

Identifiers correctly link records belonging to the same entity.

Failure example:

One person has multiple accounts, or multiple people share one account. User-level metrics become distorted.

### 6.6 Missingness Assumption

Missing values have an interpretable and analytically manageable cause.

Failure example:

Income is missing mostly for high-income users who decline to report it. Treating missing income as average income biases analysis.

### 6.7 Classification Assumption

Institutional categories are accurate, meaningful, and appropriate for the analytical purpose.

Failure example:

A fraud label is based only on detected fraud, not all actual fraud. A model trained on this label learns patterns of detection rather than patterns of fraud.

## 7. Failure Modes

### 7.1 Treating Administrative Data as Natural Data

Administrative data is produced to operate an institution, not necessarily to answer analytical questions.

Example:

Hospital billing codes are used as disease measures. But billing codes reflect reimbursement rules, documentation practices, insurance incentives, and compliance requirements.

Failure:

The analyst treats codes as direct clinical truth.

### 7.2 Confusing Events with Outcomes

A logged event may not equal the outcome of interest.

Example:

"Application submitted" is used as a measure of "demand for service."

Failure:

The dataset excludes people who wanted the service but could not complete the application.

### 7.3 Ignoring Row Grain

Aggregations are performed without understanding what one row represents.

Example:

A table has one row per order item. The analyst counts rows to estimate number of orders.

Failure:

Orders with multiple items are overcounted.

### 7.4 Assuming Missing Means Zero

A missing value is treated as absence.

Example:

A missing diagnosis code is interpreted as absence of disease.

Failure:

The disease may exist but was not tested, recorded, coded, or transferred.

### 7.5 Ignoring Instrumentation Changes

A metric changes because logging changed, not because the world changed.

Example:

A product team adds tracking for mobile events. Engagement appears to rise.

Failure:

The organization interprets a measurement change as behavioral growth.

### 7.6 Treating Labels as Ground Truth

Labels are assumed to be correct because they appear in a database.

Example:

A model predicts employee performance using historical promotion labels.

Failure:

Promotion labels may reflect managerial bias, political networks, department budgets, and unequal opportunities.

### 7.7 Losing Provenance

A derived table is copied, exported, modified, and reused without documentation.

Failure:

No one knows which source system, transformation, or definition produced the numbers. The dataset becomes analytically unsafe.

### 7.8 Building Models Before Understanding Production

A predictive model is trained before the data-generating process is understood.

Failure:

The model learns artifacts of collection, reporting, or selection rather than the phenomenon of interest.

This connects to the principle "prediction is not explanation." Predictive performance does not prove that the dataset validly represents the target process.

## 8. Scaling and Tradeoffs

As systems scale, data production becomes harder to understand.

Small datasets may be manually inspected. Production systems require explicit contracts, documentation, tests, monitoring, and governance.

Important tradeoffs include:

### 8.1 Flexibility vs Consistency

Flexible schemas allow fast change but may produce inconsistent meanings.

Strict schemas enforce consistency but may slow adaptation.

### 8.2 Completeness vs Privacy

Collecting more data may improve observability but increase privacy risk.

Responsible design requires governance, minimization, access controls, and purpose limitation.

### 8.3 Real-Time Speed vs Validation

Real-time systems provide fast signals but may have weaker validation.

Batch systems allow stronger checks but introduce latency.

### 8.4 Richness vs Interpretability

Complex event logs capture detailed behavior but can be difficult to interpret.

Simplified metrics are easier to communicate but may hide important mechanisms.

### 8.5 Automation vs Human Review

Automated pipelines scale but may propagate errors quickly.

Human review adds judgment but may introduce inconsistency, delay, and institutional bias.

There is no purely technical solution to these tradeoffs. Systems are sociotechnical. Design decisions encode values, incentives, and institutional priorities.

## 9. Synthesis

The first lesson of data engineering is not how to move data faster. It is how to understand what data means.

A dataset is trustworthy only to the extent that its production process is understood, documented, monitored, and governed.

The central questions are:

- Where does the data come from?
- What does one row represent?
- What real-world process does the dataset claim to represent?
- What measurement rules produced each field?
- What categories are institutional rather than natural?
- What selection mechanisms determine inclusion?
- What missingness mechanisms determine absence?
- What transformations changed the data?
- What assumptions must hold for analysis to be valid?
- What failures would make conclusions unsafe?

The principle "data is produced, not found" protects the entire analytical operating system. It forces us to place purpose before technique, identification before estimation, and governance before automation. It reminds us that infrastructure is epistemic: what we build determines what we can know.

## 10. Exercise: Data Production Memo

Choose one dataset. It may be public, organizational, synthetic, administrative, experimental, or logged from an application.

Write a short analytical memo titled:

```text
How This Dataset Was Produced
```

Your memo must include the following sections.

### 10.1 Dataset Purpose

Answer:

```text
What question, decision, or system is this dataset intended to support?
```

### 10.2 Row-Level Meaning

Complete:

```text
Dataset name:
Primary table:
What one row represents:
Primary key:
Time field:
Whether rows represent entities, events, relationships, or snapshots:
```

### 10.3 Data-Generating Process

Describe the production chain:

```text
world process -> observation mechanism -> recording system -> storage system -> transformation pipeline -> analytical dataset
```

### 10.4 Entities, Events, Fields, Assumptions, and Failures

Create a table with the following columns:

```text
Entity or event | Field | Meaning | Production rule | Assumption | Possible failure
```

Include at least 8 rows.

### 10.5 Missingness and Selection

Answer:

```text
What is missing from the dataset?
Who or what is excluded?
What mechanisms produce missing values?
Are missing values likely to be MCAR, MAR, or MNAR?
How could selection bias affect conclusions?
```

### 10.6 Provenance

Answer:

```text
Where did the data originate?
Who owns or maintains it?
What transformations were applied?
How often is it refreshed?
What documentation exists?
What documentation is missing?
```

### 10.7 Oral-Defense Prompt

Prepare a 3 minute oral response to the following question:

```text
Why is treating data as found, rather than produced, epistemically dangerous?
```

Your answer must include:

- one example of a misleading row-level interpretation;
- one example of a measurement failure;
- one example of selection or missingness;
- one explanation of why infrastructure shapes what an organization can know.
