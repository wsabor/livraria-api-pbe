// ROTA (o "garcom"): recebe a requisicao HTTP.
// Aqui vao ficar os caminhos (endpoints) relacionados a Livro.
// Ex: GET /livros, POST /livros
// Implementacao chega no Bloco 3, quando o banco de dados entrar.

const express = require("express");
const livroController = require("../controllers/livroController");

const router = express.Router();

router.get("/", livroController.listar);
router.get("/:indice", livroController.buscarPorIndice);
router.post("/", livroController.criar);
router.put("/:indice", livroController.atualizar);
router.patch("/:indice", livroController.atualizarParcial);
router.delete("/:indice", livroController.deletar);

module.exports = router;
