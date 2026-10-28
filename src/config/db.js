// CONEXAO COM O BANCO (o "freezer"): onde os dados ficam guardados de verdade,
// mesmo com o servidor desligado.
// Os dados de acesso vem do arquivo .env, que NAO vai para o GitHub.

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  decimalNumbers: true,
});

async function testarConexao() {
  try {
    await db.query("SELECT 1");
    console.log("Conectado ao MySQL!");
  } catch (erro) {
    console.log("ERRO ao conectar no MySQL:", erro.message);
  }
}

module.exports = { db, testarConexao };
