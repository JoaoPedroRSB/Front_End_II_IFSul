import { createContext, useState, useEffect } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    cidade: "",
    estado: "",
    foto: "/src/assets/imagens/fotoperfil1.png",
  });

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuarioDados");
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  // Atualiza no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("usuarioDados", JSON.stringify(usuario));
  }, [usuario]);

  const atualizarUsuario = (dadosAtualizados) => {
    setUsuario(dadosAtualizados);
  };

  const limparUsuario = () => {
    setUsuario({
      nome: "",
      email: "",
      cpf: "",
      rg: "",
      dataNascimento: "",
      cidade: "",
      estado: "",
      foto: "/src/assets/imagens/fotoperfil1.png",
    });
    localStorage.removeItem("usuarioDados");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, atualizarUsuario, limparUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
