# Project Starter Kit

Este diretório é um template isolado para agentes humanos ou de IA trabalharem com segurança e em paralelo. O código do produto deve ficar fora de `_project-kit/`.

Versão estrutural do kit: `2.2.0`. Consulte `VERSION` e `CHANGELOG.md` para mudanças do template e `ACTIVITY_LOG.md` para a linha do tempo de contribuições.

Antes de ampliar o processo, consulte `governance/WHY.md`,
`governance/PRINCIPLES.md` e `governance/KNOWLEDGE_MODEL.md`. O Kit organiza
decisões; não decide pelo projeto.

## Escolha o nível certo

### Modo leve

Use `_project-kit/specs/_QUICK_TASK_TEMPLATE.md` quando **todos** estes pontos forem verdadeiros:

- um único agente executará a tarefa;
- a entrega cabe em uma sessão curta;
- a mudança é pequena, localizada e facilmente reversível;
- não há decisão de arquitetura ou escolha de stack;
- não altera API, schema, migration, contrato ou estado compartilhado;
- não envolve autenticação, autorização, dados sensíveis, credenciais ou produção;
- não possui dependências com outras entregas;
- não exige continuidade ou auditoria entre sessões.

Exemplos: corrigir um texto, ajustar um estilo isolado, adicionar um teste simples ou criar um script pequeno e descartável.

No modo leve, use uma única ficha, implemente, valide e registre o resultado nela. Não é necessário executar todo o cerimonial de baseline, feature map, claims e relatórios.

O `check-readiness` valida o modo completo. Ele não é um gate para fichas `QUICK`.

### Conversão obrigatória

Pare o modo leve e converta a tarefa em spec normal se ocorrer **qualquer** um destes gatilhos:

- a execução precisar de outra sessão ou de um segundo agente;
- o escopo ultrapassar cinco arquivos do produto, sem contar a ficha e o log;
- surgir alteração em API pública, contrato, schema, migration, evento, autenticação, autorização, dado sensível, credencial, infraestrutura ou produção;
- surgir dependência de outra entrega, módulo ainda não preparado ou decisão de arquitetura/stack;
- for necessário alterar uma área que estava explicitamente fora do escopo da ficha;
- o rollback deixar de ser local, simples e verificável.

Antes de continuar, registre no log que a tarefa foi convertida, crie `SPEC-NNN`, atualize o índice e siga o modo completo. Trabalho válido já produzido pode ser preservado, mas deve aparecer no escopo e nas evidências da nova spec.

### Rastro mínimo

Toda tarefa leve concluída ou convertida deve adicionar uma linha append-only em `_project-kit/specs/QUICK_TASKS_LOG.md`, contendo data, ID, resumo, dono, arquivos ou áreas alterados, validação e commit/referência quando existir. Contribuições materiais também recebem uma linha resumida em `_project-kit/ACTIVITY_LOG.md`.

### Modo completo

Use o fluxo completo se qualquer condição acima não for atendida. Ele é o padrão para produto real, múltiplos agentes, várias sessões, arquitetura, dados, integrações ou manutenção futura.

Se qualquer gatilho de conversão ocorrer durante a execução, pare e converta a tarefa em spec normal antes de continuar.

## Como usar

1. Copie todo o conteúdo deste kit para a raiz do novo projeto.
2. Preencha somente `PREENCHA_PRIMEIRO.md`.
3. Coloque referências e materiais nas pastas indicadas dentro do próprio formulário.
4. Peça ao agente para avaliar complexidade, levantar perguntas, decisões e riscos e sincronizar os documentos derivados, incluindo o contexto operacional e o planejamento.
5. Aprove a arquitetura, a stack e a baseline propostas.
6. O agente cria e cadastra as specs.
7. Execute `node _project-kit/scripts/check-readiness.mjs` em qualquer sistema ou use o script PowerShell no Windows.
8. Execute `node _project-kit/scripts/generate-project-views.mjs` para atualizar as visões operacionais.
9. Peça ao agente: `Leia AGENTS.md, planeje as specs necessárias e execute a próxima spec ready.`

As pastas `_project-kit/references/` e `_project-kit/brand/` servem como direcionamento. Elas não fazem parte automaticamente do produto final.

## Fluxo recomendado

Briefing → perguntas abertas → domínio e decisões → arquitetura e ADRs → roadmap → specs → execução → validação → integração → relatório.

Não comece a implementação enquanto os requisitos essenciais estiverem indefinidos.

## Prompts úteis

- Planejamento: `Leia AGENTS.md e PREENCHA_PRIMEIRO.md. Avalie complexidade, sincronize os documentos derivados, identifique perguntas abertas e proponha arquitetura e specs. Não implemente ainda.`
- Próxima entrega: `Leia AGENTS.md e execute a próxima spec ready do _project-kit/specs/INDEX.md.`
- Paralelização: `Leia AGENTS.md e identifique specs ready independentes em arquivos, contratos, schemas, estado e áreas adjacentes. Registre claims antes de distribuir.`
- Auditoria: `Revise specs done e claims integrated, relatórios e código. Verifique critérios de aceite, contratos, testes, segurança, acessibilidade e lacunas de escopo.`
