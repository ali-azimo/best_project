import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaMoneyBill, FaArrowUp, FaArrowDown, FaReceipt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Lancamentos() {
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroData, setFiltroData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [lancamentoToDelete, setLancamentoToDelete] = useState(null);
  const [estatisticas, setEstatisticas] = useState({
    totalEntradas: 0,
    totalSaidas: 0,
    saldo: 0
  });

  const empresaId = localStorage.getItem("empresaId");

  // Dados mockados - substitua pela sua API real
  const mockLancamentos = [
    {
      id: 1,
      descricao: "Venda de Produtos",
      tipo: "entrada",
      valor: 2500.00,
      data: "2024-03-15",
      categoria: "Vendas",
      metodo_pagamento: "Transferência",
      status: "Concluído",
      observacoes: "Venda mensal de produtos"
    },
    {
      id: 2,
      descricao: "Pagamento de Salários",
      tipo: "saida",
      valor: 1200.00,
      data: "2024-03-10",
      categoria: "Folha de Pagamento",
      metodo_pagamento: "Débito Direto",
      status: "Concluído",
      observacoes: "Pagamento mensal de funcionários"
    },
    {
      id: 3,
      descricao: "Compra de Material",
      tipo: "saida",
      valor: 450.00,
      data: "2024-03-05",
      categoria: "Compras",
      metodo_pagamento: "Cartão",
      status: "Pendente",
      observacoes: "Material de escritório"
    },
    {
      id: 4,
      descricao: "Serviço de Consultoria",
      tipo: "entrada",
      valor: 1800.00,
      data: "2024-03-01",
      categoria: "Serviços",
      metodo_pagamento: "Transferência",
      status: "Concluído",
      observacoes: "Consulta mensal"
    },
    {
      id: 5,
      descricao: "Aluguel",
      tipo: "saida",
      valor: 800.00,
      data: "2024-02-28",
      categoria: "Despesas Fixas",
      metodo_pagamento: "Débito Direto",
      status: "Concluído",
      observacoes: "Aluguel do escritório"
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setLancamentos(mockLancamentos);
      calcularEstatisticas(mockLancamentos);
      setLoading(false);
    }, 1000);
  }, [empresaId]);

  useEffect(() => {
    calcularEstatisticas(lancamentosFiltrados);
  }, [lancamentos]);

  const calcularEstatisticas = (lancamentosList) => {
    const entradas = lancamentosList
      .filter(l => l.tipo === "entrada")
      .reduce((sum, l) => sum + parseFloat(l.valor), 0);
    
    const saidas = lancamentosList
      .filter(l => l.tipo === "saida")
      .reduce((sum, l) => sum + parseFloat(l.valor), 0);
    
    setEstatisticas({
      totalEntradas: entradas,
      totalSaidas: saidas,
      saldo: entradas - saidas
    });
  };

  const lancamentosFiltrados = lancamentos.filter(lancamento => {
    // Filtro por tipo
    if (filtroTipo !== "todos" && lancamento.tipo !== filtroTipo) {
      return false;
    }
    
    // Filtro por data
    if (filtroData && lancamento.data !== filtroData) {
      return false;
    }
    
    // Filtro por pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        lancamento.descricao.toLowerCase().includes(term) ||
        lancamento.categoria.toLowerCase().includes(term) ||
        lancamento.observacoes.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const handleDeleteClick = (lancamento) => {
    setLancamentoToDelete(lancamento);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (lancamentoToDelete) {
      const updatedLancamentos = lancamentos.filter(l => l.id !== lancamentoToDelete.id);
      setLancamentos(updatedLancamentos);
      setShowModal(false);
      setLancamentoToDelete(null);
    }
  };

  const getTipoColor = (tipo) => {
    return tipo === "entrada" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const getStatusColor = (status) => {
    return status === "Concluído" 
      ? "bg-green-100 text-green-800" 
      : "bg-amber-100 text-amber-800";
  };

  const getMetodoPagamentoIcon = (metodo) => {
    const icons = {
      "Transferência": "🏦",
      "Cartão": "💳",
      "Débito Direto": "📋",
      "Dinheiro": "💵",
      "Cheque": "📝"
    };
    return icons[metodo] || "💰";
  };

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(valor);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6DA4AA]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestão de Lançamentos</h1>
        <p className="text-gray-600">Controle suas entradas e saídas financeiras</p>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Entradas</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(estatisticas.totalEntradas)}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaArrowUp className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Saídas</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(estatisticas.totalSaidas)}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaArrowDown className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Saldo</p>
              <p className={`text-2xl font-bold ${
                estatisticas.saldo >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(estatisticas.saldo)}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaMoneyBill className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Pesquisar lançamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
              />
            </div>
            
            <select 
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            >
              <option value="todos">Todos os tipos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>

            <input 
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            />
          </div>

          <Link
            to="/admin/lancamentos/novo"
            className="flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition"
          >
            <FaPlus className="mr-2" /> Novo Lançamento
          </Link>
        </div>
      </div>

      {/* Tabela de Lançamentos */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Lista de Lançamentos</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-gray-600 font-medium">Data</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Descrição</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Categoria</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Valor</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Tipo</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Pagamento</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lancamentosFiltrados.map(lancamento => (
                <tr key={lancamento.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-800">
                      {formatDate(lancamento.data)}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{lancamento.descricao}</div>
                    {lancamento.observacoes && (
                      <div className="text-sm text-gray-500 mt-1">{lancamento.observacoes}</div>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                      {lancamento.categoria}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className={`font-semibold ${
                      lancamento.tipo === "entrada" ? "text-green-600" : "text-red-600"
                    }`}>
                      {formatCurrency(lancamento.valor)}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(lancamento.tipo)}`}>
                      {lancamento.tipo === "entrada" ? "Entrada" : "Saída"}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">{getMetodoPagamentoIcon(lancamento.metodo_pagamento)}</span>
                      <span className="text-sm">{lancamento.metodo_pagamento}</span>
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lancamento.status)}`}>
                      {lancamento.status}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/lancamentos/editar/${lancamento.id}`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="Editar"
                      >
                        <FaEdit />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(lancamento)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {lancamentosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaReceipt className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum lançamento encontrado</h3>
            <p className="text-gray-600">
              {searchTerm || filtroTipo !== "todos" || filtroData
                ? "Tente ajustar os filtros de pesquisa." 
                : "Comece adicionando seu primeiro lançamento."
              }
            </p>
          </div>
        )}
      </div>

      {/* Resumo */}
      {lancamentosFiltrados.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo dos Filtros</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Total Lançamentos</p>
              <p className="text-2xl font-bold text-gray-800">{lancamentosFiltrados.length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-green-600">Entradas</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(estatisticas.totalEntradas)}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">Saídas</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(estatisticas.totalSaidas)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o lançamento <strong>"{lancamentoToDelete?.descricao}"</strong>? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}