# Release notes

> Gerado automaticamente por `node _project-kit/scripts/generate-project-views.mjs`. Não edite manualmente.

## Produto

> Nenhuma release de produto registrada em `project/PROJECT_CHANGELOG.md`.

## Project Starter Kit

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
