# Índice de specs

Estados permitidos: `draft`, `needs_review`, `ready`, `in_progress`, `blocked`, `done`.

`done` não significa necessariamente integrada. O estado da integração é controlado em `CLAIMS.md`. Uma falha integrada pode devolver uma spec `done` para `blocked`.

Estados da spec e do claim são dimensões diferentes:

- a spec descreve prontidão e execução;
- o claim descreve posse, conflito e integração;
- uma spec normalmente só pode ter claim `integrated` quando estiver `done`;
- `integrated` nunca substitui o estado `done` no índice.

| Ordem | ID | Título | Estado | Baseline | Prioridade | Depende de | Dono | Pode paralelizar | Arquivos/contratos/áreas |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | SPEC-001 | [PREENCHER] | draft | 0.1.0 | alta | — | unassigned | não | |

## Regras de seleção

Uma spec está `ready` quando:

- requisitos e critérios de aceite estão claros;
- a baseline está `approved`;
- a stack necessária está `aprovada` na fonte única de verdade `_project-kit/project/ARCHITECTURE.md`;
- não existe nenhuma pergunta `open` de alto impacto que possa afetá-la;
- sua versão coincide com `_project-kit/project/BASELINE.md`;
- dependências estão `done`;
- arquivos, contratos e áreas adjacentes não conflitam com outro claim;
- validações são executáveis.

Entre specs `ready`, execute primeiro a de maior prioridade e menor número de ordem.

Antes de iniciar, registre a posse em `CLAIMS.md`. Uma mudança de baseline coloca specs ainda não concluídas em `needs_review` até serem revalidadas.
