# Roteiro do Professor — PBE | Aula de 28/08/2026 (sexta, 2 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 2 — Continuação de MVC**

**Conteúdo:** papel de cada camada e fluxo completo de uma requisição (rota → controller → service → model)
**Prática:** finalização do esqueleto MVC; validação de coerência entre o diagrama UML e a estrutura de pastas
**Formativa:** estrutura MVC finalizada e coerente com o UML, por grupo (mesmo padrão de 07/08 e 14/08 — confirme se o cronograma atualizado mudou isso)

---

## Tom da aula

Últimas duas aulas da semana. A proposta de hoje é fechar a semana sem abrir conteúdo novo pesado: nada de sintaxe nova, nada de conceito inédito. É consolidação e auditoria — o grupo termina o que ficou faltando de 19/08 e confere se o diagrama de 14/08 ainda bate com o que existe em código. Pode (e deve) ser conduzida com menos lousa e mais circulação entre os grupos.

---

## Situação de partida

De 19/08, cada grupo tem: servidor Express rodando, pastas `routes/`, `controllers/`, `services/` com um arquivo de exemplo para `Livro`, e `models/` com `Livro`, `Categoria`, `Pessoa`, `Cliente`, `Funcionario` consolidados. Alguns grupos podem já ter feito o desafio extra de replicar o esqueleto para `Categoria` — outros não. De 14/08, cada grupo tem um diagrama UML com 10 classes, incluindo duas que ainda não existem em código nenhum (`Pedido`, `ItemPedido`) e três que só existem nos repositórios pessoais dos integrantes, não no repositório do grupo (`LivroFisico`, `LivroDigital`, `Carrinho`).

Essa lacuna entre diagrama e código **não é um erro a corrigir às pressas** — é matéria-prima da aula de hoje. A atividade principal é justamente auditar essa diferença e decidir, com calma, o que fazer com cada peça faltante.

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Revisão leve do fluxo completo, com um pedido novo (`POST /livros`) + finalizar o que faltou do esqueleto |
| 2 | 50 min | Auditoria de coerência entre UML e pastas, em grupo + fechamento da semana |

---

## AULA 1 (50 min) — O fluxo, de novo, com um pedido diferente

### Abertura tranquila (5 min)

Sem história nova, sem quadro cheio. Só retomar, em uma frase, o que já foi construído: "vocês montaram a planta do restaurante na quarta. Hoje a gente confere se ela está de pé e se bate com o desenho."

### Um pedido novo, para variar o exemplo (15 min)

Até aqui o exemplo usado sempre foi buscar livros (`GET /livros`). Hoje, trocar para **cadastrar um livro** (`POST /livros`) — mesmo fluxo, ação diferente, ajuda a generalizar em vez de decorar um caso só.

Perguntar à turma, camada por camada, sem pressa:

```
"Cadastrar um livro novo"

Cliente envia os dados do livro -> ROTA (POST /livros)
                                       -> CONTROLLER (o que fazer com um cadastro?)
                                           -> SERVICE (valida os dados, decide se pode cadastrar)
                                               -> MODEL (onde o livro seria guardado)
                                           <- confirma que deu certo
                                       <- controller devolve a resposta
Cliente recebe a confirmacao
```

Deixar a turma completar cada seta em voz alta, sem você entregar pronto. Se travar em algum ponto, a frase-resgate continua sendo a mesma de 19/08: "quem decide não é quem executa."

### Finalizar o que faltou do esqueleto (30 min)

Cada grupo confere o próprio repositório e completa o que ficou pendente de 19/08:

- Se `categoriaRoutes.js`, `categoriaController.js` e `categoriaService.js` ainda não existem, criar agora, seguindo exatamente o padrão já usado para `Livro`.
- Conferir que o servidor ainda sobe com `npm run dev` sem erro.

Circular sem pressa — é trabalho de finalização, não conteúdo novo. Grupos que já tinham feito isso em 19/08 (como desafio extra) adiantam a Parte 1 da atividade principal.

---

## AULA 2 (50 min) — Auditoria: o diagrama ainda bate com o código?

### Apresentar a auditoria (5 min)

"Hoje vocês vão comparar o diagrama que fizeram em 14/08 com a pasta `models/` que existe de verdade agora. Não é para ficar tudo igual — é para vocês entenderem **por que** algumas coisas ainda não batem, e decidir o que fazer com isso."

### Atividade em grupo (35 min)

Distribuir `03-atividade-auditoria-mvc-uml.md`. O grupo monta uma tabela simples: cada classe do diagrama, e se ela já existe em `src/models/` do repositório do grupo ou não. Para cada "não", o grupo escreve **por que** — pode ser porque ainda não foi consolidada (caso de `LivroFisico`, `LivroDigital`, `Carrinho`) ou porque é uma entidade que só existe no papel por enquanto, sem banco de dados (caso de `Pedido`, `ItemPedido`).

Circular garantindo que a distinção entre os dois tipos de "falta" fique clara — é o ponto pedagógico central da aula, mais importante do que consolidar tudo hoje.

### Fechamento da semana (10 min)

Sem gancho pesado para a próxima aula. Uma frase de fechamento simples: "vocês têm hoje um esqueleto MVC rodando e um diagrama que já sabe apontar exatamente o que falta e por quê. Isso é organização de projeto de verdade — dá pra descansar o fim de semana sabendo onde o projeto está."

```bash
git add .
git commit -m "feat: finaliza esqueleto MVC e audita coerencia com o diagrama UML"
git push
```

---

## Avaliação formativa

**Instrumento:** estrutura MVC finalizada e coerente com o UML, por grupo.

| Critério | O que caracteriza domínio |
|---|---|
| Esqueleto de `Categoria` completo, se ainda faltava | As 3 pastas com o arquivo correspondente, seguindo o padrão de `Livro` |
| Consegue narrar o fluxo de um pedido novo (`POST /livros`) sem ajuda | Nomeia as 4 camadas na ordem certa, para uma ação diferente da já praticada |
| Tabela de auditoria completa | Todas as 10 classes do diagrama avaliadas |
| Distingue os dois tipos de lacuna | Explica por que `Pedido` não existir em código é diferente de `LivroFisico` não existir em código |

---

## Contingências

**Grupo terminou tudo rápido.** Convidar a consolidar `LivroFisico`, `LivroDigital` e `Carrinho` em `src/models/` do grupo agora, já que a auditoria provavelmente vai apontar essa lacuna mesmo assim — adiantar não atrapalha.

**Grupo com dificuldade em narrar o fluxo do `POST /livros`.** Voltar ao exemplo já dominado de `GET /livros` primeiro, e só depois trocar a ação — não insistir em cima do exemplo novo se o antigo ainda não está sólido.

**Sobrou tempo sobrando de verdade, fim de tarde de sexta.** Sem problema em deixar os últimos minutos livres para os grupos organizarem o próprio README ou revisarem o que quiserem do Bloco 2 até aqui — não é necessário preencher cada minuto hoje.
