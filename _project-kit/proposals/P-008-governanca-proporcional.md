---
id: P-008
title: Governança proporcional por unidade de mudança (G0–G4)
status: captured
evidence_level: experimental
origin:
  project: Project Starter Kit / Maternidade
  version: 2.3.0
target_version: 2.4.0
decision: pending
---

# P-008 — Governança proporcional por unidade de mudança (G0–G4)

## Dor observada

O Kit aplica uma governança quase uniforme para tarefas com riscos completamente diferentes. Uma alteração pontual de espaçamento visual (CSS/Flutter layout) exige atualmente os mesmos rituais de spec, claims, baseline e relatórios formais que uma migration de banco de dados, criação de credenciais ou mudança na regra de autorização. Isso gera sobrecarga de mensagens, micro-interrupções do usuário e ineficiência de turnos do agente de IA.

## Evidência

- **Projeto e versão:** Portal Maternidade / Project Starter Kit 2.3.0.
- **Contexto em que foi observado:** Durante refatorações visuais da SPEC-011, onde pequenos ajustes de layout, correção de overflow, remoção de código órfão e testes visuais geravam dezenas de interrupções e pedidos de confirmação do agente para problemas que permaneciam estritamente no escopo da interface.

## Mudança candidata

Introduzir no Kit a **Governança Proporcional por Unidade de Mudança**, classificando o nível de risco e autonomia no nível da tarefa ou checkpoint (e não apenas do projeto inteiro ou da SPEC inteira):

### Matriz de Classes (G0 a G4)

| Classe | Tipo de mudança | Exemplo | Comportamento do agente & Gates | Checkpoints |
|---|---|---|---|---|
| **G0** | Visual isolada | Cores, fontes, espaçamento, reflow | Trabalho contínuo autônomo; apresenta apenas o resultado final. | 0 checkpoints intermediários |
| **G1** | Código reversível sem contrato | Componente UI, testes unitários, refatoração interna | Executa, testa e entrega no candidato visual/funcional. | Máximo 1 checkpoint (se solicitado) |
| **G2** | Funcionalidade de efeito limitado | Conectar UI a API existente, deploy exclusivo de frontend | Plano curto e aprovação do usuário antes da publicação. | Plano curto + Gate pré-publicação |
| **G3** | Dados, identidade ou autorização | Usuários, perfis, senhas, permissões, schemas de API | SPEC formal, critérios com testes negativos e aprovação explícita. | Desenho, Implementação e Validação |
| **G4** | Operação crítica | Migrations, restore de banco, secrets, infraestrutura compartilhada | Checkpoints formais operacionais, backup, rollback e autorização de infra. | Operacionais formais |

### Regra Central de Escalamento por Transgressão de Fronteira

- O agente **NÃO deve interromper** o fluxo por problemas contidos dentro da classe autorizada (ex: em G1, erros de lint, testes quebrados em ajuste, refatorações internas ou criação de helpers são trabalho normal).
- O agente **SÓ DEVE PARAR** quando a solução exigir atravessar uma fronteira de classe superior (ex: uma tarefa G1 que descobre a necessidade de alterar uma permissão ou schema de banco deve ser reclassificada para G3, interrompendo o agente para solicitar autorização explícita).

### Bloco de Governança no Schema de SPECs/Checkpoints

```yaml
governance:
  class: G1
  authorized_scope:
    - componentes Flutter
    - testes
    - previews
    - build isolado
  stop_only_if:
    - API precisar mudar
    - capacidade/permissão precisar mudar
    - dado persistente for afetado
    - infraestrutura compartilhada for afetada
  final_gate:
    - candidato visual
    - testes isolados
    - aprovação antes da publicação
```

## Generalização

- **O que parece reutilizável:** O conceito de governança graduada em 5 níveis (G0-G4) e o mecanismo `stop_only_if` aplicam-se universalmente a qualquer desenvolvimento assistido por IA (web, mobile, backend, CLI).
- **O que continua específico do projeto:** A lista de arquivos/tecnologias específicas no `authorized_scope`.

## Custos e riscos

- **Custo permanente:** Adição de uma matriz leve de classificação no template de SPECs.
- **Compatibilidade:** Totalmente compatível com a estrutura existente de SPECs e CLAIMS.
- **Risco de superengenharia:** Baixo, pois a proposta visa reduzir a burocracia desnecessária em mudanças de baixo risco (G0/G1) sem enfraquecer o controle em mudanças críticas (G3/G4).

## Validações em projetos

| Projeto | Versão | Resultado | Adaptações | Evidência |
|---|---|---|---|---|
| Project Starter Kit | 2.3.0 | Proposta capturada | Formulada a partir do feedback do Portal Maternidade | Discussão da SPEC-011 |

## Decisão

- **Estado:** proposed
- **Responsável:** Arquitetura do Projeto / Usuário
- **Data:** 2026-08-10
- **Justificativa:** Proposta cirúrgica para otimizar o fluxo de trabalho de agentes de IA, eliminando micro-interrupções sem comprometer o rigor em dados e segurança.
- **Versão de implementação:** 2.4.0 (alvo)
