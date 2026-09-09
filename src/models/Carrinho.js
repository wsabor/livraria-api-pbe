class Carrinho {
  #livros;

  constructor() {
    this.#livros = [];
  }

  adicionarLivro(livro) {
    this.#livros.push(livro);
  }
  
  exibirItem(livro) {
  console.log(livro.titulo + " - R$ " + livro.preco);
  }

  listar() {
    console.log("--- Itens do carrinho ---");
    this.#livros.forEach((livro) => this.exibirItem(livro));
  }

  calcularTotal() {
    return this.#livros.reduce((total, livro) => total + livro.preco, 0);
  }
}

module.exports = Carrinho;