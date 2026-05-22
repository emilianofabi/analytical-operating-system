# Rubric: Technical Artifact Quality

## Purpose

This rubric evaluates whether a technical artifact is correct, reproducible, maintainable, documented, testable, and appropriate to the analytical or production problem it addresses.

## Scale

1. Emerging
2. Developing
3. Proficient
4. Advanced

## Criteria

| Criterion | 1 Emerging | 2 Developing | 3 Proficient | 4 Advanced |
|---|---|---|---|---|
| Problem and Requirements | Technical task is unclear. | Task is stated but requirements are incomplete. | Problem, users, inputs, outputs, and success criteria are clear. | Requirements include constraints, risks, edge cases, and evaluation criteria. |
| Correctness | Artifact does not reliably work. | Artifact works on limited examples. | Artifact produces correct results for expected cases. | Artifact includes validation against edge cases, invariants, and independent checks. |
| Reproducibility | Cannot be reproduced without hidden state. | Reproduction is possible with manual effort. | Environment, data, and execution steps are documented. | Reproducibility is automated or nearly automated through scripts, containers, tests, or workflows. |
| Code or System Organization | Structure is confusing or ad hoc. | Some organization exists. | Files, functions, modules, and interfaces are organized coherently. | Architecture is modular, extensible, and aligned with system responsibilities. |
| Testing and Validation | Tests are absent. | Minimal tests or manual checks exist. | Relevant unit, integration, data, or validation checks are included. | Tests target failure modes, assumptions, edge cases, and regression risks. |
| Documentation | Documentation is absent or superficial. | Basic instructions are included. | README, comments, assumptions, and usage instructions are clear. | Documentation explains design choices, limitations, failure modes, and maintenance needs. |
| Observability and Failure Handling | Failures are invisible or unhandled. | Some errors are caught. | Logs, checks, errors, or alerts make failure visible. | Observability is designed around correctness, freshness, latency, cost, drift, or downstream effects. |
| Technical Judgment | Uses tools without justification. | Tool choices are partly justified. | Tools fit the problem and constraints. | Tradeoffs among simplicity, scalability, reliability, cost, and governance are explicitly defended. |

## Evidence Requirements

Assessors should look for:

- repository structure;
- README;
- code or notebooks;
- environment file;
- test suite;
- validation checks;
- architecture diagram;
- logs or monitoring plan;
- technical report;
- oral defense.

## Calibration Protocol

Reviewers should first run or inspect the artifact for reproducibility, then score documentation, correctness, and technical judgment. A project that cannot be reproduced cannot receive Advanced overall, even if conceptually strong.
