import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FinalizarCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const livro = location.state?.livro;

  // Pagamento selecionado
  const [pagamento, setPagamento] = useState("cartao");

  // Endereço (somente físico)
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

  // Pix Fake
  const chavePix = "c7f8c1a2-bf3e-46ab-9f31-9dfe85f2f111";

  useEffect(() => {
    if (!livro) navigate("/");
  }, [livro, navigate]);

  if (!livro) return null;

  const finalizar = () => {
    navigate("/resumo", {
      state: {
        livro,
        pagamento,
        endereco: livro.formato.toLowerCase() === "físico" ? endereco : null,
      },
    });
  };

  return (
    <div className="min-h-[90vh] bg-gray-900 text-gray-100 flex items-start justify-center py-12 px-4">

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">

        {/* LADO ESQUERDO — FORMULÁRIO */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full lg:w-2/3 flex flex-col gap-6">

          <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>

          {/* Forma de pagamento */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Forma de Pagamento</h2>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao"
                  checked={pagamento === "cartao"}
                  onChange={() => setPagamento("cartao")}
                />
                Cartão de Crédito
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={pagamento === "pix"}
                  onChange={() => setPagamento("pix")}
                />
                PIX
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="boleto"
                  checked={pagamento === "boleto"}
                  onChange={() => setPagamento("boleto")}
                />
                Boleto
              </label>
            </div>
          </div>

          {/* CAMPOS: CARTÃO */}
          {pagamento === "cartao" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Informações do Cartão</h3>

              <input
                type="text"
                placeholder="Nome no cartão"
                className="p-2 rounded bg-gray-900 border border-gray-600"
              />

              <input
                type="text"
                placeholder="Número do cartão"
                className="p-2 rounded bg-gray-900 border border-gray-600"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Validade (MM/AA)"
                  className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 w-1/2 rounded bg-gray-900 border border-gray-600"
                />
              </div>
            </div>
          )}

          {/* CAMPOS: PIX */}
          {pagamento === "pix" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Pague via PIX</h3>

              <p className="text-sm text-gray-300">
                Use a chave pix abaixo para pagar:
              </p>

              <div className="bg-gray-900 p-3 rounded border border-gray-600 break-all font-mono">
                {chavePix}
              </div>

              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => navigator.clipboard.writeText(chavePix)}
              >
                Copiar chave PIX
              </button>

              {/* QR CODE */}
              <div className="flex justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Pagamento%20Livro"
                  alt="QR Code PIX"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          {/* CAMPOS: BOLETO */}
          {pagamento === "boleto" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Pagamento via Boleto</h3>
              <p>Um boleto será gerado após confirmar a compra.</p>

              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
                Gerar Boleto
              </button>
            </div>
          )}

          {/* ENDEREÇO (APENAS PARA LIVRO FÍSICO) */}
          {livro.formato.toLowerCase() === "físico" && (
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Endereço de Entrega</h3>

              <input
                type="text"
                placeholder="CEP"
                className="p-2 rounded bg-gray-900 border border-gray-600"
                onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
              />
              <input
                type="text"
                placeholder="Rua"
                className="p-2 rounded bg-gray-900 border border-gray-600"
                onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
              />

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

              <input
                type="text"
                placeholder="Complemento"
                className="p-2 rounded bg-gray-900 border border-gray-600"
                onChange={(e) =>
                  setEndereco({ ...endereco, complemento: e.target.value })
                }
              />

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
            </div>
          )}

          <button
            onClick={finalizar}
            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg mt-2 font-semibold text-center"
          >
            Confirmar Compra
          </button>
        </div>

        {/* LADO DIREITO — RESUMO DO LIVRO */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full lg:w-1/3 flex flex-col gap-4 h-fit">
          <h2 className="text-xl font-semibold text-center mb-2">
            Resumo do Pedido
          </h2>

          <img
            src={livro.imagem}
            alt={livro.titulo}
            className="w-40 mx-auto rounded-lg shadow"
          />

          <h3 className="text-lg text-blue-400 text-center">{livro.titulo}</h3>
          <p className="text-sm text-gray-300 text-center">{livro.autor}</p>

          <p className="text-lg font-bold text-center mt-4">
            R$ {livro.preco.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
