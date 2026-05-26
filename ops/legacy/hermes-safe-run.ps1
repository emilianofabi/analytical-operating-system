param(
    [Parameter(Mandatory=$true)]
    [string]$PromptFile,

    [Parameter(Mandatory=$true)]
    [string]$OutFile,

    [Parameter(Mandatory=$false)]
    [string]$ExpectedType = "markdown"
)

$Project = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $Project

if (!(Test-Path $PromptFile)) {
    Write-Host "FAIL: Prompt file does not exist: $PromptFile"
    exit 2
}

$OutDir = Split-Path $OutFile -Parent
if ($OutDir -and !(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

$Prompt = Get-Content $PromptFile -Raw

$Prompt = $Prompt + "`n`nOutput requirements:`n- Output only the requested artifact.`n- Use plain ASCII only.`n- Do not include terminal logs.`n- Do not include Hermes CLI messages.`n"

$PromptOneLine = $Prompt -replace "(`r`n|`n|`r)", "\n"

$HermesArgs = @(
    "--skills", "curriculum-orchestrator",
    "-z", $PromptOneLine,
    "chat"
)

$Output = & hermes @HermesArgs 2>&1
$Output | Set-Content -Path $OutFile -Encoding UTF8

& (Join-Path $PSScriptRoot "audit-artifact.ps1") -ArtifactFile $OutFile -ExpectedType $ExpectedType

if ($LASTEXITCODE -eq 0) {
    Write-Host "Saved clean output to $OutFile"
    exit 0
}

Write-Host "Output failed audit. See audits/reports."
exit 2
