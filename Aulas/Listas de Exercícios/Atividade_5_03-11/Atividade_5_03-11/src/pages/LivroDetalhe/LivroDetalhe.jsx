import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";
import "./LivroDetalhe.css";

export default function LivroDetalhe() {
  const { livros } = useContext(LivrosContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) return <p>Livro não encontrado!</p>;

  // Verifica login
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

  // Adiciona ao carrinho
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
    <div className="livro-detalhe">
      <img src={livro.imagem} alt={livro.titulo} />

      <div className="livro-info">
        <h1>{livro.titulo}</h1>
        <p><strong>Autor:</strong> {livro.autor}</p>
        <p><strong>Editora:</strong> {livro.editora}</p>
        <p><strong>Gênero:</strong> {livro.genero}</p>
        <p><strong>Formato:</strong> {livro.formato}</p>
        <p><strong>Páginas:</strong> {livro.numeroDePaginas}</p>
        <p><strong>Lançamento:</strong> {new Date(livro.lancamento).toLocaleDateString("pt-BR")}</p>
        <p className="preco">R$ {livro.preco.toFixed(2)}</p>
        <p className="estoque">Estoque: {livro.quantidade}</p>

        <p className="sinopse">
          <strong>Descrição:</strong> {livro.sinopse}
        </p>

        <div className="botoes">
          <button
            className="botao comprar"
            onClick={() =>
              verificarLogin("comprar o livro", () => alert("Compra simulada!"))
            }
          >
            Comprar Agora
          </button>

          <button className="botao carrinho" onClick={adicionarAoCarrinho}>
            Adicionar ao Carrinho
          </button>

          <button
            className="botao desejos"
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
