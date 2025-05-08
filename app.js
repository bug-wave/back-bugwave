require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');



//Importação de rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const artigoRoutes = require('./routes/artigoRoutes');

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

//ROUTES
app.use('/usuario', usuarioRoutes);
app.use('/evento', eventoRoutes);
app.use('/artigo', artigoRoutes);


app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
  });