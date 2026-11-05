const db = require('../db');

exports.listar = (req, res) => {
    const sql = 'SELECT * FROM consumo';

    db.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
};

exports.buscar = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM consumo WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
};

exports.cadastrar = (req, res) => {
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;

    const sql = 'INSERT INTO consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [usuarioId, local, equipamento, consumoKwh, mesReferencia, status], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.status(201).json({
            mensagem: 'Consumo cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;

    const sql = 'UPDATE consumo SET usuarioId = ?, local = ?, equipamento = ?, consumoKwh = ?, mesReferencia = ?, status = ? WHERE id = ?';

    db.query(sql, [usuarioId, local, equipamento, consumoKwh, mesReferencia, status, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: 'Consumo atualizado com sucesso!'
        });
    });
};

exports.excluir = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM consumo WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: 'Consumo excluido com sucesso!'
        });
    });
};

exports.resumo = (req, res) => {
    const sql = 'SELECT AVG(consumoKwh) AS mediaConsumo FROM consumo';

    db.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado[0]);
    });
};
