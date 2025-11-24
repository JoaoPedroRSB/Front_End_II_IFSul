import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
  }, []);

  const login = (email, senha) => {
    // Simula autenticação
    if (email === "admin@teste.com" && senha === "123456") {
      const dadosUsuario = { nome: "Admin", email };
      setUsuario(dadosUsuario);
      localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
