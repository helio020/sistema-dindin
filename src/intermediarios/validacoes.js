const pool = require("../conexao");

const validarNome = async (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "Informe o nome do usuário" });
    }

    next();
};

const validarEmail = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: "Informe um email válido" });
    }

    next();
};

const validarEmailEmUso = async (req, res, next) => {
    const { email } = req.body;

    const { rowCount } = await pool.query(
        `select * from usuarios where email = $1`,
        [email]
    );

    if (rowCount > 0) {
        return res.status(400).json({ mensagem: "Email inválido ou em uso" });
    }

    next();
};

const validarSenha = async (req, res, next) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({ mensagem: "Informe uma senha válida" });
    }

    next();
};

const validarDescricao = async (req, res, next) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ mensagem: "Informe a descrição da transação" });
    }

    next();
};

const validarValor = async (req, res, next) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: "Informe o valor da transação" });
    }

    next();
};

const validarData = async (req, res, next) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ mensagem: "Informe a data da transação" });
    }

    next();
};

const validarCategoriaId = async (req, res, next) => {
    const { categoria_id } = req.body;

    if (!categoria_id) {
        return res.status(400).json({ mensagem: "Informe a categoria_id da transação" });
    }

    const { rowCount } = await pool.query(
        `select * from categorias where id = $1`,
        [categoria_id]
    );

    if (rowCount < 1) {
        return res.status(404).json({ mensagem: "Não existe categoria para o id informado" })
    }

    next();
};

const validarTipo = async (req, res, next) => {
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).json({ mensagem: "Informe o tipo da transação" });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ mensagem: "O tipo informado é inválido" })
    }

    next();
};

module.exports = {
    validarNome,
    validarEmail,
    validarEmailEmUso,
    validarSenha,
    validarDescricao,
    validarValor,
    validarData,
    validarCategoriaId,
    validarTipo
};
