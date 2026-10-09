// Declaração de tipos para o Google Analytics gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-S5SR66LW0M';

/**
 * Envia um evento customizado ou padrão para o Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Registra a visualização de detalhes de um produto (view_item)
 */
export const trackViewProduct = (product: {
  id: string;
  name: string;
  brand: string;
  categoryName: string;
  price?: number | null;
}) => {
  trackEvent('view_item', {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand,
        item_category: product.categoryName,
        price: product.price || undefined,
      },
    ],
  });
};

/**
 * Registra o clique de direcionamento para compra em um Marketplace (begin_checkout / lead)
 */
export const trackMarketplaceRedirect = (
  productName: string,
  marketplaceName: string,
  destinationUrl?: string
) => {
  trackEvent('select_content', {
    content_type: 'marketplace_purchase_redirect',
    item_id: productName,
    marketplace: marketplaceName,
    destination: destinationUrl || 'store_root',
  });
};

/**
 * Registra o início de checkout via Stripe (begin_checkout)
 */
export const trackStripeCheckout = (
  productName: string,
  price?: number | null,
  stripeUrl?: string
) => {
  trackEvent('begin_checkout', {
    currency: 'BRL',
    value: price || undefined,
    payment_channel: 'stripe',
    checkout_url: stripeUrl,
    items: [
      {
        item_name: productName,
        price: price || undefined,
      },
    ],
  });
};

/**
 * Registra a conversão de contato pelo WhatsApp (generate_lead)
 */
export const trackWhatsAppLead = (productName?: string) => {
  trackEvent('generate_lead', {
    currency: 'BRL',
    channel: 'whatsapp',
    product_interest: productName || 'Geral / Consultoria',
  });
};

/**
 * Registra buscas realizadas no catálogo
 */
export const trackCatalogSearch = (searchTerm: string) => {
  if (searchTerm.trim().length >= 3) {
    trackEvent('search', {
      search_term: searchTerm,
    });
  }
};
