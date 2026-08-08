---
id: SPEC-NNN
title: Título curto
status: draft
priority: medium
depends_on: []
parallel_safe: false
project_version: 0.1.0
owner: unassigned
claimed_at: null
branch_or_worktree: null
---

# SPEC-NNN — Título curto

## Resultado esperado

[Descreva o resultado observável, não apenas a atividade.]

## Contexto

- Objetivo relacionado em `_project-kit/project/PROJECT.md`: [seção]
- Requisitos/origens relacionados: [PREENCHA_PRIMEIRO.md §N ou RF-NNN]
- Funcionalidades relacionadas: [F-NNN]
- Referências necessárias: [somente caminhos que devem ser lidos]
- Decisões relacionadas: [ADR-NNN]

## Dentro do escopo

- [PREENCHER]

## Fora do escopo

- [PREENCHER]

## Pré-condições

- [PREENCHER]
- Não existem perguntas `open` de alto impacto relacionadas.
- A spec foi revalidada contra `project_version`.

## Arquivos e áreas permitidos

- Criar: [PREENCHER]
- Alterar: [PREENCHER]
- Não alterar: [PREENCHER]
- Contratos/schemas compartilhados: [PREENCHER]
- Áreas adjacentes afetadas: [PREENCHER]
- Ordem de integração: [PREENCHER]

## Plano executável

1. [Ação pequena e verificável.]
2. [Ação pequena e verificável.]
3. [Validar o resultado.]

## Requisitos funcionais

- RF-01: [PREENCHER]

## Requisitos não funcionais

- RNF-01: [desempenho, segurança, acessibilidade, compatibilidade ou manutenção]

## Impacto de Design e experiência

- Aplicabilidade: [aplicável / não aplicável]
- Contexto: [`project/DESIGN_CONTEXT.md` ou não aplicável]
- Direção vigente: [`project/DESIGN_DIRECTION.md` ou não aplicável]
- Design System: [`project/DESIGN_SYSTEM.md` ou não aplicável]
- Interfaces afetadas: [IDs de `project/UI_INVENTORY.md`]
- Referências aprovadas: [caminhos e aspectos a aproveitar]
- Tarefas e hierarquia que devem ser preservadas:
- Densidade e composição por dispositivo:
- Estados obrigatórios:
- Acessibilidade e motion:
- Conteúdo real, fictício ou ilustrativo:
- Visual/UI Review: [obrigatório / proporcional / não aplicável]

Não use esta seção para redefinir requisitos, capacidades, contratos ou
decisões arquiteturais. Se o Design exigir uma mudança nessas áreas, registre a
dependência e retorne à fonte responsável antes de implementar.

## Estados e casos de borda

- Carregamento:
- Vazio:
- Erro:
- Sem permissão:
- Entrada inválida:
- Responsividade:

## Critérios de aceite

- [ ] CA-01 — Dado [contexto], quando [ação], então [resultado verificável].
- [ ] CA-02 — [PREENCHER]

Cada critério deve ser independente, observável e possuir evidência após a execução. Evite critérios vagos como “funciona corretamente”.

## Validação obrigatória

| Verificação | Comando ou método | Resultado esperado |
|---|---|---|
| Testes | [PREENCHER] | passa |
| Lint/tipos | [PREENCHER] | sem erros |
| Build | [PREENCHER] | concluído |
| Inspeção específica | [PREENCHER] | critérios atendidos |
| Visual/UI Review | [método ou não aplicável] | sem bloqueios críticos |

## Evidências dos critérios

| Critério | Estado | Evidência verificável |
|---|---|---|
| CA-01 | pending | [teste, comando, captura, arquivo ou inspeção] |
| CA-02 | pending | |

## Validação pós-integração

- Contratos, schemas, endpoints ou eventos a reconfirmar: [PREENCHER]
- Consumidores e dependentes a testar: [PREENCHER]
- Testes de contrato/comportamento: [PREENCHER]
- Comparação com critérios de aceite: [PREENCHER]
- Sinais de falha silenciosa a monitorar: [PREENCHER]

## Riscos e rollback

- Riscos:
- Como desfazer:
- Último estado funcional conhecido:
- Área e dependentes potencialmente afetados:

## Saída do agente

Criar `_project-kit/reports/SPEC-NNN.md` com resumo, arquivos alterados, validações, evidências por critério, decisões, riscos e pendências. Adicionar uma linha resumida em `_project-kit/ACTIVITY_LOG.md`.

O relatório também deve preencher `Rastreabilidade da entrega`, informando commit, PR e release quando existirem. Use `não aplicável` quando o projeto não utilizar algum desses mecanismos.
