## Website Documentation

### Overview

This document outlines the structure and best practices for maintaining and expanding the website hosted on `garcia.dicematrix.cloud`. The aim is to provide clear guidance for developers to manage and evolve the project seamlessly.

---

### Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: TBD (not yet installed as of the latest update)
- **Hosting**: Nginx Proxy Manager with subdomain routing

---

### Directory Structure

#### Local Development Structure

- ``
  - ``
    - ``
      - `logo-desktop.png`
      - `logo-mobile.png`
      - `logo.png`
      - `slide1.png`
      - `slide2.png`
      - `slide3.png`
      - `slide4.png`
      - `slide5.png`
      - `slide6.png`
      - ``
        - `facebook-icon.svg`
        - `favicon.ico`
        - `instagram-icon.svg`
        - `youtube-icon.svg`
  - ``
    - ``
      - `Header.css`
      - `Header.js`
      - ``
        - `en.json`
        - `es.json`
  - ``
    - ``
      - `Home.css`
      - `Home.js`
      - ``
        - `en.json`
        - `es.json`
  - `App.css`
  - `App.js`
  - `i18n.js`
  - `index.css`
  - `index.js`
  - `reportWebVitals.js`
  - `setupTests.js`

#### GitHub Repository Structure

- The `src` folder from the local development environment is pushed to GitHub.
- Only the `src` folder is pulled from GitHub for use in production builds.

#### Production Deployment Structure

- The `src` folder is pulled to `/frontend/src` on the webserver.
- The `npm run build` command is executed from the `/frontend` directory to generate the production build.

---

### Internationalization Setup

#### i18n Configuration (`src/i18n.js`)

The project uses `i18next` with `react-i18next` for internationalization. This allows the app to support multiple languages with ease.

- **Namespaces**:

  - `home`: For translations related to the Home page.
  - `header`: For translations related to the Header component.

- **Languages Supported**:

  - `en` (English)
  - `es` (Spanish)

- **Structure**:

  - Translations are stored in `locales` directories within their respective components or pages.

#### Example Configuration

```javascript
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
```

---

This document serves as a living resource. Update it regularly to reflect the project’s current state.

