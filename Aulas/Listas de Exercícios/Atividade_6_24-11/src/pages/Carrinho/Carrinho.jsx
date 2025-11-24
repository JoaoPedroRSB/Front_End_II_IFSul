import { useEffect, useState, useContext } from "react";
import { LivrosContext } from "../../context/LivrosContext";

export default function Carrinho() {
  const { livros } = useContext(LivrosContext);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];

    const normalizado = carrinhoSalvo.map((item) => {
      const livroAtualizado = livros.find((l) => l.id === item.id);
      return {
        ...item,
        preco: livroAtualizado?.preco || item.preco,
        imagem: livroAtualizado?.imagem || item.imagem,
        titulo: livroAtualizado?.titulo || item.titulo,
        quantidade: livroAtualizado?.quantidade || item.quantidade || 0,
        quantidadeSelecionada: Number(item.quantidadeSelecionada) || 1,
      };
    });

    setCarrinho(normalizado);
  }, [livros]);

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

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((livro) => livro.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const totalGeral = carrinho.reduce(
    (total, livro) => total + livro.preco * livro.quantidadeSelecionada,
    0
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-4 py-10 bg-gray-900 text-white">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <p className="text-center text-gray-300">Seu carrinho está vazio.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {carrinho.map((livro, index) => (
              <div
                key={livro.id}
                className="flex bg-gray-700 rounded-lg p-4 shadow-md"
              >
                <img
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="w-24 h-auto rounded-md mr-6"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{livro.titulo}</h2>
                  <p className="text-gray-300 mb-2">
                    Preço: R$ {livro.preco.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <label className="text-sm text-gray-300">Quantidade:</label>

                    <input
                      type="number"
                      min="1"
                      max={livro.quantidade}
                      value={livro.quantidadeSelecionada}
                      onChange={(e) =>
                        atualizarQuantidade(index, e.target.value)
                      }
                      className="w-20 p-2 bg-gray-800 text-white rounded-md outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <span className="text-xs text-gray-400">
                      Disponível: {livro.quantidade}
                    </span>
                  </div>

                  <p className="text-green-400 font-bold mt-3">
                    Subtotal: R${" "}
                    {(livro.preco * livro.quantidadeSelecionada).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removerItem(livro.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4 transition"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right border-t border-gray-600 pt-4 text-xl text-green-400 font-bold">
              Total: R$ {totalGeral.toFixed(2)}
            </div>

            <button
              id="btn-finalizar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg transition self-end"
            >
              Realizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
