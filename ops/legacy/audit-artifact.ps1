param(
    [Parameter(Mandatory=$true)]
    [string]$ArtifactFile,

    [Parameter(Mandatory=$false)]
    [string]$ExpectedType = "markdown"
)

$Project = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $Project

New-Item -ItemType Directory -Force -Path ".\audits\reports" | Out-Null

if (!(Test-Path $ArtifactFile)) {
    Write-Host "FAIL: Artifact does not exist: $ArtifactFile"
    exit 2
}

$text = Get-Content $ArtifactFile -Raw
$issues = @()

if ([string]::IsNullOrWhiteSpace($text)) {
    $issues += "File is empty."
}

$badPatterns = @(
    "usage: hermes",
    "hermes: error",
    "invalid choice",
    "unrecognized arguments",
    "System.Management.Automation.RemoteException",
    "Traceback",
    "Exception:",
    "ParserError",
    "ParseException",
    "Unexpected token",
    "Cannot bind argument"
)

foreach ($pattern in $badPatterns) {
    if ($text.Contains($pattern)) {
        $issues += "Detected bad pattern: $pattern"
    }
}

if ($ExpectedType -eq "markdown") {
    if (-not $text.Contains("#")) {
        $issues += "Expected Markdown headings but found no heading marker."
    }
}

if ($ExpectedType -eq "json") {
    try {
        $null = $text | ConvertFrom-Json
    } catch {
        $issues += "Expected valid JSON but parsing failed."
    }
}

$status = "PASS"
if ($issues.Count -gt 0) {
    $status = "FAIL"
}

$baseName = [System.IO.Path]::GetFileNameWithoutExtension($ArtifactFile)
$reportFile = ".\audits\reports\$baseName.audit.md"

$issueText = "- None"
if ($issues.Count -gt 0) {
    $issueText = ($issues | ForEach-Object { "- " + $_ }) -join "`n"
}

$report = @"
# Artifact Audit Report

## Artifact

$ArtifactFile

## Expected Type

$ExpectedType

## Status

$status

## Issues

$issueText
"@

$report | Set-Content -Path $reportFile -Encoding UTF8

Write-Host "Audit status: $status"
Write-Host "Report saved to $reportFile"

if ($status -eq "FAIL") {
    exit 2
}

exit 0
