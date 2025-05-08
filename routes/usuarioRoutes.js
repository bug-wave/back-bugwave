const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

/**
 * POST/
 * CRIAR USUARIO
 */
router.post('/', usuarioController.criarUsuario);

/**
 * POST/
 * LOGIN
 */
router.post('/login', usuarioController.loginUsuario)


module.exports = router;