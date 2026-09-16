# 📝 Atividade 10 — Primeira Rota de Verdade

**UC:** Programação Back-End | **Bloco 3 — Aula de 09/09/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 35 minutos
**Avaliação:** formativa — servidor Express rodando por grupo

---

## Objetivo

Fazer o fluxo completo funcionar pela primeira vez: rota → controller → service → model, tudo escrito pelo grupo, para a entidade `Livro`.

---

## Divisão de trabalho

| Quem | Responsável por |
|---|---|
| Integrante 1 | `src/routes/livroRoutes.js` |
| Integrante 2 | `src/controllers/livroController.js` |
| Integrante 3 | `src/services/livroService.js` |
| Integrante 4 | `toJSON()` na classe `Livro` + testes finais |

Se o grupo tiver menos de 4 integrantes, acumulem tarefas.

---

## Parte 1 — Escrever as três camadas (20 min)

Sigam o guia, seções 2, 3 e 4, escrevendo:

- `src/routes/livroRoutes.js`
- `src/controllers/livroController.js`
- `src/services/livroService.js`

E pluguem a rota no `src/index.js` com `app.use("/livros", livroRoutes)`.

---

## Parte 2 — Testar (10 min)

```bash
npm run dev
```

Testem no navegador:

```
http://localhost:3000/livros
http://localhost:3000/livros/0
http://localhost:3000/livros/99
```

A última deve devolver o erro 404 (`{"erro": "Livro nao encontrado"}`).

---

## Parte 3 — Corrigir o `#preco` sumido (5 min)

Adicionem o `toJSON()` na classe `Livro` (guia, seção 6) e confirmem que `preco` e `estoque` aparecem na resposta de `/livros`.

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: implementa rota, controller e service de Livro dentro do esqueleto MVC"
git push
```

---

## 🚀 Se sobrar tempo

Repliquem o mesmo padrão para `Categoria`: `categoriaRoutes.js`, `categoriaController.js`, `categoriaService.js`, com uma rota `GET /categorias` que lista as categorias existentes.

---

## ✅ Checklist de entrega

- [ ] As três camadas escritas e conectadas
- [ ] `GET /livros` retorna a lista completa
- [ ] `GET /livros/0` retorna um livro específico
- [ ] `GET /livros/99` retorna erro 404
- [ ] `toJSON()` aplicado, `preco` e `estoque` visíveis na resposta
- [ ] `git push` feito

---

## 💥 Se der erro

| Sintoma | Causa provável | Solução |
|---|---|---|
| `Cannot GET /livros` | Faltou `app.use("/livros", livroRoutes)` no `index.js` | Confira o `index.js` |
| Erro ao iniciar o servidor | Caminho de `require` errado em algum dos arquivos | Confira `../controllers/...` e `../services/...` |
| `/livros` retorna array vazio | O array de livros no `livroService.js` está vazio | Confira se os livros foram criados com `new Livro(...)` |
| `preco`/`estoque` ausentes na resposta | `toJSON()` não foi adicionado | Volte à seção 6 do guia |
