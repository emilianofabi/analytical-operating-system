# Alpha Is Not Observed Return, and Options Are Not Just Directional Bets

## 1. Metadata

- Module: 08 Quantitative Finance, Markets, and Algorithmic Trading Systems
- Lesson Number: 01
- Lesson Title: Alpha Is Not Observed Return, and Options Are Not Just Directional Bets
- Track: Methods and Systems
- Primary Competency: Financial Systems and Risk Judgment
- Secondary Competencies: Statistical Inference and Uncertainty Quantification; Causal Identification and Counterfactual Reasoning; Predictive Modeling and Learning Systems Evaluation; Epistemic Infrastructure Design; Synthesis, Communication, and Intellectual Production
- Prerequisites: Introductory finance; basic options terminology; probability and statistics; regression; calculus; linear algebra; basic data science validation concepts
- Estimated Time: 2.5 to 3.5 hours
- Safety Boundary: This lesson teaches analysis and research discipline only. It does not provide buy or sell recommendations, suggest live trades, or claim that any strategy is profitable.

## 2. Serious Problem or Conceptual Tension

A beginner sees a profitable trade and says, "I found edge." A serious quant asks a harder question: what produced the observed return?

Observed trading performance is not automatically alpha. It may reflect market beta, compensated risk exposure, noise, selection bias, overfitting, transaction costs, slippage, market impact, regime luck, volatility risk premia, liquidity effects, or market adaptation. Profit is an outcome. Alpha is a claim about abnormal performance after accounting for relevant risks, benchmarks, costs, and implementation constraints.

Options intensify this problem because options are not simply leveraged directional bets. An option position can express views about direction, volatility, convexity, time decay, skew, tail risk, liquidity, path dependency, and entire probability distributions. A call option can make money because the stock rose, because implied volatility expanded, because the position had convexity at the right moment, or because the trader happened to enter before a favorable event. A profitable option trade does not, by itself, prove forecasting skill.

The central tension is this:

- Beginner interpretation: "The trade made money, so the strategy works."
- Quant interpretation: "Was this true alpha, compensated risk, volatility exposure, lucky timing, cheap leverage, hidden tail risk, or a backtest illusion?"

The purpose of this lesson is to build the first layer of quantitative finance judgment: separate return from alpha, payoff from probability, model price from executable price, and backtest success from live trading evidence.

## 3. Core Concepts

| Concept | Definition | Why It Matters |
|---|---|---|
| Observed return | The realized gain or loss over a period, usually expressed as a percentage of capital. | It is the starting measurement, not the conclusion. |
| Alpha | Return unexplained by a specified benchmark or risk model, after accounting for costs and assumptions. | Alpha is a residual claim, so it depends on the model, benchmark, data, and implementation. |
| CAPM alpha | The intercept in a regression of excess strategy return on excess market return. | It asks whether returns remain after controlling for market beta. |
| Multifactor alpha | The intercept after controlling for multiple systematic risk factors. | It reduces the chance of mistaking factor exposure for skill. |
| Beta exposure | Sensitivity to a market or factor return. | A strategy may make money because it is exposed to rewarded risk, not because it has unique edge. |
| True edge | A persistent, implementable advantage not fully explained by known risks, costs, or luck. | Edge requires evidence stronger than one profitable trade or one impressive backtest. |
| Risk premium | Compensation for bearing systematic risk. | Earning a risk premium can be rational, but it is not the same as mispricing alpha. |
| Mispricing | A price that differs from value under a justified model and can potentially be exploited. | Mispricing claims require model discipline and execution realism. |
| Sharpe ratio | Mean excess return divided by excess return volatility. | It measures risk-adjusted return, but can hide tail risk and non-normal payoffs. |
| t-statistic for mean return | Mean return divided by its standard error. | It asks whether the estimated mean is large relative to sampling noise. |
| Gross return | Return before trading costs, slippage, and market impact. | Many strategies look attractive before implementation frictions. |
| Net return | Return after transaction costs, slippage, and market impact. | Net return is closer to what the strategy could actually deliver. |
| Transaction costs | Explicit commissions, fees, borrow costs, exchange fees, and taxes where relevant. | Small costs can destroy high-turnover or options strategies. |
| Slippage | Difference between expected trade price and actual execution price. | Backtests often assume prices that were not realistically executable. |
| Market impact | Price movement caused by one's own order. | A strategy that works at tiny size may fail when scaled. |
| Options as payoff geometry | Options create nonlinear payoff shapes rather than simple linear stock exposure. | The shape determines how direction, volatility, time, and tails affect outcomes. |
| Call option | A contract giving the holder the right, not obligation, to buy the underlying at strike K before or at expiration, depending on style. | Calls can express bullish direction, convex upside, or volatility exposure. |
| Put option | A contract giving the holder the right, not obligation, to sell the underlying at strike K before or at expiration, depending on style. | Puts can express bearish direction, protection, convex downside exposure, or volatility exposure. |
| Payoff diagram | A graph or conceptual map of profit or payoff as the underlying price changes. | It shows what the position is designed to gain or lose from before discussing probabilities. |
| Implied volatility | The volatility input that makes an option pricing model match the market option price. | It is a market-implied price of uncertainty, not a guaranteed forecast. |
| Realized volatility | The actual volatility observed over a period. | Comparing implied to realized volatility is central to volatility trading. |
| Volatility risk premium | The tendency, in many markets and periods, for implied volatility to exceed later realized volatility because investors pay for protection and uncertainty transfer. | It can explain option-selling returns without requiring pure alpha. |
| Greeks | Sensitivities of option value to inputs such as price, time, and volatility. | Greeks are the risk language of options. |
| Delta | Sensitivity of option value to the underlying price. | It approximates directional exposure. |
| Gamma | Sensitivity of delta to the underlying price. | It measures convexity and how quickly directional exposure changes. |
| Theta | Sensitivity of option value to time passing. | It describes time decay, although sign conventions vary by platform. |
| Vega | Sensitivity of option value to implied volatility. | It describes volatility exposure. |
| Directional bet | A position mainly expressing a view on the underlying price direction. | Many option trades that appear directional also contain volatility and time exposures. |
| Volatility bet | A position mainly expressing a view on implied versus realized volatility or volatility movement. | Options can win or lose even when the directional view is partly correct. |
| High win rate | A high percentage of winning trades. | High win rate can coexist with negative expected value if losses are large. |
| Positive expected value | Average payoff weighted by probabilities is positive after costs. | Expected value matters more than win rate alone. |
| Model price | A theoretical price from assumptions and inputs. | A model price is not necessarily tradable. |
| Executable price | The price at which a real order can likely be filled. | Execution determines whether theoretical edge survives contact with markets. |
| Backtest | A simulation of strategy rules on historical data. | A backtest is evidence only if assumptions, costs, and validation are disciplined. |
| Live trading | Strategy execution under real-time uncertainty, latency, liquidity, emotion, and changing markets. | Live results test implementation and adaptation, but still require risk controls. |

## 4. Formal Framework

### 4.1 Purpose before technique

The first question is not "Which option strategy should I use?" The first question is "What claim am I trying to evaluate?"

A disciplined trading research workflow begins with this sequence:

1. Thesis before strategy: define the market claim before choosing calls, puts, spreads, or hedges.
2. Risk before return: identify what can go wrong before estimating upside.
3. Payoff before probability: understand the position's payoff geometry before assigning beliefs.
4. Volatility before premium: ask whether option price reflects expensive or cheap implied volatility.
5. Execution before backtest: define realistic fill prices, liquidity, spread, and sizing assumptions.
6. Review before scaling: paper trade, journal, analyze errors, and only then consider whether risk should change.

Alpha Claim Ladder:

1. Raw observed return: what happened before interpretation.
2. Excess return: what remains after subtracting the risk-free rate.
3. Benchmark-adjusted return: what remains after comparison with an appropriate benchmark.
4. Factor-adjusted return: what remains after controlling for relevant systematic exposures.
5. Net-of-cost return: what remains after transaction costs, slippage, and market impact.
6. Out-of-sample or forward-tested persistence: whether the result survives outside the original discovery sample.
7. Capacity-aware implementation evidence: whether the result can survive realistic size, liquidity, execution, and governance constraints.

### 4.2 CAPM alpha

Formula:

```text
R_i - r_f = alpha_i + beta_i(R_m - r_f) + epsilon_i
```

Symbols:

- R_i: return on asset or strategy i.
- r_f: risk-free rate over the same period.
- R_i - r_f: excess return of the asset or strategy.
- R_m: market return.
- R_m - r_f: excess market return.
- alpha_i: intercept, interpreted as return not explained by market exposure in this model.
- beta_i: sensitivity of strategy excess return to market excess return.
- epsilon_i: residual return not explained by the CAPM regression.

Plain-English meaning:

This equation asks: after subtracting the risk-free rate, how much of the strategy's return is explained by moving with the market, and how much remains as an intercept? If a strategy made money mostly because the market went up and the strategy had positive beta, that is not strong evidence of alpha.

School connection:

- Economics: connects to equilibrium and compensation for bearing market risk.
- Statistics and econometrics: this is a regression with an intercept, slope, residual, and standard errors.
- Data science: the market excess return is a feature used to explain the strategy return label.

Trading misuse:

CAPM alpha can be misused by treating a positive intercept as proof of edge even when the sample is small, costs are excluded, residuals are non-normal, the benchmark is incomplete, or the strategy is secretly exposed to other factors such as size, value, momentum, volatility, or liquidity.

### 4.3 Multifactor alpha

Formula:

```text
R_i - r_f = alpha_i + beta_1 F_1 + beta_2 F_2 + ... + beta_k F_k + epsilon_i
```

Symbols:

- R_i: return on asset or strategy i.
- r_f: risk-free rate.
- R_i - r_f: excess return.
- alpha_i: intercept after controlling for selected factors.
- F_1 through F_k: factor returns, such as market, size, value, momentum, quality, liquidity, volatility, carry, or other justified risk factors.
- beta_1 through beta_k: sensitivities to those factors.
- epsilon_i: residual return unexplained by the factor model.
- k: number of factors.

Plain-English meaning:

This model asks whether a strategy still has unexplained return after controlling for several systematic sources of return. It is a stronger test than CAPM if the factors are relevant and measured correctly.

School connection:

- Econometrics: omitted variable bias appears when relevant factors are excluded.
- Statistics: factor coefficients are estimates with uncertainty.
- Economics: factors may represent compensated risks or persistent behavioral and institutional patterns.

Trading misuse:

The model can be misused by adding factors mechanically until alpha disappears, selecting factors after seeing results, ignoring multicollinearity, treating unstable factor exposures as fixed, or confusing residual return with causal proof of skill.

### 4.4 Sharpe ratio

Formula:

```text
Sharpe = E[R_p - r_f] / sigma(R_p - r_f)
```

Symbols:

- Sharpe: risk-adjusted return measure.
- E[R_p - r_f]: expected excess return of portfolio p.
- R_p: portfolio return.
- r_f: risk-free rate.
- sigma(R_p - r_f): standard deviation of excess portfolio returns.

Plain-English meaning:

The Sharpe ratio asks how much excess return the portfolio earns per unit of volatility. A higher Sharpe suggests better average compensation for observed volatility.

School connection:

- Statistics: uses expected value and standard deviation.
- Economics: evaluates compensation for bearing risk.
- Decision theory: helps compare alternatives under uncertainty, but it is not a complete utility function.

Trading misuse:

Sharpe can be misused when returns have fat tails, skew, serial correlation, rare crashes, stale prices, hidden leverage, or option payoffs with many small wins and occasional large losses. A high Sharpe backtest can also result from overfitting.

### 4.5 t-statistic for mean return

Formula:

```text
t = mean(R) / (sigma(R) / sqrt(T))
```

Symbols:

- t: t-statistic for whether the mean return differs from zero under simplifying assumptions.
- mean(R): sample average return.
- sigma(R): sample standard deviation of returns.
- T: number of observations.
- sigma(R) / sqrt(T): standard error of the mean.

Plain-English meaning:

The t-statistic asks whether the average return is large relative to the noise in the data. A small average return over a noisy sample may not be distinguishable from chance.

School connection:

- Statistics: hypothesis testing, standard errors, sampling variation.
- Econometrics: inference depends on assumptions about independence, stationarity, and error behavior.
- Experimental design: statistical significance is not the same as decision significance.

Trading misuse:

The t-statistic can be misused when observations are autocorrelated, overlapping, selected after many trials, non-stationary, or generated by a strategy that was repeatedly tuned until the result looked significant.

### 4.6 Portfolio return

Formula:

```text
R_p,t+1 = w_t' r_t+1
```

Symbols:

- R_p,t+1: portfolio return from time t to t+1.
- w_t: vector of portfolio weights chosen at time t.
- w_t': transpose of the weight vector.
- r_t+1: vector of asset returns from time t to t+1.

Plain-English meaning:

Portfolio return is the weighted sum of asset returns. The apostrophe indicates a vector dot product.

School connection:

- Linear algebra: dot products and vectors.
- Data science: weights are decision variables applied to future labels.
- Decision theory: weights express allocation choices under uncertainty.

Trading misuse:

This formula can be misused by using future information in w_t, ignoring rebalancing costs, assuming fractional positions are always feasible, or treating historical weights as if they could have been known in real time.

### 4.7 Portfolio variance

Formula:

```text
Var(R_p) = w' Sigma w
```

Symbols:

- Var(R_p): variance of portfolio return.
- w: vector of portfolio weights.
- Sigma: covariance matrix of asset returns.
- w': transpose of the weight vector.

Plain-English meaning:

Portfolio risk depends not only on each asset's volatility but also on how assets move together. The covariance matrix is the model of joint movement.

School connection:

- Statistics: variance and covariance.
- Linear algebra: covariance matrices and quadratic forms.
- Economics: diversification depends on correlations and common shocks.

Trading misuse:

This formula can be misused when covariance estimates are unstable, correlations change in crises, option payoffs are nonlinear, or variance is treated as the only relevant risk despite skew, drawdown, liquidity, and tail exposure.

### 4.8 Net return

Formula:

```text
R_net = R_gross - transaction_costs - slippage - market_impact
```

Symbols:

- R_net: return after implementation frictions.
- R_gross: return before implementation frictions.
- transaction_costs: explicit fees, commissions, borrow costs, exchange fees, and related costs.
- slippage: loss from expected price versus actual fill price.
- market_impact: adverse price movement caused by the trade itself.

Plain-English meaning:

A strategy is not evaluated by theoretical profit alone. It must survive the cost of actually trading.

Small numerical example:

```text
R_gross = 5.0 percent
transaction_costs = 0.2 percent
slippage = 0.5 percent
market_impact = 0.3 percent
R_net = 5.0 - 0.2 - 0.5 - 0.3 = 4.0 percent
```

The apparent edge can shrink or disappear after costs. A strategy that looks attractive before implementation frictions may be weak or negative once executable prices, spreads, and size are included.

School connection:

- Economics: frictions, incentives, and market microstructure.
- Data engineering: execution data must be captured accurately.
- Metrics: gross return is a proxy that may fail to represent realized value.

Trading misuse:

Net return is often misused by assuming unrealistically low spreads, ignoring partial fills, using closing prices as executable prices, excluding assignment or exercise frictions, or failing to update costs when position size changes.

### 4.9 Put-call parity

Formula:

```text
C - P = S - K e^(-rT)
```

Symbols:

- C: price of a European call option.
- P: price of a European put option.
- S: current underlying price.
- K: strike price.
- e: base of natural logarithms.
- r: continuously compounded risk-free rate.
- T: time to expiration in years.
- K e^(-rT): present value of the strike price.

Plain-English meaning:

A European call minus a European put with the same strike and expiration has the same payoff as holding the underlying and borrowing the present value of the strike. If this relationship is badly violated, arbitrage-like pressure may appear, subject to costs and constraints.

Formula assumption note:

This simplified form assumes European options, the same strike, the same expiration, a simplified no-dividend case, frictionless funding, and no binding short-sale or transaction constraints. In real markets, dividends, early exercise, borrow constraints, taxes, settlement rules, and bid-ask spreads can change the practical interpretation.

School connection:

- Economics: arbitrage and equilibrium pricing.
- Finance: replication and no-arbitrage reasoning.
- Algebra: rearranging equivalent payoff structures.

Trading misuse:

Put-call parity can be misused by ignoring American exercise, dividends, borrow constraints, bid-ask spreads, taxes, funding costs, hard-to-borrow stocks, settlement rules, or the difference between quoted midpoint and executable price.

### 4.10 Black-Scholes call price

Formula:

```text
C = S N(d1) - K e^(-rT) N(d2)
```

Symbols:

- C: theoretical European call price.
- S: current underlying price.
- K: strike price.
- r: continuously compounded risk-free rate.
- T: time to expiration in years.
- N(d1): standard normal cumulative distribution function evaluated at d1.
- N(d2): standard normal cumulative distribution function evaluated at d2.
- d1 and d2: functions of S, K, r, T, and volatility sigma in the Black-Scholes model.
- sigma: volatility input used inside d1 and d2, even though it is not shown directly in the compact formula above.

Plain-English meaning:

Black-Scholes gives a theoretical price for a European call under strong assumptions about volatility, trading, funding, and price dynamics. It decomposes value into a stock-like component and a discounted strike component weighted by model probabilities.

Formula assumption note:

The standard Black-Scholes call formula assumes a European option, lognormal price dynamics, constant volatility, a constant risk-free rate, continuous trading, frictionless markets, and no arbitrage. These assumptions make the model useful as a controlled omission, not a guarantee that the model price is executable.

School connection:

- Calculus: derivatives and sensitivity analysis.
- Statistics: normal distribution and volatility assumptions.
- Economics: no-arbitrage replication.
- Models as controlled omissions: the model is useful partly because it deliberately simplifies reality.

Trading misuse:

Black-Scholes can be misused by treating the model price as truth, assuming constant volatility, ignoring volatility skew, using stale inputs, ignoring dividends or early exercise, and forgetting that real execution occurs at bid or ask rather than at a clean theoretical value.

### 4.11 Delta

Formula:

```text
Delta = partial V / partial S
```

Symbols:

- Delta: sensitivity of option or portfolio value to the underlying price.
- V: value of the option or portfolio.
- S: underlying price.
- partial V / partial S: partial derivative of value with respect to underlying price.

Plain-English meaning:

Delta estimates how much the option value changes for a small change in the underlying price, holding other inputs constant. It is the first language of directional exposure.

School connection:

- Calculus: first derivative.
- Linear approximation: local change around the current point.
- Finance: hedge ratio and directional risk.

Trading misuse:

Delta can be misused by treating it as fixed. Delta changes as price, volatility, and time change. For options, directional exposure is local, not permanent.

### 4.12 Gamma

Formula:

```text
Gamma = partial^2 V / partial S^2
```

Symbols:

- Gamma: sensitivity of delta to the underlying price.
- V: value of the option or portfolio.
- S: underlying price.
- partial^2 V / partial S^2: second partial derivative of value with respect to underlying price.

Plain-English meaning:

Gamma measures curvature. It tells you how quickly the position's directional exposure changes as the underlying moves.

School connection:

- Calculus: second derivative and curvature.
- Risk analysis: nonlinear exposure and convexity.
- Decision theory: small changes can alter future choices and hedges.

Trading misuse:

Gamma can be misused by celebrating convexity without accounting for its cost. Long gamma often comes with theta decay, while short gamma can hide crash risk behind frequent small gains.

### 4.13 Theta

Formula:

```text
Theta = partial V / partial t
```

Symbols:

- Theta: sensitivity of option value to time.
- V: value of the option or portfolio.
- t: time variable.
- partial V / partial t: partial derivative of value with respect to time.

Plain-English meaning:

Theta describes how option value changes as time passes, holding other inputs constant. It is often discussed as time decay.

School connection:

- Calculus: partial derivative with respect to time.
- Economics: time has value because uncertainty, optionality, and discounting have value.
- Metrics: a positive daily win rate can hide exposure to rare losses from selling time value.

Trading misuse:

Theta can be misused by treating time decay as free income. Selling options for theta can expose the trader to volatility spikes, gap moves, and short gamma losses.

### 4.14 Vega

Formula:

```text
Vega = partial V / partial sigma
```

Symbols:

- Vega: sensitivity of option value to volatility.
- V: value of the option or portfolio.
- sigma: volatility input, usually implied volatility in pricing contexts.
- partial V / partial sigma: partial derivative of value with respect to volatility.

Plain-English meaning:

Vega estimates how much the option value changes when implied volatility changes. It is the core language of volatility exposure.

School connection:

- Calculus: partial derivative.
- Statistics: volatility is a measure of dispersion.
- Econometrics: volatility is estimated from data and may be time-varying.

Trading misuse:

Vega can be misused by ignoring that implied volatility can fall even when the stock moves in the predicted direction. A long call can lose money if the stock rises slightly but implied volatility collapses and time passes.

### 4.15 Payoff geometry before strategy

A stock position has approximately linear exposure: if the stock rises by one dollar, a one-share long position gains about one dollar. Options are nonlinear. Their payoff diagrams can be understood conceptually before drawing exact graphs:

- Long call: limited loss to premium paid, upside participation above strike plus premium, positive delta, positive gamma, often positive vega, usually negative theta.
- Long put: limited loss to premium paid, downside participation below strike minus premium, negative delta, positive gamma, often positive vega, usually negative theta.
- Short option: premium received upfront, but the risk may be large or asymmetric depending on structure.

Compact exposure decomposition:

| Position | Direction | Volatility | Convexity | Time | Tail or Event Exposure |
|---|---|---|---|---|---|
| Long call | Positive delta | Usually positive vega | Positive gamma | Usually negative theta | Upside tail or event exposure |
| Long put | Negative delta | Usually positive vega | Positive gamma | Usually negative theta | Downside tail or event exposure |

Later lessons will cover long calls and puts, covered calls, cash-secured puts, vertical spreads, straddles, strangles, iron condors, butterflies, calendars, collars, volatility trades, earnings trades, and hedging strategies. This lesson does not teach those strategies in full. It establishes the analytical foundation needed before strategy selection.

### 4.16 Options analysis best practices

Before choosing an options structure, use this checklist:

1. State the thesis: direction, volatility, time, event, valuation, or hedge?
2. Separate exposures: direction, volatility, time decay, event risk, skew, liquidity, and tail risk.
3. Compare implied volatility to realized volatility, while remembering both are estimates or market outputs.
4. Check liquidity: volume, open interest, bid-ask spread, and likely fill quality.
5. Define max loss before entry.
6. Use scenario analysis across price, volatility, and time.
7. Understand Greek exposure before and after plausible price moves.
8. Avoid structures where costs, spreads, and slippage dominate the claimed edge.
9. Paper trade before live deployment.
10. Journal thesis, entry logic, exit logic, sizing, invalidation conditions, and post-trade review.

## 5. Assumptions

| Assumption | Why It Matters | What Happens If It Fails |
|---|---|---|
| The benchmark is appropriate. | Alpha is measured relative to a model or benchmark. | Market beta, sector exposure, or factor exposure may be mislabeled as alpha. |
| Factor exposures are measured correctly. | Multifactor alpha depends on factor definitions and estimation windows. | Omitted or unstable factors can create false residual performance. |
| Returns are comparable across time. | Statistical inference assumes the sample is relevant to the process being studied. | Regime change can make historical estimates misleading. |
| Observations are not selected after seeing outcomes. | Selection bias inflates apparent performance. | The strategy may be a survivor from many failed trials. |
| Costs are realistic. | Gross returns do not represent tradable results. | Net returns may disappear or turn negative. |
| Prices are executable. | Model or midpoint prices may not be fillable. | Backtested trades may rely on impossible execution. |
| Liquidity is sufficient. | Options can have wide spreads and limited depth. | Scaling can create slippage and market impact. |
| The data-generating process is understood. | Market data reflects exchanges, vendors, timestamps, corporate actions, and cleaning choices. | Bad data can create fake signals or hide risk. |
| Option model inputs are appropriate. | Greeks and theoretical prices depend on inputs. | Bad volatility, rate, dividend, or time inputs create misleading risk estimates. |
| Risk limits are binding. | Risk management is governance, not decoration. | A strategy can survive analysis but fail through sizing, drawdown, or discipline errors. |
| Paper trading is not treated as proof. | Paper trading helps test process, but not full execution pressure. | The student may overstate readiness for live deployment. |

Prioritized assumption fragility list:

1. Executable prices and liquidity.
2. Benchmark and factor specification.
3. No leakage or selection bias.
4. Stable volatility regime.
5. Costs and market impact.
6. Risk limits actually binding under stress.

Data infrastructure prompt:

What does one row represent in the option dataset: an end-of-day contract quote, a quote update, a trade, a midpoint mark, or an executable fill?

## 6. Failure Modes and Misinterpretations

1. Confusing observed return with alpha.
   - A positive return may be beta, leverage, volatility exposure, or luck.

2. Confusing risk premium with mispricing.
   - A strategy may earn compensation for bearing unpleasant risk. That can be rational, but it is not automatically abnormal alpha.

3. Ignoring costs.
   - High-turnover stock strategies and options strategies can look excellent before spreads, fees, slippage, and market impact.

4. Treating a high win rate as positive expected value.
   - A strategy can win 90 percent of the time and still lose money if the 10 percent losses are large.

5. Treating backtests as live evidence.
   - Backtests can contain look-ahead bias, survivorship bias, data snooping, leakage, unrealistic fills, and overfitting.

6. Treating model price as executable price.
   - Black-Scholes value, a broker midpoint, or a spreadsheet estimate is not necessarily a tradable fill.

7. Seeing options as only directional leverage.
   - A long call is not just "stock but bigger." It has delta, gamma, theta, vega, liquidity, and expiration risk.

8. Ignoring volatility exposure.
   - An option trade can lose despite a correct directional view if implied volatility falls or time decay dominates.

9. Ignoring hidden tail risk.
   - Short premium strategies can show smooth returns until a volatility shock or gap move reveals the real exposure.

10. Overinterpreting small samples.
    - A few winning trades do not identify a stable edge.

11. Forgetting market adaptation.
    - Markets are adaptive systems. Once a pattern is exploited, competition can compress or eliminate it.

12. Treating infrastructure as clerical.
    - Data, timestamps, corporate actions, option chains, quote quality, and execution records determine what the researcher can know.

## 7. Worked Example

Consider two paper trades made during the same month. These examples are conceptual and are not recommendations.

### Case A: Stock position with positive observed return

A student buys a stock at 100 and exits at 108 one month later. Ignoring costs, the observed return is 8 percent.

Naive interpretation:

- "The stock trade made 8 percent, so I had alpha."

Quant interpretation:

- During the same month, the broad market rose 6 percent.
- The stock had beta greater than 1, so an 8 percent gain may be mostly market exposure.
- The sector also rallied, so sector exposure may explain additional return.
- If the student selected this example after scanning many possible trades, selection bias may be present.
- If transaction costs, slippage, or taxes are ignored, the net return is overstated.
- If the position was large relative to liquidity, market impact would matter.

What would be needed before calling it alpha?

- A benchmark comparison.
- CAPM and multifactor analysis where appropriate.
- Out-of-sample or forward paper-trading evidence.
- Cost and execution assumptions.
- A written thesis that existed before the trade.
- Risk limits and scenario analysis.

### Case B: Call option trade with positive observed return

A student buys a call option for 2.00 and sells it later for 3.00. Ignoring costs, the option return is 50 percent.

Naive interpretation:

- "The option trade made 50 percent, so my directional call was excellent."

Quant interpretation:

- The underlying stock rose, so positive delta helped.
- Implied volatility expanded before an event, so vega helped.
- The option provided leverage, so percentage returns are mechanically amplified.
- The timing may have been lucky: entering just before a volatility expansion can produce profit even without a repeatable signal.
- The bid-ask spread may have been wide. Buying near the ask and selling near the bid could reduce or eliminate much of the apparent edge.
- The trade may have had unobserved risk exposure: event risk, gap risk, liquidity risk, and sensitivity to volatility collapse.

What would be needed before calling it alpha?

- Decompose the option profit into delta, gamma, theta, vega, and residual components where feasible.
- Compare implied volatility at entry with later realized volatility.
- Record actual executable bid and ask prices, not only midpoint marks.
- Define the ex ante thesis: direction, volatility, time, or event?
- Test whether similar setups worked across many pre-specified cases, not only after-the-fact examples.

### Comparison

| Question | Stock Position | Call Option Trade |
|---|---|---|
| Observed result | Positive return | Positive return |
| Main naive claim | "I picked a winner." | "I used leverage well." |
| Possible explanation | Market beta, sector beta, luck | Delta, vega, gamma, leverage, timing |
| Hidden issue | Factor exposure and costs | Volatility exposure, spread, time decay, liquidity |
| Alpha evidence? | Not without risk adjustment | Not without Greek, volatility, and execution analysis |

The key lesson is that profit is an observation. Alpha is an argument. The argument must survive benchmarks, costs, uncertainty, alternative explanations, and implementation constraints.

## 8. School Connections

### Economics

This lesson connects to risk premia, incentives, market efficiency, equilibrium, and arbitrage. If markets are competitive, easy profit opportunities tend to attract capital and get competed away. Returns may persist because they compensate investors for bearing risk, providing liquidity, absorbing inventory, or tolerating crashes. Arbitrage arguments such as put-call parity show how equivalent payoffs should be priced, but real arbitrage is constrained by funding, trading costs, short-sale limits, and institutional frictions.

### Statistics

Expected value, variance, covariance, standard errors, and hypothesis testing are central. A return estimate is noisy. A high mean return with high variance may be statistically weak. A portfolio's risk depends on covariance, not just individual asset volatility. A t-statistic can help discipline claims, but only under assumptions that must be checked.

### Econometrics

Regression appears in CAPM and multifactor models. Omitted variable bias matters because leaving out relevant risk factors can make alpha appear larger than it is. Selection bias matters because a strategy chosen after observing many alternatives may look better than it really is. Identification matters because the researcher must define what would count as evidence that returns came from edge rather than risk exposure or luck.

### Data Science

Trading research uses features, labels, validation, pipelines, and model evaluation. Features might include momentum, volatility, liquidity, valuation, sentiment, or event indicators. Labels might be future returns, volatility, drawdowns, or option returns. Leakage occurs when future information enters training or selection. Pipelines matter because data cleaning, timestamp alignment, corporate actions, and option chain construction determine what the model can learn.

### Calculus

Greeks are derivatives. Delta is a first derivative with respect to price. Gamma is a second derivative with respect to price. Theta is a derivative with respect to time. Vega is a derivative with respect to volatility. Calculus translates option intuition into local sensitivity language.

### Linear Algebra

Portfolio return is a dot product between weights and returns. Portfolio variance is a quadratic form using a covariance matrix. Factor models use matrices when many assets, dates, and factors are analyzed together. Linear algebra helps organize risk exposures and portfolio construction.

### School-to-Trading Translation

| School Concept | Trading Research Translation |
|---|---|
| Standard error | How noisy is the estimated mean return? |
| Omitted variable bias | What factor exposure is being mislabeled as alpha? |
| Covariance matrix | How do positions co-move under stress? |
| Partial derivative | Which input does option value respond to locally? |
| Data leakage | Did the backtest use unavailable future information? |

## 9. AOS Synthesis

This lesson integrates the AOS methodology as follows:

- Purpose before technique: start with the research question before selecting an options strategy.
- Identification before estimation: define what would distinguish alpha from risk exposure, luck, or bias before estimating returns.
- Models are controlled omissions: CAPM, multifactor models, and Black-Scholes are useful because they simplify, but their omissions must be visible.
- Data is produced, not found: market data, option chains, fills, quotes, and corporate actions come from systems with timestamps, rules, and errors.
- Metrics are proxies, not values: Sharpe, t-statistics, win rate, and gross return are useful but incomplete proxies for strategy quality.
- Prediction is not explanation: predicting a price move does not explain why the strategy should earn persistent returns.
- Infrastructure is epistemic: a clean research pipeline determines whether the student can audit assumptions, reproduce results, and detect leakage.
- Markets are adaptive systems: apparent edges can decay as other participants learn, imitate, or arbitrage them away.
- Risk management is governance: max loss, sizing, stop conditions, and review protocols are not optional afterthoughts.
- Synthesis requires visible artifacts: the student must produce a memo that separates raw return from alpha evidence.

## 10. Required Artifact

Artifact title:

Alpha vs Observed Return: Options-Aware Strategy Critique Memo

Suggested output path:

```text
artifacts/projects/quant_options/alpha_vs_observed_return_strategy_critique.md
```

Artifact purpose:

The student selects a hypothetical or paper-traded strategy and separates raw performance from evidence of alpha. The strategy may involve stock, options, or a simple options-aware comparison, but it must remain analytical. No live trade recommendation is allowed.

Required memo sections:

1. Strategy description
   - What is the hypothetical or paper-traded strategy?
   - What market, asset, or option structure does it study?
   - What is the thesis before strategy selection?

2. Raw return
   - What was the observed gross return?
   - What was the observed net return after estimated costs?
   - What time period and sample produced the result?

3. Factor exposure
   - What benchmark is relevant?
   - What market, sector, style, or liquidity exposures might explain the result?
   - What CAPM or multifactor test would be appropriate later?

4. Options exposure
   - Is the position directional, volatility-based, time-decay-based, convexity-based, or mixed?
   - What are the main Greek exposures: delta, gamma, theta, and vega?
   - How could the position make or lose money even if the directional thesis is partly right?

5. Volatility exposure
   - What was implied volatility at entry?
   - What realized volatility would need to occur for the thesis to make sense?
   - Could volatility risk premium explain the result?

6. Transaction costs and execution assumptions
   - What bid, ask, and midpoint assumptions are used?
   - Are fills realistic?
   - How would slippage and market impact change the result?

7. Risk limits
   - What is the maximum loss?
   - What position size is assumed?
   - What event, gap, liquidity, or tail risks exist?

8. Evidence needed before calling it alpha
   - What alternative explanations remain?
   - What out-of-sample, paper-trading, robustness, or live-simulation evidence would be needed?
   - What result would falsify the thesis?

9. Post-trade or post-simulation review
   - What happened relative to the thesis?
   - Which exposure produced the result?
   - What should be changed in the research process before scaling?

Mini mastery rubric:

| Criterion | Proficient Evidence |
|---|---|
| Alpha discipline | Separates raw observed return, excess return, benchmark-adjusted return, factor-adjusted return, and net-of-cost return. |
| Options risk language | Identifies delta, gamma, theta, vega, volatility exposure, liquidity exposure, and tail or event exposure. |
| Execution realism | States bid-ask, slippage, fill, size, and market-impact assumptions. |
| Assumption awareness | Names fragile assumptions, alternative explanations, and falsification tests. |
| Communication quality | Presents a clear thesis, evidence, limitations, and next-step review without making trade recommendations. |

Safety requirements:

- Do not provide buy or sell recommendations.
- Do not suggest live trades.
- Do not claim that the strategy is profitable.
- Use paper trading, small sizing assumptions, defined risk, journaling, and max loss language.
- Treat the memo as research process training, not investment advice.

## 11. Exercise

Choose one hypothetical or paper-traded setup. It can be a stock position, a long call, a long put, or a simple comparison between stock and option exposure. Do not place a live trade for this exercise.

Answer the following:

1. What is the thesis before selecting the instrument?
2. Is the thesis about direction, volatility, time, event risk, valuation, or hedging?
3. What payoff shape does the position create?
4. What are the main risks before entry?
5. What would the gross return measure?
6. What costs, spreads, slippage, and market impact would need to be subtracted?
7. What benchmark or factor exposure could explain the result?
8. What Greek exposures could explain the result?
9. What would make the result a backtest illusion?
10. What evidence would be required before making even a cautious alpha claim?

Deliverable:

Write a 900 to 1,400 word critique memo using the required artifact structure. Include at least one small table separating observed return, factor exposure, options exposure, costs, and remaining uncertainty.

## 12. Oral-Defense Prompt

A paper-traded long call returned 60 percent in two weeks, while the underlying stock rose 8 percent. The student says, "This proves I found alpha because the option return was much higher than the stock return."

Defend or reject that claim. Your answer must address delta, gamma, theta, vega, implied versus realized volatility, leverage, transaction costs, benchmark exposure, sample size, and what evidence would be needed before calling the result alpha.

## 13. Artifact Registry Recommendation

Recommended registry entry:

```json
{
  "artifact_id": "AOS-L08-001",
  "title": "Alpha Is Not Observed Return, and Options Are Not Just Directional Bets",
  "type": "lesson",
  "path": "artifacts/lessons/08_quantitative_finance/lesson_01_alpha_options_directionality.md",
  "module_id": "08",
  "module_name": "Quantitative Finance, Markets, and Algorithmic Trading Systems",
  "primary_competencies": [
    "Financial Systems and Risk Judgment"
  ],
  "secondary_competencies": [
    "Statistical Inference and Uncertainty Quantification",
    "Causal Identification and Counterfactual Reasoning",
    "Predictive Modeling and Learning Systems Evaluation",
    "Epistemic Infrastructure Design",
    "Synthesis, Communication, and Intellectual Production"
  ],
  "status": "draft",
  "rubrics_used": [
    "assumption_awareness",
    "causal_reasoning_quality",
    "technical_artifact_quality",
    "synthesis_portfolio_quality"
  ],
  "created_at": "",
  "updated_at": "",
  "notes": "Initial quantitative finance and options lesson focused on separating observed return from alpha and directional option exposure from volatility, convexity, time, liquidity, and execution risk."
}
```

Recommended project artifact registry entry after the student completes the memo:

```json
{
  "artifact_id": "AOS-P08-001",
  "title": "Alpha vs Observed Return: Options-Aware Strategy Critique Memo",
  "type": "strategy_critique_memo",
  "path": "artifacts/projects/quant_options/alpha_vs_observed_return_strategy_critique.md",
  "module_id": "08",
  "module_name": "Quantitative Finance, Markets, and Algorithmic Trading Systems",
  "primary_competencies": [
    "Financial Systems and Risk Judgment",
    "Model Construction and Assumption Analysis"
  ],
  "secondary_competencies": [
    "Statistical Inference and Uncertainty Quantification",
    "Synthesis, Communication, and Intellectual Production"
  ],
  "status": "proposed",
  "rubrics_used": [
    "assumption_awareness",
    "technical_artifact_quality",
    "synthesis_portfolio_quality"
  ],
  "created_at": "",
  "updated_at": "",
  "notes": "Student-facing memo intended to separate raw return, factor exposure, options exposure, volatility exposure, transaction costs, execution assumptions, risk limits, and evidence needed before making an alpha claim."
}
```
