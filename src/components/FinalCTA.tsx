import React from 'react';
import { MessageCircle, HelpCircle, PhoneCall } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const FinalCTA: React.FC = () => {
  const { triggerWhatsApp } = useConfig();

  return (
    <section className="py-16 sm:py-20 bg-[#073B66] text-white relative overflow-hidden">
      {/* Decorative subtle fluid shapes */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#00A6D6]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#35C6A4]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#35C6A4]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Atendimento Consultivo</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white tracking-tight">
          Precisa de ajuda para escolher?
        </h2>

        <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
          Fale com a FLUIDA e encontre o caminho para os produtos que sua piscina precisa. Nossa equipe está pronta para orientar seu projeto.
        </p>

        <div className="pt-2">
          <button
            onClick={() => triggerWhatsApp()}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#00A6D6] hover:bg-[#0091bb] active:bg-[#007da1] text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>CONVERSAR PELO WHATSAPP</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-300">
          Atendimento de segunda a sexta, das 08h às 18h. Sem mensagens automatizadas invasivas.
        </p>
      </div>
    </section>
  );
};
