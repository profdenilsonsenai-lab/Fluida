import React, { useMemo } from 'react';
import { Filter, Search, RotateCcw, ShieldCheck } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';

export const CatalogSection: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery,
  } = useConfig();

  // Brands list from published products
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.isPublished) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet);
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isPublished) return false;

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        const matchesSku = product.sku ? product.sku.toLowerCase().includes(q) : false;
        const matchesDesc = product.description.toLowerCase().includes(q);
        return matchesName || matchesBrand || matchesCategory || matchesSku || matchesDesc;
      }

      return true;
    });
  }, [products, selectedCategory, selectedBrand, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#F8FBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
              Catálogo de Produtos e Equipamentos
            </div>
            <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
              Vitrine de Produtos Confirmados
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Equipamentos autênticos das marcas AstralPool, Zodiac, Cepex e Fluidra. Verifique as especificações técnicas e acesse o canal de compra correspondente.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#35C6A4]" />
            <span>Dados técnicos verificados com fabricante</span>
          </div>
        </div>

        {/* Filter Toolbar (Segmented Controls per anti-slop rules) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
          {/* Top row: Brand selector & Results count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Marca / Fabricante:
              </span>
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'bg-[#073B66] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                Todas
              </button>
              {availableBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-[#073B66] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </div>
          </div>

          {/* Category Tabs Scrollable Horizontal Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#00A6D6] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Todas as categorias
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#00A6D6] text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#073B66]">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Não encontramos nenhum equipamento correspondente aos filtros selecionados.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#073B66] text-white text-xs font-semibold rounded-lg hover:bg-[#063053] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros e busca</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
