import { useEffect, useState, useContext } from "react";
import { LivrosContext } from "../../context/LivrosContext";
import "./Carrinho.css";

export default function Carrinho() {
  const { livros } = useContext(LivrosContext); // acessa os livros do contexto
  const [carrinho, setCarrinho] = useState([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Mescla com os dados reais do contexto (garante estoque atualizado)
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

  // Atualiza a quantidade de um item
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

  // Remove item
  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((livro) => livro.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  // Calcula total
  const totalGeral = carrinho.reduce((total, livro) => {
    return total + livro.preco * livro.quantidadeSelecionada;
  }, 0);

  return (
    <div className="carrinho">
      <h1>Meu Carrinho</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="lista-carrinho">
          {carrinho.map((livro, index) => (
            <div key={livro.id} className="item-carrinho">
              <img src={livro.imagem} alt={livro.titulo} width="80" />
              <div className="info-livro">
                <h2>{livro.titulo}</h2>
                <p>Preço: R$ {livro.preco.toFixed(2)}</p>

                <div className="quantidade-controle">
                  <label htmlFor={`quant-${index}`}>Quantidade:</label>
                  <input
                    type="number"
                    id={`quant-${index}`}
                    min="1"
                    max={livro.quantidade}
                    value={livro.quantidadeSelecionada}
                    onChange={(e) => atualizarQuantidade(index, e.target.value)}
                  />
                  <small className="estoque-info">
                    Disponível: {livro.quantidade} unidade(s)
                  </small>
                </div>

                <p className="subtotal">
                  Subtotal:{" "}
                  <strong>
                    R$ {(livro.preco * livro.quantidadeSelecionada).toFixed(2)}
                  </strong>
                </p>

                <button onClick={() => removerItem(livro.id)}>Remover</button>
              </div>
            </div>
          ))}

          <div className="total-geral">
            Total: <strong>R$ {totalGeral.toFixed(2)}</strong>
          </div>
        </div>
      )}
      <button id="btn-finalizar">Realizar Compra</button>
    </div>
  );
}
