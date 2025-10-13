import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
