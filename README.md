# Analytical Operating System

A local Hermes-powered curriculum architecture for building, assessing, revising, and translating interdisciplinary analytical work into durable portfolio artifacts.

## Project Thesis

The Analytical Operating System is a curriculum and workflow system built around one central claim:

> Analytical intelligence is architectural.

Modern analytical competence is not reducible to coding, statistics, economics, machine learning, philosophy, or policy alone. It requires the ability to move among models, evidence, computation, infrastructure, institutions, ethics, and communication without collapsing them into one framework.

This project operationalizes that thesis as a local curriculum system. Hermes functions as the orchestration layer. The repository contains the curriculum source of truth: modules, rubrics, templates, learner state, project artifacts, audits, and governance files.

## Who This Is For

This repository is for learners, builders, and reviewers who want analytical work to become visible, assessable, and reusable.

It is especially useful for:

* **Interdisciplinary learners** who want to connect statistics, economics, machine learning, philosophy, policy, and technical communication without treating them as separate tracks.
* **AI and product builders** who need to evaluate whether a model, agent, metric, or workflow is appropriate for a real user problem.
* **Researchers and analysts** who want stronger habits around identification, assumptions, evidence, uncertainty, and limitations.
* **Portfolio builders** who want case studies, memos, notebooks, and technical READMEs that demonstrate judgment rather than tool familiarity alone.
* **Reviewers or mentors** who need rubrics, audit trails, and revision loops for assessing analytical artifacts.

It is not primarily a prompt collection. It is a local operating system for producing and governing evidence-bearing analytical work.

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

## Core Concepts

* **Module card:** A curriculum source file that defines a domain, its learning objectives, prerequisite links, competencies, and expected artifacts.
* **Artifact:** A produced unit of work, such as a lesson, analysis plan, case study, review, revision, portfolio memo, or technical README.
* **Rubric:** A structured evaluation lens used to assess whether an artifact demonstrates the intended competency.
* **Semantic audit:** A quality review that checks analytical substance, not just file validity. It looks for missing assumptions, unsupported claims, weak limitations, and competency misalignment.
* **Learner state:** A JSON-backed record of competency progress, artifact evidence, and curriculum position.
* **Portfolio translation:** The conversion of internal learning artifacts into externally legible evidence for interviews, applications, public writing, or professional review.
* **Hermes orchestration:** The local agent runtime used to generate, review, repair, audit, and translate artifacts from repository prompts and source files.

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

## Start Here

If you are new to the repository, use this navigation path before generating anything:

1. **Understand the architecture:** Read `modules/_module_index.md` to see the 25-module curriculum map and routing logic.
2. **Pick a module:** Open the relevant file in `modules/` and inspect its objectives, competencies, prerequisites, and artifact expectations.
3. **Check sequencing:** Use `curriculum/pathways/dependency_graph.md` when deciding whether a module depends on earlier work.
4. **Select an evaluation lens:** Review `rubrics/_rubric_index.md` and choose the rubric that matches the artifact type or competency.
5. **Use a template when available:** Start from `templates/` when producing lessons, projects, portfolio items, or reviews.
6. **Run through `ops/aos.ps1`:** Use the local runner for structured Hermes generation and structural audit checks.
7. **Register only clean work:** Update learner-state files only after the artifact has been reviewed, revised, and accepted.

For a first orientation pass, begin with:

```text
modules/_module_index.md
curriculum/pathways/dependency_graph.md
rubrics/_rubric_index.md
ops/aos.ps1
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

   Runner parameters:

   * `-PromptFile` points to the prompt file that instructs Hermes what artifact to produce. Use files under `prompts/` rather than pasting long prompts into the terminal.
   * `-OutFile` sets the destination artifact path. Choose a path under `artifacts/` that matches the artifact type, such as lessons, projects, reviews, or portfolio case studies.
   * `-ExpectedType` tells the structural audit what format to validate. Use `markdown` for `.md` artifacts and `json` for schema-backed outputs.
   * `-Skill` optionally selects the Hermes skill used for the run. The default is `curriculum-orchestrator`, which is appropriate for most curriculum generation and review loops.
   * `-Retries` controls how many additional attempts the runner should make after a failed structural audit. The default is `1`, meaning up to two total attempts.
   * `-Force` allows the runner to overwrite an existing `-OutFile`. Omit it when you want to protect an existing artifact from accidental replacement.

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

Current maturity:

```text
Prototype / early operating system. The repository has a stable thesis, curriculum map, module structure, rubrics, templates, and local runner pattern, but the self-healing loop and learner-state automation are still being stabilized.
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
