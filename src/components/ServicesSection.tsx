import React from 'react';
import {
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Zap,
  Award,
  Users,
  Check,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ServicesSection: React.FC = () => {
  const { openAdvisoryModal, openTrainingModal } = useConfig();

  return (
    <section id="servicos-projeto" className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
              Engenharia, Assessoria & Capacitação
            </div>
            <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
              Serviços Especializados FLUIDA
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Além de vitrine técnica de equipamentos, a FLUIDA oferece assessoria especializada para condomínios e residências, e formação profissional para tratadores de piscinas.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Suporte técnico e capacitação profissional
          </div>
        </div>

        {/* 2 Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Assessoria Técnica */}
          <div className="bg-[#F8FBFC] rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-[#00A6D6]/50 transition-all duration-200 shadow-2xs group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#E8F7FC] flex items-center justify-center text-[#073B66] group-hover:bg-[#00A6D6] group-hover:text-white transition-colors">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-[#073B66] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md">
                  Consultoria & Laudos
                </span>
              </div>

              <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#073B66] mb-3 leading-snug">
                Assessoria Técnica Especializada
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Diagnóstico completo para casas de máquinas de residências e condomínios. Adequação de normas de segurança ABNT NBR 10339, eliminação de ruídos, eficiência energética e dimensionamento de automação.
              </p>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Laudos técnicos e adequação para condomínios residenciais</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Projetos de automação com geradores de sal e aquecimento inverter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Soluções para turbidez crônica e correção de tubulações antigas</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/70">
              <button
                onClick={openAdvisoryModal}
                className="w-full py-3.5 px-4 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Solicitar Assessoria Técnica</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Cursos e Curso de Piscineiro */}
          <div className="bg-gradient-to-br from-[#073B66] to-[#0A4E85] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            {/* Background water wave glow */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#00A6D6]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#35C6A4]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#35C6A4] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
                  Curso Mais Procurado
                </span>
              </div>

              <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mb-3 leading-snug">
                Curso de Piscineiro & Tratador de Piscinas
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                Formação profissional completa de 16 horas: rotina de visitas, precificação de contratos mensais, química prática da água, aspiração e manutenção mecânica na casa de máquinas.
              </p>

              <div className="space-y-2 text-xs text-slate-200 pt-3 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Como precificar serviços e conquistar clientes particulares</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Química da água, decantação e resolução de água verde/turva</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Certificado profissional de conclusão FLUIDA incluso</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
              <button
                onClick={openTrainingModal}
                className="w-full py-3.5 px-4 bg-[#00A6D6] hover:bg-[#0091bb] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Conhecer o Curso de Piscineiro & Turmas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
