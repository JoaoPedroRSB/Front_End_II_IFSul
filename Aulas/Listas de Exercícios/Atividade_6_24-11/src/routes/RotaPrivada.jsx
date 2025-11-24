import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import LivroDetalhe from "./pages/LivroDetalhe/LivroDetalhe";
import Carrinho from "./pages/Carrinho/Carrinho";
import Estante from "./pages/Estante/Estante";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="livro/:id" element={<LivroDetalhe />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="estante" element={<Estante />} />
      </Route>

      {/* Páginas fora do layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}
