# 📝 Atividade 13 — Filtros com Query Params

**UC:** Programação Back-End | **Bloco 3 — Aula de 25/09/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 25 minutos
**Avaliação:** formativa — exercícios de rotas com parâmetros

---

## Objetivo

Implementar filtros de busca na listagem de livros, usando query params, e confirmar que route params e body continuam funcionando como antes.

---

## Parte 1 — Filtro por autor (10 min)

No `livroService.js`, implementem:

```javascript
function listarLivros(filtros) {
  let resultado = livros;

  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())
    );
  }

  return resultado;
}
```

No `livroController.js`, atualizem a função `listar` para usar `req.query`:

```javascript
function listar(req, res) {
  const filtros = req.query;
  const livros = livroService.listarLivros(filtros);
  res.status(200).json(livros);
}
```

Testem: `GET /livros?autor=algumnomequeexistanoseucatalogo`

---

## Parte 2 — Filtro por preço máximo (10 min)

Acrescentem, no service:

```javascript
if (filtros.precoMax) {
  resultado = resultado.filter((livro) => livro.preco <= Number(filtros.precoMax));
}
```

Testem: `GET /livros?precoMax=50`

Depois testem os dois juntos: `GET /livros?autor=x&precoMax=100`

---

## Parte 3 — Confirmar que o resto continua funcionando (5 min)

Testem novamente:
- `GET /livros/0` (route param) — deve continuar retornando um livro específico
- `POST /livros` (body) — deve continuar criando um livro normalmente

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: adiciona filtros via query params na listagem de livros"
git push
```

---

## 🚀 Se sobrar tempo

Adicionem um terceiro filtro, por `estoqueMin`, seguindo o mesmo padrão dos dois primeiros.

---

## ✅ Checklist de entrega

- [ ] Filtro por autor funcionando
- [ ] Filtro por preço máximo funcionando, com `Number(...)` aplicado
- [ ] Os dois filtros funcionam combinados
- [ ] `GET /livros/:indice` e `POST /livros` continuam funcionando normalmente
- [ ] `git push` feito

---

## 💥 Se der erro

| Sintoma | Causa provável | Solução |
|---|---|---|
| Filtro de preço com resultado estranho | Faltou `Number(...)` na comparação | Confira a linha do filtro de preço |
| `req.query` sempre vazio | URL sem `?` antes do primeiro parâmetro | Confira a URL testada |
| Rota `/livros/:indice` parou de funcionar | Mexeram na rota errada por engano | Query params não alteram a definição de rota |
