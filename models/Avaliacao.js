const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avaliacaoSchema = new Schema({
    avaliador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nota: { type: Number, min: 0, max: 10, required: true },
    parecer: { type: String },
    dataAvaliacao: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Avaliacao', avaliacaoSchema);
  