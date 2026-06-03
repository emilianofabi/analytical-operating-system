# AOS RAG Blueprint — Chunk 13: Cross-Repo trade-sim Integration Design

---

> **Continuity from Chunks 0–12**: Chunk 0 established the phased roadmap. Chunk 1 detailed lifecycle stages. Chunk 2 cataloged failure modes. Chunk 3 mapped authority tiers. Chunk 4 designed the registry. Chunk 5 defined folder exclusions. Chunk 6 defined the manifest. Chunk 7 specified ranking. Chunk 8 codified contracts. Chunk 9 mapped agent integrations. Chunk 10 designed the tools. Chunk 11 designed the evaluations. Chunk 12 outlined the implementation schedule. Chunk 13 now designs the cross-repository integration for the external `trade-sim` workspace.

---

## 13.0 — The Need for Cross-Repo Integration

While AOS serves as the central evidence-governance system, the learner’s quantitative engineering work resides in an external repository: `trade-sim` (located adjacent to the AOS root, e.g., `c:\Users\chefi\Projects\trade-sim`).

To support career claims regarding options pricing, mean-reversion algorithms, backtesting precision, and statistical arbitrage, RAG must retrieve evidence from `trade-sim`. However, indexing a separate workspace introduces security risks (FM-04) and potential context bloat. Chunk 13 designs the bridge architecture that permits cross-repo evidence verification without compromising local AOS lane discipline.

---

## 13.1 — Indexable Scope of `trade-sim`

The `trade-sim` repository contains operational trading systems. Only a subset of files representing completed engineering artifacts are citable.

### Verified Ingestion Scope:

```
trade-sim/
├── strategies/
│   ├── mean_reversion_strategy.py      ← INDEXABLE (Core strategy code)
│   └── options_straddle_arbitrage.py   ← INDEXABLE (Core options strategy)
├── tests/
│   └── strategy_backtest_eval.log      ← INDEXABLE (Evaluation results)
├── memos/
│   └── backtest_performance_memo.md    ← INDEXABLE (Summary memo)
├── data/                               ← EXCLUDED (Raw market tick CSVs - size > 1GB)
├── credentials/                        ← EXCLUDED (Broker credentials & keys)
└── .git/                               ← EXCLUDED (Git internals)
```

- **Strategy Implementations (`strategies/`)**: Python files defining strategy execution, inputs, and parameters.
- **Backtest Summaries (`memos/`)**: Markdown files outlining Sharpe ratios, drawdowns, transaction cost assumptions, and data-generating processes.
- **Test Output Logs (`tests/`)**: System test runs verifying algorithm code execution.

---

## 13.2 — Security Boundaries and Exclusions (FM-04 Control)

To prevent RAG from exposing API credentials or indexing massive binary datasets, the retriever applies strict firewalls when reading the external directory:

1. **Size Invariant**: Any file in `trade-sim/` exceeding **500KB** is excluded from vectorization or BM25 indexing. This automatically blocks raw CSV market data files stored in the workspace.
2. **Secrets Verification**: The regex keys scanner (Chunk 5) runs with elevated priority over all `trade-sim/` config files.
3. **Hard Exclusions List**:
   - `trade-sim/data/**`
   - `trade-sim/credentials/**`
   - `trade-sim/.env*`
   - `trade-sim/secrets/**`

---

## 13.3 — Cross-Repo Citation Conventions

To distinguish external evidence from local AOS artifacts, the chunking and citation engines implement a new prefix format:

### Token Format: `[TRD-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}]`
- **TRD**: Denotes the external `trade-sim` workspace.
- **TYPE**: Identifies the code type (`STRAT` for strategy code, `MEMO` for backtest memos, `TEST` for logs).
- **SOURCE_NUM**: Assigned using a separate cross-repo index in `source_registry.json`.
- **Example**: `[TRD-CHK-STRAT-001-002]` (Second chunk of the mean-reversion strategy).

---

## 13.4 — The Source-of-Truth Memo Builder Bridge (Control C-17)

**Decision**: Instead of continuously indexing the entire `trade-sim` code history, AOS RAG bridges the repositories using a local helper tool: `tools/rag/memo_builder.py`.

```
     [trade-sim/strategies/mean_reversion.py] ──► strategy output files
                                                          │
                                                          ▼ processed by
                                                 [tools/rag/memo_builder.py]
                                                          │
                                                          ▼ generates
                      [artifacts/projects/trade-sim-bridge-memo.md]
                                                          │
                                                          ▼ undergoes
                                                 AOS Review & Audit Loop
                                                          │
                                                          ▼
                                            Committed to Git (Class 6)
```

### Bridge Workflow:
1. The developer runs the `memo_builder.py` script.
2. The script parses the target `trade-sim/strategies/` script, reads the backtest summary memo, and verifies strategy checksums.
3. It generates a single, consolidated **Bridge Memo** in the local AOS workspace: `artifacts/projects/combined_identification_data_memos/trade_sim_bridge_memo.md`.
4. This memo details:
   - File hashes of the external python scripts.
   - Sharpe ratios, returns, and drawdown metrics.
   - DAG of the strategy's market variables.
5. This bridge memo undergoes the standard **AOS Review and PASS Audit loop**. Once audited, it achieves `CLASS 6` evidence status in AOS.
6. **Result**: AOS RAG indexes this single, audited bridge memo as Tier 1 evidence, avoiding the need to traverse and index the raw code of the external workspace.

---

## 13.5 — Metadata Synchronization Rules

When cross-repo indexing is active in Phase 11:
- The AOS source registry (`source_registry.json`) references the external files using relative pathing: `../trade-sim/strategies/mean_reversion_strategy.py`.
- The validation tool `validate_registry.py` verifies that these paths resolve correctly on the developer's machine.
- If the developer has not cloned the `trade-sim` repository locally, RAG skips the external files and outputs a warning: `[WARNING: trade-sim repository not found at target path. Skipping cross-repo indexing.]`.

---

## 13.6 — Supporting Quantitative Career Claims

By referencing the PASS audited bridge memo, the **Resume Translator** can verify quantitative competency claims.

### Worked Example:
- **Claim**: *"Developed a Python straddle option arbitrage strategy with backtested annualized returns of 18%."*
- **RAG Lookup**: Retriever fetches chunks from the local bridge memo: `[AOS-CHK-PROJ-002-001]` and its PASS audit `[AOS-CHK-AUDIT-004-001]`.
- **Verdict**: ✅ **ACCEPTABLE** — The audit PASS verdict verifies that backtest assumptions, transaction fees, and data limits were successfully audited. Overclaiming Risk: LOW.

---

## 13.7 — What Not to Index in `trade-sim`

- **Do not index raw backtest log directories**: Daily tick files or multi-line terminal outputs contain redundant data. Only index final performance summaries.
- **Do not index library source code**: Do not index `numpy`, `pandas`, or external backtesting library code files (`backtrader` source scripts). Only index strategy code written by the learner.

---

## Chunk Completed

**Chunk 13 — Cross-Repo trade-sim Integration Design** is complete.

---

## What This Chunk Covered

1. **Cross-Repo Scope**: Defined verified index paths in the adjacent `trade-sim` repository.
2. **Security Firewalls**: Configured file size ceilings (500KB) and secrets screening.
3. **Citation Convention**: Designed the `[TRD-CHK-*]` token format.
4. **Source-of-Truth Bridge Memo**: Designed `tools/rag/memo_builder.py` to compile external code verification into local citable markdown.
5. **Path Sync Rules**: Detailed relative path resolving (`../trade-sim/`) and clone verification checks.
6. **Claim Grounding**: Modeled resume bullet validations for quantitative finance claims.
7. **Exclusions**: Blocked raw log folders, execution tick data, and third-party libraries.

---

## Running Decision Log

*All decisions from Chunks 0–12 (D1–D130) are preserved. New decisions from Chunk 13:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D130 | *(preserved from Chunks 0–12)* | | |
| D131| External trade-sim strategies indexed using relative path lookups | Prevents importing external code bases into the local AOS repository. | **Accepted** |
| D132| 500KB file size ceiling blocks raw tick datasets | Eliminates large market tick CSVs from clogging semantic token spaces. | **Accepted** |
| D133| trade-sim tokens formatted as `[TRD-CHK-*]` | Clearly separates local learning artifacts from external quantitative code. | **Accepted** |
| D134| Bridge Memo Builder compiles external strategies into local markdown | Allows external code files to be reviewed and PASS-audited inside the AOS lifecycle. | **Accepted** |
| D135| Skip trade-sim indexing if directory is not cloned | Prevents execution exceptions on fresh environments where the developer hasn't downloaded the strategy code. | **Accepted** |
| D136| Only strategies written by the learner are indexable | Eliminates libraries and package dependencies from retrieval indexes. | **Accepted** |
| D137| Backtest evaluation logs citable only if summarized in memos | Raw logs contain formatting errors and do not represent structured evidence. | **Accepted** |
| D138| Bridge memos inherit the commit hash of the local AOS repo | Ensures that the snapshot of the strategy performance is frozen at commit. | **Accepted** |
| D139| Verification warnings appended to queries referencing external files | Alerts agents that the source code resides in a separate workspace. | **Accepted** |
| D140| Skip indexing trade-sim configuration parameters | Prevents environment keys or broker secrets from entering RAG contexts. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 14 — Blueprint Audit and Final Quality Register**

This is the final chunk of the RAG Blueprint. It will summarize all 145 architectural decisions (D1 to D145), list the 40 controls mapping, provide a checklist for the final blueprint audit, resolve the remaining question regarding Quant Lesson 1 (resolving UQ16), and outline the formal closing procedure for this blueprint artifact.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 14 — Blueprint Audit and Final Quality Register.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–13.

Preserve and update the running decision log from Chunks 0–13 (D1–D140).

Do not repeat Chunks 0–13 content except for brief continuity references.

Chunk 14 must include:
- final blueprint audit checklist
- master register of all 145 decisions (D1–D145) grouped by domain
- complete control-to-failure mitigation register (C-01 to C-40)
- resolution of UQ16 (Quant Lesson 1 closure formalization)
- blueprint closing procedure (marking this blueprint as a closed artifact)
- final verification instructions for the developer

Stop after completing Chunk 14 and output the final chunk completed statement.
```
