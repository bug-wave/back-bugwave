const Comentario = require('../models/Comentario');
const Artigo = require('../models/Artigo');

exports.criarComentario = async (req, res) => {
  try {
    const { idArtigo, autor, texto, trechoComentado, x, y } = req.body;

    // Verifica se o artigo existe
    const artigo = await Artigo.findById(idArtigo);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado' });
    }

    // Cria o comentário
    const novoComentario = new Comentario({
      autor,
      texto,
      trechoComentado,
      x,
      y
    });

    await novoComentario.save();

    // Adiciona o comentário ao artigo
    artigo.comentarios.push(novoComentario._id);
    await artigo.save();

    res.status(201).json({ mensagem: 'Comentário criado com sucesso', comentario: novoComentario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar comentário', detalhes: error.message });
  }
};


exports.editarComentario = async (req, res) => {
    try {
      const { idComentario, texto, trechoComentado, x, y } = req.body;
  
      const comentarioAtualizado = await Comentario.findByIdAndUpdate(
        idComentario,
        { texto, trechoComentado, x, y },
        { new: true }
      );
  
      if (!comentarioAtualizado) {
        return res.status(404).json({ erro: 'Comentário não encontrado' });
      }
  
      res.json({ mensagem: 'Comentário atualizado com sucesso', comentario: comentarioAtualizado });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar comentário', detalhes: error.message });
    }
  };
  


exports.excluirComentario = async (req, res) => {
  try {
    const { idComentario } = req.params;

    // Verifica se o comentário existe
    const comentario = await Comentario.findById(idComentario);
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado' });
    }

    // Remove o ID do comentário do array de comentários no artigo
    await Artigo.updateOne(
      { comentarios: idComentario },
      { $pull: { comentarios: idComentario } }
    );

    // Deleta o comentário em si
    await Comentario.findByIdAndDelete(idComentario);

    res.json({ mensagem: 'Comentário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir comentário', detalhes: error.message });
  }
};
