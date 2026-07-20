# Registro de riscos

> Documento derivado e mantido pelos agentes. Registre exposições confirmadas ou plausíveis; não transforme toda pergunta aberta em risco sem explicar o possível impacto.

| ID | Categoria | Risco | Origem | Probabilidade | Impacto | Mitigação | Contingência | Dono | Specs afetadas | Estado |
|---|---|---|---|---|---|---|---|---|---|---|

Categorias sugeridas: `produto`, `técnico`, `segurança`, `privacidade`, `legal`, `integração`, `operação`, `prazo`, `custo` e `coordenação`.

Probabilidade e impacto: `baixo`, `médio` ou `alto`.

Estados: `open`, `monitoring`, `mitigated`, `accepted`, `occurred`, `closed`.

## Regras

- Use IDs estáveis no formato `R-001`.
- Todo risco `alto` deve possuir dono, mitigação e contingência.
- Risco que bloquear uma entrega deve indicar as specs afetadas.
- Quando um risco ocorrer, registre o impacto no relatório da spec e atualize o estado.
- Riscos aceitos exigem responsável e justificativa.
- Não apague riscos encerrados; preserve o histórico alterando o estado.
