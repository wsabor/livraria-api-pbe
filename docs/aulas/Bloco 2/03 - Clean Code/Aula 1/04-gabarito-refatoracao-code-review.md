# 🔑 Gabarito — Atividade 08: Refatoração e Code Review

**Uso exclusivo do professor.**

---

## Refactor 1 — constante mágica, código de referência

```javascript
const Livro = require("./Livro");

const PRECO_POR_KG = 2.5;

class LivroFisico extends Livro {
  #peso;

  constructor(titulo, autor, preco, estoque, peso) {
    super(titulo, autor, preco, estoque);
    this.#peso = peso;
  }

  get peso() {
    return this.#peso;
  }

  calcularFrete() {
    return this.#peso * PRECO_POR_KG;
  }

  descrever() {
    super.descrever();
    console.log("Tipo:    Fisico");
    console.log("Peso:    " + this.#peso + "kg");
    console.log("Frete:   R$ " + this.calcularFrete().toFixed(2));
  }
}

module.exports = LivroFisico;
```

**Teste de referência, rodado de fato no Node**, comparando antes e depois da refatoração, com um livro de 0.6kg: o frete é R$ 1,50 nas duas versões. Comportamento idêntico confirmado.

**Erro mais provável:** aluno declara a constante **dentro** da classe, como se fosse um atributo (`this.PRECO_POR_KG = 2.5`), o que funciona mas não é o ponto do exercício — a constante deve ficar fora da classe, no topo do arquivo, porque não pertence a nenhum objeto específico, é uma regra geral do sistema.

---

## Refactor 2 — método quebrado, código de referência

```javascript
const VALOR_MINIMO_FRETE_GRATIS = 100;

class Carrinho {
  #livros;

  constructor() {
    this.#livros = [];
  }

  adicionarLivro(livro) {
    this.#livros.push(livro);
  }

  listar() {
    console.log("--- Itens do carrinho ---");
    this.#livros.forEach((livro) => {
      console.log(livro.titulo + " - R$ " + livro.preco);
    });
  }

  calcularTotal() {
    let total = 0;
    this.#livros.forEach((livro) => {
      total = total + livro.preco;
    });
    return total;
  }

  mostrarStatusFrete(total) {
    if (total > VALOR_MINIMO_FRETE_GRATIS) {
      console.log("Voce ganhou frete gratis!");
    } else {
      const faltam = VALOR_MINIMO_FRETE_GRATIS - total;
      console.log("Faltam R$ " + faltam.toFixed(2) + " para frete gratis.");
    }
  }

  resumo() {
    this.listar();
    const total = this.calcularTotal();
    console.log("Total: R$ " + total.toFixed(2));
    this.mostrarStatusFrete(total);
  }
}

module.exports = Carrinho;
```

**Teste de referência, rodado de fato no Node**, comparando a versão original (com tudo dentro de `resumo()`) e a versão refatorada, com os mesmos dois livros no carrinho: a saída é idêntica nas duas versões, incluindo a mensagem de frete grátis. Comportamento preservado, confirmado.

**Erro mais provável:** aluno quebra o método, mas `resumo()` continua fazendo parte do trabalho sozinho, em vez de só chamar os métodos menores — por exemplo, mantendo o `forEach` de impressão dentro de `resumo()` e só extraindo o cálculo do total. Vale perguntar: "esse método ainda faz mais de uma coisa, ou já está só delegando?"

---

## Checklist — o que caracteriza cada item corretamente aplicado

| Item | Sinal de que está correto | Sinal de alerta |
|---|---|---|
| 1. Nomes claros | Nome explica a função sem abrir o código | Nomes de uma letra, ou abreviações como `qtd`, `vlr` sem contexto |
| 2. Sem números mágicos | Valores com significado têm constante nomeada | Números soltos em cálculos, sem explicação |
| 3. Métodos pequenos | Cada método cabe na tela, faz uma coisa | Método com mais de 15-20 linhas fazendo várias tarefas |
| 4. Sem duplicação | Lógica repetida foi extraída para um método comum ou para a classe-mãe | O mesmo trecho de código aparece em duas classes |
| 5. Dados protegidos | Atributos com regra de negócio usam `#` e `set` com validação | Atributo com regra de negócio exposto sem `#` |
| 6. Um arquivo, uma classe | `module.exports` no final, uma classe por arquivo | Duas classes no mesmo arquivo, ou `module.exports` ausente |
| 7. Comentários úteis | Comentário explica uma decisão não óbvia | Comentário que só repete o nome do método em português |

---

## Sobre a revisão em duplas

Não há gabarito fechado para os comentários da revisão — o critério é a **qualidade** do comentário, não um conteúdo específico. Comentários aceitáveis apontam item do checklist e linha; comentários genéricos ("tá bom", "não vi nada de errado" sem checar os 7 itens) indicam revisão superficial e vale conversar com a dupla sobre isso.

Se uma dupla terminar rápido sem apontar nenhum item de melhoria, vale perguntar diretamente: "vocês checaram os 7 itens mesmo, ou só deram uma olhada geral?" — é raro, mas possível, que o código já esteja de fato limpo nos 7 pontos; o que não é esperado é a dupla pular a checagem sistemática.

---

## Checklist de correção rápida (por aluno)

- [ ] Constante mágica extraída, com teste de comportamento idêntico
- [ ] Ao menos um método longo quebrado, sem sobra de responsabilidade em `resumo()` ou equivalente
- [ ] Tabela do checklist preenchida para 2 classes, com marcações coerentes
- [ ] Participou como revisor, com comentários específicos
- [ ] Participou como revisado, aplicando ao menos um ajuste sugerido
- [ ] Push feito
