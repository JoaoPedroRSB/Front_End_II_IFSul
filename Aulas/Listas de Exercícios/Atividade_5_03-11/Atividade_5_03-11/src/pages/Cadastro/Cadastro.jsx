import "./Cadastro.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarios from "../../data/usuariosMock";

export default function Cadastro() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarsenha: "",
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    cidade: "",
    estado: "",
    nomeDono: "",
    cpfDono: "",
    nomeLivraria: "",
    emailLivraria: "",
    cnpj: "",
    celular: "",
  });

  // Atualiza os campos dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validação de e-mail
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validação e cadastro
  const handleCadastro = (e) => {
    e.preventDefault();
    const erros = [];

    // Validações básicas
    if (!formData.email) erros.push("Email é obrigatório.");
    else if (!validarEmail(formData.email)) erros.push("Email inválido.");

    if (!formData.senha) erros.push("Senha é obrigatória.");
    if (!formData.confirmarsenha)
      erros.push("Confirmação de senha é obrigatória.");
    if (formData.senha !== formData.confirmarsenha)
      erros.push("As senhas não coincidem.");

    // Validações específicas por tipo
    if (tipoUsuario === "usuariocomum") {
      if (!formData.nome) erros.push("Nome é obrigatório.");
      if (!formData.cpf) erros.push("CPF é obrigatório.");
      if (!formData.rg) erros.push("RG é obrigatório.");
      if (!formData.dataNascimento)
        erros.push("Data de nascimento é obrigatória.");
      if (!formData.cidade) erros.push("Cidade é obrigatória.");
      if (!formData.estado) erros.push("Estado é obrigatório.");
    } else if (tipoUsuario === "donodalivraria") {
      if (!formData.nomeDono)
        erros.push("Nome do responsável é obrigatório.");
      if (!formData.cpfDono) erros.push("CPF do responsável é obrigatório.");
      if (!formData.nomeLivraria)
        erros.push("Nome da livraria é obrigatório.");
      if (!formData.emailLivraria)
        erros.push("Email da livraria é obrigatório.");
      else if (!validarEmail(formData.emailLivraria))
        erros.push("Email da livraria inválido.");
      if (!formData.cnpj) erros.push("CNPJ é obrigatório.");
      if (!formData.celular) erros.push("Celular de contato é obrigatório.");
    }

    // Exibe erros, se houver
    if (erros.length > 0) {
      alert("Por favor, corrija os seguintes erros:\n- " + erros.join("\n- "));
      return;
    }

    // Verifica se e-mail já está cadastrado
    const existe = usuarios.find((u) => u.email === formData.email);
    if (existe) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    // Simula criação do usuário
    const novoUsuario = {
      id: usuarios.length + 1,
      tipo: tipoUsuario,
      ...formData,
    };

    console.log("Usuário cadastrado:", novoUsuario);
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  // Renderiza campos conforme o tipo de usuário
  const renderCamposTipo = () => {
    if (tipoUsuario === "usuariocomum") {
      return (
        <>
          <label>Nome:</label>
          <input type="text" name="nome" onChange={handleChange} />

          <label>CPF:</label>
          <input type="text" name="cpf" onChange={handleChange} />

          <label>RG:</label>
          <input type="text" name="rg" onChange={handleChange} />

          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" onChange={handleChange} />

          <label>Cidade:</label>
          <input type="text" name="cidade" onChange={handleChange} />

          <label>Estado:</label>
          <input type="text" name="estado" maxLength="2" onChange={handleChange} />
        </>
      );
    } else if (tipoUsuario === "donodalivraria") {
      return (
        <>
          <label>Nome do Responsável:</label>
          <input type="text" name="nomeDono" onChange={handleChange} />

          <label>CPF do Responsável:</label>
          <input type="text" name="cpfDono" onChange={handleChange} />

          <label>Nome da Livraria:</label>
          <input type="text" name="nomeLivraria" onChange={handleChange} />

          <label>Email da Livraria:</label>
          <input type="email" name="emailLivraria" onChange={handleChange} />

          <label>CNPJ:</label>
          <input type="text" name="cnpj" onChange={handleChange} />

          <label>Celular de Contato:</label>
          <input type="text" name="celular" onChange={handleChange} />
        </>
      );
    }
    return null;
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>Crie sua Conta</h1>

        <form className="cadastro-form" onSubmit={handleCadastro}>
          <label>Tipo de Usuário:</label>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="usuariocomum">Usuário Comum</option>
            <option value="donodalivraria">Dono da Livraria</option>
          </select>

          {tipoUsuario && (
            <>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="exemplo@email.com"
                required
              />

              <label>Senha:</label>
              <input
                type="password"
                name="senha"
                onChange={handleChange}
                required
              />

              <label>Confirmar Senha:</label>
              <input
                type="password"
                name="confirmarsenha"
                onChange={handleChange}
                required
              />

              {renderCamposTipo()}

              <button type="submit" className="btn-cadastrar">
                Cadastrar
              </button>
            </>
          )}
        </form>

        <p className="cadastro-login-text">
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
    </div>
  );
}
