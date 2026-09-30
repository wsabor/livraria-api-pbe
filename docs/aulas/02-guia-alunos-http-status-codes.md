# 🌐 Guia do Aluno — Protocolo HTTP: Métodos, Status Codes e Cabeçalhos

**UC:** Programação Back-End | **Bloco 3 — Aula de 23/09/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que muda hoje

Desde 09/09 a Livraria só sabe **buscar** livros (`GET`). Hoje ela ganha voz completa: cadastrar, atualizar e apagar. Cada uma dessas ações usa um verbo HTTP diferente — e vocês vão entender, de uma vez por todas, o que aqueles números de status (`200`, `404`...) que já apareciam sem explicação realmente significam.

> ℹ️ Hoje ainda não é a aula formal de CRUD e REST (isso vem em 23/09 e 25/09). Hoje o foco é o **protocolo**: o que cada método e cada status code significam.

---

## 1. Os 5 métodos HTTP

```
GET      → BUSCAR   algo que já existe. Não muda nada.
POST     → CRIAR    algo novo.
PUT       → SUBSTITUIR  algo inteiro, por completo.
PATCH      → ATUALIZAR   só uma parte de algo.
DELETE      → APAGAR      algo que existe.
```

**Dois conceitos importantes:**

**Seguro (safe):** `GET` nunca muda nada no servidor. Chamar `GET /livros` mil vezes sempre devolve o mesmo estado. Os outros métodos mudam algo.

**Idempotente:** chamar a mesma requisição várias vezes tem o mesmo efeito de chamar uma vez. `PUT` e `DELETE` são idempotentes. `POST` **não é** — cada chamada cria um livro novo.

> 🤔 Se vocês chamarem `POST /livros` três vezes com os mesmos dados, quantos livros existem no final? (Resposta: três.)

Esses cinco verbos cobrem as quatro operações que qualquer sistema de dados precisa: **C**riar, **R**ead (ler), **U**pdate (atualizar), **D**elete (apagar) — o famoso **CRUD**, que vocês vão nomear formalmente em 23/09.

---

## 2. Status codes: a "linguagem" das respostas

Toda resposta HTTP vem com um número de 3 dígitos que diz, antes mesmo do corpo, se deu certo ou não.

```
2xx  →  DEU CERTO
  200  OK                  → sucesso genérico (GET, PUT, PATCH)
  201  Created              → algo novo foi criado (POST)
  204  No Content            → deu certo, mas não há nada para devolver (DELETE)

4xx  →  O CLIENTE ERROU
  400  Bad Request           → os dados enviados estão inválidos
  404  Not Found              → o recurso pedido não existe

5xx  →  O SERVIDOR ERROU
  500  Internal Server Error   → algo quebrou no código do servidor
```

> ℹ️ `404` e `500` já apareceram desde 09/09, sem serem nomeados formalmente. Agora vocês sabem exatamente onde eles se encaixam.

---

## 3. Construindo o `POST`

No `livroService.js`, acrescentem:

```javascript
function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
  );
  livros.push(novoLivro);
  return novoLivro;
}
```

No `livroController.js`:

```javascript
function criar(req, res) {
  const novoLivro = livroService.criarLivro(req.body);
  res.status(201).json(novoLivro);
}
```

Na rota:

```javascript
router.post("/", livroController.criar);
```

E adicionem ambas as novas funções aos `module.exports` dos dois arquivos.

Testem no Postman: método `POST`, URL `http://localhost:3000/livros`, cabeçalho `Content-Type: application/json`, e no corpo:

```json
{
  "titulo": "O Hobbit",
  "autor": "J.R.R. Tolkien",
  "preco": 39.9,
  "estoque": 8
}
```

Resposta esperada: status **201**, com o livro criado. Testem `GET /livros` de novo e confirmem o terceiro livro na lista.

> 💡 `req.body` é o corpo da requisição, já convertido de JSON para objeto JavaScript pelo `express.json()` — trabalho que ele faz desde 09/09, silenciosamente.

---

## 4. `PUT` vs `PATCH`: substituir tudo, ou só uma parte

Se vocês quisessem mudar só o preço de um livro, faria sentido reenviar título, autor e estoque de novo, só para não perdê-los? `PUT` exige isso — ele **substitui tudo**. `PATCH` muda **só o que foi enviado**.

### Preparando a classe: adicionando `set`

Antes de atualizar, a classe `Livro` precisa de uma forma de alterar `preco` e `estoque` depois de criada. Adicionem, na classe:

```javascript
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
```

### `PUT` — substituição completa

```javascript
// service
function atualizarLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  return livro;
}
```

```javascript
// controller
function atualizar(req, res) {
  const livro = livroService.atualizarLivro(req.params.indice, req.body);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(200).json(livro);
}
```

```javascript
router.put("/:indice", livroController.atualizar);
```

### `PATCH` — atualização parcial

```javascript
// service
function atualizarParcialLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  return livro;
}
```

```javascript
// controller
function atualizarParcial(req, res) {
  const livro = livroService.atualizarParcialLivro(req.params.indice, req.body);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(200).json(livro);
}
```

```javascript
router.patch("/:indice", livroController.atualizarParcial);
```

**Testem a diferença:** façam um `PUT` enviando só `{"preco": 99.90}` (sem os outros campos) e reparem que `titulo`, `autor` e `estoque` viram `undefined` no resultado. Depois façam o mesmo com `PATCH`, e reparem que os outros campos continuam intactos.

---

## 5. Construindo o `DELETE`

```javascript
// service
function deletarLivro(indice) {
  const livro = livros[indice];
  if (!livro) return false;

  livros.splice(indice, 1);
  return true;
}
```

```javascript
// controller
function deletar(req, res) {
  const sucesso = livroService.deletarLivro(req.params.indice);
  if (!sucesso) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.status(204).send();
}
```

```javascript
router.delete("/:indice", livroController.deletar);
```

> ⚠️ Reparem: `res.status(204).send()`, sem `.json(...)`. **204 significa "deu certo, mas não há corpo de resposta"**. O Postman vai mostrar a resposta vazia — isso é o esperado, não um erro.

Testem `DELETE` num livro, depois `GET` no mesmo índice — deve retornar **404**, confirmando que ele não existe mais.

---

## 🎯 6. O cabeçalho que quebra tudo

Façam o `POST` de novo, mas agora **removendo** o cabeçalho `Content-Type: application/json` no Postman.

**O servidor quebra**, com erro **500**: `Cannot read properties of undefined (reading 'titulo')`.

**Por que isso acontece:**

```
CABEÇALHO Content-Type: application/json
     ↓
express.json() sabe que precisa converter o corpo
     ↓
req.body vira um objeto JavaScript utilizável
```

Sem o cabeçalho, o `express.json()` não sabe que deve interpretar o corpo como JSON — então `req.body` fica `undefined`. O controller tenta ler `req.body.titulo`, e quebra.

> 💡 Cabeçalho não é burocracia do protocolo — é a informação que diz para quem recebe **como interpretar** o que está sendo enviado.

> ℹ️ Esse erro 500 feio será tratado de forma elegante na aula de 30/09 (validação e tratamento de erros). Hoje o objetivo é só entender a causa.

---

## 7. Media types, rapidamente

`application/json` é um **media type** — um jeito padronizado de dizer que formato de dado está sendo enviado. Existem outros (`text/html`, `image/png`, `application/xml`), mas JSON é o padrão em APIs modernas: é leve, fácil de ler e funciona em praticamente qualquer linguagem de programação.

---

## ✅ Checklist

- [ ] `POST /livros` cria um livro e retorna 201
- [ ] `PUT /livros/:indice` substitui todos os campos e retorna 200
- [ ] `PATCH /livros/:indice` altera só os campos enviados e retorna 200
- [ ] `DELETE /livros/:indice` remove e retorna 204, sem corpo
- [ ] Testei o `POST` sem `Content-Type` e vi o erro 500 acontecer
- [ ] Consigo explicar por que faltar o cabeçalho quebra a requisição
- [ ] `git push` feito

---

## 💥 Erros comuns

| Sintoma                                                            | Causa provável                                                    | Solução                                        |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------- |
| Erro 500, `Cannot read properties of undefined (reading 'titulo')` | Esqueceu `Content-Type: application/json` no cabeçalho            | Adicione o cabeçalho no Postman, aba "Headers" |
| `PUT` some com campos que não deveriam mudar                       | Comportamento esperado — é a diferença entre `PUT` e `PATCH`      | Use `PATCH` se quiser mudar só um campo        |
| `DELETE` retorna 200 em vez de 204                                 | Esqueceram de trocar `res.json(...)` por `res.status(204).send()` | 204 nunca deve ter corpo                       |
| `POST` cria livro com `preco: undefined`                           | O corpo enviado no Postman não tem o campo `preco`                | Confira o JSON enviado                         |

---

## 📎 Cola rápida

```javascript
// Os 5 métodos
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.patch("/:id", controller.atualizarParcial);
router.delete("/:id", controller.deletar);

// Status codes mais usados
res.status(200).json(dado); // sucesso, com corpo
res.status(201).json(criado); // criado com sucesso
res.status(204).send(); // sucesso, sem corpo (DELETE)
res.status(404).json({ erro: "" }); // não encontrado
```

| Código | Quando usar                           |
| ------ | ------------------------------------- |
| 200    | Sucesso genérico                      |
| 201    | Algo foi criado                       |
| 204    | Sucesso, sem corpo de resposta        |
| 400    | Dados inválidos enviados pelo cliente |
| 404    | Recurso não encontrado                |
| 500    | Erro no servidor                      |
