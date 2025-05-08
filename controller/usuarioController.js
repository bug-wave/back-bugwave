const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const express = require('express');

exports.criarUsuario = async (req, res) => {
  try {
    console.log(req.body);
    
    const { nome, email, senha, isCoordenador, isRevisor } = req.body;
    

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

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
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhes: err.message });
  }
};



exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    res.status(200).json({
      mensagem: 'Login bem-sucedido',
      usuario: {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        isCoordenador: usuario.isCoordenador,
        isRevisor: usuario.isRevisor
      }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login.', detalhes: err.message });
  }
};


