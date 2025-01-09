// src/pages/Home/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';

// Import images
import Slide1 from '../../assets/images/slide1.png';
import Slide2 from '../../assets/images/slide2.png';
import Slide3 from '../../assets/images/slide3.png';
import Slide4 from '../../assets/images/slide4.png';
import Slide5 from '../../assets/images/slide5.png';
import Slide6 from '../../assets/images/slide6.png';

function Home() {
  const { t } = useTranslation('home');

  // Original slides
  const originalSlides = [
    { src: Slide1, alt: 'Slide 1' },
    { src: Slide2, alt: 'Slide 2' },
    { src: Slide3, alt: 'Slide 3' },
    { src: Slide4, alt: 'Slide 4' },
    { src: Slide5, alt: 'Slide 5' },
    { src: Slide6, alt: 'Slide 6' },
  ];

  // Create the cloned array: [last, ...original, first]
  const slides = [
    originalSlides[originalSlides.length - 1],
    ...originalSlides,
    originalSlides[0],
  ]; 
  // e.g., if originalSlides = 6, now we have 8 slides

  // Start at index=1 so we see the first real slide
  const [currentIndex, setCurrentIndex] = useState(1);
  // We'll manage a "transition" state: true => use CSS transition
  const [transition, setTransition] = useState(true);

  const autoSlideRef = useRef(null);
  const totalRealSlides = originalSlides.length; // 6

  // Next slide
  const goNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  // Previous slide
  const goPrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  // Dots => jump to the real slide index
  const goToSlide = realIndex => {
    setCurrentIndex(realIndex + 1);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  // onTransitionEnd => check for cloned slides
  const handleTransitionEnd = () => {
    // If we're at the cloned last => index = slides.length - 1
    // instantly jump to index=1 (the first real slide) w/o transition
    if (currentIndex === slides.length - 1) {
      setTransition(false);
      setCurrentIndex(1);
    }
    // If we're at the cloned first => index = 0
    // instantly jump to index=totalRealSlides (the last real slide)
    else if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(totalRealSlides);
    }
    // Else => normal in-between slides => keep transition on
  };

  // If we turned transition off => re-enable it on next render
  useEffect(() => {
    if (!transition) {
      // We just jumped => re-enable transition after the DOM updates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  }, [transition]);

  // offset in percentage => currentIndex * -100%
  const offsetPercentage = -(currentIndex * 100);

  return (
    <section className="home-page">
      <div className="gallery-spacer"></div>

      <div className="home-slideshow">
        <button className="arrow-btn arrow-left" onClick={goPrev}>
          &#10094;
        </button>

        <div className="slide-container">
          <div
            className="slide-wrapper"
            style={{
              transform: `translateX(${offsetPercentage}%)`,
              transition: transition ? 'transform 1.2s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((slide, i) => (
              <div className="slide" key={i}>
                <img src={slide.src} alt={slide.alt} className="slide-image" />
              </div>
            ))}
          </div>
        </div>

        <button className="arrow-btn arrow-right" onClick={goNext}>
          &#10095;
        </button>

        {/* Dot Indicators (0.. totalRealSlides-1) */}
        <div className="slide-dots">
          {originalSlides.map((_, realIndex) => {
            // if currentIndex === realIndex+1 => active
            const isActive = currentIndex === realIndex + 1;
            return (
              <span
                key={realIndex}
                className={`dot ${isActive ? 'active' : ''}`}
                onClick={() => goToSlide(realIndex)}
              />
            );
          })}
        </div>
      </div>

      <div className="home-info">
        <div className="home-extra-text">
          <h2>{t('homeExtraTitle')}</h2>
          <p>{t('homeExtraParagraph1')}</p>
          <p>{t('homeExtraParagraph2')}</p>
          <p>{t('homeExtraParagraph3')}</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
