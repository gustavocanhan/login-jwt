const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
