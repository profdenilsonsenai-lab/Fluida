export type ProductCategory =
  | 'motobombas'
  | 'filtros'
  | 'tratamento-quimico'
  | 'limpeza-acessorios'
  | 'robos-piscinas'
  | 'aquecimento'
  | 'iluminacao'
  | 'geradores-cloro'
  | 'valvulas-conexoes'
  | 'pecas-componentes';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDesc: string;
  iconName: string;
  tagline: string;
  itemCount?: number;
}

export type MarketplaceId = 'mercadoLivre' | 'shopee' | 'magalu' | 'tiktokShop';

export interface MarketplaceConfig {
  id: MarketplaceId;
  name: string;
  color: string;
  badgeBg: string;
  textColor: string;
  storeUrl: string;
  isActive: boolean;
  requiresConfig: boolean;
  description: string;
}

export interface ProductMarketplaceLink {
  marketplaceId: MarketplaceId;
  url: string;
  notes?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Fluidra' | 'AstralPool' | 'Zodiac' | 'Cepex';
  category: ProductCategory;
  categoryName: string;
  sku?: string;
  description: string;
  images: string[];
  specs: ProductSpec[];
  applications: string[];
  compatibility?: string;
  installGuidelines?: string;
  price: number | null; // null if not confirmed: "Consulte o preço no canal de compra"
  lastPriceUpdate?: string | null;
  marketplaceLinks: ProductMarketplaceLink[];
  isPublished: boolean;
  featured?: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  subtitle: string;
  whatsAppNumber: string; // e.g. "5511999999999" (empty means pending)
  whatsAppStatus: 'active' | 'pending';
  marketplaces: Record<MarketplaceId, MarketplaceConfig>;
  socialLinks: SocialLinks;
  domain: string;
  companyName: string;
  cnpj: string;
  supportHours: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readingTime: string;
  category: string;
  content: string[];
  tips: string[];
  relatedCategories: ProductCategory[];
}
