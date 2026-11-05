const db = require('../db');

exports.listar = (req, res) => {
    db.query('SELECT id, nome, email FROM usuario', (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
};

exports.buscar = (req, res) => {
    const id = req.params.id;

    db.query('SELECT id, nome, email FROM usuario WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
};

exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, PASSWORD(?))';

    db.query(sql, [nome, email, senha], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { nome, email, senha } = req.body;

    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = PASSWORD(?) WHERE id = ?';

    db.query(sql, [nome, email, senha, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: 'Usuario atualizado com sucesso!'
        });
    });
};

exports.excluir = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM usuario WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: 'Usuario excluido com sucesso!'
        });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)';

    db.query(sql, [email, senha], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha incorretos!'
            });
        }

        res.json({
            mensagem: 'Login realizado com sucesso!',
            usuario: resultado[0]
        });
    });
};
