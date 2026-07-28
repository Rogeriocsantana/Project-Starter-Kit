---
id: P-001
title: Princípios canônicos de projeto
status: implemented
evidence_level: experimental
origin:
  project: portal-maternidade
  version: 0.2.0
target_version: 2.2.0
decision: accepted
---

# P-001 — Princípios canônicos de projeto

## Dor observada

Decisões coerentes apareciam dispersas em conversas, specs e documentação, sem
um local pequeno e oficial para regras duradouras do projeto.

## Evidência

- Projeto: Portal Maternidade `0.2.0`.
- Contexto: autenticação e descoberta de domínio da jornada familiar.
- Resultado observado: princípios explícitos ajudaram a controlar escopo e
  separar autenticação, autorização, domínio e implementação.

## Mudança adotada

Adicionar `project/PROJECT_PRINCIPLES.md` como documento opcional e manter os
princípios metodológicos do Kit em `governance/PRINCIPLES.md`.

## Limite

O arquivo não é obrigatório para tarefas simples e não deve crescer
indefinidamente. A prática continua experimental até ser reutilizada.
