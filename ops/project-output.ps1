param(
    [Parameter(Mandatory=$true)]
    [string]$Prompt,

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

$Output = hermes --skills curriculum-orchestrator -z $Prompt
$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved output to $OutFile"