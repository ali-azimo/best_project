import React, { useState } from "react";
import { 
  FaFileInvoice, 
  FaMoneyBill, 
  FaBox, 
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaCog,
  FaUsers,
  FaChevronRight,
  FaSearch,
  FaUserTag
} from "react-icons/fa";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
} from "../redux/user/userSlice";

export default function AdminEmpresa() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Clientes", path: "/admin/clientes", icon: <FaUserTag /> },
    { name: "Cotrolo de Stock", path: "/admin/produtos", icon: <FaBox /> },
    { name: "Faturas", path: "/admin/faturas", icon: <FaFileInvoice /> },
    { name: "Lançamentos", path: "/admin/lancamentos", icon: <FaMoneyBill /> },
    { name: "Contabilistas", path: "/admin/contabilistas", icon: <FaUsers /> },
    { name: "Configurações", path: "/admin/configuracoes", icon: <FaCog /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Função para capitalizar primeira letra
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Função para gerar iniciais (primeira letra do nome e sobrenome)
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#344D59] text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:flex lg:flex-col`}>
        <div className="flex items-center justify-between p-5 border-b border-[#465C66]">
          <h1 className="text-xl font-bold">Painel Admin</h1>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FaTimes className="text-white" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-[#465C66] text-white' : 'text-gray-200 hover:bg-[#465C66] hover:text-white'}`}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <FaChevronRight className="ml-auto text-sm" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#465C66]">
          <button 
            onClick={() => dispatch(signOutUserStart())}
            className="flex items-center w-full p-3 text-gray-200 hover:bg-[#465C66] hover:text-white rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shadow-sm">
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FaBars className="text-gray-600" />
          </button>
          <div className="relative w-64 mx-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {capitalize(currentUser?.name) || "Utilizador"}
              </p>
              <p className="text-xs text-gray-500">
                {currentUser?.role === "admin"
                  ? "Administrador"
                  : capitalize(currentUser?.role || "Utilizador")}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#6DA4AA] rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(currentUser?.name)}
            </div>
          </div>
        </div>

        {/* Conteúdo dinâmico */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
