# Roteiro do Professor — PBE | Aula de 14/08/2026 (sexta, 2 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Abertura do Bloco 2 — Modelagem UML**

**Conteúdo:** Diagrama de classes UML — classes, atributos, métodos e relacionamentos
(associação, agregação, composição, herança)
**Prática:** início da modelagem UML das entidades da livraria, em Draw.io
**Capacidades:** CT 2 | CS 1, 2, 4
**Formativa:** rascunho do diagrama de classes por grupo

---

## Situação de partida

Fim do Bloco 1: turma tem 8-10 classes escritas (`Livro`, `Categoria`, `LivroFisico`, `LivroDigital`,
`Pessoa`, `Cliente`, `Funcionario`, `Carrinho`), domina "é um" (herança) e "tem um" (composição, no
sentido amplo e informal usado em 12/08), e já produziu um esboço UML **à mão**, sem notação formal.

**Hoje é o dia de formalizar** — e de **refinar** uma simplificação proposital de 12/08.

> ⚠️ **Ponto de atenção pedagógica, importante para a Aula 1:** em 12/08, chamamos a relação
> `Carrinho`–`Livro` de "composição" no sentido amplo (tem-muitos), porque a distinção fina ainda não
> fazia sentido sem o vocabulário de hoje. Tecnicamente, ela é **agregação**, não composição — um
> livro continua existindo mesmo que o carrinho seja esvaziado ou apagado. Trate isso como
> **refinamento**, não como correção de erro: "vocês já sabiam 90% disso; hoje afinamos os 10% que
> faltam." Essa é, inclusive, a melhor porta de entrada para explicar a diferença entre agregação e
> composição de verdade.

**Mudança de ferramenta:** primeira aula do curso sem VS Code nem terminal. Hoje é **Draw.io**
(app.diagrams.net) — nenhum código é escrito. É a primeira vez que a turma modela algo que ainda não
existe em código (`Pedido`, `ItemPedido`), invertendo a ordem: hoje o desenho vem **antes** do código,
puxando o fio que vai ser costurado em MVC (19/08).

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Notação da caixa de classe + os 4 tipos de relacionamento |
| 2 | 50 min | Multiplicidade + prática em grupo no Draw.io |

---

## AULA 1 (50 min) — A notação formal

### Abertura (5 min)
> "Desde 29/07 vocês escrevem classes direto no código. Hoje é o primeiro dia em que vocês vão
> **desenhar uma classe que ainda nem existe em JavaScript**. É a virada do curso: a partir de hoje,
> todo projeto novo começa no papel, não no teclado."

### A caixa de classe (15 min)
Desenhar no quadro, usando `Livro` (que eles já conhecem de cor) como primeiro exemplo:

```
┌─────────────────────────┐
│          Livro            │   ← nome da classe
├─────────────────────────┤
│ - preco: number             │   ← atributos
│ - estoque: number            │
│ + titulo: string               │
│ + autor: string                 │
├─────────────────────────┤
│ + descrever(): void              │   ← métodos
│ + valorEmEstoque(): number        │
└─────────────────────────┘
```

Três compartimentos, sempre nesta ordem: **nome / atributos / métodos**. Ligar direto ao código:

| Símbolo UML | Equivalente no código de vocês |
|---|---|
| `-` (menos) | atributo com `#` (privado) |
| `+` (mais) | atributo ou método sem `#` (público) |
| `nome: tipo` | o parâmetro do `constructor`, com o tipo do dado ao lado |
| `metodo(): tipo` | o método, com o tipo do que ele **retorna** entre parênteses e depois dos dois-pontos |

> 💡 **`: void` é novo.** Significa "este método não devolve nada com `return` — ele só faz uma ação".
> `descrever()` só imprime; não tem `return`. Já `valorEmEstoque()` tem `: number`, porque ele
> **devolve** um número.

Pedir para a turma desenhar, em 3 minutos, a caixa de `Categoria` sozinhos — é simples, serve de
aquecimento e de checagem rápida de quem entendeu a notação.

### Os 4 relacionamentos (30 min)
Este é o núcleo da aula. Apresentar nesta ordem, do mais fraco ao mais forte — a ordem importa porque
cada um contrasta com o anterior.

**1. Associação — a mais fraca. "Conhece" ou "usa", sem posse.**

```
┌─────────────┐              ┌──────────┐
│ Funcionario  │ ──────────▶ │ Cliente   │   atende
└─────────────┘              └──────────┘
```
Linha simples, seta aberta. `Funcionario` sabe da existência de `Cliente` (atende), mas não é "dono"
dele — o cliente existe de forma totalmente independente do funcionário.

**2. Agregação — "tem um", mas fraco. O losango é VAZIO.**

```
┌───────────┐   ◇──────────▶ ┌────────┐
│ Carrinho    │               │  Livro   │
└───────────┘                └────────┘
```
> Aqui entra o refinamento anunciado: retomar o exemplo de `Carrinho`/`Livro` de 12/08. Perguntar à
> turma: **"se eu apagar o carrinho, o livro deixa de existir na livraria?"** Não — ele continua na
> prateleira. É exatamente esse teste que define agregação: **a parte sobrevive sem o todo.**

**3. Composição — "tem um" forte. O losango é PREENCHIDO.**

```
┌──────────┐   ◆──────────▶ ┌────────────┐
│  Pedido    │               │ ItemPedido    │
└──────────┘                └────────────┘
```
> Introduzir `Pedido` e `ItemPedido` como **entidades novas**, que ainda não existem em código — só
> hoje, no papel. Perguntar: **"um item de pedido faz sentido sozinho, sem o pedido dele?"** Não —
> se o pedido for cancelado/apagado, os itens dele deixam de fazer sentido junto. **A parte não
> sobrevive sem o todo.**

Contraste direto para fixar (repetir esta frase, ela é o núcleo da diferença):

```
AGREGAÇÃO (losango vazio) → a parte sobrevive sem o todo    (Carrinho / Livro)
COMPOSIÇÃO (losango cheio) → a parte NÃO sobrevive sem o todo (Pedido / ItemPedido)
```

**4. Herança — "é um". Seta com triângulo VAZIO, apontando para a classe-mãe.**

```
┌─────────┐   ◁──────────  ┌─────────────┐
│  Livro    │               │ LivroFisico   │
└─────────┘                └─────────────┘
```
Esta a turma já domina de 07/08 — é só formalizar o símbolo (triângulo vazio, não seta comum) e
reforçar a direção: **a seta aponta para a classe-mãe**, não para a filha.

### Quadro-resumo (escrever e deixar até o fim da aula)

```
ASSOCIAÇÃO   → linha simples, seta aberta      → "conhece / usa"
AGREGAÇÃO    → losango VAZIO no lado do todo   → "tem um" fraco (parte sobrevive)
COMPOSIÇÃO   → losango CHEIO no lado do todo   → "tem um" forte (parte não sobrevive)
HERANÇA      → triângulo VAZIO, aponta pro pai → "é um"
```

---

## AULA 2 (50 min) — Multiplicidade e prática em Draw.io

### Multiplicidade (10 min)
Antes de ir para a ferramenta, acrescentar um detalhe que todo relacionamento carrega: **quantos de
cada lado**.

```
Carrinho "1" ◇────────▶ "0..*" Livro
```
Lido como: *"um carrinho tem de zero a muitos livros."*

| Notação | Significa |
|---|---|
| `1` | exatamente um |
| `0..1` | zero ou um |
| `0..*` (ou só `*`) | zero ou muitos |
| `1..*` | um ou muitos (pelo menos um) |

Aplicar rápido em `Pedido`/`ItemPedido`: um pedido tem **1..\*** itens (pelo menos um — pedido vazio
não faz sentido); cada item pertence a **exatamente 1** pedido.

### Apresentar o Draw.io (10 min)
Projetar [app.diagrams.net](https://app.diagrams.net) (não precisa de login para uso básico — escolher
"Device" ao abrir). Mostrar ao vivo:
1. Arrastar uma forma retangular e dividir em 3 compartimentos (ou usar a forma pronta de "UML Class"
   na barra lateral, buscando "class" na caixa de pesquisa de formas).
2. Conectar duas caixas com uma linha.
3. Clicar na linha → no painel direito, trocar o estilo das pontas (seta aberta, losango vazio,
   losango cheio, triângulo vazio) — é isso que muda o **tipo** de relacionamento visualmente.
4. Adicionar texto de multiplicidade perto de cada ponta da linha (duplo clique próximo à linha).

### Formação dos grupos e início da prática (30 min)
Distribuir `03-atividade-diagrama-uml-grupo.md`. Os mesmos 8 grupos. Circular, garantindo:
- As 3 relações revisadas hoje (associação, agregação, composição) aparecem **ao menos uma vez cada**
  no diagrama do grupo — não deixar que todos usem só herança, que é a mais confortável por já
  conhecida.
- O símbolo da ponta da linha está correto (losango vazio ≠ losango cheio é o erro mais comum de
  clique errado no Draw.io).

### Fechamento (não é aula de 5 blocos — encerrar com o grupo ainda trabalhando)
Combinar que o diagrama **não precisa estar terminado hoje** — é rascunho, retomado em 21/08 (revisão
de coerência entre UML e estrutura de pastas do MVC). Pedir que cada grupo salve o progresso e exporte
uma imagem (`.png`) para o repositório do grupo antes de sair, mesmo incompleto.

---

## Avaliação formativa

**Instrumento:** rascunho do diagrama de classes por grupo.

| Critério | Capacidade | O que caracteriza domínio |
|---|---|---|
| Caixa de classe com os 3 compartimentos corretos | CT 2 | Nome, atributos com visibilidade, métodos com tipo de retorno |
| Usa o símbolo certo para cada relacionamento | CT 2 | Losango vazio ≠ losango cheio ≠ triângulo ≠ seta simples |
| Distingue agregação de composição com justificativa | CT 2 | Responde "a parte sobrevive sem o todo?" corretamente |
| Multiplicidade coerente com a regra de negócio | CT 2 | Ex.: `Pedido` exige `1..*` itens, não `0..*` |
| Grupo colaborou na construção | CS 1, 2 | Observação em sala |

---

## Contingências

**Draw.io não abre (rede do laboratório bloqueando, ou lentidão).**
Fallback imediato: papel e caneta, retomando exatamente a notação de hoje — símbolos de losango e
triângulo desenhados à mão. O aprendizado da notação independe da ferramenta; o Draw.io formaliza
para 21/08, mas não é bloqueante hoje.

**Turma confundiu agregação com composição na prática.**
Voltar ao teste de uma frase, repetidamente, para cada relação que surgir: **"se eu apagar o todo, a
parte desaparece com ele?"** Sim → composição. Não → agregação. Não force decorar; force o teste.

**Grupo não incluiu `Pedido`/`ItemPedido` porque "isso não existe no código ainda".**
Reforçar que é exatamente esse o ponto da aula: modelar antes de codificar. Relembrar a frase de
fechamento de 12/08 — "todo projeto do curso começa no papel, não no teclado".

**Sobrou tempo.**
Grupos que terminarem cedo acrescentam multiplicidade em todas as relações do diagrama (não só nas
citadas em aula) e comparam com outro grupo vizinho, apontando diferenças de modelagem — é comum dois
grupos modelarem a mesma relação de formas diferentes, e nenhum dos dois estar necessariamente errado.
