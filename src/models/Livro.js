const PRECO_MINIMO = 0;
class Livro { //Nome definido
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.#preco = preco;
    this.#estoque = estoque;
    this.categoria = categoria;
  }

  descrever() {
    console.log("Título: " + this.titulo);
    console.log("Autor: " + this.autor);
    console.log("Preco: R$ " + this.#preco);
    console.log("Estoque: " + this.#estoque + " unidades");
    console.log("Categoria: " + this.categoria.nome);
  }

  //Método pequeno
  valorEmEstoque() {
    return this.#preco * this.#estoque;
  }

  get preco() {
    return this.#preco;
  }

  get estoque() {
    return this.#estoque;
  }

  set preco(novoPreco) {
    if (novoPreco < PRECO_MINIMO) {
      console.log("ERRO: preco não pode ser negativo.Valor recusado");
      return;
    }
    this.#preco = novoPreco;
  }

}

module.exports = Livro;