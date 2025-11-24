import { useNavigate } from "react-router-dom";

export default function Card({ livro }) {
  const navigate = useNavigate();
  const { id, titulo, autor, preco, imagem } = livro;

  const adicionarAoCarrinho = () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      navigate("/login");
      return;
    }

    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const jaExiste = carrinhoAtual.find((item) => item.id === id);

    if (jaExiste) {
      alert("Este livro já está no carrinho!");
    } else {
      carrinhoAtual.push({ ...livro, quantidadeSelecionada: 1 });
      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
      alert("Livro adicionado ao carrinho!");
    }
  };

  return (
    <div
      className="
        bg-gray-800 text-gray-100 p-3 rounded-xl shadow-lg
        flex flex-col items-center w-[180px]
        hover:scale-105 transition-transform duration-200
        mx-auto
      "
    >
      <img
        src={imagem}
        alt={titulo}
        className="w-full h-[250px] object-cover rounded-md mb-3"
      />

      <h2 className="text-white font-bold text-sm mb-1 text-center">{titulo}</h2>
      <p className="text-gray-300 text-sm mb-1 text-center">Autor: {autor}</p>
      <p className="text-blue-400 text-sm font-bold mb-3">
        R$ {preco.toFixed(2)}
      </p>

      <div className="flex flex-col gap-2 w-full">
        {/* Botão Ver Detalhes */}
        <button
          className="
            bg-blue-600 hover:bg-blue-700
            text-white py-2 rounded-md text-sm font-semibold
            transition
          "
          onClick={() => navigate(`/livro/${id}`)}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
