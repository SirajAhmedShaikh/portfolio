import React, { useEffect, useRef } from 'react';
import { CertificateItem } from '../types';
import { IconClose, IconExternalLink } from './Icons';

interface LightboxProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ certificate, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!certificate) return;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

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
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        ref={modalRef}
        className="lightbox-modal glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-header">
          <div className="lightbox-title-box">
            <span className="lightbox-badge">{certificate.category}</span>
            <h3 id="lightbox-title" className="lightbox-title">
              {certificate.title}
            </h3>
            <p className="lightbox-issuer">
              Issued by <strong>{certificate.issuer}</strong> • {certificate.date}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="lightbox-close-btn"
            aria-label="Close certificate lightbox"
            onClick={onClose}
          >
            <IconClose size={24} />
          </button>
        </div>

        <div className="lightbox-body">
          {certificate.pages && certificate.pages.length > 1 ? (
            <div className="lightbox-multi-page">
              {certificate.pages.map((pageSrc, idx) => (
                <div key={idx} className="lightbox-page-item">
                  <div className="page-label">Page {idx + 1}</div>
                  <img
                    src={pageSrc}
                    alt={`${certificate.title} page ${idx + 1}`}
                    className="lightbox-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="lightbox-single-page">
              <img
                src={certificate.filePath}
                alt={`${certificate.title} credential issued by ${certificate.issuer}`}
                className="lightbox-image"
              />
            </div>
          )}
        </div>

        <div className="lightbox-footer">
          {certificate.credentialId && (
            <div className="credential-info">
              <span className="info-label">Credential ID:</span>
              <code className="info-code">{certificate.credentialId}</code>
            </div>
          )}

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary lightbox-verify-btn"
              aria-label={`Verify ${certificate.title} on issuer portal (opens in new tab)`}
            >
              <IconExternalLink size={18} />
              <span>Verify on Official Portal</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
