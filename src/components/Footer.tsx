import React from 'react';
import { siteConfig } from '../data/site';
import {
  IconLinkedIn,
  IconGitHub,
  IconInstagram,
  IconMail,
  IconArrowUp,
} from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-logo">{siteConfig.name}</span>
            <p className="footer-headline">{siteConfig.headline}</p>
          </div>

          <button
            type="button"
            className="btn btn-secondary back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <IconArrowUp size={18} />
            <span>Back to Top</span>
          </button>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom-row">
          <div className="footer-socials" aria-label="Social Links">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn (opens in new tab)"
            >
              <IconLinkedIn size={18} />
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="GitHub (opens in new tab)"
            >
              <IconGitHub size={18} />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Instagram (opens in new tab)"
            >
              <IconInstagram size={18} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="footer-social-icon"
              aria-label={`Email ${siteConfig.email}`}
            >
              <IconMail size={18} />
            </a>
          </div>

          <p className="footer-copyright">
            &copy; {currentYear} {siteConfig.name}. Designed &amp; engineered.
          </p>
        </div>
      </div>
    </footer>
  );
};
