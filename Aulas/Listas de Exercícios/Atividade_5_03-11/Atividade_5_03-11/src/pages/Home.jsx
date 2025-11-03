import { useState, useContext } from "react";
import Card from "../components/card/Card";
import { LivrosContext } from "../context/LivrosContext";
import "../App.css";

export default function Home() {
  const { livros } = useContext(LivrosContext);

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [colecao, setColecao] = useState("");
  const [editora, setEditora] = useState("");
  const [formato, setFormato] = useState("");

  // --- FILTROS E ORDENAÇÃO ---
  const livrosFiltrados = livros
    .filter((livro) => {
      const matchTitulo = livro.titulo
        .toLowerCase()
        .includes(titulo.toLowerCase());
      const matchGenero = genero
        ? livro.genero?.toLowerCase() === genero.toLowerCase()
        : true;
      const matchColecao = colecao
        ? livro.colecao?.toLowerCase().includes(colecao.toLowerCase())
        : true;
      const matchEditora = editora
        ? livro.editora?.toLowerCase().includes(editora.toLowerCase())
        : true;
      const matchFormato = formato
        ? livro.formato?.toLowerCase() === formato.toLowerCase()
        : true;

      return (
        matchTitulo &&
        matchGenero &&
        matchColecao &&
        matchEditora &&
        matchFormato
      );
    })
    .sort((a, b) => {
      if (ordenacao === "ordem-alfabetica")
        return a.titulo.localeCompare(b.titulo);
      if (ordenacao === "ordem-alfabetica-decrescente")
        return b.titulo.localeCompare(a.titulo);
      if (ordenacao === "mais-vendidos") return b.vendas - a.vendas;
      if (ordenacao === "menos-vendidos") return a.vendas - b.vendas;
      if (ordenacao === "melhor-avaliados") return b.avaliacao - a.avaliacao;
      if (ordenacao === "lancamentos")
        return new Date(b.lancamento) - new Date(a.lancamento);
      return 0;
    });

  // --- JSX ---
  return (
    <div className="app-container">
      {/* --- BANNER --- */}
      <section id="banner">
        <div className="banner-conteudo">
          <br />
          <br />
          <hr />
          <br />
          <h1 id="descricao">Bem-vindo à nossa Livraria Digital</h1>
          <p>Compre e explore novos livros online!</p>
          <p>
            Aqui você encontra uma vasta coleção de livros para todos os gostos,
            desde clássicos atemporais até os mais recentes lançamentos.
            Explore, descubra novas histórias e adquira suas próximas leituras
            com facilidade.
          </p>
          <br />
          <hr />
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="catalogo">
        <br />
        <h2 id="titulo" style={{ textAlign: "center" }}>
          Nosso Catálogo de Livros
        </h2>
        <br />

        {/* --- FILTROS --- */}
        <div id="filtros">
          <div className="campo-filtro">
            <input
              type="text"
              placeholder="Buscar por título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="campo-filtro">
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Todos os Gêneros</option>
              <option value="fantasia">Fantasia</option>
              <option value="ficcao">Ficção</option>
              <option value="romance">Romance</option>
              <option value="terror">Terror</option>
              <option value="esporte">Esporte</option>
              <option value="academico">Acadêmico</option>
            </select>
          </div>

          <div className="campo-filtro">
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
            >
              <option value="">Sem ordenação</option>
              <option value="ordem-alfabetica">A-Z</option>
              <option value="ordem-alfabetica-decrescente">Z-A</option>
              <option value="mais-vendidos">Mais Vendidos</option>
              <option value="menos-vendidos">Menos Vendidos</option>
              <option value="lancamentos">Lançamentos</option>
              <option value="melhor-avaliados">Mais Bem Avaliados</option>
            </select>
          </div>

          <div className="campo-filtro">
            <input
              type="text"
              placeholder="Buscar por coleção"
              value={colecao}
              onChange={(e) => setColecao(e.target.value)}
            />
          </div>

          <div className="campo-filtro">
            <input
              type="text"
              placeholder="Buscar por editora"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
            />
          </div>

          <div className="campo-filtro">
            <select
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
            >
              <option value="">Todos os formatos</option>
              <option value="fisico">Físico</option>
              <option value="digital">Digital (PDF/ePub)</option>
            </select>
          </div>

          <button id="btn-filtrar">Pesquisar</button>
        </div>

        {/* --- LISTA DE LIVROS --- */}
        <div id="livros-container" className="cards-container">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <Card key={livro.id} livro={livro} />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Nenhum livro encontrado.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
