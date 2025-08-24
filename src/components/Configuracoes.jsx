import React, { useEffect, useState } from "react";
import { FaSave, FaSync, FaBuilding, FaUser,  FaBell, FaPalette } from "react-icons/fa";
import {   FaShield  } from "react-icons/fa6";

export default function Configuracoes() {
  const [empresa, setEmpresa] = useState({
    nome: "",
    nif: "",
    email: "",
    telefone: "",
    endereco: "",
    moeda: "MZN",
    timezone: "Africa/Maputo",
    idioma: "pt"
  });

  const [usuario, setUsuario] = useState({
    nome: "João Silva",
    email: "joao@empresa.com",
    telefone: "+258 84 123 4567",
    cargo: "Administrador"
  });

  const [preferencias, setPreferencias] = useState({
    notificacoesEmail: true,
    notificacoesSMS: false,
    relatoriosAutomaticos: true,
    tema: "claro"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simular carregamento de dados da empresa
    const empresaId = localStorage.getItem("empresaId");
    if (empresaId) {
      setLoading(true);
      fetch(`http://localhost:5000/empresa/${empresaId}`)
        .then(res => res.json())
        .then(data => setEmpresa(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleEmpresaChange = (e) => {
    const { name, value } = e.target;
    setEmpresa(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenciasChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferencias(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveEmpresa = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("Configurações da empresa salvas com sucesso!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferencias = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("Preferências salvas com sucesso!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Erro ao salvar preferências.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes("sucesso") 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Informações da Empresa */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-[#6DA4AA] rounded-lg flex items-center justify-center mr-4">
              <FaBuilding className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Informações da Empresa</h2>
              <p className="text-gray-600 text-sm">Dados principais da sua empresa</p>
            </div>
          </div>

          <form onSubmit={handleSaveEmpresa}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <input
                  type="text"
                  name="nome"
                  value={empresa.nome}
                  onChange={handleEmpresaChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
                  <input
                    type="text"
                    name="nif"
                    value={empresa.nif}
                    onChange={handleEmpresaChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={empresa.telefone}
                    onChange={handleEmpresaChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={empresa.email}
                  onChange={handleEmpresaChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <textarea
                  name="endereco"
                  value={empresa.endereco}
                  onChange={handleEmpresaChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moeda</label>
                  <select
                    name="moeda"
                    value={empresa.moeda}
                    onChange={handleEmpresaChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  >
                    <option value="MZN">MZN (Metical)</option>
                    <option value="USD">USD (Dólar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuso Horário</label>
                  <select
                    name="timezone"
                    value={empresa.timezone}
                    onChange={handleEmpresaChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  >
                    <option value="Africa/Maputo">Maputo (UTC+2)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <select
                    name="idioma"
                    value={empresa.idioma}
                    onChange={handleEmpresaChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center bg-[#6DA4AA] text-white px-6 py-3 rounded-lg hover:bg-[#5D9199] transition mt-6 disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </div>

        {/* Preferências do Usuário */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#647D87] rounded-lg flex items-center justify-center mr-4">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Informações do Usuário</h2>
                <p className="text-gray-600 text-sm">Seus dados de acesso</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Nome:</span>
                <span className="font-medium">{usuario.nome}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Email:</span>
                <span className="font-medium">{usuario.email}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Cargo:</span>
                <span className="font-medium">{usuario.cargo}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition mt-6">
              <FaSync className="mr-2" />
              Alterar Senha
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#9BBEC8] rounded-lg flex items-center justify-center mr-4">
                <FaBell className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Preferências</h2>
                <p className="text-gray-600 text-sm">Configurações pessoais</p>
              </div>
            </div>

            <form onSubmit={handleSavePreferencias}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notificações por Email</label>
                    <p className="text-gray-500 text-sm">Receber alertas por email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notificacoesEmail"
                      checked={preferencias.notificacoesEmail}
                      onChange={handlePreferenciasChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6DA4AA]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notificações por SMS</label>
                    <p className="text-gray-500 text-sm">Receber alertas por SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notificacoesSMS"
                      checked={preferencias.notificacoesSMS}
                      onChange={handlePreferenciasChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6DA4AA]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relatórios Automáticos</label>
                    <p className="text-gray-500 text-sm">Gerar relatórios mensais automaticamente</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="relatoriosAutomaticos"
                      checked={preferencias.relatoriosAutomaticos}
                      onChange={handlePreferenciasChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6DA4AA]"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                  <select
                    name="tema"
                    value={preferencias.tema}
                    onChange={handlePreferenciasChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  >
                    <option value="claro">Claro</option>
                    <option value="escuro">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-[#6DA4AA] text-white px-6 py-3 rounded-lg hover:bg-[#5D9199] transition mt-6 disabled:opacity-50"
              >
                <FaSave className="mr-2" />
                {loading ? "Salvando..." : "Salvar Preferências"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}