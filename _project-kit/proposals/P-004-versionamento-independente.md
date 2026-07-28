---
id: P-004
title: Versionamento independente do Kit
status: implemented
evidence_level: experimental
origin:
  project: portal-maternidade
  version: 0.2.0
target_version: 2.2.0
decision: accepted
---

# P-004 — Versionamento independente do Kit

## Dor observada

A versão da baseline do produto podia ser confundida com a versão estrutural do
Kit, dificultando saber quais capacidades estavam disponíveis numa cópia.

## Mudança adotada

Adicionar `_project-kit/VERSION` e registrar a versão do Kit separadamente em
`project/BASELINE.md`.

## Limite

Atualizar o Kit em projetos existentes continua sendo ação explícita. Esta
versão não implementa migração automática.
