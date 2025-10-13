import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Alternar menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo */}
        <a href="/" className="logo">
          <em><u>BookVerse</u></em>
        </a>

        {/* Botão Hamburger */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Fechar Menu" : "Abrir Menu"}
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Menu principal */}
        <ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
          {/* Perfil - por enquanto não faz nada */}
          <li className="menu-item">
            <span className="auth-icon" role="button" tabIndex={0}>
              👤 - Perfil
            </span>
          </li>

          {/* Carrinho - navega para a rota */}
          <li className="menu-item carrinho-container">
            <div
              className="icon-wrapper"
              onClick={() => navigate("/carrinho")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/carrinho")}
            >
              <img
                src="./src/assets/imagens/iconecarrinho.gif"
                alt="Carrinho"
                width="30"
              />
              <span> - Carrinho</span>
            </div>
          </li>

          {/* Estante - ainda não implementada */}
          <li className="menu-item estante-container">
            <div className="icon-wrapper" role="button" tabIndex={0}>
              <img
                src="./src/assets/imagens/iconeestante.png"
                alt="Estante"
                width="30"
              />
              <span> - Estante</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
