const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
  isCoordenador: { type: Boolean, default: false },
  isRevisor: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);  