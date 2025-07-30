const express = require("express");
const router = express.Router();

// Importa o controller que contém a lógica de login
const authController = require("../controllers/authController");

// Define a rota POST e conecta com o controller
router.post("/login", authController.login);

module.exports = router;
