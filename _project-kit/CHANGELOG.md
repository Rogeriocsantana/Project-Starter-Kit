# Changelog do Project Starter Kit

Todas as alterações estruturais relevantes do kit são registradas neste arquivo. Mudanças nos requisitos e na baseline do produto pertencem a `_project-kit/project/PROJECT_CHANGELOG.md`.

O formato segue versionamento semântico:

- `MAJOR`: mudança incompatível no fluxo ou na estrutura do kit;
- `MINOR`: capacidade nova compatível;
- `PATCH`: correção ou esclarecimento sem mudar o fluxo.

## [2.2.0] — 2026-07-28

### Adicionado

- Versão estrutural independente em `VERSION`.
- Governança do Kit com motivação, princípios, modelo de conhecimento e regras
  de evolução.
- Propostas leves com origem, nível de evidência, validações e decisão.
- Templates opcionais de princípios específicos e glossário do domínio.
- Registro separado da versão do Kit na baseline do produto.

### Alterado

- Ordem de leitura passa a considerar autoridade documental e conhecimento
  canônico quando aplicável.
- README, guia e entrada do Kit distinguem navegação de governança.
- Verificadores validam a estrutura de governança e a consistência da versão.

### Evidência inicial

- Práticas observadas no Portal Maternidade `0.2.0`.
- Nível atual: `experimental`; implementação no Kit não equivale a validação em
  múltiplos projetos.

## [2.1.0] — 2026-07-20

### Adicionado

- Gerador multiplataforma `scripts/generate-project-views.mjs`.
- Dashboard automático com progresso, specs, riscos, ADRs e decisões.
- Linha do tempo derivada do registro de atividades.
- Grafo de dependências entre specs.
- Matriz requisito → feature → spec → arquivos → testes → commit/PR → release.
- Release notes derivadas dos changelogs do produto e do kit.
- Histórico visual de contribuições humanas e de IA.
- Verificação `--check` para detectar visões desatualizadas.
- GIF demonstrativo com dados fictícios para README e GitHub Pages.

### Alterado

- Templates de spec e relatório passam a registrar requisitos, features e referências de entrega.
- Versão estrutural do kit atualizada para `2.1.0`.

## [2.0.1] — 2026-07-20

### Alterado

- Nome físico recomendado do repositório para `Project-Starter-Kit`.
- Exemplos de navegação e identificação do projeto alinhados ao novo nome.

## [2.0.0] — 2026-07-20

### Adicionado

- Registro de riscos em `project/RISKS.md`.
- Fila de decisões pendentes em `project/OPEN_DECISIONS.md`.
- Linha do tempo append-only em `ACTIVITY_LOG.md` para agentes humanos e de IA.
- Evidências estruturadas por critério de aceite nas specs e relatórios.

### Alterado

- `PROJECT_CONTEXT.md`, sincronização, mapa de derivação, instruções e validadores passam a cobrir riscos e decisões pendentes.

## [1.1.0] — 2026-07-20

### Adicionado

- Planejamento com roadmap, backlog e template de sprint.
- Contexto operacional recuperável por novos agentes.
- Áreas próprias para diagramas, fluxos e wireframes.
- Fluxo visual no README.

### Alterado

- O template passou a se apresentar como Project Starter Kit.
- Architecture Decision Records foram consolidados em `project/adr/`.

## [1.0.0] — 2026-07-20

### Adicionado

- Estrutura inicial do kit, formulário único, documentos derivados, specs, claims, relatórios e verificadores de prontidão.
