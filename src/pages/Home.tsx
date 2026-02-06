import React from 'react';
import HeroEnhanced from '../components/HeroEnhanced';
import LogoMarquee from '../components/LogoMarquee';
import Features from '../components/Features';
import Stats from '../components/Stats';
import HorizontalShowcase from '../components/HorizontalShowcase';
import Testimonials from '../components/Testimonials';
import TerminalSection from '../components/TerminalSection';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';

const Home: React.FC = () => {
  return (
    <>
      <HeroEnhanced />
      <LogoMarquee />
      <Features />
      <Stats />
      <HorizontalShowcase />
      <Testimonials />
      <TerminalSection />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;
