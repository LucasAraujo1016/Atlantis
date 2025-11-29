import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";

type NavbarProps = {
  tela: string;
  setTela: (tela: string) => void;
};

export default function NavbarComponent({ tela, setTela }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-blue-700 via-blue-800 to-cyan-700 text-white px-4 py-3 flex items-center justify-between shadow-lg relative">
      <NavbarLogo />
      <button
        className="md:hidden flex items-center px-2 py-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
        </svg>
      </button>
      <div className={`md:flex gap-6 ${menuOpen ? "absolute top-full left-0 w-full bg-linear-to-r from-blue-700 via-blue-800 to-cyan-700 z-50 flex flex-col items-center py-4" : "hidden md:flex"}`}>
        <NavbarMenu tela={tela} setTela={setTela} />
      </div>
    </nav>
  );
}