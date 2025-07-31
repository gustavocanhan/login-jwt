import { verificaAutenticacao } from "@/lib/auth";
import styles from "./style.module.css";

export default function WelcomePage() {
  const autenticado = verificaAutenticacao();

  if (!autenticado) {
    // Redireciona se nao tiver token
    return (
      <p>
        Você não está logado. <a href="/">Voltar para o login</a>
      </p>
    );
  } else {
    return (
      <div className={styles.container}>
        <h1>Bem-vindo ao sistema!</h1>
        <p>Você está autenticado com JWT via cookie</p>
      </div>
    );
  }
}
