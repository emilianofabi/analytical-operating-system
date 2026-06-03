# AOS RAG v0.1 Design

## 1. Purpose

AOS RAG v0.1 is a source-governed evidence retrieval layer for the Analytical Operating System. It exists to ground repo-state, artifact-status, closure, audit, and career-claim answers in durable source evidence.

AOS RAG is not a generic knowledge base. It is an evidence authority layer.

The system serves the AOS lifecycle:

```text
artifact -> review -> revision -> audit -> closure
```

The git-backed operational form is:

```text
artifact -> review -> revision -> audit -> commit -> clean working tree
```

## 2. What AOS RAG Is

AOS RAG is:

- A metadata-first source authority layer.
- A registry of evidence sources and their authority levels.
- A guard against repo-state hallucination, closure violations, and unsupported claims.
- A citation protocol for answers that need evidence.
- A privacy boundary that prevents private, local, generated, and non-authoritative files from entering retrieval.

AOS RAG does not solve hallucination. It reduces specific failure modes by forcing answers to cite registered sources with known evidence status.

## 3. What AOS RAG Is Not

AOS RAG is not:

- A chatbot UI.
- A vector database project.
- A NotebookLM or SurfSense clone.
- A bulk repository indexer.
- A reason to index private learner-state.
- A reason to treat drafts as proof.
- A replacement for review, audit, git, or closure discipline.

## 4. Hallucination Failure Modes

AOS RAG v0.1 is designed to reduce these failure modes:

- Repo-state hallucination: claiming files, audits, or completed loops exist without source evidence.
- Closure violation: reopening closed loops without a documented defect.
- Unsupported career claims: using drafts, notes, or brainstorms as resume or portfolio evidence.
- Private data leakage: surfacing learner-state, chat logs, local debugger/provider files, secrets, or local scratch material.
- Stale status poisoning: treating status files or handoffs as stronger than audits or committed evidence.
- Phantom citations: citing paths or source IDs that were not retrieved or do not exist.
- Authority collapse: treating semantic relevance as proof.

## 5. Source Hierarchy

Authority is determined by metadata, not embeddings.

Recommended source hierarchy:

| Tier | Authority | Examples | Claim Support |
|---|---|---|---|
| 1 | Highest | PASS audits, audited artifacts, closed-loop records | Strongest support |
| 2 | High | Reviews, rubrics, governance, blueprint docs | System/evaluation support |
| 3 | Medium | README, public docs, templates, unaudited docs | Context only |
| 4 | Low | Status files, handoffs | Stale-prone context |
| 5 | Minimal | Prompts, brainstorms, speculative notes | Metadata/context only |
| 6 | Excluded | Private/local/generated/secrets | Never indexed |

## 6. Evidence Tiers

Lower `evidence_tier` values mean higher authority. Tier 1 sources outrank lower tiers when sources conflict.

Audited artifacts and PASS audits have the strongest authority. Drafts and brainstorms cannot support resume or portfolio claims. Reviews can support evaluation-status answers, but they do not prove closure. Status files can help locate current work, but they are stale-prone and must not override audits.

## 7. Source Registry Purpose

The source registry is the first implementation artifact. It defines:

- Which sources exist.
- Which sources are indexable.
- Which sources are excluded.
- Which sources can support claims.
- Which sources are public, internal, private, local-only, or excluded.
- Which evidence tier applies.
- Which source IDs can be cited.

No retrieval layer should treat unregistered or excluded files as evidence.

## 8. Indexable Source Types

Initial indexable source types are:

- `blueprint`
- `docs`
- `artifact`
- `audit`
- `review`
- `module`
- `rubric`
- `template`
- `status`
- `handoff`
- `prompt`
- `seed`

Indexing policy controls how much content is available:

- `full_content`: source text can be chunked and cited.
- `summary_only`: source is represented by curated summary metadata.
- `metadata_only`: path, title, status, and authority metadata only.
- `excluded`: not read or indexed.

## 9. Excluded And Private Source Types

The following must not be indexed:

- Private learner-state.
- Chat logs.
- Local debugger/provider files.
- Local scratch notes that have not been registered.
- Environment files and secrets.
- Generated frontend output.
- Dependency folders.
- Build output folders.
- Quarantine folders.
- Local tool state.

These exclusions must be enforced before file content is read.

## 10. Retrieval Modes

Phase 1 and Phase 2 do not build retrieval code.

The intended later retrieval order is:

1. Metadata filtering.
2. Keyword or BM25 retrieval.
3. Authority weighting.
4. Citation packaging.
5. Claim/closure checks.
6. Embeddings only after metadata and keyword retrieval are stable.

Embeddings may help find candidates later, but embeddings do not determine source authority.

## 11. Answer Contracts

Answer contracts define what a grounded answer must contain. For evidence-bearing answers, the contract must include:

- Claim or question being answered.
- Retrieved source IDs.
- Evidence tier.
- Source visibility.
- Index policy.
- Whether evidence supports the claim.
- Missing evidence.
- Refusal text when support is insufficient.

Career-claim answers must refuse unsupported claims. Repo-state answers must cite source evidence. Closure-related answers must identify whether closure evidence exists.

## 12. Citation Protocol

Citations must reference registered source IDs and repo-relative paths. A citation is valid only if:

- The source exists in the registry.
- The path exists in the repo.
- The source is not excluded.
- The source supports the type of answer being given.
- The cited source was retrieved for the current answer.

No absolute local machine paths are allowed in registry citations.

## 13. Privacy Boundaries

Private learner-state and local debugging/provider files must not be indexed.

Privacy boundaries are structural:

- Exclusion rules are encoded in `rag/exclusion_rules.json`.
- Registry schema validation blocks excluded paths from source entries.
- Review prompts require explicit privacy checks.
- Generated dependency and build output are excluded.

## 14. Implementation Phases

v0.1 implementation starts with source governance:

1. Design and blueprint alignment.
2. Source registry schema.
3. Seed registry.
4. Exclusion rules.
5. Registry reviewer prompt.
6. Registry validation.
7. Later: keyword retrieval and answer contracts.
8. Later: claim checker and closure guard.
9. Deferred: embeddings, external repositories, browser UI, or chatbot UI.

## 15. Deferred Features

Deferred until after source governance is stable:

- Embeddings.
- Vector database.
- Chatbot UI.
- External connectors.
- Cross-repo indexing.
- Post-commit hooks.
- Automated index rebuild hooks.
- Agent-facing answer generation.

## 16. What Not To Build Yet

Do not build retrieval code yet.

Do not add embeddings, vector stores, UI surfaces, external connectors, post-commit hooks, or broad document-chat behavior. The v0.1 foundation is registry-first: schema, seed sources, exclusion policy, and review prompt.
