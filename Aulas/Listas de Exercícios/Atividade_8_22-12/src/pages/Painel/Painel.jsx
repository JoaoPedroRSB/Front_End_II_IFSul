import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Painel() {
  const navigate = useNavigate();

  const [dono, setDono] = useState({
    nome: "",
    email: "",
    cpf: "",
  });

  const [livraria, setLivraria] = useState({
    nome_livraria: "",
    email_livraria: "",
    cnpj: "",
    celular_contato: "",
  });

  const [idLivro, setIdLivro] = useState("");
  const [previewLivro, setPreviewLivro] = useState({
    imagem: "",
    titulo: "",
    encontrado: false,
    erro: false,
  });

  /*
    |----------------------------------------------------------------------
    | Carregar dados do dono da livraria
    |----------------------------------------------------------------------
  */
  useEffect(() => {
    const carregarDadosDono = async () => {
      try {
        const usuarioLogado = localStorage.getItem("usuarioLogado");

        if (!usuarioLogado) {
          alert("Usuário não encontrado. Faça login novamente.");
          navigate("/");
          return;
        }

        const usuarioLog = JSON.parse(usuarioLogado);

        const usuarioId =
          usuarioLog.id ??
          usuarioLog.usuario?.id ??
          usuarioLog.user?.id ??
          null;

        if (!usuarioId) {
          alert("ID do usuário não encontrado.");
          return;
        }

        const resposta = await api.get(`/usuarios/${usuarioId}`);
        const dados = resposta.data.data["Dados do Usuário"];

        if (!dados) return;

        setDono({
          nome: dados.nome || "",
          email: dados.email || "",
          cpf: dados.cpf || "",
        });

        setLivraria({
          nome_livraria: dados.nome_livraria || "",
          email_livraria: dados.email_livraria || "",
          cnpj: dados.cnpj || "",
          celular_contato: dados.celular_contato || "",
        });
      } catch (error) {
        console.error("Erro ao carregar dados do dono:", error);
        alert("Erro ao carregar os dados do dono.");
      }
    };

    carregarDadosDono();
  }, [navigate]);

  /*
    |----------------------------------------------------------------------
    | Buscar livro pelo ID (preview antes de excluir)
    |----------------------------------------------------------------------
  */
  useEffect(() => {
    const buscarLivro = async () => {
      if (!idLivro) {
        setPreviewLivro({
          imagem: "",
          titulo: "",
          encontrado: false,
          erro: false,
        });
        return;
      }

      try {
        const resposta = await api.get(`/livros/${idLivro}`);

        setPreviewLivro({
          imagem: resposta.data.imagem || "",
          titulo: resposta.data.titulo,
          encontrado: true,
          erro: false,
        });
      } catch (error) {
        setPreviewLivro({
          imagem: "",
          titulo: "",
          encontrado: false,
          erro: true,
        });
      }
    };

    buscarLivro();
  }, [idLivro]);

  /*
    |----------------------------------------------------------------------
    | Atualizar dados do dono e da livraria
    |----------------------------------------------------------------------
  */
  const atualizarDados = async (e) => {
    e.preventDefault();

    try {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      const usuarioId = usuarioLogado.id;

      const corpo = {
        nome: dono.nome,
        email: dono.email,
        cpf: dono.cpf,
        nome_livraria: livraria.nome_livraria,
        email_livraria: livraria.email_livraria,
        cnpj: livraria.cnpj,
        celular_contato: livraria.celular_contato,
      };

      const resposta = await api.put(`/usuarios/${usuarioId}`, corpo);
      alert(resposta.data.mensagem || "Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados!");
    }
  };

  /*
    |----------------------------------------------------------------------
    | Excluir livro
    |----------------------------------------------------------------------
  */
  const excluirLivro = async (e) => {
    e.preventDefault();

    if (!previewLivro.encontrado) {
      alert("Nenhum livro válido para excluir.");
      return;
    }

    if (
      !confirm(
        `Tem certeza que deseja excluir o livro "${previewLivro.titulo}"?`
      )
    )
      return;

    try {
      const resposta = await api.delete(`/livros/${idLivro}`);
      alert(resposta.data.mensagem || "Livro excluído com sucesso!");

      setIdLivro("");
      setPreviewLivro({
        imagem: "",
        titulo: "",
        encontrado: false,
        erro: false,
      });
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      alert("Erro ao excluir livro!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200">
      {/* HEADER */}
      <header className="bg-slate-800 shadow-lg p-5 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Painel da Livraria</h1>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto p-6">
        {/* DADOS DO DONO */}
        <section className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            Meus Dados (Dono)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={dono.nome}
              onChange={(e) => setDono({ ...dono, nome: e.target.value })}
              className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
            />

            <input
              type="email"
              placeholder="Email"
              value={dono.email}
              onChange={(e) => setDono({ ...dono, email: e.target.value })}
              className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
            />

            <input
              type="text"
              placeholder="CPF"
              value={dono.cpf}
              onChange={(e) => setDono({ ...dono, cpf: e.target.value })}
              className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
            />
          </div>
        </section>

        {/* DADOS DA LIVRARIA */}
        <section className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            Dados da Livraria
          </h2>

          <form onSubmit={atualizarDados}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nome da Livraria"
                value={livraria.nome_livraria}
                onChange={(e) =>
                  setLivraria({
                    ...livraria,
                    nome_livraria: e.target.value,
                  })
                }
                className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
              />

              <input
                type="email"
                placeholder="Email"
                value={livraria.email_livraria}
                onChange={(e) =>
                  setLivraria({
                    ...livraria,
                    email_livraria: e.target.value,
                  })
                }
                className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
              />

              <input
                type="text"
                placeholder="CNPJ"
                value={livraria.cnpj}
                onChange={(e) =>
                  setLivraria({ ...livraria, cnpj: e.target.value })
                }
                className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
              />

              <input
                type="tel"
                placeholder="Celular"
                value={livraria.celular_contato}
                onChange={(e) =>
                  setLivraria({
                    ...livraria,
                    celular_contato: e.target.value,
                  })
                }
                className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Atualizar Dados
            </button>
          </form>
        </section>

        {/* BOTÕES */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => navigate("/formulario")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg w-48"
          >
            Adicionar Novo Livro
          </button>

          <button
            onClick={() => navigate("/editarlivros")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg w-48"
          >
            Editar Livro Cadastrado
          </button>
        </div>

        {/* EXCLUIR LIVRO */}
        <section className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-red-300">
            Excluir Livro
          </h2>

          <form onSubmit={excluirLivro}>
            <input
              type="text"
              placeholder="ID do Livro"
              value={idLivro}
              onChange={(e) => setIdLivro(e.target.value)}
              className="p-3 rounded-lg bg-slate-900 border border-slate-600 text-white w-full"
            />

            {previewLivro.encontrado && (
              <div className="mt-4">
                <p className="font-semibold">{previewLivro.titulo}</p>
                {previewLivro.imagem && (
                  <img
                    src={`http://localhost:8000${previewLivro.imagem}`}
                    alt="Capa do livro"
                    className="w-40 rounded mt-2 shadow-md"
                  />
                )}
              </div>
            )}

            {previewLivro.erro && (
              <p className="mt-4 text-red-400 font-semibold">
                Livro não encontrado
              </p>
            )}

            <button
              type="submit"
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Excluir Livro
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
