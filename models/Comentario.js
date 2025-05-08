const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    artigo: { type: Schema.Types.ObjectId, ref: 'Artigo', required: true },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    texto: { type: String, required: true },
    trechoComentado: { type: String },
    criadoEm: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Comentario', comentarioSchema);
  