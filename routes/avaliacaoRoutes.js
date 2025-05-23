const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controller/avaliacaoController');


/**
 * POST/
 * CRIAR AVALIAÇÃO
 */
router.post('/', avaliacaoController.criarAvaliacao);

/**
 * DELETE/
 * DELETAR AVALIÇÃO
 */
router.delete('/excluir/:idAvaliacao', avaliacaoController.deletarAvaliacao);

/**
 * PUT/
 * EDITAR AVALIÇÃO
 */

router.put('/editar/:idAvaliacao', avaliacaoController.editarAvaliacao);



/**
 * GET/
 * PROCURAR POR ID AVALIÇÃO
 */
router.get('/:avaliacaoId', avaliacaoController.buscarPorIdAvaliacao);
module.exports = router;
