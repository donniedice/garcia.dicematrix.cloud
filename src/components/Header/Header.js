import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';

// Import PNG Logos
import DesktopLogo from '../../assets/images/logo-desktop.png';
import MobileLogo from '../../assets/images/logo-mobile.png';

// Import SVG Icons
import { ReactComponent as InstagramIcon } from '../../assets/images/icons/instagram-icon.svg';
import { ReactComponent as FacebookIcon } from '../../assets/images/icons/facebook-icon.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/images/icons/youtube-icon.svg';

function Header() {
  const { t, i18n } = useTranslation('header');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576 && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

  const switchLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <header className={`header theme-col--primary ${isNavOpen ? 'nav-open' : ''}`}>
      <div className="header-inner">
        {/* Social Media Section */}
        <div className="header-actions header-actions--left">
          <a
            href="http://instagram.com/gfmdirectprimarycare/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="http://facebook.com/garciafamilymedicine/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="http://youtube.com/@garciafamilymedicine"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon"
            aria-label="YouTube"
          >
            <YoutubeIcon />
          </a>
        </div>

        {/* Logo Section */}
        <div className="header-title">
          <a href="/" className="header-title-logo" onClick={handleNavLinkClick}>
            <img src={DesktopLogo} alt="Garcia Family Medicine Desktop Logo" className="logo-desktop" />
            <img src={MobileLogo} alt="Garcia Family Medicine Mobile Logo" className="logo-mobile" />
          </a>
          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li>
                <a href="/meet-dr-tess-garcia" onClick={handleNavLinkClick}>
                  {t('nav_meetTheDoctor')}
                </a>
              </li>
              <li>
                <a href="/services" onClick={handleNavLinkClick}>
                  {t('nav_services')}
                </a>
              </li>
              <li>
                <a href="/contact" onClick={handleNavLinkClick}>
                  {t('nav_contact')}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Language Picker and Join Button */}
        <div className="header-actions header-actions--right">
          <div className="language-picker" tabIndex="0">
            <span className="language-icon" aria-hidden="true">🌐</span>
            <span className="language-current">{t('header_language')}</span>
            <ul className="language-dropdown" role="menu" aria-label="Language Selection">
              <li>
                <button onClick={() => switchLanguage('en')} role="menuitem">
                  English
                </button>
              </li>
              <li>
                <button onClick={() => switchLanguage('es')} role="menuitem">
                  Español
                </button>
              </li>
            </ul>
          </div>
          <a href="/join-the-family" className="btn join-btn">
            {t('header_join')}
          </a>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        ref={hamburgerRef}
        className={`hamburger-button ${isNavOpen ? 'open' : ''}`}
        onClick={toggleNav}
        aria-label="Toggle Menu"
        aria-expanded={isNavOpen}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <FocusTrap>
          <nav
            id="header-navigation"
            ref={navRef}
            className={`header-nav ${isNavOpen ? 'open' : ''}`}
            aria-hidden={!isNavOpen}
          >
            <a href="/meet-dr-tess-garcia" onClick={handleNavLinkClick}>
              {t('nav_meetTheDoctor')}
            </a>
            <a href="/services" onClick={handleNavLinkClick}>
              {t('nav_services')}
            </a>
            <a href="/contact" onClick={handleNavLinkClick}>
              {t('nav_contact')}
            </a>
          </nav>
        </FocusTrap>
      )}
    </header>
  );
}

export default Header;
