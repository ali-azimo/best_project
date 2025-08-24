import React, { useState } from "react";
import { FaSave, FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CadastrarContabilista() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nif: "",
    especialidade: "",
    experiencia: "",
    status: "Ativo"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.nif.trim()) newErrors.nif = "NIF é obrigatório";
    if (!formData.especialidade) newErrors.especialidade = "Especialidade é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simular cadastro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada API real
      // const response = await fetch("http://localhost:5000/contabilistas", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...formData,
      //     empresa_id: localStorage.getItem("empresaId")
      //   })
      // });
      
      alert("Contabilista cadastrado com sucesso!");
      navigate("/admin/contabilistas");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar contabilista.");
    } finally {
      setLoading(false);
    }
  };

  const especialidades = [
    "Fiscal",
    "Contabilidade Geral",
    "Auditoria",
    "Consultoria",
    "Recursos Humanos",
    "Gestão Financeira"
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/admin/contabilistas"
            className="flex items-center text-[#6DA4AA] hover:text-[#5D9199] mb-2"
          >
            <FaArrowLeft className="mr-2" /> Voltar para contabilistas
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Cadastrar Contabilista</h1>
          <p className="text-gray-600">Adicione um novo contabilista ao sistema</p>
        </div>
        
        <div className="w-12 h-12 bg-[#6DA4AA] rounded-lg flex items-center justify-center">
          <FaUserPlus className="text-white text-xl" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.nome ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Ex: Carlos Santos"
              />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.email ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Ex: carlos@contabilidade.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.telefone ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Ex: +258 84 123 4567"
              />
              {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIF *
              </label>
              <input
                type="text"
                name="nif"
                value={formData.nif}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.nif ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Ex: 123456789"
              />
              {errors.nif && <p className="text-red-500 text-sm mt-1">{errors.nif}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialidade *
              </label>
              <select
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.especialidade ? "border-red-300" : "border-gray-200"
                }`}
              >
                <option value="">Selecione uma especialidade</option>
                {especialidades.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
              {errors.especialidade && <p className="text-red-500 text-sm mt-1">{errors.especialidade}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiência
              </label>
              <input
                type="text"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                placeholder="Ex: 5 anos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <Link
              to="/admin/contabilistas"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {loading ? "Cadastrando..." : "Cadastrar Contabilista"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}