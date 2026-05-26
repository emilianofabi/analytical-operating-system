param(
    [Parameter(Mandatory=$true)]
    [string]$ModuleFile,

    [Parameter(Mandatory=$true)]
    [string]$Lesson,

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

if ([string]::IsNullOrWhiteSpace($OutFile)) {
    throw "OutFile was not provided."
}

$OutDir = Split-Path $OutFile -Parent
if ($OutDir -and !(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

$Prompt = @"
Use the curriculum-orchestrator skill.

Read the local Markdown module card at:
modules/$ModuleFile

Generate:
$Lesson

Requirements:
- Output clean Markdown only.
- Use plain ASCII characters only.
- Use straight double quotes instead of curly quotes.
- Use straight apostrophes instead of curly apostrophes.
- Use regular hyphens instead of em dashes or en dashes.
- Do not use special typography.
- Preserve the Toward an Analytical Operating System principles.
- Begin with the serious conceptual problem.
- Define key concepts precisely.
- Include mathematical, computational, or architectural formalization when useful.
- Include assumptions and failure modes.
- End with an exercise, artifact, or oral-defense prompt.
- Do not print commentary outside the lesson.
"@

$Output = hermes --skills curriculum-orchestrator -z $Prompt
$Output | Set-Content -Path $OutFile -Encoding UTF8

Write-Host "Saved lesson to $OutFile"
