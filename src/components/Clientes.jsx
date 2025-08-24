import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const empresaId = localStorage.getItem("empresaId");
    if (empresaId) {
      fetch(`http://localhost:5000/clientes/${empresaId}`)
        .then(res => res.json())
        .then(data => setClientes(data))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestão de Clientes</h1>
        <p className="text-gray-600">Gerencie os clientes da sua empresa</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Lista de Clientes</h2>
          <Link
            to="/admin/clientes/cadastrar"
            className="flex items-center bg-[#6DA4AA] text-white px-4 py-2 rounded-lg hover:bg-[#5D9199] transition"
          >
            <FaPlus className="mr-2" /> Novo Cliente
          </Link>
        </div>
        
        {/* Tabela de clientes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-gray-600 font-medium">ID</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Nome</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Email</th>
                <th className="py-3 px-4 text-gray-600 font-medium">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{cliente.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{cliente.nome}</td>
                  <td className="py-3 px-4">{cliente.email}</td>
                  <td className="py-3 px-4">{cliente.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}