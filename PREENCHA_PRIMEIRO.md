# Formulário único do projeto

> Este é o único arquivo que o usuário precisa preencher antes do planejamento.
> Use `[NAO_SEI]` como valor completo do campo quando quiser que o agente recomende ou faça perguntas.
> Use `[NAO_APLICA]` quando o item não fizer parte do projeto.

## Como preencher

- Substitua os textos entre colchetes pelas suas respostas.
- Escreva com suas próprias palavras; não precisa usar linguagem técnica.
- Se o exemplo não combinar com seu projeto, ignore-o.
- Não apague perguntas que não souber responder: use `[NAO_SEI]`.
- Para listas, adicione quantas linhas forem necessárias.

Exemplo:

```md
- Banco de dados preferido: [NAO_SEI]
- Plataformas: Windows
```

## 1. Controle

- Versão das respostas: `0.1.0`
- Data da atualização: [AAAA-MM-DD]
- Responsável pelas respostas: [PREENCHER]
- Modo desejado: [avaliar automaticamente / leve / completo]

## 2. Identidade

> Informe o que será criado e como você explicaria o projeto rapidamente para outra pessoa.

Exemplo:

```md
- Nome do projeto: Gestão Ocupacional
- Resumo em uma frase: Sistema local para cadastrar funcionários e emitir ASOs.
- Tipo: sistema web local
```

- Nome do projeto: [PREENCHER]
- Resumo em uma frase: [PREENCHER]
- Tipo: [site / sistema web / aplicativo / API / automação / outro]
- Responsável pela decisão final: [PREENCHER]

## 3. Problema e objetivo

> Descreva a situação atual e o resultado desejado. Problema é o que acontece hoje; objetivo é o que deverá melhorar depois do projeto.

Exemplo:

```md
- Problema atual: Os dados ficam espalhados em planilhas e os ASOs são preenchidos manualmente.
- Quem sofre com o problema: Equipe da clínica de medicina ocupacional.
- Resultado que o projeto deve produzir: Centralizar os cadastros e gerar ASOs padronizados.
```

- Problema atual: [PREENCHER]
- Quem sofre com o problema: [PREENCHER]
- Resultado que o projeto deve produzir: [PREENCHER]
- Por que precisa ser feito agora: [PREENCHER]

## 4. Usuários

> Liste quem utilizará o produto e o que cada pessoa poderá fazer. “Perfil” significa um tipo de acesso, como administrador, atendente ou cliente.

Exemplo:

```md
- Usuário principal: Atendente da clínica
- Usuários secundários: Médico responsável e administrador
- Tipos de perfil e permissões: Atendente cadastra; médico revisa; administrador configura
```

- Usuário principal: [PREENCHER]
- Usuários secundários: [PREENCHER]
- Tipos de perfil e permissões: [PREENCHER]
- Contexto de uso: [PREENCHER]
- Experiência técnica dos usuários: [PREENCHER]

## 5. Escopo

> Escopo define o que será ou não desenvolvido. Pense nas funcionalidades, não nas tecnologias.

### Obrigatório na primeira versão

> Liste o mínimo necessário para o produto resolver o problema principal. Pergunte: “Sem essa funcionalidade, ainda consigo usar a primeira versão?”. Se a resposta for não, ela é obrigatória.

Exemplo:

```md
- Cadastrar funcionários, setores e cargos.
- Relacionar cargos com riscos e exames.
- Gerar e preservar o histórico de ASOs.
```

- [PREENCHER]

### Desejável, mas pode esperar

> Liste melhorias úteis que podem ser entregues depois sem impedir o uso da primeira versão.

Exemplo:

```md
- Enviar documentos por e-mail.
- Criar gráficos avançados.
```

- [PREENCHER]

### Fora do projeto ou da primeira versão

> Liste o que não deve ser desenvolvido agora. Isso evita que o agente aumente o projeto por conta própria.

Exemplo:

```md
- Aplicativo para celular.
- Integração com laboratórios.
- Acesso online para funcionários.
```

- [PREENCHER]

## 6. Jornadas principais

> Descreva o passo a passo do usuário do início até alcançar um resultado. Uma jornada não é uma lista de telas; é uma sequência de ações com objetivo.

Exemplo:

```md
1. Atendente seleciona o funcionário, confere cargo, riscos e exames, preenche a avaliação e gera o ASO.
2. Médico consulta o histórico, revisa uma emissão e gera uma nova versão sem apagar a anterior.
```

1. [Como o usuário começa, age e chega ao resultado]
2. [PREENCHER]

## 7. Regras de negócio

> Registre condições que o sistema deve sempre respeitar. Use frases como “deve”, “não pode”, “somente quando” e “se... então...”.

Exemplo:

```md
- Um cargo pode possuir vários riscos e exames.
- Um ASO emitido não pode ser sobrescrito.
- Um cargo vinculado a funcionários não pode ser excluído.
```

- [PREENCHER]

## 8. Dados

> Explique quais informações entram no sistema, de onde vêm e o impacto de perdê-las. Não envie senhas ou dados pessoais reais neste formulário.

Exemplo:

```md
- Dados armazenados: Nome, CPF, nascimento, setor, cargo e histórico de ASOs.
- Origem dos dados: Planilha enviada pela clínica.
- Dados pessoais ou sensíveis: CPF, nascimento e informações ocupacionais.
- Consequência se os dados forem perdidos: Perda de histórico e necessidade de reconstrução manual.
```

- Dados armazenados: [PREENCHER]
- Origem dos dados: [PREENCHER]
- Dados pessoais ou sensíveis: [PREENCHER]
- Dados existentes que precisam ser importados: [PREENCHER]
- Regras de retenção, backup e exclusão: [PREENCHER]
- Consequência se os dados forem perdidos ou alterados incorretamente: [PREENCHER]

## 9. Integrações

> Integração é qualquer outro sistema ou serviço com o qual o projeto precisa trocar informações. Se não houver, use `[NAO_APLICA]`.

Exemplo:

```md
- Serviços externos: Serviço de envio de e-mail
- APIs disponíveis: [NAO_SEI]
- Sistemas antigos envolvidos: Planilha atual de funcionários
```

- Serviços externos: [PREENCHER]
- APIs disponíveis: [PREENCHER]
- Sistemas antigos envolvidos: [PREENCHER]
- Pagamentos, e-mail, mensagens ou notificações: [PREENCHER]

## 10. Tecnologia

> Informe preferências ou obrigações conhecidas. Se você não souber escolher linguagem, framework, banco ou hospedagem, use `[NAO_SEI]` para o agente comparar opções.

“Plataforma” é onde o produto será usado. “Hospedagem ou execução” indica onde ele ficará rodando.

Exemplo:

```md
- Linguagens obrigatórias ou preferidas: JavaScript
- Plataformas: Windows
- Hospedagem ou execução: local
- Banco de dados preferido: [NAO_SEI]
```

- Linguagens obrigatórias ou preferidas: [PREENCHER ou NAO_SEI]
- Frameworks obrigatórios ou preferidos: [PREENCHER ou NAO_SEI]
- Tecnologias que não devem ser usadas: [PREENCHER ou NAO_APLICA]
- Experiência da equipe: [PREENCHER]
- Plataformas: [web / Windows / macOS / Linux / Android / iOS / outras]
- Hospedagem ou execução: [local / nuvem / NAO_SEI]
- Banco de dados preferido: [PREENCHER ou NAO_SEI]
- Restrições técnicas conhecidas: [PREENCHER]

Se houver uma combinação como Kotlin e Flutter, explique o papel imaginado para cada tecnologia ou escreva `[NAO_SEI]` para o agente apresentar opções.

## 11. Segurança, privacidade e acesso

> Considere quem pode acessar cada informação, o que precisa ficar registrado e qual seria o impacto de um acesso indevido.

Exemplo:

```md
- Precisa de login: sim
- Perfis e permissões: Atendente cadastra e médico aprova
- Dados sensíveis: CPF e dados de saúde ocupacional
- Necessidade de logs ou auditoria: Registrar emissões e exclusões
```

- Precisa de login: [sim/não/NAO_SEI]
- Perfis e permissões: [PREENCHER]
- Dados sensíveis: [PREENCHER]
- Requisitos legais ou regulatórios conhecidos: [PREENCHER]
- Necessidade de logs ou auditoria: [PREENCHER]
- O que acontece se uma pessoa não autorizada acessar o sistema: [PREENCHER]

## 12. Experiência e interface

> Descreva a sensação visual desejada e os dispositivos mais importantes. Você pode apontar referências na seção seguinte.

Exemplo:

```md
- Personalidade visual: séria, limpa e profissional
- Cores desejadas: azul, branco e cinza
- Dispositivo prioritário: desktop
- Idiomas: português do Brasil
```

- Personalidade visual: [moderna / séria / minimalista / divertida / outra]
- Cores desejadas: [PREENCHER]
- Cores que devem ser evitadas: [PREENCHER]
- Dispositivo prioritário: [desktop / celular / tablet / todos]
- Idiomas: [PREENCHER]
- Necessidades de acessibilidade: [PREENCHER]
- Conteúdo fornecido por: [PREENCHER]

## 13. Imagens e referências

Você só precisa colocar os arquivos nas pastas abaixo e listá-los nesta seção.

```text
_project-kit/references/images/    screenshots, inspiração e wireframes
_project-kit/references/design/    Figma, Sketch, Adobe XD e exportações
_project-kit/references/research/  pesquisas e documentos
_project-kit/brand/logos/          logos
_project-kit/brand/images/         imagens institucionais
_project-kit/brand/fonts/          fontes
```

Para cada referência, informe:

- **O que aproveitar:** layout, cores, navegação, tipografia, organização ou comportamento.
- **O que ignorar:** partes que não combinam com seu produto.
- **Prioridade:** qual referência deve prevalecer se houver conflito.

| Arquivo ou pasta | O que aproveitar | O que ignorar | Prioridade |
|---|---|---|---|
| `_project-kit/references/images/[ARQUIVO]` | [PREENCHER] | [PREENCHER] | alta/média/baixa |

Para cada material de marca:

> “Pode ser usado no produto?” diferencia inspiração de um arquivo que realmente deverá aparecer no sistema.

| Arquivo | Finalidade | Pode ser usado no produto? | Licença/origem |
|---|---|---|---|
| `_project-kit/brand/logos/[ARQUIVO]` | [PREENCHER] | sim/não/NAO_SEI | [PREENCHER] |

## 14. Qualidade

> Defina expectativas que não são funcionalidades, mas determinam se o produto está bom: velocidade, dispositivos, testes, estabilidade e acessibilidade.

Exemplo:

```md
- Navegadores e dispositivos mínimos: Chrome e Edge em desktop
- Expectativa de desempenho: Abrir telas comuns em até dois segundos
- Testes esperados: Recomendar
- Critérios de acessibilidade: Recomendar
```

- Navegadores e dispositivos mínimos: [PREENCHER]
- Expectativa de desempenho: [PREENCHER]
- Disponibilidade necessária: [PREENCHER]
- Testes esperados: [PREENCHER ou recomendar]
- Critérios de acessibilidade: [PREENCHER ou recomendar]

## 15. Operação

> Explique quando precisa ficar pronto, onde será usado, quem cuidará dele e como deverá ser publicado ou recuperado se algo falhar.

Exemplo:

```md
- Prazo desejado: Primeira versão em dois meses
- Quem fará manutenção: Equipe interna com apoio de agentes
- Ambientes necessários: local e produção
- Necessidade de deploy, rollback, logs, métricas e alertas: Recomendar
```

- Prazo desejado: [PREENCHER]
- Orçamento ou limites de custo: [PREENCHER]
- Quem fará manutenção: [PREENCHER]
- Ambientes necessários: [local / teste / homologação / produção]
- Necessidade de deploy, rollback, logs, métricas e alertas: [PREENCHER]

## 16. Sucesso

> Escreva como você saberá que o projeto funcionou. Métrica é algo observável ou contável; critério de pronto é a condição mínima para começar a usar.

Exemplo:

```md
| Tempo para emitir um documento | 10 minutos | até 2 minutos | medir cinco emissões reais |

- Quando a primeira versão será considerada pronta e útil: Quando cadastrar funcionários, gerar documentos e recuperar o histórico sem usar planilhas manuais.
```

| Métrica | Situação atual | Meta | Como medir |
|---|---:|---:|---|
| [PREENCHER] | | | |

- Quando a primeira versão será considerada pronta e útil: [PREENCHER]

## 17. Dúvidas e observações

> Use esta seção para decisões que você quer delegar ao agente, preocupações e informações que não se encaixaram nas seções anteriores.

Exemplo:

```md
- Decisões que você quer que o agente recomende: Banco de dados e estratégia de backup
- Dúvidas atuais: O sistema deverá funcionar em mais de um computador?
- Informações adicionais: A equipe possui pouca experiência técnica
```

- Decisões que você quer que o agente recomende: [PREENCHER]
- Dúvidas atuais: [PREENCHER]
- Informações adicionais: [PREENCHER]

## Depois de preencher

Envie:

```text
Leia AGENTS.md e PREENCHA_PRIMEIRO.md.
Faça a avaliação de complexidade.
Valide se as respostas são suficientes e registre perguntas bloqueadoras.
Sincronize os documentos derivados do _project-kit sem inventar requisitos.
Proponha arquitetura, funcionalidades e specs, mas não implemente até eu aprovar.
```
