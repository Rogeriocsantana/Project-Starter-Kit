# Como usar o Project Starter Kit

O `_project-kit/` reúne briefing, contexto operacional, referências, materiais de marca, arquitetura, ADRs, planejamento, especificações e relatórios usados para orientar agentes durante o desenvolvimento.

A versão estrutural vigente do kit é `2.2.0`, registrada em
`_project-kit/VERSION`; seu histórico fica em `_project-kit/CHANGELOG.md`.

Ele não faz parte do produto final. O código, os testes e os assets aprovados do produto devem ser criados fora dessa pasta.

Antes de escolher o modo, use `COMO_AVALIAR_A_COMPLEXIDADE.md` para fazer a avaliação inicial.

## Como o conhecimento é governado

O Kit separa intenção, vocabulário, decisões, trabalho autorizado e evidência.
Consulte:

- `_project-kit/governance/WHY.md` para a finalidade e os limites do Kit;
- `_project-kit/governance/PRINCIPLES.md` para seus princípios estáveis;
- `_project-kit/governance/KNOWLEDGE_MODEL.md` para a autoridade de cada artefato;
- `_project-kit/governance/GOVERNANCE.md` para evolução e versionamento;
- `_project-kit/proposals/` para melhorias candidatas da metodologia.

`README.md` orienta; não governa. Quando documentos divergirem, prevalece a
fonte oficial do tipo de conhecimento em questão.

`PROJECT_PRINCIPLES.md` e `DOMAIN_GLOSSARY.md` são opcionais. Use-os somente
quando princípios duradouros ou ambiguidade de domínio justificarem o custo.
Discussões nascem em specs; definições aprovadas podem ser promovidas ao
glossário como `canonical`.

Projetos registram sua baseline em `project/BASELINE.md` e a versão estrutural do
Kit separadamente. Atualizações do Kit nunca são automáticas.

## Preciso usar o fluxo completo?

Não em todas as tarefas.

Use o **modo leve** somente quando a tarefa for executada por um agente, couber em uma sessão, for pequena e reversível, não alterar arquitetura, stack, APIs, schemas, migrations ou estado compartilhado, não envolver segurança, dados sensíveis ou produção e não depender de outras entregas.

Nesse caso, copie `_project-kit/specs/_QUICK_TASK_TEMPLATE.md`, preencha uma ficha curta, implemente e registre nela as validações. Baseline, feature map, claims e relatório separado podem ser dispensados.

O comando `check-readiness` é destinado ao modo completo e não precisa passar para uma tarefa `QUICK`.

Use o **modo completo** quando houver produto real, múltiplos agentes, continuidade entre sessões, decisões arquiteturais, dados, integrações, contratos compartilhados, risco operacional ou manutenção futura.

Na dúvida, use o modo completo.

### Quando o modo leve deve parar

A conversão para uma spec normal é obrigatória quando qualquer um destes sinais aparecer:

- a tarefa exigir outra sessão ou mais de um agente;
- ultrapassar cinco arquivos do produto;
- afetar API, contrato, schema, migration, evento, autenticação, autorização, dados sensíveis, credenciais, infraestrutura ou produção;
- criar dependência de outra entrega ou exigir decisão de arquitetura/stack;
- sair da área declarada no escopo;
- deixar de possuir rollback local, simples e verificável.

O agente deve parar antes de ampliar a alteração, registrar a conversão e continuar pelo fluxo completo. O fato de parte do código já estar pronta não autoriza permanecer no modo leve.

### Histórico mínimo das tarefas leves

Toda tarefa leve, concluída ou convertida, deve adicionar uma linha em `_project-kit/specs/QUICK_TASKS_LOG.md` com:

- data e ID;
- resumo;
- dono;
- arquivos ou áreas alterados;
- validação executada;
- commit ou referência, quando existir;
- indicação da spec de destino, quando convertida.

O log é append-only: entradas anteriores não devem ser apagadas nem reescritas. Isso mantém a auditoria possível sem exigir índice, claim e relatório completo para cada pequena alteração.

## Estrutura

```text
raiz-do-projeto/
├── AGENTS.md
├── COMO_USAR_O_PROJECT_KIT.md
├── _project-kit/
│   ├── AGENTS_FULL.md
│   ├── START_HERE.md
│   ├── project/
│   │   ├── PROJECT_CONTEXT.md
│   │   ├── RISKS.md
│   │   ├── OPEN_DECISIONS.md
│   │   └── adr/
│   ├── planning/
│   ├── docs/
│   ├── generated/
│   ├── specs/
│   ├── reports/
│   ├── references/
│   ├── brand/
│   ├── ACTIVITY_LOG.md
│   ├── CHANGELOG.md
│   └── scripts/
└── código do produto...
```

## Passo 1 — Definir o projeto

Abra `PREENCHA_PRIMEIRO.md`. Este é o único arquivo que você precisa preencher.

Informe, com suas próprias palavras:

- nome e objetivo;
- problema que será resolvido;
- usuários;
- funcionalidades obrigatórias;
- funcionalidades que podem esperar;
- o que não faz parte da primeira versão;
- regras de negócio;
- integrações;
- dispositivos prioritários;
- prazo e métricas de sucesso.

Você não precisa usar linguagem técnica.

Os agentes transformarão suas respostas em `PROJECT.md`, `CONSTRAINTS.md`, mapa de funcionalidades, referências, arquitetura e specs. Não edite todos esses documentos manualmente para repetir as mesmas informações.

### Como as tecnologias são escolhidas

Na seção Tecnologia de `PREENCHA_PRIMEIRO.md`, você pode:

- definir exatamente a tecnologia;
- informar apenas preferências;
- escrever `a definir` e pedir uma recomendação.

Exemplo de preferência definida:

```md
- Stack obrigatória: Flutter
- Linguagens preferidas: Dart
- Plataformas suportadas: Android e iOS
- Estratégia de escolha: definida pelo usuário
```

Exemplo que exige esclarecimento:

```md
- Stack obrigatória: Kotlin e Flutter
- Plataformas suportadas: Android e iOS
```

Nesse caso, o agente não deve decidir silenciosamente. Ele deve descobrir se você deseja:

- Android nativo com Kotlin;
- Kotlin Multiplatform;
- Flutter/Dart para todo o aplicativo;
- Flutter no aplicativo e Kotlin em uma parte específica;
- outra divisão entre frontend, backend e recursos nativos.

Se você escrever `a definir`, o agente apresentará uma recomendação principal e até duas alternativas, explicando vantagens, limitações, custos e manutenção. Linguagem, framework, plataforma, banco e hospedagem precisam da sua aprovação antes das specs de implementação ficarem `ready`.

Depois da aprovação, o agente registrará a escolha em `_project-kit/project/ARCHITECTURE.md` e em um ADR dentro de `_project-kit/project/adr/`. `ARCHITECTURE.md` é a única fonte de verdade para o estado da aprovação; `CONSTRAINTS.md` registra apenas suas preferências e limitações.

### Contexto recuperável por novos agentes

`_project-kit/project/PROJECT_CONTEXT.md` resume o estado operacional confirmado: entrada sincronizada, baseline, stack, decisões vigentes, riscos, bloqueios e próximo passo. Ele serve como índice de retomada e deve apontar para as fontes de verdade, nunca substituí-las.

O agente atualiza esse resumo sempre que houver mudança relevante em sincronização, baseline, arquitetura, ADR, perguntas, roadmap ou specs.

### Perguntas, decisões e riscos

- `OPEN_QUESTIONS.md` guarda fatos ou requisitos que ainda precisam ser esclarecidos.
- `OPEN_DECISIONS.md` guarda escolhas que precisam de comparação ou aprovação.
- `project/adr/` guarda decisões arquiteturais formalizadas.
- `RISKS.md` registra exposições, impacto, mitigação, contingência e dono.

O fluxo recomendado é: pergunta factual → decisão pendente → ADR, quando a escolha tiver consequência arquitetural ou duradoura.

### Registro de atividades

`_project-kit/ACTIVITY_LOG.md` mantém uma linha do tempo resumida e append-only das contribuições de pessoas e agentes de IA. Ele aponta para evidências; detalhes de implementação continuam nos relatórios das specs.

## Passo 2 — Adicionar referências

Coloque screenshots, inspirações e wireframes em:

```text
_project-kit/references/images/
```

Coloque arquivos ou exportações de Figma, Sketch, Adobe XD e outros designs em:

```text
_project-kit/references/design/
```

Coloque pesquisas e documentos auxiliares em:

```text
_project-kit/references/research/
```

Depois, liste os arquivos e explique o que deve ser observado na seção Imagens e referências de `PREENCHA_PRIMEIRO.md`. O agente atualizará `_project-kit/references/REFERENCE_INDEX.md`.

As referências servem como direcionamento. O agente não deve copiá-las literalmente nem importá-las automaticamente no produto.

## Passo 3 — Adicionar materiais de marca

Use:

```text
_project-kit/brand/logos/
_project-kit/brand/images/
_project-kit/brand/fonts/
```

Liste os materiais na seção correspondente de `PREENCHA_PRIMEIRO.md`. O agente atualizará `_project-kit/brand/ASSET_INDEX.md`.

Quando um asset for aprovado para o produto, o agente deve:

1. confirmar sua licença e versão;
2. otimizar o arquivo;
3. copiar a versão aprovada para a pasta de assets do produto;
4. registrar o destino no inventário.

## Passo 4 — Pedir o planejamento

Envie ao Codex:

```text
Leia o AGENTS.md da raiz e siga as instruções do _project-kit/AGENTS_FULL.md.
Leia PREENCHA_PRIMEIRO.md.
Analise as respostas, as referências e os materiais de marca.
Sincronize os documentos derivados e registre a versão em INPUT_SYNC.md.
Registre perguntas importantes ainda sem resposta.
Proponha a arquitetura e o mapa de funcionalidades.
Divida a primeira versão em specs pequenas, verificáveis e adequadas para agentes independentes.
Atualize PROJECT_CONTEXT.md, RISKS.md, OPEN_DECISIONS.md, ROADMAP.md e BACKLOG.md.
Não implemente o produto ainda.
```

As dúvidas serão registradas em `_project-kit/project/OPEN_QUESTIONS.md`.

O roadmap e o backlog ficam em `_project-kit/planning/`. Sprints só devem ser criadas a partir do template quando existirem baseline aprovada, objetivo claro e specs elegíveis; o kit não cria “Sprint 1” e “Sprint 2” antecipadamente.

Diagramas, fluxos e wireframes produzidos para documentar o projeto ficam em `_project-kit/docs/`. Materiais externos usados apenas como inspiração continuam em `_project-kit/references/`.

### Quando você alterar suas respostas

Incremente `Versão das respostas` em `PREENCHA_PRIMEIRO.md` e peça:

```text
Sincronize a nova versão de PREENCHA_PRIMEIRO.md.
Mostre o que mudou, atualize os documentos derivados, a baseline
e coloque specs afetadas em needs_review. Não implemente ainda.
```

`_project-kit/project/INPUT_SYNC.md` registra qual versão já foi processada. Isso evita que uma mudança sua fique esquecida ou seja copiada parcialmente.

Cada bloco derivado recebe um marcador de origem, por exemplo:

```html
<!-- origem: PREENCHA_PRIMEIRO.md §5 — Escopo -->
```

Tabelas usam uma coluna `Origem`. `_project-kit/project/DERIVATION_MAP.md` mostra como cada uma das 17 seções foi distribuída e qual interpretação foi aplicada.

`INPUT_SYNC.md` mantém uma linha de cobertura por documento e um histórico append-only por versão. Uma sincronização não pode ficar `synced` enquanto algum documento ou seção estiver `pending`.

`verified_no_change` significa que o agente revisou ativamente o documento, comparou-o com as seções relacionadas do formulário e registrou por que nenhuma alteração era necessária. Não é um valor padrão para documentos que não foram mencionados. Sem revisão ou evidência, o estado correto é `pending`.

Toda ocorrência de `[NAO_SEI]` deve criar uma pergunta própria em `OPEN_QUESTIONS.md`, citando seção e campo. O verificador compara essas quantidades e bloqueia specs `ready` quando alguma incerteza não estiver rastreada.

### Quando as perguntas precisam ser respondidas

- Perguntas de impacto alto bloqueiam a aprovação da baseline e a criação de specs `ready`.
- Perguntas de impacto médio bloqueiam as specs indicadas na própria pergunta.
- Perguntas de impacto baixo podem virar premissas explícitas, desde que o risco seja registrado.

Depois de responder uma pergunta bloqueadora, peça ao agente para atualizar o briefing, a baseline e as specs afetadas antes de começar a implementação.

## Passo 5 — Revisar as specs

As entregas ficam em `_project-kit/specs/`. O índice informa estado, prioridade, dependências e possibilidade de paralelização.

Estados:

- `draft`: ainda incompleta;
- `needs_review`: precisa ser revalidada após mudança de baseline, contrato ou dependência;
- `ready`: pronta para execução;
- `in_progress`: sendo executada;
- `blocked`: possui impedimento;
- `done`: concluída e validada isoladamente.

`integrated` não é um sétimo estado da spec. É um estado adicional do claim em `_project-kit/specs/CLAIMS.md`: indica que uma spec `done` foi incorporada ao conjunto e passou novamente pelas validações integradas.

Somente specs `ready`, sem dependências pendentes, podem ser executadas.

Cada spec registra a versão do projeto contra a qual foi escrita. A versão vigente fica em `_project-kit/project/BASELINE.md`.

Os critérios de aceite usam IDs estáveis como `CA-01`. Ao concluir a spec, cada critério deve possuir estado e evidência verificável no relatório, como teste, comando, captura, arquivo ou inspeção.

## Passo 6 — Desenvolver

Para executar uma entrega:

```text
Leia o AGENTS.md da raiz e execute a próxima spec ready de _project-kit/specs/INDEX.md.
Respeite o escopo e os arquivos permitidos.
Faça todas as validações e crie o relatório obrigatório.
```

Para paralelizar:

```text
Identifique specs ready realmente independentes, sem arquivos, contratos, schemas, componentes adjacentes ou estado compartilhados.
Distribua somente essas specs entre agentes.
Registre cada dono e sua área em _project-kit/specs/CLAIMS.md antes de editar.
Considere também conflitos entre contratos, schemas, componentes relacionados, estilos globais, migrations e testes compartilhados.
Defina a ordem de integração.
Ao final, revise e valide a integração.
```

Cada agente deve criar seu relatório em `_project-kit/reports/`.

### Posse e conflitos

`_project-kit/specs/CLAIMS.md` registra quem está executando cada spec, branch ou worktree, áreas exclusivas, áreas adjacentes e ordem de integração. Uma spec não começa sem claim.

Duas specs não devem rodar em paralelo quando alterarem o mesmo contrato, schema, endpoint, componente relacionado, configuração global, migration, fixture ou teste compartilhado — mesmo que editem arquivos diferentes.

## Passo 7 — Verificar se o planejamento está pronto

O verificador principal é multiplataforma e exige apenas Node.js:

```bash
node _project-kit/scripts/check-readiness.mjs
```

No Windows, também existe a alternativa em PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File _project-kit/scripts/check-readiness.ps1
```

O verificador aponta arquivos ausentes, campos não preenchidos e ausência de specs prontas.

## Visões automáticas do projeto

Depois de alterar features, specs, relatórios, riscos, decisões, ADRs, changelogs ou o registro de atividades, execute:

```bash
node _project-kit/scripts/generate-project-views.mjs
```

O comando recria, em `_project-kit/generated/`, o dashboard, a linha do tempo, o grafo de dependências, a matriz de rastreabilidade, as release notes e o histórico de contribuições. Esses arquivos são derivados e não devem ser editados manualmente.

Em automações ou CI, confira se estão atualizados sem reescrevê-los:

```bash
node _project-kit/scripts/generate-project-views.mjs --check
```

Commit, PR e release são campos opcionais: use `não aplicável` quando o fluxo do projeto não adotar Git remoto ou releases formais.

## Quando o briefing mudar

Mudanças no projeto são versionadas em `_project-kit/project/BASELINE.md` e registradas em `_project-kit/project/PROJECT_CHANGELOG.md`.

Quando o briefing, restrições, arquitetura ou regras mudarem:

1. incremente a versão da baseline;
2. registre a mudança no changelog;
3. coloque specs `ready` ou `in_progress` da versão anterior em `needs_review`;
4. revise specs `done` e crie correções se a mudança invalidar algo;
5. atualize a versão de cada spec somente após revalidá-la.

Isso impede que uma entrega continue silenciosamente baseada em requisitos antigos.

Os verificadores comparam automaticamente a versão registrada em cada spec `ready`, `in_progress` ou `done` com a baseline vigente. Se forem diferentes, a verificação falha até que a spec seja reavaliada.

## Quando uma integração falhar

Uma spec `done` ainda pode falhar ao ser combinada com outras entregas. Nesse caso:

1. o dono da integração interrompe integrações dependentes;
2. o claim passa para `integration_failed`;
3. erros e comandos são registrados no relatório;
4. a integração incompleta é revertida para o último estado funcional;
5. a spec causadora volta de `done` para `blocked`;
6. o dono original corrige a entrega, salvo reatribuição explícita;
7. testes locais e integrados são executados novamente;
8. a spec só retorna a `done` e `integrated` depois de todas as validações passarem.

O protocolo completo está em `_project-kit/specs/CLAIMS.md`.

Uma integração também é considerada falha quando build e testes passam, mas uma revisão posterior encontra incompatibilidade de contrato, schema, endpoint, evento, estado compartilhado ou comportamento aceito. A descoberta tardia usa o mesmo protocolo de `integration_failed`.

Quando a causa ainda não é clara, entram em triagem:

- as specs que alteraram a mesma área ou contrato;
- as specs que dependem delas;
- as specs integradas posteriormente na mesma área;
- entregas posteriores que consumam o comportamento possivelmente afetado.

A ordem registrada em `CLAIMS.md` define o ponto de corte inicial. O rollback deve voltar ao último estado funcional conhecido, sem desfazer automaticamente entregas posteriores comprovadamente independentes.

## Quando retirar o kit

Não retire `_project-kit/` durante o desenvolvimento. Ele contém decisões, dependências, critérios de aceite e histórico de execução.

O kit poderá ser removido quando:

- todas as specs necessárias estiverem `done` e com claim `integrated`;
- o produto estiver testado e aceito;
- decisões permanentes estiverem na documentação definitiva;
- assets aprovados já tiverem sido copiados para o produto;
- não houver perguntas ou pendências relevantes;
- os relatórios não forem mais necessários para auditoria.

Antes de remover, peça:

```text
Audite o _project-kit antes da remoção.
Transfira para a documentação definitiva tudo que ainda for necessário para manter, testar, executar e evoluir o produto.
Não exclua nenhum arquivo até apresentar o resultado da auditoria.
```

Após essa auditoria, você pode excluir:

```text
_project-kit/
COMO_USAR_O_PROJECT_KIT.md
```

O `AGENTS.md` da raiz deve ser atualizado ou substituído pelas regras permanentes do projeto. Não o deixe apontando para uma pasta removida.
