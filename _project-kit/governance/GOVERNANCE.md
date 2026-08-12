# Governança de evolução do Kit

## Separação entre projeto e metodologia

Aprendizados específicos permanecem no projeto. Somente práticas potencialmente
reutilizáveis são registradas como propostas do Starter Kit.

Uma proposta deve responder:

1. Qual dor real foi observada?
2. Em qual projeto e versão?
3. Qual evidência existe?
4. Por que o Kit atual não tratou bem o problema?
5. A solução é reutilizável ou específica do projeto?
6. Qual é o custo permanente de manter a nova regra?

Sem respostas verificáveis, a ideia pode ser capturada, mas não deve ser adotada.

## Estados de uma proposta

```text
captured → evaluating → accepted | rejected | deferred
                         accepted → implemented → validated
```

- `captured`: ideia preservada, sem compromisso de execução;
- `evaluating`: existem análise e coleta de evidências em andamento;
- `accepted`: adoção decidida, ainda não necessariamente implementada;
- `rejected`: não será adotada nas condições analisadas;
- `deferred`: decisão conscientemente adiada;
- `implemented`: incorporada a uma versão do Kit;
- `validated`: reutilizada posteriormente com resultado satisfatório.

Propostas rejeitadas não são apagadas. Uma nova avaliação exige evidência nova.

## Nível de evidência

- `experimental`: observado em um projeto;
- `emerging`: reutilizado em projetos diferentes, ainda com adaptações;
- `established`: reutilizado repetidamente sem mudança conceitual relevante;
- `contested`: existem resultados ou evidências contraditórios.

Quantidade de projetos não é suficiente por si só. Diversidade de contexto,
adaptações necessárias e resultados também devem ser registrados.

## RFC

RFC não faz parte do fluxo obrigatório nesta versão. Ela poderá ser introduzida
quando uma proposta relevante exigir discussão formal de alternativas,
compatibilidade e migração antes de uma decisão.

Nem toda proposta precisa virar RFC. Nem toda RFC precisa produzir um ADR.

## Versionamento independente

O Kit usa versionamento semântico próprio, registrado em `_project-kit/VERSION`
e `_project-kit/CHANGELOG.md`. A baseline do produto possui outra versão.

Atualizações do Kit em projetos existentes não são automáticas. Devem informar:

- versão de origem e destino;
- mudanças obrigatórias e opcionais;
- compatibilidade;
- procedimento de migração;
- arquivos adotados pelo projeto.

## Regra de contenção

> Uma mudança no Starter Kit deve responder a uma dor observada em projeto real
> ou preservar uma separação conceitual cuja ausência já produza risco
> demonstrável.

Uma retrospectiva do Kit é recomendada somente em marcos relevantes, como MVP,
versão 1.0, incidente significativo ou migração estrutural.

## Governança da execução

A evolução do Kit e a execução de tarefas são controles distintos. Para graduar
uma tarefa, lote ou checkpoint pelo risco real, consulte
`TASK_GOVERNANCE.md`. As classes G0–G4 complementam o modo leve/completo e não
reduzem controles aplicáveis a dados, identidade, autorização, produção ou
infraestrutura.
