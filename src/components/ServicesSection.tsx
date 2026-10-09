import React from 'react';
import {
  Calculator,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wrench,
  Users,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ServicesSection: React.FC = () => {
  const { openProjectModal, openAdvisoryModal, openTrainingModal } = useConfig();

  return (
    <section id="servicos-projeto" className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#00A6D6] uppercase tracking-wider mb-1">
              Engenharia, Dimensionamento & Capacitação
            </div>
            <h2 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#073B66]">
              Soluções Especializadas para sua Piscina
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Além de vitrine de equipamentos, a FLUIDA oferece ferramentas de dimensionamento sob medida, assessoria para reformas e programas de capacitação técnica.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Suporte consultivo completo
          </div>
        </div>

        {/* 3 Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Seu Projeto */}
          <div className="bg-gradient-to-br from-[#073B66] to-[#0A4E85] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            {/* Background water wave glow */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00A6D6]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#35C6A4]">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-[#35C6A4] uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md">
                  Simulador Online
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mb-2 leading-snug">
                Seu Projeto — Construção & Dimensionamento
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                Tudo o que você precisa para construir sua piscina: formulário completo de obra (terreno, prainha, drenos anti-turbilhão ABNT, casa de máquinas) ou simulador rápido de motobomba e filtro.
              </p>

              <div className="space-y-1.5 text-xs text-slate-200 pt-2 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Formulário de pré-obra e hidráulica</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Cálculo de volume e vazão por ABNT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Envio do briefing para a Engenharia FLUIDA</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15">
              <button
                onClick={openProjectModal}
                className="w-full py-3 px-4 bg-[#00A6D6] hover:bg-[#0091bb] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Planejar Construção / Simular Projeto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Assessoria Técnica */}
          <div className="bg-[#F8FBFC] rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#00A6D6]/50 transition-all duration-200 shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E8F7FC] flex items-center justify-center text-[#073B66]">
                  <ClipboardCheck className="w-6 h-6 text-[#00A6D6]" />
                </div>
                <span className="text-[11px] font-semibold text-[#073B66] uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                  Consultoria Técnica
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#073B66] mb-2 leading-snug">
                Assessoria Técnica
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Diagnóstico minucioso para casas de máquinas de residências e condomínios. Redução de ruído, economia de energia e resolução de problemas recorrentes de água.
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Laudo de adequação para condomínios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Projetos de automação e eletrólise</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]" />
                  <span>Dimensionamento de aquecimento inverter</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/70">
              <button
                onClick={openAdvisoryModal}
                className="w-full py-3 px-4 bg-[#073B66] hover:bg-[#063053] text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Solicitar Assessoria Técnica</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Treinamentos e Curso de Piscineiro */}
          <div className="bg-[#F8FBFC] rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#00A6D6]/50 transition-all duration-200 shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E8F7FC] flex items-center justify-center text-[#073B66]">
                  <GraduationCap className="w-6 h-6 text-[#35C6A4]" />
                </div>
                <span className="text-[11px] font-semibold text-[#073B66] uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                  Curso de Piscineiro
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#073B66] mb-2 leading-snug">
                Curso de Piscineiro & Cursos
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Formação completa de Piscineiro Profissional (rotinas, precificação de clientes, química da água e manutenção de bombas) e módulos técnicos de especialização.
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Curso de Piscineiro & Tratador (16h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Química da água, decantação e bombas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6A4]" />
                  <span>Certificado profissional de conclusão</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/70">
              <button
                onClick={openTrainingModal}
                className="w-full py-3 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-[#073B66] font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <span>Ver Curso de Piscineiro & Turmas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
