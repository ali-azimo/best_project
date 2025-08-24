import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBox, FaImage, FaTag, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [impostos, setImpostos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroEstoque, setFiltroEstoque] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const empresaId = localStorage.getItem("empresaId");

  // Dados mockados - substitua pela sua API real
  const mockProdutos = [
    {
      id: 1,
      nome: "Laptop Dell Inspiron",
      descricao: "Laptop Dell Inspiron 15, 8GB RAM, 256GB SSD",
      preco: 12500.00,
      preco_custo: 9800.00,
      quantidade: 15,
      quantidade_minima: 5,
      categoria: "Eletrônicos",
      imposto_id: 1,
      codigo_barras: "7891234567890",
      fornecedor: "Dell Mozambique",
      imagem_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Smartphone Samsung Galaxy",
      descricao: "Samsung Galaxy S23, 128GB, 5G",
      preco: 8900.00,
      preco_custo: 7200.00,
      quantidade: 8,
      quantidade_minima: 3,
      categoria: "Eletrônicos",
      imposto_id: 1,
      codigo_barras: "7891234567891",
      fornecedor: "Samsung Store",
      imagem_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Cadeira de Escritório",
      descricao: "Cadeira ergonômica para escritório",
      preco: 1200.00,
      preco_custo: 850.00,
      quantidade: 25,
      quantidade_minima: 10,
      categoria: "Mobília",
      imposto_id: 2,
      codigo_barras: "7891234567892",
      fornecedor: "Office Solutions",
      imagem_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      status: "Ativo"
    },
    {
      id: 4,
      nome: "Mesa de Reunião",
      descricao: "Mesa de reunião em madeira maciça",
      preco: 4500.00,
      preco_custo: 3200.00,
      quantidade: 3,
      quantidade_minima: 2,
      categoria: "Mobília",
      imposto_id: 2,
      codigo_barras: "7891234567893",
      fornecedor: "Woodcraft Furniture",
      imagem_url: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=300&h=200&fit=crop",
      status: "Ativo"
    },
    {
      id: 5,
      nome: "Software Office 365",
      descricao: "Licença anual Office 365 Business",
      preco: 800.00,
      preco_custo: 600.00,
      quantidade: 100,
      quantidade_minima: 20,
      categoria: "Software",
      imposto_id: 3,
      codigo_barras: "7891234567894",
      fornecedor: "Microsoft",
      imagem_url: null,
      status: "Ativo"
    }
  ];

  const mockImpostos = [
    { id: 1, descricao: "IVA Padrão", valor: 17 },
    { id: 2, descricao: "IVA Reduzido", valor: 7 },
    { id: 3, descricao: "Isento", valor: 0 }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setProdutos(mockProdutos);
      setImpostos(mockImpostos);
      setLoading(false);
    }, 1000);
  }, [empresaId]);

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  const produtosFiltrados = produtos.filter(produto => {
    // Filtro por categoria
    if (filtroCategoria !== "todos" && produto.categoria !== filtroCategoria) {
      return false;
    }
    
    // Filtro por estoque
    if (filtroEstoque === "baixo" && produto.quantidade > produto.quantidade_minima) {
      return false;
    }
    if (filtroEstoque === "critico" && produto.quantidade >= produto.quantidade_minima) {
      return false;
    }
    
    // Filtro por pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        produto.nome.toLowerCase().includes(term) ||
        produto.descricao.toLowerCase().includes(term) ||
        produto.codigo_barras.includes(term) ||
        produto.fornecedor.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const calcularPrecoComImposto = (preco, impostoId) => {
    const imposto = impostos.find(i => i.id === impostoId);
    if (!imposto) return parseFloat(preco);
    
    const valorImposto = (parseFloat(preco) * parseFloat(imposto.valor)) / 100;
    return (parseFloat(preco) + valorImposto).toFixed(2);
  };

  const getImpostoValor = (impostoId) => {
    const imposto = impostos.find(i => i.id === impostoId);
    return imposto ? imposto.valor : 0;
  };

  const getStatusEstoque = (quantidade, quantidadeMinima) => {
    if (quantidade === 0) return { status: "Esgotado", cor: "bg-red-100 text-red-800" };
    if (quantidade <= quantidadeMinima) return { status: "Crítico", cor: "bg-red-100 text-red-800" };
    if (quantidade <= quantidadeMinima * 2) return { status: "Baixo", cor: "bg-amber-100 text-amber-800" };
    return { status: "Disponível", cor: "bg-green-100 text-green-800" };
  };

  const handleDeleteClick = (produto) => {
    setProdutoToDelete(produto);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (produtoToDelete) {
      const updatedProdutos = produtos.filter(p => p.id !== produtoToDelete.id);
      setProdutos(updatedProdutos);
      setShowModal(false);
      setProdutoToDelete(null);
    }
  };

  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(valor);
  };

  const getLucroPercentual = (precoVenda, precoCusto) => {
    if (!precoCusto || precoCusto === 0) return 0;
    return (((precoVenda - precoCusto) / precoCusto) * 100).toFixed(1);
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
        <h1 className="text-2xl font-semibold text-gray-800">Gestão de Produtos</h1>
        <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Produtos</p>
          <p className="text-2xl font-bold text-gray-800">{produtos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Em Estoque</p>
          <p className="text-2xl font-bold text-green-600">
            {produtos.filter(p => p.quantidade > 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Estoque Baixo</p>
          <p className="text-2xl font-bold text-amber-600">
            {produtos.filter(p => p.quantidade > 0 && p.quantidade <= p.quantidade_minima * 2).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Valor Total Estoque</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(produtos.reduce((acc, p) => acc + (p.preco_custo * p.quantidade), 0))}
          </p>
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
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
              />
            </div>
            
            <select 
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            >
              <option value="todos">Todas categorias</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              value={filtroEstoque}
              onChange={(e) => setFiltroEstoque(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
            >
              <option value="todos">Todo estoque</option>
              <option value="baixo">Estoque Baixo</option>
              <option value="critico">Estoque Crítico</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition ${
                  viewMode === "grid" 
                    ? "bg-white text-[#6DA4AA] shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
                title="Visualização em Grid"
              >
                <FaBox />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition ${
                  viewMode === "list" 
                    ? "bg-white text-[#6DA4AA] shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
                title="Visualização em Lista"
              >
                <FaList />
              </button>
            </div>

            <Link
              to="/admin/produtos/novo"
              className="flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition"
            >
              <FaPlus className="mr-2" /> Novo Stoque         </Link>
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {produtosFiltrados.map(produto => {
            const statusEstoque = getStatusEstoque(produto.quantidade, produto.quantidade_minima);
            const lucroPercentual = getLucroPercentual(produto.preco, produto.preco_custo);
            
            return (
              <div key={produto.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {/* Imagem do Produto */}
                <div className="relative mb-4">
                  {produto.imagem_url ? (
                    <img 
                      src={produto.imagem_url} 
                      alt={produto.nome}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FaImage className="text-gray-400 text-2xl" />
                    </div>
                  )}
                  
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${statusEstoque.cor}`}>
                    {statusEstoque.status}
                  </span>
                </div>

                {/* Informações do Produto */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 text-lg">{produto.nome}</h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">{produto.descricao}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#6DA4AA]">
                      {formatCurrency(produto.preco)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lucroPercentual}% lucro
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Estoque:</span>
                      <span className={`font-medium ml-1 ${
                        produto.quantidade <= produto.quantidade_minima ? 'text-red-600' : 'text-gray-800'
                      }`}>
                        {produto.quantidade}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">IVA:</span>
                      <span className="font-medium text-gray-800 ml-1">
                        {getImpostoValor(produto.imposto_id)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500">Categoria:</span>
                    <span className="font-medium text-gray-800 ml-1">{produto.categoria}</span>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Cód: {produto.codigo_barras}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/produtos/editar/${produto.id}`}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded transition"
                        title="Editar"
                      >
                        <FaEdit className="text-sm" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(produto)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                        title="Excluir"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Visualização em Lista */
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-gray-600 font-medium">Produto</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Preço</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Estoque</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Categoria</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">IVA</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map(produto => {
                  const statusEstoque = getStatusEstoque(produto.quantidade, produto.quantidade_minima);
                  
                  return (
                    <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {produto.imagem_url ? (
                            <img 
                              src={produto.imagem_url} 
                              alt={produto.nome}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                              <FaBox className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-800">{produto.nome}</div>
                            <div className="text-sm text-gray-500">{produto.codigo_barras}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#6DA4AA]">
                          {formatCurrency(produto.preco)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Custo: {formatCurrency(produto.preco_custo)}
                        </div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{produto.quantidade}</div>
                        <div className="text-sm text-gray-500">
                          Mín: {produto.quantidade_minima}
                        </div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {produto.categoria}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {getImpostoValor(produto.imposto_id)}%
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusEstoque.cor}`}>
                          {statusEstoque.status}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/produtos/editar/${produto.id}`}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(produto)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Excluir"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {produtosFiltrados.length === 0 && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filtroCategoria !== "todos" || filtroEstoque !== "todos"
              ? "Tente ajustar os filtros de pesquisa." 
              : "Comece adicionando seu primeiro produto."
            }
          </p>
          <Link
            to="/admin/produtos/novo"
            className="inline-flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition"
          >
            <FaPlus className="mr-2" /> Adicionar Produto
          </Link>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o produto <strong>"{produtoToDelete?.nome}"</strong>? 
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

// Componente FaList para completar
function FaList(props) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
    </svg>
  );
}