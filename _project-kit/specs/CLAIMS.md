# Posse e coordenação de specs

Este arquivo funciona como registro de reserva. Atualize-o antes de iniciar qualquer edição.

| Spec | Agente/dono | Estado | Início | Branch/worktree | Áreas exclusivas | Áreas adjacentes afetadas | Integração |
|---|---|---|---|---|---|---|---|
| SPEC-001 | unassigned | available | — | — | [PREENCHER] | [PREENCHER] | ordem 1 |

Estados: `available`, `claimed`, `released`, `integrating`, `integrated`, `conflict`, `integration_failed`.

## Protocolo de claim

1. Confirme que a spec está `ready` e usa a baseline atual.
2. Verifique arquivos, módulos, contratos, schemas, rotas, estilos globais e testes compartilhados.
3. Registre dono, horário, branch/worktree e áreas antes de editar.
4. Mude a spec para `in_progress`.
5. Se outro claim tocar uma área adjacente, não paralelize sem dividir formalmente o contrato.

## Conflitos e áreas adjacentes

Conflito não significa apenas editar o mesmo arquivo. Considere conflitantes specs que alterem:

- o mesmo contrato, tipo, schema, tabela ou endpoint;
- componentes pai e filho com interface ainda instável;
- estilos, tokens, configuração ou dependências globais;
- migrations, fixtures ou testes compartilhados;
- geração de código ou arquivos produzidos pelo mesmo comando;
- ordem de inicialização, autenticação ou estado global.

Quando houver conflito:

1. marque um claim como `conflict`;
2. escolha um dono da integração;
3. execute em sequência ou extraia primeiro uma spec de contrato;
4. registre a ordem de integração;
5. rebaseie/mescle somente após a spec anterior passar nas validações;
6. rode novamente os testes das duas áreas após integrar;
7. execute a validação pós-integração descrita nas specs, incluindo contratos e consumidores.

## Validação pós-integração

Uma integração não é aprovada apenas porque merge, build e testes existentes passaram. Antes de marcar `integrated`, o dono da integração deve:

1. comparar contratos, schemas, endpoints, eventos e tipos compartilhados antes e depois;
2. testar ao menos um consumidor real ou teste de contrato para cada interface alterada;
3. revalidar critérios de aceite das specs combinadas;
4. verificar comportamento em estados de erro, compatibilidade e dados existentes;
5. revisar mudanças indiretas produzidas por geração de código, migrations ou configuração;
6. registrar evidências no relatório.

Se uma incompatibilidade for descoberta depois, mesmo sem erro técnico imediato, trate-a como `integration_failed`. Exemplos: formato de endpoint alterado silenciosamente, semântica de campo modificada, migration compatível com build mas incompatível com dados, ou componente que mantém tipos mas quebra comportamento esperado.

## Falha de integração e rollback

O dono da integração registrado na coluna `Integração` é responsável por interromper a integração, preservar evidências e coordenar o rollback. Isso não transfere automaticamente para ele a correção do código original.

Se merge, rebase, build, testes ou validação integrada falharem:

1. pare novas integrações dependentes;
2. marque o claim como `integration_failed`;
3. registre comandos, erros e áreas afetadas no relatório da spec;
4. reverta somente a integração incompleta, preservando commits e trabalho válido das branches/worktrees;
5. mude a spec causadora de `done` para `blocked`;
6. se a causa ainda não estiver identificada, determine o raio de impacto pela ordem de integração, dependências e áreas afetadas;
7. atribua a correção ao dono original da spec, salvo reatribuição explícita em `CLAIMS.md`;
8. crie uma spec corretiva quando a solução ampliar escopo ou afetar contratos não previstos;
9. repita validações locais e integradas;
10. restaure `done` e marque `integrated` somente depois que a integração completa passar.

Não apague histórico, relatórios, commits ou evidências para “limpar” uma falha. Rollback deve restaurar um estado funcional conhecido, não ocultar o ocorrido.

## Como determinar o raio de impacto

Comece na primeira integração suspeita e inclua na triagem:

- a spec suspeita e todas as que participaram diretamente da colisão;
- dependentes diretos e transitivos registrados no índice;
- specs integradas depois dela que alteraram a mesma área, contrato ou estado;
- specs posteriores que consomem a interface ou comportamento afetado.

Marque esse conjunto como `blocked` enquanto a causa for desconhecida. Não bloqueie automaticamente specs posteriores comprovadamente independentes.

Use a ordem de integração para restaurar o último ponto funcional conhecido. Se o histórico não permitir isolar a causa com segurança, reverta em ordem inversa as integrações dentro do raio afetado até os testes e contratos voltarem a passar. Registre quais specs foram incluídas ou excluídas da triagem e por quê.
