import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function HeroSection({ onExploreClick, onHeritageClick }) {
  return (
    <section className="hero-section">
      <div className="hero-ambient-glow" />

      {/* Tagline Badge */}
      <div className="tagline-badge">
        <Sparkles className="tagline-sparkle" size={15} />
        <span className="tagline-text">Discover. Learn. Preserve.</span>
        <Sparkles className="tagline-sparkle" size={15} />
      </div>

      {/* Main Heading */}
      <h1 className="hero-title">Bharat Sanskriti</h1>

      {/* Traditional Ornamental Motif Divider */}
      <div className="ornament-divider">
        <div className="ornament-line" />
        <span className="ornament-symbol">✦ ॐ ✦</span>
        <div className="ornament-line" />
      </div>

      {/* Main Quote Card */}
      <div className="quote-card">
        <span className="quote-glyph">“</span>
        <blockquote className="main-quote-text">
          “Learn the culture that exists today, and preserve the stories that may disappear tomorrow.”
        </blockquote>
      </div>

      {/* Description */}
      <p className="hero-description">
        Explore the rich cultural heritage of India through its festivals, traditions, arts, dances, cuisine, and heritage places.
      </p>

      {/* Primary Action Buttons */}
      <div className="hero-dual-cta">
        <button 
          id="btn-explore-now"
          className="btn-explore" 
          onClick={onExploreClick}
          aria-label="Explore"
        >
          <span>Explore Heritage</span>
          <ArrowRight className="btn-icon" size={20} />
        </button>

        {onHeritageClick && (
          <button 
            id="btn-verification-moderation-cta"
            className="btn-hero-connect"
            onClick={onHeritageClick}
            aria-label="Content Verification & Review Moderation"
          >
            <ShieldCheck size={18} className="hero-connect-sparkle" />
            <span>Content Verification & Review Moderation</span>
          </button>
        )}
      </div>
    </section>
  );
}
