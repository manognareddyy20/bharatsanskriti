import React from 'react';
import { ArrowLeft, ArrowRight, Landmark, Compass, Castle } from 'lucide-react';

export default function StateSelector({ onBackClick, onSelectState }) {
  // Exactly 3 states with muted heritage color accents
  const states = [
    {
      id: 'telangana',
      name: 'Telangana',
      description: "Discover Telangana's vibrant festivals, traditional arts, folk dances, music, and authentic cuisine.",
      badgeIcon: Landmark,
      themeColor: '#b88e44', // Antique Gold
      motifTag: 'Kakatiya & Deccan Heritage',
    },
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      description: "Explore Andhra Pradesh through its classical dance, traditional crafts, festivals, music, and cuisine.",
      badgeIcon: Compass,
      themeColor: '#631726', // Deep Maroon
      motifTag: 'Classical Arts & Temples',
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      description: "Experience Rajasthan's colorful festivals, folk traditions, handicrafts, music, dance, and royal heritage.",
      badgeIcon: Castle,
      themeColor: '#9c4a38', // Muted Terracotta
      motifTag: 'Royal Rajputana & Forts',
    },
  ];

  const handleCardClick = (state) => {
    if (onSelectState) {
      onSelectState(state);
    }
  };

  return (
    <section className="state-selector-view">
      {/* Back to Home Button */}
      <div className="back-nav-container">
        <button 
          id="btn-back-home"
          className="btn-back"
          onClick={onBackClick}
          aria-label="Back to Home"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="section-header">
        <h2 className="section-heading">Choose a State</h2>
        <p className="section-subtext">
          Select a state to explore its culture and traditions.
        </p>
      </div>

      {/* 3 State Cards Grid */}
      <div className="states-grid">
        {states.map((state) => {
          const IconComponent = state.badgeIcon;
          return (
            <div 
              key={state.id} 
              id={`state-card-${state.id}`}
              className="state-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(state)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(state);
                }
              }}
            >
              {/* Cultural motif accent badge */}
              <div className="state-motif-tag">{state.motifTag}</div>

              {/* Cultural Icon Visual */}
              <div 
                className="state-icon-badge"
                style={{ borderColor: `${state.themeColor}35` }}
              >
                <IconComponent size={26} style={{ color: state.themeColor }} />
              </div>

              {/* State Name */}
              <h3 className="state-name">{state.name}</h3>

              {/* Exact Description */}
              <p className="state-preview-details">{state.description}</p>

              {/* Explore Button */}
              <div className="state-btn-container">
                <button 
                  className="btn-state-explore"
                  type="button"
                  aria-label={`Explore ${state.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(state);
                  }}
                >
                  <span>Explore State</span>
                  <ArrowRight size={16} className="state-btn-arrow" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
