import api from "../services/api";

export const criarUsuario = (dados) => api.post("/usuarios", dados);
export const login = (dados) => api.post("/login", dados);
export const logout = () => api.post("/logout");

export const listarUsuarios = () => api.get("/usuarios");
export const mostrarUsuario = (id) => api.get(`/usuarios/${id}`);

export const atualizarUsuario = (id, dados) =>
  api.put(`/usuarios/${id}`, dados);

export const removerUsuario = (id) => api.delete(`/usuarios/${id}`);
