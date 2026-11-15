// CONTROLLER: decide o que fazer com pedidos de Categoria.

const categoriaService = require("../services/categoriaService");

async function listar(req, res) {
  const categorias = await categoriaService.listarCategorias(req.query);
  res.status(200).json(categorias);
}

async function buscarPorId(req, res) {
  const categoria = await categoriaService.buscarCategoriaPorId(req.params.id);
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

async function criar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }

  const novaCategoria = await categoriaService.criarCategoria(req.body);
  res.status(201).json(novaCategoria);
}

async function atualizar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }

  const categoria = await categoriaService.atualizarCategoria(
    req.params.id,
    req.body,
  );
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

async function atualizarParcial(req, res) {
  const erro = categoriaService.validarCategoria(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }

  const categoria = await categoriaService.atualizarParcialCategoria(
    req.params.id,
    req.body,
  );
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

async function deletar(req, res) {
  const sucesso = await categoriaService.deletarCategoria(req.params.id);
  if (!sucesso) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};
