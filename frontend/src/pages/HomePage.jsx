import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/HomePage.css';
import CategoriesSlider from '../components/CategoriesSlider';

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const featureCards = [
    {
      title: t('home.feature_voice_title'),
      description: t('home.feature_voice_desc'),
      icon: '🎤',
    },
    {
      title: t('home.feature_price_title'),
      description: t('home.feature_price_desc'),
      icon: '💰',
    },
    {
      title: t('home.feature_quality_title'),
      description: t('home.feature_quality_desc'),
      icon: '🌡️',
    },
    {
      title: t('home.feature_direct_title'),
      description: t('home.feature_direct_desc'),
      icon: '🤝',
    },
  ];

  const resourceCards = [
    {
      title: t('home.resource_schemes_title'),
      description: t('home.resource_schemes_desc'),
      icon: '📜',
      route: '/schemes',
    },
    {
      title: t('home.resource_subsidies_title'),
      description: t('home.resource_subsidies_desc'),
      icon: '🏦',
      route: '/subsidies',
    },
    {
      title: t('home.resource_events_title'),
      description: t('home.resource_events_desc'),
      icon: '📅',
      route: '/events',
    },
    {
      title: t('home.resource_announcements_title'),
      description: t('home.resource_announcements_desc'),
      icon: '📢',
      route: '/announcements',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-badge">{t('home.hero_badge')}</div>
          <h1 className="hero-title">{t('app.title')}</h1>
          <p className="hero-subtitle">{t('home.hero_subtitle')}</p>
          <p className="hero-description">
            {t('home.hero_description')}
          </p>
          <div className="hero-actions">
            <button className="cta-primary" onClick={() => navigate('/farmer')}>
              {t('home.btn_start_farmer')}
            </button>
            <button className="cta-secondary" onClick={() => navigate('/buyer')}>
              {t('home.btn_explore_market')}
            </button>
          </div>
        </div>
      </section>

      <section className="feature-section container">
        <div className="section-header">
          <div className="eyebrow">{t('home.features_eyebrow')}</div>
          <h2>{t('home.features_heading')}</h2>
          <p>{t('home.features_subheading')}</p>
        </div>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <div key={card.title} className="feature-card">
              <div className="feature-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CategoriesSlider />

      <section className="resources-section" id="resources">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">{t('home.resources_eyebrow')}</div>
            <h2>{t('home.resources_heading')}</h2>
            <p>{t('home.resources_subheading')}</p>
          </div>
          <div className="resource-grid">
            {resourceCards.map((card) => (
              <div key={card.title} className="resource-card">
                <div className="resource-top">
                  <div className="resource-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <button className="resource-btn" onClick={() => navigate(card.route)}>
                  {t('home.btn_learn_more')} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
