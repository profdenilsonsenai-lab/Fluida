import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  MessageCircle,
  Store,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { MarketplaceId } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductModal,
    closeProductModal,
    config,
    triggerWhatsApp,
  } = useConfig();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductModal();
    };
    if (activeProductModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeProductModal, closeProductModal]);

  if (!activeProductModal) return null;

  const product = activeProductModal;

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + `#produto-${product.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBuyMarketplace = (linkUrl: string, marketplaceId: MarketplaceId) => {
    const mpConfig = config.marketplaces[marketplaceId];
    const destination = linkUrl || (mpConfig ? mpConfig.storeUrl : '');

    if (destination && destination.trim().length > 0) {
      window.open(destination, '_blank', 'noopener,noreferrer');
    } else {
      triggerWhatsApp(product.name);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeProductModal}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FBFC]">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#073B66]">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryName}</span>
            {product.sku && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-400">SKU: {product.sku}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Copiar link do produto"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={closeProductModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              aria-label="Fechar detalhes do produto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-4/3 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-200/70 flex items-center justify-center">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-16 h-14 rounded-lg overflow-hidden border transition-all ${
                        selectedImgIdx === idx
                          ? 'border-[#00A6D6] ring-2 ring-[#00A6D6]/30'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Informative guarantee and authenticity notice */}
              <div className="p-3.5 bg-[#E8F7FC] rounded-xl text-xs text-[#073B66] space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A6D6]" />
                  <span>Item com Garantia do Fabricante</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Equipamento original {product.brand}. Suporte técnico, manuais de instalação e condições de entrega asseguradas pelo marketplace selecionado.
                </p>
              </div>
            </div>

            {/* Right: Product Purchase Module (Contiguous PDP per guidelines) */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#073B66] leading-snug">
                  {product.name}
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Purchase conditions */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500 font-medium">Preço nos Canais:</span>
                  {product.price ? (
                    <span className="text-lg font-bold text-[#073B66] tabular-nums">
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-600 italic">
                      Consulte o preço no canal de compra
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pagamento via <strong className="text-slate-700">PIX</strong> ou{' '}
                  <strong className="text-slate-700">Cartão de Crédito</strong> disponível conforme a política de cada marketplace parceiro.
                </p>

                {/* Marketplace Buy Options */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Canais de Compra Disponíveis:
                  </span>
                  {product.marketplaceLinks.map((link) => {
                    const mp = config.marketplaces[link.marketplaceId];
                    if (!mp) return null;
                    return (
                      <button
                        key={link.marketplaceId}
                        onClick={() => handleBuyMarketplace(link.url, link.marketplaceId)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-[#E8F7FC] border border-slate-200 hover:border-[#00A6D6] rounded-xl text-xs font-semibold text-[#073B66] transition-all cursor-pointer shadow-2xs"
                      >
                        <span className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-[#00A6D6]" />
                          <span>Comprar via {mp.name}</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    );
                  })}
                </div>

                {/* WhatsApp Consultation Action */}
                <div className="pt-2">
                  <button
                    onClick={() => triggerWhatsApp(product.name)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#073B66] hover:bg-[#063053] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
                    <span>Dúvidas? Consultar pelo WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications & Applications Tabs */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Specifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#073B66] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00A6D6]" />
                <span>Especificações Técnicas Confirmadas</span>
              </h3>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 divide-y divide-slate-200/60 text-xs">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="py-2 flex items-baseline justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-[#073B66] font-semibold text-right tabular-nums">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications & Guidelines */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#073B66] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C6A4]" />
                  <span>Aplicações Recomendadas</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6] mt-1.5 shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.compatibility && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1">
                  <span className="font-semibold text-slate-700 block">Compatibilidade:</span>
                  <p className="text-slate-600 leading-relaxed">{product.compatibility}</p>
                </div>
              )}

              {product.installGuidelines && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1">
                  <span className="font-semibold text-slate-700 block">Orientações de Instalação:</span>
                  <p className="text-slate-600 leading-relaxed">{product.installGuidelines}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>FLUIDA — Vitrine Digital & Direcionamento de Vendas</span>
          <button
            onClick={closeProductModal}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
