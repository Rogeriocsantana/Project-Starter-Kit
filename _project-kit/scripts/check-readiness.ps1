param(
    [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$errors = [System.Collections.Generic.List[string]]::new()
$warnings = [System.Collections.Generic.List[string]]::new()

$requiredFiles = @(
    "VERSION",
    "AGENTS_FULL.md",
    "governance/WHY.md",
    "governance/PRINCIPLES.md",
    "governance/KNOWLEDGE_MODEL.md",
    "governance/GOVERNANCE.md",
    "project/PROJECT.md",
    "project/PROJECT_PRINCIPLES.md",
    "project/DOMAIN_GLOSSARY.md",
    "project/CONSTRAINTS.md",
    "project/ARCHITECTURE.md",
    "project/FEATURE_MAP.md",
    "project/SKILL_ROUTER.md",
    "project/INPUT_SYNC.md",
    "project/DERIVATION_MAP.md",
    "project/BASELINE.md",
    "project/OPEN_QUESTIONS.md",
    "project/OPEN_DECISIONS.md",
    "project/RISKS.md",
    "project/PROJECT_CONTEXT.md",
    "project/adr/_TEMPLATE.md",
    "planning/ROADMAP.md",
    "planning/BACKLOG.md",
    "planning/sprints/_TEMPLATE.md",
    "docs/README.md",
    "docs/diagrams/README.md",
    "docs/flows/README.md",
    "docs/wireframes/README.md",
    "CHANGELOG.md",
    "ACTIVITY_LOG.md",
    "generated/README.md",
    "proposals/README.md",
    "proposals/INDEX.md",
    "proposals/_TEMPLATE.md",
    "specs/INDEX.md",
    "specs/CLAIMS.md",
    "specs/QUICK_TASKS_LOG.md"
)

$generatedFiles = @(
    "generated/DASHBOARD.md",
    "generated/TIMELINE.md",
    "generated/SPEC_DEPENDENCIES.md",
    "generated/TRACEABILITY_MATRIX.md",
    "generated/RELEASE_NOTES.md",
    "generated/CONTRIBUTION_HISTORY.md"
)

foreach ($relativePath in $generatedFiles) {
    $fullPath = Join-Path $Root $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        $warnings.Add("Visão gerada ausente: $relativePath. Execute scripts/generate-project-views.mjs.")
    }
}

$inputPath = Join-Path (Split-Path -Parent $Root) "PREENCHA_PRIMEIRO.md"
if (-not (Test-Path -LiteralPath $inputPath -PathType Leaf)) {
    $errors.Add("Arquivo obrigatório ausente na raiz: PREENCHA_PRIMEIRO.md")
}

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $Root $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        $errors.Add("Arquivo obrigatório ausente: $relativePath")
    }
}

$kitVersionPath = Join-Path $Root "VERSION"
$kitVersion = if (Test-Path -LiteralPath $kitVersionPath) {
    (Get-Content -LiteralPath $kitVersionPath -Raw).Trim()
} else { "" }
if ($kitVersion -notmatch '^\d+\.\d+\.\d+$') {
    $errors.Add("VERSION não contém uma versão semântica válida: $kitVersion")
}

$briefPath = Join-Path $Root "project/PROJECT.md"
if (Test-Path -LiteralPath $briefPath) {
    $briefMarkers = Select-String -LiteralPath $briefPath -Pattern "\[PREENCHER" -AllMatches
    if ($briefMarkers) {
        $warnings.Add("PROJECT.md ainda contém $($briefMarkers.Matches.Count) campo(s) [PREENCHER].")
    }
}

$constraintPath = Join-Path $Root "project/CONSTRAINTS.md"
if (Test-Path -LiteralPath $constraintPath) {
    $constraintContent = Get-Content -LiteralPath $constraintPath -Raw
    $constraintMarkers = Select-String -LiteralPath $constraintPath -Pattern "\[PREENCHER" -AllMatches
    if ($constraintMarkers) {
        $warnings.Add("CONSTRAINTS.md ainda contém $($constraintMarkers.Matches.Count) campo(s) [PREENCHER].")
    }
}

$indexPath = Join-Path $Root "specs/INDEX.md"
$readySpecs = @()
if (Test-Path -LiteralPath $indexPath) {
    $readySpecs = Select-String -LiteralPath $indexPath -Pattern "\|\s*ready\s*\|" -CaseSensitive:$false
    if (-not $readySpecs) {
        $warnings.Add("Nenhuma spec está com status ready.")
    }
}

$inputVersion = $null
$syncedVersion = $null
if (Test-Path -LiteralPath $inputPath) {
    $inputContent = Get-Content -LiteralPath $inputPath -Raw
    $inputForValidation = [regex]::Replace($inputContent, '(?s)```.*?```', '')
    $inputMarkers = [regex]::Matches($inputForValidation, '\[PREENCHER', 'IgnoreCase').Count
    $unknownCount = [regex]::Matches($inputForValidation, '(?im)^-\s+[^:\r\n]+:\s*\[NAO_SEI\]\s*$').Count
    if ($inputMarkers -gt 0) {
        $warnings.Add("PREENCHA_PRIMEIRO.md contém $inputMarkers campo(s) [PREENCHER].")
    }
    $inputVersionMatch = [regex]::Match($inputContent, 'Versão das respostas:\s*`([^`]+)`', 'IgnoreCase')
    if ($inputVersionMatch.Success) { $inputVersion = $inputVersionMatch.Groups[1].Value }
}
$syncPath = Join-Path $Root "project/INPUT_SYNC.md"
if (Test-Path -LiteralPath $syncPath) {
    $syncContent = Get-Content -LiteralPath $syncPath -Raw
    $syncVersionMatch = [regex]::Match($syncContent, 'Versão de `PREENCHA_PRIMEIRO\.md` sincronizada:\s*`([^`]+)`', 'IgnoreCase')
    if ($syncVersionMatch.Success) { $syncedVersion = $syncVersionMatch.Groups[1].Value }
}
if ($inputVersion -ne $syncedVersion) {
    $syncMessage = "Entrada $inputVersion não está sincronizada; INPUT_SYNC registra $syncedVersion."
    if ($readySpecs) { $errors.Add($syncMessage) } else { $warnings.Add($syncMessage) }
}

$syncStateMatch = if ($syncContent) { [regex]::Match($syncContent, '-\s*Estado:\s*`([^`]+)`', 'IgnoreCase') } else { $null }
$syncState = if ($syncStateMatch -and $syncStateMatch.Success) { $syncStateMatch.Groups[1].Value } else { "" }
$pendingSyncRows = if ($syncContent) { [regex]::Matches($syncContent, '(?im)^\|\s*`[^`]+`\s*\|\s*pending\s*\|').Count } else { 0 }
$invalidNoChangeRows = 0
if ($syncContent) {
    foreach ($line in ($syncContent -split "`r?`n")) {
        if ($line -notmatch '^\|\s*`[^`]+`\s*\|\s*verified_no_change\s*\|') { continue }
        $cells = $line.Split('|')
        if ($cells.Count -lt 6 -or [string]::IsNullOrWhiteSpace($cells[3]) -or [string]::IsNullOrWhiteSpace($cells[4])) {
            $invalidNoChangeRows++
        }
    }
}
$derivationPath = Join-Path $Root "project/DERIVATION_MAP.md"
$derivationContent = if (Test-Path -LiteralPath $derivationPath) { Get-Content -LiteralPath $derivationPath -Raw } else { "" }
$pendingDerivations = if ($derivationContent) { [regex]::Matches($derivationContent, '(?im)^\|\s*§\d+[^|]*\|.*\|\s*pending\s*\|').Count } else { 0 }
if ($readySpecs -and ($syncState -ne "synced" -or $pendingSyncRows -gt 0 -or $pendingDerivations -gt 0 -or $invalidNoChangeRows -gt 0)) {
    $errors.Add("Existem specs ready, mas a sincronização ou o mapa de derivação ainda está pendente.")
}
if ($invalidNoChangeRows -gt 0) {
    $noChangeMessage = "$invalidNoChangeRows linha(s) verified_no_change não registram seções revisadas e evidência."
    if ($readySpecs) { $errors.Add($noChangeMessage) } else { $warnings.Add($noChangeMessage) }
}

$baselineVersion = $null
$baselineState = $null
$baselinePath = Join-Path $Root "project/BASELINE.md"
if (Test-Path -LiteralPath $baselinePath) {
    $baselineContent = Get-Content -LiteralPath $baselinePath -Raw
    $versionMatch = [regex]::Match($baselineContent, 'Versão atual:\s*`([^`]+)`', 'IgnoreCase')
    $kitVersionMatch = [regex]::Match($baselineContent, 'Versão do Starter Kit:\s*`([^`]+)`', 'IgnoreCase')
    $stateMatch = [regex]::Match($baselineContent, 'Estado:\s*`([^`]+)`', 'IgnoreCase')
    if ($versionMatch.Success) { $baselineVersion = $versionMatch.Groups[1].Value }
    if ($stateMatch.Success) { $baselineState = $stateMatch.Groups[1].Value }
    if (-not $baselineVersion) { $errors.Add("BASELINE.md não declara a versão atual.") }
    $baselineKitVersion = if ($kitVersionMatch.Success) { $kitVersionMatch.Groups[1].Value } else { "" }
    if ($kitVersion -and $baselineKitVersion -ne $kitVersion) {
        $errors.Add("BASELINE.md registra Starter Kit $baselineKitVersion, mas VERSION contém $kitVersion.")
    }
    if ($readySpecs -and $baselineState -ne "approved") {
        $errors.Add("Existem specs ready, mas a baseline não está approved.")
    }
}

$architecturePath = Join-Path $Root "project/ARCHITECTURE.md"
$architectureContent = if (Test-Path -LiteralPath $architecturePath) { Get-Content -LiteralPath $architecturePath -Raw } else { "" }
if ($readySpecs -and $architectureContent) {
    $stackSectionMatch = [regex]::Match($architectureContent, '## Aprovação e alternativas(?s:.*?)-\s*Estado da stack:\s*(?:\[)?([^\]\r\n]+)(?:\])?', 'IgnoreCase')
    $stackState = if ($stackSectionMatch.Success) { $stackSectionMatch.Groups[1].Value.Trim() } else { "" }
    if ($stackState -ne "aprovada") {
        $errors.Add("Existem specs ready, mas a stack não está aprovada.")
    }
}

$knownSpecIds = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
if (Test-Path -LiteralPath $indexPath) {
    foreach ($line in Get-Content -LiteralPath $indexPath) {
        if ($line -match '^\|\s*\d+\s*\|\s*(SPEC-\d+)\s*\|') {
            [void]$knownSpecIds.Add($Matches[1])
        }
    }
}

$featureMapPath = Join-Path $Root "project/FEATURE_MAP.md"
if (Test-Path -LiteralPath $featureMapPath) {
    foreach ($line in Get-Content -LiteralPath $featureMapPath) {
        if ($line -notmatch '^\|\s*(F-\d+)\s*\|') { continue }
        $featureId = $Matches[1]
        $cells = $line.Split('|')
        if ($cells.Count -lt 9) { continue }
        $priority = $cells[4].Trim()
        $specCell = $cells[7].Trim()
        if ($priority -ne "must") { continue }
        $references = [regex]::Matches($specCell, 'SPEC-\d+', 'IgnoreCase')
        if ($references.Count -eq 0) {
            $errors.Add("$featureId tem prioridade must, mas não aponta para nenhuma spec.")
            continue
        }
        foreach ($reference in $references) {
            if (-not $knownSpecIds.Contains($reference.Value)) {
                $errors.Add("$featureId aponta para $($reference.Value), que não existe em specs/INDEX.md.")
            }
        }
    }
}

$questionsPath = Join-Path $Root "project/OPEN_QUESTIONS.md"
if (Test-Path -LiteralPath $questionsPath) {
    $questionsContent = Get-Content -LiteralPath $questionsPath -Raw
    $tracedUnknowns = [regex]::Matches($questionsContent, '(?im)^\|\s*Q-\d+\s*\|.*PREENCHA_PRIMEIRO\.md').Count
    if ($tracedUnknowns -lt $unknownCount) {
        $unknownMessage = "Há $unknownCount ocorrência(s) [NAO_SEI], mas apenas $tracedUnknowns pergunta(s) rastreadas."
        if ($readySpecs) { $errors.Add($unknownMessage) } else { $warnings.Add($unknownMessage) }
    }
    $blockingQuestions = Select-String -LiteralPath $questionsPath -Pattern '^\|\s*Q-\d+.*\|\s*alto\s*\|.*\|\s*open\s*\|' -CaseSensitive:$false
    if ($blockingQuestions) {
        $errors.Add("Existem $($blockingQuestions.Count) pergunta(s) abertas de alto impacto.")
    }
}

$decisionsPath = Join-Path $Root "project/OPEN_DECISIONS.md"
if (Test-Path -LiteralPath $decisionsPath) {
    $blockingDecisions = @()
    foreach ($line in Get-Content -LiteralPath $decisionsPath) {
        if ($line -notmatch '^\|\s*D-\d+\s*\|') { continue }
        $cells = $line.Split('|') | ForEach-Object { $_.Trim().ToLowerInvariant() }
        if ($cells -contains "alto" -and (
            $cells -contains "open" -or
            $cells -contains "analyzing" -or
            $cells -contains "proposed"
        )) {
            $blockingDecisions += $line
        }
    }
    if ($blockingDecisions.Count -gt 0) {
        $errors.Add("Existem $($blockingDecisions.Count) decisão(ões) pendente(s) de alto impacto.")
    }
}

if ($readySpecs) {
    foreach ($derivedPath in @("project/PROJECT.md", "project/CONSTRAINTS.md")) {
        $derivedContent = Get-Content -LiteralPath (Join-Path $Root $derivedPath) -Raw
        if ($derivedContent -notmatch '<!--\s*origem:\s*PREENCHA_PRIMEIRO\.md') {
            $errors.Add("$derivedPath não contém marcadores de origem.")
        }
    }
}

$specFiles = Get-ChildItem -LiteralPath (Join-Path $Root "specs") -Filter "SPEC-*.md" -File -ErrorAction SilentlyContinue
$allowedSpecStates = @("draft", "needs_review", "ready", "in_progress", "blocked", "done")
foreach ($spec in $specFiles) {
    $content = Get-Content -LiteralPath $spec.FullName -Raw
    foreach ($section in @("## Resultado esperado", "## Dentro do escopo", "## Critérios de aceite", "## Validação obrigatória", "## Evidências dos critérios")) {
        if ($content -notmatch [regex]::Escape($section)) {
            $errors.Add("$($spec.Name) não contém a seção obrigatória: $section")
        }
    }

    $statusMatch = [regex]::Match($content, '(?im)^status:\s*(.+)$')
    $specVersionMatch = [regex]::Match($content, '(?im)^project_version:\s*(.+)$')
    $ownerMatch = [regex]::Match($content, '(?im)^owner:\s*(.+)$')
    $status = if ($statusMatch.Success) { $statusMatch.Groups[1].Value.Trim() } else { "" }
    $specVersion = if ($specVersionMatch.Success) { $specVersionMatch.Groups[1].Value.Trim() } else { "" }
    $owner = if ($ownerMatch.Success) { $ownerMatch.Groups[1].Value.Trim() } else { "" }

    if ($status -notin $allowedSpecStates) {
        $errors.Add("$($spec.Name) usa estado desconhecido: $status.")
    }
    if ($status -in @("ready", "in_progress", "done") -and $specVersion -ne $baselineVersion) {
        $errors.Add("$($spec.Name) não usa a baseline atual $baselineVersion.")
    }
    if ($status -eq "in_progress" -and ($owner -eq "" -or $owner -eq "unassigned")) {
        $errors.Add("$($spec.Name) está in_progress sem owner.")
    }
}

$allowedProposalStates = @("captured", "evaluating", "accepted", "rejected", "deferred", "implemented", "validated")
$allowedEvidenceLevels = @("experimental", "emerging", "established", "contested")
$proposalIndexPath = Join-Path $Root "proposals/INDEX.md"
$proposalIndexContent = if (Test-Path -LiteralPath $proposalIndexPath) {
    Get-Content -LiteralPath $proposalIndexPath -Raw
} else { "" }
$proposalIndexRows = @{}
foreach ($line in ($proposalIndexContent -split "`r?`n")) {
    if ($line -notmatch '^\|\s*(P-\d+)\s*\|') { continue }
    $cells = $line.Split('|') | ForEach-Object { $_.Trim() }
    if ($cells.Count -ge 6) {
        $proposalIndexRows[$Matches[1].ToUpperInvariant()] = @{
            Status = $cells[3]
            EvidenceLevel = $cells[4]
        }
    }
}
$proposalFiles = Get-ChildItem -LiteralPath (Join-Path $Root "proposals") -Filter "P-*.md" -File -ErrorAction SilentlyContinue
foreach ($proposal in $proposalFiles) {
    $content = Get-Content -LiteralPath $proposal.FullName -Raw
    $idMatch = [regex]::Match($content, '(?im)^id:\s*(P-\d+)\s*$')
    $statusMatch = [regex]::Match($content, '(?im)^status:\s*(.+)$')
    $evidenceMatch = [regex]::Match($content, '(?im)^evidence_level:\s*(.+)$')
    $proposalId = if ($idMatch.Success) { $idMatch.Groups[1].Value.ToUpperInvariant() } else { "" }
    $proposalStatus = if ($statusMatch.Success) { $statusMatch.Groups[1].Value.Trim() } else { "" }
    $evidenceLevel = if ($evidenceMatch.Success) { $evidenceMatch.Groups[1].Value.Trim() } else { "" }
    if (-not $proposalId) { $errors.Add("$($proposal.Name) não declara id P-NNN no frontmatter.") }
    if ($proposalStatus -notin $allowedProposalStates) {
        $errors.Add("$($proposal.Name) usa estado de proposta desconhecido: $proposalStatus.")
    }
    if ($evidenceLevel -notin $allowedEvidenceLevels) {
        $errors.Add("$($proposal.Name) usa nível de evidência desconhecido: $evidenceLevel.")
    }
    if ($proposalId -and -not $proposalIndexRows.ContainsKey($proposalId)) {
        $errors.Add("$($proposal.Name) não possui linha correspondente em proposals/INDEX.md.")
    } elseif ($proposalId) {
        $indexedProposal = $proposalIndexRows[$proposalId]
        if ($indexedProposal.Status -ne $proposalStatus) {
            $errors.Add("$($proposal.Name) está $proposalStatus, mas proposals/INDEX.md registra $($indexedProposal.Status).")
        }
        if ($indexedProposal.EvidenceLevel -ne $evidenceLevel) {
            $errors.Add("$($proposal.Name) usa evidência $evidenceLevel, mas proposals/INDEX.md registra $($indexedProposal.EvidenceLevel).")
        }
    }
}

Write-Host "Readiness check: $Root"

foreach ($warning in $warnings) {
    Write-Warning $warning
}

foreach ($errorMessage in $errors) {
    Write-Error $errorMessage
}

if ($errors.Count -gt 0) {
    exit 1
}

if ($warnings.Count -gt 0) {
    Write-Host "Estrutura válida, mas o projeto ainda exige preenchimento."
    exit 0
}

Write-Host "Estrutura válida e sem pendências básicas detectadas."
