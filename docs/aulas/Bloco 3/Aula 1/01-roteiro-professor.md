# Roteiro do Professor — PBE | Aula de 16/09/2026 (quarta, 5 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 3 — Protocolo HTTP Aprofundado**

**Conteúdo:** métodos HTTP (GET, POST, PUT, DELETE, PATCH), cabeçalhos, media types, códigos de status; padrão JSON
**Prática:** rotas para os diferentes métodos HTTP com respostas JSON e códigos de status adequados
**Capacidades:** CT 6 | CS 1, 4
**Formativa:** rotas testadas com retornos corretos

---

## Situação de partida

A turma já tem `GET /livros` e `GET /livros/:indice` funcionando desde 09/09, organizados em `routes/index.js` e com um middleware de log desde 11/09. Hoje entram os quatro métodos que faltam — `POST`, `PUT`, `PATCH`, `DELETE` — e, junto com eles, o vocabulário que dá nome ao que a turma já vem fazendo sem formalizar: por que `res.json(...)` sempre devolveu `200` escondido, o que significa cada código de status, e por que o cabeçalho `Content-Type` importa de verdade.

**Achado de teste que vira demonstração da aula:** ao simular um `POST` sem o cabeçalho `Content-Type: application/json`, o servidor quebra com erro `500`, porque o `express.json()` não consegue interpretar o corpo da requisição sem esse aviso. Não é um erro forçado — é o comportamento real do Express, e é a prova mais concreta possível de que cabeçalho não é detalhe burocrático.

**Nota importante:** hoje **não é ainda** a aula formal de CRUD e REST (isso vem em 23/09 e 25/09). Hoje a turma escreve as rotas dos quatro métodos, mas o foco é entender **o protocolo** — o que cada método significa, o que cada status code comunica. A rigor de nomenclatura REST, tratamento de erro elegante e validação de entrada vêm depois, nas aulas específicas para isso (25/09 e 30/09).

> 🔄 **Mudança de formato para hoje:** a manhã (antes do intervalo) deixou de ser exposição dialogada e virou pesquisa em cadeia entre 8 grupos, cobrindo exatamente o conteúdo teórico que as antigas Aulas 1–3 trariam (métodos HTTP e famílias de status code). Ver `05-atividade-pesquisa-apresentacao-http.md`. A tarde (depois do intervalo) segue como planejado: prática guiada de código, agora com a vantagem de a turma já ter pesquisado e apresentado a teoria sozinha — use isso para acelerar, retomando o que cada grupo apresentou em vez de reexplicar do zero.

---

## Linha do tempo

| Bloco | Tempo | Foco |
|:---:|:---:|---|
| Manhã | 1h30 | Pesquisa em cadeia: 8 grupos, métodos HTTP e status codes (`05-atividade-pesquisa-apresentacao-http.md`) |
| — | 15 min | **Intervalo** |
| Tarde | ~1h45 | Prática guiada: `POST`, `PUT`/`PATCH`, `DELETE`, cabeçalhos — aplicando o que a turma já apresentou |

*As seções "AULA 1" a "AULA 5" abaixo descrevem o conteúdo técnico da tarde, na ordem em que ele deve ser conduzido — sem a divisão rígida em blocos de 50 minutos, já que a manhã absorveu boa parte do tempo antes reservado à teoria.*

---

## AULA 1 (50 min) — Os 5 métodos HTTP

### Abertura (5 min)

**Esta seção foi substituída pela pesquisa em cadeia da manhã.** A turma já cobriu, com as próprias palavras, tudo que estava planejado aqui: o que cada método faz, o conceito de "seguro" (Grupo 2, GET), o conceito de idempotência (Grupos 2 a 5), e a ligação com CRUD (fechamento do Grupo 8). Use a ficha de acompanhamento preenchida durante as apresentações para saber que grupos precisam de reforço.

### Recepção rápida, ao voltar do intervalo (5 min)

Não reexplique o que já foi apresentado. Em vez disso, retome em voz alta, rapidamente, os pontos que a ficha de acompanhamento sinalizou como fracos, e confirme com a turma o quadro-resumo que os grupos já construíram:

```
GET      -> BUSCAR   algo que ja existe. Nao muda nada.
POST     -> CRIAR    algo novo.
PUT       -> SUBSTITUIR  algo inteiro, por completo.
PATCH      -> ATUALIZAR   so uma parte de algo.
DELETE      -> APAGAR      algo que existe.
```

> 💡 Se algum grupo deixou a distinção "seguro" × "idempotente" confusa, esse é o momento de fechar isso em uma frase, não de reabrir a explicação inteira.

---

## AULA 2 (adaptada) — O primeiro `POST`, direto para o código

A parte teórica de status codes já foi coberta pelos Grupos 6, 7 e 8 da manhã. Aqui, ao voltar do intervalo, vá direto para a construção do `POST` — use a tabela que o Grupo 8 já apresentou como referência, só relembrando rapidamente:

```
2xx  ->  DEU CERTO
  200  OK                  -> sucesso generico (GET, PUT, PATCH)
  201  Created              -> algo novo foi criado (POST)
  204  No Content            -> deu certo, mas nao ha nada para devolver (DELETE)

4xx  ->  O CLIENTE ERROU
  400  Bad Request           -> os dados enviados estao invalidos
  404  Not Found              -> o recurso pedido nao existe

5xx  ->  O SERVIDOR ERROU
  500  Internal Server Error   -> algo quebrou no codigo do servidor
```

> ⚠️ Reforçar: `404` e `500` já apareceram antes (09/09), mas nunca foram nomeados formalmente como parte dessa família. Hoje ganham contexto.

### Construir o `POST`, ao vivo (35 min)

No service, acrescentar:

```javascript
function criarLivro(dados) {
  const novoLivro = new Livro(dados.titulo, dados.autor, dados.preco, dados.estoque);
  livros.push(novoLivro);
  return novoLivro;
}
```

No controller:

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

Testar com Postman (ou `curl`), com `Content-Type: application/json` no cabeçalho:

```json
{
  "titulo": "O Hobbit",
  "autor": "J.R.R. Tolkien",
  "preco": 39.90,
  "estoque": 8
}
```

Resposta esperada: status **201**, com o livro criado no corpo. Testar `GET /livros` de novo e mostrar o terceiro livro na lista.

> 💡 `req.body` é o corpo da requisição, já convertido de JSON para objeto JavaScript — trabalho que o `express.json()` faz por trás, silenciosamente, desde 09/09.

---

## AULA 3 (50 min) — `PUT` vs `PATCH`

### A diferença, com exemplo concreto (10 min)

"Se vocês quisessem só mudar o preço de um livro, faria sentido reenviar título, autor e estoque de novo, só para não perdê-los? `PUT` exige isso — ele **substitui tudo**. `PATCH` muda **só o que foi enviado**."

### Adicionar `set` na classe `Livro` (15 min)

Antes de construir `PUT`/`PATCH`, a classe precisa de uma forma de alterar `preco` e `estoque` depois de criada — hoje só existem `get`. Retomar a sintaxe de setters de 05/08:

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

### Construir `PUT`, ao vivo (15 min)

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

### Construir `PATCH`, ao vivo (10 min)

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

Testar os dois: `PUT` com todos os campos, `PATCH` só com `{"preco": 49.90}`. Ambos retornam **200**.

---

## INTERVALO (15 min)

---

## AULA 4 (50 min) — `DELETE` e cabeçalhos

### Construir `DELETE`, ao vivo (20 min)

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

> ⚠️ `res.status(204).send()` — sem `.json(...)`. **204 significa "deu certo, mas não há corpo de resposta"**. Enviar um corpo junto com 204 é contraditório, e o Postman vai mostrar a resposta vazia — isso é o esperado, não um erro.

### Cabeçalhos: o `Content-Type` que quebra tudo (30 min)

"Vocês vêm mandando `Content-Type: application/json` no Postman desde a Aula 2, sem eu explicar por quê. Vamos ver o que acontece sem ele."

Fazer o `POST` de novo, agora **removendo** o cabeçalho `Content-Type` no Postman (ou, no terminal, sem o `-H "Content-Type: application/json"`).

🎯 **O servidor quebra com erro 500.** Mostrar a mensagem de erro no terminal: `Cannot read properties of undefined (reading 'titulo')`.

Explicar a cadeia de causa: sem o cabeçalho, o `express.json()` não sabe que deve interpretar o corpo como JSON — então `req.body` fica `undefined`. O controller tenta ler `req.body.titulo`, e quebra.

```
CABECALHO Content-Type: application/json
     |
     v
express.json() sabe que precisa converter o corpo
     |
     v
req.body vira um objeto JavaScript utilizavel
```

Sem o primeiro elo, a cadeia inteira quebra silenciosamente até explodir no controller.

> 💡 Frase-âncora: "cabeçalho não é burocracia do protocolo — é a informação que diz para quem recebe **como interpretar** o que está sendo enviado."

> ℹ️ O erro 500 feio que aparece agora é esperado, e será tratado de forma elegante na aula de 30/09 (validação e tratamento de erros). Hoje o objetivo é só entender a causa.

### Media types, rapidamente (não aprofundar)

"`application/json` é um **media type** — um jeito padronizado de dizer que formato de dado está sendo enviado. Existem outros (`text/html`, `image/png`, `application/xml`), mas JSON é o padrão em APIs modernas porque é leve, fácil de ler e funciona em praticamente qualquer linguagem de programação."

---

## AULA 5 (50 min) — Atividade em grupo: os 5 métodos completos

### Atividade (35 min)

Distribuir `03-atividade-metodos-http-grupo.md`. Cada grupo garante que os 5 métodos funcionam, com os status codes corretos, testando no Postman.

### Commit e fechamento (15 min)

```bash
git add .
git commit -m "feat: implementa POST, PUT, PATCH e DELETE com status codes adequados"
git push
```

Gancho para 18/09: "hoje vocês criaram rotas com parâmetro na URL (`:indice`) e corpo de requisição (`req.body`). Na próxima aula, a gente formaliza esses dois conceitos — e acrescenta um terceiro, os parâmetros de busca (`?algo=valor`)."

---

## Avaliação formativa

**Instrumento:** rotas testadas com retornos corretos.

| Critério | O que caracteriza domínio |
|---|---|
| `POST` cria um livro novo e retorna 201 | Testado no Postman, livro aparece depois em `GET /livros` |
| `PUT` substitui todos os campos e retorna 200 | Campos não enviados ficam `undefined`, evidenciando a diferença de `PATCH` |
| `PATCH` altera só os campos enviados e retorna 200 | Demais campos permanecem inalterados |
| `DELETE` remove e retorna 204 sem corpo | `GET` do mesmo índice depois retorna 404 |
| Grupo entende a causa do erro 500 sem `Content-Type` | Consegue explicar a cadeia cabeçalho → `express.json()` → `req.body` |

---

## Contingências

**Turma confunde `PUT` com `PATCH` na prática.** Fazer o teste ao vivo, lado a lado: `PUT` só com `{"preco": 99}` e mostrar que `titulo`/`autor`/`estoque` viram `undefined` no resultado — a diferença fica visível, não só teórica.

**Grupo esquece o cabeçalho `Content-Type` sem querer, e trava sem entender.** Ótima oportunidade de usar a demonstração da Aula 4 como diagnóstico: "isso é exatamente o que a gente viu — falta o cabeçalho".

**Sobrou tempo.** Grupos adiantados replicam os 5 métodos para `Categoria`, se já tiverem a estrutura básica dela.

**Faltou tempo.** Priorizar `POST` e `DELETE` sobre `PUT`/`PATCH` — são os dois que introduzem os conceitos mais novos (criar e status sem corpo). `PUT`/`PATCH` podem ser retomados no início de 18/09, se necessário.
