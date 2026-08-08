# Registro de atividades

Linha do tempo resumida e append-only do trabalho realizado por pessoas e agentes de IA. Os detalhes técnicos continuam nas specs, claims e relatórios.

| Data e hora | Agente | Tipo | Ação | Escopo | Artefatos/evidências | Próximo passo |
|---|---|---|---|---|---|---|
| 2026-07-20 | Codex | estrutura do kit | Criou o README inicial e registrou a tarefa leve QUICK-001 | documentação inicial | `README.md`; `specs/QUICK-001.md`; `specs/QUICK_TASKS_LOG.md` | preencher o briefing |
| 2026-07-20 | Codex | estrutura do kit | Evoluiu o template para Project Starter Kit | contexto, planejamento, ADRs e documentação visual | `project/PROJECT_CONTEXT.md`; `planning/`; `project/adr/`; `docs/`; validadores aprovados | avaliar governança 2.0 |
| 2026-07-20 | Codex | estrutura do kit | Implementou a governança 2.0 | changelog, riscos, decisões, atividades e evidências de aceite | `CHANGELOG.md`; `project/RISKS.md`; `project/OPEN_DECISIONS.md`; templates e validadores | preencher o briefing |
| 2026-07-20 | Codex | estrutura do kit | Renomeou o projeto e o diretório para Project-Starter-Kit | identificação no Codex, documentação e pasta física | título da tarefa; `README.md`; diretório `Project-Starter-Kit` | preencher o briefing |
| 2026-07-20 | Codex | correção de atividade | Registrou que a renomeação física ficou pendente por bloqueio do diretório aberto pelo Codex | pasta física | Windows retornou `MoveDirectoryItemIOError`; origem preservada e destino não criado | fechar o projeto no Codex, renomear a pasta e reabri-la |
| 2026-07-20 | Codex | estrutura do kit | Implementou as visões operacionais automáticas da versão 2.1.0 | dashboard, timeline, dependências, rastreabilidade, releases e contribuições | `scripts/generate-project-views.mjs`; `generated/`; templates e validadores | usar o gerador após alterar suas fontes |
| 2026-07-20 | Codex | correção de atividade | Confirmou a conclusão posterior da renomeação física | pasta do projeto | workspace atual em `C:\Users\Roger\Desktop\WEB\Projetos\Project-Starter-Kit` | nenhuma pendência de renomeação |
| 2026-07-20 | Codex | documentação | Criou GIF demonstrativo com dados fictícios e adicionou-o ao README | apresentação do fluxo do kit | `docs/media/project-starter-kit-demo.gif`; `scripts/generate-demo-gif.py`; inspeção visual dos oito quadros principais | reutilizar a mídia no GitHub Pages |
| 2026-07-28 | Codex | evolução do kit | Implementou a governança experimental 2.2.0 a partir de aprendizados do Portal Maternidade | princípios, autoridade documental, glossário, proposals e versionamento independente | `VERSION`; `governance/`; `proposals/`; `project/DOMAIN_GLOSSARY.md`; `project/PROJECT_PRINCIPLES.md` | validar as práticas em outros tipos de projeto antes de promovê-las a evidência established |
| 2026-08-08 | Codex | evolução do kit | Implementou a disciplina experimental de Design 2.3.0 após proposta e simulação aprovadas | contexto, direção, Design System, inventário, integração com SPEC e Visual/UI Review | `governance/DESIGN_DISCIPLINE.md`; `project/DESIGN_*.md`; `project/UI_INVENTORY.md`; `reports/UI_REVIEW_TEMPLATE.md`; `proposals/P-007-disciplina-design-produto-ui-ux.md` | validar em outro projeto e impedir que os artefatos virem documentação sem decisão |

Tipos sugeridos: `descoberta`, `planejamento`, `decisão`, `implementação`, `revisão`, `validação`, `integração`, `documentação` e `estrutura do kit`.

## Regras

- Adicione uma linha para cada contribuição material ou handoff entre agentes.
- Identifique o agente como informado pelo ambiente, sem presumir identidade.
- Use uma linha separada para cada handoff material. Isso permite gerar a visão de contribuições sem inferir etapas ausentes.
- Resuma o resultado; não copie raciocínio interno, prompts completos, segredos ou dados pessoais.
- Aponte arquivos, specs, relatórios, commits ou comandos que permitam verificar a atividade.
- Não reescreva entradas anteriores. Correções usam uma nova linha.
