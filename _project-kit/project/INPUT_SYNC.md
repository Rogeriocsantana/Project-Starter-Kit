# Sincronização da entrada do usuário

- Versão de `PREENCHA_PRIMEIRO.md` sincronizada: `nenhuma`
- Data da sincronização: [AAAA-MM-DD]
- Agente responsável: [PREENCHER]
- Baseline resultante: `0.1.0`
- Estado: `pending`

Estados: `pending`, `questions_open`, `synced`.

## Cobertura da sincronização atual

| Documento derivado | Resultado | Seções de origem processadas | Alterações ou motivo para não alterar |
|---|---|---|---|
| `PROJECT.md` | pending | | |
| `CONSTRAINTS.md` | pending | | |
| `FEATURE_MAP.md` | pending | | |
| `REFERENCE_INDEX.md` | pending | | |
| `ASSET_INDEX.md` | pending | | |
| `OPEN_QUESTIONS.md` | pending | | |
| `OPEN_DECISIONS.md` | pending | | |
| `RISKS.md` | pending | | |
| `ARCHITECTURE.md` | pending | | |
| `BASELINE.md` | pending | | |
| `PROJECT_CONTEXT.md` | pending | | |
| `planning/ROADMAP.md` | pending | | |
| `planning/BACKLOG.md` | pending | | |
| `DERIVATION_MAP.md` | pending | §1–§17 | |

Resultados permitidos: `updated`, `verified_no_change`, `not_applicable`, `pending`.

`synced` só é permitido quando nenhuma linha estiver `pending`, todas as seções estiverem cobertas em `DERIVATION_MAP.md` e todas as ocorrências de `[NAO_SEI]` tiverem destino em `OPEN_QUESTIONS.md`.

### Significado de `verified_no_change`

`verified_no_change` é uma confirmação ativa, nunca um valor padrão. O agente deve:

1. identificar as seções da nova entrada que poderiam afetar o documento;
2. comparar essas respostas com o conteúdo derivado atual;
3. confirmar que nenhuma atualização é necessária;
4. preencher `Seções de origem processadas`;
5. registrar em `Alterações ou motivo para não alterar` a evidência ou justificativa da conclusão.

Ausência de menção no formulário não prova ausência de mudança. Se a revisão não foi feita ou não possui evidência, mantenha `pending`.

`not_applicable` também exige justificativa explícita baseada em `[NAO_APLICA]`.

## Histórico append-only

| Data | Entrada | Baseline resultante | Documentos atualizados | Documentos verificados sem mudança | Perguntas criadas/atualizadas | Agente |
|---|---|---|---|---|---|---|
| AAAA-MM-DD | 0.1.0 | 0.1.0 | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

Não apague registros anteriores. Uma correção deve criar uma nova linha.
