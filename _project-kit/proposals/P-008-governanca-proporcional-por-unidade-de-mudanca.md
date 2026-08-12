---
id: P-008
title: Governança proporcional por unidade de mudança
status: implemented
evidence_level: experimental
origin:
  project: portal-maternidade
  version: 0.4.0+
target_version: 2.4.0
decision: accepted
---

# P-008 — Governança proporcional por unidade de mudança

## Dor observada

Na SPEC-011 do Portal Maternidade, alterações visuais reversíveis receberam
interrupções semelhantes às usadas para banco, identidade e autorização. O
processo era seguro, porém desproporcional ao risco.

## Evidência

- Projeto: Portal Maternidade `0.4.0+`.
- Contexto: extração de componentes, previews, integração e refinamento visual.
- Resultado: lotes G0/G1 contínuos, com captura antes da bateria completa,
  reduziram interrupções e mantiveram testes, build, candidato e rollback.
- Contraste: rotação de segredos exigiu governança G4 e comprovou que tarefas
  distintas dentro da mesma SPEC precisam de controles distintos.

## Mudança adotada

Adicionar `governance/TASK_GOVERNANCE.md`, classes G0–G4, declaração mínima de
fronteiras, continuidade e escalada. Integrar a classificação aos templates e
às instruções sem substituir o modo leve/completo.

## Generalização

- Reutilizável: classes, critérios, continuidade e escalada.
- Específico: Flutter e as telas do Portal.
- Validação futura: projetos e stacks diferentes.

## Custos e riscos

- Custo permanente: declaração curta por tarefa ou lote.
- Risco: classificar mudança sensível como G0/G1.
- Mitigação: subir a classe ao tocar contrato, autoridade, persistência ou
  infraestrutura.

## Validações em projetos

| Projeto | Versão | Resultado | Adaptações | Evidência |
|---|---|---|---|---|
| Portal Maternidade | 0.4.0+ / SPEC-011 | satisfatório | separação entre aceite visual e gate técnico final | histórico e candidatos da SPEC-011 |

## Decisão

- Estado: implemented.
- Responsável: Roger.
- Data: 2026-08-12.
- Versão de implementação: 2.4.0.
- Maturidade: experimental até validação em outro projeto.
