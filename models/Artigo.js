const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artigoSchema = new Schema({
  titulo: { type: String, required: true },
  autores: [{ type: String, required: true }],
  palavrasChave: [{ type: String }],
  resumo: { type: String },
  areaTematica: { type: String },
  caminhoPDF: { type: String, required: true},
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario'}],
  avaliacoes: [{ type: Schema.Types.ObjectId, ref: 'Avaliacao'}],
  status: { 
    type: String,
    enum: ['EM_CONFIRMACAO', 'EM_AVALIACAO', 'APROVADO', 'REPROVADO', 'REVISAO_SOLICITADA'],
    default: 'EM_CONFIRMACAO'
  },
  bannerBase64: { type: String }
},  {
  timestamps: true
});

module.exports = mongoose.model('Artigo', artigoSchema);
