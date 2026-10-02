# Roteiro do Professor — PBE | Aula de 02/10/2026 (sexta, 2 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 3 — Consolidação de parâmetros e do CRUD em memória**

**Conteúdo:** consolidação dos três tipos de parâmetro (route param, query param, body); revisão do CRUD em memória
**Prática:** filtros por query params; conferência dos 5 métodos
**Capacidades:** CT 6, CT 8 | CS 1, 4
**Formativa:** exercícios de parâmetros

---

## Situação de partida

Sexta de consolidação: **nenhum conteúdo novo**. Desde 09/09 a turma recebeu, em sequência rápida, `GET`, os 5 métodos HTTP, status codes e os três tipos de parâmetro. Cada grupo está num ponto diferente — alguns com o CRUD inteiro, outros com rota e controller com nomes que não batem. O objetivo de hoje é **cada grupo sair com o CRUD de Livro conferido e funcionando**.

**A pergunta que estrutura a aula:** *"a API de vocês está completa? Como vocês têm certeza?"* A resposta não pode ser "acho que sim" — tem que ser uma tabela com status esperado × status obtido.

Três ideias, todas já vistas:

1. Os três tipos de parâmetro — **qual**, **filtrar**, **dados**.
2. O mapa da API — cada rota com o status esperado.
3. Ler a mensagem de erro antes de pedir ajuda.

E um gancho para 14/10: **o mistério do DELETE**.

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Revisão dos três tipos + mapa da API + leitura de erros, ao vivo |
| 2 | 50 min | Mistério do DELETE + atividade em grupo + fechamento |

---

## AULA 1 (50 min) — Revisão com a API funcionando na frente deles

### Abertura com a pergunta (5 min)

Lançar: "a API de vocês está completa? Como vocês têm certeza?" Ouvir duas ou três respostas. Mostrar que "testei e funcionou" não basta: testou **o quê**, esperando **qual** status?

### Os três tipos, de novo (10 min)

Mesmo quadro de 30/09, agora como revisão:

```
ROUTE PARAM   ->  diz QUAL livro            ->  /livros/3
QUERY PARAM    ->  diz COMO filtrar a lista    ->  /livros?autor=martin
BODY            ->  leva os DADOS do livro      ->  { "titulo": "..." }
```

> 💡 Frase-âncora: "route param diz **qual**. Query param **filtra**. Body **leva os dados**."

Exercício relâmpago oral: ler em voz alta 4 ou 5 URLs e a turma responde o tipo. Sugestões: `GET /livros/5`, `GET /livros?autor=tolkien`, `POST /livros` com corpo, `DELETE /livros/1`, `GET /livros?precoMax=40`.

### O mapa da API, montado no quadro (20 min)

Montar com a turma, rodando cada linha no Postman na API de referência:

| Método | Rota | Deu certo | Livro não existe |
|---|---|:---:|:---:|
| GET | `/livros` | 200 | — |
| GET | `/livros/0` | 200 | 404 |
| POST | `/livros` | 201 | — |
| PUT | `/livros/0` | 200 | 404 |
| PATCH | `/livros/0` | 200 | 404 |
| DELETE | `/livros/0` | 204 | 404 |

Esse quadro está no guia do aluno (seção 2).

> ⚠️ Mostrar ao vivo: cadastrar um livro com `POST`, salvar qualquer arquivo, rodar `GET /livros` — o livro sumiu. **Os dados moram na memória e o Nodemon reinicia o servidor a cada arquivo salvo.** Esse é o motivo mais comum de "sumiu meu livro" durante a conferência.

### Lendo a mensagem de erro (15 min)

Quebrar a API de referência ao vivo, um erro por vez, e mostrar **onde ler a pista** (arquivo e linha). Os dois são reais, apareceram na turma:

| Quebra feita ao vivo | O que aparece | Pista |
|---|---|---|
| Na rota, trocar `livroController.listar` por `livroController.listarLivros` | Servidor nem sobe: `TypeError: argument handler must be a function`, apontando `livroRoutes.js:10` | O nome usado na rota não existe no `module.exports` do controller — o Express recebeu `undefined` |
| Fazer `POST` sem o cabeçalho `Content-Type` | **500**, `Cannot read properties of undefined (reading 'titulo')` | `express.json()` não converteu o corpo, então `req.body` ficou `undefined` (visto em 23/09) |

A cada erro, perguntar antes de corrigir: **qual arquivo? qual linha?**

> 💡 O primeiro erro aconteceu num grupo durante a aula de 30/09. Vale contar isso, sem citar o grupo: é o erro de quem copia o trecho do guia mas muda o nome da função de um lado só.

> 💡 No Postman, escolher **Body → raw → JSON** já coloca o `Content-Type` sozinho. Por isso a atividade manda usar esse caminho.

---

## AULA 2 (50 min) — O mistério do DELETE + atividade

### O mistério do DELETE (10 min)

Na API de referência recém-iniciada (2 livros: posição 0 = Clean Code, posição 1 = Eloquent JavaScript):

1. Rodar `DELETE /livros/0` → **204**.
2. **Antes** do próximo, perguntar: "e agora, `GET /livros/0` devolve o quê?" Votação de mão levantada. Quase todos vão dizer **404** — o guia de 23/09 e a Atividade 12 diziam isso.
3. Rodar `GET /livros/0` → **200**, com o "Eloquent JavaScript".

Explicar com a imagem da fila: quando alguém sai da frente, todo mundo anda uma posição. O número na URL é a **posição**, não o "número do livro".

> ⚠️ **Não resolver hoje.** Deixar a pergunta no ar: "como fazer para cada livro ter um número que nunca muda?" A solução (trocar índice por `id`) é a aula de 14/10.

> ℹ️ **Correção de material anterior:** a tabela da Atividade 12 esperava **404** em `GET /livros/0` depois do `DELETE /livros/0`. Isso só acontece se o livro apagado for o último do array. Grupos que anotaram 200 estavam certos — vale reconhecer isso em voz alta.

### Atividade em grupo (35 min)

Distribuir `03-atividade-consolidacao-grupo.md` (Atividade 14):

1. Marcar o tipo de parâmetro em 4 requisições (5 min).
2. Conferência dos 5 métodos, com tabela esperado × obtido, terminando no mistério do DELETE (15 min).
3. Filtro por `titulo`: colar o código e trocar duas lacunas (10 min).
4. Enviar.

Prioridade, se o tempo apertar: **Parte 2 primeiro.** Grupo que não tiver os 5 métodos funcionando usa a aula para fechar essa pendência. Parte 3 pode ficar para 07/10 ou 09/10 (carga reduzida, pendências).

Circular pelos grupos com o gabarito (`04-gabarito-consolidacao.md`) aberto.

### Fechamento (5 min)

```bash
git add .
git commit -m "feat: adiciona filtro por titulo e confere CRUD de livros"
git push
```

Ganchos:

- **07/10 e 09/10** (Semana da Criança, carga reduzida): sem conteúdo novo — quem tiver pendência da API fecha ali.
- **14/10:** "lembram do mistério do DELETE? Na próxima aula de conteúdo, cada livro ganha um número que nunca muda."

---

## Avaliação formativa

**Instrumento:** exercícios de parâmetros (Atividade 14).

| Critério | O que caracteriza domínio |
|---|---|
| Classifica o tipo de parâmetro | Acerta as 3 linhas da Parte 1 |
| CRUD conferido | Tabela da Parte 2 preenchida; os 5 métodos devolvem o status esperado |
| Entende o mistério do DELETE | Diz, com as próprias palavras, que o livro "andou" de posição |
| Novo filtro por query param | `GET /livros?titulo=code` funciona |

---

## Contingências

**Grupo com o servidor que não sobe.** Quase sempre é o nome na rota diferente do `module.exports` do controller. Pedir para o grupo ler a linha apontada pelo erro antes de você olhar o código.

**Grupo com catálogo diferente do de referência.** Normal. O que importa na Parte 2 são os **status**. Para o mistério do DELETE, basta ter pelo menos 2 livros no início.

**Grupo com rota `/:id` em vez de `/:indice`.** Alguns grupos já renomearam o parâmetro. Funciona igual, desde que o controller leia `req.params.id`. Não precisa mudar.

**Dados "sumindo" no meio da conferência.** O grupo salvou um arquivo e o Nodemon reiniciou. Recomeçar a Parte 2 do passo 1.

**Grupo pergunta sobre `Number(...)` no filtro de preço.** Detalhe para o professor, não para o aluno: o guia de 30/09 diz que, sem `Number(...)`, a comparação vira comparação de texto. Na prática, quando um lado é número (`livro.preco`) e o outro é texto (`"100"`), o JavaScript converte o texto para número sozinho — `120 <= "50"` dá `false`, como esperado. Só quebra quando **os dois lados são texto** (`"120" <= "50"` dá `true`), por exemplo se um livro foi cadastrado via `POST` com `"preco": "120"` entre aspas. Para a turma, manter a regra simples: **query param chega como texto; use `Number(...)` para comparar número.**

**Sobrou tempo.** Grupos adiantados fazem o filtro `precoMin` do "se sobrar tempo".
