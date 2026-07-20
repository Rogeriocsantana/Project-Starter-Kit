#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootArgument = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const kitRoot = rootArgument ? path.resolve(rootArgument) : path.resolve(scriptDir, "..");
const projectRoot = path.resolve(kitRoot, "..");
const outputDir = path.join(kitRoot, "generated");
const checkOnly = process.argv.includes("--check");

const read = (relativePath) => {
  const fullPath = path.join(kitRoot, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
};
const clean = (value = "") =>
  value.replace(/`/g, "").replace(/\[(?:PREENCHER|DEFINIR)[^\]]*\]/gi, "").trim();
const rows = (relativePath, pattern) =>
  read(relativePath).split(/\r?\n/).filter((line) => pattern.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));

const specs = rows("specs/INDEX.md", /^\|\s*\d+\s*\|\s*SPEC-\d+/i).map((c) => ({
  id: c[1], title: clean(c[2]), status: c[3], baseline: c[4], priority: c[5],
  dependencies: (c[6].match(/SPEC-\d+/gi) ?? []).map((id) => id.toUpperCase()), owner: c[7],
})).filter((item) => item.title);
const features = rows("project/FEATURE_MAP.md", /^\|\s*F-\d+\s*\|/i).map((c) => ({
  id: c[0], title: clean(c[1]), priority: c[3],
  specs: (c[6].match(/SPEC-\d+/gi) ?? []).map((id) => id.toUpperCase()), origin: c[7],
})).filter((item) => item.title);
const risks = rows("project/RISKS.md", /^\|\s*R-\d+\s*\|/i).map((c) => ({
  id: c[0], risk: c[2], impact: c[5], state: c[10],
}));
const decisions = rows("project/OPEN_DECISIONS.md", /^\|\s*D-\d+\s*\|/i).map((c) => ({
  id: c[0], decision: c[2], impact: c[5], state: c[9],
}));
const activities = rows("ACTIVITY_LOG.md", /^\|\s*\d{4}-\d{2}-\d{2}/).map((c) => ({
  date: c[0], actor: c[1], type: c[2], action: c[3], scope: c[4], evidence: c[5],
}));

const listFiles = (relativeDir, pattern) => {
  const dir = path.join(kitRoot, relativeDir);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => pattern.test(name)) : [];
};
const adrFiles = listFiles("project/adr", /^ADR-\d+.*\.md$/i);
const reportFiles = listFiles("reports", /^SPEC-\d+.*\.md$/i);
const extractSection = (content, heading) => {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return content.match(
    new RegExp(`^## ${escaped}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "im"),
  )?.[1]?.trim() ?? "";
};
const extractList = (section) => section.split(/\r?\n/).filter((line) => /^\s*-\s+/.test(line))
  .map((line) => line.replace(/^\s*-\s+/, "").trim()).filter(Boolean);

const reports = new Map();
for (const name of reportFiles) {
  const content = read(path.join("reports", name));
  const id = name.match(/^SPEC-\d+/i)?.[0].toUpperCase();
  if (!id) continue;
  const files = extractList(extractSection(content, "Arquivos alterados"))
    .map((item) => item.split(/\s+[—-]\s+/)[0].replace(/`/g, ""));
  const evidence = rows(path.join("reports", name), /^\|\s*CA-\d+/i)
    .map((c) => `${c[0]}: ${c[2]}`).filter((value) => clean(value));
  const trace = extractSection(content, "Rastreabilidade da entrega");
  reports.set(id, {
    name, files, evidence,
    commit: trace.match(/-\s*Commit:\s*(.+)/i)?.[1]?.trim() ?? "—",
    pr: trace.match(/-\s*PR:\s*(.+)/i)?.[1]?.trim() ?? "—",
    release: trace.match(/-\s*Release:\s*(.+)/i)?.[1]?.trim() ?? "—",
  });
}

const baseline = read("project/BASELINE.md");
const project = read("project/PROJECT.md");
const projectName = clean(project.match(/-\s*Nome:\s*(.+)/i)?.[1]) || path.basename(projectRoot);
const baselineVersion = baseline.match(/Versão atual:\s*`([^`]+)`/i)?.[1] ?? "não definida";
const done = specs.filter((item) => item.status === "done").length;
const progress = specs.length ? Math.round((done / specs.length) * 100) : 0;
const filled = Math.round(progress / 10);
const bar = `${"█".repeat(filled)}${"░".repeat(10 - filled)}`;
const openRisks = risks.filter((item) => !["closed", "mitigated"].includes(item.state.toLowerCase()));
const openDecisions = decisions.filter((item) =>
  ["open", "analyzing", "proposed"].includes(item.state.toLowerCase()));
const header = (title) =>
  `# ${title}\n\n> Gerado automaticamente por \`node _project-kit/scripts/generate-project-views.mjs\`. Não edite manualmente.\n`;

const dashboard = `${header("Dashboard do projeto")}
## ${projectName}

\`${bar}\` **${progress}%**

| Indicador | Valor |
|---|---:|
| Baseline | ${baselineVersion} |
| Specs | ${specs.length} |
| Concluídas | ${done} |
| Pendentes | ${specs.length - done} |
| Bloqueadas | ${specs.filter((item) => item.status === "blocked").length} |
| Riscos abertos | ${openRisks.length} |
| ADRs | ${adrFiles.length} |
| Decisões abertas | ${openDecisions.length} |

${specs.length ? "" : "> Nenhuma spec real foi cadastrada. Linhas de exemplo não entram nos indicadores.\n"}
## Distribuição das specs

| Estado | Quantidade |
|---|---:|
${["draft", "needs_review", "ready", "in_progress", "blocked", "done"]
  .map((status) => `| ${status} | ${specs.filter((item) => item.status === status).length} |`).join("\n")}
`;

const milestones = activities.map((item) => ({
  date: item.date, event: `${item.actor} — ${item.action}`, evidence: item.evidence || item.scope,
}));
const timeline = `${header("Linha do tempo")}
| Data | Marco | Evidência |
|---|---|---|
${milestones.length
  ? milestones.map((item) => `| ${item.date} | ${item.event} | ${item.evidence} |`).join("\n")
  : "| — | Nenhum marco registrado | — |"}

## Fluxo do kit

\`\`\`mermaid
flowchart LR
    B["Briefing"] --> A["Arquitetura e baseline"]
    A --> S["Specs"]
    S --> I["Implementação"]
    I --> T["Testes e integração"]
    T --> R["Release"]
\`\`\`

> O fluxo representa o processo. A tabela mostra somente marcos registrados.
`;

const dependencyEdges = specs.flatMap((spec) => spec.dependencies
  .map((dependency) => `    ${dependency.replace("-", "_")} --> ${spec.id.replace("-", "_")}`));
const dependencies = `${header("Dependências entre specs")}
\`\`\`mermaid
flowchart TD
${specs.length
  ? specs.map((spec) => `    ${spec.id.replace("-", "_")}["${spec.id} — ${spec.title}"]`).join("\n")
  : '    EMPTY["Nenhuma spec cadastrada"]'}
${dependencyEdges.join("\n")}
\`\`\`

| Spec | Depende diretamente de | Estado | Dependências concluídas? |
|---|---|---|---|
${specs.length ? specs.map((spec) => {
  const ready = spec.dependencies.every((id) => specs.find((item) => item.id === id)?.status === "done");
  return `| ${spec.id} | ${spec.dependencies.join(", ") || "—"} | ${spec.status} | ${ready ? "sim" : "não"} |`;
}).join("\n") : "| — | — | — | — |"}
`;

const traceRows = features.flatMap((feature) => feature.specs.length
  ? feature.specs.map((specId) => {
      const spec = specs.find((item) => item.id === specId);
      const report = reports.get(specId);
      return `| ${feature.origin || "—"} | ${feature.id} — ${feature.title} | ${specId}${spec?.title ? ` — ${spec.title}` : ""} | ${report?.files.join("<br>") || "—"} | ${report?.evidence.join("<br>") || "—"} | ${report?.commit || "—"} | ${report?.pr || "—"} | ${report?.release || "—"} |`;
    })
  : [`| ${feature.origin || "—"} | ${feature.id} — ${feature.title} | — | — | — | — | — | — |`]);
const gaps = features.filter((feature) => feature.specs.length === 0);
const traceability = `${header("Matriz de rastreabilidade")}
| Requisito/origem | Feature | Spec | Arquivos | Testes/evidências | Commit | PR | Release |
|---|---|---|---|---|---|---|---|
${traceRows.length ? traceRows.join("\n") : "| — | Nenhuma feature real cadastrada | — | — | — | — | — | — |"}

## Lacunas

${gaps.length ? gaps.map((feature) => `- ${feature.id} não aponta para uma spec.`).join("\n")
  : features.length ? "- Nenhuma lacuna de feature → spec detectada." : "- Nenhuma feature real cadastrada."}
`;

const kitChanges = read("CHANGELOG.md").match(/^## \[[^\]]+\][\s\S]*?(?=^## \[|\Z)/gm) ?? [];
const productChanges = rows("project/PROJECT_CHANGELOG.md", /^\|\s*\d{4}-\d{2}-\d{2}/);
const releaseNotes = `${header("Release notes")}
## Produto

${productChanges.length ? productChanges.map((c) =>
  `### ${c[2]} — ${c[0]}\n\n- ${c[3]}\n- Specs: ${c[5] || "—"}\n`).join("\n")
  : "> Nenhuma release de produto registrada em `project/PROJECT_CHANGELOG.md`.\n"}
## Project Starter Kit

${kitChanges.length ? kitChanges.join("\n") : "> Nenhuma versão estrutural registrada.\n"}
`;

const actors = [...new Set(activities.map((item) => item.actor).filter(Boolean))];
const contributionHistory = `${header("Histórico de contribuições humanas e de IA")}
\`\`\`mermaid
flowchart TD
${activities.length
  ? activities.map((item, index) => `    A${index}["${item.actor} — ${item.action.replace(/"/g, "'")}"]`).join("\n") +
    "\n" + activities.slice(1).map((_, index) => `    A${index} --> A${index + 1}`).join("\n")
  : '    EMPTY["Nenhuma atividade registrada"]'}
\`\`\`

| Ator | Contribuições registradas |
|---|---:|
${actors.length ? actors.map((actor) =>
  `| ${actor} | ${activities.filter((item) => item.actor === actor).length} |`).join("\n") : "| — | 0 |"}

> Esta visão deriva de \`ACTIVITY_LOG.md\` e não infere identidade, modelo ou autoria ausente.
`;

const outputs = new Map([
  ["DASHBOARD.md", dashboard],
  ["TIMELINE.md", timeline],
  ["SPEC_DEPENDENCIES.md", dependencies],
  ["TRACEABILITY_MATRIX.md", traceability],
  ["RELEASE_NOTES.md", releaseNotes],
  ["CONTRIBUTION_HISTORY.md", contributionHistory],
]);
const differences = [];
for (const [name, content] of outputs) {
  const normalized = `${content.trim()}\n`;
  const target = path.join(outputDir, name);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== normalized) differences.push(name);
  } else {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(target, normalized, "utf8");
  }
}
if (checkOnly && differences.length) {
  console.error(`Visões desatualizadas: ${differences.join(", ")}`);
  process.exit(1);
}
console.log(checkOnly
  ? `Visões atualizadas: ${outputs.size} arquivo(s) conferido(s).`
  : `Visões geradas em ${outputDir}: ${outputs.size} arquivo(s).`);
