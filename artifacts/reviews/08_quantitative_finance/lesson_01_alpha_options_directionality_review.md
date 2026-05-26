# Review: Alpha Is Not Observed Return, and Options Are Not Just Directional Bets

## Metadata

- Reviewed artifact: artifacts/lessons/08_quantitative_finance/lesson_01_alpha_options_directionality.md
- Review type: AOS lesson artifact review
- Module: 08 Quantitative Finance, Markets, and Algorithmic Trading Systems
- Review status: Pass with targeted revisions recommended
- Primary rubrics consulted: assumption_awareness, technical_artifact_quality, synthesis_portfolio_quality
- Related modules consulted: 02 Probability and Statistics; 03 Causal Inference; 07 Data Engineering and Infrastructure
- Template consulted: templates/lesson_template.md

## Executive Judgment

The lesson is strong and instructionally coherent. It clearly teaches the central distinction between observed return and alpha, frames options as nonlinear instruments with directional, volatility, convexity, time, liquidity, and distributional exposures, and repeatedly enforces the AOS habit of treating performance claims as arguments requiring assumptions, benchmarks, costs, and implementation evidence.

The artifact is especially strong as a first quantitative finance lesson because it does not rush into strategy recipes. It begins from the serious problem in Module 08: returns must be analyzed with risk, benchmarks, transaction costs, liquidity, backtest assumptions, and robustness. The lesson also connects well to the learner's active AOS strengths in causal reasoning, data infrastructure, and technical communication by treating alpha as an evidentiary claim rather than a raw outcome.

The main revision opportunity is not conceptual correctness but instructional sharpness. The lesson is broad and dense. It would become stronger if it added a compact formula audit table, corrected internal subsection numbering under the Formal Framework, included a small numeric net-return and option-PnL decomposition example, and made the required artifact's assessment criteria more explicit.

## Review Focus Findings

### 1. Distinction between observed return and alpha

Rating: Advanced

The lesson clearly distinguishes observed return from alpha. The conceptual tension is stated early and repeatedly reinforced: profit is an observation, while alpha is a model-dependent and evidence-dependent claim about abnormal performance after accounting for risk, benchmarks, costs, and implementation constraints.

Evidence from the lesson:

- The opening section states that observed trading performance may reflect market beta, compensated risk, noise, selection bias, overfitting, transaction costs, slippage, market impact, regime luck, volatility risk premia, liquidity effects, or market adaptation.
- The core concepts table defines observed return as a starting measurement and alpha as return unexplained by a specified benchmark or risk model after costs and assumptions.
- The CAPM and multifactor sections explain alpha as an intercept or residual after controlling for market and factor exposures.
- The worked example explicitly rejects both the stock trade and call option trade as automatic evidence of alpha.
- The required artifact asks the student to separate raw return, factor exposure, options exposure, volatility exposure, transaction costs, execution assumptions, risk limits, and evidence needed before calling the result alpha.

Targeted improvement:

Add a short "Alpha Claim Ladder" after the core concepts or before the worked example:

1. Raw observed return.
2. Excess return over risk-free rate.
3. Benchmark-adjusted return.
4. Factor-adjusted return.
5. Net-of-cost return.
6. Out-of-sample or forward-tested evidence.
7. Capacity-aware and implementation-aware alpha claim.

This would give the student a compact diagnostic ladder for moving from performance observation to alpha argument.

### 2. Options as volatility, convexity, time, and distribution instruments

Rating: Advanced

The lesson strongly avoids the beginner mistake of treating options as only leveraged directional bets. It identifies options as payoff geometry and repeatedly distinguishes direction from volatility, convexity, time decay, event risk, skew, tail risk, liquidity, path dependency, and probability distribution exposure.

Evidence from the lesson:

- The serious problem section states that options can express views on direction, volatility, convexity, time decay, skew, tail risk, liquidity, path dependency, and entire probability distributions.
- The concepts table defines options as payoff geometry and defines implied volatility, realized volatility, volatility risk premium, and Greeks.
- The Greek sections explain delta, gamma, theta, and vega in plain English and connect them to trading misuse.
- The options analysis checklist tells the student to separate direction, volatility, time, event risk, skew, liquidity, and tail risk.
- The worked call option example explains that positive performance may come from delta, vega, leverage, timing, bid-ask spread effects, event risk, gap risk, liquidity risk, and volatility collapse exposure.

Targeted improvement:

Add a small exposure decomposition table for a long call and long put:

| Position | Direction | Volatility | Convexity | Time | Tail or event exposure |
|---|---|---|---|---|---|
| Long call | Positive delta | Usually positive vega | Positive gamma | Usually negative theta | Upside tail exposure |
| Long put | Negative delta | Usually positive vega | Positive gamma | Usually negative theta | Downside tail exposure |

The lesson already says this in prose, but a compact table would improve retrieval and oral-defense preparation.

### 3. Formula correctness and plain-English explanation

Rating: Proficient to Advanced

The formulas are broadly correct for the intended introductory quantitative finance lesson, and each formula includes symbol definitions, plain-English meaning, school connections, and trading misuse. This is a major strength of the artifact.

Formula-specific observations:

- CAPM: Correct as a regression form of excess asset or strategy return on excess market return. The interpretation of alpha and beta is clear.
- Multifactor model: Correct as a generic factor regression. The lesson appropriately warns against omitted variable bias, post-hoc factor selection, and mechanical factor addition.
- Sharpe ratio: Correct in conceptual form. The lesson properly warns that Sharpe can hide tail risk, skew, serial correlation, stale prices, and option payoff asymmetry.
- t-statistic: Correct for a simplified mean-return test. The lesson appropriately notes dependence on assumptions such as independence and stationarity.
- Portfolio return: Correct as a dot product of weights and next-period returns.
- Portfolio variance: Correct as a quadratic form using the covariance matrix.
- Net return: Correct as a conceptual implementation equation.
- Put-call parity: Correct for the simplified European, non-dividend case as written.
- Black-Scholes call price: Correct as the compact call price formula, with a clear caveat that d1 and d2 depend on volatility.
- Greeks: Correct as local partial derivatives.

Targeted improvements:

1. Add explicit domain assumptions where formulas are most likely to be overgeneralized:
   - Put-call parity: specify European options, same strike and expiration, no dividends in the simplified form, frictionless borrowing and lending, and no binding short-sale constraints.
   - Black-Scholes: specify European option, lognormal diffusion, constant volatility, constant risk-free rate, no arbitrage, continuous trading, frictionless markets, and dividend treatment depending on model variant.

2. Add a brief note that theta sign conventions vary. The lesson already mentions this in the concept table, but the formal theta section could repeat it because students often encounter broker platforms with different sign conventions.

3. Add one compact numerical calculation for net return:

```text
R_gross = 5.0 percent
transaction_costs = 0.2 percent
slippage = 0.5 percent
market_impact = 0.3 percent
R_net = 5.0 - 0.2 - 0.5 - 0.3 = 4.0 percent
```

This would make the cost discipline more concrete without turning the lesson into a coding exercise.

### 4. School connections

Rating: Advanced

The school connections are explicit and aligned with the user's requested domains. The lesson connects economics, statistics, econometrics, data science, calculus, and linear algebra in a way that supports both coursework and trading research discipline.

Strengths by domain:

- Economics: The lesson connects risk premia, incentives, market efficiency, equilibrium, arbitrage, liquidity provision, and institutional frictions.
- Statistics: It uses expected value, variance, covariance, standard errors, hypothesis testing, sampling variation, and uncertainty discipline.
- Econometrics: It correctly uses regression, omitted variable bias, selection bias, model specification, and identification language.
- Data science: It links features, labels, leakage, validation, pipelines, model evaluation, timestamp alignment, and option chain construction.
- Calculus: It frames Greeks as first and second derivatives or partial derivatives.
- Linear algebra: It explains portfolio weights, covariance matrices, dot products, quadratic forms, and factor-model organization.

Targeted improvement:

Add a final "school-to-trading translation" table to help the learner see how each school concept becomes a trading research question:

| School concept | Trading research translation |
|---|---|
| Standard error | How noisy is the estimated mean return? |
| Omitted variable bias | What factor exposure is being mislabeled as alpha? |
| Covariance matrix | How do positions co-move under stress? |
| Partial derivative | Which input does the option value respond to locally? |
| Data leakage | Did the backtest use information unavailable at trade time? |

This would reinforce transfer without adding much length.

### 5. AOS principles: meaningful or decorative

Rating: Proficient to Advanced

The AOS principles are used meaningfully in the lesson. They are not merely listed at the end. The serious problem, formulas, assumptions, worked example, and required artifact all operationalize the principles.

Meaningful uses:

- Purpose before technique: The lesson insists on thesis before strategy and research question before option structure.
- Identification before estimation: Alpha is framed as an identification problem: what would distinguish edge from risk exposure, luck, or bias?
- Models are controlled omissions: CAPM, multifactor models, and Black-Scholes are presented as useful simplifications with trading misuse warnings.
- Data is produced, not found: Market data, option chains, fills, quotes, corporate actions, and timestamps are treated as infrastructure-dependent evidence.
- Metrics are proxies, not values: Sharpe, t-statistics, win rate, gross return, and backtest results are treated as incomplete proxies.
- Prediction is not explanation: The lesson distinguishes correct directional prediction from an explanation of persistent returns.
- Infrastructure is epistemic: The lesson states that pipelines, quote quality, fills, and timestamp alignment determine what can be known.
- Markets are adaptive systems: The failure modes include edge decay through competition and adaptation.
- Risk management is governance: Max loss, sizing, stop conditions, journaling, and review protocols are treated as governance mechanisms.
- Synthesis requires visible artifacts: The lesson culminates in a memo that makes assumptions, risk, and evidence visible.

Targeted improvement:

The AOS synthesis section could move from principle statements to a short operational checklist. For example:

- If claiming alpha, show benchmark and factor adjustment.
- If using options, show Greek and volatility exposure.
- If using data, show timestamp and execution assumptions.
- If using a backtest, show leakage, cost, and robustness checks.
- If proposing scale, show capacity and risk limits.

This would make the AOS principles even more actionable.

### 6. Assumptions and failure modes

Rating: Advanced

The assumptions and failure modes are explicit, relevant, and well aligned with Module 08 and the assumption_awareness rubric. The assumptions table connects assumptions to consequences. The failure modes cover both quantitative finance errors and options-specific interpretation errors.

Strengths:

- Assumptions cover benchmark appropriateness, factor measurement, time comparability, selection, costs, executable prices, liquidity, data-generating process, model inputs, binding risk limits, and paper-trading interpretation.
- Failure modes cover observed return versus alpha, risk premium versus mispricing, costs, win rate versus expected value, backtests versus live evidence, model price versus executable price, direction-only option thinking, volatility exposure, hidden tail risk, small samples, market adaptation, and infrastructure errors.

Targeted improvement:

Prioritize the assumptions by fragility and consequence. The assumption_awareness rubric rewards not only listing assumptions but prioritizing them by fragility, consequence, and testability. A short column or follow-up list could identify the highest-risk assumptions:

1. Executable prices and liquidity.
2. Benchmark and factor specification.
3. No leakage or selection bias.
4. Stable volatility regime.
5. Costs and market impact.
6. Risk limits actually binding under stress.

This would move the assumptions section from strong to exemplary.

### 7. Required artifact definition

Rating: Advanced

The required artifact is well-defined and portfolio-appropriate. It asks the student to produce an "Alpha vs Observed Return: Options-Aware Strategy Critique Memo" and gives a clear suggested output path, purpose, required sections, safety requirements, and exercise deliverable.

Strengths:

- The artifact makes the student's judgment visible rather than asking for a generic problem set.
- It aligns with Module 08 assessment artifacts such as risk analysis, strategy failure memo, and trading system design.
- It supports Module 12 portfolio goals by creating a high-signal memo that can later become a case study or interview artifact.
- It protects against unsafe interpretation by requiring hypothetical or paper-traded strategies, no live trade recommendation, max loss language, journaling, and evidence requirements.

Targeted improvement:

Add a mini mastery rubric for the memo. The lesson provides sections but not scoring criteria. A short table would help the student understand what distinguishes weak from strong work:

| Criterion | Proficient evidence |
|---|---|
| Alpha discipline | Separates raw, excess, benchmark-adjusted, factor-adjusted, and net return. |
| Options risk language | Identifies delta, gamma, theta, vega, volatility, liquidity, and tail exposure. |
| Execution realism | Uses bid-ask, slippage, fill, and size assumptions. |
| Assumption awareness | Names fragile assumptions and falsification tests. |
| Communication quality | Presents a clear claim, evidence, limitations, and next-step review. |

## Rubric-Based Assessment

### Assumption-Awareness in Technical Work

Overall: Advanced minus

| Criterion | Rating | Evidence |
|---|---|---|
| Problem Framing | Advanced | The lesson frames the core problem as the distinction between profit, alpha, risk exposure, and backtest illusion. |
| Assumption Identification | Proficient to Advanced | Assumptions are explicit and tied to interpretation. Prioritization by fragility and testability would make this stronger. |
| Data-Generating Process | Proficient | The lesson discusses market data, option chains, fills, quotes, timestamps, and corporate actions. It could add more detail on row-level meaning and vendor construction of option data. |
| Method Fit | Advanced | CAPM, factor models, Sharpe, t-statistics, net return, parity, Black-Scholes, and Greeks fit the lesson's goals. |
| Diagnostics and Sensitivity | Proficient | The lesson calls for benchmark, factor, cost, execution, Greek, volatility, and robustness checks. It could specify a small diagnostic checklist. |
| Limitation Articulation | Advanced | Limitations are specific and tied to claims about alpha, options, backtests, and implementation. |

### Technical Artifact Quality

Overall: Proficient to Advanced

| Criterion | Rating | Evidence |
|---|---|---|
| Problem and Requirements | Advanced | The lesson has a clear problem, audience, safety boundary, required artifact, formulas, and exercise. |
| Correctness | Proficient to Advanced | The formulas are correct for their intended simplified contexts. Some formula assumptions should be made more explicit. |
| Reproducibility | Developing to Proficient | As a lesson artifact, it is readable and structured, but it does not include a computational reproducibility component. That is acceptable for Lesson 1, but a small calculation table would help. |
| Organization | Proficient | The section sequence is coherent. Internal subsection numbering under Formal Framework uses 3.x under section 4, which should be corrected. |
| Testing and Validation | Proficient | The oral defense and required memo create validation opportunities. A mini mastery rubric would improve assessment clarity. |
| Documentation | Advanced | The lesson is thoroughly documented with definitions, formula explanations, misuse warnings, and artifact instructions. |
| Technical Judgment | Advanced | It emphasizes costs, slippage, market impact, liquidity, risk limits, and model misuse. |

### Synthesis and Portfolio Quality

Overall: Advanced minus

| Criterion | Rating | Evidence |
|---|---|---|
| Central Question | Advanced | The central question is clear: when does observed performance justify an alpha claim? |
| Claim and Argument | Advanced | The lesson consistently argues that alpha requires risk, benchmark, cost, and implementation adjustment. |
| Domain Integration | Advanced | Finance, statistics, econometrics, data science, calculus, linear algebra, infrastructure, and communication are integrated rather than merely named. |
| Method and Evidence Fit | Advanced | The required memo format fits the lesson's claims and required evidence. |
| Artifact Design | Advanced | The required memo is portfolio-relevant and aligned with Module 12 goals. |
| Communication Clarity | Proficient to Advanced | The prose is clear and rigorous. The length and density may challenge first exposure learners. |
| Limitation and Critique | Advanced | The artifact teaches critique as the main discipline. |
| Portfolio Signal | Advanced | The required memo would demonstrate integrated judgment in finance, data science, and technical communication. |

## Strengths

1. The lesson has a precise and important central tension: observed return is not alpha.
2. It is well aligned with Module 08's emphasis on risk, benchmarks, transaction costs, liquidity, robustness, and skepticism toward backtests.
3. It treats options as nonlinear risk instruments rather than simple leverage tools.
4. It explains formulas in a student-accessible way while preserving mathematical seriousness.
5. It connects school concepts to practical trading research discipline.
6. It uses AOS principles substantively across the lesson, not merely in a decorative list.
7. It includes strong safety language and avoids trade recommendations.
8. It culminates in a visible artifact that supports portfolio development.

## Targeted Revision Priorities

### Priority 1: Correct internal subsection numbering

Under "## 4. Formal Framework," subsections are numbered 3.1 through 3.16. Rename them 4.1 through 4.16 or remove numeric prefixes. This is a small but important technical communication fix.

### Priority 2: Add formula assumption notes for option pricing formulas

Add concise assumption notes to put-call parity and Black-Scholes. This would prevent students from overgeneralizing formulas beyond their valid settings.

Recommended additions:

- Put-call parity: European options, same strike, same expiration, no dividends in the simplified form, frictionless funding, and no binding short-sale or transaction constraints.
- Black-Scholes: European option, lognormal price dynamics, constant volatility, constant risk-free rate, continuous trading, frictionless markets, and no arbitrage.

### Priority 3: Add a compact alpha claim ladder

A short ladder from raw return to defensible alpha would make the core distinction easier to apply:

1. Observed raw return.
2. Excess return.
3. Benchmark-adjusted return.
4. Factor-adjusted return.
5. Net-of-cost return.
6. Out-of-sample or forward-tested persistence.
7. Capacity-aware implementation evidence.

### Priority 4: Add a small numerical net-return example

The lesson explains net return well, but one small numerical example would help students see how costs reduce apparent edge.

### Priority 5: Add a required-artifact mastery rubric

The required memo is well-defined, but adding a mini scoring rubric would help the student self-assess and would support future review consistency.

### Priority 6: Prioritize assumptions by fragility

The assumptions table is strong. Add a short list of the most fragile assumptions: executable prices, benchmark specification, leakage or selection bias, volatility regime stability, cost estimates, and binding risk limits.

### Priority 7: Add one data infrastructure prompt

Because Module 07 is explicitly relevant and the learner has developing epistemic infrastructure progress, add one prompt such as:

"What does one row represent in the option dataset: an end-of-day contract quote, a quote update, a trade, a midpoint mark, or an executable fill?"

This would deepen the data-producing-process theme.

## Suggested Review Outcome

Outcome: Pass with targeted revisions recommended.

The lesson is ready to use as a draft AOS lesson artifact. It should not be rewritten wholesale. The recommended revisions are local improvements: numbering consistency, formula assumption notes, a compact alpha ladder, a small cost example, an artifact mastery rubric, assumption prioritization, and one stronger market-data infrastructure prompt.

## Recommended Learner-State Note

Do not mutate learner-state/current_student_state.json as part of this review. If a future learner-state update proposal is requested, the lesson could support a proposed evidence entry under financial systems judgment and synthesis communication after revision and completion of the required strategy critique memo.
