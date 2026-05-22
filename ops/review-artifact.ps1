param(
    [Parameter(Mandatory=$true)]
    [string]$ArtifactFile,

    [Parameter(Mandatory=$true)]
    [string]$RubricFiles,

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
- templates/reviews/artifact_review_template.md
- rubrics/_rubric_index.md
- $RubricFiles
- learner-state/current_student_state.json

Review this artifact:
$ArtifactFile

Requirements:
- Output clean Markdown only.
- Use plain ASCII only.
- Do not use curly quotes, em dashes, or special typography.
- Follow the artifact review template.
- Score the artifact using the relevant rubric criteria on the 1-4 scale.
- Cite specific evidence from the artifact for each score.
- Identify highest-leverage revisions.
- Recommend competency progress updates.
- Recommend an artifact registry update.
- Do not rewrite the artifact itself.
"@

$Output = hermes --skills curriculum-orchestrator -z $Prompt
$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved review to $OutFile"