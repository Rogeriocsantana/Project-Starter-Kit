# Perguntas abertas

| ID | Origem | Pergunta | Impacto | Bloqueia | Responsável | Prazo | Estado | Resposta/decisão |
|---|---|---|---|---|---|---|---|---|
| Q-001 | `PREENCHA_PRIMEIRO.md §N — campo` | [PREENCHER] | alto/médio/baixo | baseline/specs afetadas | | | open | |

Estados: `open`, `answered`, `obsolete`.

## Gate obrigatório

- Pergunta `open` de impacto alto bloqueia a aprovação da baseline e qualquer spec afetada.
- Pergunta de impacto médio bloqueia somente as specs indicadas em `Bloqueia`.
- Pergunta de impacto baixo pode seguir como premissa explícita dentro da spec.
- Uma spec não pode mudar para `ready` enquanto uma pergunta bloqueadora estiver aberta.
- Ao responder uma pergunta, atualize documentos, baseline e specs afetadas antes de liberar execução.
- Toda ocorrência de `[NAO_SEI]` em `PREENCHA_PRIMEIRO.md` deve gerar uma linha própria com origem exata. Ela pode ficar `answered`, mas não pode desaparecer do histórico.
