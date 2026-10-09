import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Hero: React.FC = () => {
  const { triggerWhatsApp, setSelectedCategory } = useConfig();

  const scrollToCatalog = () => {
    setSelectedCategory('all');
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#073B66]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_crystal_pool_1791514727848.jpg"
          alt="Piscina residencial contemporânea com água límpida e cristalina"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Gradients ensuring 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#073B66]/95 via-[#073B66]/80 to-[#073B66]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#073B66] via-transparent to-transparent opacity-80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl text-white space-y-6">
          {/* Subtle unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#35C6A4] uppercase">
            <span>Vitrine Digital Especializada</span>
            <span aria-hidden="true">·</span>
            <span>Marcas Fluidra</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-['Plus_Jakarta_Sans',sans-serif] font-extrabold tracking-tight text-white leading-tight">
            Tudo para sua piscina.{' '}
            <span className="text-[#00A6D6] block sm:inline">
              Do cuidado aos melhores momentos.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
            Descubra equipamentos e produtos para cuidar da água, facilitar a manutenção e
            aproveitar sua piscina com tranquilidade.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00A6D6] hover:bg-[#0091bb] active:bg-[#007da1] text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-150 cursor-pointer text-center group"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>EXPLORAR PRODUTOS</span>
            </button>

            <button
              onClick={() => triggerWhatsApp()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 active:bg-white/30 text-white font-semibold text-sm rounded-lg backdrop-blur-xs transition-all duration-150 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
              <span>FALAR COM UM ESPECIALISTA</span>
            </button>
          </div>

          {/* Trust Pillars */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#35C6A4] shrink-0" />
              <span>Especificações técnicas verificadas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#35C6A4] shrink-0" />
              <span>Canais de compra nos marketplaces</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#35C6A4] shrink-0" />
              <span>Atendimento e dúvidas via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll prompt */}
      <div className="relative z-10 pb-6 hidden md:flex justify-center">
        <button
          onClick={scrollToCatalog}
          className="text-white/60 hover:text-white transition-colors flex flex-col items-center gap-1 text-xs cursor-pointer"
        >
          <span>Conheça os produtos</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
