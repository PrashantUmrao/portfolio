/* src/components/Contact.js */
'use client';

import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';
import extraStyles from '../styles/ExtraPremium.module.css';
import { MailIcon, PhoneIcon, MapPinIcon, CheckIcon, CopyIcon } from './Icons';

export default function Contact({ personalData }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Toast State
  const [toasts, setToasts] = useState([]);

  // Copy-to-clipboard state feedback
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      addToast('Email copied to clipboard!', 'success');
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      addToast('Phone number copied to clipboard!', 'success');
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const validate = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) {
      nextErrors.name = 'Name is required';
    }

    if (!email) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!subject) {
      nextErrors.subject = 'Subject is required';
    }

    if (!message) {
      nextErrors.message = 'Message is required';
    } else if (message.length < 10) {
      nextErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        addToast('Message sent successfully! I will get back to you soon.', 'success');
      } else {
        addToast(data.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      addToast('An error occurred while sending your message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      {/* Toast Alert Portal container */}
      <div className={extraStyles.toastContainer}>
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`${extraStyles.toast} ${t.type === 'success' ? extraStyles.toastSuccess : extraStyles.toastError}`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <div className="container">
        <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Let's Connect
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Details */}
          <div className={styles.infoArea}>
            <p className={styles.intro}>
              I'm always open to discussing new frontend roles, testing strategies, or exciting student group opportunities. Drop a line!
            </p>

            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <MailIcon />
              </div>
              <div className={styles.details}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{personalData.email}</span>
              </div>
              <button 
                onClick={() => handleCopy(personalData.email, 'email')} 
                className={styles.copyBtn}
              >
                {copiedEmail ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>

            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <PhoneIcon />
              </div>
              <div className={styles.details}>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{personalData.phone}</span>
              </div>
              <button 
                onClick={() => handleCopy(personalData.phone, 'phone')} 
                className={styles.copyBtn}
              >
                {copiedPhone ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>

            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <MapPinIcon />
              </div>
              <div className={styles.details}>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>{personalData.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className={styles.formArea}>
            <form onSubmit={handleSubmit} className={`${styles.formCard} glass`}>
              <div className={styles.formGroup}>
                <label>
                  Your Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Job Opportunity / Project Inquiry"
                  className={styles.input}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Your Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  placeholder="Hi Prashant, let's talk about..."
                  className={styles.textarea}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.btnSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} />
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

