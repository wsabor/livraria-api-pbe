// ROTA: recebe a requisição HTTP para Categorias.

const express = require("express");
const categoriaController = require("../controllers/categoriaController");

const router = express.Router();

router.get("/", categoriaController.listar);
router.get("/:indice", categoriaController.buscarPorIndice);

module.exports = router;
