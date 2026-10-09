import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calculator,
  Waves,
  Gauge,
  Filter,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Flame,
  Droplet,
  SunMedium,
  Cpu,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ProjectCalculatorModal: React.FC = () => {
  const {
    activeProjectModal,
    closeProjectModal,
    triggerWhatsApp,
    setSelectedCategory,
  } = useConfig();

  // Dimensões da piscina
  const [length, setLength] = useState<number>(8);
  const [width, setWidth] = useState<number>(4);
  const [depth, setDepth] = useState<number>(1.4);
  const [poolType, setPoolType] = useState<'alvenaria' | 'fibra' | 'vinil'>('alvenaria');
  const [usageType, setUsageType] = useState<'residencial' | 'condominio'>('residencial');

  // Opcionais do projeto
  const [heatPump, setHeatPump] = useState<boolean>(true);
  const [saltChlorinator, setSaltChlorinator] = useState<boolean>(true);
  const [ledLighting, setLedLighting] = useState<boolean>(true);
  const [robotCleaner, setRobotCleaner] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProjectModal();
    };
    if (activeProjectModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeProjectModal, closeProjectModal]);

  if (!activeProjectModal) return null;

  // Cálculos técnicos
  const volumeM3 = useMemo(() => {
    return Math.max(1, Number((length * width * depth).toFixed(1)));
  }, [length, width, depth]);

  const volumeLiters = useMemo(() => {
    return Math.round(volumeM3 * 1000);
  }, [volumeM3]);

  // Tempo de recirculação pela norma ABNT NBR 10339 (6h residencial, 4h condomínio)
  const cycleHours = usageType === 'residencial' ? 6 : 4;
  const flowRateM3h = useMemo(() => {
    return Number((volumeM3 / cycleHours).toFixed(1));
  }, [volumeM3, cycleHours]);

  // Estimativa técnica recomendada de bomba e filtro
  const recommendation = useMemo(() => {
    if (flowRateM3h <= 6) {
      return {
        pumpPower: '1/2 CV (0,50 CV)',
        filterDiameter: 'Ø 400 mm',
        sandWeight: '45 kg',
        matchedCategory: 'motobombas',
      };
    } else if (flowRateM3h <= 9.5) {
      return {
        pumpPower: '3/4 CV (0,75 CV)',
        filterDiameter: 'Ø 500 mm',
        sandWeight: '75 kg a 100 kg',
        matchedCategory: 'motobombas',
      };
    } else if (flowRateM3h <= 14) {
      return {
        pumpPower: '1,0 CV (1,00 CV)',
        filterDiameter: 'Ø 600 mm',
        sandWeight: '125 kg a 150 kg',
        matchedCategory: 'filtros',
      };
    } else {
      return {
        pumpPower: '1,5 CV ou 2,0 CV',
        filterDiameter: 'Ø 750 mm ou duplo filtro',
        sandWeight: '200 kg+',
        matchedCategory: 'filtros',
      };
    }
  }, [flowRateM3h]);

  const poolTypeLabels = {
    alvenaria: 'Alvenaria / Pastilha / Azulejo',
    fibra: 'Fibra de Vidro',
    vinil: 'Vinil / Bolsão PVC',
  };

  const handleSendProjectWhatsApp = () => {
    const optionalsList: string[] = [];
    if (heatPump) optionalsList.push('Aquecimento (Bomba de Calor Inverter)');
    if (saltChlorinator) optionalsList.push('Gerador de Cloro por Sal (Eletrólise)');
    if (ledLighting) optionalsList.push('Iluminação LED Subaquática');
    if (robotCleaner) optionalsList.push('Robô Limpador Automático');

    const projectSummary = `Dimensionamento Técnico de Piscina:
- Estrutura: ${poolTypeLabels[poolType]} (${usageType === 'residencial' ? 'Residencial' : 'Condomínio/Coletiva'})
- Medidas: ${length}m Comp × ${width}m Larg × ${depth}m Prof
- Volume: ${volumeLiters.toLocaleString('pt-BR')} Litros (${volumeM3} m³)
- Vazão Necessária: ${flowRateM3h} m³/h (ciclo de ${cycleHours}h)
- Equipamentos Recomendados: Motobomba ${recommendation.pumpPower} + Filtro ${recommendation.filterDiameter}
- Soluções de Interesse: ${optionalsList.length > 0 ? optionalsList.join(', ') : 'Padrão'}`;

    triggerWhatsApp(projectSummary);
    closeProjectModal();
  };

  const handleViewCatalog = () => {
    setSelectedCategory(recommendation.matchedCategory);
    closeProjectModal();
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeProjectModal}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#073B66] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00A6D6] flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Seu Projeto — Dimensionamento Técnico FLUIDA
              </h3>
              <p className="text-[11px] text-slate-300">
                Calcule o volume exato, vazão horária e descubra a motobomba e filtro ideais
              </p>
            </div>
          </div>

          <button
            onClick={closeProjectModal}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar modal de dimensionamento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* Step 1: Dimensões e Tipo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-[#073B66] text-sm flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#00A6D6]" />
                <span>1. Dados da Piscina & Dimensões</span>
              </span>
              <span className="text-[11px] text-slate-400">Norma ABNT NBR 10339</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Tipo de Revestimento:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['alvenaria', 'fibra', 'vinil'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPoolType(type)}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer capitalize ${
                        poolType === type
                          ? 'bg-[#073B66] text-white border-[#073B66]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Perfil de Utilização:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setUsageType('residencial')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      usageType === 'residencial'
                        ? 'bg-[#00A6D6] text-white border-[#00A6D6]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Residencial (6h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsageType('condominio')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      usageType === 'condominio'
                        ? 'bg-[#00A6D6] text-white border-[#00A6D6]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Condomínio (4h)
                  </button>
                </div>
              </div>
            </div>

            {/* Sliders de medidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600">Comprimento:</span>
                  <span className="text-xs font-bold text-[#073B66]">{length} metros</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="0.5"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full accent-[#00A6D6]"
                />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600">Largura:</span>
                  <span className="text-xs font-bold text-[#073B66]">{width} metros</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="12"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full accent-[#00A6D6]"
                />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600">Profundidade Média:</span>
                  <span className="text-xs font-bold text-[#073B66]">{depth} metros</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="2.5"
                  step="0.1"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value))}
                  className="w-full accent-[#00A6D6]"
                />
              </div>
            </div>
          </div>

          {/* Calculation KPI Banner */}
          <div className="bg-gradient-to-r from-[#073B66] to-[#0A4E85] text-white rounded-xl p-5 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-white/10">
              <div className="px-2">
                <span className="text-[11px] text-slate-300 block uppercase font-medium">Volume Total</span>
                <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                  {volumeLiters.toLocaleString('pt-BR')} L
                </span>
                <span className="text-[10px] text-[#35C6A4] block mt-0.5">{volumeM3} m³ cúbicos</span>
              </div>

              <div className="px-2">
                <span className="text-[11px] text-slate-300 block uppercase font-medium">Ciclo Filtrante</span>
                <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                  {cycleHours} horas
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">Norma ABNT</span>
              </div>

              <div className="px-2">
                <span className="text-[11px] text-slate-300 block uppercase font-medium">Vazão Mínima</span>
                <span className="text-xl sm:text-2xl font-black text-[#35C6A4] tabular-nums">
                  {flowRateM3h} m³/h
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">m³ por hora</span>
              </div>

              <div className="px-2">
                <span className="text-[11px] text-slate-300 block uppercase font-medium">Motobomba Ideal</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">
                  {recommendation.pumpPower}
                </span>
                <span className="text-[10px] text-[#00A6D6] block mt-0.5">{recommendation.filterDiameter}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Equipamentos e Opcionais */}
          <div className="space-y-3">
            <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-[#35C6A4]" />
              <span>2. Soluções e Tecnologias de Conforto para Incluir</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  heatPump ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={heatPump}
                  onChange={(e) => setHeatPump(e.target.checked)}
                  className="mt-0.5 rounded text-[#00A6D6] focus:ring-[#00A6D6]"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Aquecimento por Bomba de Calor Inverter</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Água na temperatura ideal com até 80% de economia energética.
                  </p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  saltChlorinator ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={saltChlorinator}
                  onChange={(e) => setSaltChlorinator(e.target.checked)}
                  className="mt-0.5 rounded text-[#00A6D6] focus:ring-[#00A6D6]"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                    <Droplet className="w-3.5 h-3.5 text-[#00A6D6]" />
                    <span>Gerador de Cloro por Sal (Eletrólise)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Cloração natural e suave sem irritar olhos ou ressecar a pele.
                  </p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  ledLighting ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={ledLighting}
                  onChange={(e) => setLedLighting(e.target.checked)}
                  className="mt-0.5 rounded text-[#00A6D6] focus:ring-[#00A6D6]"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                    <SunMedium className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Iluminação Subaquática LED RGB</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Refletores em aço inox com controle de cores e efeitos noturnos.
                  </p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  robotCleaner ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={robotCleaner}
                  onChange={(e) => setRobotCleaner(e.target.checked)}
                  className="mt-0.5 rounded text-[#00A6D6] focus:ring-[#00A6D6]"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#073B66] text-xs">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Robô Aspirador Automático Zodiac</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Aspiração autônoma de fundo e paredes sem descartar água tratada.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleViewCatalog}
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Ver Equipamentos no Catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleSendProjectWhatsApp}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
            <span>Enviar Dimensionamento no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
