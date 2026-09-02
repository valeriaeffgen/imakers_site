---
title: "Como funciona uma venda pelo site"
headline: "Checkout, webhook e conciliação: os oito momentos de uma venda"
description: "Os oito momentos de uma venda no Brasil, por que a página de sucesso não confirma nada e o que precisa existir no back-end para o relatório fechar."
date: 2026-08-26
category: "Pagamentos"
tags: ["checkout", "webhook", "conciliação", "Pix", "e-commerce"]
og: "/og/blog-venda.png"
faq:
  - q: "A página de sucesso não confirma que o pagamento foi feito?"
    a: "Não. Ela só indica que o navegador voltou para uma URL — o que pode acontecer sem pagamento algum, e pode não acontecer mesmo com o pagamento aprovado. A confirmação real vem do status consultado no provedor e do evento recebido e validado no back-end."
  - q: "Por que o webhook precisa ser idempotente?"
    a: "Porque a entrega é 'pelo menos uma vez': o mesmo evento pode chegar duas vezes, fora de ordem ou depois de uma falha temporária. Sem controle de duplicidade, um pedido pode ser liberado duas vezes, um acesso pode ser concedido em duplicidade e o relatório perde a confiabilidade."
---

A conversa costuma começar assim: “é só colocar um botão de pagamento no site, né?”

O botão é a parte fácil. O que sustenta uma operação de venda é o que acontece depois dele — e é aí que a maioria dos projetos descobre o custo real, geralmente no primeiro reembolso ou na primeira contestação.

## Os oito momentos de uma venda

Dividir a venda em momentos evita que o controle financeiro dependa de uma única tela.

| Momento | O que acontece | Quem responde |
| --- | --- | --- |
| 1. Oferta | Produto, preço, condições e política ficam visíveis | Você |
| 2. Checkout | Sessão, preferência ou cobrança é criada no provedor | Sistema |
| 3. Pagamento | Provedor processa Pix, boleto ou cartão | Provedor |
| 4. Webhook | Evento é recebido, validado, persistido e normalizado | Sistema |
| 5. Pedido | Status é atualizado e a próxima ação é liberada | Sistema |
| 6. Entrega | Material, agenda, acesso ou atendimento é liberado | Você e sistema |
| 7. Recebimento | Provedor libera o valor na sua conta | Provedor |
| 8. Conciliação | Venda, taxa, líquido, repasse e extrato são comparados | Sistema e contador |

Note que os momentos 1, 6 e 8 têm participação humana obrigatória. Automatizar os outros cinco é possível. Automatizar esses três, não — e prometer o contrário é como a maior parte das operações se mete em encrenca.

## A página de sucesso não confirma nada

Este é o erro técnico mais comum e o mais caro.

Quando alguém paga e é redirecionado para `/sucesso`, o que aconteceu foi apenas isto: **o navegador carregou uma URL.** Nada mais.

Essa URL pode ser acessada diretamente por qualquer pessoa. Ela pode não ser carregada mesmo com o pagamento aprovado — a pessoa fecha a aba, a conexão cai, o app do banco não redireciona. E, no caso de boleto ou Pix pendente, ela aparece muito antes de o dinheiro existir.

A confirmação real tem duas fontes: o **status consultado no provedor** e o **evento recebido no back-end**. Produto, acesso ou serviço só devem ser liberados a partir de um estado confirmado — nunca porque o usuário voltou para uma tela.

## O webhook precisa ser chato

Webhook bem implementado é uma sequência entediante, e é isso que o torna confiável:

1. Receber o POST do provedor.
2. Validar assinatura, token ou mecanismo equivalente.
3. Verificar se aquele evento **já foi processado**.
4. Persistir o evento e sua referência externa.
5. Responder rápido, com o código que o provedor espera.
6. Processar a atualização de forma assíncrona.
7. Consultar o recurso completo no provedor quando necessário.
8. Atualizar pedido, acesso, relatório e fila de exceções.
9. Reprocessar eventos falhos com idempotência.
10. Monitorar a saúde do endpoint.

O passo 3 é o que separa um sistema de um problema. Provedores entregam eventos “pelo menos uma vez”: o mesmo evento pode chegar duas vezes, fora de ordem ou depois de uma falha temporária. Sem uma restrição de unicidade sobre o identificador do evento, um pedido pode ser liberado em duplicidade.

## Quatro conceitos que não podem ser misturados

Relatório errado quase sempre nasce de confundir estas quatro coisas:

- **Venda** — a obrigação comercial gerada pelo pedido.
- **Pagamento** — a tentativa ou confirmação no provedor.
- **Recebimento** — quando o dinheiro fica disponível, conforme a regra do provedor.
- **Repasse** — a transferência desse saldo para a conta bancária.

Uma venda parcelada no cartão pode estar paga pelo comprador e ser recebida em datas futuras — ou antecipada, com custo adicional. Um Pix pode ser aprovado em segundos e ainda exigir reconciliação com o extrato.

O valor líquido esperado é sempre:

`valor bruto − taxa do provedor − antecipação − outras taxas − reembolsos`

E o sistema não deve **inventar** a taxa. Deve registrar a taxa informada pelo provedor e guardar a origem daquela informação.

## A conciliação existe para mostrar as diferenças

Uma boa rotina de conciliação produz, todo dia, uma fila de exceções: pedido pago sem entrega, pagamento recebido sem pedido interno, webhook duplicado, pedido pendente além do prazo, valor bruto divergente, taxa ausente, repasse não localizado, reembolso sem ajuste, contestação aberta.

A hierarquia de verdade é esta:

1. **Provedor** — status, taxa efetiva, evento, reembolso, contestação.
2. **Sistema** — pedido, produto, cliente, entrega, acesso.
3. **Banco** — o repasse efetivamente creditado.
4. **Contabilidade** — documento fiscal, competência e apuração.

Quando as três primeiras não coincidem, o relatório precisa mostrar. Esconder divergência para o painel parecer conciliado é o caminho mais curto para descobrir o rombo tarde demais.

## Onde o dinheiro deve cair

Uma decisão estrutural, que vale mais que qualquer detalhe técnico: **a conta do provedor deve ser sua, no seu CNPJ ou CPF.**

Quem constrói o sistema integra usando credenciais protegidas no back-end, mas o dinheiro, o relacionamento financeiro e o histórico de recebimentos pertencem a você. Estruturas em que um intermediário recebe primeiro e repassa depois envolvem risco regulatório, fiscal e contratual que raramente compensa antes de existir volume — e nunca deveriam ser adotadas por conveniência de implementação.

É assim que a VOCIRE trabalha nas faixas [Commerce e Recurring](/pagamentos).
