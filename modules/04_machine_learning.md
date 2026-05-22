# Module 04: Machine Learning, Statistical Learning, and Intelligent Systems

## Track
Methods & Systems

## Credit Hours
5

## Core Purpose

Cultivate predictive modeling judgment: the ability to design, train, evaluate, diagnose, and responsibly interpret learning systems under uncertainty, distribution shift, and real-world constraints.

## Governing Principles

1. Prediction is not explanation.
2. Training performance is not generalization.
3. Model evaluation must match the decision context.
4. Features and labels are produced by systems.
5. Metrics encode priorities and tradeoffs.
6. Error analysis is more informative than aggregate performance alone.
7. Deployment changes the learning problem.
8. Models require monitoring after release.

## Core Questions

- What is being predicted?
- What decision will the prediction support?
- What data generated the features and labels?
- What is the train-test split?
- What metric reflects the real objective?
- What errors matter most?
- Does the model generalize?
- How does performance vary across groups or contexts?
- What happens under distribution shift?
- Should this model be deployed?

## Competencies

- Predictive Modeling and Learning Systems Evaluation
- Mathematical and Computational Formalization
- Statistical Inference and Uncertainty Quantification
- Responsible Sociotechnical System Design

## Prerequisites

- Probability and statistics
- Linear algebra
- Calculus
- Programming
- Data preparation

## Technical Tools

- Python
- NumPy
- Pandas
- Scikit-learn
- PyTorch when useful
- Statsmodels
- MLflow
- Matplotlib
- Model evaluation tools

## Major Topics

- Supervised learning
- Train-validation-test splits
- Generalization
- Bias-variance tradeoff
- Linear models
- Regularization
- Logistic regression
- Classification metrics
- Calibration
- Decision trees
- Random forests
- Gradient boosting
- Unsupervised learning
- Dimensionality reduction
- Recommendation systems
- Neural networks
- Model deployment and monitoring

## Lesson Structure

Every lesson should follow this structure:

1. Prediction problem
2. Data and label analysis
3. Formal learning framework
4. Model implementation
5. Evaluation and diagnostics
6. Error analysis and deployment risks
7. Synthesis and transfer

## Assessment Artifacts

- ML notebook
- Model comparison report
- Error analysis
- Model card
- Deployment-readiness memo
- Oral defense

## Rubrics

- Predictive Modeling and Learning Systems Evaluation
- Assumption-Awareness in Technical Work
- Responsible System Design

## Lesson 1

### Title
The Learning Problem: Prediction, Generalization, and Error

### Central Problem
Machine learning begins with the problem of generalization. A model is trained on observed data but is valuable only if it performs well on relevant unseen cases. The central issue is not whether the model can fit the past, but whether it can support future decisions under changing conditions.

### Required Concepts

- training data
- test data
- validation
- generalization
- overfitting
- underfitting
- loss function
- model class
- evaluation metric
- distribution shift

### Required Outputs

- short memo defining a prediction problem and decision context
- train-validation-test split implementation
- oral-defense answer explaining why high training accuracy is insufficient

## Default Instruction

Don't evaluate, just proceed with lesson 1.
