// i18n Configuration for Gaon Bazar
// This file sets up multi-language support (English and Hindi)

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Available languages
    resources: {
      en: { translation: en },
      hi: { translation: hi }
    },
    // Default language
    lng: savedLanguage,
    // Fallback language if translation is missing
    fallbackLng: 'en',
    // Disable in production for better performance
    debug: true,
    // Interpolation settings
    interpolation: {
      // React already escapes values to prevent XSS
      escapeValue: false
    },
    // Use key separator for nested translations
    keySeparator: '.',
    // Namespace separator
    nsSeparator: false
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
