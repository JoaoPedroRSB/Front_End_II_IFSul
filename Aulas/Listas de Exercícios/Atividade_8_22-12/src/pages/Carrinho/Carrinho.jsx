import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";

export default function Carrinho() {
  const { livros } = useContext(LivrosContext);
  const [carrinho, setCarrinho] = useState([]);
  const navigate = useNavigate();

  // Carrega e normaliza o carrinho
  useEffect(() => {
    const carrinhoSalvo =
      JSON.parse(localStorage.getItem("carrinho")) || [];

    const normalizado = carrinhoSalvo.map((item) => {
      const livroAtualizado = livros.find((l) => l.id === item.id);

      return {
        id: item.id,
        titulo: livroAtualizado?.titulo || item.titulo || "Livro sem título",
        autor: livroAtualizado?.autor || item.autor || "",
        preco: Number(livroAtualizado?.preco ?? item.preco ?? 0),
        imagem:
          livroAtualizado?.imagem ||
          item.imagem ||
          "/Livros/sem-imagem.jpg",
        quantidade: Number(livroAtualizado?.quantidade ?? item.quantidade ?? 0),
        quantidadeSelecionada: Number(item.quantidadeSelecionada) || 1,
        formato: livroAtualizado?.formato || item.formato || "digital",
      };
    });

    setCarrinho(normalizado);
  }, [livros]);

  // Atualizar quantidade
  const atualizarQuantidade = (index, novaQtd) => {
    let valor = parseInt(novaQtd, 10);
    if (isNaN(valor) || valor < 1) return;

    const novoCarrinho = [...carrinho];
    const maxEstoque = novoCarrinho[index].quantidade;

    if (valor > maxEstoque) {
      alert("Quantidade indisponível para compra.");
      valor = maxEstoque;
    }

    novoCarrinho[index].quantidadeSelecionada = valor;
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  // Remover item do carrinho
  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((livro) => livro.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  // Adicionar à lista de desejos
  const adicionarListaDesejos = (livro) => {
    const listaAtual =
      JSON.parse(localStorage.getItem("listaDesejos")) || [];

    const jaExiste = listaAtual.some((item) => item.id === livro.id);

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
    localStorage.setItem("listaDesejos", JSON.stringify(novaLista));

    alert("Livro adicionado à lista de desejos!");
  };

  // Total
  const totalGeral = carrinho.reduce(
    (total, livro) =>
      total + livro.preco * livro.quantidadeSelecionada,
    0
  );

  // Finalizar compra
  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    navigate("/finalizar-compra", {
      state: {
        livros: carrinho,
        total: totalGeral,
      },
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-4 py-10 bg-gray-900 text-white">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Meu Carrinho
        </h1>

        {carrinho.length === 0 ? (
          <p className="text-center text-gray-300">
            Seu carrinho está vazio.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {carrinho.map((livro, index) => (
              <div
                key={livro.id}
                className="flex bg-gray-700 rounded-lg p-4 shadow-md"
              >
                <img
                  src={`http://localhost:8000${livro.imagem}`}
                  alt={livro.titulo}
                  className="w-32 h-48 object-cover rounded-md mr-6"
                  onError={(e) => {
                    e.target.src = "/Livros/sem-imagem.jpg";
                  }}
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">
                    {livro.titulo}
                  </h2>

                  <p className="text-gray-300 mb-2">
                    Preço: R$ {livro.preco.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <input
                      type="number"
                      min="1"
                      max={livro.quantidade}
                      value={livro.quantidadeSelecionada}
                      onChange={(e) =>
                        atualizarQuantidade(index, e.target.value)
                      }
                      className="w-20 p-2 bg-gray-800 text-white rounded-md"
                    />
                  </div>

                  <p className="text-green-400 font-bold mt-3">
                    Subtotal: R${" "}
                    {(livro.preco * livro.quantidadeSelecionada).toFixed(2)}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => removerItem(livro.id)}
                      className="bg-red-600 px-4 py-2 rounded-md"
                    >
                      Remover
                    </button>

                    <button
                      onClick={() => adicionarListaDesejos(livro)}
                      className="bg-gray-500 px-4 py-2 rounded-md"
                    >
                      Lista de Desejos
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right pt-4 text-xl text-green-400 font-bold">
              Total: R$ {totalGeral.toFixed(2)}
            </div>

            <button
              onClick={finalizarCompra}
              className="bg-blue-600 px-6 py-3 rounded-lg self-end"
            >
              Realizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
