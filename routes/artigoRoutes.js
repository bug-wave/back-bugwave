const express = require('express');
const router = express.Router();
const artigoController = require('../controller/artigoController');





/**
 * POST/
 * CRIAR
 */
router.post('/', artigoController.criarArtigo);



const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

/**
 * UPDATE/
 * COLOCA O ARQUIVO
 */
router.post('/update/:id', upload.single('file'), artigoController.uploadArtigo);

/**
 * GET/
 * ARQUIVOS POR AUTOR
 */
router.get('/:idUsuario', artigoController.filtrarPorAutor);




module.exports = router;