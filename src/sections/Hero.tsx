import React from 'react';
import { siteConfig } from '../data/site';
import { useTypewriter } from '../hooks/useTypewriter';
import {
  IconLinkedIn,
  IconGitHub,
  IconInstagram,
  IconMail,
  IconDownload,
  IconSparkles,
} from '../components/Icons';

export const Hero: React.FC = () => {
  const { text: currentRole } = useTypewriter({
    words: siteConfig.roles,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseTime: 2000,
  });

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-content">
          {/* Futuristic Status Pill */}
          <div className="hero-badge">
            <span className="hero-badge-pulse" aria-hidden="true" />
            <IconSparkles size={14} className="hero-badge-icon" />
            <span>Available for AI & Software Roles</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name">{siteConfig.name}</span>
          </h1>

          {/* Dynamic Role Subheading */}
          <div className="hero-role-wrapper" aria-live="polite">
            <span className="hero-role-prefix">&gt;&nbsp;</span>
            <span className="hero-role-text">{currentRole}</span>
            <span className="hero-cursor" aria-hidden="true">_</span>
          </div>

          {/* 1-Line Value Proposition */}
          <p className="hero-value-prop">
            {siteConfig.valueProposition}
          </p>

          {/* CTAs - Visible above the fold on mobile */}
          <div className="hero-cta-group">
            <a href="/resume.pdf" download className="btn btn-primary hero-btn">
              <IconDownload size={18} />
              <span>Download Resume</span>
            </a>
            <a href="#contact" className="btn btn-secondary hero-btn">
              <IconMail size={18} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="hero-socials" aria-label="Social media profiles">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <IconLinkedIn size={20} />
              <span className="social-label">LinkedIn</span>
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="GitHub profile (opens in new tab)"
            >
              <IconGitHub size={20} />
              <span className="social-label">GitHub</span>
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Instagram profile (opens in new tab)"
            >
              <IconInstagram size={20} />
              <span className="social-label">Instagram</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="social-pill"
              aria-label={`Send email to ${siteConfig.email}`}
            >
              <IconMail size={20} />
              <span className="social-label">Email</span>
            </a>
          </div>
        </div>

        {/* Hero Visual / Real Studio Portrait */}
        <div className="hero-visual">
          <div className="avatar-frame">
            <div className="avatar-glow-ring" aria-hidden="true" />
            <img
              src="/images/siraj-portrait.jpg"
              alt="Siraj Ahmed Shaikh, AI Engineer and Full-Stack Developer in black suit"
              className="avatar-image"
              width="360"
              height="450"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
