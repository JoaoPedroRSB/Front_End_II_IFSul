export default function Footer() {
  return (
    <footer
      className="
        bg-[#8B0000]
        text-gray-100
        text-center
        py-6
        px-4
        text-[0.95rem]
        border-t border-gray-800
        mt-10
        shadow-[0_-3px_8px_rgba(0,0,0,0.4)]
        rounded-t-xl
        transition-all duration-300
      "
    >
      <p className="text-gray-200 text-sm leading-relaxed">
        &copy; Endereço: Praça 20 de Setembro, 455 - Centro, Pelotas - RS, 96015-360 | 
        Telefone: (53) 2123-1000 | 
        E-mail: <span className="text-white underline-offset-2 hover:text-yellow-300 hover:underline transition">
          joaopedrorodregueiro@gmail.com
        </span>
      </p>
    </footer>
  );
}
