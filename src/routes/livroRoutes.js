// ROTA (o "garcom"): recebe a requisicao HTTP.
// Aqui vao ficar os caminhos (endpoints) relacionados a Livro.
// Ex: GET /livros, POST /livros
// Implementacao chega no Bloco 3, quando o banco de dados entrar.

const express = require("express");
const livroController = require("../controllers/livroController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

router.get("/", livroController.listar);
router.get("/:id", validarId, livroController.buscarPorId);
router.post("/", livroController.criar);
router.put("/:id", validarId, livroController.atualizar);
router.patch("/:id", validarId, livroController.atualizarParcial);
router.delete("/:id", validarId, livroController.deletar);

module.exports = router;
