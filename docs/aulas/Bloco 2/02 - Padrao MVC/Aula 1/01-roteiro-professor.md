# Roteiro do Professor — PBE | Aula de 19/08/2026 (quarta, 5 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 2 — Padrão MVC**

**Conteúdo:** Padrão MVC — definição, separação de responsabilidades, aplicabilidade em APIs; menção rápida a design patterns
**Prática:** esqueleto MVC (routes, controllers, services, models) + primeiro servidor Express
**Capacidades:** CT 7 | CS 1, 4
**Formativa:** estrutura de pastas MVC validada **por grupo**

---

## Situação de partida e decisão de escopo

Turma vem de 14/08 com o diagrama de classes iniciado. Hoje é o primeiro contato com **Express** — até aqui, tudo foi Node puro. Por isso a aula de hoje é mais concreta que abstrata: o MVC só vira real quando um servidor está de fato respondendo a alguma coisa.

> ⚠️ **Ajuste de ritmo, combinado para esta aula:** o ritmo da turma pede menos profundidade e mais concretude. Três decisões tomadas para hoje, que mudam o roteiro em relação ao padrão das aulas anteriores:
>
> 1. **Um servidor Express mínimo roda hoje** (Hello World), para dar chão à explicação de MVC — sem isso, "rota" e "controller" ficam sendo palavras sem nada para se pendurar.
> 2. **Metáfora única do restaurante** conduz a aula inteira. Não trocar de analogia no meio — a mesma imagem repetida em contextos diferentes é o que gruda.
> 3. **Design patterns fica em uma frase só.** Hoje é para plantar a palavra, não explicar o conceito a fundo. Não abrir Singleton, Factory ou qualquer outro nome — isso é ruído para o momento.

**Boa notícia estrutural:** o repositório do grupo já tem parte do que a aula precisa, sem trabalho extra de hoje:

- `package.json`, scripts `start`/`dev`/`lint`, `.gitignore`, ESLint — tudo de 29/07.
- `src/models/Pessoa.js`, `Cliente.js`, `Funcionario.js` — já estão lá desde a atividade de 07/08.
  **Vocês vão descobrir hoje que já fizeram parte do MVC sem perceber.** Vale dizer isso em voz alta.

**O que falta e entra hoje:** instalar o Express; criar `routes/`, `controllers/`, `services/` (vazias, com um arquivo de exemplo cada, comentado); e mover `Livro.js`/`Categoria.js` para dentro de `src/models/` — cada grupo escolhe, entre as versões dos integrantes, qual leva para o projeto.

---

## Linha do tempo

| Aula | Tempo  | Foco                                                              |
| :--: | :----: | ----------------------------------------------------------------- |
|  1   | 50 min | O problema: o restaurante sem organização (código tudo misturado) |
|  2   | 50 min | As 4 funções do restaurante, mapeadas para MVC                    |
|  3   | 50 min | Primeiro servidor Express — o Hello World da Livraria             |
|  —   | 15 min | **Intervalo**                                                     |
|  4   | 50 min | Prática guiada: criar o esqueleto de pastas                       |
|  5   | 50 min | Atividade em grupo: montar e validar o esqueleto completo         |

---

## AULA 1 (50 min) — O restaurante sem organização

### Abertura com histórinha (10 min)

Contar, sem pressa, como se fosse uma cena:

> "Imagina um restaurante onde não existe garçom, nem chef, nem despensa separada. O cliente entra, vai direto pra cozinha, mexe nas panelas, procura os ingredientes ele mesmo, tenta cozinhar o próprio prato brigando com quem também está tentando cozinhar o dele. Funciona? Talvez, uma vez. Com o restaurante cheio, é caos."

Ligar ao código deles:

> "É basicamente o `src/index.js` de vocês hoje: tudo — dado, lógica, resposta — misturado no mesmo arquivo. Funciona com pouco código. Quando o projeto cresce, vira o restaurante sem organização."

### Mostrar o problema no código real (15 min)

Abrir no projetor o `src/index.js` do grupo (ou um exemplo genérico similar) com tudo junto: dado, cálculo e impressão no mesmo lugar, sem separação. Perguntar:

> "Se amanhã a regra de calcular o frete mudar, vocês sabem exatamente qual linha mexer? E se for outra pessoa do grupo mexendo, ela sabe, sem te perguntar?"

Deixar a turma sentir o incômodo antes de entregar a solução — não adiantar o MVC ainda.

### A ideia de organizar por função (25 min)

Desenhar no quadro um restaurante organizado, com 4 papéis bem definidos:

```
CLIENTE faz um pedido
     │
     ▼
┌───────────┐   "Uma mesa quer um X!"    ┌─────────────────┐
│  GARÇOM   │ ────────────────────────▶  │       CHEF      │
│ (recebe o │                            │ (decide o que   │
│  pedido)  │  ◀──────────────────────   │ fazer, comanda) │
└───────────┘   "Aqui está o prato!"     └─────────────────┘
                                                     │
                                          manda fazer│
                                                    ▼
                                            ┌──────────────┐
                                            │  COZINHEIRO  │
                                            │ (executa a   │
                                            │   receita)   │
                                            └──────────────┘
                                                    │
                                           busca ingrediente
                                                    ▼
                                            ┌───────────────┐
                                            │    DESPENSA   │
                                            │  (guarda os   │
                                            │ ingredientes) │
                                            └───────────────┘
```

Deixar essa tabela de mapeamento **no canto do quadro até o fim da aula, como referência rápida** — mas a partir da Aula 2 a explicação nova passa a ser sempre na Livraria, não mais no restaurante.
A história de hoje é um gancho de abertura, não uma segunda narrativa correndo ao lado da Livraria o curso inteiro.

```
GARCOM       ->  ROTA          (recebe o pedido)
CHEF          ->  CONTROLLER    (decide o que fazer)
COZINHEIRO     ->  SERVICE       (executa a receita/regra)
DESPENSA        ->  MODEL         (guarda os dados)
```

> 💡 **Frase-âncora da aula**, repetir sempre que a turma travar em qual camada faz o quê: _"Quem decide não é quem executa."_ (versão curta e reutilizável de "o garçom não cozinha, o cozinheiro não atende mesa" — mais fácil de repetir rápido depois que a história já foi contada)

---

## AULA 2 (50 min) — As 4 camadas, agora na Livraria

> ⚠️ **Mudança de registro, a partir daqui:** a história do restaurante já cumpriu o papel dela na Aula 1 — abriu a ideia de "separar por função". A partir de agora, **toda explicação nova é 100% em cima da Livraria**. O nome do papel do restaurante aparece só entre parênteses, como lembrete visual, não como uma segunda história correndo em paralelo. Para uma turma que já lida com dose extra de abstração, dois domínios fictícios ao mesmo tempo (restaurante + livraria) custam mais do que ajudam.

### Rota — a porta de entrada (10 min)

Um pedido HTTP chega: `GET /livros`. A **rota** é o único código que sabe que esse endereço existe. Ela não decide nada sobre livros — só reconhece o pedido e encaminha para quem sabe tratar disso.

> _(o "garçom" de ontem — recebe, não decide)_

### Controller — quem decide o que fazer (10 min)

O `livroController` recebe o que veio da rota e decide **o que precisa acontecer** para atender esse pedido: buscar todos os livros? Buscar um só? Ele não faz a busca em si — ele **chama** quem faz.

> _(o "chef" de ontem — decide, comanda)_

### Service — quem executa de verdade (10 min)

O `livroService` é onde mora a lógica real: buscar os livros, calcular algo, aplicar uma regra. É o "como fazer", separado do "o que fazer" que já foi decidido pelo controller.

> _(o "cozinheiro" de ontem — executa)_

### Model — onde os dados moram (10 min)

`Livro`, `Categoria`, `Pessoa`, `Cliente`, `Funcionario` — as classes que a turma já escreve desde 05/08. **Elas já são models, e a turma nem sabia.** Não é uma camada nova para criar do zero; é um endereço fixo (`src/models/`) para o que já existe.

> _(a "despensa" de ontem — guarda os dados)_

### O fluxo completo, direto na Livraria (10 min)

```
"Quero ver todos os livros"

Cliente (navegador) -> ROTA (GET /livros)
                          -> CONTROLLER (o que fazer com esse pedido?)
                              -> SERVICE (busca e organiza os livros)
                                  -> MODEL (onde os livros estao guardados)
                              <- devolve os livros prontos
                          <- controller devolve a resposta
Cliente recebe a lista de livros
```

Se a turma travar em algum ponto, aí sim vale voltar rapidamente à frase do restaurante ("quem decide não é quem cozinha") — como resgate pontual, não como reexplicação completa.

> 📌 **Design patterns, em uma frase, sem aprofundar:** _"MVC é um dos vários 'padrões de projeto' — moldes prontos que resolvem problemas comuns de organização de código. Vocês vão ouvir esse termo de novo mais pra frente."_ Não nomear outros padrões hoje — não é o momento.

---

## AULA 3 (50 min) — O primeiro servidor Express

### Por que Express (5 min)

> "Node sozinho consegue ouvir requisições HTTP, mas é trabalhoso. O Express é uma biblioteca que facilita — ele cuida da parte chata para vocês focarem na parte importante."

### Instalação e primeiro código, ao vivo (20 min)

No projetor, dentro do repositório do **grupo**:

```bash
npm install express
```

Explicar: `express` vai para `dependencies` (não `devDependencies`) — porque, diferente do Nodemon e do ESLint, o Express **é necessário para a API rodar de verdade**, inclusive em produção.

Reescrever o `src/index.js` do grupo (o que hoje só imprime o catálogo):

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

Rodar com `npm run dev` e abrir `http://localhost:3000` no navegador, ao vivo. Deixar a turma ver a frase na tela — é o primeiro momento em que o código deles "atende alguém de fora".

> ⚠️ **Diferente de tudo que rodaram até aqui:** o programa não termina sozinho. Ele fica esperando. Para parar, `Ctrl + C` no terminal. Avisar antes que aconteça, para ninguém achar que travou.

### Ligando ao restaurante (10 min)

> "Essa única rota (`app.get(\"/\", ...)`) hoje faz o papel de garçom **e** chef **e** cozinheiro, tudo junto — porque só tem uma linha. Na Aula 4, a gente separa isso de verdade em pastas."

### Mão na massa (15 min)

Cada integrante do grupo roda o mesmo Hello World na própria máquina, dentro do repositório clonado do grupo (`git pull` primeiro, se alguém já tiver enviado). Confirma que todos veem a mensagem no navegador antes de seguir.

---

## INTERVALO (15 min)

---

## AULA 4 (50 min) — Prática guiada: o esqueleto de pastas

### Criar as pastas (10 min)

Dentro de `src/`, ao vivo:

```bash
mkdir routes controllers services
```

`src/models/` já existe desde 07/08 — mostrar isso no explorador de arquivos, reforçando que parte do trabalho já estava feito.

### Um arquivo vazio (comentado) por camada (25 min)

Criar, junto com a turma, um arquivo de exemplo em cada pasta nova — **sem lógica ainda**, só a "placa na porta" dizendo o que mora ali:

`src/routes/livroRoutes.js`

```javascript
// ROTA = o garcom.
// Aqui vao ficar os caminhos (endpoints) relacionados a Livro.
// Ex: GET /livros, POST /livros
// Implementacao chega no Bloco 3, quando o banco de dados entrar.

module.exports = {};
```

`src/controllers/livroController.js`

```javascript
// CONTROLLER = o chef.
// Aqui vai ficar a decisao do que fazer com cada pedido de Livro.
// Recebe da rota, chama o service certo, devolve a resposta.
// Implementacao chega no Bloco 3.

module.exports = {};
```

`src/services/livroService.js`

```javascript
// SERVICE = o cozinheiro.
// Aqui vai ficar a logica de verdade: buscar, calcular, validar.
// Implementacao chega no Bloco 3.

module.exports = {};
```

> 💡 **Por que criar arquivo vazio em vez de pular direto para o código?** Porque a estrutura de pastas **é** o objetivo de hoje — é o que o cronograma pede (esqueleto antes do banco) e é o que será avaliado. O código de verdade dentro de cada camada é conteúdo do Bloco 3, depois que o banco de dados existir.

### Consolidar os models do grupo (15 min)

Momento de decisão em grupo: cada integrante tem sua própria versão de `Livro.js` e `Categoria.js` (feitas individualmente em 05/08 e 12/08, no repositório pessoal). Hoje o grupo **escolhe uma versão** e copia para `src/models/` do repositório do grupo — igual já aconteceu com `Pessoa`/`Cliente`/ `Funcionario` em 07/08.

Critério de escolha sugerido ao grupo: não precisa ser "a melhor" — pode ser a mais simples de entender por todo mundo, já que o grupo inteiro vai mexer nela depois.

---

## AULA 5 (50 min) — Atividade em grupo: montar e validar

### Atividade (35 min)

Distribuir `03-atividade-esqueleto-mvc-grupo.md`. O grupo:

1. Confirma que o Hello World está rodando.
2. Cria os arquivos vazios comentados nas 3 pastas novas.
3. Consolida `Livro.js`/`Categoria.js` em `src/models/`.
4. Preenche a checklist de validação da estrutura.

Circular garantindo que a estrutura de pastas final está correta — é literalmente o objeto da formativa de hoje.

### Commit, push e fechamento (15 min)

```bash
git add .
git commit -m "feat: adiciona esqueleto MVC e servidor Express inicial"
git push
```

> "Hoje vocês criaram a planta baixa da livraria — garçom, chef, cozinheiro e despensa, cada um no seu lugar, mesmo que ainda vazios. Em 21/08 a gente confere se essa planta bate com o desenho UML que vocês fizeram em 14/08. E no Bloco 3, cada sala começa a funcionar de verdade, com banco de dados de verdade."

---

## Avaliação formativa

**Instrumento:** estrutura de pastas MVC validada por grupo.

| Critério                                                                        | Capacidade | O que caracteriza domínio                                            |
| ------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| Estrutura `routes/`, `controllers/`, `services/`, `models/` criada corretamente | CT 7       | 4 pastas dentro de `src/`, nos nomes certos                          |
| Cada arquivo comentado explica sua própria função                               | CT 7       | Comentário reflete o papel real da camada (não copiado sem entender) |
| Consegue explicar a analogia com as próprias palavras                           | CT 7       | Explica "rota = garçom" etc. sem decorar a frase exata               |
| Servidor Express roda sem erro                                                  | CT 7       | `npm run dev` sobe e a mensagem aparece no navegador                 |
| Models consolidados no repositório do grupo                                     | CT 7       | `Livro.js`/`Categoria.js` presentes em `src/models/`                 |
| Grupo participou da decisão de qual versão de model usar                        | CS 1       | Observação em sala                                                   |

---

## Contingências

**Turma travou na diferença entre controller e service.**
É o ponto mais sutil da aula. Reforçar com uma pergunta fechada, repetidas vezes: _"quem decide o que fazer é o chef. Quem realmente cozinha é o cozinheiro."_ Não avançar até a turma conseguir responder, para um pedido novo qualquer (ex.: "cadastrar um livro"), quem faz o quê.

**Express não instalou (rede lenta, ou proxy do laboratório bloqueando o npm).**
Ter, em pendrive ou pasta compartilhada, a pasta `node_modules` do Express já baixada previamente, para copiar direto. Alternativa: fazer a demonstração só no seu notebook (projetor) e os grupos completam a instalação depois da aula, focando hoje na estrutura de pastas (que não depende do Express rodando).

**Sobrou tempo.**
Grupos adiantados podem criar o arquivo vazio equivalente também para `Categoria` (`categoriaRoutes.js`, `categoriaController.js`, `categoriaService.js`), replicando o padrão — sem lógica nova, só o mesmo esqueleto para uma segunda entidade.

**Faltou tempo.**
Cortar primeiro a consolidação de models (Aula 4, último bloco) — pode ser terminada como tarefa fora da sala, já que não depende de você estar presente. **Não cortar** o Hello World rodando: é o que dá concretude para tudo o resto e é pré-requisito direto de 21/08.
