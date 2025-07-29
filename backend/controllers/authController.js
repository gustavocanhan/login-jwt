const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  db.query("SELECT * FROM usuarios WHERE = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro no servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const usuario = results[0];
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login bem-sucedido", token });
  });
};
