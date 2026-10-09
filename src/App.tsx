/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { ServicesSection } from './components/ServicesSection';
import { CatalogSection } from './components/CatalogSection';
import { BenefitsSection } from './components/BenefitsSection';
import { MarketplacesSection } from './components/MarketplacesSection';
import { GuidesSection } from './components/GuidesSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { GuideDetailModal } from './components/GuideDetailModal';
import { LegalModals } from './components/LegalModals';
import { ConfigDrawer } from './components/ConfigDrawer';
import { ProjectCalculatorModal } from './components/ProjectCalculatorModal';
import { AdvisoryModal } from './components/AdvisoryModal';
import { TrainingModal } from './components/TrainingModal';

export default function App() {
  return (
    <ConfigProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FBFC] text-[#263746] selection:bg-[#00A6D6]/20 selection:text-[#073B66]">
        {/* Sticky Header with Announcement Bar and Navigation */}
        <Header />

        {/* Main Landing & Vitrine Sections */}
        <main className="flex-1 flex flex-col">
          <Hero />
          <CategoriesSection />
          <ServicesSection />
          <CatalogSection />
          <BenefitsSection />
          <MarketplacesSection />
          <GuidesSection />
          <FinalCTA />
        </main>

        {/* Institutional Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <ProductDetailModal />
        <WhatsAppModal />
        <GuideDetailModal />
        <LegalModals />
        <ConfigDrawer />
        <ProjectCalculatorModal />
        <AdvisoryModal />
        <TrainingModal />
      </div>
    </ConfigProvider>
  );
}
