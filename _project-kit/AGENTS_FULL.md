# Regras dos agentes

Este arquivo é a porta de entrada obrigatória para qualquer agente que trabalhe neste projeto.

## Fonte de verdade do usuário

`PREENCHA_PRIMEIRO.md` é a única fonte que o usuário precisa editar. Trate suas respostas como fonte de verdade para intenção, escopo, preferências, restrições e referências fornecidas pelo usuário.

Os arquivos em `_project-kit/project/`, `_project-kit/planning/`, `REFERENCE_INDEX.md` e `ASSET_INDEX.md` são documentos derivados mantidos pelos agentes. Não peça ao usuário para repetir manualmente a mesma informação neles.

Ao detectar mudança em `PREENCHA_PRIMEIRO.md`:

1. compare `Versão das respostas` com a última sincronização;
2. atualize documentos derivados afetados;
3. registre dúvidas em `OPEN_QUESTIONS.md`;
4. registre escolhas necessárias em `OPEN_DECISIONS.md` e riscos em `RISKS.md`;
5. incremente a baseline quando a mudança afetar requisitos ou decisões;
6. coloque specs afetadas em `needs_review`;
7. registre a sincronização em `_project-kit/project/INPUT_SYNC.md`.
8. atualize `_project-kit/project/DERIVATION_MAP.md` para cobrir todas as seções;
9. crie uma pergunta em `OPEN_QUESTIONS.md` para cada ocorrência de `[NAO_SEI]`, citando seção e campo.
10. atualize `PROJECT_CONTEXT.md`, `ROADMAP.md` e `BACKLOG.md` quando as respostas afetarem estado, prioridades ou próximos passos.

Não copie respostas cegamente. Normalize, relacione e referencie a origem. Se uma interpretação técnica for necessária, registre-a como proposta ou ADR, não como fala do usuário.

## Autoridade e promoção de conhecimento

Leia `_project-kit/governance/KNOWLEDGE_MODEL.md` para identificar a fonte
oficial de cada tipo de conhecimento. `README.md` e `START_HERE.md` orientam a
navegação; não substituem baseline, glossário, ADR, spec ou relatório.

- Não redefina em uma spec um termo `canonical` de
  `_project-kit/project/DOMAIN_GLOSSARY.md`; referencie-o.
- Discussões de domínio permanecem na spec enquanto estiverem `draft` ou
  `proposed`.
- Promova uma definição a `canonical` somente após decisão explícita e registre
  origem, responsável e data.
- Preserve definições substituídas como `deprecated`.
- `PROJECT_PRINCIPLES.md` é opcional e só governa o projeto quando seus
  princípios estiverem explicitamente aprovados.
- Capturar uma ideia em `proposals/` não autoriza sua adoção em projetos.

Em cada bloco derivado, inclua imediatamente antes um marcador:

```html
<!-- origem: PREENCHA_PRIMEIRO.md §N — Nome da seção -->
```

Quando um bloco combinar várias origens, liste todas. Tabelas podem usar uma coluna `Origem`. O marcador prova rastreabilidade, mas não substitui `DERIVATION_MAP.md` nem o histórico de sincronização.

Não marque a sincronização como `synced` se algum documento estiver `pending`, alguma seção não estiver coberta ou algum `[NAO_SEI]` não tiver pergunta rastreada.

Use `verified_no_change` somente depois de revisar ativamente o documento contra as seções de entrada relacionadas. Registre as seções comparadas e a justificativa/evidência em `INPUT_SYNC.md`. Nunca preencha esse estado automaticamente por ausência de menção; sem revisão, use `pending`.

## Triagem do modo de trabalho

Antes da ordem de leitura completa, determine o modo:

- Use **modo leve** somente quando todos os critérios de `_project-kit/START_HERE.md` forem atendidos.
- Use **modo completo** se qualquer critério falhar ou houver dúvida.
- O usuário pode exigir o modo completo mesmo para uma tarefa pequena.
- Um agente não pode escolher o modo leve apenas para evitar documentação ou validação.

No modo leve, leia a solicitação, as partes diretamente relevantes de `_project-kit/project/PROJECT.md` e `_project-kit/project/CONSTRAINTS.md`, e use `_project-kit/specs/_QUICK_TASK_TEMPLATE.md`. Não é necessário atualizar baseline, ADR, claim, índice ou relatório separado. Ainda é obrigatório preservar alterações, respeitar segurança, validar o resultado e registrar arquivos e verificações na própria ficha, em `_project-kit/specs/QUICK_TASKS_LOG.md` e em `_project-kit/ACTIVITY_LOG.md`.

Se qualquer gatilho objetivo de conversão listado em `_project-kit/START_HERE.md` ocorrer, pare. Registre a conversão no log, crie uma spec normal e siga o modo completo. Não continue no modo leve apenas porque a implementação já começou.

As seções seguintes são obrigatórias no modo completo.

## Ordem de leitura

1. Leia `PREENCHA_PRIMEIRO.md`.
2. Confirme a versão estrutural em `_project-kit/VERSION`.
3. Consulte `_project-kit/governance/KNOWLEDGE_MODEL.md`.
4. Confirme a sincronização em `_project-kit/project/INPUT_SYNC.md` e a cobertura em `_project-kit/project/DERIVATION_MAP.md`.
5. Leia `_project-kit/project/PROJECT.md`.
6. Leia `_project-kit/project/CONSTRAINTS.md`.
7. Leia princípios `canonical` e termos relevantes em `PROJECT_PRINCIPLES.md` e `DOMAIN_GLOSSARY.md`, quando existirem.
8. Leia `_project-kit/project/ARCHITECTURE.md`.
9. Quando houver interface, leia `_project-kit/governance/DESIGN_DISCIPLINE.md` e
   os artefatos de Design aplicáveis citados pela spec.
10. Confirme as versões do projeto e do Kit em `_project-kit/project/BASELINE.md`.
11. Leia `_project-kit/project/PROJECT_CONTEXT.md` como índice de retomada e confirme suas informações nas fontes citadas.
12. Revise `_project-kit/project/OPEN_DECISIONS.md` e `_project-kit/project/RISKS.md` para bloqueios e exposições relacionadas.
13. Consulte `_project-kit/planning/ROADMAP.md` e `_project-kit/planning/BACKLOG.md` quando a tarefa envolver sequência ou prioridade.
14. Consulte `_project-kit/project/SKILL_ROUTER.md` e carregue somente as skills necessárias.
15. Abra `_project-kit/specs/INDEX.md` e selecione uma spec com status `ready`.
16. Leia a spec inteira e somente as referências citadas por ela.

Se algum arquivo obrigatório ainda estiver com marcadores como `[PREENCHER]`, não invente requisitos. Registre a dúvida em `_project-kit/project/OPEN_QUESTIONS.md` e trabalhe apenas no que não depende dela.

## Modelo de execução

- Uma spec deve representar uma entrega pequena, verificável e, sempre que possível, executável por um único agente.
- Antes de editar, confirme escopo, dependências, arquivos permitidos e critérios de aceite.
- Não altere arquivos fora do escopo da spec sem justificar no relatório final.
- Preserve alterações existentes do usuário e de outros agentes.
- Não implemente specs bloqueadas ou cujas dependências não estejam concluídas.
- Use agentes paralelos apenas para specs independentes segundo `_project-kit/specs/CLAIMS.md`.
- Para decisões irreversíveis, custos, produção, credenciais ou mudanças de escopo, solicite autorização.
- Imagens em `_project-kit/references/` e arquivos de `_project-kit/brand/` são direcionamento; não devem ser importados automaticamente no produto.
- Referências fornecidas pelo projeto e decisões aprovadas prevalecem sobre
  referências externas genéricas. Não copie ações, campos, métricas ou estados
  apenas porque aparecem em uma referência visual.
- Não crie código do produto dentro de `_project-kit/`.
- Assets destinados ao produto devem ser copiados, otimizados e registrados em `src/assets/` ou no local definido pela arquitetura.

## Escolha de tecnologias

Antes de criar specs de implementação, verifique as preferências e restrições declaradas pelo usuário em `_project-kit/project/PROJECT.md` e `_project-kit/project/CONSTRAINTS.md`.

- Se o usuário definir linguagem, framework, plataforma, banco ou hospedagem, trate a escolha como requisito, salvo incompatibilidade técnica comprovada.
- Se a preferência for ambígua, esclareça o objetivo antes de decidir. Por exemplo, “Kotlin e Flutter” pode significar Kotlin para Android nativo, Kotlin Multiplatform para compartilhar lógica, Flutter com Dart para uma interface multiplataforma ou Kotlin no backend de um aplicativo Flutter.
- Não substitua silenciosamente uma tecnologia solicitada por outra considerada mais popular ou conveniente.
- Se a stack estiver `a definir`, recomende uma opção principal e no máximo duas alternativas.
- Compare adequação ao produto, experiência da equipe, plataformas, prazo, custo, hospedagem, manutenção, segurança, desempenho, maturidade, dependência de fornecedor e disponibilidade de profissionais.
- Explique vantagens, limitações e consequências sem exigir que o usuário conheça detalhes técnicos.
- Decida sozinho apenas escolhas internas, reversíveis e de baixo impacto que não alterem a stack aprovada.
- Não marque specs de implementação como `ready` até o usuário aprovar linguagem, framework, plataforma, persistência e estratégia de hospedagem aplicáveis.
- Registre a stack e sua aprovação somente em `_project-kit/project/ARCHITECTURE.md`, que é a fonte única de verdade, e registre a decisão em um ADR dentro de `_project-kit/project/adr/`. `CONSTRAINTS.md` guarda preferências e limites, não o estado de aprovação.
- Se uma tecnologia solicitada for inadequada ou incompatível, apresente evidências, impacto e alternativas; aguarde a decisão do usuário.

Quando o usuário não tiver preferência, priorize a solução mais simples que satisfaça os requisitos e que a equipe consiga manter, não a arquitetura mais sofisticada.

## Ciclo obrigatório por spec

1. Confirme que não existem perguntas bloqueadoras e que `project_version` coincide com a baseline atual.
2. Registre dono, horário, branch/worktree, áreas exclusivas e adjacentes em `_project-kit/specs/CLAIMS.md`.
3. Marque a spec como `in_progress` em `_project-kit/specs/INDEX.md`.
4. Faça uma inspeção mínima do código relacionado.
5. Implemente somente o escopo descrito.
6. Execute as validações indicadas na spec.
7. Revise o diff, confirme cada critério de aceite e registre evidência verificável por ID.
8. Atualize documentação ou decisões afetadas.
9. Atualize `PROJECT_CONTEXT.md` se o estado operacional, riscos ou próximo passo mudarem.
10. Marque a spec como `done` ou `blocked` e atualize o claim.
11. Registre o resultado em `_project-kit/reports/<SPEC-ID>.md` usando o template existente.
12. Adicione uma linha resumida e verificável em `_project-kit/ACTIVITY_LOG.md`.
13. Regenere `_project-kit/generated/` quando a spec alterar fontes do dashboard, timeline, dependências, rastreabilidade, release notes ou histórico de contribuições.

Quando houver impacto de interface, antes de concluir também:

14. confirme que contexto, direção e Design System aplicáveis foram consultados;
15. atualize o estado real das telas em `project/UI_INVENTORY.md`;
16. execute o Visual/UI Review proporcional usando
    `reports/UI_REVIEW_TEMPLATE.md`;
17. registre separadamente evidência funcional, visual, responsiva e de
    acessibilidade, sem apresentar preview como funcionalidade integrada.

`done` significa validada isoladamente. `integrated` é um estado adicional do claim, não um estado substituto da spec: significa incorporada ao conjunto e validada novamente. Se a integração falhar de forma técnica ou comportamental, siga `_project-kit/specs/CLAIMS.md`: interrompa o raio afetado, preserve evidências, reverta ao último estado funcional e devolva a spec causadora para `blocked`.

Antes de marcar `integrated`, faça revisão pós-integração de contratos, schemas, endpoints, eventos, consumidores e critérios de aceite. Build verde sem essa revisão não comprova integração correta.

## Mudança de briefing

Quando `PROJECT.md`, restrições, arquitetura ou regras de negócio mudarem, siga `_project-kit/project/BASELINE.md`. Não continue uma spec baseada em versão anterior sem revalidação explícita.

Os verificadores comparam `project_version` das specs `ready`, `in_progress` e `done` com a versão vigente. Divergência é erro de prontidão: revalide a spec, use `needs_review` quando aplicável e só então atualize sua versão.

## Definição global de pronto

Uma spec só está concluída quando:

- todos os critérios de aceite estão atendidos;
- cada critério possui evidência verificável no relatório;
- testes, lint, build e verificações aplicáveis passam;
- estados de erro, carregamento, vazio e acessibilidade foram considerados quando houver interface;
- interfaces com impacto relevante passaram por Visual/UI Review sem bloqueios
  críticos, ou registraram explicitamente por que o review não se aplica;
- conceitos, previews, candidatos e telas funcionais estão classificados sem
  alegações superiores às evidências disponíveis;
- nenhuma credencial ou dado sensível foi adicionado;
- documentação e índice de specs refletem o estado real;
- o relatório de execução informa arquivos alterados, comandos executados, riscos e pendências.
- a contribuição material está registrada em `ACTIVITY_LOG.md`.
- as visões em `_project-kit/generated/` estão atualizadas quando suas fontes foram alteradas.

## Prioridade das instruções

1. Pedido atual do usuário.
2. `AGENTS.md`.
3. Spec em execução.
4. Arquivos de `_project-kit/project/`.
5. Convenções já existentes no código.

Em caso de conflito, pare, documente o conflito e peça direção.
