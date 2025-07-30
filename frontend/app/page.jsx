"use client";

import { useState } from "react";
import { useRouter } from "next/router";
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

  return <form></form>;
}
