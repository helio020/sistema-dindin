const { Router } = require("express");

const {
    listarCategorias,
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    obterExtratoDeTransacoes,
} = require("../controladores/transacoesController");

const {
    validarDescricao,
    validarValor,
    validarData,
    validarCategoriaId,
    validarTipo
} = require("../intermediarios/validacoes");

const verificarToken = require("../intermediarios/autenticacao");

const rotas = Router();

rotas.use(verificarToken);

rotas.get("/categoria", listarCategorias);

rotas.get("/transacao", listarTransacoes);

rotas.get("/transacao/extrato", obterExtratoDeTransacoes);

rotas.get("/transacao/:id", detalharTransacao);

rotas.post(
    "/transacao",
    validarDescricao,
    validarValor,
    validarData,
    validarCategoriaId,
    validarTipo,
    cadastrarTransacao
);

rotas.put(
    "/transacao/:id",
    validarDescricao,
    validarValor,
    validarData,
    validarCategoriaId,
    validarTipo,
    atualizarTransacao
);

rotas.delete("/transacao/:id", deletarTransacao);

module.exports = rotas;