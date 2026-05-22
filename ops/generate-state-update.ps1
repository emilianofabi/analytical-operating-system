param(
    [Parameter(Mandatory=$true)]
    [string]$ArtifactFile,

    [Parameter(Mandatory=$true)]
    [string]$ReviewFile,

    [Parameter(Mandatory=$true)]
    [string]$OutFile
)

$Project = "C:\Users\chefi\Projects\analytical-operating-system"
Set-Location $Project

[Console]::InputEncoding  = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$env:PYTHONUTF8 = "1"
$env:PYTHONIOENCODING = "utf-8"
$env:NO_COLOR = "1"
$env:TERM = "dumb"

$OutDir = Split-Path $OutFile -Parent
if ($OutDir -and !(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

$Prompt = @"
Use the curriculum-orchestrator skill.

Consult:
- learner-state/current_student_state.json
- learner-state/artifact_registry.schema.json
- learner-state/competency_progress.schema.json
- modules/_module_index.md
- rubrics/_rubric_index.md

Artifact:
$ArtifactFile

Review:
$ReviewFile

Task:
Generate a learner-state update proposal.

Requirements:
- Output clean JSON only.
- Use plain ASCII only.
- Do not use Markdown.
- Do not modify files directly.
- Include an artifact_registry entry for the revised artifact.
- Include competency_progress update suggestions.
- Include next_step recommendations.
- Include status recommendation: draft, reviewed, revised, portfolio_ready, or archived.
- Include rationale fields explaining why each update is recommended.
"@

# Collapse newlines to avoid Hermes CLI parsing problems in Windows PowerShell.
$PromptOneLine = $Prompt -replace "(`r`n|`n|`r)", "\n"

# IMPORTANT: Your Hermes install requires -z before the chat command.
$HermesArgs = @(
    "--skills", "curriculum-orchestrator",
    "-z", $PromptOneLine,
    "chat"
)

$Output = & hermes @HermesArgs 2>&1

$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved learner-state update proposal to $OutFile"