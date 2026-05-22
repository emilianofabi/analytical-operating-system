param(
    [Parameter(Mandatory=$true)]
    [string]$ArtifactFile,

    [Parameter(Mandatory=$true)]
    [string]$ExpectedTemplate,

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
Use the curriculum-auditor skill.

Audit this artifact:
$ArtifactFile

Expected template or artifact standard:
$ExpectedTemplate

Consult:
- modules/_module_index.md
- rubrics/_rubric_index.md
- learner-state/current_student_state.json
- templates/portfolio/portfolio_case_study_template.md
- rubrics/synthesis_portfolio_quality.md

Task:
Produce a semantic audit report.

Check:
- Does the artifact follow the expected template?
- Does it contain Hermes CLI errors or PowerShell traces?
- Does it make a clear claim?
- Does it explain method and evidence?
- Does it include assumptions and limitations?
- Does it avoid unsupported empirical claims?
- Does it connect to the correct modules?
- Does it demonstrate portfolio value?
- Does it include resume bullets and interview story if expected?
- Is it ready for portfolio use?

Use one status:
PASS
PASS_WITH_MINOR_FIXES
FAIL_REPAIRABLE
FAIL_REGENERATE
FAIL_MANUAL_REVIEW

Output clean Markdown only.
Use plain ASCII only.
"@

$PromptOneLine = $Prompt -replace "(`r`n|`n|`r)", "\n"

$HermesArgs = @(
    "--skills", "curriculum-auditor",
    "-z", $PromptOneLine,
    "chat"
)

$Output = & hermes @HermesArgs 2>&1
$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved semantic audit to $OutFile"