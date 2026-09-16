# 📝 Atividade 11 — Organizando Rotas e o Logger

**UC:** Programação Back-End | **Bloco 3 — Aula de 11/09/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 35 minutos
**Avaliação:** formativa — rotas organizadas nas camadas corretas

---

## Divisão de trabalho

| Quem | Responsável por |
|---|---|
| Integrante 1 | `src/routes/index.js` (agregador) |
| Integrante 2 | Simplificar o `index.js` principal |
| Integrante 3 | `src/middlewares/logger.js` |
| Integrante 4 | Testar a ordem (antes/depois) e confirmar o comportamento |

Se o grupo tiver menos de 4 integrantes, acumulem tarefas.

---

## Parte 1 — Agregador de rotas (10 min)

Criem `src/routes/index.js`:

```javascript
const express = require("express");
const livroRoutes = require("./livroRoutes");

const router = express.Router();

router.use("/livros", livroRoutes);

module.exports = router;
```

Se o grupo já tem `categoriaRoutes.js` (desafio de 09/09), acrescentem também:

```javascript
router.use("/categorias", categoriaRoutes);
```

Simplifiquem o `index.js`:

```javascript
const routes = require("./routes");

app.use(routes);
```

Testem `GET /livros` — deve continuar funcionando exatamente como antes.

---

## Parte 2 — O middleware de log (15 min)

Criem `src/middlewares/logger.js`:

```javascript
function logger(req, res, next) {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
```

Pluguem **antes** das rotas no `index.js`:

```javascript
const logger = require("./middlewares/logger");

app.use(logger);
app.use(routes);
```

Testem `GET /livros` e confirmem que o log aparece no terminal.

---

## Parte 3 — O experimento da ordem (10 min)

Movam `app.use(logger)` para **depois** de `app.use(routes)`. Testem `GET /livros` de novo.

Registrem no README da pasta o que aconteceu, e por quê.

Voltem o logger para a posição correta (antes das rotas) antes de enviar.

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: organiza rotas em agregador e implementa middleware de log"
git push
```

---

## 🚀 Se sobrar tempo

Enriqueçam o logger para também mostrar quanto tempo a requisição levou para ser respondida, usando `res.on("finish", () => {...})` dentro do middleware.

---

## ✅ Checklist de entrega

- [ ] `routes/index.js` criado, agregando as rotas
- [ ] `index.js` principal com uma única linha para as rotas
- [ ] `middlewares/logger.js` criado
- [ ] Logger registrado antes das rotas, log aparecendo no terminal
- [ ] Experimento da ordem feito e registrado no README
- [ ] `git push` feito

---

## 💥 Se der erro

| Sintoma | Causa provável | Solução |
|---|---|---|
| Requisição trava, sem resposta | Faltou `next()` no logger | Toda função de middleware precisa chamar `next()` |
| `Cannot GET /livros` | Faltou `module.exports = router` no agregador | Confira o final de `routes/index.js` |
| Log não aparece | Caminho de `require` errado, ou logger registrado depois das rotas | Confira a ordem no `index.js` |
