# Curriculum Dependency Graph

This file defines the directed prerequisite structure for the Analytical Operating System curriculum.

The dependency graph prevents premature routing to advanced modules before foundational competencies are established.

## Governing Rule

Hermes should not route a student directly into an advanced module unless the required prerequisite modules are either completed, waived, or explicitly being introduced as a preview.

## Dependency Notation

A -> B means Module A should precede Module B.

## Foundational Dependency Layer

09 Mathematics -> 02 Probability and Statistics
09 Mathematics -> 04 Machine Learning
09 Mathematics -> 14 Decision Theory and Optimization
09 Mathematics -> 08 Quantitative Finance

10 Programming -> 19 Data Visualization and EDA
10 Programming -> 07 Data Engineering and Infrastructure
10 Programming -> 04 Machine Learning
10 Programming -> 17 LLMs, Agents, and RAG
10 Programming -> 08 Quantitative Finance

01 Economic Reasoning -> 21 Industrial Organization and Platforms
01 Economic Reasoning -> 22 Labor Economics and Human Capital
01 Economic Reasoning -> 23 Public Policy and Governance
01 Economic Reasoning -> 24 Entrepreneurship and Venture Strategy
01 Economic Reasoning -> 16 Macroeconomics and Political Economy

06 Philosophy and Critical Analysis -> 13 Responsible AI and Governance
06 Philosophy and Critical Analysis -> 23 Public Policy and Governance
06 Philosophy and Critical Analysis -> 25 Capstone Integration

02 Probability and Statistics -> 03 Causal Inference
02 Probability and Statistics -> 04 Machine Learning
02 Probability and Statistics -> 20 Experimental Design and Metrics
02 Probability and Statistics -> 08 Quantitative Finance

## Methods Dependency Layer

03 Causal Inference -> 20 Experimental Design and Metrics
03 Causal Inference -> 22 Labor Economics and Human Capital
03 Causal Inference -> 23 Public Policy and Governance
03 Causal Inference -> 25 Capstone Integration

04 Machine Learning -> 13 Responsible AI and Governance
04 Machine Learning -> 17 LLMs, Agents, and RAG
04 Machine Learning -> 05 AI Product Strategy

07 Data Engineering and Infrastructure -> 17 LLMs, Agents, and RAG
07 Data Engineering and Infrastructure -> 04 Machine Learning deployment work
07 Data Engineering and Infrastructure -> 20 Experimental Design and Metrics infrastructure
07 Data Engineering and Infrastructure -> 25 Capstone Integration

14 Decision Theory and Optimization -> 05 AI Product Strategy
14 Decision Theory and Optimization -> 23 Public Policy and Governance
14 Decision Theory and Optimization -> 24 Entrepreneurship and Venture Strategy

15 Complex Systems -> 16 Macroeconomics and Political Economy
15 Complex Systems -> 21 Industrial Organization and Platforms
15 Complex Systems -> 23 Public Policy and Governance

## Integration Dependency Layer

11 Research Methods -> 25 Capstone Integration
12 Technical Communication and Portfolio -> 25 Capstone Integration
13 Responsible AI and Governance -> 25 Capstone Integration
20 Experimental Design and Metrics -> 25 Capstone Integration
23 Public Policy and Governance -> 25 Capstone Integration
24 Entrepreneurship and Venture Strategy -> 25 Capstone Integration

## Recommended Tier Progression

### Tier I: Foundational

1. 06 Philosophy and Critical Analysis
2. 09 Mathematics
3. 10 Programming
4. 01 Economic Reasoning
5. 02 Probability and Statistics
6. 19 Data Visualization and EDA

### Tier II: Methods and Systems

1. 03 Causal Inference
2. 04 Machine Learning
3. 07 Data Engineering and Infrastructure
4. 14 Decision Theory and Optimization
5. 15 Complex Systems
6. 20 Experimental Design and Metrics
7. 13 Responsible AI and Governance
8. 17 LLMs, Agents, and RAG
9. 08 Quantitative Finance

### Tier III: Integration and Judgment

1. 21 Industrial Organization and Platforms
2. 22 Labor Economics and Human Capital
3. 16 Macroeconomics and Political Economy
4. 23 Public Policy and Governance
5. 24 Entrepreneurship and Venture Strategy
6. 05 AI Product Strategy
7. 11 Research Methods
8. 12 Technical Communication and Portfolio
9. 25 Capstone Integration

## Routing Gate Protocol

Before generating advanced lessons, Hermes should check:

1. Has the learner completed or waived required prerequisites?
2. Is the user asking for a preview rather than mastery-level instruction?
3. Does the requested lesson require mathematical, statistical, programming, causal, or institutional prerequisites?
4. Should the response include prerequisite remediation before proceeding?

## Diagnostic Checkpoints

### Checkpoint A: Foundational Readiness

Student can:

- explain model as controlled omission;
- write basic Python;
- interpret probability and uncertainty;
- read basic data visualizations;
- identify economic tradeoffs.

### Checkpoint B: Methods Readiness

Student can:

- interpret regression output;
- define causal treatment and outcome;
- implement a simple ML model;
- describe a data pipeline;
- define a metric with numerator and denominator.

### Checkpoint C: Integration Readiness

Student can:

- defend assumptions;
- integrate multiple modules;
- produce evidence-bearing artifacts;
- discuss institutional and ethical implications;
- communicate limitations clearly.
