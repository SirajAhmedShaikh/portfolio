import React from 'react';
import { IconSparkles } from '../components/Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="section-container" aria-labelledby="projects-title">
      <div className="section-header">
        <span className="section-tag">Projects</span>
        <h2 id="projects-title" className="section-title">Projects</h2>
      </div>

      <div className="coming-soon-card glass-card">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">
            <IconSparkles size={32} />
          </div>
          <h3 className="coming-soon-title">Coming Soon</h3>
          <p className="coming-soon-text">
            Projects are currently being built. Check back soon.
          </p>
        </div>
      </div>
    </section>
  );
};
