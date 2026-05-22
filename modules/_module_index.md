# Analytical Operating System Module Index

This index is the routing map for the curriculum. When Hermes receives a request, it should use this file to identify the relevant module card before generating lessons, projects, rubrics, assessments, or capstone guidance.

## Core Routing Principle

Use the module card before improvising.

If the user names a domain, lesson, project, or competency, first locate the corresponding module in this index, then read the relevant module card from the `modules/` folder.

## Module List

| Module ID | Module File                               | Module Name                                                                       | Track                  | Primary Competency                                   |
| --------- | ----------------------------------------- | --------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------- |
| 01        | `01_economic_reasoning.md`                | Economic Reasoning, Incentives, and Systems Analysis                              | Foundational           | Model Construction and Institutional Judgment        |
| 02        | `02_probability_statistics.md`            | Probability, Statistics, and Quantitative Reasoning                               | Foundational           | Statistical Inference and Uncertainty Quantification |
| 03        | `03_causal_inference.md`                  | Causal Inference, Scientific Reasoning, and Identification                        | Methods & Systems      | Causal Identification and Counterfactual Reasoning   |
| 04        | `04_machine_learning.md`                  | Machine Learning, Statistical Learning, and Intelligent Systems                   | Methods & Systems      | Predictive Modeling and Learning Systems Evaluation  |
| 05        | `05_ai_product_strategy.md`               | AI Product Strategy, Systems Design, and Technological Innovation                 | Integration & Judgment | AI Product and System Strategy                       |
| 06        | `06_philosophy_critical_analysis.md`      | Philosophy of Science, AI, Economics, and Critical Analysis                       | Foundational           | Model Construction and Conceptual Analysis           |
| 07        | `07_data_engineering_infrastructure.md`   | Data Engineering, Infrastructure, MLOps, and Production Systems                   | Methods & Systems      | Epistemic Infrastructure Design                      |
| 08        | `08_quantitative_finance.md`              | Quantitative Finance, Markets, and Algorithmic Trading Systems                    | Methods & Systems      | Financial Systems and Risk Judgment                  |
| 09        | `09_mathematics.md`                       | Mathematics for Economics, Statistics, Machine Learning, and Systems Thinking     | Foundational           | Mathematical and Computational Formalization         |
| 10        | `10_programming.md`                       | Programming, Computational Thinking, and Applied Research Engineering             | Foundational           | Computational Formalization and Reproducibility      |
| 11        | `11_research_methods.md`                  | Research Methods, Evidence Synthesis, and Intellectual Production                 | Integration & Judgment | Research Design and Intellectual Production          |
| 12        | `12_technical_communication_portfolio.md` | Technical Communication, Portfolio Strategy, and Career Positioning               | Integration & Judgment | Communication and Portfolio Synthesis                |
| 13        | `13_responsible_ai_governance.md`         | AI Ethics, Governance, Fairness, and Responsible Systems                          | Methods & Systems      | Responsible Sociotechnical System Design             |
| 14        | `14_decision_theory_optimization.md`      | Decision Theory, Optimization, Operations Research, and Strategic Decision-Making | Methods & Systems      | Decision Judgment Under Uncertainty                  |
| 15        | `15_complex_systems.md`                   | Complex Systems, Networks, Simulation, and Emergent Behavior                      | Methods & Systems      | Systems and Emergence Analysis                       |
| 16        | `16_macroeconomics_political_economy.md`  | Macroeconomics, Political Economy, and Institutional Systems                      | Integration & Judgment | Structural Economic and Political Economy Judgment   |
| 17        | `17_llms_agents_rag.md`                   | Large Language Models, AI Agents, Retrieval Systems, and Human-AI Interaction     | Methods & Systems      | AI Systems Judgment                                  |
| 18        | `18_behavioral_economics.md`              | Behavioral Economics, Cognitive Bias, and Human Decision-Making                   | Integration & Judgment | Behavioral Decision Analysis                         |
| 19        | `19_data_visualization_eda.md`            | Data Visualization, Exploratory Data Analysis, and Analytical Storytelling        | Foundational           | Visual Analytical Judgment                           |
| 20        | `20_experimental_design_metrics.md`       | Experimental Design, Product Analytics, and Metrics Systems                       | Methods & Systems      | Experimental and Measurement Systems Design          |
| 21        | `21_industrial_organization_platforms.md` | Industrial Organization, Platform Strategy, and Market Design                     | Integration & Judgment | Strategic Market and Platform Judgment               |
| 22        | `22_labor_education_human_capital.md`     | Labor Economics, Education, Human Capital, and Skill Formation                    | Integration & Judgment | Labor, Education, and Skill Formation Analysis       |
| 23        | `23_public_policy_governance.md`          | Public Policy, Regulation, Governance, and Institutional Design                   | Integration & Judgment | Institutional Policy Judgment                        |
| 24        | `24_entrepreneurship_venture_strategy.md` | Entrepreneurship, Startups, Venture Strategy, and Business Model Design           | Integration & Judgment | Venture Judgment                                     |
| 25        | `25_capstone_integration.md`              | Capstone Integration, Portfolio Synthesis, and Intellectual Direction             | Integration & Judgment | Synthesis and Intellectual Production                |

## Track Structure

### Foundational

The foundational track establishes epistemic, mathematical, computational, economic, statistical, philosophical, and visual reasoning foundations.

Modules:

- 01 Economic Reasoning
- 02 Probability and Statistics
- 06 Philosophy and Critical Analysis
- 09 Mathematics
- 10 Programming
- 19 Data Visualization and EDA

### Methods & Systems

The methods and systems track develops formal, computational, empirical, infrastructural, predictive, causal, experimental, and responsible system-building capability.

Modules:

- 03 Causal Inference
- 04 Machine Learning
- 07 Data Engineering and Infrastructure
- 08 Quantitative Finance
- 13 Responsible AI and Governance
- 14 Decision Theory and Optimization
- 15 Complex Systems
- 17 LLMs, Agents, and RAG
- 20 Experimental Design and Metrics

### Integration & Judgment

The integration and judgment track applies technical methods to institutions, markets, labor, policy, entrepreneurship, communication, and capstone synthesis.

Modules:

- 05 AI Product Strategy
- 11 Research Methods
- 12 Technical Communication and Portfolio
- 16 Macroeconomics and Political Economy
- 18 Behavioral Economics
- 21 Industrial Organization and Platforms
- 22 Labor, Education, and Human Capital
- 23 Public Policy and Governance
- 24 Entrepreneurship and Venture Strategy
- 25 Capstone Integration

## Routing Rules

If the user asks about causality, effects, interventions, treatment, counterfactuals, confounding, identification, or policy evaluation, route to:

- `03_causal_inference.md`
- optionally `20_experimental_design_metrics.md`
- optionally `23_public_policy_governance.md`

If the user asks about data pipelines, SQL, infrastructure, databases, MLOps, LLMOps, reliability, observability, or production systems, route to:

- `07_data_engineering_infrastructure.md`

If the user asks about prediction, supervised learning, classification, regression models, evaluation, model cards, or deployment readiness, route to:

- `04_machine_learning.md`
- optionally `13_responsible_ai_governance.md`

If the user asks about LLMs, agents, RAG, embeddings, retrieval, tool use, prompt design, memory, or human-AI interaction, route to:

- `17_llms_agents_rag.md`
- optionally `07_data_engineering_infrastructure.md`
- optionally `13_responsible_ai_governance.md`

If the user asks about metrics, A/B testing, experiments, product analytics, funnels, retention, or measurement systems, route to:

- `20_experimental_design_metrics.md`

If the user asks about policy, regulation, governance, public institutions, implementation, market failure, or government failure, route to:

- `23_public_policy_governance.md`

If the user asks about firms, platforms, monopoly, pricing, auctions, market design, network effects, or antitrust, route to:

- `21_industrial_organization_platforms.md`

If the user asks about jobs, wages, education, credentials, skills, AI and work, inequality, or mobility, route to:

- `22_labor_education_human_capital.md`

If the user asks about startups, venture capital, business models, customer discovery, MVPs, product-market fit, or unit economics, route to:

- `24_entrepreneurship_venture_strategy.md`

If the user asks about capstones, portfolios, synthesis, research direction, project design, or intellectual identity, route to:

- `25_capstone_integration.md`
- optionally `11_research_methods.md`
- optionally `12_technical_communication_portfolio.md`

## Default Lesson Generation Rule

When generating a lesson from a module:

1. Read the module card.
2. Use the module's lesson structure.
3. Preserve the governing principles.
4. Begin from the central problem.
5. Define key concepts precisely.
6. Include formal, computational, or architectural material when useful.
7. Include assumptions and failure modes.
8. End with an exercise, artifact, or oral-defense prompt.
9. Output clean Markdown.
10. Use plain ASCII unless explicitly instructed otherwise.

## Default Assessment Rule

When assessing an artifact:

1. Identify the claim.
2. Identify the method.
3. Identify the evidence.
4. Identify assumptions.
5. Identify limitations.
6. Select the appropriate rubric.
7. Score with evidence.
8. Provide revision priorities.
9. Recommend a portfolio translation step.

## Default Capstone Rule

When designing a capstone:

1. Define the question.
2. Define the claim.
3. Define the audience.
4. Select the relevant modules.
5. Choose the method.
6. Define the evidence.
7. Specify the artifact.
8. Identify assumptions.
9. Identify limitations.
10. Specify ethical and institutional implications.
11. Define portfolio outputs.
