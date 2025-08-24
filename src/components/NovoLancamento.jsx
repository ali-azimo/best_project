import React, { useState } from "react";
import { FaSave, FaArrowLeft, FaMoneyBill } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NovoLancamento() {
  const [formData, setFormData] = useState({
    descricao: "",
    tipo: "entrada",
    valor: "",
    data: new Date().toISOString().split('T')[0],
    categoria: "",
    metodo_pagamento: "Transferência",
    status: "Concluído",
    observacoes: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categorias = [
    "Vendas",
    "Serviços",
    "Folha de Pagamento",
    "Compras",
    "Despesas Fixas",
    "Impostos",
    "Manutenção",
    "Marketing",
    "Outros"
  ];

  const metodosPagamento = [
    "Transferência",
    "Cartão",
    "Débito Direto",
    "Dinheiro",
    "Cheque"
  ];

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
    
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    if (!formData.valor || parseFloat(formData.valor) <= 0) newErrors.valor = "Valor deve ser maior que zero";
    if (!formData.data) newErrors.data = "Data é obrigatória";
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória";
    
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
      // const response = await fetch("http://localhost:5000/lancamentos", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...formData,
      //     valor: parseFloat(formData.valor),
      //     empresa_id: localStorage.getItem("empresaId")
      //   })
      // });
      
      alert("Lançamento cadastrado com sucesso!");
      navigate("/admin/lancamentos");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar lançamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/admin/lancamentos"
            className="flex items-center text-[#6DA4AA] hover:text-[#5D9199] mb-2"
          >
            <FaArrowLeft className="mr-2" /> Voltar para lançamentos
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Novo Lançamento</h1>
          <p className="text-gray-600">Registre uma nova entrada ou saída financeira</p>
        </div>
        
        <div className="w-12 h-12 bg-[#6DA4AA] rounded-lg flex items-center justify-center">
          <FaMoneyBill className="text-white text-xl" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.descricao ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Ex: Venda de produtos"
              />
              {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (MZN) *
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.valor ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="0.00"
              />
              {errors.valor && <p className="text-red-500 text-sm mt-1">{errors.valor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.data ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                  errors.categoria ? "border-red-300" : "border-gray-200"
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pagamento
              </label>
              <select
                name="metodo_pagamento"
                value={formData.metodo_pagamento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
              >
                {metodosPagamento.map(metodo => (
                  <option key={metodo} value={metodo}>{metodo}</option>
                ))}
              </select>
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
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                placeholder="Informações adicionais sobre o lançamento..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <Link
              to="/admin/lancamentos"
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
              {loading ? "Cadastrando..." : "Cadastrar Lançamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}