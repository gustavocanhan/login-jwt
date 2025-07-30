// Importa o bcrypt para criptografar a senha
const bcrypt = require("bcryptjs");

// Importa a conexão com o banco
const db = require("./config/db");

// Define os dados do usuário que será criado
const email = "admin@gmail.com";
const senha = "1234";

// Gera o hash da senha (com 10 rounds de sal)
const senhaCriptografada = bcrypt.hashSync(senha, 10);

// Executa o INSERT no banco de dados
db.query(
  "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
  [email, senhaCriptografada],
  (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário: ", err.message);
      return;
    }
    console.log("Usuário criado com sucesso! ID: ", result.insertId);
    process.exit();
  }
);
