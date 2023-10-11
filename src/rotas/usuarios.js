const { Router } = require("express");

const {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario,
} = require("../controladores/usuariosController");

const {
    validarEmail,
    validarNome,
    validarSenha,
    validarEmailEmUso
} = require("../intermediarios/validacoes");

const verificarToken = require("../intermediarios/autenticacao");

const rotas = Router();

rotas.post(
    "/usuario",
    validarNome,
    validarEmail,
    validarEmailEmUso,
    validarSenha,
    cadastrarUsuario
);
rotas.post("/login", validarEmail, validarSenha, login);

rotas.use(verificarToken);

rotas.get("/usuario", detalharUsuario);

rotas.put(
    "/usuario",
    validarNome,
    validarEmail,
    validarEmailEmUso,
    validarSenha,
    atualizarUsuario
);

module.exports = rotas;
