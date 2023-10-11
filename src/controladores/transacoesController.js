const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    try {
        const categorias = await pool.query(`select * from categorias`);

        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const listarTransacoes = async (req, res) => {
    const { id: usuario_id } = req.usuario;
    const { filtro } = req.query;

    try {
        if (filtro) {
            let categorias = [];

            for (let i = 0; i < Array(filtro).length; i++) {
                const element = Array(filtro)[i];

                const { rows } = await pool.query(
                    `select id from categorias where descricao ilike $1`,
                    [element]
                );
                categorias.push(rows[0].id);
            }

            let transacoes = [];

            for (let i = 0; i < categorias.length; i++) {
                const categoria_id = categorias[i];

                const { rows, rowCount } = await pool.query(
                    `select * from transacoes where usuario_id = $1 and categoria_id = $2`,
                    [usuario_id, categoria_id]
                );

                if (rowCount > 0) {
                    transacoes.push(rows[0]);
                }
            }
            return res.status(200).json(transacoes);
        }

        const { rows, rowCount } = await pool.query(
            `select * from transacoes where usuario_id = $1`,
            [usuario_id]
        );

        if (rowCount < 1) {
            return res.status(200).json([])
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const detalharTransacao = async (req, res) => {
    const { id: transacao_id } = req.params;
    const { id } = req.usuario;

    try {
        const { rowCount, rows } = await pool.query(
            `select * from transacoes where id = $1`,
            [transacao_id]
        );

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        if (id !== rows[0].usuario_id) {
            return res.status(401).json({ mensagem: "Transação não pertence ao usuário logado." })
        }

        const categorias = await pool.query(
            `select descricao from categorias where id = $1`,
            [rows[0].categoria_id]
        );

        const transacao = {
            ...rows[0],
            categoria_nome: categorias.rows[0].descricao
        };

        return res.status(200).json(transacao);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: usuario_id } = req.usuario;

    try {
        const { rows } = await pool.query(
            `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values
            ($1, $2, $3, $4, $5, $6) returning *`,
            [descricao, valor, data, categoria_id, usuario_id, tipo]
        );

        const categorias = await pool.query(
            `select descricao from categorias where id = $1`,
            [categoria_id]
        );

        const transacao = {
            ...rows[0],
            categoria_nome: categorias.rows[0].descricao
        };

        return res.status(201).json(transacao);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: transacao_id } = req.params;
    const { id: usuarioId } = req.usuario;

    try {
        const { rowCount, rows } = await pool.query(
            `select usuario_id from transacoes where id = $1`,
            [transacao_id]
        );

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        if (usuarioId !== rows[0].usuario_id) {
            return res.status(401).json({ mensagem: "Transação não pertence ao usuário logado." })
        }

        await pool.query(
            `update transacoes set descricao = $1, 
            valor = $2, data = $3, categoria_id = $4, 
            tipo = $5 where id = $6`,
            [descricao, valor, data, categoria_id, tipo, transacao_id]
        );

        return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const deletarTransacao = async (req, res) => {
    const { id: transacao_id } = req.params;
    const { id: usuarioId } = req.usuario;

    try {
        const { rowCount, rows } = await pool.query(
            `select usuario_id from transacoes where id = $1`,
            [transacao_id]
        );

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        if (usuarioId !== rows[0].usuario_id) {
            return res.status(401).json({ mensagem: "Transação não pertence ao usuário logado." })
        }

        await pool.query(
            `delete from transacoes where id = $1`,
            [transacao_id]
        );

        return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

const obterExtratoDeTransacoes = async (req, res) => {
    const { id: usuarioId } = req.usuario;

    try {
        const { rows, rowCount } = await pool.query(
            `select valor, tipo from transacoes where usuario_id = $1`,
            [usuarioId]
        );

        if (rowCount < 1) {
            let extrato = {
                entrada: 0,
                saida: 0
            };
            return res.status(200).json(extrato);
        }

        const filtrarEntrada = rows.filter(transacao => transacao.tipo === "entrada");

        const filtrarSaida = rows.filter(transacao => transacao.tipo === "saida");

        const entradas = filtrarEntrada.map((transacao) => {
            return transacao.valor;
        });

        const saidas = filtrarSaida.map((transacao) => {
            return transacao.valor;
        });

        const valorInicial = 0;

        const somaEntrada = entradas.reduce((acumulador, valorAtual) => acumulador + valorAtual, valorInicial);

        const somaSaida = saidas.reduce((acumulador, valorAtual) => acumulador + valorAtual, valorInicial);

        if (filtrarEntrada.length === 0) {
            let extrato = {
                entrada: 0,
                saida: somaSaida
            };
            return res.status(200).json(extrato);
        }

        if (filtrarSaida.length === 0) {
            let extrato = {
                entrada: somaEntrada,
                saida: 0
            };
            return res.status(200).json(extrato);
        }

        let extrato = {
            entrada: somaEntrada,
            saida: somaSaida
        }

        return res.status(200).json(extrato);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};

module.exports = {
    listarCategorias,
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    obterExtratoDeTransacoes
};