import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const senha = e.target[1].value;

    if (email && senha) {
      // ✅ se sucesso no login:
      navigate("/"); // leva para Home (rota index do MainLayout)
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" placeholder="Digite seu email" required />

        <label>Senha:</label>
        <input type="password" placeholder="Digite sua senha" required />

        <button type="submit">Entrar</button>
      </form>

      <p>
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/cadastro")}
          className="link-button"
        >
          Cadastre-se aqui
        </button>
      </p>
    </div>
  );
}
