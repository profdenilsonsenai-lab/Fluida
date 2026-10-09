import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calculator,
  Waves,
  Hammer,
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
  Layers,
  MapPin,
  Building,
  Check,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ProjectCalculatorModal: React.FC = () => {
  const {
    activeProjectModal,
    closeProjectModal,
    triggerWhatsApp,
    setSelectedCategory,
  } = useConfig();

  // Tab de navegação no modal: Calculadora rápida vs Formulário completo de construção
  const [activeTab, setActiveTab] = useState<'calculadora' | 'construcao'>('construcao');

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

  // Campos específicos do FORMULÁRIO DE CONSTRUÇÃO DE PISCINA:
  const [stage, setStage] = useState<string>('Ideia inicial / Terreno livre');
  const [terrainType, setTerrainType] = useState<string>('Plano');
  const [hasWetDeck, setHasWetDeck] = useState<boolean>(true); // Prainha
  const [hasSpa, setHasSpa] = useState<boolean>(false); // Hidromassagem/Spa
  const [hasInfinityEdge, setHasInfinityEdge] = useState<boolean>(false); // Borda Infinita
  const [hasCascade, setHasCascade] = useState<boolean>(true); // Cascata
  const [equipmentRoomPosition, setEquipmentRoomPosition] = useState<string>('Abaixo do nível da água (Subterrânea)');
  const [equipmentRoomDistance, setEquipmentRoomDistance] = useState<number>(5);
  const [voltage, setVoltage] = useState<string>('220V Monofásica');
  const [clientName, setClientName] = useState<string>('');
  const [clientCity, setClientCity] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

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

  // Cálculos técnicos de volume e vazão
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
    alvenaria: 'Alvenaria Armada com Pastilhas/Azulejo',
    fibra: 'Fibra de Vidro Pré-moldada',
    vinil: 'Vinil sobre estrutura de Alvenaria',
  };

  // Envio da Calculadora Rápida
  const handleSendQuickCalculatorWhatsApp = () => {
    const optionalsList: string[] = [];
    if (heatPump) optionalsList.push('Aquecimento (Bomba de Calor Inverter)');
    if (saltChlorinator) optionalsList.push('Gerador de Cloro por Sal (Eletrólise)');
    if (ledLighting) optionalsList.push('Iluminação LED Subaquática');
    if (robotCleaner) optionalsList.push('Robô Limpador Automático Zodiac');

    const projectSummary = `Dimensionamento Técnico de Piscina:
- Estrutura: ${poolTypeLabels[poolType]} (${usageType === 'residencial' ? 'Residencial' : 'Condomínio/Coletiva'})
- Medidas: ${length}m Comp × ${width}m Larg × ${depth}m Prof
- Volume: ${volumeLiters.toLocaleString('pt-BR')} Litros (${volumeM3} m³)
- Vazão Requerida: ${flowRateM3h} m³/h (ciclo de ${cycleHours}h)
- Equipamentos Recomendados: Motobomba ${recommendation.pumpPower} + Filtro ${recommendation.filterDiameter}
- Soluções de Interesse: ${optionalsList.length > 0 ? optionalsList.join(', ') : 'Padrão'}`;

    triggerWhatsApp(projectSummary);
    closeProjectModal();
  };

  // Envio do FORMULÁRIO COMPLETO DE CONSTRUÇÃO DE PISCINA
  const handleSendConstructionBriefingWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const architecturalFeatures: string[] = [];
    if (hasWetDeck) architecturalFeatures.push('Prainha / Deck Molhado');
    if (hasSpa) architecturalFeatures.push('Spa com Hidromassagem Acoplado');
    if (hasInfinityEdge) architecturalFeatures.push('Borda Infinita com Calha');
    if (hasCascade) architecturalFeatures.push('Cascata');

    const equipmentList: string[] = [];
    if (heatPump) equipmentList.push('Bomba de Calor Inverter');
    if (saltChlorinator) equipmentList.push('Gerador de Cloro por Sal');
    if (ledLighting) equipmentList.push('Iluminação LED RGB');
    if (robotCleaner) equipmentList.push('Robô Limpador Zodiac');

    const briefing = `Briefing para Construção de Piscina FLUIDA:
- Responsável: ${clientName || 'Cliente Interessado'}
- Cidade/UF: ${clientCity || 'Não informada'}
- Contato: ${clientPhone || 'WhatsApp'}
- Estágio da Obra: ${stage}
- Tipo Construtivo: ${poolTypeLabels[poolType]}
- Terreno/Solo: ${terrainType}
- Medidas: ${length}m × ${width}m × ${depth}m (Aprox. ${volumeLiters.toLocaleString('pt-BR')} L / ${volumeM3} m³)
- Elementos: ${architecturalFeatures.length > 0 ? architecturalFeatures.join(', ') : 'Piscina tradicional'}
- Casa de Máquinas: ${equipmentRoomPosition} (Distância: ~${equipmentRoomDistance}m)
- Tensão Elétrica: ${voltage}
- Equipamentos e Tecnologias Desejadas: ${equipmentList.length > 0 ? equipmentList.join(', ') : 'Bomba e filtro básicos'}
- Observações: ${additionalNotes || 'Gostaria de orçamento e consultoria para o kit de equipamentos da obra.'}`;

    triggerWhatsApp(briefing);
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
        className="relative w-full max-w-4xl max-h-[94vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-[#073B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00A6D6] flex items-center justify-center text-white">
              {activeTab === 'construcao' ? <Hammer className="w-4 h-4" /> : <Calculator className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Seu Projeto — Planejamento e Construção de Piscina
              </h3>
              <p className="text-[11px] text-slate-300">
                Informações técnicas essenciais, hidráulica, segurança e dimensionamento de equipamentos
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('construcao')}
            className={`flex-1 py-3 px-4 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'construcao'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Hammer className="w-4 h-4 text-[#00A6D6]" />
            <span>Formulário para Construir sua Piscina (Completo)</span>
          </button>

          <button
            onClick={() => setActiveTab('calculadora')}
            className={`flex-1 py-3 px-4 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'calculadora'
                ? 'border-[#00A6D6] text-[#073B66] font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-[#00A6D6]" />
            <span>Calculadora Rápida de Dimensionamento (Bomba & Filtro)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* TAB 1: FORMULÁRIO DE CONSTRUÇÃO DE PISCINA */}
          {activeTab === 'construcao' && (
            <form onSubmit={handleSendConstructionBriefingWhatsApp} className="space-y-6">
              {/* Box de Orientação de Engenharia */}
              <div className="p-4 bg-[#E8F7FC] rounded-xl border border-[#00A6D6]/30 text-xs space-y-1.5 text-[#073B66]">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A6D6]" />
                  <span>O que você precisa saber para construir uma piscina segura e eficiente:</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  A construção de uma piscina exige planejamento prévio de hidráulica, elétrica, drenos anti-turbilhão (para evitar acidentes por sucção, segundo a norma ABNT NBR 10339) e posicionamento da casa de máquinas. Preencha os detalhes da sua obra abaixo para receber a orientação técnica precisa da equipe FLUIDA.
                </p>
              </div>

              {/* Seção 1: Estágio da Obra e Terreno */}
              <div className="space-y-3">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Building className="w-4 h-4 text-[#00A6D6]" />
                  <span>1. Estágio da Obra e Características do Terreno</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Em que fase está a obra?
                    </label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs text-[#073B66] font-medium outline-hidden focus:border-[#00A6D6]"
                    >
                      <option value="Ideia inicial / Terreno livre">Ideia inicial / Terreno ainda sem mexer</option>
                      <option value="Projeto arquitetônico pronto">Projeto arquitetônico pronto / Aguardando equipamentos</option>
                      <option value="Escavação iniciada">Escavação do buraco em andamento</option>
                      <option value="Alvenaria / Estrutura armada levantada">Estrutura de alvenaria/concreto já levantada</option>
                      <option value="Reforma geral de piscina antiga">Reforma / Troca de vinil de piscina existente</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Topografia e Tipo do Terreno:
                    </label>
                    <select
                      value={terrainType}
                      onChange={(e) => setTerrainType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs text-[#073B66] font-medium outline-hidden focus:border-[#00A6D6]"
                    >
                      <option value="Plano">Terreno plano convencional</option>
                      <option value="Em declive / talude (exige muro de arrimo)">Em declive / desnível (exige contenção/talude)</option>
                      <option value="Presença de lençol freático alto / água">Solo úmido com lençol freático alto</option>
                      <option value="Solo rochoso">Solo rochoso com necessidade de martelete</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tipo Construtivo / Revestimento Desejado:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(['alvenaria', 'fibra', 'vinil'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPoolType(type)}
                        className={`p-2.5 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          poolType === type
                            ? 'bg-[#073B66] text-white border-[#073B66]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold capitalize">{type}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">
                          {type === 'alvenaria' ? 'Pastilha / Azulejo' : type === 'fibra' ? 'Casco Pré-moldado' : 'Bolsão de PVC'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seção 2: Medidas e Volume */}
              <div className="space-y-3">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Waves className="w-4 h-4 text-[#00A6D6]" />
                  <span>2. Dimensões Planejadas para a Piscina</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
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

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
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

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-600">Profundidade Média:</span>
                      <span className="text-xs font-bold text-[#073B66]">{depth} metros</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="2.2"
                      step="0.1"
                      value={depth}
                      onChange={(e) => setDepth(parseFloat(e.target.value))}
                      className="w-full accent-[#00A6D6]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs text-[#073B66]">
                  <span>Volume resultante da piscina:</span>
                  <span className="font-bold tabular-nums">
                    {volumeLiters.toLocaleString('pt-BR')} Litros ({volumeM3} m³ cúbicos)
                  </span>
                </div>
              </div>

              {/* Seção 3: Elementos Arquitetônicos Desejados */}
              <div className="space-y-3">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles className="w-4 h-4 text-[#35C6A4]" />
                  <span>3. Elementos Arquitetônicos e Itens Especiais da Obra</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                      hasWetDeck ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#073B66]">Prainha / Deck Molhado</span>
                      <input
                        type="checkbox"
                        checked={hasWetDeck}
                        onChange={(e) => setHasWetDeck(e.target.checked)}
                        className="rounded text-[#00A6D6]"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Degrau raso para cadeiras</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                      hasSpa ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#073B66]">Spa / Hidro Acoplada</span>
                      <input
                        type="checkbox"
                        checked={hasSpa}
                        onChange={(e) => setHasSpa(e.target.checked)}
                        className="rounded text-[#00A6D6]"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Jatos de hidromassagem</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                      hasInfinityEdge ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#073B66]">Borda Infinita</span>
                      <input
                        type="checkbox"
                        checked={hasInfinityEdge}
                        onChange={(e) => setHasInfinityEdge(e.target.checked)}
                        className="rounded text-[#00A6D6]"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Calha de transbordo</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                      hasCascade ? 'bg-[#E8F7FC] border-[#00A6D6]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#073B66]">Cascata</span>
                      <input
                        type="checkbox"
                        checked={hasCascade}
                        onChange={(e) => setHasCascade(e.target.checked)}
                        className="rounded text-[#00A6D6]"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Embutida ou de piso</span>
                  </label>
                </div>
              </div>

              {/* Seção 4: Casa de Máquinas e Elétrica */}
              <div className="space-y-3">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Gauge className="w-4 h-4 text-[#00A6D6]" />
                  <span>4. Casa de Máquinas & Instalação Hidráulica/Elétrica</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Posição da Casa de Máquinas:
                    </label>
                    <select
                      value={equipmentRoomPosition}
                      onChange={(e) => setEquipmentRoomPosition(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs text-[#073B66] font-medium outline-hidden"
                    >
                      <option value="Abaixo do nível da água (Subterrânea)">Abaixo do nível da água (Subterrânea)</option>
                      <option value="No mesmo nível do deck/piscina">No mesmo nível do deck/piscina</option>
                      <option value="Acima do nível da água (Elevada)">Acima do nível da água (Elevada)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Distância até a piscina (~metros):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={equipmentRoomDistance}
                        onChange={(e) => setEquipmentRoomDistance(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs font-medium text-[#073B66] outline-hidden"
                      />
                      <span className="text-xs text-slate-500">metros</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Tensão Elétrica no Local:
                    </label>
                    <select
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs text-[#073B66] font-medium outline-hidden"
                    >
                      <option value="220V Monofásica">220V Monofásica (Padrão)</option>
                      <option value="110V Monofásica">110V Monofásica</option>
                      <option value="220V Trifásica">220V Trifásica</option>
                      <option value="380V Trifásica">380V Trifásica</option>
                    </select>
                  </div>
                </div>

                {/* Aviso normativo de segurança ABNT */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Exigência de Segurança ABNT NBR 10339:</strong> Toda piscina construída deve possuir obrigatoriamente no mínimo <strong>2 drenos de fundo de segurança</strong> interligados com tampas anti-turbilhão para evitar sucção perigosa de cabelos e membros. Nossa equipe orienta os tubos e conexões corretos Cepex/Fluidra.
                  </p>
                </div>
              </div>

              {/* Seção 5: Dados do Solicitante */}
              <div className="space-y-3 pt-1">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <MapPin className="w-4 h-4 text-[#35C6A4]" />
                  <span>5. Seus Dados para Contato da Equipe Técnica</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Seu Nome:
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      WhatsApp / Telefone:
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ex: (11) 99999-8888"
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Cidade e Estado da Obra:
                    </label>
                    <input
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      placeholder="Ex: Campinas - SP"
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Dúvidas ou detalhes extras (opcional):
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Ex: Gostaria de saber qual bomba de calor é ideal para essa piscina..."
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 text-xs outline-hidden resize-none"
                  />
                </div>
              </div>

              {/* Botão de Envio do Briefing de Construção */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#073B66] hover:bg-[#063053] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2.5 shadow-md cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#35C6A4]" />
                  <span>Enviar Informações da Construção para a Engenharia FLUIDA via WhatsApp</span>
                </button>
                <span className="block text-center text-[11px] text-slate-400 mt-2">
                  Atendimento consultivo gratuito para dimensionamento do kit de equipamentos.
                </span>
              </div>
            </form>
          )}

          {/* TAB 2: CALCULADORA RÁPIDA DE DIMENSIONAMENTO */}
          {activeTab === 'calculadora' && (
            <div className="space-y-6">
              {/* Step 1: Dimensões e Tipo */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-[#073B66] text-sm flex items-center gap-2">
                    <Waves className="w-4 h-4 text-[#00A6D6]" />
                    <span>Dimensões da Piscina para Cálculo Rápido</span>
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

              {/* Opcionais */}
              <div className="space-y-3">
                <span className="font-bold text-[#073B66] text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles className="w-4 h-4 text-[#35C6A4]" />
                  <span>Tecnologias de Conforto para a Piscina</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
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
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
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
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
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
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
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

              {/* Ações da Calculadora */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
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
                  onClick={handleSendQuickCalculatorWhatsApp}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
                  <span>Enviar Dimensionamento no WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>FLUIDA — Engenharia e Equipamentos Fluidra para sua Obra</span>
          <button
            onClick={closeProjectModal}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
