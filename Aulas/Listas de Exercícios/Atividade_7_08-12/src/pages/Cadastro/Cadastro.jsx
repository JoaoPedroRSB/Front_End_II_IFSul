import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarsenha: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    cidade: "",
    estado: "",

    // dados do dono da livraria
    nome_dono: "",
    cpf_dono: "",
    nome_livraria: "",
    email_livraria: "",
    cnpj: "",
    celular_contato: "",
  });

  const [senhaValida, setSenhaValida] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarSenha = (senha) => {
    const tam = senha.length >= 8;
    const maiuscula = /[A-Z]/.test(senha);
    const especial = /[!@#$%^&*(),.?":{}|<>_\-]/.test(senha);
    return tam && maiuscula && especial;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "senha") setSenhaValida(validarSenha(value));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    const erros = [];

    if (!formData.email) erros.push("Email é obrigatório.");
    else if (!validarEmail(formData.email)) erros.push("Email inválido.");

    if (!formData.senha) erros.push("Senha é obrigatória.");
    if (!formData.confirmarsenha) erros.push("Confirmação é obrigatória.");
    if (formData.senha !== formData.confirmarsenha)
      erros.push("As senhas não coincidem.");

    if (!validarSenha(formData.senha))
      erros.push(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial."
      );

    if (tipoUsuario === "usuariocomum") {
      if (!formData.nome) erros.push("Nome é obrigatório.");
      if (!formData.cpf) erros.push("CPF é obrigatório.");
      if (!formData.rg) erros.push("RG é obrigatório.");
      if (!formData.data_nascimento)
        erros.push("Data de nascimento obrigatória.");
      if (!formData.cidade) erros.push("Cidade é obrigatória.");
      if (!formData.estado) erros.push("Estado é obrigatório.");
    } else if (tipoUsuario === "donodalivraria") {
      if (!formData.nome_dono) erros.push("Nome do responsável é obrigatório.");
      if (!formData.cpf_dono) erros.push("CPF do responsável é obrigatório.");
      if (!formData.nome_livraria) erros.push("Nome da livraria é obrigatório.");
      if (!formData.email_livraria)
        erros.push("Email da livraria é obrigatório.");
      else if (!validarEmail(formData.email_livraria))
        erros.push("Email da livraria inválido.");
      if (!formData.cnpj) erros.push("CNPJ é obrigatório.");
      if (!formData.celular_contato)
        erros.push("Celular de contato é obrigatório.");
    }

    if (erros.length > 0) {
      alert("Corrija os seguintes erros:\n- " + erros.join("\n- "));
      return;
    }

    try {
      let payload = { tipo: tipoUsuario, email: formData.email, senha: formData.senha };

        if (tipoUsuario === "usuariocomum") {
        payload = {
          ...payload,
          nome: formData.nome,
          cpf: formData.cpf,
          rg: formData.rg,
          data_nascimento: formData.data_nascimento,
          cidade: formData.cidade,
          estado: formData.estado,
        };
      }

      if (tipoUsuario === "donodalivraria") {
        payload = {
          ...payload,
          nome_dono: formData.nome_dono,
          cpf_dono: formData.cpf_dono,
          nome_livraria: formData.nome_livraria,
          email_livraria: formData.email_livraria,
          cnpj: formData.cnpj,
          celular_contato: formData.celular_contato,
        };
      }

      const resposta = await api.post("/usuarios", payload);

      console.log("Resposta do servidor:", resposta.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro.response?.data);
        alert(JSON.stringify(erro.response?.data, null, 2));
    }
  };

  const baseInput =
    "bg-gray-900 text-white border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50";

  const baseLabel = "font-semibold text-gray-300";

  const renderCamposTipo = () => {
    if (tipoUsuario === "usuariocomum") {
      return (
        <>
          <label className={baseLabel}>Nome:</label>
          <input name="nome" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>CPF:</label>
          <input name="cpf" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>RG:</label>
          <input name="rg" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Data Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>Cidade:</label>
          <input name="cidade" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Estado:</label>
          <input
            name="estado"
            maxLength="2"
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
          <input name="nome_dono" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>CPF do Responsável:</label>
          <input name="cpf_dono" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Nome da Livraria:</label>
          <input
            name="nome_livraria"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>Email da Livraria:</label>
          <input
            type="email"
            name="email_livraria"
            onChange={handleChange}
            className={baseInput}
          />

          <label className={baseLabel}>CNPJ:</label>
          <input name="cnpj" onChange={handleChange} className={baseInput} />

          <label className={baseLabel}>Celular Contato:</label>
          <input
            name="celular_contato"
            onChange={handleChange}
            className={baseInput}
          />
        </>
      );
    }
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
            className={baseInput}
            required
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
                required
              />

              <label className={baseLabel}>Senha:</label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  onChange={handleChange}
                  className={baseInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {mostrarSenha ? "🙈" : "👁️"}
                </button>
              </div>

              {!senhaValida && formData.senha && (
                <p className="text-red-500 text-sm">
                  A senha deve ter 8+ caracteres, 1 maiúscula e 1 caractere
                  especial.
                </p>
              )}

              <label className={baseLabel}>Confirmar Senha:</label>
              <div className="relative">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarsenha"
                  onChange={handleChange}
                  className={baseInput}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {mostrarConfirmarSenha ? "🙈" : "👁️"}
                </button>
              </div>

              {renderCamposTipo()}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4 transition"
                disabled={!senhaValida}
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
