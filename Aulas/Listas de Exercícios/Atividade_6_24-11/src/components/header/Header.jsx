import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import carrinhoIcone from "/src/assets/imagens/iconecarrinho.gif";
import estanteIcone from "/src/assets/imagens/iconeestante.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    setUsuarioLogado(usuario ? JSON.parse(usuario) : null);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const verificarLogin = (acao, destino) => {
    if (!usuarioLogado) {
      alert(`Você precisa estar logado para ${acao}.`);
      navigate("/login");
    } else {
      navigate(destino);
    }
    setMenuOpen(false);
  };

  const excluirConta = () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta? Esse processo é irreversível.")) {
      localStorage.clear();
      alert("Conta excluída com sucesso!");
      navigate("/");
    }
  };

  const sair = () => {
    if (window.confirm("Deseja realmente sair da conta?")) {
      localStorage.removeItem("usuarioLogado");
      setUsuarioLogado(null);
      alert("Logout realizado com sucesso!");
      navigate("/");
    }
  };

  const isEstantePage = location.pathname === "/estante";

  return (
    <header
      className="
        bg-[#7f0000]
        flex justify-between items-center
        px-10 py-5
        shadow-2xl border-b border-blue-500
        relative z-50
      "
    >
      {/* LOGO */}
      <a
        href="/"
        className="text-gray-100 text-2xl font-semibold hover:text-white transition"
      >
        <em><u>BookVerse</u></em>
      </a>

      {/* BOTÃO HAMBÚRGUER */}
      <button
        className="
          text-gray-100 text-3xl
          hover:text-white transition
        "
        onClick={toggleMenu}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        &#9776;
      </button>

      {/* MENU DROPDOWN */}
      {menuOpen && (
        <div
          className="
            absolute top-[80px] right-10
            bg-gray-900
            rounded-xl p-5
            shadow-xl min-w-[200px]
            flex flex-col gap-3
            animate-fadeDown
            z-50
          "
        >
          {isEstantePage ? (
            <>
              <button
                onClick={() => verificarLogin("acessar o carrinho", "/carrinho")}
                className="
                  text-gray-100 text-left flex items-center gap-2
                  hover:text-blue-400 hover:translate-x-1 transition
                "
              >
                <img src={carrinhoIcone} alt="Carrinho" width="25" />Carrinho
              </button>

              <button
                onClick={excluirConta}
                className="
                  text-red-400 text-left flex items-center gap-2
                  hover:text-red-600 hover:translate-x-1 transition
                "
              >
                ❌ Excluir Conta
              </button>

              <button
                onClick={sair}
                className="
                  text-gray-100 text-left flex items-center gap-2
                  hover:text-blue-400 hover:translate-x-1 transition
                "
              >
                🚪 Sair
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => verificarLogin("acessar o carrinho", "/carrinho")}
                className="
                  text-gray-100 text-left flex items-center gap-2
                  hover:text-blue-400 hover:translate-x-1 transition
                "
              >
                <img src={carrinhoIcone} alt="Carrinho" width="25" />Carrinho
              </button>

              <button
                onClick={() => verificarLogin("acessar a estante", "/estante")}
                className="
                  text-gray-100 text-left flex items-center gap-2
                  hover:text-blue-400 hover:translate-x-1 transition
                "
              >
                <img src={estanteIcone} alt="Estante" width="25" />Estante
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
