# Release notes

> Gerado automaticamente por `node _project-kit/scripts/generate-project-views.mjs`. Não edite manualmente.

## Produto

> Nenhuma release de produto registrada em `project/PROJECT_CHANGELOG.md`.

## Project Starter Kit

## [2.4.0] — 2026-08-12

### Adicionado

- Governança proporcional por unidade de mudança com classes G0–G4.
- Declaração mínima de escopo autorizado, fronteiras de interrupção e gate final.
- Regra de continuidade para ocorrências normais dentro da classe autorizada.
- Fluxo visual em lotes: captura e aceite antes da bateria técnica completa.
- Proposal P-008, originada na SPEC-011 do Portal Maternidade.

### Alterado

- Templates de SPEC e tarefa rápida passam a registrar a classe de governança.
- Instruções distinguem modo leve/completo de classe G0–G4.
- Disciplina de Design incorpora o ciclo rápido de refinamento G0/G1.

### Compatibilidade

- Mudança compatível e sem retrofit automático para projetos existentes.
- G0–G4 não reduzem controles de segurança, dados, identidade, autorização,
  produção ou infraestrutura.
- A prática permanece `experimental` até validação em outro projeto.


## [2.3.0] — 2026-08-08

### Adicionado

- Disciplina experimental de Design de Produto, UI/UX e Qualidade Visual.
- Fluxo `DESIGN_CONTEXT → DESIGN_DIRECTION → DESIGN_SYSTEM → SPEC → Visual/UI Review`.
- Templates de contexto, direção, fundação do Design System e inventário de interface.
- Template evidencial de Visual/UI Review.
- Proposal P-007 com origem, limites, evidência e validação futura.
- Princípio de que a experiência deriva do produto, não de templates visuais.

### Alterado

- SPECs e relatórios passam a registrar impacto de Design quando aplicável.
- Sincronização e mapa de derivação reutilizam público, jornadas, segurança,
  experiência, referências e qualidade nos artefatos de Design.
- Ordem de leitura, definição de pronto e guias incluem revisão visual sem
  confundir preview, candidato e funcionalidade integrada.
- Verificadores reconhecem os novos artefatos estruturais.

### Compatibilidade

- Mudança compatível e sem retrofit automático para projetos existentes.
- A disciplina permanece `experimental`; verificadores conferem estrutura, mas
  não tornam a aprovação visual um bloqueio universal nesta versão.
- Nenhuma skill, script ou dependência do Taste Skill foi incorporada.


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
