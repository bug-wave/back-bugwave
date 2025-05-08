const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.criarUsuario = async (req, res) => {
  try {
    console.log(req.body);
    const { nome, email, senha, isCoordenador, isRevisor } = req.body;
    

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail já está em uso.' });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Cria e salva o usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senhaHash,
      isCoordenador: isCoordenador || false,
      isRevisor: isRevisor || false
    });

    await novoUsuario.save();

    res.status(201).json({
      _id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      isCoordenador: novoUsuario.isCoordenador,
      isRevisor: novoUsuario.isRevisor
      // senhaHash não é retornada
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhes: err.message });
  }
};




