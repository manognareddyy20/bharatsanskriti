import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function StateDashboard({ state, onBackClick, onSelectFeature }) {
  // Exactly 5 features with 100% identical structure and design system
  const features = [
    {
      id: 'festivals',
      icon: '🌸',
      title: 'Festivals & Traditions',
      shortTitle: 'Festivals',
      description: 'Discover festivals, rituals, celebrations, and traditions passed through generations.',
    },
    {
      id: 'arts',
      icon: '🎨',
      title: 'Arts & Crafts',
      shortTitle: 'Arts & Crafts',
      description: 'Explore traditional paintings, handicrafts, textiles, and artistic traditions.',
    },
    {
      id: 'dance',
      icon: '💃',
      title: 'Dance & Music',
      shortTitle: 'Dance & Music',
      description: 'Learn about classical and folk dances, music, performers, and cultural expressions.',
    },
    {
      id: 'cuisine',
      icon: '🍛',
      title: 'Cuisine',
      shortTitle: 'Cuisine',
      description: 'Discover traditional foods, ingredients, recipes, and the stories behind regional cuisine.',
    },
    {
      id: 'heritage-places',
      icon: '🏛️',
      title: 'Heritage Places',
      shortTitle: 'Heritage Places',
      description: 'Explore historic monuments, ancient temples, royal palaces, and architectural marvels.',
    },
  ];

  const stateName = state?.name || 'Telangana';

  const handleFeatureClick = (feature) => {
    if (onSelectFeature) {
      onSelectFeature(feature);
    }
  };

  return (
    <section className="state-dashboard-view">
      {/* Top Navigation / Back button only */}
      <div className="dashboard-nav-container">
        <button 
          id="btn-back-to-states"
          className="btn-back"
          onClick={onBackClick}
          aria-label="Back to States"
        >
          <ArrowLeft size={18} />
          <span>Back to States</span>
        </button>
      </div>

      {/* State Header Section */}
      <div className="state-dashboard-header">
        <div className="state-header-badge">
          <Sparkles size={13} className="header-sparkle" />
          <span>Cultural Heritage Explorer</span>
          <Sparkles size={13} className="header-sparkle" />
        </div>

        <h1 className="state-dashboard-title">{stateName}</h1>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="state-dashboard-quote">
          “Explore the culture, traditions, and stories of {stateName}.”
        </p>
      </div>

      {/* Exactly 5 Main Feature Cards Grid - 100% Identical Visual Design System */}
      <div className="features-grid">
        {features.map((feature) => (
          <div 
            key={feature.id}
            id={`feature-card-${feature.id}`}
            className="feature-card"
            role="button"
            tabIndex={0}
            onClick={() => handleFeatureClick(feature)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleFeatureClick(feature);
              }
            }}
          >
            {/* Feature Icon */}
            <div className="feature-icon-wrapper">
              <span className="feature-emoji" role="img" aria-label={feature.title}>
                {feature.icon}
              </span>
            </div>

            {/* Feature Title */}
            <h3 className="feature-title">{feature.title}</h3>

            {/* Feature Short Description */}
            <p className="feature-description">{feature.description}</p>

            {/* Feature Explore Button */}
            <div className="feature-btn-container">
              <button 
                className="btn-feature-explore"
                type="button"
                aria-label={`Explore ${feature.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeatureClick(feature);
                }}
              >
                <span>Explore</span>
                <ArrowRight size={16} className="feature-btn-arrow" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
