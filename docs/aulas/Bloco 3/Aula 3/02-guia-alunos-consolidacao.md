# 🧭 Guia do Aluno — Conferindo a API

**UC:** Programação Back-End | **Bloco 3 — Aula de 02/10/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que é hoje

Hoje **não tem conteúdo novo**. É dia de conferir se a API de vocês está funcionando.

A pergunta do dia: **a API de vocês está completa? Como vocês têm certeza?**

---

## 1. Os três tipos de parâmetro

```
ROUTE PARAM   →  diz QUAL livro            →  /livros/3
QUERY PARAM    →  diz COMO filtrar a lista    →  /livros?autor=martin
BODY            →  leva os DADOS do livro      →  { "titulo": "..." }
```

> 💡 **Route param diz qual. Query param filtra. Body leva os dados.**

---

## 2. O mapa da API de Livros

Toda API de vocês deve responder assim:

| Método | Rota | Deu certo | Livro não existe |
|---|---|:---:|:---:|
| GET | `/livros` | 200 | — |
| GET | `/livros/0` | 200 | 404 |
| POST | `/livros` | 201 | — |
| PUT | `/livros/0` | 200 | 404 |
| PATCH | `/livros/0` | 200 | 404 |
| DELETE | `/livros/0` | 204 | 404 |

> ⚠️ Os livros ficam na memória. **Quando vocês salvam um arquivo, o servidor reinicia e os livros voltam ao início.** Na hora de testar, não salvem nada no meio.

---

## 3. Lendo a mensagem de erro

Antes de chamar o professor, leiam o erro. Ele mostra o **arquivo** e a **linha**.

| O que aparece | O que fazer |
|---|---|
| Servidor não sobe: `argument handler must be a function` | O nome da função na rota está diferente do controller. Deixem **igual** nos dois arquivos |
| `POST` dá erro **500** | Faltou o cabeçalho `Content-Type: application/json` no Postman |

---

## 4. 🕵️ O mistério do DELETE

1. `GET /livros` → vejam qual livro está na posição 0 e qual está na posição 1.
2. `DELETE /livros/0` → resultado esperado: **204**.
3. **Apostem no grupo:** o que `GET /livros/0` vai devolver agora?
4. Rodem `GET /livros/0`.

Vocês devem ter apostado em **404**. Mas veio **200**, com outro livro. Por quê?

```
ANTES do DELETE             DEPOIS do DELETE
0 → Clean Code               0 → Eloquent JavaScript   ← andou uma posição
1 → Eloquent JavaScript      1 → (vazio)
```

O número na URL **não é o número do livro**. É a **posição dele na fila**. Quando alguém sai da fila, quem está atrás anda.

> ℹ️ Isso vai ser resolvido na aula de 14/10. Hoje é só para entender o que acontece.

---

## ✅ Checklist

- [ ] Sei dizer se uma URL usa route param, query param ou body
- [ ] Testei os 6 itens do mapa da seção 2
- [ ] Rodei o mistério do DELETE
- [ ] Filtro por `titulo` funcionando
- [ ] `git push` feito

---

## 📎 Cola rápida

```javascript
// Route param — tem ":" na rota
router.get("/:indice", livroController.buscarPorIndice);
// no controller: req.params.indice

// Query param — NÃO aparece na rota
router.get("/", livroController.listar);
// no controller: req.query.autor

// Body — POST, PUT, PATCH
router.post("/", livroController.criar);
// no controller: req.body.titulo
```
