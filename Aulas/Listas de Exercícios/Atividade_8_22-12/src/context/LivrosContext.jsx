import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const LivrosContext = createContext();

export function LivrosProvider({ children }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Carregar livros da API
  useEffect(() => {
    const carregarLivros = async () => {
      try {
        setLoading(true);
        setErro(null);

        const resposta = await api.get("/livros");

        // Se a API retornar direto o array
        setLivros(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        setErro("Erro ao carregar livros.");
      } finally {
        setLoading(false);
      }
    };

    carregarLivros();
  }, []);

  // Permite atualizar a lista externamente (ex: após cadastrar livro)
  const atualizarLivros = async () => {
    try {
      const resposta = await api.get("/livros");
      setLivros(resposta.data);
    } catch (error) {
      console.error("Erro ao atualizar livros:", error);
    }
  };

  return (
    <LivrosContext.Provider
      value={{
        livros,
        setLivros,
        loading,
        erro,
        atualizarLivros
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}
