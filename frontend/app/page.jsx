"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Cookies from "js-cookie";
import styles from "@/styles/login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, senha });

      // Salva o token no cookie
      Cookies.set("token", res.data.token, { expires: 1 });

      router.push("/welcome");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro no login");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <br />
      <br />
      <button type="submit">Entrar</button>
      {erro && <p className={styles.erro}>{erro}</p>}
    </form>
  );
}
