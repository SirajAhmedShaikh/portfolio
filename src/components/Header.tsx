import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/site';
import { IconMenu, IconClose } from './Icons';

interface HeaderProps {
  activeSection: string;
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certificates' },
  { href: '#experience', label: 'Experience' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo: <Siraj Portfolio /> */}
        <a href="#hero" className="brand-logo" aria-label="Siraj Portfolio — Back to top">
          <span className="logo-bracket" aria-hidden="true">&lt;</span>
          <span className="logo-text">Siraj Portfolio</span>
          <span className="logo-bracket logo-slash" aria-hidden="true">&nbsp;/&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#contact" className="btn btn-primary header-cta">
            Contact
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            className="mobile-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        ref={menuRef}
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">{siteConfig.name}</span>
          <button
            type="button"
            className="mobile-close-btn"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <IconClose size={24} />
          </button>
        </div>
        <nav aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-drawer-footer">
          <a href="#contact" className="btn btn-primary mobile-drawer-cta" onClick={closeMenu}>
            Contact Me Now
          </a>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
};
