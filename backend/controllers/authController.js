// Importa a conexão com o banco
const db = require("../config/db");

// Importa o bcrypt para comparar senhas criptografadas
const bcrypt = require("bcryptjs");

// Importa o JWT para gerar tokens de autenticação
const jwt = require("jsonwebtoken");

// Exporta a função login para ser usada nas rotas
exports.login = (req, res) => {
  // cria varias para receber a requisição do body
  const { email, senha } = req.body;

  // Verifica se os dois campos foram preenchidos
  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  // Consulta o banco para buscar o usuário pelo e-mail
  db.query("SELECT * FROM usuarios WHERE = ?", [email], (err, results) => {
    // Verificar se retorno erro ao tentar consultar no banco
    if (err) {
      return res.status(500).json({ error: "Erro no servidor" });
    }

    // Verificar se encontrou usuário
    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // Cria variavel usuario e adiciona o resultado
    const usuario = results[0];

    // Compara a senha digitada com o hash salvo no banco
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

    // Se o resultado da comparação for false retorna status de senha incorreta
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Se o resultador da comparação for true
    // Gera o token JWT com o ID do usuário
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Retorna o token para o front-end
    res.json({ message: "Login bem-sucedido", token });
  });
};
