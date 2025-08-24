import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaChevronDown, FaCog } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserSuccess } from '../redux/user/userSlice';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pega user do Redux
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(currentUser);
  const userName = currentUser?.name || currentUser?.email?.split("@")[0] || "";

  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar menus ao trocar de página
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(signOutUserSuccess());
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/produtos", label: "Produtos" },
    { path: "/faturas", label: "Faturas", requireAuth: true },
    { path: "/lancamentos", label: "Lançamentos", requireAuth: true },
    { path: "/about", label: "Sobre" },
    { path: "/ajuda", label: "Ajuda" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="w-full bg-[#344D59] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-[#9BBEC8]">PHC</span>
          <span className="text-xl font-bold text-white ml-1">Contabilidade</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link) => {
            if (link.requireAuth && !isLoggedIn) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-[#465C66] text-white"
                    : "text-gray-200 hover:bg-[#465C66] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Área Usuário */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#6DA4AA] text-white rounded-lg text-sm font-medium hover:bg-[#5D9199] transition-colors"
              >
                Cadastrar
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#465C66] transition-colors"
              >
                <div className="w-8 h-8 bg-[#6DA4AA] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm text-gray-200">{userName || "Usuário"}</span>
                <FaChevronDown className={`text-xs transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{userName || "Usuário"}</p>
                    <p className="text-xs text-gray-500">Bem-vindo de volta</p>
                  </div>
                  <Link
                    to="/perfil"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FaUserCircle className="mr-2 text-gray-500" />
                    Meu Perfil
                  </Link>
                  <Link
                    to="/admin/configuracoes"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FaCog className="mr-2 text-gray-500" />
                    Configurações
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#465C66] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#465C66] px-6 py-4 space-y-2">
          {navLinks.map((link) => {
            if (link.requireAuth && !isLoggedIn) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-[#344D59] text-white"
                    : "text-gray-200 hover:bg-[#344D59] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <hr className="border-[#5D727D] my-2" />

          {!isLoggedIn ? (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                className="block py-2 px-3 rounded-lg text-sm font-medium text-gray-200 hover:bg-[#344D59] hover:text-white transition-colors text-center"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="block py-2 px-3 rounded-lg text-sm font-medium bg-[#6DA4AA] text-white hover:bg-[#5D9199] transition-colors text-center"
              >
                Cadastrar
              </Link>
            </div>
          ) : (
            <div className="pt-2">
              <div className="px-3 py-2 flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#6DA4AA] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm text-gray-200">{userName || "Usuário"}</span>
              </div>
              <div className="space-y-1 mt-2">
                <Link
                  to="/perfil"
                  className="block py-2 px-3 rounded-lg text-sm text-gray-200 hover:bg-[#344D59] transition-colors"
                >
                  Meu Perfil
                </Link>
                <Link
                  to="/admin/configuracoes"
                  className="block py-2 px-3 rounded-lg text-sm text-gray-200 hover:bg-[#344D59] transition-colors"
                >
                  Configurações
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-3 rounded-lg text-sm text-red-300 hover:bg-[#344D59] transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
