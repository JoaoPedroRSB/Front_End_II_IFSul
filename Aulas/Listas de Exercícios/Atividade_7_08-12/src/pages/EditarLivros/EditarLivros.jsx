import { useEffect, useState } from "react";

export default function EditarLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os livros do banco
  useEffect(() => {
    fetch("/BookVerse_3sem/PHP/buscar_livros_edicao.php")
      .then((res) => res.json())
      .then((dados) => {
        setLivros(dados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const novosLivros = [...livros];
    novosLivros[index][field] = value;
    setLivros(novosLivros);
  };

  const handleSubmit = async (e, livro) => {
    e.preventDefault();

    const formData = new FormData();
    for (const chave in livro) formData.append(chave, livro[chave]);

    try {
      const resposta = await fetch("/BookVerse_3sem/PHP/atualizar_livro.php", {
        method: "POST",
        body: formData,
      });

      const result = await resposta.json();

      if (result.success) {
        alert("Livro atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar: " + result.message);
      }
    } catch (erro) {
      console.error("Erro:", erro);
      alert("Erro ao enviar dados.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-10 text-xl">
        Carregando livros...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Editar Livros Cadastrados
      </h1>

      {livros.length === 0 && (
        <p className="text-center text-white text-xl">
          Nenhum livro encontrado.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {livros.map((livro, index) => (
          <form
            key={livro.id}
            onSubmit={(e) => handleSubmit(e, livro)}
            className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700"
          >
            {/* Preview da capa */}
            <div className="text-center mb-4">
              <img
                src={livro.imagem}
                alt="Capa do Livro"
                className="w-40 mx-auto rounded-lg shadow-md"
              />
            </div>

            {/* CAMPOS */}
            <div className="space-y-3">
              <label className="block font-semibold">Imagem (URL):</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.imagem}
                onChange={(e) =>
                  handleChange(index, "imagem", e.target.value)
                }
              />

              <label className="block font-semibold">Título:</label>
              <input
                type="text"
                required
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.titulo}
                onChange={(e) =>
                  handleChange(index, "titulo", e.target.value)
                }
              />

              <label className="block font-semibold">Autor:</label>
              <input
                type="text"
                required
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.autor}
                onChange={(e) => handleChange(index, "autor", e.target.value)}
              />

              <label className="block font-semibold">Gênero:</label>
              <input
                type="text"
                required
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.genero}
                onChange={(e) =>
                  handleChange(index, "genero", e.target.value)
                }
              />

              <label className="block font-semibold">Preço (R$):</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.preco}
                onChange={(e) => handleChange(index, "preco", e.target.value)}
              />

              <label className="block font-semibold">Quantidade:</label>
              <input
                type="number"
                required
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.quantidade}
                onChange={(e) =>
                  handleChange(index, "quantidade", e.target.value)
                }
              />

              <label className="block font-semibold">Formato:</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.formato}
                onChange={(e) =>
                  handleChange(index, "formato", e.target.value)
                }
              >
                <option value="fisico">Físico</option>
                <option value="digital">Digital</option>
              </select>

              <label className="block font-semibold">Sinopse:</label>
              <textarea
                rows="3"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.sinopse}
                onChange={(e) =>
                  handleChange(index, "sinopse", e.target.value)
                }
              ></textarea>

              <label className="block font-semibold">Editora:</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.editora}
                onChange={(e) =>
                  handleChange(index, "editora", e.target.value)
                }
              />

              <label className="block font-semibold">Coleção:</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.colecao}
                onChange={(e) =>
                  handleChange(index, "colecao", e.target.value)
                }
              />

              <label className="block font-semibold">N° Páginas:</label>
              <input
                type="number"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.numeroDePaginas}
                onChange={(e) =>
                  handleChange(index, "numeroDePaginas", e.target.value)
                }
              />

              <label className="block font-semibold">Avaliação:</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.avaliacao}
                onChange={(e) =>
                  handleChange(index, "avaliacao", e.target.value)
                }
              />

              <label className="block font-semibold">Lançamento:</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
                value={livro.lancamento}
                onChange={(e) =>
                  handleChange(index, "lancamento", e.target.value)
                }
              />
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-3 rounded-lg mt-6 transition"
            >
              Atualizar Livro
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
