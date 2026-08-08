# Modelo de conhecimento

Cada artefato responde a uma pergunta e possui autoridade somente sobre aquele
tipo de conhecimento.

| Artefato | Pergunta respondida | Autoridade |
|---|---|---|
| `governance/WHY.md` | Por que o Kit existe? | estratégica do Kit |
| `governance/PRINCIPLES.md` | Quais regras orientam o Kit? | normativa do Kit |
| `governance/DESIGN_DISCIPLINE.md` | Como decisões de experiência e interface são produzidas e verificadas? | normativa de Design do Kit |
| `project/PROJECT_PRINCIPLES.md` | Quais princípios específicos orientam o projeto? | normativa do projeto |
| `project/DOMAIN_GLOSSARY.md` | O que os termos significam neste projeto? | semântica |
| `PREENCHA_PRIMEIRO.md` | Qual é a intenção declarada pelo responsável? | entrada do usuário |
| `project/BASELINE.md` | Qual estado do projeto foi aprovado? | referencial |
| `project/ARCHITECTURE.md` e ADRs | Qual decisão arquitetural vigora e por quê? | arquitetural |
| `project/DESIGN_CONTEXT.md` | Que contexto existente orienta a experiência? | síntese de Design |
| `project/DESIGN_DIRECTION.md` | Qual hipótese visual e de experiência está vigente? | direcional de Design |
| `project/DESIGN_SYSTEM.md` | Quais fundamentos e padrões de interface estão vigentes? | sistêmica de Design |
| `project/UI_INVENTORY.md` | Quais interfaces existem e qual é seu estado real? | inventário de interface |
| `project/OPEN_DECISIONS.md` | O que ainda precisa ser decidido? | fila de decisão |
| `specs/SPEC-NNN.md` | Qual trabalho está autorizado e como será aceito? | executiva |
| `reports/SPEC-NNN.md` | O que foi executado e comprovado? | evidencial |
| `reports/UI_REVIEW-*.md` | A interface atende à direção, ao uso e aos critérios visuais? | evidencial de Design |
| `CHANGELOG.md` e `PROJECT_CHANGELOG.md` | O que mudou entre versões? | histórica |
| `README.md` e `START_HERE.md` | Como começar e navegar? | navegacional |
| `proposals/P-NNN-*.md` | Que melhoria do Kit está sendo considerada? | exploratória |

Quando documentos divergirem, prevalece o artefato que possui autoridade sobre
o assunto, não necessariamente o arquivo mais recente ou mais visível.

## Promoção de conhecimento do domínio

```text
Discussão em uma SPEC
        ↓
Conceito proposto
        ↓
Decisão explícita
        ↓
Definição canônica no glossário
        ↓
Referência pelas specs futuras
```

Estados recomendados para entradas do glossário:

- `draft`: ainda restrita à descoberta;
- `proposed`: candidata registrada, aguardando decisão;
- `canonical`: definição oficial vigente;
- `deprecated`: definição substituída, preservada para rastreabilidade.

A aprovação é o evento que promove uma definição a `canonical`; não é necessário
manter `approved` como estado intermediário.

## Evolução do Kit

```text
Dor ou aprendizado real
        ↓
Proposal
        ↓
Evidência em projetos
        ↓
Decisão de adoção
        ↓
Implementação em nova versão do Kit
        ↓
Validação posterior
```

`implemented` e `validated` são estados diferentes. Uma capacidade pode existir
no Kit e continuar com evidência experimental.
