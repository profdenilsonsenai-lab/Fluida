import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Building2 } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const LegalModals: React.FC = () => {
  const { activeLegalModal, closeLegalModal, config } = useConfig();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLegalModal();
    };
    if (activeLegalModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeLegalModal, closeLegalModal]);

  if (!activeLegalModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeLegalModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FBFC]">
          <div className="flex items-center gap-2">
            {activeLegalModal === 'privacidade' && (
              <ShieldCheck className="w-5 h-5 text-[#00A6D6]" />
            )}
            {activeLegalModal === 'termos' && (
              <FileText className="w-5 h-5 text-[#00A6D6]" />
            )}
            {activeLegalModal === 'empresa' && (
              <Building2 className="w-5 h-5 text-[#00A6D6]" />
            )}
            <h3 className="text-base font-bold text-[#073B66]">
              {activeLegalModal === 'privacidade' && 'Política de Privacidade'}
              {activeLegalModal === 'termos' && 'Termos de Uso e Isenção de Responsabilidade'}
              {activeLegalModal === 'empresa' && 'Informações Institucionais & Transparência'}
            </h3>
          </div>

          <button
            onClick={closeLegalModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeLegalModal === 'privacidade' && (
            <>
              <p>
                A <strong>FLUIDA</strong> respeita a privacidade de seus visitantes e atua em conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                1. Coleta e Uso de Informações
              </h4>
              <p>
                Este portal opera como uma vitrine digital informativa. Não coletamos dados bancários, números de cartões de crédito ou senhas de pagamento neste sítio eletrônico. Quaisquer comunicações iniciadas pelo usuário via WhatsApp são tratadas diretamente pela equipe de atendimento da FLUIDA estritamente para sanar dúvidas comerciais e técnicas.
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                2. Direcionamento para Plataformas Terceiras
              </h4>
              <p>
                Ao clicar em links de compra direcionados a marketplaces (Mercado Livre, Shopee, Magazine Luiza e TikTok Shop), a navegação e a eventual transação passam a ser regidas pelas respectivas Políticas de Privacidade e Termos de Uso das plataformas receptoras.
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                3. Cookies e Tecnologias de Navegação
              </h4>
              <p>
                Utilizamos armazenamento local exclusivamente para memorizar preferências de filtros e configurações informadas pelo operador da página, sem rastreamento intrusivo de dados pessoais sensíveis.
              </p>
            </>
          )}

          {activeLegalModal === 'termos' && (
            <>
              <p>
                Bem-vindo à vitrine digital da <strong>FLUIDA</strong>. Ao navegar por este sítio, você concorda com os termos aqui apresentados.
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                1. Natureza do Serviço e Modelo de Negócio
              </h4>
              <p>
                A FLUIDA atua como vitrine de divulgação e encaminhamento comercial. O site não realiza processamento próprio de pagamentos, cobrança por cartão de crédito ou emissão de pedidos no frontend nesta fase. Todas as compras são concluídas diretamente no marketplace parceiro escolhido pelo consumidor.
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                2. Marcas e Direitos de Propriedade
              </h4>
              <p>
                As marcas Fluidra, AstralPool, Zodiac e Cepex são marcas registradas de seus respectivos detentores e fabricantes. A FLUIDA divulga produtos e especificações técnicas dessas linhas de forma independente, sem alegar representação exclusiva ou vínculo societário além das relações comerciais de revenda e divulgação autorizadas.
              </p>
              <h4 className="font-semibold text-[#073B66] text-sm pt-2">
                3. Preços e Disponibilidade de Estoque
              </h4>
              <p>
                Preços, promoções, cupons de desconto, prazos e políticas de frete são de responsabilidade soberana de cada marketplace e de suas lojas vendedoras, podendo oscilar em tempo real.
              </p>
            </>
          )}

          {activeLegalModal === 'empresa' && (
            <>
              <p>
                A <strong>FLUIDA</strong> é uma marca brasileira concebida para aproximar o proprietário de piscina e os profissionais do setor aos melhores equipamentos do mercado.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-500">Razão Social / Marca:</span>{' '}
                  <span className="font-medium text-slate-800">{config.companyName}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Situação Cadastral:</span>{' '}
                  <span className="font-medium text-slate-800">{config.cnpj}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Horário de Atendimento:</span>{' '}
                  <span className="font-medium text-slate-800">{config.supportHours}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Canal Principal:</span>{' '}
                  <span className="font-medium text-slate-800">
                    WhatsApp Comercial ({config.whatsAppNumber ? `+${config.whatsAppNumber}` : 'Configuração em andamento'})
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-xs">
                Para solicitar informações institucionais, esclarecimento sobre produtos cadastrados ou parcerias comerciais, entre em contato através dos nossos canais de suporte.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeLegalModal}
            className="px-4 py-2 bg-[#073B66] hover:bg-[#063053] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
