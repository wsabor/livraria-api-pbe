# 🚀 Guia do Aluno — Express de Verdade dentro do MVC

**UC:** Programação Back-End | **Abertura do Bloco 3 — Aula de 09/09/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que muda hoje

Desde 19/08 vocês têm um servidor Express rodando, mas com uma única rota solta no `index.js`. E desde então, as pastas `routes/`, `controllers/` e `services/` existem, mas estão vazias por dentro — só têm um comentário explicando o que vão fazer um dia.

Hoje é esse dia. As três camadas ganham código de verdade, e pela primeira vez o fluxo completo — rota → controller → service → model — funciona de ponta a ponta.

---

## 1. O que é um framework

```
FRAMEWORK = um conjunto de ferramentas prontas que resolve os problemas comuns de um tipo de sistema,
para você não ter que resolver do zero toda vez.
```

Sem o Express, criar um servidor HTTP em Node puro exige lidar com muitos detalhes de baixo nível. O Express já resolve isso — vocês só escrevem `app.get(...)` e ele cuida do resto.

**Critérios que orientam a escolha de um framework** (não é aleatório):

- Comunidade e documentação — mais gente usando, mais fácil achar ajuda.
- Curva de aprendizado — Express é minimalista, por isso foi escolhido para o curso.
- Ecossistema — bibliotecas prontas que já conversam bem com ele.

---

## 2. A rota de verdade — `express.Router()`

Até hoje, a única rota de vocês morava direto no `index.js`. Isso não escala: imaginem 20 rotas diferentes, todas empilhadas no mesmo arquivo.

Reescrevam `src/routes/livroRoutes.js`:

```javascript
const express = require("express");
const livroController = require("../controllers/livroController");

const router = express.Router();

router.get("/", livroController.listar);
router.get("/:indice", livroController.buscarPorIndice);

module.exports = router;
```

| Trecho                        | O que é                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `express.Router()`            | Cria um "mini aplicativo" só de rotas, plugado depois no principal                                                |
| `router.get("/", ...)`        | Mesma sintaxe de `app.get`, dentro do router                                                                      |
| `router.get("/:indice", ...)` | `:indice` é um **parâmetro de rota** — qualquer valor na URL (`/livros/0`) fica disponível em `req.params.indice` |

No `src/index.js`, pluguem essas rotas:

```javascript
const livroRoutes = require("./routes/livroRoutes");

app.use("/livros", livroRoutes);
```

`app.use("/livros", ...)` diz: "toda rota dentro de `livroRoutes` começa com `/livros` na frente". Por isso `router.get("/")` vira, de fora, `GET /livros`.

---

## 3. O controller de verdade

O controller **decide o que fazer** com o pedido — não executa a lógica, só coordena.

Reescrevam `src/controllers/livroController.js`:

```javascript
const livroService = require("../services/livroService");

function listar(req, res) {
  const livros = livroService.listarLivros();
  res.json(livros);
}

function buscarPorIndice(req, res) {
  const indice = req.params.indice;
  const livro = livroService.buscarLivroPorIndice(indice);

  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }

  res.json(livro);
}

module.exports = { listar, buscarPorIndice };
```

| Trecho                      | O que é                                                         |
| --------------------------- | --------------------------------------------------------------- |
| `req.params.indice`         | Pega o valor da URL no lugar de `:indice`                       |
| `res.json(...)`             | Devolve a resposta já formatada como JSON                       |
| `res.status(404).json(...)` | Se o livro não existir, avisa com um código de status diferente |

> 💡 Repare: o controller **não sabe** onde os livros estão guardados. Ele só chama `livroService.listarLivros()` e confia que o service resolve. Essa separação é proposital.

---

## 4. O service de verdade

Aqui mora a lógica real — onde os dados estão e como buscá-los.

Reescrevam `src/services/livroService.js`:

```javascript
const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Robert C. Martin", 89.9, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.0, 20),
];

function listarLivros() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  return livros[indice];
}

module.exports = { listarLivros, buscarLivroPorIndice };
```

> ℹ️ **Os livros moram num array em memória**, dentro do próprio arquivo. Ainda não existe banco de dados — isso é conteúdo do Bloco 4. Por enquanto, os dados se perdem toda vez que o servidor reinicia. É assim mesmo, por enquanto.

---

## 5. Rodando pela primeira vez, de ponta a ponta

```bash
npm run dev
```

Testem no navegador:

```
http://localhost:3000/livros
http://localhost:3000/livros/0
```

🎉 Esse é o primeiro momento em que rota, controller, service e model — todos escritos por vocês — funcionam juntos.

---

## 6. 🕵️ O caso do `#preco` sumido

Olhem com atenção a resposta de `/livros`. Falta alguma coisa?

`preco` e `estoque` não aparecem, mesmo existindo na classe `Livro`. O motivo:

```
Campos privados (#) de uma classe NÃO aparecem quando o JavaScript converte o objeto para JSON.
É exatamente o mesmo encapsulamento que protege os dados de mudança indevida que também os esconde da
resposta da API.
```

**A correção:** um método especial, `toJSON()`, que o JavaScript reconhece automaticamente sempre que o objeto precisa virar JSON. Acrescentem na classe `Livro`:

```javascript
toJSON() {
  return {
    titulo: this.titulo,
    autor: this.autor,
    preco: this.#preco,
    estoque: this.#estoque
  };
}
```

Rodem de novo. Agora `preco` e `estoque` aparecem na resposta.

> 💡 **Toda decisão de design tem consequência em outro lugar.** Encapsular protegeu os dados; hoje vocês viram o preço disso — literalmente, o preço sumia da resposta.

---

## ✅ Checklist

- [ ] `livroRoutes.js` com `express.Router()`, plugado no `index.js` via `app.use`
- [ ] `livroController.js` com `listar` e `buscarPorIndice`, chamando o service
- [ ] `livroService.js` com o array em memória e as duas funções
- [ ] `GET /livros` funciona e mostra a lista
- [ ] `GET /livros/0` funciona e mostra um livro
- [ ] `toJSON()` adicionado à classe `Livro`, com `preco` e `estoque` visíveis na resposta
- [ ] `git push` feito

---

## 💥 Erros comuns

| Sintoma                                                        | Causa provável                                                     | Solução                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| `Cannot GET /livros`                                           | `app.use("/livros", livroRoutes)` não foi adicionado ao `index.js` | Confira o `index.js`                                |
| `TypeError: Cannot read properties of undefined` no controller | O `require` do service está com caminho errado                     | Confira `../services/livroService`                  |
| `preco` e `estoque` não aparecem na resposta                   | `toJSON()` ainda não foi adicionado                                | Volte à seção 6                                     |
| `/livros/0` devolve `undefined`                                | O índice não existe no array, ou array vazio                       | Confira quantos livros existem no `livroService.js` |
| Servidor não reinicia sozinho ao salvar                        | Rodou com `node` em vez de `npm run dev`                           | Use `npm run dev`, que usa o Nodemon                |

---

## 📎 Cola rápida

```javascript
// Rota
const router = express.Router();
router.get("/", controller.funcao);
module.exports = router;

// Plugar no index.js
app.use("/caminho", arquivoDeRotas);

// Controller
function funcao(req, res) {
  const dado = service.funcao();
  res.json(dado);
}

// Parâmetro de rota
router.get("/:id", controller.funcao);
// dentro do controller: req.params.id
```
