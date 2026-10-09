import React, { useState, useEffect } from 'react';
import {
  Search,
  MessageCircle,
  Menu,
  X,
  SlidersHorizontal,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  Layers,
  HelpCircle,
  ExternalLink,
  ClipboardCheck,
  GraduationCap,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useConfig } from '../context/ConfigContext';
import { CATEGORIES } from '../data/categories';
import { ANNOUNCEMENT_MESSAGES } from '../data/config';

export const Header: React.FC = () => {
  const {
    config,
    triggerWhatsApp,
    openConfigDrawer,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    openAdvisoryModal,
    openTrainingModal,
  } = useConfig();

  const [messageIdx, setMessageIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Rotate announcement bar subtly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    setSelectedCategory('all');
    setMobileMenuOpen(false);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter only active social links
  const activeSocials = [
    { key: 'instagram', icon: Instagram, url: config.socialLinks.instagram, label: 'Instagram' },
    { key: 'facebook', icon: Facebook, url: config.socialLinks.facebook, label: 'Facebook' },
    { key: 'youtube', icon: Youtube, url: config.socialLinks.youtube, label: 'YouTube' },
  ].filter((s) => Boolean(s.url && s.url.trim().length > 0));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 4.1 Barra superior discreta */}
      <div className="bg-[#073B66] text-[#E8F7FC] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4] shrink-0" aria-hidden="true" />
            <p className="font-medium text-xs truncate transition-opacity duration-300">
              {ANNOUNCEMENT_MESSAGES[messageIdx]}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs shrink-0 text-slate-300">
            {activeSocials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                  aria-label={social.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{social.label}</span>
                </a>
              );
            })}

            {/* Acesso ao painel administrativo de links */}
            <button
              onClick={openConfigDrawer}
              className="text-[#35C6A4] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Configurar WhatsApp, Marketplaces e Dados da Loja"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Painel de Canais</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4.2 Cabeçalho Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6D6] rounded-md"
            aria-label="FLUIDA - Página Inicial"
          >
            <BrandLogo size="md" showTagline />
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar motobombas, filtros, robôs, LED..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-[#263746] rounded-lg border border-slate-200 focus:border-[#00A6D6] focus:ring-2 focus:ring-[#00A6D6]/20 transition-all outline-hidden placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1.5 py-0.5"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#263746]">
            {/* Dropdown Categorias */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#073B66] transition-colors py-2 whitespace-nowrap cursor-pointer"
                aria-expanded={categoryDropdownOpen}
              >
                <span>Categorias</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {categoryDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Equipamentos e Insumos
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#073B66] hover:bg-[#E8F7FC] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={scrollToCatalog}
              className="text-slate-700 hover:text-[#073B66] transition-colors whitespace-nowrap cursor-pointer"
            >
              Ver produtos
            </button>

            {/* Botão Assessoria */}
            <button
              onClick={openAdvisoryModal}
              className="text-slate-700 hover:text-[#073B66] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              title="Solicite assessoria técnica especializada"
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-[#35C6A4]" />
              <span>Assessoria</span>
            </button>

            {/* Botão Treinamento */}
            <button
              onClick={openTrainingModal}
              className="text-slate-700 hover:text-[#073B66] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              title="Conheça nossos treinamentos e capacitações"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#00A6D6]" />
              <span>Treinamento</span>
            </button>

            <button
              onClick={() => scrollToSection('marketplaces')}
              className="text-slate-700 hover:text-[#073B66] transition-colors whitespace-nowrap cursor-pointer"
            >
              Marketplaces
            </button>

            <button
              onClick={() => scrollToSection('guia')}
              className="text-slate-700 hover:text-[#073B66] transition-colors whitespace-nowrap cursor-pointer"
            >
              Guia da piscina
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Contact CTA */}
            <button
              onClick={() => triggerWhatsApp()}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#073B66] hover:bg-[#063053] active:bg-[#052542] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              title="Atendimento via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
              <span className="hidden sm:inline">Atendimento</span> WhatsApp
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar motobombas, filtros, robôs..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-sm text-[#263746] rounded-lg border border-slate-200 focus:border-[#00A6D6] outline-hidden placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-3">
          <div className="space-y-1">
            <button
              onClick={scrollToCatalog}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-[#E8F7FC] flex items-center justify-between"
            >
              <span>Ver todos os produtos</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollToSection('marketplaces')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-[#E8F7FC] flex items-center justify-between"
            >
              <span>Canais e Marketplaces</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollToSection('guia')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-[#E8F7FC] flex items-center justify-between"
            >
              <span>Guia da Piscina</span>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </button>

            {/* Ações Técnicas e Serviços no Mobile */}
            <div className="pt-2 grid grid-cols-1 gap-1.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdvisoryModal();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-[#35C6A4]" />
                  <span>Assessoria Técnica Especializada</span>
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTrainingModal();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#00A6D6]" />
                  <span>Treinamentos & Capacitação</span>
                </span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Categorias
            </p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="text-left text-xs text-slate-600 hover:text-[#073B66] hover:bg-slate-50 py-1.5 px-3 rounded-md truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConfigDrawer();
              }}
              className="text-xs text-[#073B66] font-medium flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-[#E8F7FC]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A6D6]" />
              <span>Painel de Canais & Configuração</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
