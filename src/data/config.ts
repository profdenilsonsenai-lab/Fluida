import { SiteConfig } from '../types';

export const INITIAL_CONFIG: SiteConfig = {
  brandName: 'FLUIDA',
  tagline: 'FLUIDA — Tudo para sua piscina, com mais praticidade.',
  subtitle: 'Encontre os produtos certos para cuidar da sua piscina e aproveite melhor cada momento.',
  // O número de WhatsApp permanece vazio por padrão até fornecimento oficial pelo administrador
  whatsAppNumber: '',
  whatsAppStatus: 'pending',
  marketplaces: {
    mercadoLivre: {
      id: 'mercadoLivre',
      name: 'Mercado Livre',
      color: '#FFE600',
      badgeBg: '#FFF9D2',
      textColor: '#2D3277',
      storeUrl: '',
      isActive: false,
      requiresConfig: true,
      description: 'Envio rápido, proteção de compra e parcelamento no cartão ou PIX.',
    },
    shopee: {
      id: 'shopee',
      name: 'Shopee',
      color: '#EE4D2D',
      badgeBg: '#FEECE8',
      textColor: '#EE4D2D',
      storeUrl: '',
      isActive: false,
      requiresConfig: true,
      description: 'Cupons da plataforma, segurança integrada e facilidade de pagamento.',
    },
    magalu: {
      id: 'magalu',
      name: 'Magazine Luiza',
      color: '#0086FF',
      badgeBg: '#E6F3FF',
      textColor: '#0070D6',
      storeUrl: '',
      isActive: false,
      requiresConfig: true,
      description: 'Tradição do varejo nacional, opções de frete e garantia de entrega.',
    },
    tiktokShop: {
      id: 'tiktokShop',
      name: 'TikTok Shop',
      color: '#000000',
      badgeBg: '#F1F5F9',
      textColor: '#0F172A',
      storeUrl: '',
      isActive: false,
      requiresConfig: true,
      description: 'Experiência de compra direta com vídeos demonstrativos de aplicação.',
    },
  },
  socialLinks: {
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
  },
  domain: '',
  companyName: 'FLUIDA Soluções para Piscinas',
  cnpj: 'Configuração Cadastral em Andamento',
  supportHours: 'Segunda a Sexta-feira, das 08h às 18h (Horário de Brasília)',
};

export const ANNOUNCEMENT_MESSAGES = [
  'Encontre soluções para cuidar da sua piscina com praticidade.',
  'Atendimento e orientação técnica pelo WhatsApp oficial.',
  'Consulte os canais de compra oficiais nos principais marketplaces.',
];
