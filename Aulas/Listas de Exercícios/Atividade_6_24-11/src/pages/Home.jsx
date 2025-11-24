import { useState, useContext } from "react";
import Card from "../components/card/Card";
import { LivrosContext } from "../context/LivrosContext";

export default function Home() {
  const { livros } = useContext(LivrosContext);

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [colecao, setColecao] = useState("");
  const [editora, setEditora] = useState("");
  const [formato, setFormato] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200 text-center">
      {/* === BANNER === */}
      <section className="py-16 px-6">
        <hr className="border-slate-600 w-3/5 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-3">
          Bem-vindo à nossa Livraria Digital
        </h1>
        <p className="text-lg mb-2">
          Compre e explore novos livros online!
        </p>
        <p className="max-w-3xl mx-auto text-slate-300">
          Aqui você encontra uma vasta coleção de livros para todos os gostos,
          desde clássicos atemporais até os mais recentes lançamentos.
          Explore, descubra novas histórias e adquira suas próximas leituras
          com facilidade.
        </p>
        <hr className="border-slate-600 w-3/5 mx-auto mt-6" />
      </section>

      {/* === CATÁLOGO === */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Nosso Catálogo de Livros</h2>

        {/* === FILTROS === */}
        <div className="flex flex-wrap gap-4 justify-center px-6">
          <input
            type="text"
            placeholder="Buscar por título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          />

          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          >
            <option value="">Todos os Gêneros</option>
            <option value="fantasia">Fantasia</option>
            <option value="ficcao">Ficção</option>
            <option value="romance">Romance</option>
            <option value="terror">Terror</option>
            <option value="esporte">Esporte</option>
            <option value="academico">Acadêmico</option>
          </select>

          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          >
            <option value="">Sem ordenação</option>
            <option value="ordem-alfabetica">A-Z</option>
            <option value="ordem-alfabetica-decrescente">Z-A</option>
            <option value="mais-vendidos">Mais Vendidos</option>
            <option value="menos-vendidos">Menos Vendidos</option>
            <option value="lancamentos">Lançamentos</option>
            <option value="melhor-avaliados">Mais Bem Avaliados</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por coleção"
            value={colecao}
            onChange={(e) => setColecao(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Buscar por editora"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          />

          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="bg-slate-800 border border-blue-500 text-white px-3 py-2 rounded-lg"
          >
            <option value="">Todos os formatos</option>
            <option value="fisico">Físico</option>
            <option value="digital">Digital (PDF/ePub)</option>
          </select>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition">
            Pesquisar
          </button>
        </div>

        {/* === LISTA DE LIVROS === */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 p-8 max-w-6xl mx-auto">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <Card key={livro.id} livro={livro} />
            ))
          ) : (
            <p className="text-center mt-6">Nenhum livro encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}
