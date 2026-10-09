import React from 'react';
import {
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  Store,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useConfig } from '../context/ConfigContext';
import { CATEGORIES } from '../data/categories';
import { MarketplaceId } from '../types';

export const Footer: React.FC = () => {
  const {
    config,
    triggerWhatsApp,
    openLegalModal,
    openConfigDrawer,
    setSelectedCategory,
    openAdvisoryModal,
    openTrainingModal,
  } = useConfig();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only active marketplaces
  const activeMarketplaces = (['mercadoLivre', 'shopee', 'magalu', 'tiktokShop'] as MarketplaceId[])
    .map((id) => config.marketplaces[id])
    .filter((mp) => Boolean(mp && mp.storeUrl && mp.storeUrl.trim().length > 0));

  // Only active socials
  const activeSocials = [
    { key: 'instagram', icon: Instagram, url: config.socialLinks.instagram, label: 'Instagram' },
    { key: 'facebook', icon: Facebook, url: config.socialLinks.facebook, label: 'Facebook' },
    { key: 'youtube', icon: Youtube, url: config.socialLinks.youtube, label: 'YouTube' },
  ].filter((s) => Boolean(s.url && s.url.trim().length > 0));

  return (
    <footer className="bg-[#073B66] text-white border-t border-slate-800">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo light size="lg" showTagline />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              A <strong>FLUIDA</strong> é uma vitrine digital especializada que facilita a escolha de equipamentos e insumos de alta tecnologia para piscinas, conectando você aos canais de compra nos principais marketplaces.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1.5">
              <p>
                <strong className="text-white">Mensagem:</strong> “{config.tagline}”
              </p>
              <p className="text-[#35C6A4]">
                Produtos originais das linhas Fluidra, AstralPool, Zodiac e Cepex.
              </p>
            </div>

            {/* Social links (only shown if configured) */}
            {activeSocials.length > 0 && (
              <div className="pt-3 flex items-center gap-3">
                <span className="text-xs text-slate-400">Siga a FLUIDA:</span>
                {activeSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#00A6D6] text-white flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Col 3: Categorias principais */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Categorias
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#00A6D6] transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Soluções & Serviços Técnicos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Serviços & Cursos
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={openAdvisoryModal}
                  className="hover:text-[#35C6A4] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Assessoria Técnica Especializada</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openTrainingModal}
                  className="hover:text-[#35C6A4] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Treinamentos & Cursos</span>
                </button>
              </li>
              <li className="pt-2 border-t border-white/10">
                <a
                  href="#guia"
                  className="text-[#35C6A4] hover:underline font-semibold block"
                >
                  Acessar Guia da Piscina
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Atendimento & Canais */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atendimento Oficial
            </h4>

            <div className="space-y-2">
              <button
                onClick={() => triggerWhatsApp()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00A6D6] hover:bg-[#0091bb] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chamar no WhatsApp</span>
              </button>

              <span className="text-[11px] text-slate-400 block text-center">
                {config.supportHours}
              </span>
            </div>

            {/* Active Marketplaces list */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                Marketplaces Vinculados:
              </span>
              {activeMarketplaces.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-300">
                  {activeMarketplaces.map((mp) => (
                    <li key={mp.id}>
                      <a
                        href={mp.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white flex items-center gap-1.5"
                      >
                        <Store className="w-3.5 h-3.5 text-[#00A6D6]" />
                        <span>Loja no {mp.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Lojas em processo de validação de link.
                </p>
              )}
            </div>

            {/* Config panel trigger */}
            <div className="pt-2">
              <button
                onClick={openConfigDrawer}
                className="text-xs text-[#35C6A4] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Painel de Canais & Configuração</span>
              </button>
            </div>
          </div>
        </div>

        {/* Institutional & Legal Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} <strong>FLUIDA</strong>. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-500">
              Vitrine digital independente. As marcas Fluidra, AstralPool, Zodiac e Cepex pertencem aos seus respectivos titulares.
            </p>
          </div>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button
              onClick={() => openLegalModal('privacidade')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => openLegalModal('termos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              onClick={() => openLegalModal('empresa')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Dados da Empresa
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
