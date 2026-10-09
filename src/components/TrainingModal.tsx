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
  Sparkles,
  Briefcase,
  Star,
  Check,
  ShieldCheck,
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
      title: 'Módulo: Operação e Manutenção de Casas de Máquinas',
      duration: 'Carga Horária: 8 horas (Prático e Teórico)',
      topics: [
        'Funcionamento hidráulico de motobombas autoescorvantes e curvas de vazão.',
        'Operação correta da válvula seletora de 6 vias (retrolavagem, enxágue e recirculação).',
        'Troca de areia por vidro ativado e substituição de selos mecânicos e rotores.',
      ],
    },
    {
      title: 'Módulo: Química da Água & Equilíbrio de Parâmetros',
      duration: 'Carga Horária: 6 horas',
      topics: [
        'Interdependência entre pH, Alcalinidade Total e Dureza Cálcica.',
        'Dosagem precisa de cloro estabilizado, cloração de choque e prevenção de algas.',
        'Cálculos práticos de dosagem para piscinas residenciais e coletivas.',
      ],
    },
    {
      title: 'Módulo: Eletrólise Salina (Geradores de Cloro por Sal)',
      duration: 'Carga Horária: 4 horas',
      topics: [
        'Princípios da eletrólise salina (linha AstralPool Smart Next).',
        'Dimensionamento da taxa de sal (g/L) e manutenção de células de titânio autolimpantes.',
        'Transição de piscinas convencionais para água salinizada.',
      ],
    },
    {
      title: 'Módulo: Automação, Robôs Zodiac & Iluminação LED',
      duration: 'Carga Horária: 4 horas',
      topics: [
        'Programação de robôs elétricos de aspiração de fundo e paredes.',
        'Instalação segura de refletores LED 12V e caixas de comando.',
        'Eficiência energética com bombas de calor e temporizadores.',
      ],
    },
  ];

  const handleConsultWhatsApp = (courseTitle: string) => {
    const message = `Olá! Gostaria de informações sobre o "${courseTitle}" da FLUIDA: próximas turmas, cronograma e como garantir minha vaga.`;
    triggerWhatsApp(message);
    closeTrainingModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeTrainingModal}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
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
                Cursos & Treinamentos Técnicos FLUIDA
              </h3>
              <p className="text-[11px] text-slate-300">
                Formação de piscineiros profissionais e especialização em equipamentos de piscinas
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
          {/* CURSO DESTAQUE: CURSO DE PISCINEIRO PROFISSIONAL */}
          <div className="bg-gradient-to-br from-[#073B66] via-[#09487A] to-[#0A5A9A] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-44 h-44 bg-[#00A6D6]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35C6A4] text-[#073B66] text-xs font-bold uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Curso Mais Procurado — Formação Completa</span>
                </span>
                <span className="text-xs text-[#E8F7FC] font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#35C6A4]" />
                  <span>Carga Horária: 16 Horas (Teórico e Prático)</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-white">
                  Curso de Piscineiro & Tratador de Piscinas Profissional
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-2xl">
                  A formação mais completa do mercado para quem deseja ingressar ou se profissionalizar na manutenção de piscinas residenciais, condomínios e clubes, gerando renda com uma carteira sólida de clientes.
                </p>
              </div>

              {/* Grid do que você aprende no Curso de Piscineiro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs space-y-1">
                  <span className="font-bold text-xs text-[#35C6A4] flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Rotina Profissional & Precificação</span>
                  </span>
                  <p className="text-[11px] text-slate-200">
                    Como calcular o valor de contratos mensais, planejar visitas semanais e apresentar orçamentos confiáveis.
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs space-y-1">
                  <span className="font-bold text-xs text-[#35C6A4] flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Química Prática da Água</span>
                  </span>
                  <p className="text-[11px] text-slate-200">
                    Medição e correção de pH, Alcalinidade, Cloro Livre, Dureza Cálcica e cloração de choque sem desperdício de produtos.
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs space-y-1">
                  <span className="font-bold text-xs text-[#35C6A4] flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Aspiração & Resolução de Crises</span>
                  </span>
                  <p className="text-[11px] text-slate-200">
                    Técnicas de decantação rápida, recuperação de água verde/turva e aspiração drenando sem jogar água tratada fora.
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs space-y-1">
                  <span className="font-bold text-xs text-[#35C6A4] flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Casa de Máquinas & Tecnologias</span>
                  </span>
                  <p className="text-[11px] text-slate-200">
                    Manuseio seguro de válvulas de 6 vias, troca de selo mecânico de bombas, robôs Zodiac e geradores de sal AstralPool.
                  </p>
                </div>
              </div>

              {/* Vantagens adicionais do Curso de Piscineiro */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#35C6A4]" />
                  <span>Certificado Profissional de Conclusão FLUIDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#35C6A4]" />
                  <span>Apostila & Tabela Prática de Dosagens Químicas</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleConsultWhatsApp('Curso de Piscineiro & Tratador Profissional')}
                  className="px-5 py-2.5 bg-[#00A6D6] hover:bg-[#0091bb] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inscrever-se no Curso de Piscineiro</span>
                </button>
              </div>
            </div>
          </div>

          {/* Módulos de Especialização Adicionais */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#073B66] text-sm">
                Módulos de Aperfeiçoamento Técnico Específicos:
              </span>
              <span className="text-[11px] text-slate-400">Cursos modulares e corporativos</span>
            </div>

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
            Turmas presenciais e capacitações sob demanda para condomínios, clubes e empresas.
          </span>

          <button
            onClick={() => handleConsultWhatsApp('Informações Gerais sobre Cursos e Treinamentos')}
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
