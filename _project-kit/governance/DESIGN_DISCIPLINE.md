# Disciplina de Design de Produto, UI/UX e Qualidade Visual

## Objetivo

Transformar contexto, objetivos, tarefas e restrições já conhecidos em uma
experiência compreensível, acessível e visualmente coerente. Design orienta
como as pessoas compreendem e utilizam o produto; não redefine domínio,
requisitos, arquitetura, segurança ou autorização.

Esta disciplina é independente de tecnologia. Flutter, web, aplicações
nativas e outras stacks implementam os mesmos princípios com mecanismos
próprios.

## Posição no fluxo

```text
Briefing e referências
        ↓
Discovery, público, tarefas e contexto de uso
        ↓
Domínio, requisitos, autorização e restrições
        ↓
DESIGN_CONTEXT — síntese do que já é conhecido
        ↓
DESIGN_DIRECTION — hipótese visual fundamentada
        ↓
DESIGN_SYSTEM — fundamentos e padrões vigentes
        ↓
SPEC — trabalho autorizado e critérios observáveis
        ↓
Implementação na stack aprovada
        ↓
Testes funcionais, acessibilidade e responsividade
        ↓
Visual/UI Review
        ↓
Integração e relatório
```

Design começa quando há contexto suficiente e antecede implementação visual
relevante. Descobertas podem retornar ao domínio, requisitos ou arquitetura;
uma tela não deve congelar uma decisão ainda aberta.

## Princípios

1. **O contexto precede a direção visual.** Público, tarefas, ambiente,
   dispositivos, conteúdo, riscos e limitações devem ser compreendidos antes
   de propor uma linguagem visual.
2. **Conhecimento existente deve ser reutilizado.** Consulte briefing,
   discovery, glossário, requisitos, arquitetura, ADRs, referências, decisões
   e specs antes de fazer novas perguntas.
3. **Direção visual é hipótese fundamentada.** Registre evidências, premissas,
   confiança e aspectos adiados; não trate uma preferência como regra universal.
4. **Referências do projeto têm precedência.** Materiais fornecidos e decisões
   aprovadas prevalecem sobre tendências ou referências externas genéricas.
5. **Design não cria funcionalidade por aparência.** Não apresente ações,
   métricas, filtros, estados ou notificações como reais sem contrato funcional.
6. **Design não altera autoridade.** Ocultar uma ação não substitui autorização
   da API, e nomes de perfil não criam permissões.
7. **A linguagem aprovada deve ser preservada e evoluída conscientemente.**
   Novas telas reutilizam fundamentos e padrões; desvios precisam de motivo.
8. **Consistência não exige uniformidade absoluta.** Públicos e contextos
   distintos podem exigir composições distintas dentro do mesmo sistema.
9. **Estados fazem parte do design.** Carregamento, vazio, filtro sem resultado,
   erro, sucesso, permissão, indisponibilidade, progresso e ação ocupada devem
   ser tratados quando aplicáveis.
10. **Acessibilidade, responsividade e legibilidade são critérios de conclusão.**
11. **Motion deve ter propósito.** Movimento orienta, confirma ou preserva
    contexto; não é obrigatório nem decorativo por padrão.
12. **Visualmente convincente não significa funcionalmente aprovado.** Conceito,
    preview, candidato visual, tela integrada e baseline são estados diferentes.
13. **Evite genericidade acidental.** Revise repetição, hierarquia fraca,
    conteúdo artificial e decisões sem relação com o produto, sem criar uma
    lista rígida de estilos proibidos.

## Eixos de calibração

Quando ajudarem a explicar a hipótese, registre:

- densidade de informação;
- expressividade;
- contraste e hierarquia;
- institucional versus emocional;
- produtividade versus contemplação;
- nível e finalidade do movimento;
- prioridade relativa entre desktop, tablet e celular.

Os eixos não recebem valores aleatórios e não produzem uma combinação visual
automaticamente.

## Fronteiras de autoridade

| Disciplina | Autoridade |
|---|---|
| Domínio e requisitos | O que existe e como deve se comportar |
| Segurança e autorização | Quem pode ver ou executar |
| Arquitetura | Como o sistema se sustenta e quais tecnologias estão aprovadas |
| Design | Como a pessoa compreende e utiliza dentro desses limites |
| Implementação | Tradução da solução para a stack |
| Testes e review | Evidência de que o resultado atende aos critérios |

Em conflito, Design deve se adaptar aos limites superiores. Uma necessidade de
UX que exija novo contrato, dado, capacidade ou tecnologia retorna à disciplina
responsável e não é contornada visualmente.

## Processo mínimo

### 1. Sintetizar o contexto

Atualize `project/DESIGN_CONTEXT.md` a partir das fontes existentes. Pergunte
somente o que estiver ausente e puder alterar uma decisão relevante.

### 2. Propor a direção

Registre em `project/DESIGN_DIRECTION.md` uma hipótese explicável, a matriz de
referências, as diferenças entre públicos e o que foi conscientemente adiado.

### 3. Consolidar fundamentos

Registre em `project/DESIGN_SYSTEM.md` tokens semânticos, tipografia,
espaçamento, componentes, estados, responsividade, acessibilidade e motion.
Valores específicos podem permanecer propostos até validação visual.

### 4. Inventariar a interface

Use `project/UI_INVENTORY.md` para separar conceito, preview, candidato,
integração parcial e funcionalidade validada. Cada tela aponta para público,
objetivo, capacidades, referências e spec responsável.

### 5. Autorizar em uma SPEC

Toda SPEC com impacto visual declara fontes de Design, estados, dispositivos,
evidências e revisão aplicável. Se não houver impacto, registre `não aplicável`.

### 6. Executar Visual/UI Review

Use `reports/UI_REVIEW_TEMPLATE.md`. Um build verde ou uma captura bonita não
substitui essa revisão. Bloqueios devem citar decisão violada, evidência,
impacto na tarefa e correção esperada.

## Decisões derivadas

Cada artefato de Design deve terminar com decisões observáveis:

```md
## Decisões de Design derivadas deste documento

| Decisão | Evidência ou contexto | Impacto nas telas | Como verificar |
|---|---|---|---|
```

Documentos que não alterem uma decisão, critério, implementação ou revisão
devem ser reduzidos, combinados ou removidos.

## Aplicabilidade proporcional

- Ajuste visual isolado e reversível pode usar modo leve se satisfizer todos os
  demais critérios do Kit e deve ser classificado como G0 ou G1 conforme
  `TASK_GOVERNANCE.md`.
- Em lotes G0/G1, implemente e mostre capturas representativas antes de executar
  a bateria técnica completa. Após o aceite visual, valide o lote uma única vez
  antes de gerar candidato ou publicar.
- Nova direção, design system, jornada, navegação, responsividade estrutural ou
  revisão de várias telas exige modo completo.
- API, domínio, autorização, dado sensível, arquitetura ou infraestrutura nunca
  entram no modo leve apenas porque a demanda começou como visual.

## Origem metodológica

Esta disciplina nasceu de dificuldades observadas no Portal Maternidade e da
avaliação seletiva de referências externas, incluindo o Taste Skill. O Project
Starter Kit é a fonte de verdade. Nenhuma skill, biblioteca ou tecnologia
externa é dependência desta disciplina.
