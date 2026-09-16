// SERVICE: executa a lógica de Categoria.

const Categoria = require("../models/Categoria");

const categorias = [
  new Categoria("Ficção", "Romances, fantasia e ficção científica"),
  new Categoria("Tecnologia", "Programação, engenharia de software e afins"),
];

function listarCategorias() {
  return categorias;
}

function buscarCategoriaPorIndice(indice) {
  return categorias[indice];
}

module.exports = { listarCategorias, buscarCategoriaPorIndice };
