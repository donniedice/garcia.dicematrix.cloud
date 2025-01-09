// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import the JSON for Home namespace
import enHome from './pages/Home/locales/en.json';
import esHome from './pages/Home/locales/es.json';

// Import the JSON for Header namespace
import enHeader from './components/Header/locales/en.json';
import esHeader from './components/Header/locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        header: enHeader,
      },
      es: {
        home: esHome,
        header: esHeader,
      },
    },
    // Our namespaces:
    ns: ['home', 'header'],
    // If no namespace is specified in a component, default to 'home'
    defaultNS: 'home',

    // Default language / fallback
    lng: 'en',
    fallbackLng: 'en',

    // Key separator off since we use full string keys
    keySeparator: false,
    interpolation: {
      escapeValue: false, // React already escapes XSS
    },
  });

export default i18n;
