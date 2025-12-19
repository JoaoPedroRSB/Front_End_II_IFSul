import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    Accept: "application/json",
  },
});

// REQUEST
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Token enviado:", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("⛔ 401 - Não autenticado");

        localStorage.removeItem("token");
        localStorage.removeItem("usuarioLogado");

        // evita loop infinito
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }

      if (status === 403) {
        console.error("⛔ 403 - Acesso negado");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
