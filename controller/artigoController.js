const Artigo = require('../models/Artigo');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario')
const Comentario = require('../models/Comentario');
const Avaliacao = require('../models/Avaliacao');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.criarArtigo = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const { titulo, autores, palavrasChave, resumo, areaTematica, autor } = req.body;

        // Criando o artigo com os dados do corpo e o caminho do arquivo no S3
        const novoArtigo = new Artigo({
            titulo,
            autores,
            palavrasChave: palavrasChave || [],
            resumo,
            areaTematica,
            autor,
            caminhoPDF: '.',
        });

        

        const evento = await Evento.findById(eventoId);
        
        evento.artigos = evento.artigo == undefined ? [novoArtigo] : evento.artigo.push(novoArtigo);
        
        await evento.save();
        await novoArtigo.save();

        res.status(201).json(novoArtigo);

    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar artigo.', detalhes: err.message });
    }
};


exports.uploadArtigo = async (req, res) => {



    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

    const key = Date.now() + '-' + file.originalname;

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.upload(params).promise();

        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 9999 // segundos (1 hora)
        });

        const artigo = await Artigo.findById( req.params.id );

        artigo.caminhoPDF = signedUrl;
        
        await artigo.save();



        res.status(200).json({
            message: 'Upload realizado com sucesso!',
            fileUrl: signedUrl
        });

    } catch (error) {
        console.error('Erro ao enviar para o S3:', error);
        res.status(500).json({ error: 'Erro no upload.' });

    }

};


exports.filtrarPorAutor = async (req, res) => {
    try {
      const { idUsuario } = req.params;
  
      const artigos = await Artigo.find({ autor: idUsuario });
  
      res.status(200).json(artigos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar artigos por usuário', detalhes: error.message });
    }


  };

  exports.deletarArtigo = async (req, res) => {
    try {
      const { id } = req.params;
  
      const artigo = await Artigo.findById(id);
      if (!artigo) {
        return res.status(404).json({ erro: 'Artigo não encontrado.' });
      }
  
      // Remove os comentários e avaliações associados
      await Comentario.deleteMany({ _id: { $in: artigo.comentarios } });
      await Avaliacao.deleteMany({ _id: { $in: artigo.avaliacoes } });
  
      await artigo.deleteOne();
  
      res.status(200).json({ mensagem: 'Artigo deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar artigo.', detalhes: error.message });
    }
  };
  

  exports.buscarPorIdArtigo = async (req, res) => {
    try {
      const { artigoId } = req.params;
  
      const artigo = await Artigo.findById(artigoId);
  
      if (!artigo) {
        return res.status(404).json({ erro: 'Artigo não encontrado.' });
      }
  
      res.status(200).json(artigo);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar artigo.', detalhes: error.message });
    }
  };