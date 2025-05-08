require("dotenv").config();
const cors = require("cors");
const express = require("express");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Importação de rotas
const usuarioRoutes = require("./routes/usuarioRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const artigoRoutes = require("./routes/artigoRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", // origem exata
    credentials: true, // permite envio de cookies
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

//ROUTES
app.use("/usuario", usuarioRoutes);
app.use("/evento", eventoRoutes);
app.use("/artigo", artigoRoutes);
app.use("/comentario", comentarioRoutes);
app.use("/avaliacao", avaliacaoRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
