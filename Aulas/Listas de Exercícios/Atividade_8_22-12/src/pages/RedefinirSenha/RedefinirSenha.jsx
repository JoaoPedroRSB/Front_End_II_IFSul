import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function RedefinirSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email || !novaSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/redefinir-senha", {
        email,
        novaSenha,
      });

      setSucesso("Senha atualizada com sucesso!");
      setEmail("");
      setNovaSenha("");

      // Redireciona para login após alguns segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Erro ao redefinir senha:", error.response?.data);

      if (error.response?.status === 404) {
        setErro("E-mail não encontrado!");
      } else {
        setErro("Erro ao redefinir a senha. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-10">Redefinir Senha</h1>

      {/* Mensagens */}
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}

      <form
        className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">E-mail cadastrado:</label>
          <input
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
          <label className="font-semibold">Nova Senha:</label>
          <input
            type="password"
            placeholder="Digite a nova senha"
            required
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-md
                     transition mt-3"
        >
          Atualizar Senha
        </button>
      </form>

      <p className="mt-8 text-sm">
        Lembrou da senha?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline font-semibold"
        >
          Voltar ao Login
        </button>
      </p>
    </div>
  );
}
