import api from "../services/api";

export const listarLivros = () => api.get("/livros");
export const mostrarLivro = (id) => api.get(`/livros/${id}`);

export const criarLivro = (dados) => api.post("/livros", dados);
export const atualizarLivro = (id, dados) =>
  api.put(`/livros/${id}`, dados);
export const removerLivro = (id) => api.delete(`/livros/${id}`);
