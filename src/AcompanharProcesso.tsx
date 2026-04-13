import React, { useState } from 'react';
import { Search, ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, Calendar, User, Car } from 'lucide-react';
import { motion } from 'motion/react';

export default function AcompanharProcesso() {
  const [formData, setFormData] = useState({
    cpf: '',
    placa: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  // Função para determinar cor e estilo do status
  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; dot: string } } = {
      'Novo': {
        bg: 'bg-surface-container-highest',
        text: 'text-on-surface-variant',
        dot: 'bg-outline-variant'
      },
      'Em análise': {
        bg: 'bg-primary-fixed/10',
        text: 'text-primary-fixed-dim',
        dot: 'bg-primary-fixed-dim'
      },
      'Em recurso': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        dot: 'bg-blue-700'
      },
      'Finalizado': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        dot: 'bg-green-700'
      }
    };

    return statusMap[status] || statusMap['Novo'];
  };

  // Dados fake do processo simulado
  const fakeProcessData = {
    nome: "João Silva",
    placa: "ABC-1234",
    status: "Em análise",
    created_at: "2026-04-10",
    descricao: "Recurso de multa por excesso de velocidade",
    etapa: "Análise documental",
    proxima_etapa: "Defesa prévia",
    prazo_proxima_etapa: "2026-04-25",
    historico: [
      {
        data: "2026-04-10",
        descricao: "Processo iniciado - Recebimento da notificação de multa"
      },
      {
        data: "2026-04-12", 
        descricao: "Documentação do cliente coletada e análise preliminar iniciada"
      },
      {
        data: "2026-04-15",
        descricao: "Defesa prévia elaborada e protocolada no órgão de trânsito"
      },
      {
        data: "2026-04-18",
        descricao: "Aguardando resposta da JARI - Prazo estimado: 30 dias"
      }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de busca com validação
    setTimeout(() => {
      // Validar CPF e Placa
      const cpfValido = formData.cpf.replace(/[^0-9]/g, '') === '12345678900';
      const placaValida = formData.placa.toUpperCase() === 'ABC-1234';
      
      if (cpfValido && placaValida) {
        setSearchResult({
          found: true,
          data: fakeProcessData
        });
      } else {
        setSearchResult({
          found: false,
          message: 'Nenhum processo encontrado para os dados informados.'
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="glass-nav">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20 gap-x-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <img src="/logo.png" alt="DerrubaMultas" className="h-12 w-auto object-contain" />
        </nav>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-2xl mx-auto px-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-inverse-surface">
              Acompanhe seu <span className="text-primary-fixed">processo</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-medium">
              Consulte o andamento do seu recurso de multa
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  CPF
                </label>
                <input 
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-outline-variant/20 focus:border-primary-fixed focus:ring-0 px-0 py-3 transition-all outline-none text-lg"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Placa do Veículo
                </label>
                <input 
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-outline-variant/20 focus:border-primary-fixed focus:ring-0 px-0 py-3 transition-all outline-none text-lg"
                  placeholder="ABC-1234"
                  maxLength={8}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-fixed text-on-primary-fixed font-bold py-4 rounded-lg text-lg hover:bg-primary-fixed-dim transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin"></div>
                    Consultando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Consultar
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          {searchResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {searchResult.found ? (
                // Resultado encontrado - card profissional com informações essenciais
                <div className="bg-surface-container-lowest border border-primary-fixed/20 rounded-xl shadow-lg overflow-hidden">
                  {/* Header do card */}
                  <div className="bg-primary-fixed p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-on-primary-fixed" />
                      <h3 className="text-xl font-bold text-on-primary-fixed">Processo encontrado</h3>
                    </div>
                  </div>
                  
                  {/* Conteúdo do card */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-on-surface-variant mb-1">Nome do cliente</p>
                          <p className="text-lg font-semibold text-inverse-surface">{searchResult.data.nome}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-on-surface-variant mb-1">Placa do veículo</p>
                          <p className="text-lg font-semibold text-inverse-surface">{searchResult.data.placa}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-on-surface-variant mb-1">Status do caso</p>
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getStatusBadge(searchResult.data.status).bg}`}>
                            <div className={`w-2 h-2 rounded-full ${getStatusBadge(searchResult.data.status).dot} ${searchResult.data.status === 'Em análise' ? 'animate-pulse' : ''}`}></div>
                            <p className={`text-sm font-semibold ${getStatusBadge(searchResult.data.status).text}`}>
                              {searchResult.data.status}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-on-surface-variant mb-1">Data de criação</p>
                          <p className="text-lg font-semibold text-inverse-surface">{searchResult.data.created_at}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seção de Histórico - Timeline Vertical */}
                    <div className="border-t border-outline-variant/20 pt-6">
                      <h4 className="text-lg font-bold text-inverse-surface mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-fixed-dim" />
                        Histórico do Processo
                      </h4>
                      
                      <div className="relative">
                        {/* Linha vertical da timeline */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-fixed/20"></div>
                        
                        {/* Itens da timeline */}
                        <div className="space-y-6">
                          {searchResult.data.historico.map((item: any, index: number) => (
                            <div key={index} className="relative flex items-start gap-4">
                              {/* Círculo do item */}
                              <div className="relative z-10 w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 bg-on-primary-fixed rounded-full"></div>
                              </div>
                              
                              {/* Conteúdo do item */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-primary-fixed-dim mb-1">
                                  {item.data}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed">
                                  {item.descricao}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Resultado não encontrado
                <div className="bg-error-container/10 border border-error-container/30 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-error mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-error mb-2">Processo não encontrado</h3>
                      <p className="text-on-surface-variant">
                        {searchResult.message}
                      </p>
                      <div className="mt-4 p-4 bg-surface-container-low rounded-lg">
                        <p className="text-sm text-on-surface-variant">
                          <strong>Dica:</strong> Verifique se os dados foram digitados corretamente ou entre em contato com nosso suporte.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-fixed/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-fixed-dim" />
              </div>
              <h3 className="font-bold text-inverse-surface mb-2">Documentos</h3>
              <p className="text-sm text-on-surface-variant">
                Acesse todos os documentos do seu processo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-fixed/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-fixed-dim" />
              </div>
              <h3 className="font-bold text-inverse-surface mb-2">Prazos</h3>
              <p className="text-sm text-on-surface-variant">
                Acompanhe os prazos importantes do seu recurso
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-fixed/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-fixed-dim" />
              </div>
              <h3 className="font-bold text-inverse-surface mb-2">Resultados</h3>
              <p className="text-sm text-on-surface-variant">
                Visualize o andamento e resultados do processo
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
