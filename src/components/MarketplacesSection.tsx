import React from 'react';
import { ExternalLink, ShieldCheck, CreditCard, QrCode, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { MarketplaceId } from '../types';

export const MarketplacesSection: React.FC = () => {
  const { config, openConfigDrawer } = useConfig();

  const marketplaceList: Array<{
    id: MarketplaceId;
    name: string;
    description: string;
    color: string;
    badgeBg: string;
    textColor: string;
  }> = [
    {
      id: 'mercadoLivre',
      name: 'Mercado Livre',
      description: 'Lojas parceiras com logística rápida e garantia de entrega.',
      color: '#FFE600',
      badgeBg: '#FFFBD4',
      textColor: '#2D3277',
    },
    {
      id: 'shopee',
      name: 'Shopee',
      description: 'Canais com opções de cupons e facilidades no aplicativo.',
      color: '#EE4D2D',
      badgeBg: '#FEECE8',
      textColor: '#D03B1E',
    },
    {
      id: 'magalu',
      name: 'Magazine Luiza',
      description: 'Ampla rede varejista nacional e suporte ao cliente.',
      color: '#0086FF',
      badgeBg: '#EBF4FF',
      textColor: '#0070D6',
    },
    {
      id: 'tiktokShop',
      name: 'TikTok Shop',
      description: 'Experiência de descoberta dinâmica com vídeos de aplicação prática.',
      color: '#000000',
      badgeBg: '#F1F5F9',
      textColor: '#0F172A',
    },
  ];

  return (
    <section id="marketplaces" className="py-16 sm:py-24 bg-[#F8FBFC] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
            Canais de Venda Conectados
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
            Compre FLUIDA nos canais disponíveis.
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Selecione a sua plataforma de marketplace de preferência para consultar disponibilidade imediata, calcular frete para sua localidade e concluir sua compra com segurança.
          </p>
        </div>

        {/* Marketplaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceList.map((mp) => {
            const currentConfig = config.marketplaces[mp.id];
            const hasValidUrl = currentConfig && currentConfig.storeUrl.trim().length > 0;

            return (
              <div
                key={mp.id}
                className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold"
                      style={{ backgroundColor: mp.badgeBg, color: mp.textColor }}
                    >
                      {mp.name}
                    </span>

                    {hasValidUrl ? (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Disponível
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        Em ativação
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-[#073B66] mb-1.5">
                    Loja no {mp.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {mp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  {hasValidUrl ? (
                    <a
                      href={currentConfig.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#073B66] hover:bg-[#063053] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Acessar vitrine no canal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={openConfigDrawer}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        title="Vincular URL oficial da loja"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A6D6]" />
                        <span>Configurar link do canal</span>
                      </button>
                      <span className="block text-[10px] text-center text-slate-400">
                        Aguardando URL oficial validada
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Payment & Checkout Notice (Section 10 Compliance) */}
        <div className="mt-10 p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8F7FC] text-[#073B66] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#00A6D6]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-[#073B66]">
                  Transparência de Pagamentos e Finalização de Pedidos
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  A FLUIDA atua como vitrine digital e não realiza cobrança direta nesta etapa. Todas as opções de pagamento via <strong className="text-slate-800">PIX</strong>, <strong className="text-slate-800">Boleto</strong> e <strong className="text-slate-800">Cartão de Crédito</strong> (incluindo parcelamento) são processadas exclusivamente dentro do ambiente seguro de cada marketplace parceiro selecionado.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-center sm:self-auto text-xs text-slate-500">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <QrCode className="w-3.5 h-3.5 text-[#073B66]" />
                <span className="font-medium">PIX Direto</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <CreditCard className="w-3.5 h-3.5 text-[#073B66]" />
                <span className="font-medium">Cartão nos Marketplaces</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
