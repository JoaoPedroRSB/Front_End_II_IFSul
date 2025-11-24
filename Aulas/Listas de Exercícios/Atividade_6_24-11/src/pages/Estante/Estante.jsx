import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LivrosContext } from "../../context/LivrosContext";

export default function Estante() {
  const navigate = useNavigate();
  const {
    usuario,
    setUsuario,
    listaDesejos = [],
    livrosDigitais = [],
    historico = [],
    atualizarUsuario,
    removerDesejo,
  } = useContext(LivrosContext);

  const atualizarDados = (e) => {
    e.preventDefault();
    if (usuario) {
      atualizarUsuario(usuario);
      alert("Dados atualizados com sucesso!");
    }
  };

  const lerLivro = (titulo) => {
    alert(`Abrindo o livro digital: ${titulo}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">

      {/* MAIN */}
      <main className="flex-1 w-[90%] max-w-[1100px] mx-auto mt-12 mb-20 flex flex-col gap-12">

        {/* === SEÇÃO: MEUS DADOS === */}
        <section className="bg-[#1e293b] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 text-center font-semibold">
            Meus Dados
          </h2>

          <form onSubmit={atualizarDados} className="flex flex-col items-center gap-4">
            <img
              src={usuario?.foto || "/src/assets/imagens/fotoperfil1.png"}
              alt="Foto de perfil"
              className="w-[110px] h-[110px] rounded-full border-4 border-blue-500 mb-4 hover:shadow-blue-500/40 shadow-md transition"
            />

            <label className="self-start font-semibold text-slate-300">Alterar foto de perfil:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-slate-200 cursor-pointer"
            />

            {/* CAMPOS */}
            {[
              ["Nome", "nome"],
              ["Email", "email"],
              ["CPF", "cpf"],
              ["RG", "rg"],
              ["Data de Nascimento", "dataNascimento", "date"],
              ["Cidade", "cidade"],
              ["Estado", "estado"],
            ].map(([label, field, type = "text"]) => (
              <div key={field} className="w-full">
                <label className="font-semibold">{label}:</label>
                <input
                  type={type}
                  value={usuario?.[field] || ""}
                  onChange={(e) => setUsuario({ ...usuario, [field]: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-700 bg-[#0f172a] text-slate-100 focus:border-blue-500 focus:shadow-blue-500/40 transition"
                />
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold mt-2 hover:shadow-blue-500/40 transition"
            >
              💾 Salvar Alterações
            </button>
          </form>
        </section>

        {/* === SEÇÃO: LIVROS DIGITAIS === */}
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
                    onClick={() => lerLivro(livro.titulo)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold hover:shadow-green-500/40 transition"
                  >
                    📖 Ler Agora
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* === SEÇÃO: LISTA DE DESEJOS === */}
        <section className="bg-[#1e293b] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl text-blue-500 mb-6 border-b border-blue-500 pb-1 text-center font-semibold">
            Lista de Desejos
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {listaDesejos.length === 0 ? (
              <p className="text-center italic text-slate-400">Sua lista de desejos está vazia.</p>
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

                  <h3 className="text-blue-400 text-lg font-semibold">{livro.titulo}</h3>
                  <p className="text-slate-200 mb-3">R$ {livro.preco?.toFixed(2)}</p>

                  <button
                    onClick={() => removerDesejo(livro.titulo)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold hover:shadow-red-500/40 transition"
                  >
                    ❌ Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* === SEÇÃO: HISTÓRICO === */}
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

                  <h3 className="text-blue-400 text-lg font-semibold">{item.titulo}</h3>

                  <p><strong>Quantidade:</strong> {item.quantidade}</p>
                  <p><strong>Formato:</strong> {item.formato}</p>
                  <p><strong>Total:</strong> R$ {item.total?.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
