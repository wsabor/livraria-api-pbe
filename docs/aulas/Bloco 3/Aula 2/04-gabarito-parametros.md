# 🔑 Gabarito — Atividade 13: Filtros com Query Params

**Uso exclusivo do professor.**

---

## Código de referência completo

**`src/services/livroService.js`**

```javascript
const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Robert C. Martin", 89.90, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.00, 20),
  new Livro("O Programador Pragmatico", "Andrew Hunt", 94.50, 7),
  new Livro("Refactoring", "Martin Fowler", 120.00, 4)
];

function listarLivros(filtros) {
  let resultado = livros;

  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())
    );
  }

  if (filtros.precoMax) {
    resultado = resultado.filter((livro) => livro.preco <= Number(filtros.precoMax));
  }

  return resultado;
}

function buscarLivroPorIndice(indice) {
  return livros[indice];
}

function criarLivro(dados) {
  const novoLivro = new Livro(dados.titulo, dados.autor, dados.preco, dados.estoque);
  livros.push(novoLivro);
  return novoLivro;
}

module.exports = { listarLivros, buscarLivroPorIndice, criarLivro };
```

**`src/controllers/livroController.js`** (trecho relevante)

```javascript
function listar(req, res) {
  const filtros = req.query;
  const livros = livroService.listarLivros(filtros);
  res.status(200).json(livros);
}
```

---

## Testes de referência, rodados de fato no Node

```
GET /livros                              → 200, os 4 livros do catálogo
GET /livros?autor=fowler                  → 200, só "Refactoring" (Martin Fowler)
GET /livros?precoMax=50                    → 200, só "Eloquent JavaScript" (R$ 45)
GET /livros?autor=martin&precoMax=100       → 200, só "Clean Code" (bate autor E preço)
GET /livros/1                                → 200, "Eloquent JavaScript" (route param intacto)
POST /livros (com body)                       → 201, livro criado normalmente (body intacto)
```

✅ Todos os resultados conferem exatamente. O filtro combinado (`autor=martin&precoMax=100`) é o teste mais importante — confirma que os dois filtros aplicam com lógica "E", não "OU": "Refactoring" (Martin Fowler, R$ 120) fica de fora porque o preço excede 100, mesmo o autor batendo parcialmente com "martin".

---

## O que caracteriza domínio nesta atividade

O ponto mais sutil não é implementar os filtros — é o grupo entender **por que** `Number(...)` é necessário. Vale perguntar diretamente: "o que aconteceria se vocês tirassem o `Number(...)` dali?" Resposta esperada: a comparação passaria a ser entre strings, e `"120" <= "50"` se comporta de um jeito que não corresponde à comparação numérica esperada — o filtro pareceria "quebrado" sem gerar nenhum erro.

---

## Erros mais prováveis

| Sintoma | Causa provável |
|---|---|
| Filtro de preço deixa passar livros mais caros que o limite | Faltou `Number(filtros.precoMax)` |
| Filtro de autor não encontra nada mesmo com o nome certo | Faltou `.toLowerCase()` em um dos lados, ou o autor foi digitado com erro de grafia no teste |
| `req.query` sempre chega vazio | Testaram a URL sem `?`, ou usaram `req.params` por engano em vez de `req.query` |
| Rota `/livros/:indice` parou de retornar corretamente | Alteraram por engano a rota de listagem em vez de só o controller |

---

## Checklist de correção rápida (por grupo)

- [ ] Filtro por autor funcionando, case-insensitive
- [ ] Filtro por preço máximo funcionando, com conversão numérica
- [ ] Filtros combinados funcionam com lógica "E"
- [ ] `GET /livros/:indice` e `POST /livros` continuam intactos
- [ ] Grupo explica por que `Number(...)` é necessário
- [ ] Push feito
