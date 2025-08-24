import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  FaFileInvoice, 
  FaMoneyBill, 
  FaBox, 
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const empresaId = localStorage.getItem("empresaId");

  // Dados mockados para os gráficos
  const mockData = {
    revenueData: [
      { month: 'Jan', revenue: 25000, expenses: 18000 },
      { month: 'Fev', revenue: 32000, expenses: 21000 },
      { month: 'Mar', revenue: 28000, expenses: 19000 },
      { month: 'Abr', revenue: 35000, expenses: 22000 },
      { month: 'Mai', revenue: 42000, expenses: 25000 },
      { month: 'Jun', revenue: 38000, expenses: 23000 },
      { month: 'Jul', revenue: 45000, expenses: 28000 },
      { month: 'Ago', revenue: 52000, expenses: 32000 },
      { month: 'Set', revenue: 48000, expenses: 30000 },
      { month: 'Out', revenue: 55000, expenses: 35000 },
      { month: 'Nov', revenue: 60000, expenses: 38000 },
      { month: 'Dez', revenue: 65000, expenses: 40000 }
    ],
    categoryData: [
      { name: 'Vendas', value: 45 },
      { name: 'Serviços', value: 25 },
      { name: 'Assinaturas', value: 15 },
      { name: 'Outros', value: 15 }
    ],
    salesData: [
      { day: 'Seg', sales: 12 },
      { day: 'Ter', sales: 19 },
      { day: 'Qua', sales: 15 },
      { day: 'Qui', sales: 24 },
      { day: 'Sex', sales: 32 },
      { day: 'Sáb', sales: 28 },
      { day: 'Dom', sales: 18 }
    ]
  };

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setRevenueData(mockData.revenueData);
      setCategoryData(mockData.categoryData);
      setSalesData(mockData.salesData);
      
      setDashboardData([
        { 
          title: "Faturas", 
          value: "48", 
          icon: <FaFileInvoice className="text-white text-2xl" />, 
          color: "bg-[#6DA4AA]", 
          path: "/admin/faturas",
          trend: "+12%",
          trendUp: true
        },
        { 
          title: "Lançamentos", 
          value: "156", 
          icon: <FaMoneyBill className="text-white text-2xl" />, 
          color: "bg-[#647D87]", 
          path: "/admin/lancamentos",
          trend: "+5%",
          trendUp: true
        },
        { 
          title: "Produtos", 
          value: "24", 
          icon: <FaBox className="text-white text-2xl" />, 
          color: "bg-[#9BBEC8]", 
          path: "/admin/produtos",
          trend: "+8%",
          trendUp: true
        },
        { 
          title: "Receita Total", 
          value: "MZN 125.640,00", 
          icon: <FaChartLine className="text-white text-2xl" />, 
          color: "bg-[#436850]", 
          trend: "+15%",
          trendUp: true
        },
        { 
          title: "Clientes", 
          value: "32", 
          icon: <FaUsers className="text-white text-2xl" />, 
          color: "bg-[#FF6B6B]", 
          path: "/admin/clientes",
          trend: "+10%",
          trendUp: true
        },
        { 
          title: "Vendas Mensais", 
          value: "128", 
          icon: <FaShoppingCart className="text-white text-2xl" />, 
          color: "bg-[#4ECDC4]", 
          trend: "-3%",
          trendUp: false
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [empresaId]);

  const COLORS = ['#6DA4AA', '#647D87', '#9BBEC8', '#DDF2FD', '#FF6B6B', '#4ECDC4'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
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
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral do desempenho da empresa</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
        {dashboardData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
                <div className="flex items-center mt-1">
                  {item.trendUp ? (
                    <FaArrowUp className="text-green-600 text-xs mr-1" />
                  ) : (
                    <FaArrowDown className="text-red-600 text-xs mr-1" />
                  )}
                  <p className={`text-xs font-medium ${item.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {item.trend}
                  </p>
                </div>
              </div>
              <div className={`${item.color} p-3 rounded-lg`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos Principais */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Receita vs Despesas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Receita vs Despesas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), '']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#6DA4AA" 
                fill="#6DA4AA" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#FF6B6B" 
                fill="#FF6B6B" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#6DA4AA] rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Receita</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#FF6B6B] rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Despesas</span>
            </div>
          </div>
        </div>

        {/* Distribuição por Categoria */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Receita</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentual']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos Secundários */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Vendas Semanais */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Vendas Semanais</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#9BBEC8" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução Mensal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolução Mensal</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), '']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#6DA4AA" 
                strokeWidth={3} 
                dot={{ fill: '#6DA4AA', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6, fill: '#436850' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaArrowUp className="text-green-600 text-xl" />
          </div>
          <p className="text-gray-500 text-sm">Taxa de Crescimento</p>
          <p className="text-2xl font-bold text-green-600">+15.2%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-blue-600 text-xl" />
          </div>
          <p className="text-gray-500 text-sm">Novos Clientes</p>
          <p className="text-2xl font-bold text-blue-600">+8</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaShoppingCart className="text-amber-600 text-xl" />
          </div>
          <p className="text-gray-500 text-sm">Conversão</p>
          <p className="text-2xl font-bold text-amber-600">24.5%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaChartLine className="text-purple-600 text-xl" />
          </div>
          <p className="text-gray-500 text-sm">ROI</p>
          <p className="text-2xl font-bold text-purple-600">42.8%</p>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            to="/admin/faturas/nova"
            className="flex flex-col items-center p-4 bg-[#6DA4AA] text-white rounded-lg hover:bg-[#5D9199] transition"
          >
            <FaFileInvoice className="text-2xl mb-2" />
            <span className="text-sm">Nova Fatura</span>
          </Link>

          <Link
            to="/admin/produtos/novo"
            className="flex flex-col items-center p-4 bg-[#647D87] text-white rounded-lg hover:bg-[#556A73] transition"
          >
            <FaBox className="text-2xl mb-2" />
            <span className="text-sm">Novo Produto</span>
          </Link>

          <Link
            to="/admin/lancamentos/novo"
            className="flex flex-col items-center p-4 bg-[#9BBEC8] text-white rounded-lg hover:bg-[#8AAEB8] transition"
          >
            <FaMoneyBill className="text-2xl mb-2" />
            <span className="text-sm">Novo Lançamento</span>
          </Link>

          <Link
            to="/admin/clientes/novo"
            className="flex flex-col items-center p-4 bg-[#436850] text-white rounded-lg hover:bg-[#385A45] transition"
          >
            <FaUsers className="text-2xl mb-2" />
            <span className="text-sm">Novo Cliente</span>
          </Link>
        </div>
      </div>
    </div>
  );
}