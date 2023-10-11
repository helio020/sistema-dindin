const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCrypt = await bcrypt.hash(senha, 10);
        const usuario = await pool.query(
            `insert into usuarios(nome, email, senha) values ($1, $2, $3) returning *`,
            [nome, email, senhaCrypt]
        );

        return res.status(201).json(usuario.rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { rows, rowCount } = await pool.query(
            `select * from usuarios where email = $1`,
            [email]
        );

        if (rowCount < 1) {
            return res
                .status(401)
                .json({ mensagem: "Email e/ou senha inválido(s)" });
        }

        const validarSenha = await bcrypt.compare(senha, rows[0].senha);

        if (!validarSenha) {
            return res
                .status(401)
                .json({ mensagem: "Email e/ou senha inválido(s)" });
        }

        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_PASSWORD, {
            expiresIn: "3h",
        });

        const { senha: _, ...usuario } = rows[0];

        return res.status(200).json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const detalharUsuario = async (req, res) => {
    const { senha: _, ...usuario } = req.usuario;

    return res.status(200).json(usuario);
};

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    try {
        const senhaCrypt = await bcrypt.hash(senha, 10);

        await pool.query(
            `
            update usuarios
            set nome = $1, email = $2, senha = $3
            where id = $4
        `,
            [nome, email, senhaCrypt, id]
        );

        return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario,
};
