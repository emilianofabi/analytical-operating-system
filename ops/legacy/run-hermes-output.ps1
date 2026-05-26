param(
    [Parameter(Mandatory=$true)]
    [string]$Prompt,

    [Parameter(Mandatory=$true)]
    [string]$OutFile
)

$Project = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $Project

hermes --skills curriculum-orchestrator -z $Prompt | Out-File -FilePath $OutFile -Encoding utf8

Write-Host "Saved Hermes output to $OutFile"