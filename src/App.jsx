import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminEmpresa from './pages/AdminEmpresa';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Produtos from './components/Produtos';
import NovoProduto from './components/NovoProduto';
import Faturas from './components/Faturas';
import Lancamentos from './components/Lancamentos';
import Contabilistas from './components/Contabilistas';
import Configuracoes from './components/Configuracoes';
import Search from './pages/Search';
import Team from './pages/Team';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
import ScrollToTop from './pages/ScrollToTop';
import NovoLancamento from './components/NovoLancamento';
import CadastrarContabilista from './components/CadastrarContabilista';
import CadEmpresa from './pages/CadEmpresa';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadempresa" element={<CadEmpresa />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/team" element={<Team />} />


        <Route element={<PrivateRoute />}>
          
  <Route path="/admin" element={<AdminEmpresa />}>
            <Route index element={<Dashboard />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="produtos/novo" element={<NovoProduto />} />
            <Route path="produtos/editar/:id" element={<NovoProduto />} />
            <Route path="faturas" element={<Faturas />} />
            <Route path="lancamentos" element={<Lancamentos />} />
            <Route path="lancamentos/novo" element={<NovoLancamento />} />
            <Route path="lancamentos/editar/:id" element={<NovoLancamento />} />
            <Route path="contabilistas" element={<Contabilistas />} />
            <Route path="contabilistas/cadastrar" element={<CadastrarContabilista />} />
            <Route path="contabilistas/editar/:id" element={<CadastrarContabilista />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
        {/* Rotas privadas */}
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
