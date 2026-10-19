import React, { useState } from 'react';
import { certificates } from '../data/certifications';
import { CertificateItem } from '../types';
import { Lightbox } from '../components/Lightbox';
import { IconAward, IconExternalLink } from '../components/Icons';

type CategoryFilter = 'All' | 'AI & ML' | 'Core CS' | 'Cybersecurity' | 'Cloud & DevOps' | 'Professional Skills';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'AI & ML',
  'Core CS',
  'Cybersecurity',
  'Cloud & DevOps',
  'Professional Skills',
];

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const filteredCerts =
    selectedCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  return (
    <section id="certifications" className="section-container" aria-labelledby="certs-title">
      <div className="section-header">
        <span className="section-tag">Verifiable Proof</span>
        <h2 id="certs-title" className="section-title">
          18+ Certifications &amp; Accreditations
        </h2>
        <p className="section-subtitle">
          Validated credentials issued by Anthropic, Oracle, Google, IBM, IIT Kharagpur, Tata, Saylor Academy, and Vanderbilt University.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="filter-chips-row" role="tablist" aria-label="Certificate categories">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`filter-chip ${isSelected ? 'filter-chip-active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <span className="chip-count">
                {category === 'All'
                  ? certificates.length
                  : certificates.filter((c) => c.category === category).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Responsive Certificate Grid */}
      <div className="cert-grid">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="cert-card glass-card">
            <div className="cert-thumbnail-wrapper">
              <img
                src={cert.filePath}
                alt={`Certificate thumbnail for ${cert.title}`}
                className="cert-thumbnail"
                loading="lazy"
                width="400"
                height="280"
              />
              <div className="cert-thumbnail-overlay">
                <button
                  type="button"
                  className="btn btn-primary cert-view-quick"
                  onClick={() => setActiveCert(cert)}
                  aria-label={`Inspect ${cert.title} in lightbox`}
                >
                  <IconAward size={18} />
                  <span>Inspect Certificate</span>
                </button>
              </div>
            </div>

            <div className="cert-content">
              <div className="cert-meta">
                <span className="cert-category-tag">{cert.category}</span>
                <span className="cert-date">{cert.date}</span>
              </div>

              <h3 className="cert-card-title">{cert.title}</h3>
              <p className="cert-issuer">
                Issuer: <strong>{cert.issuer}</strong>
              </p>

              {cert.description && (
                <p className="cert-brief">{cert.description}</p>
              )}

              <div className="cert-footer">
                <button
                  type="button"
                  className="btn btn-secondary cert-action-btn"
                  onClick={() => setActiveCert(cert)}
                  aria-label={`View full certificate: ${cert.title}`}
                >
                  <span>View Details</span>
                </button>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-external-link"
                    aria-label={`Verify ${cert.title} externally (opens in new tab)`}
                  >
                    <IconExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
};
