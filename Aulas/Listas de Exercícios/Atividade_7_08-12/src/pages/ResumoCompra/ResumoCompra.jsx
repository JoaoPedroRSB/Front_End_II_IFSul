import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumoCompra() {
  const navigate = useNavigate();
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("resumoCompra"));

    if (!dados) {
      navigate("/");
      return;
    }

    setResumo(dados);
  }, [navigate]);

  if (!resumo) return null;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        Compra Finalizada com Sucesso! 🎉
      </h1>

      {/* Card do livro */}
      <div className="flex items-center gap-6 bg-gray-100 p-5 rounded-xl shadow">
        <img
          src={resumo.imagem}
          alt={resumo.titulo}
          className="w-32 h-48 object-cover rounded-lg shadow-md"
        />

        <div>
          <h2 className="text-xl font-semibold">{resumo.titulo}</h2>
          <p className="text-gray-700 mt-1">
            <strong>Quantidade:</strong> {resumo.quantidade}
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Total Pago:</strong> R$ {resumo.total.toFixed(2)}
          </p>

          <p className="mt-1">
            <strong>Pagamento:</strong>{" "}
            <span className="uppercase">{resumo.pagamento}</span>
          </p>
        </div>
      </div>

      {/* Endereço - se o livro for físico */}
      {resumo.endereco && (
        <div className="mt-6 bg-gray-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Endereço de Entrega</h3>

          <p><strong>CEP:</strong> {resumo.endereco.cep}</p>
          <p><strong>Rua:</strong> {resumo.endereco.rua}</p>
          <p>
            <strong>Número:</strong> {resumo.endereco.numero}{" "}
            {resumo.endereco.complemento &&
              ` - ${resumo.endereco.complemento}`}
          </p>
          <p><strong>Bairro:</strong> {resumo.endereco.bairro}</p>
          <p><strong>Cidade:</strong> {resumo.endereco.cidade}</p>
          <p><strong>Estado:</strong> {resumo.endereco.estado}</p>
          <p className="mt-2">
            <strong>Entrega Selecionada:</strong> {resumo.endereco.entrega}
          </p>
        </div>
      )}

      {/* Data */}
      <div className="mt-6 bg-gray-100 p-5 rounded-xl shadow">
        <p>
          <strong>Data da Compra:</strong> {resumo.data}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold transition"
      >
        Voltar para a Página Inicial
      </button>
    </div>
  );
}
