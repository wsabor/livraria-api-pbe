// CONTROLLER (o "chef"): decide o que fazer com cada pedido.
// Recebe da rota, chama o service certo, devolve a resposta.
// Implementacao chega no Bloco 3.

const livroService = require("../services/livroService");

function listar(req, res) {
  const livros = livroService.listarLivros();
  res.json(livros);
}

function buscarPorIndice(req, res) {
  const indice = req.params.indice;
  const livro = livroService.buscarLivroPorIndice(indice);

  if (!livro) {
    res.status(404).json({ erro: "Livro não encontrado" });
    return;
  }
  res.json(livro);
}

module.exports = { listar, buscarPorIndice };
