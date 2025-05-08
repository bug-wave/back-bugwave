const express = require('express');
const router = express.Router();
const comentarioController = require('../controller/comentarioController');


/**
 * POST/
 * CRIAR COMENTARIO
 */
router.post('/', comentarioController.criarComentario);

/**
 * POST/
 * EDITAR COMENTARIO
 */
router.post('/editar', comentarioController.editarComentario);


/**
 * DELETE/
 * EXCLUIR COMENTARIO
 */
router.delete('/excluir/:idComentario', comentarioController.excluirComentario);

/**
 * GET/
 * PROCURAR POR ID COMENTARIO
 */

router.get('/:comentarioId', comentarioController.buscarPorIdComentario);


module.exports = router;
