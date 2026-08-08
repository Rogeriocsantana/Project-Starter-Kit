---
id: P-007
title: Disciplina de Design de Produto, UI/UX e Qualidade Visual
status: implemented
evidence_level: experimental
origin:
  project: Portal Maternidade
  version: 0.4.0
target_version: 2.3.0
decision: accepted
---

# P-007 — Disciplina de Design de Produto, UI/UX e Qualidade Visual

## Dor observada

O Kit coletava preferências visuais e referências, mas não as transformava em
uma síntese de contexto, hipótese visual, sistema coerente e gate de revisão.
No Portal Maternidade, implementações tecnicamente corretas exigiram várias
rodadas para alinhar hierarquia, navegação, densidade, estados e fidelidade às
referências sem inventar funcionalidades.

## Evidência

- Projeto e versão: Portal Maternidade 0.4.0.
- Artefatos, incidentes ou resultados: previews isolados, revisões de navegação,
  separação entre dados reais e ilustrativos, validações responsivas e correções
  posteriores de interfaces consideradas tecnicamente prontas.
- Contexto em que foi observado: Flutter Web com públicos, capacidades e
  restrições visuais diferentes.
- Referência complementar analisada: Taste Skill. Foram aproveitados princípios
  seletivos; nenhuma skill, script ou dependência foi incorporada.

## Mudança candidata

Adicionar uma disciplina tecnológica-independente que conecte:

`DESIGN_CONTEXT → DESIGN_DIRECTION → DESIGN_SYSTEM → SPEC → Visual/UI Review`.

Os artefatos devem produzir decisões verificáveis, reutilizar conhecimento já
coletado e respeitar domínio, arquitetura, segurança e autorização.

## Generalização

- O que parece reutilizável: síntese de contexto, direção como hipótese,
  referências priorizadas, fundamentos semânticos, inventário de UI, estados e
  review baseado em evidência.
- O que continua específico do projeto: cores, estilo, densidade, componentes,
  breakpoints, motion e implementação Flutter.
- Outros projetos necessários para validação: pelo menos um produto de contexto
  diferente, preferencialmente sem Flutter e sem domínio hospitalar.

## Custos e riscos

- Custo permanente: manter quatro artefatos de projeto e um review quando houver
  impacto visual relevante.
- Compatibilidade: adição compatível; projetos existentes não recebem retrofit
  automático.
- Risco de superengenharia: documentação sem decisão, perguntas repetidas,
  direção tratada como regra universal ou review subjetivo.
- Contenção: `não aplicável` permitido; artefatos devem terminar em decisões e
  evidências; verificadores inicialmente apenas conferem estrutura.

## Validações em projetos

| Projeto | Versão | Resultado | Adaptações | Evidência |
|---|---|---|---|---|
| Portal Maternidade | 0.4.0 | problema observado e fluxo simulado | preservar autorização por capacidades e distinguir preview de funcionalidade | histórico e documentação do projeto |

## Decisão

- Estado: implemented
- Responsável: Roger e Codex
- Data: 2026-08-08
- Justificativa: a simulação demonstrou decisões melhores em navegação,
  densidade, responsividade, estados, conteúdo e critérios de aceite.
- Versão de implementação: 2.3.0
- Validação: permanece experimental até uso satisfatório em outro projeto.

