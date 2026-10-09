import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  Phone,
  Store,
  Share2,
  Globe,
  RotateCcw,
  Check,
  ExternalLink,
  HelpCircle,
  FileCode,
  Download,
  AlertCircle,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { MarketplaceId } from '../types';

export const ConfigDrawer: React.FC = () => {
  const {
    activeConfigDrawer,
    closeConfigDrawer,
    config,
    updateConfig,
    updateMarketplaceUrl,
    resetAllDefaults,
    triggerWhatsApp,
  } = useConfig();

  const [activeTab, setActiveTab] = useState<'canais' | 'marketplaces' | 'redes' | 'publicacao'>('canais');
  const [tempWhatsApp, setTempWhatsApp] = useState(config.whatsAppNumber);
  const [saveFeedback, setSaveFeedback] = useState(false);

  if (!activeConfigDrawer) return null;

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempWhatsApp.replace(/\D/g, '');
    updateConfig({
      whatsAppNumber: clean,
      whatsAppStatus: clean.length >= 10 ? 'active' : 'pending',
    });
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'fluida-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeConfigDrawer}
    >
      <div
        className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 bg-[#073B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00A6D6] flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Painel de Gestão FLUIDA</h3>
              <p className="text-[11px] text-slate-300">Configuração de canais, links e publicação</p>
            </div>
          </div>

          <button
            onClick={closeConfigDrawer}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('canais')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'canais'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('marketplaces')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'marketplaces'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Marketplaces
          </button>
          <button
            onClick={() => setActiveTab('redes')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'redes'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Redes Sociais
          </button>
          <button
            onClick={() => setActiveTab('publicacao')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'publicacao'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Publicação
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: WHATSAPP */}
          {activeTab === 'canais' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-[#073B66] flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#00A6D6]" />
                  <span>Canal Oficial de Atendimento (WhatsApp)</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conforme a diretriz do projeto, o número fica pendente até a inserção do contato oficial. Nenhum link fictício é disparado enquanto não for configurado.
                </p>
              </div>

              <form onSubmit={handleSaveWhatsApp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Número de WhatsApp com DDD:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tempWhatsApp}
                      onChange={(e) => setTempWhatsApp(e.target.value)}
                      placeholder="Ex: 5511999998888 (com DDI 55)"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-[#00A6D6] focus:ring-1 focus:ring-[#00A6D6] outline-hidden text-[#073B66] font-medium"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Formato aceito: Apenas números ou com traço/parênteses. Ex: (11) 99999-8888.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#073B66] hover:bg-[#063053] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {saveFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Número Salvo!</span>
                      </>
                    ) : (
                      <span>Salvar Configuração</span>
                    )}
                  </button>

                  {config.whatsAppNumber && (
                    <button
                      type="button"
                      onClick={() => triggerWhatsApp('Motobomba AstralPool Sena')}
                      className="px-3.5 py-2.5 bg-[#E8F7FC] hover:bg-[#d5f0fa] text-[#073B66] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Testar envio com mensagem padrão"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Testar Botão</span>
                    </button>
                  )}
                </div>
              </form>

              {/* Status indicator */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <span className="text-slate-500">Status no Site:</span>
                {config.whatsAppNumber && config.whatsAppNumber.length >= 10 ? (
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Ativo (+{config.whatsAppNumber})
                  </span>
                ) : (
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    Pendente de Configuração
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MARKETPLACES */}
          {activeTab === 'marketplaces' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Cadastre a URL oficial da sua loja em cada canal. Canais sem URL configurada exibirão o status "Em ativação" ou solicitarão contato no WhatsApp.
              </p>

              {(['mercadoLivre', 'shopee', 'magalu', 'tiktokShop'] as MarketplaceId[]).map((mpId) => {
                const mp = config.marketplaces[mpId];
                return (
                  <div key={mpId} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#073B66]">{mp.name}</span>
                      <label className="flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mp.isActive}
                          onChange={(e) => updateMarketplaceUrl(mpId, mp.storeUrl, e.target.checked)}
                          className="rounded text-[#00A6D6] focus:ring-[#00A6D6]"
                        />
                        <span>Ativo</span>
                      </label>
                    </div>

                    <input
                      type="url"
                      value={mp.storeUrl}
                      onChange={(e) => updateMarketplaceUrl(mpId, e.target.value, e.target.value.trim().length > 0)}
                      placeholder={`URL da loja no ${mp.name}`}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:border-[#00A6D6] outline-hidden text-slate-700 font-mono"
                    />

                    {mp.storeUrl && (
                      <div className="flex justify-end pt-1">
                        <a
                          href={mp.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#00A6D6] hover:underline flex items-center gap-1"
                        >
                          <span>Testar link no navegador</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: REDES SOCIAIS */}
          {activeTab === 'redes' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Insira as URLs dos perfis sociais oficiais da FLUIDA. Conforme as regras, botões sem URL cadastrada permanecem ocultos no site público para não exibir links quebrados.
              </p>

              <div className="space-y-3">
                {(['instagram', 'facebook', 'tiktok', 'youtube'] as const).map((network) => (
                  <div key={network} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 capitalize">
                      {network}:
                    </label>
                    <input
                      type="url"
                      value={config.socialLinks[network]}
                      onChange={(e) =>
                        updateConfig({
                          socialLinks: {
                            ...config.socialLinks,
                            [network]: e.target.value,
                          },
                        })
                      }
                      placeholder={`https://${network}.com/fluida...`}
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:border-[#00A6D6] outline-hidden text-slate-700 font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PUBLICAÇÃO & DOMÍNIO */}
          {activeTab === 'publicacao' && (
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-3.5 bg-[#E8F7FC] rounded-xl border border-[#00A6D6]/30 space-y-1 text-[#073B66]">
                <span className="font-bold block">Checklist de Publicação em Domínio Próprio</span>
                <p className="text-[11px] text-slate-600">
                  O domínio oficial ainda será registrado pelo cliente. A aplicação foi construída com URLs dinâmicas relativas, preparada para qualquer domínio customizado.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 block">Domínio planejado:</label>
                <input
                  type="text"
                  value={config.domain}
                  onChange={(e) => updateConfig({ domain: e.target.value })}
                  placeholder="Ex: www.fluida.com.br"
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-[#073B66] block">Como atualizar o catálogo:</span>
                <p className="text-[11px] leading-relaxed">
                  Os produtos estão centralizados no arquivo <code className="bg-slate-200 px-1 py-0.5 rounded text-[#073B66]">src/data/products.ts</code>. Para adicionar novos produtos ou atualizar preços e links específicos, basta editar os objetos do array.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleExportJson}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar Configuração Atual (JSON)</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Tem certeza de que deseja restaurar as configurações iniciais padrão?')) {
                      resetAllDefaults();
                    }
                  }}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrões de Fábrica</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>FLUIDA v1.0 · Vitrine Pronta</span>
          <button
            onClick={closeConfigDrawer}
            className="px-4 py-2 bg-[#073B66] text-white rounded-lg font-semibold hover:bg-[#063053] cursor-pointer"
          >
            Concluir Edição
          </button>
        </div>
      </div>
    </div>
  );
};
