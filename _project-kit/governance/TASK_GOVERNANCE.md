# Governança proporcional por unidade de mudança

## Objetivo

Calibrar a execução de cada tarefa, lote ou checkpoint pelo risco real da
mudança. A complexidade global do projeto e o modo leve/completo continuam
válidos, mas não determinam sozinhos quantas interrupções uma alteração local
deve produzir.

> Quanto maior o impacto, a persistência, o alcance e o custo de reversão,
> maior deve ser a governança. Trabalho local, reversível e já autorizado deve
> fluir continuamente até o gate combinado.

## Dois controles complementares

| Controle | Pergunta respondida |
|---|---|
| Modo leve ou completo | Quanto registro, rastreabilidade e coordenação o trabalho exige? |
| Classe G0–G4 | Quanto controle, interrupção e evidência esta unidade de mudança exige? |

Uma SPEC em modo completo pode conter lotes G0 ou G1. Isso não transforma cada
ajuste visual em uma nova SPEC nem elimina a rastreabilidade da entrega maior.

## Classes

| Classe | Exemplos | Execução | Gate mínimo |
|---|---|---|---|
| G0 — visual isolado | cor, fonte, espaçamento, ícone, microcopy, alinhamento e acabamento | contínua, sem checkpoints intermediários | captura representativa e aceite visual do lote |
| G1 — código reversível | componente, teste, refatoração interna, preview, reflow, limpeza e build isolado sem mudança de contrato | contínua até o candidato; ocorrências internas são resolvidas sem nova autorização | análise/testes proporcionais, captura quando houver UI e candidato antes de publicar |
| G2 — efeito funcional limitado | conectar tela a API existente, mudar interação real, publicar frontend ou alterar comportamento reversível | plano curto e execução contínua dentro das fronteiras declaradas | testes funcionais e autorização antes da publicação ou mudança externa |
| G3 — dados, identidade e autorização | API/contrato, usuários, perfis, capacidades, credenciais, regra de domínio e dado persistente | SPEC e critérios formais; interromper em mudança de autoridade ou escopo | testes positivos e negativos, auditoria aplicável e aprovação explícita |
| G4 — operação crítica | migration, restore, rotação de segredos, banco, infraestrutura compartilhada e mudança de difícil reversão | checkpoints operacionais formais | backup, rollback, evidência operacional e autorização específica |

## Critérios de classificação

Considere em conjunto impacto, persistência, reversibilidade, alcance e mudança
de contratos ou autoridade. Na dúvida entre duas classes, use a superior até
reduzir a incerteza com uma inspeção somente leitura.

## Declaração mínima

```yaml
governance:
  class: G1
  authorized_scope:
    - componentes de interface
    - testes
    - preview e build isolado
  stop_only_if:
    - API ou contrato precisar mudar
    - autorização ou capacidade precisar mudar
    - dado persistente for afetado
    - infraestrutura compartilhada for afetada
  final_gate:
    - captura para aceite visual
    - análise e testes proporcionais
    - candidato antes da publicação
```

Use somente itens aplicáveis. A declaração deve ser curta e não reproduzir todo
o escopo da SPEC.

## Regra de continuidade

Dentro da classe e das fronteiras já autorizadas, resolva sem nova interrupção:

- lint, formatação e incompatibilidade de API de teste;
- expectativa antiga de teste causada pela mudança aprovada;
- helper ou componente interno necessário;
- reflow, overflow e acessibilidade local;
- limpeza de código órfão ou duplicação criada pela migração;
- rebuild e repetição das validações já autorizadas.

Esses eventos podem constar no resumo final, mas não são novos gates.

## Regra de escalada

Interrompa quando a solução precisar subir de classe, atingir uma fronteira
`stop_only_if`, ampliar materialmente o escopo, introduzir risco não previsto ou
executar ação externa ainda não autorizada. Preserve o trabalho válido e
continue itens independentes quando for seguro.

## Fluxo visual recomendado

Para lotes G0/G1 ainda não aprovados visualmente:

1. receber um lote de alterações;
2. implementar continuamente no componente compartilhado entre preview e produto;
3. mostrar capturas representativas antes da bateria completa;
4. incorporar o feedback no mesmo lote;
5. após aceite visual, executar análise, testes e build uma única vez;
6. gerar candidato e solicitar autorização somente antes da publicação.

Não gaste uma bateria completa em composição que ainda será rejeitada
visualmente. Isso não elimina a validação obrigatória antes da publicação.

## Limites

- G0/G1 não autorizam inventar funcionalidades, dados ou métricas.
- A demanda sobe de classe se exigir API, capacidade, sessão, banco ou
  infraestrutura.
- Ocultação visual nunca substitui autorização real.
- A classificação não reduz controles legais, institucionais ou de segurança.
- O usuário pode exigir governança superior para qualquer tarefa.

## Evidência e maturidade

Esta disciplina é `experimental`, originada na SPEC-011 do Portal Maternidade.
Foi incorporada ao Kit para validação em outros projetos.

