import React, { useState } from 'react';
import { experiences } from '../data/experience';
import { certificates } from '../data/certifications';
import { CertificateItem } from '../types';
import { Lightbox } from '../components/Lightbox';
import { IconBriefcase, IconAward } from '../components/Icons';

export const Experience: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleOpenCertificate = (filePath?: string) => {
    if (!filePath) return;
    const match = certificates.find((c) => c.filePath === filePath);
    if (match) {
      setSelectedCert(match);
    } else {
      // Create ad-hoc certificate view item if not in main list
      setSelectedCert({
        id: 'exp-cert',
        title: 'Internship Verification Certificate',
        issuer: 'Issuing Organization',
        date: 'Verified',
        category: 'Cybersecurity',
        filePath,
      });
    }
  };

  return (
    <section id="experience" className="section-container" aria-labelledby="experience-title">
      <div className="section-header">
        <span className="section-tag">Career Milestones</span>
        <h2 id="experience-title" className="section-title">
          Internships &amp; Practical Experience
        </h2>
        <p className="section-subtitle">
          Demonstrated engineering execution, real enterprise workflow simulations, and industry contributions.
        </p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line" aria-hidden="true" />

        {experiences.map((exp) => {
          const isVirtual = exp.type === 'Virtual Internship';

          return (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true">
                <IconBriefcase size={16} />
              </div>

              <div className="timeline-card glass-card">
                <div className="timeline-header-row">
                  <span
                    className={`timeline-type-badge ${isVirtual ? 'badge-virtual' : 'badge-internship'}`}
                  >
                    {exp.type}
                  </span>
                  <span className="timeline-dates">{exp.dates}</span>
                </div>

                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-org">{exp.organization}</h4>

                {exp.duration && (
                  <div className="timeline-duration-label">
                    <span>{exp.duration}</span>
                  </div>
                )}

                <ul className="timeline-bullets" aria-label={`Responsibilities at ${exp.organization}`}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="timeline-bullet-item">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {exp.certificateFile && (
                  <div className="timeline-action-row">
                    <button
                      type="button"
                      className="btn btn-secondary timeline-cert-btn"
                      onClick={() => handleOpenCertificate(exp.certificateFile)}
                      aria-label={`View certificate for ${exp.role}`}
                    >
                      <IconAward size={18} />
                      <span>View Completion Certificate</span>
                    </button>
                    {exp.verificationCode && (
                      <span className="verification-code-badge">
                        Code: <code>{exp.verificationCode}</code>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Lightbox
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
