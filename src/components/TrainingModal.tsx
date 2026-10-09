import React, { useEffect } from 'react';
import {
  X,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  MessageCircle,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const TrainingModal: React.FC = () => {
  const { activeTrainingModal, closeTrainingModal, triggerWhatsApp } = useConfig();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTrainingModal();
    };
    if (activeTrainingModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeTrainingModal, closeTrainingModal]);

  if (!activeTrainingModal) return null;

  const trainingModules = [
    {
      title: 'Módulo 1: Operação e Manutenção de Casas de Máquinas',
      duration: 'Carga Horária: 8 horas (Prático e Teórico)',
      topics: [
        'Funcionamento hidráulico de motobombas autoescorvantes e curvas de vazão.',
        'Operação correta da válvula seletora de 6 vias (retrolavagem, enxágue e recirculação).',
        'Troca de areia por vidro ativado e substituição de selos mecânicos e rotores.',
      ],
    },
    {
      title: 'Módulo 2: Química da Água & Equilíbrio de Parâmetros',
      duration: 'Carga Horária: 6 horas',
      topics: [
        'Interdependência entre pH, Alcalinidade Total e Dureza Cálcica.',
        'Dosagem precisa de cloro estabilizado, cloração de choque e prevenção de algas.',
        'Cálculos práticos de dosagem para piscinas residenciais e coletivas.',
      ],
    },
    {
      title: 'Módulo 3: Eletrólise Salina (Geradores de Cloro por Sal)',
      duration: 'Carga Horária: 4 horas',
      topics: [
        'Princípios da eletrólise salina (linha AstralPool Smart Next).',
        'Dimensionamento da taxa de sal (g/L) e manutenção de células de titânio autolimpantes.',
        'Transição de piscinas convencionais para água salinizada.',
      ],
    },
    {
      title: 'Módulo 4: Automação, Robôs Zodiac & Iluminação LED',
      duration: 'Carga Horária: 4 horas',
      topics: [
        'Programação de robôs elétricos de aspiração de fundo e paredes.',
        'Instalação segura de refletores LED 12V e caixas de comando.',
        'Eficiência energética com bombas de calor e temporizadores.',
      ],
    },
  ];

  const handleConsultWhatsApp = (moduleTitle?: string) => {
    const message = moduleTitle
      ? `Olá! Gostaria de informações sobre o treinamento da FLUIDA: "${moduleTitle}". Como funcionam as próximas turmas e inscrições?`
      : 'Olá! Gostaria de informações sobre os Treinamentos Técnicos e Capacitações da FLUIDA para piscinas.';
    triggerWhatsApp(message);
    closeTrainingModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeTrainingModal}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#073B66] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00A6D6] flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Treinamentos Técnicos & Capacitação FLUIDA
              </h3>
              <p className="text-[11px] text-slate-300">
                Qualificação prática para piscineiros, tratadores, zeladores e equipes prediais
              </p>
            </div>
          </div>

          <button
            onClick={closeTrainingModal}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar treinamentos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* Public Target */}
          <div className="p-4 bg-[#E8F7FC] rounded-xl border border-[#00A6D6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#073B66]">
            <div className="space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#00A6D6]" />
                <span>Para quem são os treinamentos:</span>
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Piscineiros autônomos, tratadores profissionais, zeladores de condomínios, gestores de pousadas e proprietários que desejam autonomia técnica.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#00A6D6]/20 font-semibold text-[11px]">
              <Award className="w-4 h-4 text-[#35C6A4]" />
              <span>Certificado de Participação</span>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-3">
            <span className="font-bold text-[#073B66] text-sm block">
              Módulos do Programa de Capacitação:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#00A6D6] uppercase tracking-wider block mb-1">
                      {mod.duration}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#073B66] mb-2 leading-snug">
                      {mod.title}
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-600">
                      {mod.topics.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#35C6A4] mt-0.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => handleConsultWhatsApp(mod.title)}
                      className="text-xs font-semibold text-[#073B66] hover:text-[#00A6D6] flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#35C6A4]" />
                      <span>Consultar este módulo no WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Turmas presenciais e sob demanda para condomínios e equipes corporativas.
          </span>

          <button
            onClick={() => handleConsultWhatsApp()}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#35C6A4]" />
            <span>Consultar Calendário e Vagas no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
