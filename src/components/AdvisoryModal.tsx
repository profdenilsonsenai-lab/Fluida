import React, { useState, useEffect } from 'react';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  Building,
  Home,
  MessageCircle,
  ShieldCheck,
  Zap,
  Wrench,
  HelpCircle,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const AdvisoryModal: React.FC = () => {
  const { activeAdvisoryModal, closeAdvisoryModal, triggerWhatsApp } = useConfig();

  const [clientType, setClientType] = useState<'residencial' | 'condominio' | 'comercial'>('residencial');
  const [needTopic, setNeedTopic] = useState<string>('Reforma ou troca de motobomba/filtro');
  const [city, setCity] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAdvisoryModal();
    };
    if (activeAdvisoryModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeAdvisoryModal, closeAdvisoryModal]);

  if (!activeAdvisoryModal) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel =
      clientType === 'residencial'
        ? 'Residência'
        : clientType === 'condominio'
        ? 'Condomínio Residencial'
        : 'Comercial / Clube / Pousada';

    const text = `Solicitação de Assessoria Técnica FLUIDA:
- Tipo: ${typeLabel}
- Cidade/UF: ${city || 'Não informada'}
- Principal Necessidade: ${needTopic}
- Observações: ${details || 'Desejo agendar uma conversa com o especialista técnico.'}`;

    triggerWhatsApp(text);
    closeAdvisoryModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeAdvisoryModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#073B66] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#35C6A4] flex items-center justify-center text-[#073B66]">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Assessoria Técnica Especializada
              </h3>
              <p className="text-[11px] text-slate-300">
                Suporte em engenharia e dimensionamento para residências e condomínios
              </p>
            </div>
          </div>

          <button
            onClick={closeAdvisoryModal}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar assessoria"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
          {/* Pillars Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                <Wrench className="w-3.5 h-3.5 text-[#00A6D6]" />
                <span>Casas de Máquinas</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Diagnóstico hidráulico, ruído de bombas e tubulações antigas.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                <Zap className="w-3.5 h-3.5 text-[#35C6A4]" />
                <span>Eficiência Energética</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Bombas de velocidade variável e aquecedores inverter.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A6D6]" />
                <span>Qualidade da Água</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Soluções para água turva crônica e automação salina.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendWhatsApp} className="space-y-4 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Para qual ambiente é a assessoria?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['residencial', 'condominio', 'comercial'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setClientType(type)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer capitalize ${
                      clientType === type
                        ? 'bg-[#073B66] text-white border-[#073B66]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type === 'residencial'
                      ? 'Residencial'
                      : type === 'condominio'
                      ? 'Condomínio'
                      : 'Comercial/Clube'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Principal Necessidade Técnica:
              </label>
              <select
                value={needTopic}
                onChange={(e) => setNeedTopic(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs rounded-lg border border-slate-300 focus:border-[#00A6D6] outline-hidden text-[#073B66] font-medium"
              >
                <option value="Reforma ou troca de motobomba/filtro">
                  Reforma ou troca de motobomba e filtro de areia
                </option>
                <option value="Automação com Gerador de Cloro por Sal">
                  Implantação de Gerador de Cloro por Sal (Eletrólise)
                </option>
                <option value="Sistema de Aquecimento Solar ou Bomba de Calor">
                  Projeto de Aquecimento (Bomba de Calor Inverter)
                </option>
                <option value="Adequação e laudo técnico para condomínio">
                  Adequação às normas ABNT NBR 10339 para condomínios
                </option>
                <option value="Recuperação de água turva e tratamento químico">
                  Problemas recorrentes de turbidez ou água verde
                </option>
                <option value="Outro projeto específico">Outro projeto específico</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Cidade e Estado:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: São Paulo - SP"
                  className="w-full px-3 py-2 bg-white text-xs rounded-lg border border-slate-300 focus:border-[#00A6D6] outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Breve detalhe (opcional):
                </label>
                <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ex: Piscina de 60m³, motor fazendo barulho..."
                  className="w-full px-3 py-2 bg-white text-xs rounded-lg border border-slate-300 focus:border-[#00A6D6] outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
                <span>Solicitar Assessoria Técnica no WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>FLUIDA — Atendimento consultivo sem custo inicial de orçamento</span>
          <button
            onClick={closeAdvisoryModal}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
