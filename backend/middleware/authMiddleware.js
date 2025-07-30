const jwt = require("jsonwebtoken");

// Middleware para proteger rotas que exigem autenticação
function verificarToken(req, res, next) {
  // Pega o token do cabeçalho Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startWith("Bearer")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Anexa os dados do usuário no request
    req.user = decoded;

    // Libera o acesso a rota protegida
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
