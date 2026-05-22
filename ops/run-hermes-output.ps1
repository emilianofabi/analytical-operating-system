param(
    [Parameter(Mandatory=$true)]
    [string]$Prompt,

    [Parameter(Mandatory=$true)]
    [string]$OutFile
)

$Project = "C:\Users\chefi\Projects\analytical-operating-system"
Set-Location $Project

hermes --skills curriculum-orchestrator -z $Prompt | Out-File -FilePath $OutFile -Encoding utf8

Write-Host "Saved Hermes output to $OutFile"