import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";
import "./Estante.css";

export default function Estante() {
  const navigate = useNavigate();
  const {
    usuario,
    setUsuario,
    listaDesejos = [],
    livrosDigitais = [],
    historico = [],
    atualizarUsuario,
    removerDesejo,
  } = useContext(LivrosContext);

  const [menuAberto, setMenuAberto] = useState(false);

  const atualizarDados = (e) => {
    e.preventDefault();
    if (usuario) {
      atualizarUsuario(usuario);
      alert("Dados atualizados com sucesso!");
    }
  };

  const excluirConta = () => {
    if (
      window.confirm("Tem certeza que deseja excluir sua conta? Esse processo é irreversível.")
    ) {
      localStorage.clear();
      alert("Conta excluída com sucesso!");
      navigate("/login");
    }
  };

  const sair = () => {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.removeItem("usuarioLogado");
      navigate("/login");
    }
  };

  const lerLivro = (titulo) => {
    alert(`Abrindo o livro digital: ${titulo}`);
  };
  
  return (
    <div className="estante-container">
      {/* Cabeçalho */}
      <header className="estante-header">
        <div className="menu-hamburguer" onClick={() => setMenuAberto(!menuAberto)}>
          <div className="linha"></div>
          <div className="linha"></div>
          <div className="linha"></div>
        </div>

        {menuAberto && (
          <nav className="menu-dropdown">
            <button onClick={() => navigate("/carrinho")}>🛒 Carrinho</button>
            <button onClick={excluirConta}>🗑️ Excluir Conta</button>
            <button onClick={sair}>🚪 Sair</button>
          </nav>
        )}
      </header>

      {/* Conteúdo principal */}
      <main className="estante-main">
        {/* Meus Dados */}
        <section className="estante-section">
          <h2>Meus Dados</h2>
          <form onSubmit={atualizarDados} className="dados-form">
            <img
              src={usuario?.foto || "/src/assets/imagens/fotoperfil1.png"}
              alt="Foto de perfil"
              className="foto-perfil"
            />

            <label htmlFor="foto_perfil">Alterar foto de perfil:</label>
            <input type="file" id="foto_perfil" name="foto_perfil" accept="image/*" />

            <label>Nome:</label>
            <input
              type="text"
              value={usuario?.nome || ""}
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
            />

            <label>Email:</label>
            <input
              type="email"
              value={usuario?.email || ""}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            />

            <label>CPF:</label>
            <input
              type="text"
              value={usuario?.cpf || ""}
              onChange={(e) => setUsuario({ ...usuario, cpf: e.target.value })}
            />

            <label>RG:</label>
            <input
              type="text"
              value={usuario?.rg || ""}
              onChange={(e) => setUsuario({ ...usuario, rg: e.target.value })}
            />

            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={usuario?.dataNascimento || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, dataNascimento: e.target.value })
              }
            />

            <label>Cidade:</label>
            <input
              type="text"
              value={usuario?.cidade || ""}
              onChange={(e) => setUsuario({ ...usuario, cidade: e.target.value })}
            />

            <label>Estado:</label>
            <input
              type="text"
              value={usuario?.estado || ""}
              onChange={(e) => setUsuario({ ...usuario, estado: e.target.value })}
            />

            <button type="submit" className="btn-salvar">
              💾 Salvar Alterações
            </button>
          </form>
        </section>

        {/* Meus Livros Digitais */}
        <section className="estante-section">
          <h2>Meus Livros Digitais</h2>
          <div className="grid-livros">
            {livrosDigitais.length === 0 ? (
              <p className="texto-vazio">Você ainda não possui livros digitais.</p>
            ) : (
              livrosDigitais.map((livro, i) => (
                <div key={i} className="livro-card">
                  <img src={livro.imagem} alt={livro.titulo} />
                  <h3>{livro.titulo}</h3>
                  <button className="btn-ler" onClick={() => lerLivro(livro.titulo)}>
                    📖 Ler Agora
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Lista de Desejos */}
        <section className="estante-section">
          <h2>Lista de Desejos</h2>
          <div className="grid-livros">
            {listaDesejos.length === 0 ? (
              <p className="texto-vazio">Sua lista de desejos está vazia.</p>
            ) : (
              listaDesejos.map((livro, i) => (
                <div key={i} className="livro-card">
                  <img src={livro.imagem} alt={livro.titulo} />
                  <h3>{livro.titulo}</h3>
                  <p>R$ {livro.preco?.toFixed(2)}</p>
                  <button
                    className="btn-remover"
                    onClick={() => removerDesejo(livro.titulo)}
                  >
                    ❌ Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Histórico de Compras */}
        <section className="estante-section">
          <h2>Histórico de Compras</h2>
          <div className="grid-livros">
            {historico.length === 0 ? (
              <p className="texto-vazio">Você ainda não realizou nenhuma compra.</p>
            ) : (
              historico.map((item, i) => (
                <div key={i} className="livro-card">
                  <img src={item.imagem} alt={item.titulo} />
                  <h3>{item.titulo}</h3>
                  <p>
                    <strong>Quantidade:</strong> {item.quantidade}
                  </p>
                  <p>
                    <strong>Formato:</strong> {item.formato}
                  </p>
                  <p>
                    <strong>Total:</strong> R$ {item.total?.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
