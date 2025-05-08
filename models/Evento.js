const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    numeroAvaliadores: {type: Number},
    avaliadores: [{type: Schema.Types.ObjectId, ref: 'Usuario' }],
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    criadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    artigos: [{ type: Schema.Types.ObjectId, ref: 'Artigo' }]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Evento', eventoSchema);
  