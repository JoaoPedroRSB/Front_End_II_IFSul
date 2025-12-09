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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      alert("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    setUsuario(user);
    setFormData(user); // Preenche os dados do formulário

    const digitais = JSON.parse(localStorage.getItem("livrosDigitais")) || [];
    const desejos = JSON.parse(localStorage.getItem("listaDesejos")) || [];
    const hist = JSON.parse(localStorage.getItem("historicoCompras")) || [];

    setLivrosDigitais(digitais);
    setListaDesejos(desejos);
    setHistorico(hist);
    setCarregando(false);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const salvarAlteracoes = async () => {
    try {
      const resposta = await api.put(`/usuarios/${usuario.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Dados atualizados com sucesso!");

      // Atualiza o localStorage com os dados mais recentes
      localStorage.setItem("usuarioLogado", JSON.stringify(resposta.data));
      setUsuario(resposta.data);
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro.response?.data || erro.message);
      alert("Erro ao salvar alterações.");
    }
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
        {/* === DADOS DO USUÁRIO === */}
        <section className="bg-[#1e293b] p-8 rounded-2xl shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 font-semibold text-center">
            Meu Perfil
          </h2>

          {usuario ? (
            <div className="flex flex-col items-center gap-5">
              {/* FOTO DO USUÁRIO */}
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
                accept="image/"
                className="w-full text-slate-200 cursor-pointer"
              />

              {/* CAMPOS DO USUÁRIO */}
              <div className="w-full mt-4">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Nome"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Email"
                />

                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="CPF"
                />

                <input
                  type="text"
                  name="rg"
                  value={formData.rg || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="RG"
                />

                <input
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                />

                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Cidade"
                />

                <input
                  type="text"
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded bg-black border border-slate-600 text-slate-200"
                  placeholder="Estado"
                />

                {/* BOTÃO PARA SALVAR ALTERAÇÕES */}
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

        {/* === LIVROS DIGITAIS === */}
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
                    onClick={() => alert(`Abrindo o livro digital: ${livro.titulo}`)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold hover:shadow-green-500/40 transition"
                  >
                    📖 Ler Agora
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* === LISTA DE DESEJOS === */}
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
                    src={livro.imagem}
                    className="w-full max-w-[160px] mx-auto rounded-lg mb-3"
                  />

                  <h3 className="text-blue-400 text-lg font-semibold">
                    {livro.titulo}
                  </h3>
                  <p className="text-slate-200 mb-3">
                    R$ {livro.preco?.toFixed(2)}
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

        {/* === HISTÓRICO DE COMPRAS === */}
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
                  className="bg-slate-700 rounded-xl p-5 text-center shadow-md shadow-black/40 hover:-translate-y-1 hover:shadow-blue-500/30 transition"
                >
                  <img
                    src={item.imagem}
                    className="w-full max-w-[160px] mx-auto rounded-lg mb-3"
                  />

                  <h3 className="text-blue-400 text-lg font-semibold">
                    {item.titulo}
                  </h3>

                  <p>
                    <strong>Quantidade:</strong> {item.quantidade}
                  </p>
                  <p>
                    <strong>Formato:</strong> {item.formato}
                  </p>
                  <p>
                    <strong>Total:</strong> R$ {item.total?.toFixed(2)}
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
