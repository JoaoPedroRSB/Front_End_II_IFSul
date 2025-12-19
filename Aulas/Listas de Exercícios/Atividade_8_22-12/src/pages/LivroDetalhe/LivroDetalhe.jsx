import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";

export default function LivroDetalhe() {
  const { livros } = useContext(LivrosContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Garante que livros existe e já carregou
  if (!Array.isArray(livros) || livros.length === 0) {
    return (
      <p className="text-center text-white mt-10">
        Carregando livro...
      </p>
    );
  }

  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) {
    return (
      <p className="text-center text-white mt-10">
        Livro não encontrado!
      </p>
    );
  }

  // Verifica login
  const verificarLogin = (acao, callback) => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
      alert(`Você precisa estar logado para ${acao}.`);
      navigate("/login");
      return;
    }

    callback?.();
  };

  // Adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    verificarLogin("adicionar ao carrinho", () => {
      const carrinhoAtual =
        JSON.parse(localStorage.getItem("carrinho")) || [];

      const jaExiste = carrinhoAtual.find(
        (item) => item.id === livro.id
      );

      if (jaExiste) {
        alert("Este livro já está no seu carrinho!");
        return;
      }

      carrinhoAtual.push({
        ...livro,
        quantidadeSelecionada: 1,
      });

      localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinhoAtual)
      );

      alert("Livro adicionado ao carrinho com sucesso!");
    });
  };

  // Adicionar à lista de desejos (IGUAL AO CARRINHO)
  const adicionarListaDesejos = () => {
    verificarLogin("adicionar à lista de desejos", () => {
      const listaAtual =
        JSON.parse(localStorage.getItem("listaDesejos")) || [];

      const jaExiste = listaAtual.some(
        (item) => item.id === livro.id
      );

      if (jaExiste) {
        alert("Este livro já está na sua lista de desejos.");
        return;
      }

      const livroDesejo = {
        id: livro.id,
        titulo: livro.titulo,
        imagem: livro.imagem,
        preco: livro.preco,
      };

      const novaLista = [...listaAtual, livroDesejo];

      localStorage.setItem(
        "listaDesejos",
        JSON.stringify(novaLista)
      );

      alert("Livro adicionado à lista de desejos!");
    });
  };

  // Conversões seguras
  const precoFormatado = Number(livro.preco || 0).toFixed(2);

  const dataLancamento = livro.lancamento
    ? new Date(livro.lancamento).toLocaleDateString("pt-BR")
    : "Não informado";

  return (
    <div className="max-w-[1100px] mx-auto mt-12 p-6 bg-[#1f2937] rounded-xl shadow-xl flex gap-10 flex-wrap text-slate-100">

      {/* Imagem */}
      <img
        src={`http://localhost:8000${livro.imagem}`}
        alt={livro.titulo}
        className="w-[235px] rounded-lg shadow-md object-contain"
      />

      {/* Informações */}
      <div className="flex-1 min-w-[300px] flex flex-col gap-3">

        <h1 className="text-3xl font-semibold text-blue-400">
          {livro.titulo}
        </h1>

        <p><strong>Autor:</strong> {livro.autor}</p>
        <p><strong>Editora:</strong> {livro.editora || "Não informado"}</p>
        <p><strong>Gênero:</strong> {livro.genero}</p>
        <p><strong>Formato:</strong> {livro.formato}</p>
        <p><strong>Páginas:</strong> {livro.numeroDePaginas || "-"}</p>
        <p><strong>Lançamento:</strong> {dataLancamento}</p>

        <p className="text-lg font-bold mt-2">
          R$ {precoFormatado}
        </p>

        <p className="text-green-400 font-bold">
          Estoque: {livro.quantidade}
        </p>

        <p className="mt-3 text-slate-300 text-justify">
          <strong>Descrição:</strong> {livro.sinopse}
        </p>

        {/* Botões */}
        <div className="flex flex-wrap gap-4 mt-5">

          <button
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow transition"
            onClick={() =>
              verificarLogin("comprar o livro", () =>
                navigate("/finalizar-compra", { state: { livro } })
              )
            }
          >
            Comprar Agora
          </button>

          <button
            className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold shadow transition"
            onClick={adicionarAoCarrinho}
          >
            Adicionar ao Carrinho
          </button>

          <button
            className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold shadow transition"
            onClick={adicionarListaDesejos}
          >
            Adicionar à Lista de Desejos
          </button>
        </div>
      </div>
    </div>
  );
}
