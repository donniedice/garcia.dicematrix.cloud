## Website Documentation

### Overview

This document outlines the structure and best practices for maintaining and expanding the website hosted on `garcia.dicematrix.cloud`. The aim is to provide clear guidance for developers to manage and evolve the project seamlessly.

---

### Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Hosting**: Nginx Proxy Manager with subdomain routing

---

### Directory Structure

#### Local Development Structure

- `/src`
  - `/assets`
    - `/images`: Contains image assets used throughout the application.
      - `/icons`: Stores social media and favicon icons.
  - `/components`: Contains reusable components for the application, including the header and eventually the footer.
    - `/Header`: Header-related components and styles.
      - `/locales`: Includes language-specific JSON files for header translations.
  - `/pages`: Contains individual pages of the application.
    - `/Home`: Home page component and its associated styles and translations.
      - `/locales`: Includes language-specific JSON files for Home page translations.
  - Root-level files include `App.js`, `index.js`, and global configuration files like `i18n.js`.

#### GitHub Repository Structure

- The `src` folder from the local development environment is pushed to GitHub.
- Only the `src` folder is pulled from GitHub for use in production builds.

#### Production Deployment Structure

- The `src` folder is pulled to `/frontend/src` on the webserver.
- The `npm run build` command is executed from the `/frontend` directory to generate the production build.

---

### Header Structure

The header provides a responsive layout and intuitive navigation.

#### Layout Overview

1. **Outer Header Container (`.header`)**
   - Main container that encapsulates all header elements.

2. **Inner Header Container (`.header-inner`)**
   - Grid layout with three sections:
     - **Left Actions (`.header-actions--left`)**: Social media icons.
     - **Center Title (`.header-title`)**: Logo and navigation menu.
     - **Right Actions (`.header-actions--right`)**: Language selection and a "Join" button.

---

### Global Styles

The following variables are defined in `index.css` to ensure consistent theming across the application:

```css
:root {
  --lightAccent: #88b6fc;
  --black: #1B3E68;
  --white: #ffffff;
  --hoverBlue: #14538d;
  --borderColor: #ccc;
  --backgroundColor: #f9fafc;
  --textColor: #1B3E68;
  --buttonColor: #1d539f;
  --buttonHoverColor: #14538d;
}
```

### Font Standards

The application uses a system font stack for a clean and professional look:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

- **Measurement Standards**: Use percentages (`%`) and pixels (`px`) for layout and sizing.

---

### Internationalization Setup

The project uses `i18next` with `react-i18next` for multilingual support. Below is an example configuration:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enHeader from './components/Header/locales/en.json';
import esHeader from './components/Header/locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { header: enHeader },
    es: { header: esHeader },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

- **Namespaces**: Organize translations by component or page (e.g., `header`, `home`).
- **Languages Supported**: `en` (English), `es` (Spanish).
- **Translation Files**: Stored in `/locales` directories for modular management.

---

### Git Push and Pull Workflow

#### Pushing Changes

1. **Stage Changes**:
   ```bash
   git add .
   ```

2. **Commit Changes**:
   ```bash
   git commit -m "Your descriptive commit message"
   ```

3. **Push to Remote Repository**:
   ```bash
   git push origin main
   ```

#### Pulling Updates

1. **Fetch and Merge Changes**:
   ```bash
   git pull origin main
   ```

2. **Rebuild the Application**:
   - Navigate to the `/frontend` directory:
     ```bash
     cd frontend
     ```
   - Run the build command:
     ```bash
     npm run build
     ```

This ensures the latest changes are reflected in the production build.

---

This document serves as a living resource. Update it regularly to reflect the project’s current state.

