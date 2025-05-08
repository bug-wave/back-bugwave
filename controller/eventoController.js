const Evento = require("../models/Evento");

exports.criarEvento = async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      numeroAvaliadores,
      avaliadores,
      dataInicio,
      dataFim,
      criadoPor,
    } = req.body;

    // Validação básica
    if (!titulo || !dataInicio || !dataFim || !criadoPor) {
      return res.status(400).json({
        erro: "Título, dataInicio, dataFim e criadoPor são obrigatórios.",
      });
    }

    const novoEvento = new Evento({
      titulo,
      descricao,
      numeroAvaliadores,
      avaliadores,
      dataInicio,
      dataFim,
      criadoPor,
      artigos: [],
    });

    await novoEvento.save();

    res.status(201).json(novoEvento);
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao criar evento.", detalhes: err.message });
  }
};

exports.deletarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado." });
    }

    const agora = new Date();
    if (evento.dataFim < agora) {
      return res
        .status(400)
        .json({ erro: "Não é possível deletar um evento que já terminou." });
    }

    await Evento.findByIdAndDelete(id);
    res.json({ mensagem: "Evento deletado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar evento.", detalhes: err.message });
  }
};

exports.listarEventosAtivos = async (req, res) => {
  try {
    const dataAtual = new Date();

    console.log("Buscando eventos ativos...");

    const eventosAtivos = await Evento.find({
      dataInicio: { $lte: new Date() },
      dataFim: { $gte: new Date() },
    });

    res.status(200).json(eventosAtivos);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar eventos ativos", detalhes: error.message });
  }
};

exports.buscarPorIdEvento = async (req, res) => {
  try {
    const { eventoId } = req.params;

    const evento = await Evento.findById(idEvento);

    console.log("Buscando evento por ID...", evento.artigos);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado." });
    }

    res.status(200).json(evento);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar evento", detalhes: error.message });
  }
};
