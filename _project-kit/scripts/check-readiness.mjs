#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const root = path.resolve(process.argv[2] ?? defaultRoot);
const errors = [];
const warnings = [];

const requiredFiles = [
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
  "specs/QUICK_TASKS_LOG.md",
];

const generatedFiles = [
  "generated/DASHBOARD.md",
  "generated/TIMELINE.md",
  "generated/SPEC_DEPENDENCIES.md",
  "generated/TRACEABILITY_MATRIX.md",
  "generated/RELEASE_NOTES.md",
  "generated/CONTRIBUTION_HISTORY.md",
];

for (const relativePath of generatedFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    warnings.push(`Visão gerada ausente: ${relativePath}. Execute scripts/generate-project-views.mjs.`);
  }
}

const inputPath = path.resolve(root, "..", "PREENCHA_PRIMEIRO.md");
if (!fs.existsSync(inputPath)) {
  errors.push("Arquivo obrigatório ausente na raiz: PREENCHA_PRIMEIRO.md");
}

const read = (relativePath) => {
  const fullPath = path.join(root, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
};

const kitVersion = read("VERSION").trim();
if (!/^\d+\.\d+\.\d+$/.test(kitVersion)) {
  errors.push(`VERSION não contém uma versão semântica válida: ${kitVersion || "vazio"}.`);
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`Arquivo obrigatório ausente: ${relativePath}`);
  }
}

for (const relativePath of ["project/PROJECT.md", "project/CONSTRAINTS.md"]) {
  const count = (read(relativePath).match(/\[PREENCHER/gi) ?? []).length;
  if (count > 0) warnings.push(`${relativePath} contém ${count} campo(s) [PREENCHER].`);
}

const input = fs.existsSync(inputPath) ? fs.readFileSync(inputPath, "utf8") : "";
const inputForValidation = input.replace(/```[\s\S]*?```/g, "");
const inputMarkers = (inputForValidation.match(/\[PREENCHER/gi) ?? []).length;
if (inputMarkers > 0) warnings.push(`PREENCHA_PRIMEIRO.md contém ${inputMarkers} campo(s) [PREENCHER].`);
const unknownCount = (
  inputForValidation.match(/^-\s+[^:\r\n]+:\s*\[NAO_SEI\]\s*$/gim) ?? []
).length;
const inputVersion = input.match(/Versão das respostas:\s*`([^`]+)`/i)?.[1];
const sync = read("project/INPUT_SYNC.md");
const syncedVersion = sync.match(/Versão de `PREENCHA_PRIMEIRO\.md` sincronizada:\s*`([^`]+)`/i)?.[1];

const baseline = read("project/BASELINE.md");
const baselineMatch = baseline.match(/Versão atual:\s*`([^`]+)`/i);
const baselineVersion = baselineMatch?.[1];
const baselineState = baseline.match(/Estado:\s*`([^`]+)`/i)?.[1];
const baselineKitVersion = baseline.match(/Versão do Starter Kit:\s*`([^`]+)`/i)?.[1];
if (!baselineVersion) {
  errors.push("project/BASELINE.md não declara a versão atual.");
}
if (kitVersion && baselineKitVersion !== kitVersion) {
  errors.push(
    `project/BASELINE.md registra Starter Kit ${baselineKitVersion ?? "sem versão"}, mas VERSION contém ${kitVersion}.`,
  );
}

const questions = read("project/OPEN_QUESTIONS.md")
  .split(/\r?\n/)
  .filter((line) => /^\|\s*Q-\d+/i.test(line));
const blockingQuestions = questions.filter((line) => {
  const cells = line.split("|").map((cell) => cell.trim().toLowerCase());
  return cells.includes("alto") && cells.includes("open");
});
if (blockingQuestions.length > 0) {
  errors.push(`Existem ${blockingQuestions.length} pergunta(s) abertas de alto impacto.`);
}
const tracedUnknowns = questions.filter((line) => /PREENCHA_PRIMEIRO\.md/i.test(line)).length;

const decisions = read("project/OPEN_DECISIONS.md")
  .split(/\r?\n/)
  .filter((line) => /^\|\s*D-\d+/i.test(line));
const blockingDecisions = decisions.filter((line) => {
  const cells = line.split("|").map((cell) => cell.trim().toLowerCase());
  return (
    cells.includes("alto") &&
    (cells.includes("open") || cells.includes("analyzing") || cells.includes("proposed"))
  );
});
if (blockingDecisions.length > 0) {
  errors.push(`Existem ${blockingDecisions.length} decisão(ões) pendente(s) de alto impacto.`);
}

const index = read("specs/INDEX.md");
const allowedSpecStates = new Set([
  "draft",
  "needs_review",
  "ready",
  "in_progress",
  "blocked",
  "done",
]);
const indexRows = new Map();
for (const line of index.split(/\r?\n/)) {
  if (!/^\|\s*\d+\s*\|\s*SPEC-\d+/i.test(line)) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  const [, id, , status, version, , , owner] = cells;
  indexRows.set(id.toUpperCase(), { status, version, owner });
  if (!allowedSpecStates.has(status)) errors.push(`${id} usa estado desconhecido no INDEX.md: ${status}`);
}
const readyRows = index
  .split(/\r?\n/)
  .filter((line) => /\|\s*ready\s*\|/i.test(line));
if (readyRows.length === 0) warnings.push("Nenhuma spec está com status ready.");
if (inputVersion !== syncedVersion) {
  const message = `Entrada ${inputVersion ?? "sem versão"} não está sincronizada; INPUT_SYNC registra ${syncedVersion ?? "nenhuma"}.`;
  if (readyRows.length > 0) errors.push(message);
  else warnings.push(message);
}
const syncState = sync.match(/-\s*Estado:\s*`([^`]+)`/i)?.[1];
const pendingSyncRows = sync
  .split(/\r?\n/)
  .filter((line) => /^\|\s*`[^`]+`\s*\|\s*pending\s*\|/i.test(line));
const invalidNoChangeRows = sync
  .split(/\r?\n/)
  .filter((line) => {
    if (!/^\|\s*`[^`]+`\s*\|\s*verified_no_change\s*\|/i.test(line)) return false;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    return !cells[2] || !cells[3];
  });
const derivationMap = read("project/DERIVATION_MAP.md");
const pendingDerivations = derivationMap
  .split(/\r?\n/)
  .filter((line) => /^\|\s*§\d+[^|]*\|.*\|\s*pending\s*\|/i.test(line));
if (
  readyRows.length > 0 &&
  (syncState !== "synced" ||
    pendingSyncRows.length ||
    pendingDerivations.length ||
    invalidNoChangeRows.length)
) {
  errors.push("Existem specs ready, mas a sincronização ou o mapa de derivação ainda está pendente.");
}
if (invalidNoChangeRows.length > 0) {
  const message = `${invalidNoChangeRows.length} linha(s) verified_no_change não registram seções revisadas e evidência.`;
  if (readyRows.length > 0) errors.push(message);
  else warnings.push(message);
}
if (tracedUnknowns < unknownCount) {
  const message = `Há ${unknownCount} ocorrência(s) [NAO_SEI], mas apenas ${tracedUnknowns} pergunta(s) rastreadas.`;
  if (readyRows.length > 0) errors.push(message);
  else warnings.push(message);
}
if (readyRows.length > 0) {
  for (const relativePath of ["project/PROJECT.md", "project/CONSTRAINTS.md"]) {
    if (!/<!--\s*origem:\s*PREENCHA_PRIMEIRO\.md/i.test(read(relativePath))) {
      errors.push(`${relativePath} não contém marcadores de origem.`);
    }
  }
}
if (readyRows.length > 0 && baselineState !== "approved") {
  errors.push(`Existem specs ready, mas a baseline está ${baselineState ?? "sem estado"}.`);
}
const architecture = read("project/ARCHITECTURE.md");
const stackApproval = architecture.match(
  /## Aprovação e alternativas[\s\S]*?-\s*Estado da stack:\s*(?:\[)?([^\]\r\n]+)(?:\])?/i,
)?.[1]?.trim();
if (readyRows.length > 0 && stackApproval !== "aprovada") {
  errors.push(`Existem specs ready, mas a stack está ${stackApproval ?? "sem estado"}.`);
}

const knownSpecIds = new Set(indexRows.keys());
const featureMap = read("project/FEATURE_MAP.md");
for (const line of featureMap.split(/\r?\n/)) {
  if (!/^\|\s*F-\d+\s*\|/i.test(line)) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  const [featureId, , , priority, , , specCell = ""] = cells;
  if (priority.toLowerCase() !== "must") continue;

  const referencedIds = specCell.match(/SPEC-\d+/gi) ?? [];
  if (referencedIds.length === 0) {
    errors.push(`${featureId} tem prioridade must, mas não aponta para nenhuma spec.`);
    continue;
  }
  for (const specId of referencedIds) {
    if (!knownSpecIds.has(specId.toUpperCase())) {
      errors.push(`${featureId} aponta para ${specId}, que não existe em specs/INDEX.md.`);
    }
  }
}

const specsDir = path.join(root, "specs");
const specFiles = fs.existsSync(specsDir)
  ? fs.readdirSync(specsDir).filter((name) => /^SPEC-\d+.*\.md$/i.test(name))
  : [];

for (const name of specFiles) {
  const content = read(path.join("specs", name));
  for (const section of [
    "## Resultado esperado",
    "## Dentro do escopo",
    "## Critérios de aceite",
    "## Validação obrigatória",
    "## Evidências dos critérios",
  ]) {
    if (!content.includes(section)) errors.push(`${name} não contém: ${section}`);
  }

  const status = content.match(/^status:\s*(.+)$/im)?.[1].trim();
  const id = content.match(/^id:\s*(.+)$/im)?.[1].trim().toUpperCase();
  const specBaseline = content.match(/^project_version:\s*(.+)$/im)?.[1].trim();
  if (!allowedSpecStates.has(status)) errors.push(`${name} usa estado desconhecido: ${status ?? "ausente"}.`);
  if (["ready", "in_progress", "done"].includes(status) && specBaseline !== baselineVersion) {
    errors.push(
      `${name} usa baseline ${specBaseline ?? "ausente"}, mas a atual é ${baselineVersion}.`,
    );
  }

  if (status === "in_progress") {
    const owner = content.match(/^owner:\s*(.+)$/im)?.[1].trim();
    if (!owner || owner === "unassigned") errors.push(`${name} está in_progress sem owner.`);
  }

  const indexed = id ? indexRows.get(id) : undefined;
  if (!id) {
    errors.push(`${name} não declara id no frontmatter.`);
  } else if (!indexed) {
    errors.push(`${name} não possui linha correspondente em specs/INDEX.md.`);
  } else {
    if (indexed.status !== status) {
      errors.push(`${name} está ${status}, mas INDEX.md registra ${indexed.status}.`);
    }
    if (indexed.version !== specBaseline) {
      errors.push(`${name} usa baseline ${specBaseline}, mas INDEX.md registra ${indexed.version}.`);
    }
  }
}

for (const [id, row] of indexRows) {
  if (row.status === "draft") continue;
  const hasFile = specFiles.some((name) =>
    new RegExp(`^${id}(?:-|\\.|$)`, "i").test(name),
  );
  if (!hasFile) errors.push(`${id} está ${row.status} no índice, mas não possui arquivo de spec.`);
}

const allowedProposalStates = new Set([
  "captured",
  "evaluating",
  "accepted",
  "rejected",
  "deferred",
  "implemented",
  "validated",
]);
const allowedEvidenceLevels = new Set([
  "experimental",
  "emerging",
  "established",
  "contested",
]);
const proposalDir = path.join(root, "proposals");
const proposalFiles = fs.existsSync(proposalDir)
  ? fs.readdirSync(proposalDir).filter((name) => /^P-\d+.*\.md$/i.test(name))
  : [];
const proposalIndex = read("proposals/INDEX.md");
const proposalIndexRows = new Map();
for (const line of proposalIndex.split(/\r?\n/)) {
  if (!/^\|\s*P-\d+\s*\|/i.test(line)) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  proposalIndexRows.set(cells[0].toUpperCase(), {
    status: cells[2],
    evidenceLevel: cells[3],
  });
}
for (const name of proposalFiles) {
  const content = read(path.join("proposals", name));
  const id = content.match(/^id:\s*(P-\d+)$/im)?.[1]?.toUpperCase();
  const status = content.match(/^status:\s*(.+)$/im)?.[1]?.trim();
  const evidenceLevel = content.match(/^evidence_level:\s*(.+)$/im)?.[1]?.trim();
  if (!id) errors.push(`${name} não declara id P-NNN no frontmatter.`);
  if (!allowedProposalStates.has(status)) {
    errors.push(`${name} usa estado de proposta desconhecido: ${status ?? "ausente"}.`);
  }
  if (!allowedEvidenceLevels.has(evidenceLevel)) {
    errors.push(`${name} usa nível de evidência desconhecido: ${evidenceLevel ?? "ausente"}.`);
  }
  const indexedProposal = id ? proposalIndexRows.get(id) : undefined;
  if (id && !indexedProposal) {
    errors.push(`${name} não possui linha correspondente em proposals/INDEX.md.`);
  } else if (indexedProposal) {
    if (indexedProposal.status !== status) {
      errors.push(`${name} está ${status}, mas proposals/INDEX.md registra ${indexedProposal.status}.`);
    }
    if (indexedProposal.evidenceLevel !== evidenceLevel) {
      errors.push(
        `${name} usa evidência ${evidenceLevel}, mas proposals/INDEX.md registra ${indexedProposal.evidenceLevel}.`,
      );
    }
  }
}

console.log(`Readiness check: ${root}`);
for (const warning of warnings) console.warn(`AVISO: ${warning}`);
for (const error of errors) console.error(`ERRO: ${error}`);

if (errors.length > 0) {
  console.error(`Falhou com ${errors.length} erro(s).`);
  process.exit(1);
}

console.log(
  warnings.length > 0
    ? "Estrutura válida, mas o projeto ainda exige preenchimento."
    : "Estrutura válida e pronta para execução.",
);
