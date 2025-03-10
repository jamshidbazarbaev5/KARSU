'use client'

import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import i18n from '../i18n/config'

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

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

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
        setSubmitStatus({
          success: true,
          message: t('feedback.successMessage')
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (data.full_name || data.email || data.message) {
          setErrors({
            name: data.full_name?.[0] || '',
            email: data.email?.[0] || '',
            message: data.message?.[0] || ''
          });
        } else {
          throw new Error('Failed to submit');
        }
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: t('feedback.errorMessage')
      });
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
      <div className="navi-rektor">
      <div className="container">
        <div className="navi-rektor-logo">
          <h2>{t('feedback.title')}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">{t('feedback.nameLabel')}</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('feedback.namePlaceholder')}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('feedback.emailLabel')}</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('feedback.emailPlaceholder')}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}
            <small className="form-text text-muted">
              {t('feedback.emailDisclaimer')}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('feedback.messageLabel')}</label>
            <textarea
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && (
              <div className="invalid-feedback">
                {errors.message}
              </div>
            )}
          </div>

          {submitStatus.message && (
            <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
              {submitStatus.message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default FeedbackForm;