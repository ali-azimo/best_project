import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Faturas() {
  const [faturas, setFaturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    if (!empresaId) return;

    setLoading(true);
    
    // Fetch faturas
    fetch(`http://localhost:5000/faturas/${empresaId}`)
      .then(res => res.json())
      .then(data => setFaturas(data))
      .catch(err => console.error(err));

    // Fetch clientes
    fetch(`http://localhost:5000/clientes/${empresaId}`)
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error(err));

    // Fetch produtos
    fetch(`http://localhost:5000/produtos/${empresaId}`)
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [empresaId]);

  const faturasFiltradas = faturas.filter(fatura => {
    if (filtroStatus === "todos") return true;
    return fatura.status === filtroStatus;
  });

  const getClienteNome = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  };

  const calcularTotalFatura = (fatura) => {
    if (!fatura.itens) return 0;
    return fatura.itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produto_id);
      const preco = produto ? parseFloat(produto.preco) : 0;
      return total + (preco * item.quantidade);
    }, 0);
  };

  const handleExcluirFatura = async (faturaId) => {
    if (window.confirm("Tem certeza que deseja excluir esta fatura?")) {
      try {
        const response = await fetch(`http://localhost:5000/faturas/${faturaId}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          setFaturas(faturas.filter(f => f.id !== faturaId));
          alert("Fatura excluída com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao excluir fatura:", error);
        alert("Erro ao excluir fatura.");
      }
    }
  };

  const handleExportarPDF = (fatura) => {
    // Simulação de exportação para PDF
    alert(`Exportando fatura ${fatura.numero} para PDF...`);
    // Aqui você implementaria a lógica real de exportação
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
        <h1 className="text-2xl font-semibold text-gray-800">Gestão de Faturas</h1>
        <p className="text-gray-600">Gerencie as faturas da sua empresa</p>
      </div>

      {/* Filtros e Estatísticas */}
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Faturas</p>
          <p className="text-2xl font-bold text-gray-800">{faturas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Faturas Pagas</p>
          <p className="text-2xl font-bold text-green-600">
            {faturas.filter(f => f.status === 'Paga').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Faturas Pendentes</p>
          <p className="text-2xl font-bold text-amber-600">
            {faturas.filter(f => f.status === 'Pendente').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Valor Total</p>
          <p className="text-2xl font-bold text-blue-600">
            MZN {faturas.reduce((acc, f) => acc + parseFloat(f.valor || 0), 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <select 
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            >
              <option value="todos">Todos os status</option>
              <option value="Paga">Pagas</option>
              <option value="Pendente">Pendentes</option>
              <option value="Cancelada">Canceladas</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Pesquisar faturas..."
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            />
          </div>

          <Link
            to="/admin/faturas/nova"
            className="flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition"
          >
            <FaPlus className="mr-2" /> Nova Fatura
          </Link>
        </div>
      </div>

      {/* Tabela de Faturas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Lista de Faturas</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-gray-600 font-medium">Número</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Cliente</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Data</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Valor (MZN)</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {faturasFiltradas.map(fatura => (
                <tr key={fatura.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-800">#{fatura.numero || fatura.id}</td>
                  <td className="py-3 px-4">{getClienteNome(fatura.cliente_id)}</td>
                  <td className="py-3 px-4">{new Date(fatura.data).toLocaleDateString("pt-PT")}</td>
                  <td className="py-3 px-4 font-semibold">
                    {parseFloat(fatura.valor || calcularTotalFatura(fatura)).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fatura.status === 'Paga' 
                        ? 'bg-green-100 text-green-800' 
                        : fatura.status === 'Pendente'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {fatura.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleExportarPDF(fatura)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Exportar PDF"
                      >
                        <FaFilePdf />
                      </button>
                      <Link
                        to={`/admin/faturas/editar/${fatura.id}`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="Editar"
                      >
                        <FaEdit />
                      </Link>
                      <button 
                        onClick={() => handleExcluirFatura(fatura.id)}
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

        {faturasFiltradas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {filtroStatus === "todos" 
              ? "Nenhuma fatura encontrada." 
              : `Nenhuma fatura com status "${filtroStatus}" encontrada.`}
          </div>
        )}
      </div>
    </div>
  );
}