'use client'

import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import i18n from '../i18n/config'
import Head from 'next/head'
import styles from '@/app/[lang]/rektor/feedback-form.module.css'

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const FeedbackForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://debttracker.uz/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        alert(t('feedback.successMessage'));
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      alert(t('feedback.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
     <div className="header-logo-div">
        <div className="header-logo-mini">
          <div className="header-logo-uni">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className="header-logo-uni-name">
            <a href={`/${i18n.language}`} className="header-logo-uni-name-span">
              {t("common.University")}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        
      <h1 className={styles.heading}>{t('feedback.title')}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {t('feedback.nameLabel')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={t('feedback.namePlaceholder')}
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('feedback.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t('feedback.emailPlaceholder')}
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p className={styles.helpText}>
            {t('feedback.emailDisclaimer')}
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {t('feedback.messageLabel')}
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
        </button>
      </form>
    </div>
    </>
   
  );
};

export default FeedbackForm;