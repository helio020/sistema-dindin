const express = require("express");
const usuarios = require("./rotas/usuarios");
const transacoes = require("./rotas/transacoes")
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(usuarios);
app.use(transacoes);

app.listen(3000);
