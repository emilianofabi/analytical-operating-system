param(
    [Parameter(Mandatory=$true)]
    [string]$ArtifactFile,

    [Parameter(Mandatory=$true)]
    [string]$ReviewFile,

    [Parameter(Mandatory=$true)]
    [string]$OutFile
)

$Project = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
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

Consult these files:
- learner-state/current_student_state.json
- templates/projects/combined_identification_data_generating_process_memo.md
- rubrics/assumption_awareness.md
- rubrics/causal_reasoning_quality.md

Original artifact:
$ArtifactFile

Review:
$ReviewFile

Task:
Revise the original artifact using the review.

Requirements:
- Output the revised artifact only.
- Output clean Markdown only.
- Use plain ASCII only.
- Do not use curly quotes, em dashes, or special typography.
- Preserve the original artifact purpose.
- Strengthen the treatment definition.
- Strengthen the outcome definition.
- Strengthen the estimand.
- Strengthen the counterfactual.
- Strengthen the identification assumptions.
- Strengthen the data-generating process.
- Strengthen the measurement pipeline.
- Strengthen the limitations.
- Do not add unsupported empirical claims.
- Do not invent data.
- Make the revised memo more portfolio-ready.
- End with a section titled Revision Note that explains what changed.
"@

$Output = & hermes --skills curriculum-orchestrator -z "$Prompt" chat 2>&1

$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved revised artifact to $OutFile"