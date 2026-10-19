import React, { useState, useRef } from 'react';
import { siteConfig } from '../data/site';
import {
  IconMail,
  IconCopy,
  IconExternalLink,
  IconLinkedIn,
  IconGitHub,
  IconInstagram,
} from '../components/Icons';
import { Toast } from '../components/Toast';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const MAX_MESSAGE_LENGTH = 1200;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address so I can reply.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please write a message with at least 10 characters.';
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters).`;
    }

    setErrors(newErrors);

    // Auto-focus first invalid field
    if (newErrors.name) {
      nameInputRef.current?.focus();
    } else if (newErrors.email) {
      emailInputRef.current?.focus();
    } else if (newErrors.message) {
      messageInputRef.current?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const buildSubject = () => {
    return formData.subject.trim()
      ? `[Portfolio Contact] ${formData.subject.trim()}`
      : `Portfolio Inquiry from ${formData.name.trim()}`;
  };

  const buildBody = () => {
    return `Hi Siraj,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam trap
    if (formData.honeypot) {
      setStatusMessage('Submission received.');
      return;
    }

    if (!validate()) return;

    const subjectEncoded = encodeURIComponent(buildSubject());
    const bodyEncoded = encodeURIComponent(buildBody());
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setStatusMessage('Opening your default email application...');
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setToastMessage('Email copied to clipboard: sirajshaikh84642@gmail.com');
      setTimeout(() => setToastMessage(null), 4000);
    } catch {
      setToastMessage('Email address: sirajshaikh84642@gmail.com');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email
  )}&su=${encodeURIComponent(buildSubject())}&body=${encodeURIComponent(buildBody())}`;

  return (
    <section id="contact" className="section-container" aria-labelledby="contact-title">
      <div className="section-header">
        <span className="section-tag">Let's Connect</span>
        <h2 id="contact-title" className="section-title">
          Contact Me
        </h2>
        <p className="section-subtitle">
          Whether you have an engineering opening, an AI automation project, or want to collaborate — send a message or connect directly.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Accessible Form */}
        <div className="contact-form-card glass-card">
          <form onSubmit={handleSubmit} noValidate className="contact-form">
            {/* Honeypot field (hidden from accessibility tree & sighted users) */}
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="company-site">Do not fill this out</label>
              <input
                id="company-site"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Your Full Name <span className="required-star">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Sarah Jenkins"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
              />
              {errors.name && (
                <span id="name-error" className="field-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Your Email Address <span className="required-star">*</span>
              </label>
              <input
                ref={emailInputRef}
                id="contact-email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="name@company.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
              {errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">
                Subject <span className="optional-tag">(Optional)</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                autoComplete="off"
                className="form-input"
                placeholder="e.g. AI Engineering Role / Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <div className="message-header-row">
                <label htmlFor="contact-message" className="form-label">
                  Your Message <span className="required-star">*</span>
                </label>
                <span className="char-counter">
                  {formData.message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
              <textarea
                ref={messageInputRef}
                id="contact-message"
                rows={5}
                required
                className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                placeholder="Hello Siraj, I saw your portfolio and would like to discuss..."
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
              />
              {errors.message && (
                <span id="message-error" className="field-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary submit-btn">
              <IconMail size={18} />
              <span>Send via Email Client</span>
            </button>

            {/* Live Status Indicator */}
            {statusMessage && (
              <div role="status" className="submit-status-msg">
                {statusMessage}
              </div>
            )}
          </form>

          {/* Form Fallbacks */}
          <div className="form-fallbacks-box">
            <h3 className="fallbacks-title">No local mail app configured?</h3>
            <p className="fallbacks-desc">
              Direct web-based options for instant contact:
            </p>
            <div className="fallbacks-btn-group">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary fallback-action-btn"
                aria-label="Open prefilled draft in Gmail (opens in new tab)"
              >
                <IconExternalLink size={18} />
                <span>Open in Gmail (Web)</span>
              </a>
              <button
                type="button"
                className="btn btn-secondary fallback-action-btn"
                onClick={handleCopyEmail}
                aria-label="Copy Siraj's email address to clipboard"
              >
                <IconCopy size={18} />
                <span>Copy My Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Channels & Information */}
        <div className="contact-info-panel">
          <div className="direct-card glass-card">
            <h3 className="direct-title">Direct Communication</h3>
            <p className="direct-desc">
              I am actively interviewing and available for AI Engineering, AI Automation, and Full-Stack MERN opportunities.
            </p>

            <div className="direct-links-list">
              <a
                href={`mailto:${siteConfig.email}`}
                className="direct-channel-item"
                aria-label={`Email: ${siteConfig.email}`}
              >
                <div className="channel-icon">
                  <IconMail size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-name">Primary Email</span>
                  <span className="channel-val">{siteConfig.email}</span>
                </div>
              </a>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-channel-item"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                <div className="channel-icon">
                  <IconLinkedIn size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-name">LinkedIn Profile</span>
                  <span className="channel-val">in/SirajAhmedShaikh</span>
                </div>
              </a>

              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-channel-item"
                aria-label="Explore GitHub repositories (opens in new tab)"
              >
                <div className="channel-icon">
                  <IconGitHub size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-name">GitHub Profile</span>
                  <span className="channel-val">git/SirajAhmedShaikh</span>
                </div>
              </a>

              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-channel-item"
                aria-label="Instagram profile (opens in new tab)"
              >
                <div className="channel-icon">
                  <IconInstagram size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-name">Instagram</span>
                  <span className="channel-val">Siraj_Builds</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} />
    </section>
  );
};
