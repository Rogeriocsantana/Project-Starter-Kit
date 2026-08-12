# Baseline do projeto

- Versão do Starter Kit: `2.4.0`
- Versão atual: `0.1.0`
- Estado: `draft`
- Atualizada em: AAAA-MM-DD
- Responsável: [PREENCHER]

Esta versão identifica o conjunto vigente de `PROJECT.md`, `CONSTRAINTS.md`, `ARCHITECTURE.md`, decisões e regras de negócio.

## Regra de versionamento

- PATCH (`0.1.0` → `0.1.1`): esclarecimento sem alterar comportamento ou aceite.
- MINOR (`0.1.0` → `0.2.0`): requisito novo ou mudança compatível de escopo.
- MAJOR (`0.1.0` → `1.0.0`): mudança incompatível de objetivo, arquitetura ou regra central.

## Ao mudar a baseline

1. Atualize os documentos afetados.
2. Incremente a versão.
3. Registre a mudança em `PROJECT_CHANGELOG.md`.
4. Mude para `needs_review` toda spec `ready` ou `in_progress` baseada na versão anterior.
5. Revise specs `done` e crie specs corretivas quando a mudança invalidar entregas concluídas.
6. Atualize `project_version` nas specs somente depois da revalidação.

O estado `draft` permite planejamento, mas nenhuma spec pode ficar `ready`. Use `approved` quando as perguntas bloqueadoras estiverem respondidas e o responsável aceitar a baseline.

Os verificadores tratam como erro qualquer spec `ready`, `in_progress` ou `done` cuja `project_version` seja diferente da versão atual. Uma spec antiga não se torna compatível apenas pela troca do número: critérios de aceite, dependências, áreas afetadas e validações devem ser revistos primeiro.
