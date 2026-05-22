# Module 07: Data Engineering, Infrastructure, MLOps, and Production Systems

## Track
Methods & Systems

## Credit Hours
5

## Core Purpose

Cultivate production systems judgment: the ability to transform messy, unreliable, institutionally produced data into trustworthy infrastructure for analysis, decision-making, automation, experimentation, machine learning, and AI systems.

## Governing Principles

1. Data is produced, not found.
2. Schemas are theories of the domain.
3. Pipelines are chains of assumptions.
4. Reliability is designed, not hoped for.
5. Production changes the problem.
6. Observability is organizational vision.
7. Governance is infrastructure.

## Core Questions

- Where does the data come from?
- What does one row represent?
- Can this dataset be trusted?
- What assumptions are encoded in the schema?
- What happens when upstream systems change?
- What happens when data arrives late, duplicated, missing, corrupted, or reclassified?
- Should this system be batch, streaming, real-time, event-driven, or manually reviewed?
- How does a notebook become a reliable pipeline?
- How does a model move from experiment to production?
- How do infrastructure choices shape what an organization can know, measure, automate, govern, and trust?

## Competencies

- Epistemic Infrastructure Design
- Mathematical and Computational Formalization
- Predictive Modeling and Learning Systems Evaluation
- Responsible Sociotechnical System Design
- Assumption-Awareness in Technical Work

## Prerequisites

- Programming and Computational Thinking
- SQL and Data Modeling
- Probability and Statistical Thinking
- Exploratory Data Analysis
- Basic Software Engineering

## Technical Tools

- Python
- SQL
- Pandas
- Polars
- DuckDB
- SQLite
- PostgreSQL
- dbt
- Airflow
- Prefect
- Docker
- Git
- GitHub Actions
- Great Expectations
- Pydantic
- Pytest
- MLflow
- vector databases
- observability tools

## Major Topics

- Data generation and provenance
- Data modeling and schemas
- Relational databases
- SQL and analytical reasoning
- Analytics engineering
- Data pipelines and orchestration
- Distributed systems
- Cloud infrastructure and DevOps
- APIs, services, and contracts
- MLOps and model deployment
- LLMOps, vector infrastructure, and retrieval systems
- Observability and monitoring
- Security, privacy, and governance
- Production failure analysis

## Lesson Structure

Every lesson should follow this structure:

1. Production problem
2. Conceptual framework
3. Architectural model
4. Implementation
5. Failure analysis
6. Scaling and tradeoffs
7. Synthesis and reflection

## Assessment Artifacts

- Data model specification
- SQL analysis portfolio
- Validated data pipeline
- Architecture diagram
- Data quality report
- Incident analysis
- Production-readiness review
- MLOps deployment plan
- LLM retrieval infrastructure review

## Rubrics

- Assumption-Awareness in Technical Work
- Responsible System Design
- Epistemic Infrastructure Design
- Technical Communication and Documentation

## Lesson 1

### Title
Data Is Produced, Not Found

### Central Problem
Before data can be analyzed, modeled, visualized, or used for decision-making, the student must understand how it was produced. Data is not neutral evidence. It is the residue of systems, categories, instruments, incentives, interfaces, and institutional routines.

### Required Concepts

- data-generating process
- event logging
- measurement
- institutional categories
- row-level meaning
- provenance
- missingness
- selection
- schema as theory

### Required Outputs

- short analytical memo defining the data-generating process of a dataset
- table describing entities, events, fields, assumptions, and possible failures
- oral-defense question explaining why treating data as found is epistemically dangerous

## Default Instruction

Don't evaluate, just proceed with lesson 1.
