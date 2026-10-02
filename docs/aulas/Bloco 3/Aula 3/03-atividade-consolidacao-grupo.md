# 📝 Atividade 14 — Conferindo a API

**UC:** Programação Back-End | **Bloco 3 — Aula de 02/10/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 35 minutos
**Avaliação:** formativa — exercícios de parâmetros

---

## Divisão de trabalho

| Quem | Responsável por |
|---|---|
| Integrante 1 | Parte 1 |
| Integrante 2 | Parte 2 — rodar no Postman |
| Integrante 3 | Parte 2 — anotar os resultados |
| Integrante 4 | Parte 3 |

Se o grupo tiver menos de 4 integrantes, acumulem tarefas.

---

## Parte 1 — Qual é o parâmetro? (5 min)

Marquem com **X**. A primeira já está feita.

| Requisição | Route | Query | Body |
|---|:---:|:---:|:---:|
| `GET /livros/3` | X | | |
| `GET /livros?autor=tolkien` | | | |
| `POST /livros` com `{ "titulo": "Duna" }` | | | |
| `DELETE /livros/2` | | | |

---

## Parte 2 — Conferindo os 5 métodos (15 min)

1. Parem o servidor (`Ctrl + C`) e rodem `npm run dev` de novo.
2. Rodem as requisições **na ordem**, no Postman.
3. **Não salvem nenhum arquivo no meio** — o servidor reinicia e os livros somem.
4. Anotem o status que apareceu.

| # | Requisição | Corpo (aba Body → raw → JSON) | Esperado | Obtido |
|---|---|---|:---:|:---:|
| 1 | `GET /livros` | — | 200 | |
| 2 | `GET /livros/0` | — | 200 | |
| 3 | `GET /livros/99` | — | 404 | |
| 4 | `POST /livros` | `{ "titulo": "O Hobbit", "autor": "J.R.R. Tolkien", "preco": 39.9, "estoque": 8 }` | 201 | |
| 5 | `PATCH /livros/0` | `{ "preco": 50 }` | 200 | |
| 6 | `DELETE /livros/0` | — | 204 | |

**O mistério do DELETE:** antes de rodar a linha 7, escrevam a aposta do grupo.

| # | Requisição | Aposta do grupo | Obtido |
|---|---|:---:|:---:|
| 7 | `GET /livros/0` | | |

Por que veio esse resultado? Respondam em uma frase: ______________________________

---

## Parte 3 — Filtro por título (10 min)

No `livroService.js`, dentro de `listarLivros`, logo abaixo do filtro de autor, colem o código e **troquem os dois `____` por `titulo`**:

```javascript
if (filtros.titulo) {
  resultado = resultado.filter((livro) =>
    livro.____.toLowerCase().includes(filtros.____.toLowerCase())
  );
}
```

Salvem e testem no Postman:

| Requisição | O que deve aparecer |
|---|---|
| `GET /livros?titulo=code` | Só livros com "code" no título |
| `GET /livros?titulo=xyz` | `[]` (lista vazia) |

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: adiciona filtro por titulo e confere CRUD de livros"
git push
```

---

## 🚀 Se sobrar tempo

Façam um filtro `precoMin` (preço mínimo). Copiem o filtro `precoMax` e troquem `<=` por `>=`.

Testem: `GET /livros?precoMin=50`

---

## ✅ Checklist de entrega

- [ ] Parte 1 marcada
- [ ] Tabela da Parte 2 preenchida
- [ ] Mistério do DELETE respondido
- [ ] Filtro por `titulo` funcionando
- [ ] `git push` feito

---

## 💥 Se der erro

| Sintoma | Solução |
|---|---|
| Servidor não sobe: `argument handler must be a function` | O nome da função na rota está diferente do controller. Deixem igual |
| `POST` dá erro 500 | Coloquem o corpo em **Body → raw → JSON** no Postman |
| Os livros sumiram no meio da Parte 2 | Alguém salvou um arquivo. Recomecem do passo 1 |
| Filtro por título devolve todos os livros | Confiram se escreveram `?titulo=` (tudo minúsculo) na URL |
