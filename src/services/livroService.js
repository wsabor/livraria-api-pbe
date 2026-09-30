// SERVICE (o "cozinheiro"): executa a logica de verdade.
// Buscar, calcular, validar.
// Implementacao chega no Bloco 3.

const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Roberto C. Martin", 89.9, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.0, 20),
];

function listarTodos() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  return livros[indice];
}

function listarLivros(filtros) {
  let resultado = livros;
  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase()),
    );
  }
  if (filtros.precoMax) {
    resultado = resultado.filter(
      (livro) => livro.preco <= Number(filtros.precoMax),
    );
  }
  if (filtros.estoqueMin) {
    resultado = resultado.filter(
      (livro) => livro.estoque >= Number(filtros.estoqueMin),
    );
  }
  return resultado;
}

function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
  );
  livros.push(novoLivro);
  return novoLivro;
}

function atualizarLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  return livro;
}

function atualizarParcialLivro(indice, dados) {
  const livro = livros[indice];
  if (!livro) return null;

  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  return livro;
}

function deletarLivro(indice) {
  const livro = livros[indice];
  if (!livro) return false;

  livros.splice(indice, 1);
  return true;
}

module.exports = {
  listarTodos,
  listarLivros,
  buscarLivroPorIndice,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
};
