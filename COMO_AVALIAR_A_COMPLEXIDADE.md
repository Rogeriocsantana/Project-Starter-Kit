# Como avaliar a complexidade antes de começar

Não é possível conhecer toda a complexidade antecipadamente. O objetivo desta avaliação é escolher o modo de trabalho, revelar riscos e decidir quais perguntas precisam ser respondidas antes da arquitetura.

Complexidade não é apenas quantidade de telas. Incerteza, dados sensíveis, integrações, regras, permissões e consequências de falha podem tornar um sistema pequeno muito complexo.

## Pontuação inicial

Para cada dimensão, atribua:

- `0`: simples ou inexistente;
- `1`: moderada;
- `2`: alta, crítica ou ainda desconhecida.

| Dimensão | 0 — Simples | 1 — Moderada | 2 — Alta |
|---|---|---|---|
| Escopo | Uma entrega pequena | Várias funcionalidades relacionadas | Muitos módulos ou escopo incerto |
| Usuários | Um tipo de usuário | Dois ou três perfis | Vários perfis e permissões complexas |
| Plataformas | Uma plataforma | Web responsiva ou duas plataformas | Web, Android, iOS, desktop etc. |
| Dados | Poucos dados locais | Banco com relacionamentos | Alto volume, migrations ou dados legados |
| Integrações | Nenhuma | Uma ou duas APIs conhecidas | Várias APIs ou serviços instáveis |
| Autenticação | Não existe | Login comum | SSO, organizações, múltiplos papéis |
| Segurança | Baixo risco | Dados pessoais comuns | Dados financeiros, médicos ou sensíveis |
| Regras de negócio | Poucas e diretas | Algumas condições | Estados, cálculos e exceções complexas |
| Interface | Poucas telas simples | Dashboard ou fluxos variados | Colaboração, tempo real, offline ou editor complexo |
| Infraestrutura | Hospedagem simples | Backend e banco gerenciados | Escala, filas, serviços ou alta disponibilidade |
| Tecnologia | Stack conhecida | Alguma tecnologia nova | Stack indefinida ou experimental |
| Coordenação | Um agente | Vários agentes sequenciais | Vários agentes paralelos |
| Prazo | Flexível | Definido e viável | Curto, rígido ou dependente de terceiros |
| Continuidade | Uma sessão | Várias sessões | Desenvolvimento e manutenção prolongados |

## Resultado

- `0–5`: simples;
- `6–12`: moderada;
- `13–20`: complexa;
- `21–28`: alta complexidade.

A pontuação orienta a decisão, mas não substitui julgamento. Um único item crítico, como dados médicos, pagamentos ou risco de segurança, pode exigir modo completo mesmo com pontuação total baixa.

## Regra para escolher o modo

Use o modo leve somente quando a tarefa também cumprir todos os critérios de `_project-kit/START_HERE.md`.

Use o modo completo quando houver qualquer um destes fatores:

- produto real com continuidade;
- dados pessoais ou sensíveis;
- autenticação e permissões;
- integrações;
- decisões arquiteturais;
- múltiplos agentes;
- contratos, APIs, schemas ou migrations;
- impacto operacional relevante;
- necessidade de auditoria;
- consequências importantes em caso de erro.

## Perguntas de descoberta

1. Quantos tipos de usuário existem?
2. Quais são as cinco funcionalidades principais?
3. Há login, organizações e permissões?
4. Quais dados serão armazenados?
5. Existem dados pessoais ou sensíveis?
6. Quais serviços externos serão integrados?
7. Quais plataformas precisam ser suportadas?
8. Precisa funcionar offline ou em tempo real?
9. Haverá pagamentos?
10. Quantos agentes trabalharão no projeto?
11. O projeto continuará depois da primeira entrega?
12. Qual é a consequência de uma falha?
13. Existem tecnologias obrigatórias?
14. Existem requisitos legais, regulatórios ou de auditoria?
15. Quais respostas ainda são desconhecidas?

Cada resposta desconhecida aumenta a incerteza e deve ser tratada como possível complexidade alta até ser esclarecida.

## Avaliações separadas

Registre também:

- complexidade do produto: jornadas, perfis, regras e exceções;
- complexidade técnica: arquitetura, dados, escala e plataformas;
- complexidade de segurança: sensibilidade, acesso e consequências;
- complexidade de integração: quantidade, estabilidade e contratos externos;
- complexidade de coordenação: agentes, dependências e áreas compartilhadas;
- nível de incerteza: requisitos ainda sem resposta.

## Prompt recomendado

```text
Leia o AGENTS.md, o briefing e COMO_AVALIAR_A_COMPLEXIDADE.md.

Antes de criar a arquitetura ou implementar, avalie cada dimensão de
complexidade com nota 0, 1 ou 2 e apresente a justificativa.

Avalie separadamente produto, técnica, segurança, integrações,
coordenação e incerteza.

Calcule a pontuação, identifique fatores críticos e recomende modo leve
ou completo. Registre perguntas bloqueadoras em OPEN_QUESTIONS.md.

Não implemente ainda.
```

## Reavaliação

Esta classificação é uma hipótese inicial. Reavalie:

- depois das respostas às perguntas abertas;
- antes de aprovar a arquitetura;
- quando o escopo ou a baseline mudar;
- quando surgirem dados, integrações ou regras não previstas.

Se a complexidade aumentar, ajuste arquitetura, specs, validações e estratégia de coordenação antes de continuar.
