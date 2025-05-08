const Avaliacao = require('../models/Avaliacao');
const Artigo = require('../models/Artigo');

exports.criarAvaliacao = async (req, res) => {
  try {
    const { idArtigo, avaliador, nota, parecer } = req.body;

    // Cria a nova avaliação
    const novaAvaliacao = new Avaliacao({
      avaliador,
      nota,
      parecer
    });

    // Salva a avaliação
    const avaliacaoSalva = await novaAvaliacao.save();

    // Adiciona a avaliação no artigo
    await Artigo.findByIdAndUpdate(
      idArtigo,
      { $push: { avaliacoes: avaliacaoSalva._id } },
      { new: true }
    );

    res.status(201).json({ mensagem: 'Avaliação adicionada com sucesso', avaliacao: avaliacaoSalva });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar avaliação', detalhes: error.message });
  }
};


exports.deletarAvaliacao = async (req, res) => {
    try {
      const { idAvaliacao } = req.params;

      console.log('PARAMETRO DO ID: ', idAvaliacao);
  
      // Deleta a avaliação
      const avaliacaoRemovida = await Avaliacao.findByIdAndDelete(idAvaliacao);
  
      if (!avaliacaoRemovida) {
        return res.status(404).json({ erro: 'Avaliação não encontrada' });
      }
  
      // Remove a referência nos artigos
      await Artigo.updateMany(
        { avaliacoes: idAvaliacao },
        { $pull: { avaliacoes: idAvaliacao } }
      );
  
      res.status(200).json({ mensagem: 'Avaliação deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar avaliação', detalhes: error.message });
    }
  };

  exports.editarAvaliacao = async (req, res) => {
    try {
      const { idAvaliacao } = req.params;
      const { nota, parecer } = req.body;
  
      // Verificar se os campos obrigatórios estão presentes
      if (nota === undefined || nota < 0 || nota > 10) {
        return res.status(400).json({ erro: 'A nota deve estar entre 0 e 10.' });
      }
  
      // Encontrar a avaliação a ser editada
      const avaliacao = await Avaliacao.findById(idAvaliacao);
  
      if (!avaliacao) {
        return res.status(404).json({ erro: 'Avaliação não encontrada' });
      }
  
      // Atualizar os campos da avaliação
      avaliacao.nota = nota;
      avaliacao.parecer = parecer;
  
      // Salvar a avaliação atualizada
      await avaliacao.save();
  
      res.status(200).json({ mensagem: 'Avaliação atualizada com sucesso', avaliacao });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao editar avaliação', detalhes: error.message });
    }
  };

  exports.buscarPorIdAvaliacao = async (req, res) => {
    try {
        const { idAvaliacao } = req.params;
    
        const avaliacao = await Avaliacao.findById(idAvaliacao).populate('avaliador', 'nome email');
        if (!avaliacao) {
          return res.status(404).json({ erro: 'Avaliação não encontrada.' });
        }
    
        res.status(200).json(avaliacao);
      } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar avaliação.', detalhes: error.message });
      }
  };