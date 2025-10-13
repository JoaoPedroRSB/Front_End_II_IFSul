import { useParams } from "react-router-dom";
import livros from "../../data/livrosMock";
import "./LivroDetalhe.css";

export default function LivroDetalhe() {
  const { id } = useParams();
  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) return <p>Livro não encontrado!</p>;

  return (
    <div className="detalhe-container">
      <h1>{livro.titulo}</h1>
      <img src={livro.imagem} alt={livro.titulo} />
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Preço:</strong> R$ {livro.preco.toFixed(2)}</p>
      <p><strong>Descrição:</strong> {livro.sinopse}</p>
    </div>
  );
}
