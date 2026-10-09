import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Phone,
  AlertCircle,
  Check,
  SlidersHorizontal,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const WhatsAppModal: React.FC = () => {
  const {
    activeWhatsAppModal,
    closeWhatsAppModal,
    pendingProductName,
    config,
    updateConfig,
    openConfigDrawer,
  } = useConfig();

  const [inputNumber, setInputNumber] = useState('');
  const [successSaved, setSuccessSaved] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!activeWhatsAppModal) return null;

  const defaultMessage = pendingProductName
    ? `Olá! Estou no site da FLUIDA e gostaria de informações sobre este produto: ${pendingProductName}.`
    : 'Olá! Estou no site da FLUIDA e gostaria de informações sobre equipamentos para piscina.';

  const handleSaveAndOpen = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputNumber.replace(/\D/g, '');
    if (clean.length < 10) return;

    updateConfig({
      whatsAppNumber: clean,
      whatsAppStatus: 'active',
    });

    setSuccessSaved(true);
    setTimeout(() => {
      const url = `https://wa.me/${clean}?text=${encodeURIComponent(defaultMessage)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      closeWhatsAppModal();
    }, 600);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(defaultMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeWhatsAppModal}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FBFC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7FC] flex items-center justify-center text-[#073B66]">
              <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#073B66]">
                Atendimento via WhatsApp
              </h3>
              <p className="text-[11px] text-slate-500">Canal direto com a equipe FLUIDA</p>
            </div>
          </div>

          <button
            onClick={closeWhatsAppModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Transparent Notice about Pending Configuration */}
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Configuração Pendente do Contato Oficial</span>
            </div>
            <p className="text-amber-700 text-xs leading-relaxed">
              O número oficial de atendimento da FLUIDA ainda não foi cadastrado pelo administrador no ambiente de produção. Para garantir a transparência comercial, nenhum link fictício foi acionado.
            </p>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Mensagem pré-formatada que será enviada:
            </label>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic flex items-start justify-between gap-2">
              <span className="leading-relaxed">"{defaultMessage}"</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="shrink-0 text-slate-400 hover:text-slate-600 p-1"
                title="Copiar mensagem"
              >
                {copiedText ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Admin Fast Configuration Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#073B66] flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A6D6]" />
                <span>É o administrador da FLUIDA?</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Ativação Rápida</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Insira o número oficial com DDD (ex: <strong>11999998888</strong> ou com DDI <strong>5511999998888</strong>) para ativar o botão imediatamente neste navegador:
            </p>

            <form onSubmit={handleSaveAndOpen} className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="Ex: 11999998888"
                  className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-lg border border-slate-300 focus:border-[#00A6D6] focus:ring-1 focus:ring-[#00A6D6] outline-hidden text-[#073B66] font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={inputNumber.replace(/\D/g, '').length < 10}
                className="px-3.5 py-2 bg-[#073B66] hover:bg-[#063053] disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                {successSaved ? 'Salvo!' : 'Salvar e Abrir'}
              </button>
            </form>
          </div>

          {/* Full panel link */}
          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              onClick={() => {
                closeWhatsAppModal();
                openConfigDrawer();
              }}
              className="text-[#00A6D6] hover:text-[#073B66] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Abrir Painel Completo de Configuração da Loja</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={closeWhatsAppModal}
              className="text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
