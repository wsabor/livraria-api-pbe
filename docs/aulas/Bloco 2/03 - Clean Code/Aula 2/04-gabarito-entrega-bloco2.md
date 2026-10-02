# 🔑 Gabarito — Atividade 09: Entrega Consolidada do Bloco 2

**Uso exclusivo do professor.**

---

## Como usar este gabarito

Não há código novo a testar hoje — todo o código de referência (classes, esqueleto, refatorações) já foi validado nos gabaritos de 05/08, 07/08, 12/08, 19/08 e 02/09. Este documento serve para orientar a correção da **entrega consolidada**, não para introduzir conteúdo novo.

---

## O que caracteriza uma entrega completa, por bloco

### Bloco 1 — Diagrama UML

Referência: gabarito de 14/08 (diagrama Mermaid completo) e auditoria de 28/08.

Pontos de atenção na correção:
- Grupos que consolidaram `LivroFisico`, `LivroDigital` ou `Carrinho` no repositório desde 28/08 devem ter o diagrama já refletindo isso — não é conteúdo novo, é apenas confirmar que o ciclo de auditoria foi fechado.
- `Pedido` e `ItemPedido` continuam legitimamente sem código — não cobrar isso como pendência.

### Bloco 2 — Esqueleto MVC

Referência: gabarito de 19/08.

Estrutura esperada mínima:
```
src/
├── index.js
├── routes/livroRoutes.js
├── controllers/livroController.js
├── services/livroService.js
└── models/ (Livro, Categoria, Pessoa, Cliente, Funcionario, e demais consolidadas)
```

### Bloco 3 — Clean Code

Referência: gabarito de 02/09 (constante `PRECO_POR_KG`, quebra de `Carrinho.resumo()`).

Verificar que os ajustes foram de fato aplicados no código do repositório do grupo, não só marcados como "verificado" na atividade individual do dia 02/09 — a entrega de hoje é a oportunidade de conferir se o que foi combinado na revisão de pares realmente chegou ao repositório do grupo.

### Bloco 4 — Ambiente Express

Não há código novo. O critério é operacional: todo integrante, clonando o repositório do zero, consegue rodar `npm install` e `npm run dev` sem erro. Se algum integrante não conseguir, é sinal de alerta a resolver antes de 09/09 — o Bloco 3 do curso depende de que isso funcione para todos.

---

## Checklist de correção rápida (por grupo)

- [ ] Diagrama final entregue, coerente com o código
- [ ] Esqueleto MVC completo, servidor rodando
- [ ] Ao menos uma constante mágica extraída e um método longo quebrado, aplicados de fato no repositório do grupo
- [ ] Todos os integrantes confirmaram rodar o projeto na própria máquina
- [ ] README com resumo consolidado do bloco
- [ ] Commit de entrega com mensagem clara, push feito
- [ ] Link do repositório compartilhado
