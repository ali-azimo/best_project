import React, { useState, useEffect } from "react";
import { 
  FaChartLine, 
  FaFileInvoice, 
  FaBox, 
  FaMoneyBill, 
  FaQuoteLeft, 
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaAward,
  FaChartBar,
  FaSync,
  FaCogs,
  FaPhoneAlt,
  FaHandshake
} from "react-icons/fa";

export default function Home() {
  const [stats, setStats] = useState([
    { value: 500, target: 1500, label: "Clientes Satisfeitos", suffix: "+" },
    { value: 0, target: 12, label: "Anos de Experiência", suffix: "+" },
    { value: 0, target: 99, label: "Taxa de Satisfação", suffix: "%" },
    { value: 0, target: 24, label: "Suporte Contínuo", suffix: "/7" }
  ]);

  useEffect(() => {
    // Animação para os contadores
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value < stat.target ? 
            Math.min(stat.value + Math.ceil(stat.target / 30), stat.target) : 
            stat.value
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#344D59] via-[#45616F] to-[#2A3E48] text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6DA4AA] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5A8D93] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Contabilidade inteligente</span>
            <span className="block text-[#6DA4AA]">para empresários exigentes</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-[#A8D0DB]">
            Soluções completas em contabilidade, faturas, produtos e lançamentos — 
            tudo integrado num só sistema para otimizar sua gestão financeira.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#344D59] font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Solicite uma consultoria
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-white hover:text-[#344D59] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Conheça os nossos serviços
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#344D59] mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proposta de Valor */}
      <section className="py-20 px-6 bg-[#F5F9FA]">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#344D59] mb-4">
            Por que escolher a PHC Contabilidade?
          </h2>
          <p className="text-lg text-[#5A7A85] max-w-3xl mx-auto">
            Oferecemos soluções contábeis integradas que impulsionam o crescimento do seu negócio
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2EDF0] group">
            <div className="w-16 h-16 bg-[#E6F2F4] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D4E8EC] transition-colors duration-300">
              <FaUsers className="text-[#344D59] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#344D59] mb-4">Atendimento Personalizado</h3>
            <p className="text-[#5A7A85]">
              Suporte dedicado com um contador designado para cada cliente, garantindo 
              proximidade, confiança e entendimento completo do seu negócio.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2EDF0] group">
            <div className="w-16 h-16 bg-[#E6F2F4] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D4E8EC] transition-colors duration-300">
              <FaRocket className="text-[#344D59] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#344D59] mb-4">Tecnologia Integrada</h3>
            <p className="text-[#5A7A85]">
              Plataforma moderna com automação de processos, integração de sistemas e 
              relatórios em tempo real para decisões estratégicas mais assertivas.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2EDF0] group">
            <div className="w-16 h-16 bg-[#E6F2F4] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D4E8EC] transition-colors duration-300">
              <FaShieldAlt className="text-[#344D59] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#344D59] mb-4">Conformidade Garantida</h3>
            <p className="text-[#5A7A85]">
              Equipe especializada que garante o cumprimento de todas as obrigações fiscais 
              e legais, mantendo sua empresa sempre em dia com a legislação.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#344D59] mb-4">
            Nossos Serviços Especializados
          </h2>
          <p className="text-lg text-[#5A7A85] max-w-3xl mx-auto">
            Oferecemos um portfólio completo de soluções contábeis e financeiras para sua empresa
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#E6F2F4] to-[#D4E8EC] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group border border-[#C5DFE5]">
            <div className="w-14 h-14 bg-[#D4E8EC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C5DFE5] transition-colors duration-300">
              <FaChartBar className="text-[#344D59] text-xl" />
            </div>
            <h4 className="font-semibold text-[#344D59] mb-2">Dashboard Analítico</h4>
            <p className="text-sm text-[#5A7A85]">
              Indicadores financeiros, relatórios personalizados e visualização de dados em tempo real.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#E6F2F4] to-[#D4E8EC] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group border border-[#C5DFE5]">
            <div className="w-14 h-14 bg-[#D4E8EC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C5DFE5] transition-colors duration-300">
              <FaFileInvoice className="text-[#344D59] text-xl" />
            </div>
            <h4 className="font-semibold text-[#344D59] mb-2">Gestão de Faturas</h4>
            <p className="text-sm text-[#5A7A85]">
              Emissão, controle e acompanhamento de faturas com automação de processos manuais.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#E6F2F4] to-[#D4E8EC] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group border border-[#C5DFE5]">
            <div className="w-14 h-14 bg-[#D4E8EC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C5DFE5] transition-colors duration-300">
              <FaBox className="text-[#344D59] text-xl" />
            </div>
            <h4 className="font-semibold text-[#344D59] mb-2">Controle de Produtos</h4>
            <p className="text-sm text-[#5A7A85]">
              Gestão de inventário, controle de stock e integração com o processo de faturação.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#E6F2F4] to-[#D4E8EC] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group border border-[#C5DFE5]">
            <div className="w-14 h-14 bg-[#D4E8EC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C5DFE5] transition-colors duration-300">
              <FaSync className="text-[#344D59] text-xl" />
            </div>
            <h4 className="font-semibold text-[#344D59] mb-2">Lançamentos Automatizados</h4>
            <p className="text-sm text-[#5A7A85]">
              Registro automático de entradas e saídas financeiras com conciliação bancária integrada.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="text-[#344D59] font-semibold flex items-center justify-center mx-auto hover:text-[#2A3E48] transition-colors duration-300">
            Ver todos os serviços
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* Recursos em Destaque */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#344D59] to-[#6DA4AA] text-white">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos Exclusivos
          </h2>
          <p className="text-lg text-[#D4E8EC] max-w-3xl mx-auto">
            Tecnologia de ponta para simplificar a gestão contábil da sua empresa
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-[#5A7A85] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaCogs className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Integração Completa</h3>
            <p className="text-[#D4E8EC]">
              Conecte seu sistema de gestão com nossa plataforma para sincronização automática de dados.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-[#5A7A85] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaAward className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Relatórios Avançados</h3>
            <p className="text-[#D4E8EC]">
              Gere relatórios personalizados com análise preditiva e indicadores de performance.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-[#5A7A85] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaPhoneAlt className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Suporte Prioritário</h3>
            <p className="text-[#D4E8EC]">
              Acesso direto a especialistas contábeis para suporte rápido e personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#344D59] mb-4">
            O que dizem os nossos clientes
          </h2>
          <p className="text-lg text-[#5A7A85] max-w-3xl mx-auto">
            A confiança de quem já experimenta nossas soluções
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[#F5F9FA] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#E2EDF0]">
            <div className="flex items-start mb-4">
              <div className="text-[#6DA4AA] text-2xl mr-3">
                <FaQuoteLeft />
              </div>
              <p className="text-[#344D59] text-lg italic">
                "A PHC Contabilidade transformou a forma como gerimos as nossas finanças. 
                A plataforma intuitiva e o suporte especializado fizeram toda a diferença 
                para o crescimento do nosso negócio. Recomendo vivamente!"
              </p>
            </div>
            <div className="flex items-center mt-6">
              <div className="w-12 h-12 bg-[#E6F2F4] rounded-full flex items-center justify-center mr-4">
                <span className="font-semibold text-[#344D59]">JM</span>
              </div>
              <div>
                <p className="font-semibold text-[#344D59]">João Manuel</p>
                <p className="text-sm text-[#5A7A85]">CEO, Indústrias Manuel</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F5F9FA] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#E2EDF0]">
            <div className="flex items-start mb-4">
              <div className="text-[#6DA4AA] text-2xl mr-3">
                <FaQuoteLeft />
              </div>
              <p className="text-[#344D59] text-lg italic">
                "Com a automação da plataforma, poupamos tempo e reduzimos erros significativamente. 
                A equipe técnica é extremamente competente e sempre disponível. Um verdadeiro 
                parceiro de negócios que nos ajuda a tomar decisões mais estratégicas."
              </p>
            </div>
            <div className="flex items-center mt-6">
              <div className="w-12 h-12 bg-[#E6F2F4] rounded-full flex items-center justify-center mr-4">
                <span className="font-semibold text-[#344D59]">MF</span>
              </div>
              <div>
                <p className="font-semibold text-[#344D59]">Maria Fernandes</p>
                <p className="text-sm text-[#5A7A85]">Gestora Financeira, Grupo Fernandes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#344D59] to-[#5A7A85] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para simplificar a sua contabilidade?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-[#D4E8EC] max-w-3xl mx-auto">
            Fale connosco hoje mesmo e descubra como podemos ajudar a sua empresa a crescer 
            com soluções contábeis integradas e eficientes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#344D59] font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <FaPhoneAlt className="mr-2" />
              Entre em contacto
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-white hover:text-[#344D59] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <FaHandshake className="mr-2" />
              Agende uma demonstração
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}