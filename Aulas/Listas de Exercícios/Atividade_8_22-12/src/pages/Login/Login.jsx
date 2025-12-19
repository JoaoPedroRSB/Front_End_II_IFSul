import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

  if (!email || !senha || !tipo) {
    setErro("Preencha todos os campos!");
    return;
  }

  try {
    const response = await api.post("/login", {
      email,
      senha,
      tipo,
    });

    const { token, usuario } = response.data;

    // LIMPA antes de salvar
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");

    localStorage.setItem("token", token);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    console.log("Token salvo no localStorage:", token);

    alert(`Bem-vindo, ${usuario.nome}!`);
    navigate("/");

  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data);

    // LIMPA token inválido
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");

    if (error.response?.status === 403) {
      setErro("Tipo de usuário incompatível!");
    } else {
      setErro("Email ou senha inválidos!");
    }
  }
};

  return (
    <div className="min-h-[80vh] bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-10">Login</h1>

      {/* Exibe erro se houver */}
      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      <form
        className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Senha:</label>
          <input
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tipo de Usuário:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Selecione</option>
            <option value="usuariocomum">Usuário Comum</option>
            <option value="donodalivraria">Dono da Livraria</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-md 
                     transition mt-3"
        >
          Entrar
        </button>
      </form>

      <p className="mt-8 text-sm">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/cadastro")}
          className="text-blue-500 hover:underline font-semibold"
        >
          Cadastre-se aqui
        </button>
      </p>

      <p className="mt-8 text-sm">
      Esqueci minha senha{" "}
      <button
        type="button"
        onClick={() => navigate("/redefinir-senha")}
        className="text-blue-500 hover:underline text-sm mt-2"
      >
        Clique aqui
      </button>
      </p>
    </div>
  );
}
