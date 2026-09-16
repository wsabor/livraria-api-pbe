// CONTROLLER: decide o que fazer com pedidos de Categoria.

const categoriaService = require("../services/categoriaService");

function listar(req, res) {
  const categorias = categoriaService.listarCategorias();
  res.json(categorias);
}

function buscarPorIndice(req, res) {
  const indice = req.params.indice;
  const categoria = categoriaService.buscarCategoriaPorIndice(indice);

  if (!categoria) {
    res.status(404).json({ erro: "Categoria não encontrada" });
    return;
  }
  res.json(categoria);
}

module.exports = { listar, buscarPorIndice };
