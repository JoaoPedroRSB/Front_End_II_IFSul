import { useState, useEffect } from "react";

export default function Formulario() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    genero: "",
    colecao: "",
    formato: "",
    quantidade: 0,
    numeroDePaginas: "",
    editora: "",
    imagem: "",
    sinopse: "",
    preco: "",
    lancamento: "",
    avaliacao: "",
    criado_por: ""
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("usuarioId");
    if (id) {
      setFormData((prev) => ({ ...prev, criado_por: id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "imagem") {
      const url = e.target.value.trim();
      if (
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png") ||
        url.endsWith(".gif") ||
        url.endsWith(".webp")
      ) {
        setPreview(url);
      } else {
        setPreview("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      ...formData,
      quantidade: parseInt(formData.quantidade),
      preco: parseFloat(formData.preco),
      numeroDePaginas: parseInt(formData.numeroDePaginas),
      avaliacao: parseFloat(formData.avaliacao) || 0,
      criado_por: parseInt(formData.criado_por)
    };

    try {
      const resposta = await fetch("/BookVerse_3sem/PHP/cadastrar_livro_api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      if (resultado.success) {
        alert("Livro cadastrado com sucesso!");
        setFormData({
          titulo: "",
          autor: "",
          genero: "",
          colecao: "",
          formato: "",
          quantidade: 0,
          numeroDePaginas: "",
          editora: "",
          imagem: "",
          sinopse: "",
          preco: "",
          lancamento: "",
          avaliacao: "",
          criado_por: formData.criado_por
        });
        setPreview("");
      } else {
        alert("Erro ao cadastrar livro: " + resultado.message);
      }
    } catch (erro) {
      console.error("Erro:", erro);
      alert("Erro ao enviar dados.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 flex justify-center items-center">
      <div className="bg-[#1f2937] w-full max-w-3xl p-8 rounded-xl shadow-xl border border-[#1f2937] text-white">
        <h1 className="text-3xl font-bold text-[#3b82f6] text-center mb-6">
          Cadastrar Novo Livro no Catálogo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TÍTULO */}
          <div>
            <label className="font-semibold">Título:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* AUTOR */}
          <div>
            <label className="font-semibold">Autor(a):</label>
            <input
              type="text"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* GÊNERO */}
          <div>
            <label className="font-semibold">Gênero:</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            >
              <option value=""></option>
              <option value="ficcao">Ficção</option>
              <option value="romance">Romance</option>
              <option value="fantasia">Fantasia</option>
              <option value="terror">Terror</option>
              <option value="esporte">Esporte</option>
              <option value="economia">Acadêmico</option>
            </select>
          </div>

          {/* COLEÇÃO */}
          <div>
            <label className="font-semibold">Coleção:</label>
            <input
              type="text"
              name="colecao"
              value={formData.colecao}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* FORMATO */}
          <div>
            <label className="font-semibold">Formato:</label>
            <select
              name="formato"
              value={formData.formato}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
              required
            >
              <option value="">Selecione</option>
              <option value="fisico">Físico</option>
              <option value="digital">Digital</option>
            </select>
          </div>

          {/* QUANTIDADE */}
          <div>
            <label className="font-semibold">Quantidade em Estoque:</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              min="0"
              onChange={handleChange}
              required
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* PÁGINAS */}
          <div>
            <label className="font-semibold">Número de Páginas:</label>
            <input
              type="number"
              name="numeroDePaginas"
              value={formData.numeroDePaginas}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* EDITORA */}
          <div>
            <label className="font-semibold">Editora:</label>
            <input
              type="text"
              name="editora"
              value={formData.editora}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* IMAGEM */}
          <div>
            <label className="font-semibold">Imagem (URL):</label>
            <input
              type="text"
              name="imagem"
              placeholder="https://..."
              value={formData.imagem}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />

            {preview && (
              <div className="mt-3">
                <strong>Pré-visualização:</strong>
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-40 rounded-lg shadow-md border border-[#4A5A7C]"
                />
              </div>
            )}
          </div>

          {/* SINOPSE */}
          <div>
            <label className="font-semibold">Sinopse:</label>
            <textarea
              name="sinopse"
              rows="4"
              value={formData.sinopse}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            ></textarea>
          </div>

          {/* PREÇO */}
          <div>
            <label className="font-semibold">Preço (R$):</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              step="0.01"
              required
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* LANÇAMENTO */}
          <div>
            <label className="font-semibold">Data de Lançamento:</label>
            <input
              type="date"
              name="lancamento"
              value={formData.lancamento}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          {/* AVALIAÇÃO */}
          <div>
            <label className="font-semibold">Avaliação (0 a 5):</label>
            <input
              type="number"
              name="avaliacao"
              value={formData.avaliacao}
              min="0"
              max="5"
              step="0.1"
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-[#4A5A7C] rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-[#2563eb] text-white p-3 rounded-lg font-semibold mt-4"
          >
            Cadastrar Livro
          </button>
        </form>
      </div>
    </div>
  );
}
