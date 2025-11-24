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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCadastro = (e) => {
    e.preventDefault();
    const erros = [];

    if (!formData.email) erros.push("Email é obrigatório.");
    else if (!validarEmail(formData.email)) erros.push("Email inválido.");

    if (!formData.senha) erros.push("Senha é obrigatória.");
    if (!formData.confirmarsenha) erros.push("Confirmação de senha é obrigatória.");
    if (formData.senha !== formData.confirmarsenha)
      erros.push("As senhas não coincidem.");

    if (tipoUsuario === "usuariocomum") {
      if (!formData.nome) erros.push("Nome é obrigatório.");
      if (!formData.cpf) erros.push("CPF é obrigatório.");
      if (!formData.rg) erros.push("RG é obrigatório.");
      if (!formData.dataNascimento) erros.push("Data de nascimento é obrigatória.");
      if (!formData.cidade) erros.push("Cidade é obrigatória.");
      if (!formData.estado) erros.push("Estado é obrigatório.");
    } else if (tipoUsuario === "donodalivraria") {
      if (!formData.nomeDono) erros.push("Nome do responsável é obrigatório.");
      if (!formData.cpfDono) erros.push("CPF do responsável é obrigatório.");
      if (!formData.nomeLivraria) erros.push("Nome da livraria é obrigatório.");
      if (!formData.emailLivraria) erros.push("Email da livraria é obrigatório.");
      else if (!validarEmail(formData.emailLivraria))
        erros.push("Email da livraria inválido.");
      if (!formData.cnpj) erros.push("CNPJ é obrigatório.");
      if (!formData.celular) erros.push("Celular de contato é obrigatório.");
    }

    if (erros.length > 0) {
      alert("Por favor, corrija os seguintes erros:\n- " + erros.join("\n- "));
      return;
    }

    const existe = usuarios.find((u) => u.email === formData.email);
    if (existe) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    const novoUsuario = {
      id: usuarios.length + 1,
      tipo: tipoUsuario,
      ...formData,
    };

    console.log("Usuário cadastrado:", novoUsuario);
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  const baseInput =
    "bg-gray-900 text-white border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50";

  const baseLabel = "font-semibold text-gray-300";

  const renderCamposTipo = () => {
    if (tipoUsuario === "usuariocomum") {
      return (
        <>
          <label className={baseLabel}>Nome:</label>
          <input type="text" name="nome" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>CPF:</label>
          <input type="text" name="cpf" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>RG:</label>
          <input type="text" name="rg" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>Cidade:</label>
          <input type="text" name="cidade" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Estado:</label>
          <input
            type="text"
            maxLength="2"
            name="estado"
            onChange={handleChange}
            className={baseInput}
          />
        </>
      );
    }

    if (tipoUsuario === "donodalivraria") {
      return (
        <>
          <label className={baseLabel}>Nome do Responsável:</label>
          <input
            type="text"
            name="nomeDono"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>CPF do Responsável:</label>
          <input
            type="text"
            name="cpfDono"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>Nome da Livraria:</label>
          <input
            type="text"
            name="nomeLivraria"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>Email da Livraria:</label>
          <input
            type="email"
            name="emailLivraria"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>CNPJ:</label>
          <input type="text" name="cnpj" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Celular de Contato:</label>
          <input type="text" name="celular" onChange={handleChange} className={baseInput} />
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-2xl p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">
          Crie sua Conta
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleCadastro}>
          <label className={baseLabel}>Tipo de Usuário:</label>

          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
            className={baseInput}
          >
            <option value="">Selecione</option>
            <option value="usuariocomum">Usuário Comum</option>
            <option value="donodalivraria">Dono da Livraria</option>
          </select>

          {tipoUsuario && (
            <>
              <label className={baseLabel}>Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className={baseInput}
                placeholder="exemplo@email.com"
                required
              />

              <label className={baseLabel}>Senha:</label>
              <input type="password" name="senha" onChange={handleChange} className={baseInput} />

              <label className={baseLabel}>Confirmar Senha:</label>
              <input
                type="password"
                name="confirmarsenha"
                onChange={handleChange}
                className={baseInput}
              />

              {renderCamposTipo()}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4 transition"
              >
                Cadastrar
              </button>
            </>
          )}
        </form>

        <p className="mt-6 text-center">
          Já possui conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}
