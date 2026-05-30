# install.ps1 — PowerShell installer for create-infographics

[CmdletBinding()]
param(
    [ValidateSet('claude', 'codex', 'openclaw', 'auto')]
    [string]$Platform = 'auto',

    [string]$TargetDir = '',

    [switch]$DryRun,

    [switch]$Force
)

$SkillName = 'create-infographics'
$SourceDir = (Resolve-Path "$PSScriptRoot\..").Path

# Resolve target dir
if (-not $TargetDir) {
    switch ($Platform) {
        'claude'   { $TargetDir = "$HOME\.claude\skills\$SkillName" }
        'codex'    { $TargetDir = "$HOME\.codex\skills\$SkillName" }
        'openclaw' { $TargetDir = "$HOME\.openclaw\skills\$SkillName" }
        'auto' {
            $candidates = @()
            if (Test-Path "$HOME\.claude\skills")   { $candidates += @{ Platform = 'claude';   Path = "$HOME\.claude\skills\$SkillName" } }
            if (Test-Path "$HOME\.codex\skills")    { $candidates += @{ Platform = 'codex';    Path = "$HOME\.codex\skills\$SkillName" } }
            if (Test-Path "$HOME\.openclaw\skills") { $candidates += @{ Platform = 'openclaw'; Path = "$HOME\.openclaw\skills\$SkillName" } }

            if ($candidates.Count -eq 0) {
                Write-Error "No platform skill directory detected. Pass -Platform <claude|codex|openclaw> or -TargetDir <path>."
                exit 1
            }
            if ($candidates.Count -gt 1) {
                Write-Error "Multiple platform directories detected. Pass -Platform <name> to choose."
                foreach ($c in $candidates) {
                    Write-Host "  - $($c.Platform) → $($c.Path)"
                }
                exit 1
            }
            $TargetDir = $candidates[0].Path
            $Platform = $candidates[0].Platform
        }
    }
}

Write-Host "→ Source: $SourceDir"
Write-Host "→ Target: $TargetDir"
Write-Host "→ Platform: $Platform"
Write-Host ""

# Check existing install
if (Test-Path $TargetDir) {
    if (-not $Force) {
        $response = Read-Host "Target already exists. Overwrite? [y/N]"
        if ($response -notmatch '^[Yy]$') {
            Write-Host "Aborted."
            exit 0
        }
    }
    Write-Host "→ Removing existing install..."
    if (-not $DryRun) {
        Remove-Item -Path $TargetDir -Recurse -Force
    }
}

# Create parent dir
$Parent = Split-Path -Parent $TargetDir
if (-not (Test-Path $Parent)) {
    Write-Host "→ Creating $Parent"
    if (-not $DryRun) {
        New-Item -ItemType Directory -Path $Parent -Force | Out-Null
    }
}

# Copy
Write-Host "→ Copying skill files..."
if ($DryRun) {
    Write-Host "  (dry run — no changes)"
}
else {
    Copy-Item -Path $SourceDir -Destination $TargetDir -Recurse
}

# Verify
if (-not $DryRun) {
    if (Test-Path "$TargetDir\SKILL.md") {
        Write-Host "✓ Installed successfully."
    }
    else {
        Write-Error "Install failed — SKILL.md not found in target."
        exit 1
    }
}

# Check prerequisites
Write-Host ""
Write-Host "→ Checking prerequisites..."

function Test-Command {
    param([string]$Name)
    try {
        if (Get-Command $Name -ErrorAction Stop) {
            Write-Host "  ✓ $Name found"
            return $true
        }
    }
    catch {
        Write-Host "  ✗ $Name NOT found"
        return $false
    }
}

$HasRuntime = $false
if (Test-Command 'bun') { $HasRuntime = $true }
if (Test-Command 'npx') { $HasRuntime = $true }

if (-not $HasRuntime) {
    Write-Host ""
    Write-Host "⚠ No JavaScript runtime detected. Install bun (https://bun.sh) or Node.js (which includes npx)." -ForegroundColor Yellow
}

if (-not $env:GOOGLE_API_KEY -and -not $env:OPENAI_API_KEY -and -not $env:OPENROUTER_API_KEY) {
    Write-Host ""
    Write-Host "⚠ No image-gen API key detected in environment." -ForegroundColor Yellow
    Write-Host "  Set at least one of: GOOGLE_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY."
    Write-Host "  Default provider is Google Gemini — get a key at https://aistudio.google.com/"
}

Write-Host ""
Write-Host "Done. Restart your agent (Claude Code / Codex / OpenClaw) to pick up the new skill."
Write-Host "To uninstall: Remove-Item '$TargetDir' -Recurse -Force"
