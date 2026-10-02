# Roteiro do Professor — PBE | Aula de 25/09/2026 (sexta, 2 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 3 — Continuação do Protocolo HTTP**

**Conteúdo:** tipos de passagem de parâmetros — route params, query params e body
**Prática:** rotas parametrizadas e leitura de body JSON
**Capacidades:** CT 6 | CS 1, 4
**Formativa:** exercícios de rotas com parâmetros

---

## Situação de partida

A turma já usa dois dos três tipos de parâmetro há duas semanas, sem nunca terem sido nomeados como categorias: `req.params.indice` (desde 09/09) e `req.body` (desde 16/09, nos métodos `POST`/`PUT`/`PATCH`). Hoje entra o terceiro tipo — **query params** — e os três ganham nome, definição e critério de quando usar cada um.

**A pergunta que estrutura a aula:** *"a Livraria já sabe listar todos os livros e buscar um específico. E se um cliente quisesse buscar só os livros de um autor, ou só os que custam até R$ 50? Isso não é buscar **um** livro pelo índice — é filtrar a **lista inteira**."* É exatamente esse problema que query params resolve, e é o gancho natural para introduzir o conceito novo a partir de uma necessidade real, não de uma definição solta.

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Os três tipos de parâmetro, com o que já existe + query params guiado |
| 2 | 50 min | Combinando os três + atividade em grupo |

---

## AULA 1 (50 min) — Nomeando o que já existe, e o que falta

### Abertura com o problema (10 min)

Lançar a pergunta da seção anterior. Deixar a turma tentar resolver verbalmente antes de nomear a solução: "como vocês fariam, com o que já sabem, para filtrar os livros por autor?"

Provavelmente alguém vai sugerir algo como `/livros/autor/martin` — uma boa tentativa, que abre espaço para a distinção central da aula.

### Os três tipos, com nome e função (20 min)

Quadro-resumo:

```
ROUTE PARAM   ->  identifica QUAL recurso especifico     ->  /livros/3
QUERY PARAM    ->  filtra ou ajusta COMO uma lista volta   ->  /livros?autor=martin
BODY            ->  envia um pacote de dados COMPLETO        ->  { "titulo": "...", ... }
```

Ligar ao que já existe:

| Tipo | Onde já apareceu | Como se lê no código |
|---|---|---|
| Route param | `GET /livros/:indice` desde 09/09 | `req.params.indice` |
| Body | `POST`/`PUT`/`PATCH` desde 16/09 | `req.body` |
| Query param | **Novo hoje** | `req.query` |

> 💡 Frase-âncora: "route param diz **qual**. Query param diz **como filtrar ou organizar uma lista**. Body carrega **o pacote inteiro** de dados para criar ou atualizar algo."

Retomar a sugestão da abertura (`/livros/autor/martin`): explicar por que isso funcionaria, mas não é a convenção — misturar filtro dentro do caminho da URL fica confuso quando há mais de um critério (`/livros/autor/martin/precoMax/100` já fica estranho). Query params foram inventados exatamente para múltiplos filtros combináveis.

### Construir o primeiro filtro com query param, ao vivo (20 min)

No service:

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

No controller:

```javascript
function listar(req, res) {
  const filtros = req.query;
  const livros = livroService.listarLivros(filtros);
  res.status(200).json(livros);
}
```

Testar no Postman: `GET /livros?autor=fowler`. Mostrar que `req.query` já chega como um objeto pronto — o Express faz o trabalho de interpretar o `?autor=fowler` da URL.

> ⚠️ Nada muda na rota (`router.get("/", livroController.listar)`) — query params **não fazem parte da definição da rota**, diferente de route params (`:indice`). Isso costuma confundir: vale reforçar que `/livros?autor=x` e `/livros` são a **mesma rota**, só com informação extra anexada.

---

## AULA 2 (50 min) — Combinando os três + atividade

### Um segundo filtro, e os dois juntos (15 min)

Acrescentar o filtro de preço:

```javascript
if (filtros.precoMax) {
  resultado = resultado.filter((livro) => livro.preco <= Number(filtros.precoMax));
}
```

> ⚠️ **Todo valor de query param chega como texto (string)**, mesmo que pareça um número na URL. `Number(filtros.precoMax)` converte antes de comparar — esquecer essa conversão é o erro mais provável do dia, porque `"100" <= 90` se comporta de um jeito inesperado em comparação de string.

Testar `GET /livros?autor=martin&precoMax=100` — dois filtros combinados com `&`, ao mesmo tempo. Mostrar que o resultado respeita os dois critérios juntos.

### Os três tipos, na mesma requisição (10 min)

Desenhar um exemplo hipotético que usa os três ao mesmo tempo, para fixar a distinção final:

```
PUT /livros/3?notificarCliente=true
Body: { "preco": 79.90 }

route param (3)         -> qual livro atualizar
query param (notificar)  -> um comportamento extra, opcional, fora do dado principal
body (preco)              -> o dado que de fato muda
```

> Esse exemplo é só ilustrativo — não precisa implementar o `notificarCliente` hoje. O objetivo é a turma enxergar que os três tipos podem coexistir na mesma requisição, cada um com seu papel.

### Atividade em grupo (25 min)

Distribuir `03-atividade-parametros-grupo.md`. Cada grupo implementa pelo menos dois filtros por query param e testa as combinações.

### Fechamento

```bash
git add .
git commit -m "feat: adiciona filtros via query params na listagem de livros"
git push
```

Gancho para a próxima aula de conteúdo pesado: "hoje vocês aprenderam a filtrar uma lista. Em breve, isso vira parte formal do padrão REST — princípios que dão nome exatamente a esse tipo de boa prática."

---

## Avaliação formativa

**Instrumento:** exercícios de rotas com parâmetros.

| Critério | O que caracteriza domínio |
|---|---|
| Distingue route param de query param | Explica por que `:indice` está na rota e `?autor=x` não |
| `req.query` usado corretamente | Filtro funciona, sem alterar a definição da rota |
| Conversão de tipo aplicada | `Number(...)` usado antes de comparar valores numéricos vindos de query param |
| Múltiplos query params combinados | Dois filtros juntos (`&`) retornam o resultado esperado |
| Reconhece onde `body` já era usado | Associa `req.body` a `POST`/`PUT`/`PATCH` de 16/09, sem confundir com os outros dois |

---

## Contingências

**Turma tenta usar route param para tudo (ex.: `/livros/autor/:nome`).** Não é errado por si só — é assim que APIs mais simples às vezes fazem. Mas mostrar o problema de escala: dois filtros juntos nessa abordagem exigiriam uma rota nova para cada combinação. Query param resolve isso de uma vez.

**Comparação de preço não funciona como esperado.** Verificar primeiro se `Number(...)` foi aplicado — é o erro mais provável, e o sintoma (filtro "passando" livros que não deveriam) não gera nenhum erro visível, só resultado errado.

**Sobrou tempo.** Grupos adiantados podem acrescentar um terceiro filtro (por exemplo, `estoqueMin`) seguindo o mesmo padrão.
