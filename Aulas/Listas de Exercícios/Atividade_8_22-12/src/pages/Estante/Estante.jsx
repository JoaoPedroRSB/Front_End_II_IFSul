import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Estante() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({});
  const [livrosDigitais, setLivrosDigitais] = useState([]);
  const [listaDesejos, setListaDesejos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estado para guardar apenas os campos modificados
  const [novosDados, setNovosDados] = useState({});

  // Carregar dados do usuário
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!user) {
    alert("Você precisa estar logado!");
    navigate("/login");
    return;
  }

  setUsuario(user);
  setFormData(user);

  const carregarDados = () => {
    const digitais =
      JSON.parse(localStorage.getItem("livrosDigitais")) || [];
    const desejos =
      JSON.parse(localStorage.getItem("listaDesejos")) || [];
    const hist =
      JSON.parse(localStorage.getItem("historicoCompras")) || [];

    setLivrosDigitais(digitais);
    setListaDesejos(desejos);
    setHistorico(hist);
    setCarregando(false);
  };

  // Carrega ao entrar na Estante
  carregarDados();

  // Atualiza sempre que o usuário voltar para a aba/página
  window.addEventListener("focus", carregarDados);

  return () => {
    window.removeEventListener("focus", carregarDados);
  };
}, [navigate]);

  // Atualiza o estado principal do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setNovosDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const salvarAlteracoes = async () => {
    setCarregando(true);

    try {
      const usuarioLS = JSON.parse(localStorage.getItem("usuarioLogado"));

      // Filtrar só campos realmente alterados
      const dadosFiltrados = Object.fromEntries(
        Object.entries(novosDados).filter(([_, v]) => v !== "" && v !== null)
      );

      if (Object.keys(dadosFiltrados).length === 0) {
        alert("Nenhum campo alterado.");
        setCarregando(false);
        return;
      }

      const resposta = await api.put(`/usuarios/${usuarioLS.id}`, dadosFiltrados);

      const usuarioAtualizado = {
        ...usuarioLS,
        ...resposta.data.data,
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

      alert("Informações atualizadas com sucesso!");

      setUsuario(usuarioAtualizado);
      setFormData(usuarioAtualizado);
      setNovosDados({});
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar usuário.");
    }

    setCarregando(false);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 pt-28">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* ==== DADOS DO USUÁRIO ==== */}
        <section className="bg-[#1e293b] p-8 rounded-2xl shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 font-semibold text-center">
            Meu Perfil
          </h2>

          {usuario ? (
            <div className="flex flex-col items-center gap-5">

              <img
                src={
                  usuario.foto && usuario.foto.trim() !== ""
                    ? usuario.foto
                    : "/src/assets/imagens/fotoperfil1.png"
                }
                alt="Foto de perfil"
                className="w-[110px] h-[110px] rounded-full border-4 border-blue-500 mb-4 hover:shadow-blue-500/40 shadow-md transition"
              />

              <label className="self-start font-semibold text-slate-300">
                Alterar foto de perfil:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-slate-200 cursor-pointer"
              />

              <div className="w-full mt-4">

                {/* NOME */}
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Nome"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Email"
                />

                {/* CPF */}
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="CPF"
                />

                {/* RG */}
                <input
                  type="text"
                  name="rg"
                  value={formData.rg || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="RG"
                />

                {/* DATA DE NASCIMENTO */}
                <input
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                />

                {/* CIDADE */}
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Cidade"
                />

                {/* ESTADO */}
                <input
                  type="text"
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Estado"
                />

                <div className="text-center mt-4">
                  <button
                    onClick={salvarAlteracoes}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Salvar Alterações
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400">
              Nenhum usuário logado.
            </p>
          )}
        </section>

        {/* ==== MEUS LIVROS DIGITAIS ==== */}
        <section className="bg-[#1e293b] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 text-center font-semibold">
            Meus Livros Digitais
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 mt-4">
            {livrosDigitais.length === 0 ? (
              <p className="text-center italic text-slate-400">
                Você ainda não possui livros digitais.
              </p>
            ) : (
              livrosDigitais.map((livro, i) => (
                <div
                  key={i}
                  className="bg-slate-700 rounded-xl p-5 text-center shadow-md shadow-black/40 hover:-translate-y-1 hover:shadow-blue-500/30 transition"
                >
                  <img
                    src={livro.imagem}
                    alt={livro.titulo}
                    className="w-full max-w-[160px] rounded-lg mx-auto mb-4 hover:scale-105 transition"
                  />

                  <h3 className="text-blue-400 mb-2 text-lg font-semibold">
                    {livro.titulo}
                  </h3>

                  <button
                    onClick={() =>
                      alert(`📖 Abrindo o livro digital:\n\n${livro.titulo}`)
                    }
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold text-white transition hover:shadow-green-500/40"
                  >
                    📖 Ler Agora
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ==== LISTA DE DESEJOS ==== */}
        <section className="bg-[#1e293b] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 text-center font-semibold">
            Lista de Desejos
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {listaDesejos.length === 0 ? (
              <p className="text-center italic text-slate-400">
                Sua lista de desejos está vazia.
              </p>
            ) : (
              listaDesejos.map((livro, i) => (
                <div
                  key={i}
                  className="bg-slate-700 rounded-xl p-5 text-center shadow-md shadow-black/40 hover:-translate-y-1 hover:shadow-blue-500/30 transition"
                >
                  <img
                    src={`http://localhost:8000${livro.imagem}`}
                    className="w-full max-w-[160px] mx-auto rounded-lg mb-3"
                  />

                  <h3 className="text-blue-400 text-lg font-semibold">
                    {livro.titulo}
                  </h3>
                  <p className="text-slate-200 mb-3">
                    R$ {Number(livro.preco || 0).toFixed(2)}
                  </p>

                  <button
                    onClick={() => {
                      const novaLista = listaDesejos.filter((l) => l.titulo !== livro.titulo);
                      setListaDesejos(novaLista);
                      localStorage.setItem("listaDesejos", JSON.stringify(novaLista));
                    }}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold hover:shadow-red-500/40 transition"
                  >
                    ❌ Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ==== HISTÓRICO DE COMPRAS ==== */}
        <section className="bg-[#1e293b] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 text-center font-semibold">
            Histórico de Compras
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {historico.length === 0 ? (
              <p className="text-center italic text-slate-400">
                Você ainda não realizou nenhuma compra.
              </p>
            ) : (
              historico.map((item, i) => (
                <div
                  key={i}
                  className="relative bg-slate-700 rounded-xl p-5 text-center shadow-md shadow-black/40 hover:-translate-y-1 hover:shadow-blue-500/30 transition"
              >
              <button
                onClick={() => {
                  const novoHistorico = historico.filter((_, index) => index !== i);
                  setHistorico(novoHistorico);
                  localStorage.setItem("historicoCompras", JSON.stringify(novoHistorico));
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-md hover:shadow-red-500/40 transition"
                title="Remover do Histórico"
              >
                ✕
              </button>

              <img
                src={item.imagem}
                className="w-full max-w-[160px] mx-auto rounded-lg mb-3"
              />

              <h3 className="text-blue-400 text-lg font-semibold">
               {item.titulo}
              </h3>

              <p><strong>Quantidade:</strong> {item.quantidade}</p>
              <p><strong>Formato:</strong> {item.formato}</p>
              <p>
                <strong>Data:</strong> {item.data} às {item.hora}
              </p>
              <p className="font-semibold text-green-400 mt-1">
                Total: R$ {Number(item.total || 0).toFixed(2)}
              </p>
            </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
