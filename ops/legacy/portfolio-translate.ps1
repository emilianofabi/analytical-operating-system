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

Consult:
- templates/portfolio/portfolio_case_study_template.md
- rubrics/synthesis_portfolio_quality.md
- learner-state/current_student_state.json
- modules/03_causal_inference.md
- modules/07_data_engineering_infrastructure.md

Artifact:
$ArtifactFile

Review:
$ReviewFile

Task:
Translate this artifact into a portfolio case study.

Requirements:
- Output clean Markdown only.
- Use plain ASCII only.
- Do not use curly quotes, em dashes, or special typography.
- Follow the portfolio case study template.
- Explain the project as evidence of analytical judgment.
- Include a resume bullet section.
- Include an interview story version.
- Include competencies demonstrated.
- Include limitations honestly.
"@

# Collapse newlines so Windows PowerShell does not split the prompt into command arguments.
$PromptOneLine = $Prompt -replace "(`r`n|`n|`r)", "\n"

# IMPORTANT: This Hermes install expects -z before the chat command.
$HermesArgs = @(
    "--skills", "curriculum-orchestrator",
    "-z", $PromptOneLine,
    "chat"
)

$Output = & hermes @HermesArgs 2>&1

$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved portfolio translation to $OutFile"