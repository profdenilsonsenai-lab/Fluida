import React, { useState } from 'react';
import {
  ExternalLink,
  MessageCircle,
  Eye,
  Sliders,
  Store,
  Layers,
} from 'lucide-react';
import { Product, MarketplaceId } from '../types';
import { useConfig } from '../context/ConfigContext';
import { trackMarketplaceRedirect } from '../utils/analytics';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { config, openProductModal, triggerWhatsApp } = useConfig();
  const [imageError, setImageError] = useState(false);

  // Check which marketplace links have active destinations or require consultation
  const availableMarketplaceLinks = product.marketplaceLinks.filter((link) => {
    const mpConfig = config.marketplaces[link.marketplaceId];
    return mpConfig && (link.url.trim().length > 0 || mpConfig.storeUrl.trim().length > 0);
  });

  const handleBuyClick = (e: React.MouseEvent, linkUrl: string, marketplaceId: MarketplaceId) => {
    e.stopPropagation();
    const mpConfig = config.marketplaces[marketplaceId];
    const destination = linkUrl || (mpConfig ? mpConfig.storeUrl : '');

    if (destination && destination.trim().length > 0) {
      trackMarketplaceRedirect(product.name, mpConfig ? mpConfig.name : marketplaceId, destination);
      window.open(destination, '_blank', 'noopener,noreferrer');
    } else {
      // If no valid link, prompt WhatsApp inquiry
      triggerWhatsApp(product.name);
    }
  };

  const primaryImage = product.images[0]
    ? product.images[0].replace('/src/assets/images/', '/images/')
    : '';

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group bg-white rounded-xl border border-slate-200/80 hover:border-[#00A6D6]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Product Image Area with Fallback Container */}
      <div className="relative w-full aspect-4/3 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
        {!imageError && primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-radial from-slate-100 to-slate-200 text-slate-400">
            <Layers className="w-10 h-10 mb-2 text-[#00A6D6]/40" />
            <span className="text-xs font-medium text-slate-500 text-center">{product.brand}</span>
            <span className="text-[10px] text-slate-400 text-center">{product.categoryName}</span>
          </div>
        )}

        {/* Quick View Button overlay */}
        <div className="absolute inset-0 bg-[#073B66]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#073B66] text-xs font-semibold rounded-lg shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Zero-pill discipline: unboxed text with middle dots) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 flex-wrap">
            <span className="font-semibold text-[#073B66]">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryName}</span>
            {product.sku && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 font-mono text-[11px]">{product.sku}</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-[#073B66] group-hover:text-[#00A6D6] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Verified technical specs preview (2 key specs) */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
              {product.specs.slice(0, 2).map((spec, idx) => (
                <div key={idx} className="flex items-baseline justify-between text-[11px] text-slate-600">
                  <span className="text-slate-400">{spec.label}:</span>
                  <span className="font-medium text-slate-700 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price & Purchase Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          {/* Pricing indicator */}
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-slate-400">Preço & Condições:</span>
            {product.price ? (
              <span className="text-sm font-bold text-[#073B66] tabular-nums">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-500 italic">
                Consulte no canal de compra
              </span>
            )}
          </div>

          {/* Purchase / Marketplace Actions */}
          <div className="space-y-1.5">
            {availableMarketplaceLinks.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {availableMarketplaceLinks.map((link) => {
                  const mp = config.marketplaces[link.marketplaceId];
                  if (!mp) return null;
                  return (
                    <button
                      key={link.marketplaceId}
                      onClick={(e) => handleBuyClick(e, link.url, link.marketplaceId)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-[#E8F7FC] border border-slate-200/70 hover:border-[#00A6D6] rounded-lg text-xs font-medium text-slate-700 hover:text-[#073B66] transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-[#00A6D6]" />
                        <span>Comprar no {mp.name}</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            ) : (
              // Se não houver endereço de compra cadastrado: "Consulte a disponibilidade pelo WhatsApp"
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerWhatsApp(product.name);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#073B66] hover:bg-[#063053] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#35C6A4]" />
                <span>Consulte a disponibilidade no WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
