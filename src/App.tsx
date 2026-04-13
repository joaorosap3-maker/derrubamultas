/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Gavel, 
  IdCard, 
  Search, 
  FileText, 
  ShieldCheck, 
  Zap, 
  GraduationCap, 
  Eye, 
  MessageCircle, 
  ArrowRight,
  Phone,
  X,
  CheckCircle2,
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Pin,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import AcompanharProcesso from './AcompanharProcesso';

const faqs = [
  {
    question: "Como funciona o recurso de multa?",
    answer: "Analisamos o auto de infração em busca de erros formais e inconsistências legais. Com base nisso, elaboramos uma defesa técnica personalizada para cada instância administrativa."
  },
  {
    question: "Quanto tempo demora o processo?",
    answer: "O tempo varia de acordo com o órgão autuador e a complexidade do caso, mas geralmente leva entre 3 a 12 meses para percorrer todas as instâncias."
  },
  {
    question: "Posso continuar dirigindo durante o recurso?",
    answer: "Sim! Enquanto o recurso estiver em andamento, a penalidade fica suspensa, permitindo que você continue dirigindo normalmente até a decisão final."
  },
  {
    question: "Quais as chances de vitória?",
    answer: "Nossas chances são altas devido ao foco técnico. Avaliamos cada caso individualmente e só prosseguimos se houver fundamentos legais sólidos para a defesa."
  },
  {
    question: "O que acontece se eu perder o recurso?",
    answer: "Se todas as instâncias forem indeferidas, a penalidade será aplicada. No entanto, nosso objetivo é esgotar todas as possibilidades legais para evitar que isso aconteça."
  }
];

export default function App() {
  // Sistema de roteamento simples
  const currentPath = window.location.pathname;
  
  if (currentPath === '/acompanhar') {
    return <AcompanharProcesso />;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    placa: ''
  });

  // Capturar parâmetro de origem da URL
  const urlParams = new URLSearchParams(window.location.search);
  const origem = urlParams.get('origem') || 'site';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, placa } = formData;
    
    if (!nome || !placa) return;

    const message = `Olá, me chamo ${nome}. Vim pelo ${origem} e gostaria de consultar a multa da placa ${placa}.

Nossa equipe especializada realiza uma análise técnica completa e verifica todas as possibilidades de recurso, podendo atuar em até 3 instâncias administrativas.

Muitas multas podem ser contestadas por erros formais ou inconsistências legais - por isso, é fundamental uma análise profissional.

Para darmos continuidade, envie a notificação da multa ou mais detalhes do seu caso por aqui.

Vamos avaliar sem compromisso.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5548991003589?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-inverse-surface/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="bg-primary-fixed p-8 flex justify-between items-center">
                <h3 className="text-3xl font-black tracking-tighter text-on-primary-fixed">Recurso de Multas</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-on-primary-fixed/10 rounded-full transition-colors"
                >
                  <X className="w-8 h-8 text-on-primary-fixed" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Nosso processo de recurso é baseado em uma análise técnica rigorosa da legislação de trânsito brasileira. Não utilizamos modelos prontos — cada defesa é única e personalizada para o seu caso.
                </p>
                <div className="grid gap-4">
                  {[
                    "Análise detalhada de erros formais no auto de infração",
                    "Elaboração de defesa prévia e recursos em até 3 instâncias",
                    "Acompanhamento completo do processo",
                    "Especialistas em recursos administrativos (JARI e CETRAN)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-inverse-surface font-medium">
                      <CheckCircle2 className="w-6 h-6 text-primary-fixed-dim shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-inverse-surface text-surface font-bold py-4 rounded-lg hover:bg-on-surface-variant transition-all"
                >
                  Quero uma análise gratuita
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-[#F4B400] shadow-lg">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 h-20">
          {/* Menu Sanduíche - Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
          >
            <Menu className="w-6 h-6 text-[#1F1F1F]" />
          </button>
          
          {/* Logo - Desktop à esquerda, Mobile centralizada */}
          <div className="hidden md:block">
            <img 
              src="/logo.png" 
              alt="DerrubaMultas" 
              className="h-12 w-auto object-contain" 
            />
          </div>
          
          {/* Logo Mobile - Centralizada */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/logo.png" 
              alt="DerrubaMultas" 
              className="h-10 sm:h-12 w-auto object-contain" 
            />
          </div>
          
          {/* Menu Desktop - Centralizado */}
          <div className="hidden md:flex items-center gap-x-8 font-headline font-semibold tracking-tight flex-1 justify-center">
            <a 
              className="text-[#1F1F1F] hover:opacity-70 transition-opacity duration-300" 
              href="#processo"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Processo
            </a>
            <a 
              className="text-[#1F1F1F] hover:opacity-70 transition-opacity duration-300" 
              href="#vantagens"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vantagens
            </a>
            <a 
              className="text-[#1F1F1F] hover:opacity-70 transition-opacity duration-300" 
              href="#depoimentos"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </a>
            <a 
              className="text-[#1F1F1F] hover:opacity-70 transition-opacity duration-300" 
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
          
          {/* Espaço vazio para equilibrar no desktop */}
          <div className="hidden md:block w-32"></div>
        </nav>
        
        {/* Menu Mobile - Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#F4B400] border-t border-black/10"
            >
              <div className="px-4 py-6 space-y-4">
                <a 
                  className="block text-[#1F1F1F] hover:bg-black/10 py-3 px-4 rounded-lg transition-colors font-semibold"
                  href="#processo"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Processo
                </a>
                <a 
                  className="block text-[#1F1F1F] hover:bg-black/10 py-3 px-4 rounded-lg transition-colors font-semibold"
                  href="#vantagens"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vantagens
                </a>
                <a 
                  className="block text-[#1F1F1F] hover:bg-black/10 py-3 px-4 rounded-lg transition-colors font-semibold"
                  href="#depoimentos"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Depoimentos
                </a>
                <a 
                  className="block text-[#1F1F1F] hover:bg-black/10 py-3 px-4 rounded-lg transition-colors font-semibold"
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mt-0">
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center bg-inverse-surface text-surface overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img 
              alt="Luxury car steering wheel" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClCuICP3d1LsXff2-S5mraPKHnT26Tt6nZJI9T5yOzEaR85jGfnQUKfenlgx2MzR3x_u1WVAEpTh-JSuq8j2Bn5F-HDdM3i3oFi1N6bb3NA4s2Uf7wxqLA1yIQ2CjUl47O9E4tLNCwsMstPtpetfWNaRnqQsX-q8npbbcK-fV5CTJ9TOCZV2nnctuwtQsJ7yIkh-j17kiaE_RdAPMxhzsSX1aAzQ_Ea77BYkU6h5xnIxI4s5TfgQRqeNb33_BP4WFfzF-hMmnP7gU"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-24">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] sm:leading-[1.2] font-extrabold tracking-tight mb-6 lg:mb-8">
                  Você vai pagar... <br/>
                  <span className="text-[#25D366]">ou vai derrubar?</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-outline-variant max-w-none lg:max-w-xl mb-8 lg:mb-12 font-medium leading-relaxed">
                  A Derruba Multas entra pra ganhar.<br/><br/>
                  Grande parte das multas tem erro - e é nisso que a gente trabalha. Cancelamos penalidades de bafômetro, suspensão, cassação e provisória antes que você perca sua CNH.<br/><br/>
                  Avaliação gratuita no WhatsApp.<br/>
                  Especialistas prontos pra agir agora.<br/>
                  Defesa completa até o fim.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                  <div className="flex -space-x-3 sm:-space-x-4">
                    {[
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnEC_ZIOq49cRk7HYo2IA8_hUYhl-BNek3nKLaYjnjh02EdYF3t_WUitKpCZ2L9R038kVngk0RwZ2H6uDRA61XM_39ggay35NaXV81EOHZBdVdjhkGjpAHWz4JY2rLpD0zvNOnE_rIMPvKlQM_muVD64UyvogQWur5p4Zbjb1Q2valQ8HVWyLHVlx1G7__MWw49Yx5mq0KhDvzo3OFOvSDcO-dDM0gknMhKGjdpBBkfaFDt5Cwt5DSjOw8fGLPetw3FotRyjpjpEA",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCk1LLOaVvMEWNi3woJ_Vcka9AhgoamkEBt1gu9kEBLskYBNHCGwlgMu0npkm6FPjIip6zs23IsyehNOrGdV2m9dnqDm0tfEweq4E1BkYeWGCqaMCwyYDE0TRGUzC9ZZlp1PgIeeKo2xbmAMwtniGtFcQqPiy1sRPIj8wsOAkTYQPRzhfcFGJGI7H6fOQwLC1R_o3RlWduGwJOjnkFF7X2sx_5Z6nAd9bD5hbT6L9V1ZRHzS_BP10nm8Nh9P4dRLJF5xlAWqdtW6fk",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuA__jPcply44rI8nElbFOTQ7b9AuGRz1FGgccsnXz2B7M_2EuFRTtqKjEqad5z2dZiupyGLC03PN6l7fgw8kBeUBGuaeUFf-nKkcbIibTFFHSvwUp7G27vcPssI9jVxBPnfIfUt91E9rnv2ss9VIvsl80TeTzHN8cMjEgdbBTbO2vOyfKADRIFJIhSjwcbYpcq--CSo9luH0nTQGt2r0Gs5TskG1VicN353aSO7wh5ELw9RfgAho94vQZccwUUaxcP9eLkKK3zEN6s"
                    ].map((src, i) => (
                      <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-inverse-surface bg-surface-container-highest overflow-hidden">
                        <img src={src} alt="Expert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-surface-container-highest text-center lg:text-left">
                    +5.000 CONDUTORES ATENDIDOS EM TODO O BRASIL
                  </p>
                </div>
              </motion.div>
              <motion.div 
                id="contato"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0"
              >
                <div className="bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl text-inverse-surface">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 tracking-tight">Consulta Gratuita</h3>
                  <form className="space-y-4 sm:space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Nome Completo</label>
                      <input 
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-outline-variant/20 focus:border-primary-fixed focus:ring-0 px-0 py-3 sm:py-2 transition-all outline-none text-base sm:text-lg" 
                        placeholder="Seu nome" 
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">WhatsApp</label>
                      <input 
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-outline-variant/20 focus:border-primary-fixed focus:ring-0 px-0 py-3 sm:py-2 transition-all outline-none text-base sm:text-lg" 
                        placeholder="(00) 00000-0000" 
                        type="tel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Placa do Veículo</label>
                      <input 
                        required
                        value={formData.placa}
                        onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-outline-variant/20 focus:border-primary-fixed focus:ring-0 px-0 py-3 sm:py-2 transition-all outline-none text-base sm:text-lg" 
                        placeholder="ABC-1234" 
                        type="text"
                      />
                    </div>
                    <button className="w-full bg-[#25D366] text-white font-bold py-4 sm:py-5 rounded-lg text-base sm:text-lg lg:text-xl hover:bg-[#128C7E] transition-all mt-6 transform hover:scale-105 active:scale-95" type="submit">
                      Vamos Derrubar?
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section (Bento Grid) */}
        <section className="py-16 md:py-24 lg:py-32 bg-surface" id="processo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 md:mb-16 lg:mb-20 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Serviços <span className="text-primary-fixed bg-inverse-surface px-2">Especializados</span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-base sm:text-lg">Soluções jurídicas e administrativas completas para manter sua regularidade no trânsito.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-6 sm:p-8 lg:p-12 rounded-xl flex flex-col justify-between border-l-4 border-primary-fixed"
              >
                <div>
                  <Gavel className="w-10 h-10 sm:w-12 sm:h-12 text-primary-fixed-dim mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Recurso de Multas</h3>
                  <p className="text-on-surface-variant max-w-none lg:max-w-md leading-relaxed text-sm sm:text-base">Defesa técnica contra infrações indevidas em até 3 instâncias administrativas (Defesa Prévia, JARI e CETRAN). Atuamos desde a análise inicial até a última fase do processo, identificando erros formais e fundamentos legais para aumentar suas chances de sucesso.</p>
                </div>
                <div 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 sm:mt-8 lg:mt-12 flex items-center text-inverse-surface font-bold gap-2 cursor-pointer group text-sm sm:text-base"
                >
                  Saber mais <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-inverse-surface text-surface p-6 sm:p-8 lg:p-12 rounded-xl"
              >
                <IdCard className="w-10 h-10 sm:w-12 sm:h-12 text-primary-fixed mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Suspensão CNH</h3>
                <p className="text-outline-variant leading-relaxed text-sm sm:text-base">Evite a perda definitiva do seu direito de dirigir por excesso de pontos ou bafômetro.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-highest p-6 sm:p-8 lg:p-12 rounded-xl"
              >
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-inverse-surface mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Indicação de Condutor</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">Assessoria para transferência correta de pontuação fora do prazo regulamentar.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-low p-6 sm:p-8 lg:p-12 rounded-xl"
              >
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-inverse-surface mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Assessoria Administrativa</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">Gestão completa de processos e documentos junto ao DETRAN.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-primary-fixed p-6 sm:p-8 lg:p-12 rounded-xl text-on-primary-fixed"
              >
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Certificado Digital</h3>
                <p className="text-on-primary-fixed leading-relaxed text-sm sm:text-base">Emissão de e-CPF e e-CNPJ para facilitar seus trâmites digitais.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-surface-container-lowest" id="vantagens">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="w-12 h-1 sm:w-16 bg-primary-fixed mx-auto md:mx-0"></div>
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-fixed-dim mx-auto md:mx-0" />
              <h3 className="text-xl sm:text-2xl font-bold">Atendimento Rápido</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">Sabemos que multas têm prazos fatais. Nossa equipe responde sua primeira consulta em minutos para não perder tempo.</p>
            </div>
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="w-12 h-1 sm:w-16 bg-primary-fixed mx-auto md:mx-0"></div>
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-fixed-dim mx-auto md:mx-0" />
              <h3 className="text-xl sm:text-2xl font-bold">Especialistas</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">Diferente de escritórios genéricos, somos focados exclusivamente em Direito de Trânsito com alta taxa de sucesso.</p>
            </div>
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="w-12 h-1 sm:w-16 bg-primary-fixed mx-auto md:mx-0"></div>
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-primary-fixed-dim mx-auto md:mx-0" />
              <h3 className="text-xl sm:text-2xl font-bold">Transparência</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">Acompanhe cada etapa do seu processo com clareza. Sem falsas promessas, apenas resultados reais baseados na lei.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 lg:py-32 bg-surface" id="depoimentos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">O Veredito de Quem Confia</h2>
              <p className="text-on-surface-variant text-base sm:text-lg">Veja como ajudamos condutores a manterem sua liberdade.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="evidence-card p-6 sm:p-8">
                <p className="italic text-base sm:text-lg text-inverse-surface mb-6 sm:mb-8 leading-relaxed">"Tive minha CNH suspensa por uma multa injusta de bafômetro. A equipe da DerrubaMultas conseguiu anular o processo em tempo recorde!"</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-outline-variant rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuALK90QSNfrqpx_BsMptxr67mLNCvagQ1gwdbTyrDJaBDF8KMsWsZxghERgDMljwyN5VL07KgcMOcvbCKXLgY2XoQAvDLi-iuXt7N0u0Gi6TujkebDVEn4asDcBqAWDR5PueE7nD2H43MfHJCGWhLW64N-lsvxROJS-mDClCFSbX9p4bg60yjmjsdQFCQde7ZZ3GNjH6qSnPLguDScNzliL6TnDFdzJXCBZOgwND38kJopA9lST3Wk3V0dJdGr9IdwhBTx5qZGgCLg" alt="Ricardo Santos" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base">Ricardo Santos</h4>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tighter">Empresário</p>
                  </div>
                </div>
              </div>
              <div className="evidence-card p-6 sm:p-8">
                <p className="italic text-base sm:text-lg text-inverse-surface mb-6 sm:mb-8 leading-relaxed">"Excelente assessoria. Resolveram o problema de pontuação acumulada que eu nem sabia como lidar. Atendimento muito humano e profissional."</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-outline-variant rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzb_I3cT-4jv13NGKpdiP8O3h8GaHaOvkBMfPAT-VP9hOpjNPUbR5UlBttcj_Vr61dC4mDBUGPGwyQv1VfCO8vzlmkGfxe8Y3tkF9yl0CXVuaJzPzTSy2zz6snUYVOSoaG4i2liUYrnZxs_-3b8GuOZfU47r1rCFapWxMUDnpN2Ng3rkOIvq9IIsVcy7XMTQWf-XIQe34C99j3Hv9LFEGdWuZeuox3CGVEfpLsdHRigChbMgYJ3aAUBGp0f94I3MSQZKrBKWfBFjg" alt="Carla Menezes" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base">Carla Menezes</h4>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tighter">Advogada</p>
                  </div>
                </div>
              </div>
              <div className="evidence-card p-6 sm:p-8">
                <p className="italic text-base sm:text-lg text-inverse-surface mb-6 sm:mb-8 leading-relaxed">"Preço justo e muita competência. Recuperei meu direito de dirigir e não perdi meu emprego de motorista. Recomendo para todos!"</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-outline-variant rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8Uxfgo479weyom9Z20HBEg8ZCeH_jb5HJkZw_YBwqOeMX3W_YNIWj3qAcaWmHqQTlfzUOYgT_whwQfqf50Mhfnc6uJ1lVF5JSJidqpyBnt-W5wyRGjQ69jYO1W7UbMWxLfy7S9PNgKGyudWAG9B2ujETfsDv7DFGNN22-pzX1HbCw6fBbDtN8pA-AlX_TunlbLw_PJXpN_fuYIF_w3Nf94kURshuZy6XvwRJGcoqvF4UJhvUIj3Ktw1-Qnm7VsR2ou3YBtRBI2g" alt="João Pereira" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base">João Pereira</h4>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tighter">Motorista de App</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-surface-container-low" id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Perguntas Frequentes</h2>
              <p className="text-on-surface-variant text-base sm:text-lg">Tire suas dúvidas sobre o processo de recurso.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-surface rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm"
                >
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center text-left hover:bg-surface-container-lowest transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-inverse-surface pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary-fixed-dim" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 text-on-surface-variant leading-relaxed text-sm sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-inverse-surface py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-primary-fixed opacity-10 skew-x-12 translate-x-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
            <div className="max-w-none lg:max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-surface mb-4 sm:mb-6 tracking-tighter leading-tight">Não perca sua CNH. <br/>Fale conosco agora.</h2>
              <p className="text-outline-variant text-base sm:text-lg lg:text-xl">A análise inicial é 100% gratuita e sem compromisso.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button 
                onClick={() => window.open('https://wa.me/5548991003589', '_blank')}
                className="w-full sm:w-auto bg-[#25D366] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-bold hover:bg-[#128C7E] hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Atendimento WhatsApp
              </button>
              <button 
                onClick={() => window.open('tel:+554891003589', '_self')}
                className="w-full sm:w-auto bg-surface text-inverse-surface px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-bold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" /> Ligar agora
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#dfdcdc] w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-400 text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Brand & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-1">
            <img src="/logo.png" alt="DerrubaMultas" className="h-10 sm:h-12 w-auto object-contain mb-4 sm:mb-6" />
            <p className="text-black mb-6 sm:mb-8 max-w-xs text-sm sm:text-base">Especialistas em recursos de multas e suspensão de CNH.</p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </a>
              <a href="#" className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </a>
              <a href="#" className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all">
                <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </a>
              <a href="#" className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all">
                <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-4 sm:mb-6 text-black">Links Úteis</h4>
            <div className="flex flex-col gap-3 sm:gap-4 font-sans text-sm sm:text-base">
              <a className="text-black/70 hover:text-black transition-all" href="#processo">Processo</a>
              <a className="text-black/70 hover:text-black transition-all" href="#vantagens">Vantagens</a>
              <a className="text-black/70 hover:text-black transition-all" href="#depoimentos">Depoimentos</a>
              <a className="text-black/70 hover:text-black transition-all" href="#faq">FAQ</a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-4 sm:mb-6 text-black">Contato</h4>
            <div className="flex flex-col gap-3 sm:gap-4 font-sans text-sm sm:text-base text-black/70">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 text-black" />
                <span className="break-words">derrubamultas2@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MessageCircle className="w-4 h-4 text-black" />
                48 991003589
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 text-black" />
                <span className="break-words">Rua José Ferreira, 101 Sala 04 Tubarão SC.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 md:mt-20 lg:mt-24 pt-6 md:pt-8 border-t border-gray-400 text-center text-black/60 text-xs">
          © 2024 DerrubaMultas. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
