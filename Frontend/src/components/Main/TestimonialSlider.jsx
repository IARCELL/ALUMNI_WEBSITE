import React, { useState, useEffect } from 'react';
import testimonialsData from '../../data/messages.json';
import './TestimonialSlider.css';

const testimonials = testimonialsData.testimonials || [];

const LeftArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const RightArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
);

const getInitial = (name) => (name ? name.trim().charAt(0).toUpperCase() : '?');

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  const total = testimonials.length;

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const t = testimonials[current];
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  if (total === 0) return null;

  // Combine role + year into a single readable line, gracefully handling
  // either field being missing.
  const roleLine = [t.job, t.year].filter(Boolean).join(' \u2022 ');

  return (
    <div className="testimonial-slider-section">
      <h2 className="testimonial-title">What our Alumni say</h2>
      <div className="testimonial-title-underline"></div>

      <div
        className="testimonial-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Faded previous card */}
        <div className="testimonial-card faded">
          <div className="testimonial-message">{testimonials[prevIdx].message}</div>
        </div>

        {/* Left arrow — sits outside the card now, so it can't overlap text */}
        <button className="testimonial-arrow left" onClick={prev} aria-label="Previous testimonial">
          <span className="arrow-inner"><LeftArrow /></span>
        </button>

        {/* Main card */}
        <div className="testimonial-card main">
          <div className="testimonial-content">
            <div className="testimonial-message">
              {t.message}
            </div>

            <div className="testimonial-meta">
              <div className="testimonial-avatar">{getInitial(t.name)}</div>
              <div className="testimonial-meta-text">
                <div className="testimonial-name">{t.name}</div>
                {roleLine && <div className="testimonial-role-line">{roleLine}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Right arrow — sits outside the card now */}
        <button className="testimonial-arrow right" onClick={next} aria-label="Next testimonial">
          <span className="arrow-inner"><RightArrow /></span>
        </button>

        {/* Faded next card */}
        <div className="testimonial-card faded">
          <div className="testimonial-message">{testimonials[nextIdx].message}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;