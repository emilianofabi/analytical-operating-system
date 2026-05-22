# Contribution Protocol

This document defines how modules, rubrics, templates, and curriculum architecture should be updated.

## Versioning

Use semantic versioning.

Current version: v0.2.0

## Update Rules

### Module Updates

Any module update must preserve:

1. module purpose;
2. governing principles;
3. core questions;
4. competencies;
5. prerequisites;
6. lesson structure;
7. assessment artifacts;
8. rubric alignment.

### Rubric Updates

Any rubric update must specify:

1. competency assessed;
2. artifact types;
3. criteria;
4. performance descriptors;
5. evidence requirements;
6. calibration protocol.

### Routing Rule Updates

Any routing update must specify:

1. triggering user request type;
2. primary module;
3. secondary modules;
4. prerequisite checks;
5. expected artifact or output.

### Review Cycle

Curriculum routing and module quality should be reviewed after every 10 generated lessons or 5 assessed artifacts.

## Change Record

Every substantive change should be recorded in governance/CHANGELOG.md.

## Content Purity Rule

Curriculum content files should not contain operational commands.

Operational commands belong in:

ops/

Instructional architecture belongs in:

curriculum/

Module cards belong in:

modules/
