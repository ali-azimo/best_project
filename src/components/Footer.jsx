import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#344D59] text-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Informações da Empresa */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-[#9BBEC8]">PHC Contabilidade</h2>
          <p className="text-gray-300 mt-3 text-sm leading-relaxed">
            Oferecemos soluções contábeis inteligentes para gestão de clientes, produtos e finanças empresariais.
          </p>
          <div className="flex space-x-4 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-[#465C66] p-2 rounded-full hover:bg-[#6DA4AA] transition">
              <FaFacebook size={16} className="text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-[#465C66] p-2 rounded-full hover:bg-[#6DA4AA] transition">
              <FaLinkedin size={16} className="text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-[#465C66] p-2 rounded-full hover:bg-[#6DA4AA] transition">
              <FaInstagram size={16} className="text-white" />
            </a>
          </div>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#465C66]">Links Rápidos</h3>
          <ul className="space-y-3">
            <li><a href="/dashboard" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Dashboard</a></li>
            <li><a href="/clientes" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Clientes</a></li>
            <li><a href="/produtos" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Produtos</a></li>
            <li><a href="/faturas" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Faturas</a></li>
            <li><a href="/lancamentos" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Lançamentos</a></li>
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#465C66]">Nossos Serviços</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Consultoria Fiscal</a></li>
            <li><a href="#" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Gestão Contábil</a></li>
            <li><a href="#" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Auditoria</a></li>
            <li><a href="#" className="text-gray-300 hover:text-[#9BBEC8] transition text-sm flex items-center"><span className="w-1 h-1 bg-[#6DA4AA] rounded-full mr-2"></span>Relatórios Financeiros</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#465C66]">Contato</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaPhone className="text-[#9BBEC8] mt-1 mr-3" size={14} />
              <span className="text-gray-300 text-sm">+258 84 123 4567</span>
            </li>
            <li className="flex items-start">
              <FaEnvelope className="text-[#9BBEC8] mt-1 mr-3" size={14} />
              <span className="text-gray-300 text-sm">contato@phccontabilidade.co.mz</span>
            </li>
            <li className="flex items-start">
              <FaMapMarkerAlt className="text-[#9BBEC8] mt-1 mr-3" size={14} />
              <span className="text-gray-300 text-sm">Av. 25 de Setembro, Maputo, Moçambique</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="border-t border-[#465C66] text-center text-gray-400 py-5 text-sm bg-[#2A3E47]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} PHC Contabilidade. Todos os direitos reservados.</span>
          <div className="mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#9BBEC8] transition text-sm mx-2">Política de Privacidade</a>
            <span className="mx-1">•</span>
            <a href="#" className="text-gray-400 hover:text-[#9BBEC8] transition text-sm mx-2">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
}