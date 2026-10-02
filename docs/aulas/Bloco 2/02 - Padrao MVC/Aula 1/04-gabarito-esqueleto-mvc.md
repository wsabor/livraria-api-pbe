# 🔑 Gabarito — Atividade 06: O Esqueleto MVC da Livraria

**Uso exclusivo do professor.**

---

## Estrutura final esperada

```
livraria-api-grupoN/
├── package.json          (dependencies: express | devDependencies: nodemon, eslint)
├── eslint.config.mjs
├── .gitignore
├── README.md              (tabela de responsabilidades atualizada)
└── src/
    ├── index.js            (servidor Express rodando — testado abaixo)
    ├── routes/
    │   └── livroRoutes.js
    ├── controllers/
    │   └── livroController.js
    ├── services/
    │   └── livroService.js
    └── models/
        ├── Livro.js         (consolidado de um dos integrantes)
        ├── Categoria.js      (idem)
        ├── Pessoa.js          (já existia desde 07/08)
        ├── Cliente.js          (idem)
        └── Funcionario.js       (idem)
```

---

## `src/index.js` — código de referência

```javascript
const express = require("express");

const app = express();
const PORTA = 3000;

app.get("/", (req, res) => {
  res.send("API da Livraria no ar!");
});

app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
});
```

**Teste de referência, rodado de fato no Node:**

```
$ npm run dev
Servidor rodando em http://localhost:3000

$ curl http://localhost:3000/
API da Livraria no ar!
```

> ✅ Confirmado rodando — servidor sobe, responde na rota `/`, sem erros.

**Erro mais provável nesta parte:** o grupo esquece de rodar `npm install express` dentro do repositório do grupo, às vezes rodando na pasta pessoal por hábito das últimas atividades individuais. O sintoma é `Cannot find module 'express'`. Vale conferir o `package.json` do grupo diretamente — se `express` não aparece em `dependencies`, foi instalado no lugar errado.

---

## Os 3 arquivos de referência — conferência

Não há lacuna aqui, os três arquivos são fornecidos prontos na atividade. O que checar na correção:

| Arquivo | O que confirmar |
|---|---|
| `livroRoutes.js` | Comentário presente, `module.exports = {}` no final |
| `livroController.js` | Idem |
| `livroService.js` | Idem |

**Erro mais provável:** algum grupo, por iniciativa própria, já tenta escrever lógica de verdade dentro de um desses arquivos hoje. Não é errado por si só, mostra entusiasmo, mas vale reforçar que o conteúdo de verdade depende do banco de dados no Bloco 3, e código escrito sem isso hoje tende a ser descartado ou reescrito depois. Melhor conter a ansiedade e validar apenas a estrutura por ora.

---

## Consolidação dos models — o que verificar

Não há resposta única de qual versão de `Livro.js` ou `Categoria.js` o grupo escolhe, qualquer versão funcional serve. Pontos de checagem mínimos, típicos das atividades de 05/08 e 12/08:

- [ ] `#preco` e `#estoque` privados, com `get`/`set`
- [ ] `constructor` completo, sem parâmetro esquecido
- [ ] `module.exports = Livro;` (ou `Categoria`) presente
- [ ] Se o grupo escolheu uma versão com `categoria` como atributo, herdada de 12/08, o `Categoria.js` correspondente também precisa estar em `src/models/`, checando que os dois vieram juntos, não só um dos dois

> 🔎 Se o grupo trouxe versões de integrantes diferentes que não são compatíveis entre si, por exemplo um `Livro.js` que espera receber `categoria` no `constructor`, mas o `Categoria.js` escolhido é de outro integrante com nomes de atributo diferentes, é uma boa oportunidade de discussão sobre por que "consolidar" é mais do que copiar, é também garantir que as peças se encaixam.

---

## Gabarito dos desafios extras

### A — Esqueleto replicado para `Categoria`

```javascript
// src/routes/categoriaRoutes.js
// ROTA (o "garcom"): recebe a requisicao HTTP.
// Aqui vao ficar os caminhos (endpoints) relacionados a Categoria.
// Ex: GET /categorias, POST /categorias
// Implementacao chega no Bloco 3, quando o banco de dados entrar.

module.exports = {};
```

`categoriaController.js` e `categoriaService.js` seguem o mesmo padrão, só trocando "Livro" por "Categoria" nos comentários.

### B — Segunda rota no servidor

```javascript
app.get("/sobre", (req, res) => {
  res.send("Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1");
});
```

**Teste de referência, rodado de fato:**

```
$ curl http://localhost:3000/sobre
Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1
```

> ✅ Confirmado — as duas rotas coexistem sem conflito.

### C — Discussão em grupo (Funcionário)

Resposta esperada: `funcionarioRoutes.js`, `funcionarioController.js`, `funcionarioService.js` — o padrão de nomenclatura repete o já usado para `Livro`, trocando apenas o nome da entidade. Não é preciso criar um model novo: `Funcionario.js` já existe desde 07/08. É uma boa pergunta para verificar se o grupo entendeu que rotas, controllers e services são criados por funcionalidade, mas models já existentes não se duplicam.

---

## Checklist de correção rápida (por grupo)

- [ ] `express` em `dependencies`, servidor sobe com `npm run dev`
- [ ] Mensagem correta aparece em `http://localhost:3000`
- [ ] `routes/`, `controllers/`, `services/` criadas dentro de `src/`, com o arquivo correto em cada
- [ ] `models/` com as 5 classes (Livro, Categoria, Pessoa, Cliente, Funcionario), todas com `module.exports`
- [ ] Grupo consegue explicar, para cada arquivo, qual das 4 camadas ele representa
- [ ] Tabela de responsabilidades do README atualizada
- [ ] Cada integrante com ao menos 1 commit próprio hoje
- [ ] Push feito
