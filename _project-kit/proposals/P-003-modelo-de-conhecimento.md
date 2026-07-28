---
id: P-003
title: Modelo de autoridade dos artefatos
status: implemented
evidence_level: experimental
origin:
  project: portal-maternidade
  version: 0.2.0
target_version: 2.2.0
decision: accepted
---

# P-003 — Modelo de autoridade dos artefatos

## Dor observada

README, SPEC, ADR e glossário podem divergir quando não está claro qual artefato
possui autoridade sobre cada tipo de conhecimento.

## Mudança adotada

Adicionar `governance/KNOWLEDGE_MODEL.md`, distinguindo autoridade estratégica,
normativa, semântica, arquitetural, executiva, evidencial, histórica e
navegacional.

## Limite

Autoridade documental define a fonte oficial; não transfere a responsabilidade
humana pela decisão ao arquivo ou ao agente.
