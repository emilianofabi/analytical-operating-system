# Data Pipeline Review Template

## Pipeline Name

## Purpose

What decision, analysis, model, dashboard, or system does this pipeline support?

## Source Systems

| Source | Data Type | Owner | Refresh Cadence | Risk |
|---|---|---|---|---|
|  |  |  |  |  |

## Data-Generating Process

How is the data produced before ingestion?

## Schema

Describe core tables, fields, keys, and row-level meaning.

## Transformations

| Step | Transformation | Assumption | Failure Mode |
|---|---|---|---|
|  |  |  |  |

## Validation Checks

| Check | Purpose | Failure Action |
|---|---|---|
|  |  |

## Observability

Describe logs, metrics, alerts, lineage, freshness checks, and dashboards.

## Failure Modes

- missing data
- duplicate data
- late data
- schema drift
- unit changes
- broken joins
- partial runs
- stale outputs
- dependency failure
- access failure

## Governance

Describe ownership, access control, documentation, auditability, retention, and incident response.

## Production Readiness

Choose one:

- exploratory only
- prototype
- production candidate
- production-ready
- needs redesign

## Revision Priorities

1. 
2. 
3. 
