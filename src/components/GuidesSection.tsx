import React from 'react';
import { BookOpen, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import { GUIDES } from '../data/guides';
import { useConfig } from '../context/ConfigContext';

export const GuidesSection: React.FC = () => {
  const { openGuideModal } = useConfig();

  return (
    <section id="guia" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
              Conteúdo Técnico & Prático
            </div>
            <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
              Guia da Piscina
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Orientações objetivas para planejar o dimensionamento da casa de máquinas, prolongar a vida útil dos equipamentos e manter a água limpa com economia.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            {GUIDES.length} artigos fundamentais
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => openGuideModal(guide.id)}
              className="group bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#00A6D6]/50 p-6 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <div>
                {/* Meta header (zero-pill: unboxed text with middle dot) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-[#00A6D6]">{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{guide.readingTime}</span>
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#073B66] group-hover:text-[#00A6D6] transition-colors leading-snug mb-3">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#073B66] group-hover:text-[#00A6D6]">
                <span>Ler artigo completo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
