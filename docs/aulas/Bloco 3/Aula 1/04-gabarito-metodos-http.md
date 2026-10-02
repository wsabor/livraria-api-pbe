# 🔑 Gabarito — Atividade 12: Os 5 Métodos HTTP Completos

**Uso exclusivo do professor.**

---

## Código de referência completo

**`src/models/Livro.js`**

```javascript
class Livro {
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque) {
    this.titulo = titulo;
    this.autor = autor;
    this.#preco = preco;
    this.#estoque = estoque;
  }

  get preco() { return this.#preco; }
  get estoque() { return this.#estoque; }

  set preco(novoPreco) {
    if (novoPreco < 0) {
      throw new Error("Preco nao pode ser negativo");
    }
    this.#preco = novoPreco;
  }

  set estoque(novoEstoque) {
    if (novoEstoque < 0) {
      throw new Error("Estoque nao pode ser negativo");
    }
    this.#estoque = novoEstoque;
  }

  toJSON() {
    return {
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque
    };
  }
}

module.exports = Livro;
```

**`src/services/livroService.js`**

```javascript
const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Robert C. Martin", 89.90, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.00, 20)
];

function listarLivros() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  return livros[indice];
}

function criarLivro(dados) {
  const novoLivro = new Livro(dados.titulo, dados.autor, dados.preco, dados.estoque);
  livros.push(novoLivro);
  return novoLivro;
}

function atualizarLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  return livro;
}

function atualizarParcialLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  return livro;
}

function deletarLivro(indice) {
  const livro = livros[indice];
  if (!livro) return false;

  livros.splice(indice, 1);
  return true;
}

module.exports = {
  listarLivros,
  buscarLivroPorIndice,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro
};
```

**`src/controllers/livroController.js`**

```javascript
const livroService = require("../services/livroService");

function listar(req, res) {
  res.status(200).json(livroService.listarLivros());
}

function buscarPorIndice(req, res) {
  const livro = livroService.buscarLivroPorIndice(req.params.indice);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(200).json(livro);
}

function criar(req, res) {
  const novoLivro = livroService.criarLivro(req.body);
  res.status(201).json(novoLivro);
}

function atualizar(req, res) {
  const livro = livroService.atualizarLivro(req.params.indice, req.body);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(200).json(livro);
}

function atualizarParcial(req, res) {
  const livro = livroService.atualizarParcialLivro(req.params.indice, req.body);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(200).json(livro);
}

function deletar(req, res) {
  const sucesso = livroService.deletarLivro(req.params.indice);
  if (!sucesso) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(204).send();
}

module.exports = { listar, buscarPorIndice, criar, atualizar, atualizarParcial, deletar };
```

**`src/routes/livroRoutes.js`**

```javascript
const express = require("express");
const livroController = require("../controllers/livroController");

const router = express.Router();

router.get("/", livroController.listar);
router.get("/:indice", livroController.buscarPorIndice);
router.post("/", livroController.criar);
router.put("/:indice", livroController.atualizar);
router.patch("/:indice", livroController.atualizarParcial);
router.delete("/:indice", livroController.deletar);

module.exports = router;
```

---

## Testes de referência, rodados de fato no Node

```
GET    /livros           → 200, lista com 2 livros
POST   /livros            → 201, livro criado (com Content-Type correto)
GET    /livros             → 200, lista agora com 3 livros
PUT    /livros/2             → 200, livro substituído por completo
PATCH  /livros/2              → 200, só o preço alterado, resto preservado
DELETE /livros/2                → 204, sem corpo
GET    /livros/2                 → 404, "Livro nao encontrado" (confirma a remoção)
POST   /livros (sem Content-Type)  → 500, TypeError: Cannot read properties of
                                       undefined (reading 'titulo')
```

✅ Todos os status conferem exatamente com o comportamento esperado, incluindo o erro 500 do experimento do cabeçalho — reproduzido de propósito, não um bug do material.

---

## O que caracteriza uma boa entrega na Parte 3 (experimento do cabeçalho)

O grupo precisa registrar algo equivalente a: *"sem o Content-Type, o express.json() não converte o corpo da requisição, então req.body fica undefined, e o controller quebra ao tentar ler req.body.titulo."* Respostas que só dizem "deu erro" sem explicar a causa indicam que o conceito de cabeçalho ainda não foi internalizado.

---

## Erros mais prováveis

| Sintoma | Causa provável |
|---|---|
| `PATCH` se comporta igual a `PUT` (apaga campos não enviados) | Faltou o `if (dados.campo !== undefined)` em cada campo de `atualizarParcialLivro` |
| `set preco`/`set estoque` não funcionam | `#preco`/`#estoque` não foram declarados como campos privados no topo da classe |
| `DELETE` retorna 200 com corpo, em vez de 204 vazio | Usaram `res.json(...)` em vez de `res.status(204).send()` |
| Índice errado após um `DELETE` no meio do array | Comportamento esperado do array — remover um item desloca os índices seguintes. Vale mencionar que isso é uma limitação da "persistência" em array, resolvida com IDs de verdade no Bloco 4 |

---

## Checklist de correção rápida (por grupo)

- [ ] Os 5 métodos implementados e funcionando
- [ ] `set preco`/`set estoque` adicionados corretamente
- [ ] Tabela de testes preenchida, com todos os status batendo
- [ ] Experimento do cabeçalho feito, com explicação correta da causa
- [ ] Push feito
