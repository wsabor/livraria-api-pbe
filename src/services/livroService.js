// SERVICE (o "cozinheiro"): executa a logica de verdade.
// Buscar, calcular, validar.
// Implementacao chega no Bloco 3.

const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Roberto C. Martin", 89.9, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.0, 20),
];

function listarLivros() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  return livros[indice];
}

module.exports = { listarLivros, buscarLivroPorIndice };
