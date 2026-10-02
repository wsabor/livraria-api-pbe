# 🔑 Gabarito — Atividade 14: Conferindo a API

**Uso exclusivo do professor.**

---

## Parte 1 — Qual é o parâmetro?

| Requisição | Route | Query | Body |
|---|:---:|:---:|:---:|
| `GET /livros/3` | X | | |
| `GET /livros?autor=tolkien` | | X | |
| `POST /livros` com `{ "titulo": "Duna" }` | | | X |
| `DELETE /livros/2` | X | | |

O erro mais provável é marcar **Body** no `DELETE /livros/2`, por ser um método que "muda" algo. Perguntar: "onde está o 2? Na URL ou no corpo?"

---

## Parte 2 — Conferindo os 5 métodos

Rodado de fato no Node, na API de referência recém-iniciada (catálogo inicial: posição 0 = Clean Code, posição 1 = Eloquent JavaScript):

| # | Requisição | Esperado | Obtido | Resposta |
|---|---|:---:|:---:|---|
| 1 | `GET /livros` | 200 | 200 | Os 2 livros do catálogo |
| 2 | `GET /livros/0` | 200 | 200 | Clean Code |
| 3 | `GET /livros/99` | 404 | 404 | `{ "erro": "Livro não encontrado" }` |
| 4 | `POST /livros` (O Hobbit) | 201 | 201 | O Hobbit, criado na posição 2 |
| 5 | `PATCH /livros/0` com `{ "preco": 50 }` | 200 | 200 | Clean Code com `preco: 50`; título, autor e estoque intactos |
| 6 | `DELETE /livros/0` | 204 | 204 | Resposta vazia |
| 7 | `GET /livros/0` | — | **200** | **Eloquent JavaScript** |

✅ Linhas 1 a 6 conferem exatamente.

**Linha 7 — o mistério do DELETE.** A aposta esperada da turma é 404. O resultado real é **200**, com o Eloquent JavaScript: depois do `splice`, o livro que estava na posição 1 andou para a posição 0. Lista final: Eloquent JavaScript (0) e O Hobbit (1).

**Resposta esperada, com as palavras deles:** "o livro de trás andou para a posição 0", "o número é a posição, não o livro", "a fila andou". Qualquer resposta que fale em **posição que muda** está certa.

---

## Parte 3 — Filtro por título

**`src/services/livroService.js`** (trecho, dentro de `listarLivros`)

```javascript
if (filtros.titulo) {
  resultado = resultado.filter((livro) =>
    livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
  );
}
```

Testes rodados no Node, com o catálogo inicial:

```
GET /livros?titulo=code   → 200, só "Clean Code"
GET /livros?titulo=CODE   → 200, só "Clean Code" (maiúscula não importa)
GET /livros?titulo=xyz    → 200, []
```

✅ Todos conferem.

> ℹ️ Se o grupo rodar a Parte 3 **depois** da Parte 2, sem reiniciar, o Clean Code já foi apagado e `?titulo=code` devolve `[]`. Não é erro do filtro — é o catálogo que mudou.

---

## Se sobrar tempo — `precoMin`

```javascript
if (filtros.precoMin) {
  resultado = resultado.filter((livro) => livro.preco >= Number(filtros.precoMin));
}
```

```
GET /livros?precoMin=50   → 200, só "Clean Code" (R$ 89,90)
```

✅ Confere.

---

## Erros mais prováveis

| Sintoma | Causa provável |
|---|---|
| Servidor não sobe: `argument handler must be a function` | Nome da função na rota diferente do `module.exports` do controller |
| Linha 4 (`POST`) dá 500 | Corpo enviado como texto, sem escolher **raw → JSON** no Postman |
| Linhas 5 e 6 dão 404 | O grupo salvou um arquivo no meio, o Nodemon reiniciou e o índice mudou — ou a rota está como `/:id` e o controller lê `req.params.indice` |
| Filtro por título devolve todos os livros | URL com `?Titulo=` ou `?title=`; ou só uma das duas lacunas foi trocada |
| Filtro por título quebra com `Cannot read properties of undefined (reading 'toLowerCase')` | Trocaram a lacuna por um campo que não existe (ex.: `livro.nome`) |

---

## Checklist de correção rápida (por grupo)

- [ ] Parte 1: 3 linhas certas
- [ ] Parte 2: linhas 1 a 6 com o status esperado
- [ ] Mistério do DELETE explicado com a ideia de "posição que muda"
- [ ] `GET /livros?titulo=code` funcionando
- [ ] Push feito
