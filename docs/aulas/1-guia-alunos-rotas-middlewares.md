# 🔀 Guia do Aluno — Organizando Rotas e o Primeiro Middleware

**UC:** Programação Back-End | **Bloco 3 — Aula de 11/09/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que hoje é

Em 09/09 vocês fizeram o fluxo completo funcionar pela primeira vez para `Livro`. Hoje são só 2 aulas, e o conteúdo é uma extensão direta disso: organizar melhor o arquivo principal, e entender de verdade o que é um middleware — algo que vocês já usam desde 09/09 (`express.json()`) sem nunca ter explicado.

---

## 1. Organizando as rotas

Hoje só existe uma linha no `index.js`: `app.use("/livros", livroRoutes)`. Se vocês fizeram `Categoria` em 09/09, já são duas. Daqui a algumas semanas, com mais entidades, seriam seis ou sete linhas empilhadas ali — o mesmo problema de organização que MVC resolveu em agosto, agora dentro do próprio arquivo principal.

### Criando o agregador de rotas

Criem `src/routes/index.js`:

```javascript
const express = require("express");
const livroRoutes = require("./livroRoutes");

const router = express.Router();

router.use("/livros", livroRoutes);

module.exports = router;
```

Esse arquivo **reúne** todas as rotas da aplicação num só lugar. Cada entidade nova ganha uma linha aqui — não no `index.js`.

### Simplificando o `index.js`

```javascript
const routes = require("./routes");

app.use(routes);
```

Uma linha só, para sempre — mesmo quando a API tiver vinte entidades diferentes.

> 💡 O `index.js` não deveria precisar mudar toda vez que uma entidade nova aparece. Ele só liga a peça geral; quem sabe o que existe é o `routes/index.js`.

Testem de novo `GET /livros` e `GET /livros/0` — nada deveria ter mudado no comportamento, só a organização por trás.

> ℹ️ Se vocês fizeram `Categoria` em 09/09, acrescentem também `router.use("/categorias", categoriaRoutes);` no agregador.

---

## 2. O que é, de verdade, um middleware

```
MIDDLEWARE = uma função que fica NO MEIO do caminho entre a requisição
chegar e a resposta ser enviada. Ela pode ler, modificar ou registrar
algo sobre a requisição antes de deixar ela seguir adiante.
```

A assinatura padrão de um middleware é sempre:

```javascript
function nomeDoMiddleware(req, res, next) {
  // faça alguma coisa aqui
  next();
}
```

`next()` é a peça mais importante: ele diz "terminei minha parte, pode seguir para o próximo passo". Sem ele, a requisição **trava**, sem nunca chegar até a rota.

---

## 3. Criando o primeiro middleware próprio: o logger

Criem `src/middlewares/logger.js`:

```javascript
function logger(req, res, next) {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
```

Pluguem no `index.js`, **antes** das rotas:

```javascript
const logger = require("./middlewares/logger");

app.use(logger);
app.use(routes);
```

Rodem `npm run dev` e testem `GET /livros`. O log deve aparecer no terminal, mostrando data, método e caminho da requisição.

---

## 🎯 4. Por que a ordem importa

Façam este experimento: movam `app.use(logger)` para **depois** de `app.use(routes)`:

```javascript
app.use(routes);
app.use(logger);   // agora depois -- de propósito, para testar
```

Testem `GET /livros` de novo.

**Nenhum log aparece.** E o pior: nenhum erro também — é só silêncio, o que confunde mais do que um erro explícito apareceria.

**O motivo:** middlewares rodam na **ordem exata em que são registrados**. Se o logger vem depois das rotas, a resposta já foi enviada antes de a requisição sequer chegar até ele. É tarde demais.

```
ORDEM DE REGISTRO = ORDEM DE EXECUÇÃO.

app.use(logger)   ← 1º
app.use(routes)    ← 2º (só roda se o 1º chamar next())
```

**Regra prática:** middlewares de uso geral (`logger`, `express.json()`) sempre vêm primeiro. Rotas específicas vêm depois. Voltem o logger para a posição correta antes de continuar.

---

## ✅ Checklist

- [ ] `src/routes/index.js` criado, agregando as rotas existentes
- [ ] `index.js` principal com uma única linha de `app.use` para rotas
- [ ] `src/middlewares/logger.js` criado, com a assinatura `(req, res, next)`
- [ ] Logger registrado **antes** das rotas
- [ ] Testei mover o logger para depois das rotas e vi o log sumir
- [ ] Logger de volta na posição correta
- [ ] `git push` feito

---

## 💥 Erros comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Requisição nunca termina, fica "pendurada" | Esqueceram o `next()` dentro do middleware | Toda função de middleware precisa chamar `next()` no final |
| `Cannot GET /livros` depois de criar o `routes/index.js` | Esqueceram o `module.exports = router` no agregador | Confira a última linha do arquivo |
| Log não aparece mesmo com o logger antes das rotas | O `require` do logger está com caminho errado | Confira `./middlewares/logger` |
| Log aparece duas vezes | O logger foi registrado duas vezes no `index.js` | Confira se `app.use(logger)` só aparece uma vez |

---

## 📎 Cola rápida

```javascript
// Middleware básico
function meuMiddleware(req, res, next) {
  // logica aqui
  next();  // sempre chame next()!
}

// Registrar um middleware (sempre antes das rotas que ele deve afetar)
app.use(meuMiddleware);

// Agregador de rotas
const router = express.Router();
router.use("/caminho", arquivoDeRotas);
module.exports = router;
```
