import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";

export default function LivroDetalhe() {
  const { livros } = useContext(LivrosContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) return <p className="text-center text-white mt-10">Livro não encontrado!</p>;

  const verificarLogin = (acao, callback) => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      alert(`Você precisa estar logado para ${acao}.`);
      navigate("/login");
      return false;
    }
    callback?.();
    return true;
  };

  const adicionarAoCarrinho = () => {
    verificarLogin("adicionar ao carrinho", () => {
      const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
      const jaExiste = carrinhoAtual.find((item) => item.id === livro.id);

      if (jaExiste) {
        alert("Este livro já está no seu carrinho!");
      } else {
        carrinhoAtual.push({ ...livro, quantidade: 1 });
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
        alert("Livro adicionado ao carrinho com sucesso!");
      }
    });
  };

  return (
    <div className="max-w-[1100px] mx-auto mt-12 p-6 bg-[#1f2937] rounded-xl shadow-xl flex gap-10 flex-wrap text-slate-100">

      {/* Imagem */}
      <img
        src={livro.imagem}
        alt={livro.titulo}
        className="w-[235px] rounded-lg shadow-md object-contain"
      />

      {/* Informações */}
      <div className="flex-1 min-w-[300px] flex flex-col gap-3">

        <h1 className="text-3xl font-semibold text-blue-400">{livro.titulo}</h1>

        <p><strong className="text-white">Autor:</strong> {livro.autor}</p>
        <p><strong className="text-white">Editora:</strong> {livro.editora}</p>
        <p><strong className="text-white">Gênero:</strong> {livro.genero}</p>
        <p><strong className="text-white">Formato:</strong> {livro.formato}</p>
        <p><strong className="text-white">Páginas:</strong> {livro.numeroDePaginas}</p>
        <p><strong className="text-white">Lançamento:</strong> {new Date(livro.lancamento).toLocaleDateString("pt-BR")}</p>

        <p className="text-lg font-bold mt-2">R$ {livro.preco.toFixed(2)}</p>
        <p className="text-green-400 font-bold">Estoque: {livro.quantidade}</p>

        <p className="mt-3 text-slate-300 text-justify">
          <strong className="text-white">Descrição:</strong> {livro.sinopse}
        </p>

        {/* Botões */}
        <div className="flex flex-wrap gap-4 mt-5">

          <button
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow transition"
            onClick={() =>
              verificarLogin("comprar o livro", () => alert("Compra simulada!"))
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
            onClick={() =>
              verificarLogin("adicionar à lista de desejos", () =>
                alert("Livro adicionado à lista de desejos!")
              )
            }
          >
            Adicionar à Lista de Desejos
          </button>

        </div>
      </div>
    </div>
  );
}
