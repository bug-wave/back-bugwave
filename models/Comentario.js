const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    texto: { type: String, required: true },
    trechoComentado: { type: String },
    x: {type: Number},
    y: {type: Number},
    criadoEm: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Comentario', comentarioSchema);
  