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
          That could be an AI roadmap, an ML system that needs to reach production, a team
          adopting coding agents, or a speaker or collaborator for an event. Reach out.
        </p>
        <div className="contact-info">
          {emails.map(({ label, address }) => (
            <p key={address}>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <span className="contact-email">
                <span className="contact-label">{label}</span>
                <a href={`mailto:${address}`}>{address}</a>
              </span>
              <CopyButton text={address} />
            </p>
          ))}
          <p>
            <i className="fab fa-linkedin" aria-label="LinkedIn"></i> <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer">linkedin.com/in/{config.personalInfo.linkedIn.handle}</a>
          </p>
        </div>
      </div>
      <PageNav />
    </>
  );
};

const emails = [
  { label: 'Personal', address: config.personalInfo.email },
  { label: 'Work (The Tech Collective)', address: config.personalInfo.workEmail },
  { label: 'IDA', address: config.personalInfo.idaEmail },
];

export default Contact;