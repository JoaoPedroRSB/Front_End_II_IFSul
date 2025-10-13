import "./Cadastro.css";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form className="cadastro-form" onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input type="text" placeholder="Digite seu nome completo" required />

        <label>Email:</label>
        <input type="email" placeholder="Digite seu email" required />

        <label>Senha:</label>
        <input type="password" placeholder="Crie uma senha" required />

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        Já possui conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="link-button"
        >
          Faça login
        </button>
      </p>
    </div>
  );
}
