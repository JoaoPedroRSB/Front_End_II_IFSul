import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

import carrinhoIcone from "/src/assets/imagens/iconecarrinho.gif";
import estanteIcone from "/src/assets/imagens/iconeestante.png";
import painelIcone from "/src/assets/imagens/iconedepainel.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const estaNaEstante = location.pathname === "/estante";
  const estaNoPainel = location.pathname === "/painel";

  // Carregar usuário logado no início
  useEffect(() => {
    const dados = localStorage.getItem("usuarioLogado");
    setUsuarioLogado(dados ? JSON.parse(dados) : null);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const verificarLogin = (destino) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado.");
      navigate("/login");
    } else {
      navigate(destino);
    }
    setMenuOpen(false);
  };

  const sair = () => {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("token");
      setUsuarioLogado(null);
      navigate("/");
    }
  };

  const excluirConta = async () => {
    if (!usuarioLogado) return;

    if (window.confirm("Excluir conta permanentemente?")) {
      try {
        await api.delete(`/usuarios/${usuarioLogado.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        alert("Conta removida com sucesso!");

        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("token");

        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir sua conta.");
      }
    }
  };

  return (
    <header className="bg-[#7f0000] flex justify-between items-center px-10 py-5 shadow-2xl border-b border-blue-500 relative z-50">

      {/* TÍTULO */}
      <a
        href="/"
        className="text-gray-100 text-2xl font-semibold hover:text-white transition"
      >
        <em><u>BookVerse</u></em>
      </a>

      {/* MENU HAMBÚRGUER */}
      <button
        className="text-gray-100 text-3xl hover:text-white transition"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      {/* MENU DROPDOWN */}
      {menuOpen && (
        <div className="absolute top-[80px] right-10 bg-gray-900 rounded-xl p-5 shadow-xl min-w-[200px] flex flex-col gap-3 z-50">

          {/* --- NÃO LOGADO --- */}
          {!usuarioLogado && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-blue-400 hover:text-blue-600 transition"
              >
                Fazer Login
              </button>
              <button
                onClick={() => navigate("/cadastro")}
                className="text-blue-400 hover:text-blue-600 transition"
              >
                Criar Conta
              </button>
            </>
          )}

          {/* --- USUÁRIO COMUM --- */}
          {usuarioLogado?.tipo === "usuariocomum" && (
            <>
              <button
                onClick={() => verificarLogin("/carrinho")}
                className="flex items-center gap-2 text-gray-100 hover:text-blue-400"
              >
                <img src={carrinhoIcone} width="25" /> Carrinho
              </button>

              <button
                onClick={() => verificarLogin("/estante")}
                className="flex items-center gap-2 text-gray-100 hover:text-blue-400"
              >
                <img src={estanteIcone} width="25" /> Estante
              </button>
            </>
          )}

          {/* --- DONO DA LIVRARIA --- */}
          {usuarioLogado?.tipo === "donodalivraria" && (
            <>
              <button
                onClick={() => navigate("/painel")}
                className="flex items-center gap-2 text-gray-100 hover:text-blue-400"
              >
                <img src={painelIcone} width="25" /> Painel
              </button>
            </>
          )}

          {/* --- BOTÕES EXCLUSIVOS DA ESTANTE E DO PAINEL --- */}
          {usuarioLogado && (estaNaEstante || estaNoPainel) && (
            <>
              <button
                onClick={excluirConta}
                className="text-red-400 hover:text-red-600"
              >
                ❌ Excluir Conta
              </button>

              <button
                onClick={sair}
                className="text-gray-100 hover:text-blue-400"
              >
                🚪 Sair
              </button>
            </>
          )}

        </div>
      )}
    </header>
  );
}
