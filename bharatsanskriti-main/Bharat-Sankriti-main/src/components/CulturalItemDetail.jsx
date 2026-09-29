import React, { useState } from 'react';
import { 
  ArrowLeft, Compass, BookOpen, HeartHandshake, Sparkles, 
  Check, Calendar, Landmark, ArrowRight, Mic
} from 'lucide-react';
import { getStoryCountForItem } from '../services/storyStorage';

export default function CulturalItemDetail({
  state,
  feature,
  item,
  onBackClick,
  onOpenPreserve,
  onViewStories,
}) {
  // Active conceptual tab: 'discover' | 'learn' | 'preserve'
  const [activeTab, setActiveTab] = useState('discover');

  const storyCount = getStoryCountForItem(item.name);

  return (
    <article className="cultural-item-detail-view">
      {/* Navigation Header with Breadcrumbs */}
      <div className="dashboard-nav-container">
        <button 
          id="btn-back-to-feature-items"
          className="btn-back"
          onClick={onBackClick}
          aria-label={`Back to ${feature.title}`}
        >
          <ArrowLeft size={18} />
          <span>Back to {feature.title}</span>
        </button>

        {/* Detailed Breadcrumb */}
        <div className="breadcrumbs-nav">
          <span className="crumb-dim">States</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-dim">{state.name}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-dim">{feature.shortTitle || feature.title}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{item.name}</span>
        </div>
      </div>

      {/* Item Hero Section */}
      <header className="item-detail-hero">
        <div className="item-detail-meta-strip">
          <span className="detail-pill pill-state">
            <Landmark size={13} />
            <span>{state.name}</span>
          </span>
          <span className="detail-pill pill-feature">
            <span>{feature.icon} {feature.shortTitle || feature.title}</span>
          </span>
          <span className="detail-pill pill-category">
            <span>{item.category}</span>
          </span>
        </div>

        <h1 className="item-detail-title">{item.name}</h1>

        <p className="item-detail-tagline">“{item.tagline}”</p>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="item-detail-intro">
          {item.shortIntro}
        </p>

        {/* Contributed Image if available */}
        {item.image && (
          <div className="item-detail-image-showcase">
            <img src={item.image} alt={item.name} className="item-showcase-img" />
          </div>
        )}
      </header>

      {/* DISCOVER → LEARN → PRESERVE Interactive Navigation Tabs */}
      <nav className="dlp-tabs-bar" aria-label="Cultural Navigation Tabs">
        <button
          id="tab-discover"
          type="button"
          className={`dlp-tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('discover');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        >
          <div className="tab-icon-wrapper">
            <Compass size={18} />
          </div>
          <div className="tab-text-group">
            <span className="tab-step-label">Step 1</span>
            <span className="tab-main-label">Discover</span>
          </div>
        </button>

        <div className="tab-separator">→</div>

        <button
          id="tab-learn"
          type="button"
          className={`dlp-tab-btn ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('learn');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        >
          <div className="tab-icon-wrapper">
            <BookOpen size={18} />
          </div>
          <div className="tab-text-group">
            <span className="tab-step-label">Step 2</span>
            <span className="tab-main-label">Learn</span>
          </div>
        </button>

        <div className="tab-separator">→</div>

        <button
          id="tab-preserve"
          type="button"
          className={`dlp-tab-btn ${activeTab === 'preserve' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('preserve');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        >
          <div className="tab-icon-wrapper">
            <HeartHandshake size={18} />
          </div>
          <div className="tab-text-group">
            <span className="tab-step-label">Step 3</span>
            <span className="tab-main-label">Preserve</span>
          </div>
          {storyCount > 0 && (
            <span className="tab-count-badge">{storyCount}</span>
          )}
        </button>
      </nav>

      {/* TAB 1: DISCOVER VIEW */}
      {activeTab === 'discover' && (
        <section className="dlp-content-pane dlp-pane-discover">
          {/* Audio Story Card if oral memory was contributed */}
          {item.audioUrl && (
            <div className="detail-card audio-story-highlight-card">
              <div className="card-header-with-icon">
                <Mic size={20} className="card-accent-icon" />
                <h2 className="card-heading">Oral Story & Voice Memory</h2>
              </div>
              <p className="card-body-text">
                Listen to the preserved oral memory recorded for {item.name}:
              </p>
              <audio controls src={item.audioUrl} className="custom-audio-player mt-2" />
            </div>
          )}

          {/* Origin Card */}
          <div className="detail-card highlight-card">
            <div className="card-header-with-icon">
              <Compass size={20} className="card-accent-icon" />
              <h2 className="card-heading">Origins & Geographical Heritage</h2>
            </div>
            <p className="card-body-text">{item.discover?.origin || `Living tradition celebrated in ${state.name}.`}</p>
            <div className="card-sub-box">
              <strong>Cultural Context:</strong> {item.discover?.culturalContext || item.tagline}
            </div>
          </div>

          {/* Key Cultural Highlights */}
          {item.discover?.highlights && item.discover.highlights.length > 0 && (
            <div className="highlights-section">
              <h2 className="section-subheading">Key Cultural Highlights</h2>
              <div className="highlights-quad-grid">
                {item.discover.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-quad-card">
                    <div className="quad-badge">0{index + 1}</div>
                    <p className="quad-text">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt to proceed to Step 2: Learn */}
          <div className="tab-footer-advance">
            <div className="advance-text">
              <h4>Ready to dive deeper into the traditions and history?</h4>
              <p>Explore the full historical chronicle, significance, and step-by-step rituals.</p>
            </div>
            <button
              type="button"
              className="btn-advance-step"
              onClick={() => {
                setActiveTab('learn');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            >
              <span>Continue to Learn</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      )}

      {/* TAB 2: LEARN VIEW */}
      {activeTab === 'learn' && (
        <section className="dlp-content-pane dlp-pane-learn">
          {/* History & Origin */}
          <div className="detail-card">
            <div className="card-header-with-icon">
              <BookOpen size={20} className="card-accent-icon" />
              <h2 className="card-heading">History & Historical Chronicle</h2>
            </div>
            <p className="card-body-text leading-relaxed">{item.learn.history}</p>
          </div>

          {/* Cultural & Spiritual Significance */}
          <div className="detail-card">
            <div className="card-header-with-icon">
              <Sparkles size={20} className="card-accent-icon" />
              <h2 className="card-heading">Cultural & Living Significance</h2>
            </div>
            <p className="card-body-text leading-relaxed">{item.learn.significance}</p>
          </div>

          {/* Traditions & Practices */}
          <div className="detail-card">
            <div className="card-header-with-icon">
              <Check size={20} className="card-accent-icon" />
              <h2 className="card-heading">Traditions, Rituals & Practices</h2>
            </div>
            <p className="traditions-intro-text">
              Step-by-step practices passed down through generations:
            </p>
            <ol className="step-traditions-list">
              {(item.learn?.traditions || []).map((tradition, idx) => (
                <li key={idx} className="step-tradition-item">
                  <span className="step-number">{idx + 1}</span>
                  <div className="step-content">{tradition}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* How Practiced Today */}
          <div className="detail-card">
            <div className="card-header-with-icon">
              <Calendar size={20} className="card-accent-icon" />
              <h2 className="card-heading">How It Is Celebrated & Practiced Today</h2>
            </div>
            <p className="card-body-text leading-relaxed">{item.learn?.howPracticed || item.shortIntro}</p>
          </div>

          {/* Interesting Facts & Did You Know? */}
          {item.learn?.interestingFacts && item.learn.interestingFacts.length > 0 && (
            <div className="facts-container">
              <div className="facts-header">
                <Sparkles size={20} className="facts-sparkle-icon" />
                <h2 className="card-heading">Did You Know? Fascinating Cultural Facts</h2>
              </div>
              <div className="facts-grid">
                {item.learn.interestingFacts.map((fact, index) => (
                  <div key={index} className="fact-item-card">
                    <span className="fact-glyph">✦</span>
                    <p className="fact-text">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt to proceed to Step 3: Preserve */}
          <div className="tab-footer-advance">
            <div className="advance-text">
              <h4>Preserve this culture for future generations!</h4>
              <p>Add your family's personal story, audio memory, or photograph to the national archive.</p>
            </div>
            <button
              type="button"
              className="btn-advance-step btn-advance-preserve"
              onClick={() => {
                setActiveTab('preserve');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            >
              <span>Proceed to Preserve</span>
              <HeartHandshake size={17} />
            </button>
          </div>
        </section>
      )}

      {/* TAB 3: PRESERVE VIEW */}
      {activeTab === 'preserve' && (
        <section className="dlp-content-pane dlp-pane-preserve">
          <div className="preserve-hero-card">
            <div className="preserve-hero-icon-badge">
              <HeartHandshake size={32} />
            </div>

            <h2 className="preserve-hero-title">
              Preserve a Story about {item.name}
            </h2>

            <p className="preserve-hero-subtext">
              {item.preserve?.promptText || `Preserve your personal or family stories about ${item.name}.`}
            </p>

            {/* Inspiration / Memory Starters */}
            {item.preserve?.memoryIdeas && item.preserve.memoryIdeas.length > 0 && (
              <div className="memory-starters-card">
                <h3 className="memory-starters-heading">
                  <Sparkles size={16} />
                  <span>Memory Starters & Ideas:</span>
                </h3>
                <ul className="memory-starters-list">
                  {item.preserve.memoryIdeas.map((idea, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Action Button to open Preserve Modal */}
            <div className="preserve-action-container">
              <button
                type="button"
                id="btn-trigger-preserve-modal"
                className="btn-primary-preserve-lg"
                onClick={() => onOpenPreserve(item)}
              >
                <HeartHandshake size={20} />
                <span>Preserve a Story about {item.name}</span>
              </button>

              {storyCount > 0 && (
                <button
                  type="button"
                  className="btn-view-stories-secondary"
                  onClick={() => onViewStories(item.name)}
                >
                  <BookOpen size={16} />
                  <span>Read Preserved Memories ({storyCount})</span>
                </button>
              )}
            </div>

            <div className="preserve-guarantee-note">
              <span>Your story will be permanently preserved under <strong>{state.name} → {feature.shortTitle || feature.title} → {item.name}</strong> in the Stories & Memories archive.</span>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
