const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const consumo = require('./controllers/consumo');

router.get('/usuarios', usuario.listar);
router.get('/usuarios/:id', usuario.buscar);
router.post('/usuarios', usuario.cadastrar);
router.put('/usuarios/:id', usuario.atualizar);
router.delete('/usuarios/:id', usuario.excluir);

router.post('/login', usuario.login);

router.get('/consumos', consumo.listar);
router.get('/consumos/:id', consumo.buscar);
router.post('/consumos', consumo.cadastrar);
router.put('/consumos/:id', consumo.atualizar);
router.delete('/consumos/:id', consumo.excluir);

router.get('/consumos/resumo', consumo.resumo);

module.exports = router;
