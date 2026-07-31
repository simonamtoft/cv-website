import React, { useEffect, useRef, useState } from 'react';
import '../styles/Contact.css';
import config from '../config';
import PageNav from './PageNav';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  // Gate the clipboard button behind a post-mount check so server prerender and
  // the first client render agree (both render nothing), avoiding a hydration
  // mismatch. The button is revealed after hydration where clipboard exists.
  const [canCopy, setCanCopy] = useState(false);
  const timer = useRef(null);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { return; }
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) setCanCopy(true);
    return () => clearTimeout(timer.current);
  }, []);

  if (!canCopy) return null;
  return (
    <button
      className={`copy-btn${copied ? ' copy-btn--copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true" />
      <span className="copy-btn-label">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = contactRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <div className="contact" ref={contactRef}>
        <h2>Let's Talk</h2>
        <p className="contact-lead">
          Working on a data or AI challenge? I'm happy to have a direct conversation about
          what's feasible, what's not, and where to start.
        </p>
        <p>
          Whether you're scoping a new initiative, evaluating technical approaches, or looking
          for a speaker or collaborator - reach out.
        </p>
        <div className="contact-info">
          <p>
            <i className="fas fa-envelope" aria-label="Email"></i> <a href={`mailto:${config.personalInfo.email}`}>{config.personalInfo.email}</a>
            <CopyButton text={config.personalInfo.email} />
          </p>
          <p>
            <i className="fas fa-envelope" aria-label="Work Email"></i> <a href={`mailto:${config.personalInfo.workEmail}`}>{config.personalInfo.workEmail}</a>
            <CopyButton text={config.personalInfo.workEmail} />
          </p>
          <p>
            <i className="fab fa-linkedin" aria-label="LinkedIn"></i> <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer">linkedin.com/in/{config.personalInfo.linkedIn.handle}</a>
          </p>
        </div>
      </div>
      <PageNav />
    </>
  );
};

export default Contact;