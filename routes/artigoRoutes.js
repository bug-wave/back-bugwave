const express = require('express');
const router = express.Router();
const artigoController = require('../controller/artigoController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });



/**
 * POST/
 * PUBLICAR ARTIGO
 */
router.post('/', artigoController.criarArtigo);

/**
 * UPDATE/
 * PUBLICAR ARTIGO
 */
router.post('/update/:id', upload.single('file'), artigoController.uploadArtigo);

module.exports = router;