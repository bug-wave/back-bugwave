const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artigoSchema = new Schema({
  titulo: { type: String, required: true },
  autores: [{ type: String, required: true }],
  palavrasChave: [{ type: String }],
  resumo: { type: String },
  areaTematica: { type: String },
  caminhoPDF: { type: String, required: true },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario'}],
  avaliacoes: [{ type: Schema.Types.ObjectId, ref: 'Avalicao'}],
  status: {
    type: String,
    enum: ['EM_AVALIACAO', 'APROVADO', 'REPROVADO', 'REVISAO_SOLICITADA'],
    default: 'EM_AVALIACAO'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Artigo', artigoSchema);
