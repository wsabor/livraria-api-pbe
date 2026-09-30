# 🔗 Guia do Aluno — Route Params, Query Params e Body

**UC:** Programação Back-End | **Bloco 3 — Aula de 25/09/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O problema de hoje

A Livraria já sabe listar todos os livros e buscar um específico pelo índice. Mas e se um cliente quisesse buscar só os livros de um autor, ou só os que custam até R$ 50? Isso não é buscar **um** livro — é filtrar a **lista inteira**. Vocês já usam dois jeitos de passar informação para a API sem nunca terem sido nomeados. Hoje aparece o terceiro, e os três ganham nome.

---

## 1. Os três tipos, com nome e função

```
ROUTE PARAM   → identifica QUAL recurso específico     → /livros/3
QUERY PARAM    → filtra ou ajusta COMO uma lista volta   → /livros?autor=martin
BODY            → envia um pacote de dados COMPLETO        → { "titulo": "...", ... }
```

| Tipo | Onde já apareceu | Como se lê no código |
|---|---|---|
| Route param | `GET /livros/:indice`, desde 09/09 | `req.params.indice` |
| Body | `POST`/`PUT`/`PATCH`, desde 16/09 | `req.body` |
| Query param | **Novo hoje** | `req.query` |

> 💡 **Route param diz qual. Query param diz como filtrar ou organizar uma lista. Body carrega o pacote inteiro de dados** para criar ou atualizar algo.

---

## 2. Por que não usar route param para tudo?

Alguém poderia pensar em fazer `/livros/autor/martin` para filtrar por autor. Funcionaria para **um** filtro. Mas e se vocês quisessem filtrar por autor **e** por preço ao mesmo tempo? `/livros/autor/martin/precoMax/100` já fica estranho e difícil de generalizar.

Query params foram inventados exatamente para isso: múltiplos filtros, combináveis, sem bagunçar o caminho da URL.

---

## 3. Construindo o primeiro filtro

No `livroService.js`:

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

No `livroController.js`:

```javascript
function listar(req, res) {
  const filtros = req.query;
  const livros = livroService.listarLivros(filtros);
  res.status(200).json(livros);
}
```

Testem no Postman: `GET /livros?autor=fowler`.

> ⚠️ Nada muda na rota (`router.get("/", livroController.listar)`). Query params **não fazem parte da definição da rota**, diferente de route params. `/livros?autor=x` e `/livros` são a **mesma rota**, só com informação extra anexada na URL.

`req.query` já chega pronto como um objeto JavaScript — o Express interpreta o `?autor=fowler` da URL sozinho.

---

## 4. Um segundo filtro, e os dois juntos

```javascript
if (filtros.precoMax) {
  resultado = resultado.filter((livro) => livro.preco <= Number(filtros.precoMax));
}
```

> ⚠️ **Todo valor de query param chega como texto (string)**, mesmo que pareça um número na URL. Por isso o `Number(filtros.precoMax)` — sem essa conversão, a comparação compara textos, não números, e o resultado sai errado sem gerar nenhum erro visível.

Testem `GET /livros?autor=martin&precoMax=100` — dois filtros combinados com `&`, na mesma requisição.

---

## 5. Os três tipos, juntos

```
PUT /livros/3?notificarCliente=true
Body: { "preco": 79.90 }

route param (3)         → qual livro atualizar
query param (notificar)  → um comportamento extra, opcional, fora do dado principal
body (preco)              → o dado que de fato muda
```

> Este exemplo é só ilustrativo, não precisa ser implementado — serve para mostrar que os três tipos podem coexistir na mesma requisição, cada um com seu papel.

---

## ✅ Checklist

- [ ] Filtro por autor implementado com `req.query`
- [ ] Filtro por preço máximo implementado, com `Number(...)` na comparação
- [ ] Os dois filtros funcionam combinados (`?autor=x&precoMax=y`)
- [ ] Consigo explicar a diferença entre route param, query param e body, com exemplos
- [ ] `git push` feito

---

## 💥 Erros comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Filtro de preço retorna livros que não deveriam aparecer | Esqueceram `Number(...)` — comparação está sendo feita entre textos | `Number(filtros.precoMax)` antes de comparar |
| `req.query` vem `undefined` | Query param mal escrito na URL (falta `?` ou `&`) | Confira a URL: `?autor=x&precoMax=y` |
| Filtro não distingue maiúsculas de minúsculas | Esqueceram `.toLowerCase()` em ambos os lados da comparação | Confira o filtro de autor |
| A rota parou de funcionar depois de adicionar o filtro | Alteraram a definição da rota por engano | Query params não mudam a rota — só o controller/service |

---

## 📎 Cola rápida

```javascript
// Route param — na definição da rota
router.get("/:indice", controller.buscarPorIndice);
// no controller: req.params.indice

// Query param — nunca aparece na definição da rota
router.get("/", controller.listar);
// no controller: req.query.autor, req.query.precoMax

// Body — no corpo da requisição (POST/PUT/PATCH)
router.post("/", controller.criar);
// no controller: req.body.titulo, req.body.preco
```

| Tipo | Exemplo de URL | Onde ler no controller |
|---|---|---|
| Route param | `/livros/3` | `req.params.indice` |
| Query param | `/livros?autor=martin` | `req.query.autor` |
| Body | `{ "titulo": "..." }` no corpo | `req.body.titulo` |
