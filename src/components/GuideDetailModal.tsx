import React, { useEffect } from 'react';
import { X, Clock, Lightbulb, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { GUIDES } from '../data/guides';

export const GuideDetailModal: React.FC = () => {
  const { activeGuideModal, closeGuideModal, setSelectedCategory } = useConfig();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGuideModal();
    };
    if (activeGuideModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeGuideModal, closeGuideModal]);

  if (!activeGuideModal) return null;

  const article = GUIDES.find((g) => g.id === activeGuideModal);
  if (!article) return null;

  const handleViewRelatedCategory = (catId: string) => {
    setSelectedCategory(catId);
    closeGuideModal();
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeGuideModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FBFC]">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#00A6D6]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <button
            onClick={closeGuideModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Fechar artigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#073B66] leading-snug">
            {article.title}
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Practical Tips Box */}
          <div className="p-4 bg-[#E8F7FC] rounded-xl border border-[#00A6D6]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#073B66]">
              <Lightbulb className="w-4 h-4 text-[#00A6D6]" />
              <span>Dicas e Boas Práticas do Especialista:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {article.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4] mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Categories Actions */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Equipamentos Relacionados a Este Assunto:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.relatedCategories.map((catId) => (
                <button
                  key={catId}
                  onClick={() => handleViewRelatedCategory(catId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#073B66] text-slate-700 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ver produtos desta categoria</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Guia Educativo FLUIDA — Piscinas com Mais Praticidade</span>
          <button
            onClick={closeGuideModal}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Concluir leitura
          </button>
        </div>
      </div>
    </div>
  );
};
