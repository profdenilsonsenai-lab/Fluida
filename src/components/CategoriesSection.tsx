import React from 'react';
import {
  Gauge,
  Filter,
  FlaskConical,
  Sparkles,
  Cpu,
  Flame,
  SunMedium,
  Droplet,
  GitCommit,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useConfig } from '../context/ConfigContext';
import { ProductCategory } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Gauge,
  Filter,
  FlaskConical,
  Sparkles,
  Cpu,
  Flame,
  SunMedium,
  Droplet,
  GitCommit,
  Wrench,
};

export const CategoriesSection: React.FC = () => {
  const { products, setSelectedCategory, selectedCategory } = useConfig();

  const handleCategorySelect = (categoryId: ProductCategory) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Count active products per category
  const getProductCount = (catId: ProductCategory) => {
    return products.filter((p) => p.category === catId && p.isPublished).length;
  };

  return (
    <section id="categorias" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
              Navegação por Linha de Equipamentos
            </div>
            <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
              Categorias em Destaque
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Navegue pelas soluções técnicas desenvolvidas para circulação, filtração, tratamento e automação da sua piscina.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            {CATEGORIES.length} linhas de soluções especializadas
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Filter;
            const count = getProductCount(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between min-h-[140px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F7FC] border-[#00A6D6] shadow-sm'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-[#00A6D6]/40 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#00A6D6] text-white'
                          : 'bg-[#E8F7FC] text-[#073B66] group-hover:bg-[#00A6D6] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <span className="text-[11px] font-medium text-slate-400">
                      {count > 0 ? `${count} ${count === 1 ? 'item' : 'itens'}` : 'Em expansão'}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-[#073B66] group-hover:text-[#00A6D6] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="truncate pr-1">{count > 0 ? 'Ver catálogo' : 'Consultar'}</span>
                  <ArrowRight className="w-3 h-3 text-[#00A6D6] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
