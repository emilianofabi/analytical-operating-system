# Analytical Operating System

A local Hermes-powered curriculum architecture for building, assessing, revising, and translating interdisciplinary analytical work into durable portfolio artifacts.

## Project Thesis

The Analytical Operating System is a curriculum and workflow system built around one central claim:

> Analytical intelligence is architectural.

Modern analytical competence is not reducible to coding, statistics, economics, machine learning, philosophy, or policy alone. It requires the ability to move among models, evidence, computation, infrastructure, institutions, ethics, and communication without collapsing them into one framework.

This project operationalizes that thesis as a local curriculum system. Hermes functions as the orchestration layer. The repository contains the curriculum source of truth: modules, rubrics, templates, learner state, project artifacts, audits, and governance files.

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
```

The goal is not simply to generate lessons. The goal is to produce evidence-bearing artifacts that demonstrate analytical judgment.

## Strategic Uses

This system translates abstract learning into concrete outcomes:
* **Technical Interviews:** Structure answers using `claim -> method -> evidence -> assumptions -> limitations -> failure modes`.
* **Product and AI Strategy:** Reason rigorously about user problems, AI suitability, model reliability, and deployment risk.
* **Research and Academic Advancement:** Develop research questions, methods sections, and literature-linked arguments.
* **Portfolio Development:** Demonstrate competencies through case studies, technical READMEs, notebooks, and memos.

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

## Repository Structure

```text
analytical-operating-system/
|-- artifacts/      # Stores generated lessons, projects, reviews, and portfolio materials.
|-- audits/         # Maintains logs, semantic reviews, and quarantine areas for broken outputs.
|-- curriculum/     # Defines learning pathways, sequencing, and cross-module synthesis protocols.
|-- governance/     # Manages system changelogs and contribution guidelines.
|-- learner-state/  # Tracks competency progress, profiles, and artifact registries via JSON schemas.
|-- modules/        # Contains the 25 core curriculum module cards and routing logic.
|-- ops/            # Contains operational scripts, including the primary aos.ps1 runner.
|-- prompts/        # Holds the text prompts used to drive the Hermes generation and review loops.
|-- rubrics/        # Defines the assessment criteria for evaluating artifacts and competencies.
`-- templates/      # Provides structural scaffolding for lessons, projects, and portfolio items.
```

## Quick Start & Workflow

**Prerequisites:** You must have [Hermes](https://hermes-agent.nousresearch.com/) installed and configured. Hermes acts as the AI agent and runtime for this system.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd analytical-operating-system
   ```
2. **Confirm Hermes is operational:**
   ```bash
   hermes --version
   ```
3. **Run your first AOS loop:**
   While you can run Hermes directly when useful, the preferred local workflow uses `ops/aos.ps1`. This runner invokes Hermes with specific prompt files and output paths to ensure structured artifact generation.
   
   ```powershell
   # Example: Generate a case study using a predefined prompt
   .\ops\aos.ps1 -PromptFile ".\prompts\portfolio\ai_writing_assistant_case_study.prompt.txt" -OutFile ".\artifacts\portfolio\case_studies\ai_writing_assistant_memo_case_study.md" -ExpectedType "markdown" -Force
   ```
4. **Audit and Commit:**
   Let the local audit check the generated output in `artifacts/`, then commit only clean, verified artifacts. Do not commit test artifacts, logs, quarantine files, or broken outputs.

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
