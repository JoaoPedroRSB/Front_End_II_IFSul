import api from "../services/api";

export const listarCompras = () => api.get("/compras");
export const mostrarCompra = (id) => api.get(`/compras/${id}`);

export const criarCompra = (dados) => api.post("/compras", dados);
export const atualizarCompra = (id, dados) =>
  api.put(`/compras/${id}`, dados);
export const removerCompra = (id) => api.delete(`/compras/${id}`);
