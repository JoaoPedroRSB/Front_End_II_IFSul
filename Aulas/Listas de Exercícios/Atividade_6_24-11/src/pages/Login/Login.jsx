import { useNavigate } from "react-router-dom";
import usuarios from "../../data/usuariosMock";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value.trim();
    const senha = e.target[1].value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
      const usuario = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      alert(`Bem-vindo, ${usuario.nome}!`);
      navigate("/");
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-10">Login</h1>

      <form
        className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            required
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            required
            className="p-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
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
    </div>
  );
}
