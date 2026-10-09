import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, Product, MarketplaceId } from '../types';
import { INITIAL_CONFIG } from '../data/config';
import { PRODUCTS } from '../data/products';
import { trackWhatsAppLead, trackViewProduct, trackCatalogSearch } from '../utils/analytics';

interface ConfigContextType {
  config: SiteConfig;
  products: Product[];
  activeWhatsAppModal: boolean;
  pendingProductName: string | null;
  activeConfigDrawer: boolean;
  activeProductModal: Product | null;
  activeLegalModal: 'privacidade' | 'termos' | 'empresa' | null;
  activeGuideModal: string | null;
  activeAdvisoryModal: boolean;
  activeTrainingModal: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedBrand: string;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  setSelectedBrand: (b: string) => void;
  openProductModal: (p: Product) => void;
  closeProductModal: () => void;
  openConfigDrawer: () => void;
  closeConfigDrawer: () => void;
  openLegalModal: (type: 'privacidade' | 'termos' | 'empresa') => void;
  closeLegalModal: () => void;
  openGuideModal: (guideId: string) => void;
  closeGuideModal: () => void;
  openAdvisoryModal: () => void;
  closeAdvisoryModal: () => void;
  openTrainingModal: () => void;
  closeTrainingModal: () => void;
  triggerWhatsApp: (productName?: string) => void;
  closeWhatsAppModal: () => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateMarketplaceUrl: (id: MarketplaceId, url: string, active: boolean) => void;
  updateProductMarketplaceLink: (productId: string, marketplaceId: MarketplaceId, url: string) => void;
  resetAllDefaults: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEY_CONFIG = 'fluida_site_config_v1';
const STORAGE_KEY_PRODUCTS = 'fluida_products_v3';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_CONFIG;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => {
          const defaultProd = PRODUCTS.find((dp) => dp.id === p.id);
          return {
            ...p,
            name: defaultProd?.name || p.name,
            stripePaymentUrl: p.stripePaymentUrl || defaultProd?.stripePaymentUrl,
            price: p.price ?? defaultProd?.price ?? null,
            images: p.images.map((img) => img.replace('/src/assets/images/', '/images/')),
          };
        });
      }
    } catch {
      // fallback to initial
    }
    return PRODUCTS;
  });

  const [activeWhatsAppModal, setActiveWhatsAppModal] = useState(false);
  const [pendingProductName, setPendingProductName] = useState<string | null>(null);
  const [activeConfigDrawer, setActiveConfigDrawer] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacidade' | 'termos' | 'empresa' | null>(null);
  const [activeGuideModal, setActiveGuideModal] = useState<string | null>(null);
  const [activeAdvisoryModal, setActiveAdvisoryModal] = useState(false);
  const [activeTrainingModal, setActiveTrainingModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch {
      // ignore storage quota errors
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore storage quota errors
    }
  }, [products]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const updateMarketplaceUrl = (id: MarketplaceId, url: string, active: boolean) => {
    setConfig((prev) => ({
      ...prev,
      marketplaces: {
        ...prev.marketplaces,
        [id]: {
          ...prev.marketplaces[id],
          storeUrl: url,
          isActive: active,
          requiresConfig: !url,
        },
      },
    }));
  };

  const updateProductMarketplaceLink = (
    productId: string,
    marketplaceId: MarketplaceId,
    url: string
  ) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== productId) return item;
        const links = [...item.marketplaceLinks];
        const existingIdx = links.findIndex((l) => l.marketplaceId === marketplaceId);
        if (existingIdx >= 0) {
          links[existingIdx] = { ...links[existingIdx], url };
        } else {
          links.push({ marketplaceId, url });
        }
        return { ...item, marketplaceLinks: links };
      })
    );
  };

  const resetAllDefaults = () => {
    localStorage.removeItem(STORAGE_KEY_CONFIG);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    setConfig(INITIAL_CONFIG);
    setProducts(PRODUCTS);
  };

  const triggerWhatsApp = (productName?: string) => {
    const rawNumber = config.whatsAppNumber.trim().replace(/\D/g, '');
    const hasValidNumber = rawNumber.length >= 10;

    if (!hasValidNumber) {
      // O número deve permanecer como configuração pendente até que o responsável forneça o contato oficial
      setPendingProductName(productName || null);
      setActiveWhatsAppModal(true);
      return;
    }

    let message = 'Olá! Estou no site da FLUIDA e gostaria de mais informações.';
    if (productName) {
      message = `Olá! Estou no site da FLUIDA e gostaria de informações sobre este produto: ${productName}.`;
    }

    trackWhatsAppLead(productName);
    const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSetSearchQuery = (q: string) => {
    setSearchQuery(q);
    trackCatalogSearch(q);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        products,
        activeWhatsAppModal,
        pendingProductName,
        activeConfigDrawer,
        activeProductModal,
        activeLegalModal,
        activeGuideModal,
        searchQuery,
        selectedCategory,
        selectedBrand,
        setSearchQuery: handleSetSearchQuery,
        setSelectedCategory,
        setSelectedBrand,
        openProductModal: (p) => {
          trackViewProduct(p);
          setActiveProductModal(p);
        },
        closeProductModal: () => setActiveProductModal(null),
        openConfigDrawer: () => setActiveConfigDrawer(true),
        closeConfigDrawer: () => setActiveConfigDrawer(false),
        openLegalModal: (type) => setActiveLegalModal(type),
        closeLegalModal: () => setActiveLegalModal(null),
        openGuideModal: (id) => setActiveGuideModal(id),
        closeGuideModal: () => setActiveGuideModal(null),
        openAdvisoryModal: () => setActiveAdvisoryModal(true),
        closeAdvisoryModal: () => setActiveAdvisoryModal(false),
        openTrainingModal: () => setActiveTrainingModal(true),
        closeTrainingModal: () => setActiveTrainingModal(false),
        activeAdvisoryModal,
        activeTrainingModal,
        triggerWhatsApp,
        closeWhatsAppModal: () => {
          setActiveWhatsAppModal(false);
          setPendingProductName(null);
        },
        updateConfig,
        updateMarketplaceUrl,
        updateProductMarketplaceLink,
        resetAllDefaults,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
