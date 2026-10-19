import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for navbar highlight
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'certifications', 'experience', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible && visible.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '-70px 0px -40% 0px',
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* Luxury Dark Ambient Background: Top Spotlight, Subtle Grid & Sapphire/Cyan Glows */}
      <div className="bg-spotlight" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="orb orb-cyan" aria-hidden="true" />
      <div className="orb orb-sapphire" aria-hidden="true" />

      {/* Sticky Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Landmark */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>

      {/* Accessible Footer Landmark */}
      <Footer />
    </div>
  );
};

export default App;
