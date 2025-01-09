// src/components/Header/Header.js
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import FocusTrap from 'focus-trap-react'; // Ensure this is installed

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
  const [isNavOpen, setIsNavOpen] = useState(false); // Track if nav is open

  // Refs for detecting outside clicks
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Ref for the first nav link to set focus
  const firstNavLinkRef = useRef(null);

  // Close the nav menu when window is resized to above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576 && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

  // Close the nav menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNavOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavOpen]);

  // Close the nav menu when pressing the Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavOpen]);

  // Prevent body from scrolling when nav is open and set focus to first nav link
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
      // Set focus to the first nav link for accessibility
      if (firstNavLinkRef.current) {
        firstNavLinkRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isNavOpen]);

  const switchLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  // Toggles the mobile nav open/closed
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Close the nav when a link is clicked (useful for single-page applications)
  const handleNavLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <header
      className={`header theme-col--primary ${isNavOpen ? 'nav-open' : ''}`}
      data-section-id="header"
    >
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

        {/* Center Logo */}
        <div className="header-title">
          <a href="/" className="header-title-logo" onClick={handleNavLinkClick}>
            <img
              src={DesktopLogo}
              alt="Garcia Family Medicine Desktop Logo"
              className="logo-desktop"
            />
            <img
              src={MobileLogo}
              alt="Garcia Family Medicine Mobile Logo"
              className="logo-mobile"
            />
          </a>
        </div>

        {/* Right Section */}
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

      {/* Hamburger Button (Visible on Mobile) */}
      <button
        ref={hamburgerRef}
        className={`hamburger-button ${isNavOpen ? 'open' : ''}`}
        onClick={toggleNav}
        aria-label="Toggle Menu"
        aria-expanded={isNavOpen}
        aria-controls="header-navigation"
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

      {/* Navigation Menu */}
      {isNavOpen && (
        <FocusTrap>
          <nav
            id="header-navigation"
            ref={navRef}
            className={`header-nav ${isNavOpen ? 'open' : ''}`}
            aria-hidden={!isNavOpen}
          >
            <a href="/meet-dr-tess-garcia" onClick={handleNavLinkClick} ref={firstNavLinkRef}>
              {t('nav_meetTheDoctor')}
            </a>
            {/* Add more navigation links here as needed */}
            <a href="/services" onClick={handleNavLinkClick}>
              {t('nav_services')}
            </a>
            <a href="/contact" onClick={handleNavLinkClick}>
              {t('nav_contact')}
            </a>
            {/* Example additional links */}
          </nav>
        </FocusTrap>
      )}
    </header>
  );
}

export default Header;
