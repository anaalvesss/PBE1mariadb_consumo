const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestao_residuos"
});
db.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar com o banco", erro);
        return;
    }
    console.log("Banco de Dados conectado");    
});
module.exports = db;