param(
    [Parameter(Mandatory=$true)]
    [string]$PromptFile,

    [Parameter(Mandatory=$true)]
    [string]$OutFile,

    [Parameter(Mandatory=$false)]
    [string]$ExpectedType = "markdown",

    [Parameter(Mandatory=$false)]
    [string]$Skill = "curriculum-orchestrator",

    [Parameter(Mandatory=$false)]
    [int]$Retries = 1,

    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$ErrorActionPreference = "Stop"

function Get-AosRepoRoot {
    $scriptDir = Split-Path -Parent $MyInvocation.ScriptName
    if ([string]::IsNullOrWhiteSpace($scriptDir)) {
        $scriptDir = Get-Location
    }
    return (Resolve-Path (Join-Path $scriptDir "..")).Path
}

function New-AosDirectory {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path
    )

    if (!(Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function ConvertTo-AosSafeName {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Value
    )

    $name = $Value -replace "[^A-Za-z0-9_.-]", "_"
    if ([string]::IsNullOrWhiteSpace($name)) {
        return "artifact"
    }
    return $name
}

function Write-AosUtf8File {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path,

        [Parameter(Mandatory=$true)]
        [AllowEmptyString()]
        [string]$Content
    )

    $encoding = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

function Test-AosArtifact {
    param(
        [Parameter(Mandatory=$true)]
        [string]$ArtifactFile,

        [Parameter(Mandatory=$true)]
        [string]$ExpectedType
    )

    $issues = @()

    if (!(Test-Path $ArtifactFile)) {
        $issues += "File does not exist."
    }
    else {
        $text = Get-Content -Path $ArtifactFile -Raw

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
            "ParserError"
        )

        foreach ($pattern in $badPatterns) {
            if ($text -match [regex]::Escape($pattern)) {
                $issues += "Found bad pattern: $pattern"
            }
        }

        $normalizedType = $ExpectedType.ToLowerInvariant()

        if ($normalizedType -eq "json") {
            try {
                $null = $text | ConvertFrom-Json
            }
            catch {
                $issues += "Invalid JSON when ExpectedType is json: $($_.Exception.Message)"
            }
        }

        if ($normalizedType -eq "markdown") {
            $hasHeading = $false
            $lines = $text -split "`r?`n"
            foreach ($line in $lines) {
                if ($line -match "^#\s+\S") {
                    $hasHeading = $true
                    break
                }
            }
            if (!$hasHeading) {
                $issues += "Missing Markdown heading when ExpectedType is markdown."
            }
        }
    }

    return $issues
}

function Write-AosAuditReport {
    param(
        [Parameter(Mandatory=$true)]
        [string]$ReportFile,

        [Parameter(Mandatory=$true)]
        [string]$ArtifactFile,

        [Parameter(Mandatory=$true)]
        [string]$ExpectedType,

        [Parameter(Mandatory=$true)]
        [int]$Attempt,

        [Parameter(Mandatory=$true)]
        [AllowEmptyCollection()]
        [string[]]$Issues
    )

    $status = "PASS"
    if ($Issues.Count -gt 0) {
        $status = "FAIL"
    }

    $issueText = "- None"
    if ($Issues.Count -gt 0) {
        $issueText = ($Issues | ForEach-Object { "- $_" }) -join "`n"
    }

    $report = @"
# AOS Local Structural Audit

Artifact path: $ArtifactFile
Expected type: $ExpectedType
Attempt: $Attempt
Status: $status

## Issues

$issueText
"@

    Write-AosUtf8File -Path $ReportFile -Content $report
}

$Project = Get-AosRepoRoot
Set-Location $Project

[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$env:PYTHONUTF8 = "1"
$env:PYTHONIOENCODING = "utf-8"
$env:NO_COLOR = "1"
$env:TERM = "dumb"

if (!(Test-Path $PromptFile)) {
    Write-Host "FAIL: Prompt file does not exist: $PromptFile"
    exit 2
}

if ((Test-Path $OutFile) -and !$Force) {
    Write-Host "FAIL: OutFile already exists. Pass -Force to overwrite: $OutFile"
    exit 2
}

$OutDir = Split-Path $OutFile -Parent
if ($OutDir) {
    New-AosDirectory -Path $OutDir
}

New-AosDirectory -Path ".\audits\reports"
New-AosDirectory -Path ".\audits\quarantine"

$Prompt = Get-Content -Path $PromptFile -Raw
$Prompt = $Prompt + "`n`nSafety instructions:`n- Output only requested artifact.`n- Use plain ASCII.`n- Do not include terminal logs.`n- Do not include Hermes CLI messages.`n"
$PromptOneLine = $Prompt -replace "(`r`n|`n|`r)", "\n"

if ($Retries -lt 0) {
    $Retries = 0
}

$MaxAttempts = $Retries + 1
$baseName = ConvertTo-AosSafeName -Value (Split-Path $OutFile -Leaf)
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$lastIssues = @()

for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    Write-Host "AOS run attempt $attempt of $MaxAttempts"

    $HermesArgs = @(
        "--skills", $Skill,
        "-z", $PromptOneLine,
        "chat"
    )

    $Output = & hermes @HermesArgs 2>&1
    $OutputText = ($Output | Out-String).TrimEnd()
    Write-AosUtf8File -Path $OutFile -Content $OutputText

    $issues = @(Test-AosArtifact -ArtifactFile $OutFile -ExpectedType $ExpectedType)
    $lastIssues = $issues

    $reportFile = Join-Path ".\audits\reports" ("$baseName.attempt_$attempt.$timestamp.audit.md")
    Write-AosAuditReport -ReportFile $reportFile -ArtifactFile $OutFile -ExpectedType $ExpectedType -Attempt $attempt -Issues $issues

    if ($issues.Count -eq 0) {
        Write-Host "PASS: Saved clean output to $OutFile"
        Write-Host "Audit report: $reportFile"
        exit 0
    }

    $quarantineFile = Join-Path ".\audits\quarantine" ("$baseName.attempt_$attempt.$timestamp.quarantine")
    if (Test-Path $OutFile) {
        Move-Item -Force -Path $OutFile -Destination $quarantineFile
    }

    Write-Host "FAIL: Output failed local structural audit."
    Write-Host "Audit report: $reportFile"
    Write-Host "Quarantined output: $quarantineFile"

    if ($attempt -lt $MaxAttempts) {
        Write-Host "Retrying..."
    }
}

Write-Host "FAIL: All attempts failed local structural audit."
foreach ($issue in $lastIssues) {
    Write-Host "- $issue"
}
exit 2
