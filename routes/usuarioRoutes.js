const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

/**
 * POST/
 * CRIAR USUARIO
 */
router.post('/', usuarioController.criarUsuario);





module.exports = router;