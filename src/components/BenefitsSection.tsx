import React from 'react';
import { Layers, FileCheck, Store, MessageCircle } from 'lucide-react';

const BENEFITS = [
  {
    icon: Layers,
    title: 'Produtos organizados por necessidade',
    description: 'Encontre rapidamente o equipamento ideal para circulação, filtração, tratamento químico, aquecimento ou robôs de aspiração.',
  },
  {
    icon: FileCheck,
    title: 'Informações para ajudar na escolha',
    description: 'Especificações técnicas conferidas com os fabricantes (vazão, potência, compatibilidade) sem promessas exageradas.',
  },
  {
    icon: Store,
    title: 'Acesso aos canais de compra disponíveis',
    description: 'Direcionamento direto aos marketplaces cadastrados (Mercado Livre, Shopee, Magalu e TikTok Shop) com segurança de pagamento.',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento para esclarecer dúvidas',
    description: 'Suporte dedicado via WhatsApp para tirar dúvidas antes de fechar a compra e auxiliar no dimensionamento do seu projeto.',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
            Por que escolher a FLUIDA
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
            Mais facilidade para cuidar da sua piscina.
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Unimos curadoria técnica especializada e transparência comercial para que você encontre os produtos certos sem complicação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col space-y-3 p-5 rounded-xl bg-slate-50/60 border border-slate-200/60 hover:border-[#00A6D6]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8F7FC] text-[#073B66] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00A6D6]" />
                </div>
                <h3 className="text-base font-semibold text-[#073B66] leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
