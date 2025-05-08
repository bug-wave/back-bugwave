const express = require("express");
const router = express.Router();
const eventoController = require("../controller/eventoController");

/**
 * POST/
 * CRIAR EVENTO EVENTO
 */
router.post("/", eventoController.criarEvento);

/**
 * GET/
 * BUSCAR EVENTO POR ID
 */
router.get("/:eventoId", eventoController.buscarPorIdEvento);

/**
 * POST/
 * DELETAR EVENTO
 */
router.delete("/:id", eventoController.deletarEvento);

/**
 * GET/
 * LISTAR EVENTOS
 */
router.get("/ativos", eventoController.listarEventosAtivos);

module.exports = router;
