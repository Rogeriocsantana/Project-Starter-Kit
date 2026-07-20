# Decisões pendentes

> Fila de escolhas que exigem comparação ou aprovação. Perguntas factuais permanecem em `OPEN_QUESTIONS.md`; decisões formalizadas são registradas em `adr/`.

| ID | Origem | Decisão necessária | Opções | Critérios | Impacto | Bloqueia | Responsável | Prazo | Estado | Resultado/ADR |
|---|---|---|---|---|---|---|---|---|---|---|

Estados: `open`, `analyzing`, `proposed`, `decided`, `deferred`, `obsolete`.

## Fluxo

```text
Pergunta factual → OPEN_QUESTIONS.md
Escolha necessária → OPEN_DECISIONS.md
Decisão formalizada → project/adr/ADR-NNN.md
```

## Regras

- Use IDs estáveis no formato `D-001`.
- Não apresente opções sem critérios de comparação.
- Decisão `open`, `analyzing` ou `proposed` de impacto alto bloqueia a baseline e as specs relacionadas.
- Ao decidir, registre responsável, resultado e ADR quando houver consequência arquitetural ou duradoura.
- Não apague decisões encerradas; preserve o histórico alterando o estado.
