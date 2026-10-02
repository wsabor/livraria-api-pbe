# Roteiro do Professor — PBE | Aula de 02/09/2026 (quarta, 5 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Bloco 2 — Clean Code e Refatoração**

**Conteúdo:** princípios de clean code — nomeação clara, funções pequenas, código modular e legível; refatoração como prática contínua de equipe
**Prática:** refatoração guiada das classes do domínio + rodada de code review entre pares com checklist de clean code
**Capacidades:** CT 3 | CS 1, 2, 4
**Formativa:** revisão de código entre pares (checklist de clean code)

---

## Situação de partida

A turma já foi apresentada aos 4 princípios de clean code em 12/08 (nomes claros, responsabilidade única, métodos pequenos, números mágicos), como diagnóstico rápido sobre código próprio. Hoje esses princípios voltam, mas com um upgrade importante: de "notar o problema" para "corrigir de verdade, sem quebrar o que já funciona" — e depois, submeter esse código à revisão de um colega.

**Boa notícia estrutural para hoje:** existe uma oportunidade de refatoração garantida em praticamente todo repositório da turma. Em 12/08, o número mágico `2.5` em `LivroFisico.calcularFrete()` foi usado como exemplo de código a melhorar, mas nunca foi corrigido de fato — ficou como desafio opcional. Hoje ele deixa de ser opcional. É o primeiro refactor guiado do dia, e todo mundo já sabe exatamente o que precisa fazer, porque já viu o problema antes.

**Formato de hoje:** trabalho individual (cada aluno refatora suas próprias classes, no repositório pessoal) seguido de revisão em **duplas dentro do próprio grupo de projeto** — não é atividade de grupo inteiro, é par a par. Isso muda a dinâmica da sala: hoje tem menos "grupo trabalhando junto" e mais "cada um no seu ritmo, depois troca com o colega ao lado".

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Por que refatorar é prática de equipe, não faxina de última hora |
| 2 | 50 min | Refactor guiado 1: extraindo a constante mágica de `LivroFisico` |
| 3 | 50 min | Refactor guiado 2: quebrando um método que faz coisa demais |
| — | 15 min | **Intervalo** |
| 4 | 50 min | Prática individual: aplicar o checklist às próprias classes |
| 5 | 50 min | Code review em duplas, com checklist |

---

## AULA 1 (50 min) — Refatorar não é faxina, é hábito de equipe

### Abertura (10 min)

Perguntar à turma: "vocês lembram do número `2.5` em `calcularFrete()`? Alguém corrigiu isso desde 12/08?" Provavelmente a resposta é majoritariamente não — e está tudo bem, esse era o ponto: naquele dia era só diagnóstico. Hoje é conserto.

Trazer a ideia central da aula: "código não fica limpo uma vez e permanece limpo para sempre. Times de verdade refatoram o tempo todo, sempre que voltam a mexer em algo. Isso tem nome: **refatoração contínua**."

### O que é (e o que não é) refatorar (15 min)

Definição simples para o quadro:

```
REFATORAR = mudar a FORMA do codigo sem mudar o COMPORTAMENTO dele.

Antes de refatorar: o programa faz X.
Depois de refatorar: o programa continua fazendo X.
Só o codigo por dentro ficou mais facil de ler e de mudar depois.
```

Regra de ouro, para grifar: **toda refatoração termina com um teste de que nada mudou.** Rodar o programa antes, anotar a saída, refatorar, rodar de novo, comparar. Se a saída for igual, a refatoração foi segura.

### Refatoração como prática de equipe (15 min)

Ligar ao contexto de grupo: "quando o código é só seu, ninguém mais lê. Quando é de um grupo de 4 pessoas trabalhando na mesma API, código confuso vira um imposto que todo mundo paga — inclusive você, daqui a duas semanas, quando não lembrar mais por que escreveu aquilo daquele jeito."

Apresentar a ideia de **code review** como prática normal de equipe, não como acusação: "todo time de desenvolvimento profissional revisa o código de todo mundo, o tempo todo. Não é porque alguém é ruim programando — é porque um segundo par de olhos sempre encontra algo que o primeiro não viu, e isso é normal, não é vergonha."

### Apresentar o checklist de hoje (10 min)

Mostrar `checklist-clean-code.md` (parte da atividade) projetado. Passar rapidamente pelos 7 itens, sem se aprofundar ainda — a profundidade vem nas Aulas 2 e 3, aplicando de verdade.

---

## AULA 2 (50 min) — Refactor guiado 1: a constante mágica

### Relembrar o problema (5 min)

Abrir, no projetor, o `LivroFisico.js` de algum voluntário (ou um exemplo genérico seu, se ninguém quiser expor o próprio código ainda). Apontar a linha:

```javascript
calcularFrete() {
  return this.#peso * 2.5;
}
```

### Refatorar ao vivo, com teste antes e depois (30 min)

Passo 1 — rodar o código como está, e anotar a saída do frete (ex.: um livro de 0.6kg deve dar R$ 1,50).

Passo 2 — extrair a constante, no topo do arquivo, fora da classe:

```javascript
const Livro = require("./Livro");

const PRECO_POR_KG = 2.5;

class LivroFisico extends Livro {
  // ...
  calcularFrete() {
    return this.#peso * PRECO_POR_KG;
  }
}
```

Passo 3 — rodar de novo. Comparar a saída com a anotada no Passo 1. Devem ser idênticas.

> 💡 Verbalizar o ganho: "agora, se a Livraria decidir cobrar R$ 3,00 por kg em vez de R$ 2,50, existe **um lugar só** para mudar, e o nome `PRECO_POR_KG` já explica o que aquele número significa, sem precisar abrir a conta de cabeça."

### Praticar (15 min)

Cada aluno aplica a mesma refatoração no próprio `LivroFisico.js`, no repositório pessoal. Circular conferindo que a saída do `calcularFrete()` continua igual à de antes da mudança.

---

## AULA 3 (50 min) — Refactor guiado 2: um método que faz coisa demais

### Mostrar o problema (10 min)

Projetar uma versão de referência de um método que faz três coisas ao mesmo tempo — usar o exemplo pronto do guia (`Carrinho.resumo()`, que lista os itens, calcula o total e decide sobre frete grátis, tudo junto). Perguntar: "quantas responsabilidades diferentes esse método tem?"

### Refatorar ao vivo, quebrando em métodos menores (30 min)

Demonstrar a extração de dois métodos novos (`calcularTotal()` e `mostrarStatusFrete()`), deixando `resumo()` como um método curto que só **chama** os outros três, sem fazer nada sozinho. Rodar antes e depois, comparando a saída — deve ser idêntica.

> 💡 Frase-âncora: "um método que faz uma coisa só é mais fácil de testar, de entender e de reaproveitar em outro lugar depois."

### Praticar (10 min)

Quem tiver um método parecido em qualquer classe própria (fazendo mais de uma coisa) aplica a mesma quebra. Quem não tiver, usa o exemplo do `Carrinho` como treino, mesmo que ainda não tenha essa classe no próprio repositório.

---

## INTERVALO (15 min)

---

## AULA 4 (50 min) — Prática individual: auditoria com o checklist completo

Cada aluno percorre as próprias classes (`Livro`, `Categoria`, `LivroFisico`, `LivroDigital`, `Pessoa`, `Cliente`, `Funcionario`, `Carrinho` — as que já tiver) aplicando os 7 itens do checklist. Onde encontrar problema, corrige, sempre testando antes e depois.

Circular priorizando quem está com mais dificuldade — hoje não há pressão de terminar tudo, o objetivo é aplicar o hábito, não zerar a lista.

---

## AULA 5 (50 min) — Code review em duplas

### Formar as duplas (5 min)

Duas duplas por grupo de projeto (grupo de 4 vira 2 duplas de 2). Cada dupla troca: um mostra o código para o outro, usando o checklist como roteiro da conversa.

### A revisão (30 min)

Cada revisor preenche o checklist para o código do colega, marcando o que está de acordo e o que precisa de ajuste, com pelo menos um comentário escrito por item marcado como pendente. Depois, invertem os papéis.

> 💡 Combinar antes de começar: "o objetivo é achar pontos de melhoria, não aprovar ou reprovar o colega. Toda revisão de código de verdade parte do princípio de que sempre existe algo a ajustar — é assim mesmo em qualquer time profissional."

### Aplicar os ajustes combinados (10 min)

Quem recebeu sugestões aceitas aplica o ajuste agora mesmo, com o colega revisor por perto para confirmar.

### Fechamento (5 min)

```bash
git add .
git commit -m "refactor: aplica clean code apos revisao entre pares"
git push
```

Frase de fechamento: "hoje vocês não escreveram nenhuma linha de funcionalidade nova. Vocês deixaram o que já existia mais fácil de mexer depois — isso é trabalho de verdade em qualquer time de desenvolvimento, mesmo sem aparecer como uma funcionalidade nova no aplicativo."

---

## Avaliação formativa

**Instrumento:** revisão de código entre pares, com checklist de clean code.

| Critério | O que caracteriza domínio |
|---|---|
| Extraiu a constante mágica de `calcularFrete()` | Constante nomeada, comportamento idêntico ao original |
| Aplicou ao menos uma quebra de método longo | Método original vira um método curto que delega para métodos menores |
| Testou antes e depois de cada mudança | Consegue afirmar, com evidência, que o comportamento não mudou |
| Participou da revisão do colega de forma construtiva | Comentários específicos, não genéricos como "está bom" |
| Recebeu a revisão sem se colocar na defensiva | Observação em sala |

---

## Contingências

**Aluno não tem `LivroFisico.js` ainda (não fez o desafio de 07/08).** Sem problema — aplica a mesma refatoração em qualquer outra classe própria que tenha um número solto, ou usa o exemplo do guia como treino, mesmo sem ter o arquivo real.

**Duplas travadas, sem saber o que apontar na revisão do colega.** Reduzir a exigência: hoje basta encontrar **um item do checklist**, não os sete. Uma revisão pequena e honesta vale mais que uma tentativa de cobrir tudo superficialmente.

**Algum aluno reage mal a receber sugestão do colega.** Retomar a frase da Aula 1: revisão de código é prática normal de equipe, não é julgamento pessoal. Se necessário, intervir diretamente na dupla, modelando como dar um feedback específico e não genérico.
