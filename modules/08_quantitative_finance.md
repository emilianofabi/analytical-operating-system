# Module 08: Quantitative Finance, Markets, and Algorithmic Trading Systems

## Track
Methods & Systems

## Credit Hours
5

## Core Purpose

Cultivate financial systems judgment: the ability to analyze markets, risk, time series, portfolios, trading strategies, execution, and financial infrastructure without mistaking backtested performance for real-world robustness.

## Governing Principles

1. Returns must be analyzed with risk.
2. A backtest is not evidence unless its assumptions are disciplined.
3. Markets are adaptive systems.
4. Liquidity and execution matter.
5. Tail risk matters more than average performance suggests.
6. Transaction costs can destroy theoretical alpha.
7. Financial models are fragile under regime change.
8. Strategy evaluation requires skepticism.

## Core Questions

- What return is being measured?
- What risk is being taken?
- What benchmark is appropriate?
- What assumptions enter the backtest?
- What costs, slippage, and liquidity constraints exist?
- Is the strategy robust across periods and regimes?
- What tail risks exist?
- What happens when the strategy scales?
- What would make the result spurious?

## Competencies

- Statistical Inference and Uncertainty Quantification
- Mathematical and Computational Formalization
- Predictive Modeling and Learning Systems Evaluation
- Institutional, Market, and Policy Judgment Under Uncertainty

## Prerequisites

- Probability and statistics
- Linear algebra
- Calculus
- Programming
- Basic economics

## Technical Tools

- Python
- Pandas
- NumPy
- Statsmodels
- Scikit-learn
- Backtesting frameworks
- SQL
- Market data APIs
- Visualization tools

## Major Topics

- Market microstructure
- Order books
- Liquidity
- Bid-ask spread
- Market impact
- Efficient market hypothesis
- Time series
- Stationarity
- Autocorrelation
- ARIMA
- Volatility models
- Portfolio theory
- Factor models
- VaR
- Drawdowns
- Backtesting
- Execution
- Risk controls
- Paper trading

## Lesson Structure

Every lesson should follow this structure:

1. Financial problem
2. Market structure and data context
3. Formal model
4. Computational analysis
5. Risk and robustness
6. Failure modes
7. Strategy or decision implication

## Assessment Artifacts

- Market data analysis notebook
- Backtest report
- Risk analysis
- Portfolio construction project
- Strategy failure memo
- Trading system design

## Rubrics

- Assumption-Awareness in Technical Work
- Statistical Inference and Uncertainty Quantification
- Responsible System Design

## Lesson 1

### Title
Returns Are Not Performance

### Central Problem
A strategy's return is not sufficient evidence of quality. Performance must be evaluated relative to risk, benchmark, costs, liquidity, drawdowns, robustness, and the assumptions embedded in the data and backtest.

### Required Concepts

- return
- risk
- volatility
- benchmark
- drawdown
- Sharpe ratio
- transaction cost
- liquidity
- backtest
- overfitting

### Required Outputs

- short memo distinguishing return from risk-adjusted performance
- simple return and drawdown calculation
- oral-defense answer explaining why a profitable backtest may be misleading

## Default Instruction

Don't evaluate, just proceed with lesson 1.
