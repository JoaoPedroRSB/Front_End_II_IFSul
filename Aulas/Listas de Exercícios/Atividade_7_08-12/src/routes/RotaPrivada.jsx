import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import LivroDetalhe from "./pages/LivroDetalhe/LivroDetalhe";
import Carrinho from "./pages/Carrinho/Carrinho";
import Estante from "./pages/Estante/Estante";
import Painel from "./pages/Painel/Painel";
import Formulario from "./pages/Formulario/Formulario";
import EditarLivros from "./pages/EditarLivros/EditarLivros";
import FinalizarCompra from "./pages/FinalizarCompra/FinalizarCompra";
import ResumoCompra from "./pages/ResumoCompra/ResumoCompra";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="livro/:id" element={<LivroDetalhe />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="estante" element={<Estante />} />
        <Route path="painel" element={<Painel />} />
        <Route path="formulario" element={<Formulario />} />
        <Route path="editarlivros" element={<EditarLivros />} />
        <Route path="finalizar-compra" element={<FinalizarCompra />} />
        <Route path="resumo" element={<ResumoCompra />} />
      </Route>

      {/* Páginas fora do layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}
