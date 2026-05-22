# Analytical Operating System

A local Hermes-powered curriculum architecture for building, assessing, revising, and translating interdisciplinary analytical work into durable portfolio artifacts.

## Project Thesis

The Analytical Operating System is a curriculum and workflow system built around one central claim:

> Analytical intelligence is architectural.

Modern analytical competence is not reducible to coding, statistics, economics, machine learning, philosophy, or policy alone. It requires the ability to move among models, evidence, computation, infrastructure, institutions, ethics, and communication without collapsing them into one framework.

This project operationalizes that thesis as a local curriculum system. Hermes functions as the orchestration layer. The repository contains the curriculum source of truth: modules, rubrics, templates, learner state, project artifacts, audits, and governance files.

## Core Principles

1. Purpose before technique.
2. Identification before estimation.
3. Models are controlled omissions.
4. Data is produced, not found.
5. Metrics are proxies, not values.
6. Prediction is not explanation.
7. Infrastructure is epistemic.
8. Systems are sociotechnical.
9. Responsible design requires governance.
10. Synthesis requires visible artifacts.

## What This System Does

This repository supports a full learning and production loop:

```text
module card
  -> lesson generation
  -> project artifact
  -> rubric review
  -> revision
  -> semantic audit
  -> learner-state update
  -> portfolio translation
````

The goal is not simply to generate lessons. The goal is to produce evidence-bearing artifacts that demonstrate analytical judgment.

## Repository Structure

```text
analytical-operating-system/
|
|-- curriculum/
|   |-- pathways/
|   |   `-- dependency_graph.md
|   `-- cross_module_synthesis_protocol.md
|
|-- modules/
|   |-- _module_index.md
|   |-- 01_economic_reasoning.md
|   |-- 02_probability_statistics.md
|   |-- 03_causal_inference.md
|   |-- 04_machine_learning.md
|   |-- 05_ai_product_strategy.md
|   |-- 06_philosophy_critical_analysis.md
|   |-- 07_data_engineering_infrastructure.md
|   |-- 08_quantitative_finance.md
|   |-- 09_mathematics.md
|   |-- 10_programming.md
|   |-- 11_research_methods.md
|   |-- 12_technical_communication_portfolio.md
|   |-- 13_responsible_ai_governance.md
|   |-- 14_decision_theory_optimization.md
|   |-- 15_complex_systems.md
|   |-- 16_macroeconomics_political_economy.md
|   |-- 17_llms_agents_rag.md
|   |-- 18_behavioral_economics.md
|   |-- 19_data_visualization_eda.md
|   |-- 20_experimental_design_metrics.md
|   |-- 21_industrial_organization_platforms.md
|   |-- 22_labor_education_human_capital.md
|   |-- 23_public_policy_governance.md
|   |-- 24_entrepreneurship_venture_strategy.md
|   `-- 25_capstone_integration.md
|
|-- rubrics/
|   |-- _rubric_index.md
|   |-- assumption_awareness.md
|   |-- causal_reasoning_quality.md
|   |-- institutional_analysis_depth.md
|   |-- responsible_system_design.md
|   |-- technical_artifact_quality.md
|   `-- synthesis_portfolio_quality.md
|
|-- templates/
|   |-- lesson_template.md
|   |-- projects/
|   |-- reviews/
|   `-- portfolio/
|
|-- learner-state/
|   |-- current_student_state.json
|   |-- learner_profile.schema.json
|   |-- competency_progress.schema.json
|   `-- artifact_registry.schema.json
|
|-- artifacts/
|   |-- lessons/
|   |-- projects/
|   |-- reviews/
|   |-- portfolio/
|   |-- capstones/
|   `-- generated/
|
|-- audits/
|   |-- reports/
|   |-- semantic/
|   |-- quarantine/
|   `-- logs/
|
|-- prompts/
|   |-- portfolio/
|   |-- projects/
|   |-- reviews/
|   |-- repairs/
|   `-- state_updates/
|
|-- ops/
|   |-- lesson.ps1
|   |-- project-output.ps1
|   |-- review-artifact.ps1
|   |-- revise-artifact.ps1
|   |-- generate-state-update.ps1
|   |-- portfolio-translate.ps1
|   |-- audit-artifact.ps1
|   |-- semantic-audit.ps1
|   `-- hermes-safe-run.ps1
|
`-- governance/
    |-- CHANGELOG.md
    `-- CONTRIBUTING.md
```

## Curriculum Architecture

The curriculum is organized into three tracks.

### 1. Foundational

These modules establish epistemic, mathematical, computational, statistical, economic, philosophical, and visual reasoning foundations.

Representative modules:

* Economic Reasoning
* Probability and Statistics
* Philosophy and Critical Analysis
* Mathematics
* Programming
* Data Visualization and EDA

### 2. Methods and Systems

These modules develop causal, predictive, infrastructural, experimental, optimization, AI, and system-building capability.

Representative modules:

* Causal Inference
* Machine Learning
* Data Engineering and Infrastructure
* Responsible AI and Governance
* LLMs, Agents, and RAG
* Experimental Design and Metrics

### 3. Integration and Judgment

These modules synthesize technical capability with institutions, markets, labor, policy, entrepreneurship, communication, and capstone work.

Representative modules:

* AI Product Strategy
* Macroeconomics and Political Economy
* Industrial Organization and Platforms
* Labor Economics and Human Capital
* Public Policy and Governance
* Entrepreneurship and Venture Strategy
* Capstone Integration

## Competency System

The curriculum tracks progress across ten core competencies:

1. Model Construction and Assumption Analysis
2. Mathematical and Computational Formalization
3. Statistical Inference and Uncertainty Quantification
4. Causal Identification and Counterfactual Reasoning
5. Predictive Modeling and Learning Systems Evaluation
6. Epistemic Infrastructure Design
7. Experimental and Measurement Systems Design
8. Institutional, Market, and Policy Judgment
9. Responsible Sociotechnical System Design
10. Synthesis, Communication, and Intellectual Production

Each module is mapped to competencies, artifacts, rubrics, and prerequisite dependencies.

## Hermes Integration

Hermes is used as the curriculum orchestration layer.

Primary local skill:

```text
curriculum-orchestrator
```

Optional parallel audit skill:

```text
curriculum-auditor
```

Recommended invocation:

```powershell
hermes --skills curriculum-orchestrator chat
```

For scripted artifact generation, use the scripts in `ops/`.

## Workflow Examples

### Generate a Lesson

```powershell
.\ops\lesson.ps1 `
  -ModuleFile "07_data_engineering_infrastructure.md" `
  -Lesson "Lesson 1: Data Is Produced, Not Found" `
  -OutFile ".\artifacts\lessons\07_data_engineering_infrastructure\lesson_01_data_is_produced_not_found.md"
```

### Review an Artifact

```powershell
.\ops\review-artifact.ps1 `
  -ArtifactFile ".\artifacts\projects\combined_identification_data_memos\revised\ai_writing_assistant_memo_v2.md" `
  -RubricFiles "rubrics/assumption_awareness.md and rubrics/causal_reasoning_quality.md" `
  -OutFile ".\artifacts\reviews\combined_identification_data_memos\ai_writing_assistant_memo_v2_review.md"
```

### Generate a Portfolio Case Study Safely

```powershell
.\ops\hermes-safe-run.ps1 `
  -PromptFile ".\prompts\portfolio\ai_writing_assistant_case_study.prompt.txt" `
  -OutFile ".\artifacts\portfolio\case_studies\ai_writing_assistant_memo_case_study.md" `
  -ExpectedType "markdown"
```

### Audit an Artifact

```powershell
.\ops\audit-artifact.ps1 `
  -ArtifactFile ".\artifacts\portfolio\case_studies\ai_writing_assistant_memo_case_study.md" `
  -ExpectedType "markdown"
```

## Self-Healing Audit Layer

The repository includes an emerging self-healing workflow designed to prevent broken Hermes outputs from becoming accepted artifacts.

The local audit layer checks for:

* Hermes CLI error dumps
* PowerShell traces
* empty files
* invalid Markdown
* invalid JSON
* obvious command failures

The semantic audit layer checks for deeper quality issues:

* template adherence
* unsupported claims
* missing assumptions
* missing limitations
* weak portfolio framing
* misalignment with module competencies
* insufficient evidence of analytical judgment

The goal is to ensure that every serious output passes through:

```text
generate -> audit -> repair or approve -> register
```

## Current Proof-of-Concept Artifact

The first end-to-end artifact loop centers on the question:

```text
Does using an AI writing assistant improve the quality of student analytical memos?
```

This artifact integrates:

* Module 03: Causal Inference
* Module 07: Data Engineering and Infrastructure
* Assumption-Awareness Rubric
* Causal Reasoning Quality Rubric
* Portfolio Translation Workflow

It demonstrates how the system converts lesson exposure into a competency-bearing artifact.

## Strategic Uses

This system is designed to support:

### Technical Interviews

Use the curriculum to structure answers around:

```text
claim -> method -> evidence -> assumptions -> limitations -> failure modes
```

### Product and AI Strategy

Use the modules to reason about:

* user problems
* AI suitability
* model reliability
* evaluation
* deployment risk
* governance

### Research and Academic Advancement

Use the capstone and research templates to develop:

* research questions
* proposals
* methods sections
* evidence plans
* literature-linked arguments

### Portfolio Development

Use artifacts to demonstrate competencies through:

* case studies
* technical READMEs
* notebooks
* memos
* model cards
* data pipeline reviews
* oral defense preparation

## Governance

The project uses lightweight curriculum governance:

* `governance/CHANGELOG.md` records major changes.
* `governance/CONTRIBUTING.md` defines update rules.
* `curriculum/pathways/dependency_graph.md` defines prerequisite sequencing.
* `rubrics/_rubric_index.md` defines assessment alignment.
* `modules/_module_index.md` defines routing logic.

## Status

Current version:

```text
v0.2.0
```

Current focus:

```text
Building the first complete self-healing Hermes learning loop:
lesson -> artifact -> review -> revision -> audit -> portfolio translation -> learner-state update
```

## Roadmap

### v0.3.0

* Stabilize self-healing output generation.
* Complete semantic audit workflow.
* Add learner-state update automation.
* Confirm first portfolio case study passes local and semantic audit.

### v0.4.0

* Add project brief generator.
* Add oral defense generator.
* Add README and case-study generation for technical projects.
* Add module-level lesson sequencing beyond Lesson 1.

### v0.5.0

* Add Obsidian/VS Code knowledge-base workflow.
* Add GitHub Pages or public portfolio export.
* Add optional Telegram control surface.
* Add richer curriculum dashboards.

## Project Identity

This repository is not just a curriculum folder. It is an attempt to make interdisciplinary analytical judgment operational.

It treats curriculum as infrastructure.

It treats artifacts as evidence.

It treats assessment as a feedback system.

It treats Hermes as an orchestration layer for disciplined intellectual production.
