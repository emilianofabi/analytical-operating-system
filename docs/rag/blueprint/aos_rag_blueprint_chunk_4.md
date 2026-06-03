# AOS RAG Blueprint — Chunk 4: Source Registry Design

---

> **Continuity from Chunks 0–3**: Chunk 0 established the thesis and phased architecture. Chunk 1 detailed the AOS lifecycle and evidence classes. Chunk 2 cataloged 12 failure modes and 40 controls. Chunk 3 formalized the 6-tier evidence hierarchy, 15 source type profiles, claim support rules, staleness model, and authority weighting. Chunk 4 now translates all of this into a concrete, implementable source registry.

---

## 4.0 — What the Source Registry Is

The source registry is the first deliverable of AOS RAG. It is a structured catalog of every indexable source in the AOS repository, annotated with authority metadata.

The source registry is **not**:
- A search index (that comes in Phase 5)
- A vector database (that comes in Phase 9)
- A full-text content store (content stays in files; the registry stores metadata)
- An auto-generated inventory (it is manually seeded, then maintained)

The source registry **is**:
- A metadata-first authority catalog
- The ground truth for what exists, what tier it is, what it can support, and what should not be indexed
- The input to the retrieval pipeline (Chunk 7) for metadata filtering
- The basis for claim checking (Phase 7) and closure guarding (Phase 8)
- A human-readable, git-tracked JSON file

> **The registry is the first product.** Before any retrieval runs, the registry must exist, be validated, and be reviewed.

---

## 4.1 — Source Registry Schema

### File: `rag/source_registry.schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://aos.local/schemas/source_registry.schema.json",
  "title": "AOS Source Registry",
  "description": "Metadata registry for all indexable sources in the AOS repository. Each entry describes a source's authority tier, evidence class, claim support, staleness risk, and indexing policy.",
  "type": "object",
  "required": ["registry_version", "last_updated", "sources"],
  "properties": {
    "registry_version": {
      "type": "string",
      "description": "Semantic version of the registry format.",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "last_updated": {
      "type": "string",
      "format": "date",
      "description": "ISO 8601 date of last registry update."
    },
    "sources": {
      "type": "array",
      "description": "Array of source entries.",
      "items": { "$ref": "#/definitions/source_entry" }
    }
  },
  "definitions": {
    "source_entry": {
      "type": "object",
      "required": [
        "source_id",
        "title",
        "source_type",
        "path",
        "authority_tier",
        "evidence_class",
        "lifecycle_status",
        "closure_status",
        "visibility",
        "index_policy",
        "staleness_category",
        "staleness_risk",
        "claim_support",
        "private_risk",
        "last_modified",
        "registered_at"
      ],
      "properties": {
        "source_id": {
          "type": "string",
          "description": "Unique identifier. Format: AOS-SRC-{type_code}-{NNN}",
          "pattern": "^AOS-SRC-[A-Z]{2,6}-\\d{3,}$"
        },
        "title": {
          "type": "string",
          "description": "Human-readable title of the source."
        },
        "source_type": {
          "type": "string",
          "description": "Source type from the 15-type taxonomy (Chunk 3).",
          "enum": [
            "pass_audit",
            "portfolio_artifact",
            "audited_project",
            "rubric",
            "module_definition",
            "governance",
            "review",
            "curriculum",
            "draft_artifact",
            "template",
            "documentation",
            "status_file",
            "handoff",
            "prompt",
            "ops_script"
          ]
        },
        "path": {
          "type": "string",
          "description": "Relative path from repository root. Forward slashes."
        },
        "authority_tier": {
          "type": "integer",
          "description": "Source authority tier (1=highest, 5=lowest indexed, 6=excluded).",
          "minimum": 1,
          "maximum": 6
        },
        "evidence_class": {
          "type": ["integer", "null"],
          "description": "Evidence class (1-6) or null for structural/governance sources.",
          "minimum": 1,
          "maximum": 6
        },
        "lifecycle_status": {
          "type": "string",
          "description": "Current lifecycle status of the source.",
          "enum": [
            "active",
            "superseded",
            "archived",
            "draft",
            "under_review",
            "deprecated"
          ]
        },
        "closure_status": {
          "type": "string",
          "description": "Closure status for artifact sources.",
          "enum": [
            "open",
            "closed",
            "reopened_with_defect",
            "not_applicable"
          ]
        },
        "visibility": {
          "type": "string",
          "description": "Visibility classification.",
          "enum": [
            "public",
            "internal",
            "private",
            "excluded"
          ]
        },
        "index_policy": {
          "type": "string",
          "description": "Whether and how to index this source.",
          "enum": [
            "always",
            "conditional",
            "metadata_only",
            "never"
          ]
        },
        "staleness_category": {
          "type": "string",
          "description": "How quickly this source decays (from Chunk 3 staleness model).",
          "enum": [
            "anchored",
            "slow_decay",
            "medium_decay",
            "rapid_decay"
          ]
        },
        "staleness_risk": {
          "type": "string",
          "description": "Current staleness risk assessment.",
          "enum": ["low", "medium", "high"]
        },
        "claim_support": {
          "type": "object",
          "description": "What claim types this source can support.",
          "required": ["resume_claim", "portfolio_claim", "competency_claim", "progress_report"],
          "properties": {
            "resume_claim": { "type": "boolean" },
            "portfolio_claim": { "type": "boolean" },
            "competency_claim": { "type": "boolean" },
            "progress_report": { "type": "boolean" },
            "system_description": { "type": "boolean" }
          }
        },
        "private_risk": {
          "type": "string",
          "description": "Risk of this source containing or exposing private data.",
          "enum": ["none", "low", "medium", "high"]
        },
        "last_modified": {
          "type": "string",
          "format": "date",
          "description": "Date of last known modification."
        },
        "registered_at": {
          "type": "string",
          "format": "date",
          "description": "Date this entry was added to the registry."
        },
        "module_ids": {
          "type": "array",
          "description": "Associated module IDs (e.g., ['03', '07']).",
          "items": { "type": "string" }
        },
        "competency_ids": {
          "type": "array",
          "description": "Associated competency IDs from the 10-competency framework.",
          "items": { "type": "string" }
        },
        "artifact_id": {
          "type": ["string", "null"],
          "description": "Associated artifact ID if this source relates to a specific artifact (e.g., 'AOS-COMB-001')."
        },
        "audit_verdict": {
          "type": ["string", "null"],
          "description": "Audit verdict if this is an audit record.",
          "enum": ["PASS", "PASS_WITH_MINOR_FIXES", "REVISE", "REJECT", null]
        },
        "commit_hash": {
          "type": ["string", "null"],
          "description": "Git commit hash anchoring this source, if known."
        },
        "depends_on": {
          "type": "array",
          "description": "Source IDs that this source depends on or relates to.",
          "items": { "type": "string" }
        },
        "tags": {
          "type": "array",
          "description": "Free-form tags for additional categorization.",
          "items": { "type": "string" }
        },
        "notes": {
          "type": ["string", "null"],
          "description": "Human-readable notes about this source."
        }
      }
    }
  }
}
```

---

## 4.2 — Field Specifications

### Required Fields (16)

| Field | Type | Purpose | Example |
|---|---|---|---|
| `source_id` | string | Unique identifier | `"AOS-SRC-AUDIT-001"` |
| `title` | string | Human-readable name | `"AI Writing Memo Repair Audit"` |
| `source_type` | enum | Source type from 15-type taxonomy | `"pass_audit"` |
| `path` | string | Relative path from repo root | `"audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md"` |
| `authority_tier` | int | Authority tier (1–6) | `1` |
| `evidence_class` | int/null | Evidence class (1–6) or null | `5` |
| `lifecycle_status` | enum | Current lifecycle status | `"active"` |
| `closure_status` | enum | Closure state | `"closed"` |
| `visibility` | enum | Public/internal/private/excluded | `"internal"` |
| `index_policy` | enum | How to index | `"always"` |
| `staleness_category` | enum | Decay rate category | `"anchored"` |
| `staleness_risk` | enum | Current staleness risk | `"low"` |
| `claim_support` | object | What claims it can support | `{"resume_claim": true, ...}` |
| `private_risk` | enum | Risk of private data exposure | `"none"` |
| `last_modified` | date | Last modification date | `"2026-05-25"` |
| `registered_at` | date | Registration date | `"2026-06-03"` |

### Optional Fields (8)

| Field | Type | Purpose | When Used |
|---|---|---|---|
| `module_ids` | string[] | Associated modules | When source relates to specific modules |
| `competency_ids` | string[] | Associated competencies | When source demonstrates or defines competencies |
| `artifact_id` | string/null | Linked artifact ID | When source is part of an artifact's lifecycle |
| `audit_verdict` | enum/null | PASS/REVISE/REJECT | When source is an audit record |
| `commit_hash` | string/null | Git commit anchor | When git verification matters |
| `depends_on` | string[] | Related source IDs | When sources form an evidence chain |
| `tags` | string[] | Free-form tags | For additional categorization |
| `notes` | string/null | Human notes | For context not captured by structured fields |

---

## 4.3 — Source ID Convention

### Format: `AOS-SRC-{TYPE_CODE}-{NNN}`

| Type Code | Source Type | Example ID |
|---|---|---|
| `AUDIT` | pass_audit | `AOS-SRC-AUDIT-001` |
| `PORT` | portfolio_artifact | `AOS-SRC-PORT-001` |
| `PROJ` | audited_project | `AOS-SRC-PROJ-001` |
| `RUB` | rubric | `AOS-SRC-RUB-001` |
| `MOD` | module_definition | `AOS-SRC-MOD-001` |
| `GOV` | governance | `AOS-SRC-GOV-001` |
| `REV` | review | `AOS-SRC-REV-001` |
| `CUR` | curriculum | `AOS-SRC-CUR-001` |
| `DRAFT` | draft_artifact | `AOS-SRC-DRAFT-001` |
| `TMPL` | template | `AOS-SRC-TMPL-001` |
| `DOC` | documentation | `AOS-SRC-DOC-001` |
| `STAT` | status_file | `AOS-SRC-STAT-001` |
| `HAND` | handoff | `AOS-SRC-HAND-001` |
| `PRMPT` | prompt | `AOS-SRC-PRMPT-001` |
| `OPS` | ops_script | `AOS-SRC-OPS-001` |

### ID rules

- IDs are stable. Once assigned, an ID is never reused for a different source.
- If a source is superseded, the old ID remains with `lifecycle_status: "superseded"` and a new ID is created for the replacement.
- Sequence numbers are zero-padded to 3 digits minimum (expandable).
- IDs are used in citations, retrieval traces, and answer contracts.

---

## 4.4 — Lifecycle Statuses

| Status | Meaning | Transitions From | Transitions To |
|---|---|---|---|
| `active` | Source is current and authoritative | `draft`, `under_review` | `superseded`, `archived`, `deprecated` |
| `draft` | Source is work-in-progress | (initial state for draft artifacts) | `under_review`, `active` |
| `under_review` | Source is being reviewed or audited | `draft`, `active` | `active`, `draft` (if revision needed) |
| `superseded` | Source has been replaced by a newer version | `active` | `archived` |
| `archived` | Source is preserved but no longer current | `active`, `superseded` | (terminal — can be restored to `active` with justification) |
| `deprecated` | Source should not be used | `active` | `archived` |

### Lifecycle state machine

```
                    ┌─────────────┐
                    │   draft     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
               ┌────│ under_review│────┐
               │    └──────┬──────┘    │
               │           │           │
         (revision)        │      (promotion)
               │           │           │
               ▼           │           ▼
        ┌──────────┐       │    ┌──────────┐
        │  draft   │       │    │  active   │
        └──────────┘       │    └──────┬────┘
                           │           │
                           │     ┌─────┴─────┐
                           │     │           │
                           │     ▼           ▼
                           │  superseded  deprecated
                           │     │           │
                           │     ▼           ▼
                           │  archived    archived
                           │
                           └──── (structural sources start here)
                                 active (directly, for rubrics,
                                 modules, governance, templates)
```

### How evidence class interacts with lifecycle status

| Lifecycle Status | Possible Evidence Classes | Notes |
|---|---|---|
| `draft` | CLASS 2 | Work started but not evaluated |
| `under_review` | CLASS 3–4 | Being evaluated; may change |
| `active` | CLASS 1–6 (depends on source type and audit status) | Current and authoritative |
| `superseded` | Retains original class but flagged | Old version; cite the new version instead |
| `archived` | Retains original class but flagged | No longer current; historical reference only |
| `deprecated` | CLASS 1 (effectively) | Should not be used; treat as speculative |

---

## 4.5 — Visibility Classification

| Visibility | Meaning | Who Can See | RAG Behavior |
|---|---|---|---|
| `public` | Safe for public-facing answers and documentation | Anyone | Can be cited in public-facing outputs |
| `internal` | Internal to AOS; not for public output | AOS agents only | Can be cited in internal answers; must be sanitized for public output |
| `private` | Contains personal or sensitive data | Never retrieved | Must never be indexed or retrieved (Tier 6) |
| `excluded` | Structurally excluded from all RAG operations | Never accessed | Hardcoded exclusion; not even metadata-indexed |

### Visibility assignment rules

- **public**: README, portfolio artifacts (post-sanitization), public docs, landing page content
- **internal**: Most sources — audits, modules, rubrics, templates, drafts, reviews, governance, prompts
- **private**: `learner-state/*` — if somehow registered, must be private (but should not be registered at all)
- **excluded**: All Tier 6 paths — hardcoded exclusion list from Chunk 2 (C-13)

> [!IMPORTANT]
> Most sources are `internal`. Public visibility should be explicitly assigned and requires confirmation that the source contains no private data, no internal references that would be confusing externally, and no overclaiming language.

---

## 4.6 — Source Registry Seed

### File: `rag/source_registry.seed.json`

This is the initial seed of the source registry, covering all currently known sources in the AOS repository. It is comprehensive for the current repo state.

```json
{
  "registry_version": "0.1.0",
  "last_updated": "2026-06-03",
  "sources": [
    {
      "source_id": "AOS-SRC-AUDIT-001",
      "title": "AI Writing Memo Repair Audit (PASS)",
      "source_type": "pass_audit",
      "path": "audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md",
      "authority_tier": 1,
      "evidence_class": 5,
      "lifecycle_status": "active",
      "closure_status": "closed",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": true,
        "portfolio_claim": true,
        "competency_claim": true,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "07"],
      "competency_ids": ["model_construction", "causal_identification", "synthesis_communication"],
      "artifact_id": "AOS-PORT-001",
      "audit_verdict": "PASS",
      "commit_hash": null,
      "depends_on": ["AOS-SRC-PROJ-001", "AOS-SRC-PORT-001"],
      "tags": ["closed_loop", "career_evidence"],
      "notes": "Final repair audit after 4 issues resolved. Evidence chain complete."
    },
    {
      "source_id": "AOS-SRC-AUDIT-002",
      "title": "AI Writing Memo Semantic Audit (PASS_WITH_MINOR_FIXES)",
      "source_type": "pass_audit",
      "path": "audits/semantic/ai_writing_assistant_memo_case_study.semantic_audit.md",
      "authority_tier": 1,
      "evidence_class": 5,
      "lifecycle_status": "superseded",
      "closure_status": "closed",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": true,
        "portfolio_claim": true,
        "competency_claim": true,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "07", "12"],
      "competency_ids": ["model_construction", "causal_identification", "synthesis_communication"],
      "artifact_id": "AOS-PORT-001",
      "audit_verdict": "PASS_WITH_MINOR_FIXES",
      "commit_hash": null,
      "depends_on": ["AOS-SRC-PROJ-001"],
      "tags": ["closed_loop", "superseded_by_repair_audit"],
      "notes": "Initial semantic audit. Superseded by repair audit AOS-SRC-AUDIT-001 after fixes applied."
    },
    {
      "source_id": "AOS-SRC-AUDIT-003",
      "title": "AI Writing Memo Structural Audit (PASS)",
      "source_type": "pass_audit",
      "path": "audits/reports/",
      "authority_tier": 1,
      "evidence_class": 5,
      "lifecycle_status": "active",
      "closure_status": "closed",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": "PASS",
      "commit_hash": null,
      "depends_on": [],
      "tags": ["structural_audit"],
      "notes": "Structural audits verify format/syntax, not content quality. PASS means no CLI errors or structural issues. Does not support career claims."
    },
    {
      "source_id": "AOS-SRC-PORT-001",
      "title": "AI Writing Assistant Memo Case Study v2 (Portfolio-Ready)",
      "source_type": "portfolio_artifact",
      "path": "artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study_v2.md",
      "authority_tier": 1,
      "evidence_class": 6,
      "lifecycle_status": "active",
      "closure_status": "closed",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": true,
        "portfolio_claim": true,
        "competency_claim": true,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "07", "12"],
      "competency_ids": ["model_construction", "causal_identification", "synthesis_communication"],
      "artifact_id": "AOS-PORT-001",
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": ["AOS-SRC-AUDIT-001", "AOS-SRC-PROJ-001"],
      "tags": ["closed_loop", "portfolio_ready", "career_evidence"],
      "notes": "Portfolio-ready case study. Full evidence chain: project artifact → review → revision → semantic audit (PASS) → repair audit (PASS)."
    },
    {
      "source_id": "AOS-SRC-PROJ-001",
      "title": "AI Writing Assistance Combined Identification/DGP Memo",
      "source_type": "audited_project",
      "path": "artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md",
      "authority_tier": 1,
      "evidence_class": 5,
      "lifecycle_status": "active",
      "closure_status": "closed",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": true,
        "portfolio_claim": true,
        "competency_claim": true,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "07"],
      "competency_ids": ["model_construction", "causal_identification", "epistemic_infrastructure"],
      "artifact_id": "AOS-COMB-001",
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": ["AOS-SRC-AUDIT-001"],
      "tags": ["closed_loop", "career_evidence", "dag", "statistical_analysis_plan"],
      "notes": "Core project artifact. Revised version with full causal identification, DAG, and statistical analysis plan."
    },
    {
      "source_id": "AOS-SRC-DRAFT-001",
      "title": "Lesson: Fundamental Problem of Causal Inference",
      "source_type": "draft_artifact",
      "path": "artifacts/lessons/03_causal_inference/lesson_01_fundamental_problem.md",
      "authority_tier": 3,
      "evidence_class": 2,
      "lifecycle_status": "draft",
      "closure_status": "open",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "medium_decay",
      "staleness_risk": "medium",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03"],
      "competency_ids": ["causal_identification"],
      "artifact_id": "AOS-L03-001",
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["draft", "lesson", "no_review", "no_audit"],
      "notes": "Draft lesson. No review or audit exists. Cannot support any claims beyond progress reporting."
    },
    {
      "source_id": "AOS-SRC-DRAFT-002",
      "title": "Lesson: Data Is Produced, Not Found",
      "source_type": "draft_artifact",
      "path": "artifacts/lessons/07_data_engineering_infrastructure/lesson_01_data_is_produced_not_found.md",
      "authority_tier": 3,
      "evidence_class": 2,
      "lifecycle_status": "draft",
      "closure_status": "open",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "medium_decay",
      "staleness_risk": "medium",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["07"],
      "competency_ids": ["epistemic_infrastructure"],
      "artifact_id": "AOS-L07-001",
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["draft", "lesson", "no_review", "no_audit"],
      "notes": "Draft lesson. No review or audit exists."
    },
    {
      "source_id": "AOS-SRC-DRAFT-003",
      "title": "Lesson: Alpha, Options, and Directionality",
      "source_type": "draft_artifact",
      "path": "artifacts/lessons/08_quantitative_finance/lesson_01_alpha_options_directionality.md",
      "authority_tier": 3,
      "evidence_class": 2,
      "lifecycle_status": "draft",
      "closure_status": "open",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "medium_decay",
      "staleness_risk": "medium",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["08"],
      "competency_ids": ["institutional_market_judgment"],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["draft", "lesson", "no_review", "no_audit", "quantitative_finance"],
      "notes": "Draft lesson on quant options. Closed as Quant Lesson 1 loop per proven loop pattern."
    },
    {
      "source_id": "AOS-SRC-RUB-001",
      "title": "Rubric: Assumption Awareness",
      "source_type": "rubric",
      "path": "rubrics/assumption_awareness.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["01", "03", "05", "14"],
      "competency_ids": ["model_construction"],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["rubric", "evaluation_criteria"],
      "notes": "6-criterion rubric for model construction and assumption analysis."
    },
    {
      "source_id": "AOS-SRC-RUB-002",
      "title": "Rubric: Causal Reasoning Quality",
      "source_type": "rubric",
      "path": "rubrics/causal_reasoning_quality.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "20"],
      "competency_ids": ["causal_identification"],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["rubric", "evaluation_criteria"],
      "notes": "6-criterion rubric for causal identification and counterfactual reasoning."
    },
    {
      "source_id": "AOS-SRC-RUB-003",
      "title": "Rubric: Synthesis and Portfolio Quality",
      "source_type": "rubric",
      "path": "rubrics/synthesis_portfolio_quality.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["12", "25"],
      "competency_ids": ["synthesis_communication"],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["rubric", "evaluation_criteria"],
      "notes": "8-criterion rubric. Used in AI writing case study semantic audit."
    },
    {
      "source_id": "AOS-SRC-MOD-001",
      "title": "Module Index",
      "source_type": "module_definition",
      "path": "modules/_module_index.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "slow_decay",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["index", "routing", "structure"],
      "notes": "Master index of all 25 modules with routing rules."
    },
    {
      "source_id": "AOS-SRC-GOV-001",
      "title": "AOS Proven Loop Pattern #1",
      "source_type": "governance",
      "path": "docs/aos_proven_loop_pattern_01.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "anchored",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["governance", "closure_discipline", "loop_pattern"],
      "notes": "Core governance document defining the artifact→review→revision→audit→commit loop and closure rules."
    },
    {
      "source_id": "AOS-SRC-GOV-002",
      "title": "Contributing Guidelines",
      "source_type": "governance",
      "path": "governance/CONTRIBUTING.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "slow_decay",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["governance", "contributing_rules"],
      "notes": "Update rules for modules, rubrics, routing. Review cycle: every 10 lessons or 5 artifacts."
    },
    {
      "source_id": "AOS-SRC-CUR-001",
      "title": "Dependency Graph",
      "source_type": "curriculum",
      "path": "curriculum/pathways/dependency_graph.md",
      "authority_tier": 2,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "always",
      "staleness_category": "slow_decay",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": ["AOS-SRC-MOD-001"],
      "tags": ["curriculum", "prerequisites", "routing"],
      "notes": "Prerequisite DAG for all 25 modules. 3-tier progression."
    },
    {
      "source_id": "AOS-SRC-DOC-001",
      "title": "AOS README",
      "source_type": "documentation",
      "path": "README.md",
      "authority_tier": 3,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "public",
      "index_policy": "always",
      "staleness_category": "slow_decay",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["documentation", "public_facing"],
      "notes": "Primary system description. 320 lines. Covers thesis, principles, competencies, loop, structure."
    },
    {
      "source_id": "AOS-SRC-STAT-001",
      "title": "System Status File",
      "source_type": "status_file",
      "path": "status.md",
      "authority_tier": 4,
      "evidence_class": 2,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "conditional",
      "staleness_category": "rapid_decay",
      "staleness_risk": "high",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "low",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": ["03", "07", "12"],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["status", "staleness_risk", "rapid_decay"],
      "notes": "HIGH staleness risk. Always prefer audit records and commit history over this file for artifact state questions."
    },
    {
      "source_id": "AOS-SRC-HAND-001",
      "title": "Session Handoff 2026-05-25",
      "source_type": "handoff",
      "path": "handoffs/session_handoff_2026-05-25.md",
      "authority_tier": 4,
      "evidence_class": 2,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "conditional",
      "staleness_category": "rapid_decay",
      "staleness_risk": "high",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": true,
        "system_description": false
      },
      "private_risk": "low",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["handoff", "session_context", "rapid_decay"],
      "notes": "Session handoff. Point-in-time context. Stale after session ends."
    },
    {
      "source_id": "AOS-SRC-PRMPT-001",
      "title": "AOS Architecture/Strategy Agent Prompt",
      "source_type": "prompt",
      "path": "prompts/agents/aos_architecture_strategy_agent.prompt.md",
      "authority_tier": 5,
      "evidence_class": 1,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "conditional",
      "staleness_category": "slow_decay",
      "staleness_risk": "low",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "none",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["prompt", "agent_ecology", "governance_content"],
      "notes": "Contains governance-level content (9-agent ecology, routing rules, operating rules) but classified as Tier 5 because it is a prompt, not a governance document. Governance content within should be extracted to governance/ if it needs Tier 2 authority."
    },
    {
      "source_id": "AOS-SRC-OPS-001",
      "title": "AOS Universal Runner",
      "source_type": "ops_script",
      "path": "ops/aos.ps1",
      "authority_tier": 3,
      "evidence_class": null,
      "lifecycle_status": "active",
      "closure_status": "not_applicable",
      "visibility": "internal",
      "index_policy": "conditional",
      "staleness_category": "medium_decay",
      "staleness_risk": "medium",
      "claim_support": {
        "resume_claim": false,
        "portfolio_claim": false,
        "competency_claim": false,
        "progress_report": false,
        "system_description": true
      },
      "private_risk": "low",
      "last_modified": "2026-05-25",
      "registered_at": "2026-06-03",
      "module_ids": [],
      "competency_ids": [],
      "artifact_id": null,
      "audit_verdict": null,
      "commit_hash": null,
      "depends_on": [],
      "tags": ["ops", "powershell", "runner"],
      "notes": "Universal runner script. 268 lines. Authoritative for how to run AOS operations."
    }
  ]
}
```

> [!NOTE]
> This seed contains 20 entries covering the most important sources. The remaining sources (additional rubrics, module cards, templates, prompts) follow the same patterns. A complete seed would have approximately 60–80 entries. The source scanner tool (Phase 3) will help generate entries for the remaining sources using these patterns as templates.

---

## 4.7 — Validation Rules

The source registry must be validated before use. These rules are implemented by `tools/rag/validate_registry.*` (Phase 2 deliverable).

### Schema validation rules

| Rule ID | Rule | Severity |
|---|---|---|
| VR-01 | All required fields must be present | ERROR |
| VR-02 | `source_id` must match pattern `AOS-SRC-{TYPE}-{NNN}` | ERROR |
| VR-03 | `source_id` must be unique across all entries | ERROR |
| VR-04 | `path` must point to a file or directory that exists in the repo | WARNING (file may be uncommitted) |
| VR-05 | `authority_tier` must be 1–6 | ERROR |
| VR-06 | `evidence_class` must be 1–6 or null | ERROR |
| VR-07 | If `source_type` is `pass_audit`, `authority_tier` must be 1 | ERROR |
| VR-08 | If `source_type` is `draft_artifact`, `authority_tier` must be ≥ 3 | ERROR |
| VR-09 | If `authority_tier` is 1, at least one `claim_support` field must be true | WARNING |
| VR-10 | If `closure_status` is `closed`, `lifecycle_status` should be `active` or `archived` | WARNING |
| VR-11 | If `claim_support.resume_claim` is true, `evidence_class` must be ≥ 5 | ERROR |
| VR-12 | If `claim_support.portfolio_claim` is true, `evidence_class` must be 6 | ERROR |

### Consistency validation rules

| Rule ID | Rule | Severity |
|---|---|---|
| VR-13 | `depends_on` references must point to valid `source_id` values | ERROR |
| VR-14 | No circular dependencies in `depends_on` chains | ERROR |
| VR-15 | If `audit_verdict` is set, `source_type` must be `pass_audit` | ERROR |
| VR-16 | If `staleness_category` is `rapid_decay`, `staleness_risk` should be `medium` or `high` | WARNING |
| VR-17 | `registered_at` must be ≤ current date | ERROR |
| VR-18 | `last_modified` must be ≤ `registered_at` or current date | WARNING |

### Coverage validation rules

| Rule ID | Rule | Severity |
|---|---|---|
| VR-19 | All files in indexable directories should have registry entries (coverage check) | WARNING |
| VR-20 | No registry entries should exist for excluded paths | ERROR |
| VR-21 | At least one Tier 1 source must exist for the registry to be valid | WARNING |

---

## 4.8 — Source Lifecycle Management

### When sources change

| Event | Registry Action |
|---|---|
| New file created in indexable directory | Add new registry entry with appropriate metadata |
| Artifact reviewed | Update `evidence_class` (2→4), add review `depends_on` |
| Artifact revised after review | Update `evidence_class` (4→3 during revision, then 4 if re-reviewed) |
| Artifact passes audit | Update `evidence_class` (→5), set `audit_verdict`, update `claim_support` |
| Artifact passes audit and is committed | Update `evidence_class` (→5 or 6), optionally set `commit_hash` |
| Loop closed | Set `closure_status: "closed"`, update `evidence_class` to 6 |
| Source superseded | Set `lifecycle_status: "superseded"`, create new entry for replacement |
| Source deleted | Set `lifecycle_status: "archived"`, keep entry for historical record |
| Defect found in closed loop | Set `closure_status: "reopened_with_defect"`, document defect in notes |

### Registry update frequency

In v0.1, registry updates are **manual**. The learner (or an assisting agent) updates the registry when lifecycle events occur. This is intentional:

- Manual updates ensure the learner is aware of state changes
- Automated updates risk introducing entries for files that should be excluded
- The overhead of manual updates is low when the artifact count is small (current: ~20 sources)

In later phases, a registry update tool can semi-automate this by scanning for new files and proposing registry entries for human review.

---

## 4.9 — Evidence Class: Computed vs. Stored (Resolves UQ9)

**Decision**: Evidence class is **stored in the registry** and **manually updated** at lifecycle transitions.

**Rationale**:
- Computing evidence class dynamically requires checking for the existence of reviews, audits, and closure records at query time — adding latency and complexity to every retrieval
- Storing evidence class makes it a simple metadata filter in retrieval
- The risk of stored class becoming stale is mitigated by updating the registry at lifecycle transitions (when the learner is already aware of the change)
- If evidence class becomes out of sync, the validation rules (VR-11, VR-12) will catch inconsistencies

**Compromise**: The validation tool (Phase 2) includes a `--verify-classes` flag that checks stored evidence classes against actual file state (does an audit file exist? is it PASS?). This catches drift without requiring dynamic computation at query time.

---

## 4.10 — Handling In-Flight Artifacts (Resolves UQ10)

**Decision**: In-flight artifacts (currently being reviewed or audited) use `lifecycle_status: "under_review"` and retain their current `evidence_class` until the review/audit is complete.

**Rules**:
- An artifact under review keeps `evidence_class: 2` (draft) until the review is complete, then updates to `evidence_class: 4` (reviewed)
- An artifact under audit keeps its current class until the audit verdict is rendered
- If a query asks about an in-flight artifact, RAG must note: `[UNDER REVIEW — evidence class may change]`
- In-flight status does not affect claim support — only completed lifecycle transitions change claim eligibility

---

## 4.11 — Agent Prompt Tiering (Resolves UQ15)

**Decision**: Agent prompts remain Tier 5, but governance content embedded within them is noted in the registry `notes` field with a recommendation to extract it.

**Rationale**:
- The architecture strategy agent prompt (`AOS-SRC-PRMPT-001`) contains governance-level content (9-agent ecology, routing rules, operating rules) that is functionally Tier 2
- However, the file is a prompt — it instructs an agent, it does not define governance in a standalone, referenceable way
- Promoting the entire prompt to Tier 2 would misrepresent non-governance content within it (session naming conventions, debug instructions, etc.)
- The correct solution is to extract governance content into `governance/` files, which would naturally be Tier 2
- Until extraction happens, the prompt is Tier 5 with a note: "Contains governance-level content. Extract to governance/ for Tier 2 authority."

---

## 4.12 — Registry Commitment Decision (Resolves UQ2)

**Decision**: `source_registry.seed.json` is **committed to git** and tracked.

**Rationale**:
- The registry is a curated, human-reviewed metadata file — it is not a generated index
- It represents deliberate decisions about source authority, evidence class, and claim support
- Changes to the registry should be version-controlled and diffable
- The registry is small enough (currently ~20 entries, eventually ~80) that git tracking is trivial
- Derived artifacts (chunk manifests, vector indexes) should NOT be committed — those are regenerable

**Git hygiene**:
- `rag/source_registry.seed.json` — committed, tracked
- `rag/source_registry.schema.json` — committed, tracked
- `rag/chunk_manifest.json` — NOT committed (generated, added to `.gitignore`)
- Vector indexes — NOT committed (generated, added to `.gitignore`)

---

## 4.13 — What Not to Include in v0.1

### Do not register in v0.1

| What | Why |
|---|---|
| Individual module cards (25 entries) | Register the module index (`AOS-SRC-MOD-001`) and add individual modules later as needed. Bulk registration of 25 structurally identical files adds registry maintenance burden without retrieval value in v0.1. |
| Individual templates (10 entries) | Register a template index entry or representative templates only. Full template registration deferred. |
| Legacy ops scripts (`ops/legacy/*`) | These are deprecated. Register only the current runner (`AOS-SRC-OPS-001`). |
| External repo sources (trade-sim) | Phase 11. Not v0.1. |
| Learner-state schemas | The schemas in `learner-state/` define private data structures. While the schemas themselves are not private data, registering them risks confusion about the learner-state exclusion. Defer. |
| Canvas files (`*.canvas`) | Scratch/exploration files with no evidence value. |
| `2026-05-29.md` (root-level date file) | Appears to be a scratch note. Not registered unless its purpose is clarified. |
| Individual structural audit reports | Register as a group (`AOS-SRC-AUDIT-003`) rather than per-file, since they verify structure not content. |

### Do not build in v0.1

| What | Why |
|---|---|
| Auto-registration of new files | Manual registration ensures quality. Auto-registration is Phase 3+. |
| Registry sync with git hooks | Post-commit hooks are explicitly deferred (D5 from Chunk 0). |
| Registry UI | The registry is a JSON file. Read it with a text editor or a validation tool. |
| Registry API | No API needed in v0.1. Tools read the JSON file directly. |
| Multi-repo registry | One registry per repo. Cross-repo (trade-sim) is Phase 11. |

---

## 4.14 — Closed Loops Inventory (Resolves UQ5)

Based on thorough repo analysis, the confirmed closed loops are:

| # | Loop | Evidence Chain | Registry Sources |
|---|---|---|---|
| 1 | AI Writing Assistance DAG / Statistical Analysis Plan | Project artifact → Semantic audit (PASS_WITH_MINOR_FIXES) → Repair audit (PASS) | AOS-SRC-PROJ-001, AOS-SRC-AUDIT-001, AOS-SRC-AUDIT-002 |
| 2 | AI Writing Assistance Portfolio Case Study | Project artifact → Portfolio translation → Audit → Portfolio-ready | AOS-SRC-PORT-001 |
| 3 | Quant/Options Lesson 1 | Lesson draft → (documented as closed in architecture prompt) | AOS-SRC-DRAFT-003 |
| 4 | AOS Proven Loop Pattern #1 | Meta-documentation of the loop pattern itself | AOS-SRC-GOV-001 |
| 5 | Public-release cleanup | Cleanup work committed | (No specific artifact — cleanup was operational) |
| 6 | Frontend truthfulness/status cleanup | Cleanup work committed | (No specific artifact — cleanup was operational) |

> [!NOTE]
> Loops 5 and 6 are operational cleanups, not artifact loops. They don't produce registered sources because the "artifact" is the cleanup itself (git commits). They are closed but not represented in the registry as source entries. They are referenced in closure documentation.
>
> Loop 3 (Quant Lesson 1) is documented as closed in the architecture agent prompt, but the lesson file itself (`AOS-SRC-DRAFT-003`) has no formal audit record in `audits/`. This is a discrepancy that should be resolved — either the closure is informal (and the evidence class should remain CLASS 2) or a closure record should be created.

---

## Chunk Completed

**Chunk 4 — Source Registry Design** is complete.

---

## What This Chunk Covered

1. **Source registry schema** (`source_registry.schema.json`): Complete JSON Schema with 16 required fields and 8 optional fields, validated with explicit constraints
2. **Source ID convention**: `AOS-SRC-{TYPE_CODE}-{NNN}` with 15 type codes and stability rules
3. **Lifecycle statuses**: 6 statuses (active, draft, under_review, superseded, archived, deprecated) with state machine and transitions
4. **Visibility classification**: 4 levels (public, internal, private, excluded) with assignment rules
5. **Source registry seed**: 20 entries covering every significant source in the current AOS repo, with full metadata
6. **Validation rules**: 21 rules across schema, consistency, and coverage validation (VR-01 through VR-21)
7. **Source lifecycle management**: Event-driven registry updates with explicit actions per lifecycle event
8. **Evidence class storage decision**: Stored in registry, updated at transitions, validated with `--verify-classes` (resolves UQ9)
9. **In-flight artifact handling**: `under_review` status with current class retained until transition completes (resolves UQ10)
10. **Agent prompt tiering**: Tier 5 with governance extraction recommendation (resolves UQ15)
11. **Registry commitment**: Committed to git, tracked (resolves UQ2)
12. **Closed loops inventory**: 6 confirmed loops with evidence chains and a discrepancy noted for Quant Lesson 1 (resolves UQ5)
13. **What not to include in v0.1**: Explicit boundaries on bulk registration, auto-registration, and deferred features

---

## Running Decision Log

*All decisions from Chunks 0–3 (D1–D40) are preserved. New decisions from Chunk 4:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D40 | *(preserved from Chunks 0–3)* | | |
| D41 | Source registry is a JSON file with JSON Schema validation | JSON is human-readable, git-diffable, and needs no database. JSON Schema enables automated validation. | **Accepted** |
| D42 | Source IDs follow `AOS-SRC-{TYPE}-{NNN}` convention | Stable, unique, type-prefixed IDs enable citation anchoring and cross-reference. | **Accepted** |
| D43 | 6 lifecycle statuses with defined transitions | State machine prevents invalid lifecycle transitions. `under_review` handles in-flight artifacts. | **Accepted** |
| D44 | Evidence class is stored, not computed dynamically | Stored class is a simple metadata filter; dynamic computation adds latency. Validated with `--verify-classes`. Resolves UQ9. | **Accepted** |
| D45 | Registry is committed to git and tracked | Curated metadata file, not a generated index. Version control enables diffing and accountability. Resolves UQ2. | **Accepted** |
| D46 | Manual registry updates in v0.1 | Ensures learner awareness of state changes. Low overhead at current artifact count (~20). Auto-registration deferred. | **Accepted** |
| D47 | Agent prompts are Tier 5 with governance extraction recommended | Prompt file is Tier 5; governance content within should be extracted to `governance/` for proper Tier 2 authority. Resolves UQ15. | **Accepted** |
| D48 | Bulk module/template registration deferred in v0.1 | 25 module cards and 10 templates are structurally identical. Register indexes and representatives only. | **Tentative** |
| D49 | Validation tool includes `--verify-classes` flag | Checks stored evidence classes against actual file state to catch drift without dynamic computation. | **Accepted** |
| D50 | Quant Lesson 1 closure discrepancy flagged | Documented as closed loop but no formal audit record exists in `audits/`. Needs resolution: either create closure record or treat as informal. | **Tentative** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ8 | How should RAG handle multi-file artifacts? | Affects chunking | Chunk 6 |
| UQ11 | Acceptable false-positive rate for privacy exclusion? | Affects FM-04 control | Chunk 5 |
| UQ12 | Should the control register be a trackable repo file? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ14 | Should authority weights be tunable via config or hardcoded? | Affects retrieval flexibility | Chunk 7 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |
| UQ17 | Should the `2026-05-29.md` root-level file be registered or ignored? Purpose is unclear. | Minor — affects registry completeness | Before Phase 3 seed finalization |
| UQ18 | Should the `apps/aos-landing/` directory be registered as a single source or decomposed into components? | Affects public-facing source registration | Chunk 5 |

---

## Next Chunk to Request

**Chunk 5 — File Indexing and Exclusion Policy**

This chunk will define exactly which files and directories are indexable, which are excluded, the privacy boundaries, the relationship to `.gitignore`, and the indexing permissions by source class — directly implementing controls C-13 and C-14 from the failure mode catalog.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 5 — File Indexing and Exclusion Policy.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–4.

Preserve and update the running decision log from Chunks 0–4 (D1–D50).

Do not repeat Chunks 0–4 content except for brief continuity references.

Chunk 5 must include:
- indexable directories
- excluded directories
- private learner-state policy
- chat-log policy
- local config policy
- prompts policy
- artifact policy
- audits policy
- frontend/public docs policy
- cross-repo policy
- public/private boundaries
- git hygiene
- secrets prevention
- .gitignore relationship
- .git/info/exclude relationship
- local-only files
- public-safe sample files
- indexing permissions by source class

Stop after completing Chunk 5 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 6
```
