const express = require('express');
const router = express.Router();
const eventoController = require('../controller/eventoController');

/**
 * POST/
 * CRIAR EVENTO EVENTO
 */
router.post('/', eventoController.criarEvento);

/**
 * POST/
 * DELETAR EVENTO
 */
router.delete('/:id', eventoController.deletarEvento);



module.exports = router;