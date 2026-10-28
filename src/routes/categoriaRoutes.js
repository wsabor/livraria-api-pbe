// ROTA: recebe a requisição HTTP para Categorias.

const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

router.get("/", categoriaController.listar);
router.get("/:id", validarId, categoriaController.buscarPorId);
router.post("/", categoriaController.criar);
router.put("/:id", validarId, categoriaController.atualizar);
router.patch("/:id", validarId, categoriaController.atualizarParcial);
router.delete("/:id", validarId, categoriaController.deletar);

module.exports = router;
