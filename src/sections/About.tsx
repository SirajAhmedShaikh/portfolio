import React from 'react';
import { IconSparkles, IconBriefcase, IconAward, IconCheck } from '../components/Icons';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <IconSparkles size={24} className="highlight-icon-glow" />,
      title: 'Master of Computer Applications (MCA)',
      description:
        'Currently pursuing my Master’s degree (MCA), maintaining a rigorous commitment to deep computer science principles, software architecture, and continuous technical growth.',
    },
    {
      icon: <IconCheck size={24} className="highlight-icon-glow" />,
      title: 'Learning',
      description:
        'Actively learning Full-Stack MERN development, Generative AI APIs, AI Automation, AWS Cloud, Production Deployment, and Scalable System Design.',
    },
    {
      icon: <IconBriefcase size={24} className="highlight-icon-glow" />,
      title: 'Products Over Projects',
      description:
        'I strongly believe in creating real products, not just theoretical hobby projects. My core focus is delivering practical software that genuinely solves real-world human and business problems.',
    },
    {
      icon: <IconAward size={24} className="highlight-icon-glow" />,
      title: 'Learning in Public on LinkedIn',
      description:
        'I regularly share my engineering milestones, code experiments, and study insights on LinkedIn to remain accountable, welcome feedback, and grow alongside the global developer community.',
    },
    
  ];

  return (
    <section id="about" className="section-container" aria-labelledby="about-title">
      <div className="section-header">
        <span className="section-tag">About Me</span>
        <h2 id="about-title" className="section-title">
          BCA Graduate Currently Pursuing MCA 
        </h2>
        <p className="section-subtitle">
          Driven by continuous learning, verifiable problem solving, and modern AI automation.
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: Personal Story & Workspace Photo */}
        <div className="about-story glass-card">
          <div className="about-photo-wrapper">
            <img
              src="/images/siraj-workspace.jpg"
              alt="Siraj Ahmed Shaikh at his study desk engaged with technical books and software architecture"
              className="about-photo"
              loading="lazy"
              width="450"
              height="600"
            />
            <div className="about-photo-badge">
              <span>My Short Desc</span>
            </div>
          </div>
          <div className="about-bio-text">
            <p>
              I'm Siraj, an MCA student and aspiring AI Engineer learning Python, NumPy, Pandas, AI engineering, software development, and AI automation. I have a strong foundation in computer science fundamentals.
            </p>
          </div>
        </div>

        {/* Right Column: 5 Highlight Cards */}
        <div className="about-highlights-list" role="list">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-card glass-card"
              role="listitem"
            >
              <div className="highlight-icon-box">{item.icon}</div>
              <div className="highlight-content">
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
