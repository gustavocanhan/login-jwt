// Importa o pacote mysql2 para conectar ao MySQL
const mysql = require("mysql2");

// Carrega as variáveis do arquivo .env
require("dotenv").config();

// Cria a conexão com o banco usando os dados do .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Tenta conectar e mostrar se deu certo ou não
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});

// Exporta a conexão para poder usar em outros arquivos
module.exports = db;
