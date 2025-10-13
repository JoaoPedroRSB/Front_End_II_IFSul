import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import LivroDetalhe from "./pages/LivroDetalhe/LivroDetalhe";
import Carrinho from "./pages/Carrinho/Carrinho";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas com Header e Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="livro/:id" element={<LivroDetalhe />} /> {/* useParams */}
          <Route path="carrinho" element={<Carrinho />} />
        </Route>

        {/* Páginas fora do layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}
