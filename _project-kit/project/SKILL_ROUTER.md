# Roteador de skills

Consulte esta tabela antes de executar uma spec. Use somente as skills disponíveis no ambiente atual. Se uma skill citada não estiver disponível, siga o fluxo equivalente com as ferramentas existentes e registre isso no relatório.

| Tipo de trabalho | Skill preferencial | Evidência de conclusão |
|---|---|---|
| Site, landing page, portal ou app web hospedado | `sites:sites-building`, depois `sites:sites-hosting` | build validado e URL quando solicitado |
| Implementar design do Figma em código | `figma:figma-design-to-code` | comparação visual e testes |
| Criar ou alterar design no Figma | `figma:figma-use` + skill específica do tipo de arquivo | link/nós criados e inspeção |
| Gerar ou editar imagens bitmap | `imagegen` | arquivo visual inspecionado |
| Criar ou editar planilha | `spreadsheets:Spreadsheets` | workbook validado |
| Controlar Excel já aberto | `spreadsheets:excel-live-control` | alterações confirmadas na sessão |
| Criar ou editar DOCX | `documents:documents` | renderização visual verificada |
| Criar ou editar PDF | `pdf:pdf` | páginas renderizadas e verificadas |
| Criar apresentação | `presentations:Presentations` | slides renderizados e verificados |
| Dashboard ou relatório analítico | `data-analytics:index` e skill roteada | dados, visual e validação |
| Documentação atual da OpenAI/Codex | `openai-docs` | fontes oficiais citadas |
| Criar uma nova skill reutilizável | `skill-creator` | skill validada |
| Tarefa de código comum | skills específicas disponíveis; caso contrário fluxo nativo | testes, lint e build |

## Regras

- Leia completamente a skill escolhida antes de agir.
- Se várias skills se aplicarem, use o menor conjunto suficiente e declare a ordem.
- Não force uma skill apenas porque ela existe.
- Skills orientam o método; `PROJECT.md`, `CONSTRAINTS.md` e a spec definem o resultado.
