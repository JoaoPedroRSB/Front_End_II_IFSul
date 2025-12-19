import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FinalizarCompra() {
  const location = useLocation();
  const navigate = useNavigate();

  // aceita livro único OU vários livros
  const livros =
    location.state?.livros
      ? location.state.livros
      : location.state?.livro
      ? [location.state.livro]
      : [];

  const [pagamento, setPagamento] = useState("cartao");

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    entrega: "normal",
  });

  const chavePix = "c7f8c1a2-bf3e-46ab-9f31-9dfe85f2f111";

  // Redireciona se entrar direto na rota
  useEffect(() => {
    if (!livros || livros.length === 0) {
      navigate("/");
    }
  }, [livros, navigate]);

  if (!livros || livros.length === 0) return null;

  // Verifica se existe ao menos um livro físico
  const possuiLivroFisico = livros.some((livro) => {
    const formato = livro.formato
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return formato === "fisico";
  });

  const validarEndereco = () => {
    const { cep, rua, numero, bairro, cidade, estado } = endereco;
    return cep && rua && numero && bairro && cidade && estado;
  };

  const totalGeral = livros.reduce(
    (total, livro) =>
      total +
      Number(livro.preco || 0) *
      Number(livro.quantidadeSelecionada || 1),
    0
  );

  // salvar no histórico de compras
  const finalizar = () => {
  if (possuiLivroFisico && !validarEndereco()) {
    alert("Preencha todos os dados obrigatórios do endereço.");
    return;
  }

  const historicoAtual =
    JSON.parse(localStorage.getItem("historicoCompras")) || [];

  const agora = new Date();

  const novasCompras = livros.map((livro) => ({
    id: Date.now() + Math.random(),
    titulo: livro.titulo,
    imagem: livro.imagem,
    formato: livro.formato,
    quantidade: livro.quantidadeSelecionada || 1,
    total: livro.preco * (livro.quantidadeSelecionada || 1),
    data: agora.toLocaleDateString("pt-BR"),
    hora: agora.toLocaleTimeString("pt-BR"),
  }));

  // Salvar livros digitais na estante
  const livrosDigitaisAtuais =
    JSON.parse(localStorage.getItem("livrosDigitais")) || [];

  const novosLivrosDigitais = livros
    .filter((livro) => {
      const formato = livro.formato
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return formato === "digital";
    })
    .map((livro) => ({
      id: livro.id,
      titulo: livro.titulo,
      imagem: livro.imagem,
      autor: livro.autor,
    }));

  // Evita duplicar livros digitais já comprados
  const bibliotecaAtualizada = [
    ...livrosDigitaisAtuais,
    ...novosLivrosDigitais.filter(
      (novo) => !livrosDigitaisAtuais.some((existente) => existente.id === novo.id)
    ),
  ];

  localStorage.setItem(
    "livrosDigitais",
    JSON.stringify(bibliotecaAtualizada)
  );

  localStorage.setItem(
    "historicoCompras",
    JSON.stringify([...historicoAtual, ...novasCompras])
  );

  localStorage.removeItem("carrinho");

    navigate("/resumo-compra", {
      state: {
      livros,
      pagamento,
      endereco: possuiLivroFisico ? endereco : null,
    },
  });
};

  return (
    <div className="min-h-[90vh] bg-gray-900 text-gray-100 flex items-start justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">

        {/* LADO ESQUERDO */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full lg:w-2/3 flex flex-col gap-6">
          <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>

          {/* PAGAMENTO */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Forma de Pagamento</h2>

            <div className="flex gap-4">
              {["cartao", "pix", "boleto"].map((tipo) => (
                <label key={tipo} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="pagamento"
                    checked={pagamento === tipo}
                    onChange={() => setPagamento(tipo)}
                  />
                  {tipo === "cartao"
                    ? "Cartão de Crédito"
                    : tipo === "pix"
                    ? "PIX"
                    : "Boleto"}
                </label>
              ))}
            </div>
          </div>

          {/* CARTÃO */}
          {pagamento === "cartao" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Informações do Cartão</h3>

              <input type="text" placeholder="Nome no cartão" className="p-2 rounded bg-gray-900 border border-gray-600" />
              <input type="text" placeholder="Número do cartão" className="p-2 rounded bg-gray-900 border border-gray-600" />

              <div className="flex gap-4">
                <input type="text" placeholder="Validade (MM/AA)" className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600" />
                <input type="text" placeholder="CVV" className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600" />
              </div>
            </div>
          )}

          {/* PIX */}
          {pagamento === "pix" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Pague via PIX</h3>

              <p className="text-sm text-gray-300">Use a chave PIX abaixo:</p>

              <div className="bg-gray-900 p-3 rounded border border-gray-600 break-all font-mono">
                {chavePix}
              </div>

              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => navigator.clipboard.writeText(chavePix)}
              >
                Copiar chave PIX
              </button>

              <div className="flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${chavePix}`}
                  alt="QR Code PIX"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          {/* BOLETO */}
          {pagamento === "boleto" && (
            <div className="bg-gray-700 p-5 rounded-lg">
              <h3 className="text-lg font-semibold">Pagamento via Boleto</h3>
              <p>O boleto será gerado após a confirmação da compra.</p>
            </div>
          )}

          {/* ENDEREÇO */}
          {possuiLivroFisico && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Endereço de Entrega</h3>

              {["cep", "rua", "complemento"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  placeholder={campo.toUpperCase()}
                  className="p-2 rounded bg-gray-900 border border-gray-600"
                  onChange={(e) =>
                    setEndereco({ ...endereco, [campo]: e.target.value })
                  }
                />
              ))}

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Número"
                  className="p-2 w-1/3 rounded bg-gray-900 border border-gray-600"
                  onChange={(e) =>
                    setEndereco({ ...endereco, numero: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  className="p-2 w-2/3 rounded bg-gray-900 border border-gray-600"
                  onChange={(e) =>
                    setEndereco({ ...endereco, bairro: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Cidade"
                  className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600"
                  onChange={(e) =>
                    setEndereco({ ...endereco, cidade: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Estado"
                  className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600"
                  onChange={(e) =>
                    setEndereco({ ...endereco, estado: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <label className="font-semibold">Tipo de Entrega:</label>
          <select
            className="p-2 rounded bg-gray-900 border border-gray-600"
            onChange={(e) =>
              setEndereco({ ...endereco, entrega: e.target.value })
            }
          >
            <option value="normal">Entrega Normal (5–7 dias úteis)</option>
            <option value="rapida">Entrega Rápida (1–2 dias úteis)</option>
          </select>

          <button
            onClick={finalizar}
            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
          >
            Confirmar Compra
          </button>
        </div>

        {/* RESUMO */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full lg:w-1/3 h-fit flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Resumo do Pedido</h2>

          {livros.map((livro) => (
            <div key={livro.id} className="border-b border-gray-600 pb-4">
              <img
                src={`http://localhost:8000${livro.imagem}`}
                alt={livro.titulo}
                className="w-32 mx-auto rounded-lg shadow"
              />

              <h3 className="text-lg text-blue-400 text-center mt-2">
                {livro.titulo}
              </h3>

              <p className="text-sm text-gray-400 text-center">
                Quantidade: {livro.quantidadeSelecionada || 1}
              </p>

              <p className="text-center font-bold mt-2">
                R$ {(livro.preco * (livro.quantidadeSelecionada || 1)).toFixed(2)}
              </p>
            </div>
          ))}

          <p className="text-xl font-bold text-center text-green-400 mt-4">
            Total: R$ {totalGeral.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
