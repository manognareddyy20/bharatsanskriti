import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, BookOpen, HeartHandshake, 
  Compass, Search, Plus, X, Share2 
} from 'lucide-react';
import { getAllItemsForFeature } from '../services/customItemsStorage';
import ShareCulturalItemModal from './ShareCulturalItemModal';

export default function FeatureItemsView({
  state,
  feature,
  onBackClick,
  onSelectItem,
  onPreserveItem,
  onToast,
}) {
  const [contributionRev, setContributionRev] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Load unified items: baseline curated items + community shared items
  const items = useMemo(() => {
    return getAllItemsForFeature(state.id, feature.id);
  }, [state.id, feature.id, contributionRev]);

  // Real-time Search Filtering (checks item name, tagline, and details)
  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = (item.name || '').toLowerCase().includes(q);
    const taglineMatch = (item.tagline || '').toLowerCase().includes(q);
    const infoMatch = (item.shortIntro || item.information || '').toLowerCase().includes(q);
    return nameMatch || taglineMatch || infoMatch;
  });

  // Handler when a new cultural item is successfully contributed
  const handleItemCreated = (newItem) => {
    setContributionRev((prev) => prev + 1);
    if (onToast) {
      onToast(`“${newItem.name}” has been successfully shared and added to ${state.name}!`);
    }
  };

  // Label configuration for feature
  const isFestival = feature.id === 'festivals';
  const searchPlaceholder = isFestival 
    ? 'Search festivals...' 
    : `Search ${feature.shortTitle ? feature.shortTitle.toLowerCase() : 'traditions'}...`;
  const noResultsText = isFestival 
    ? 'No festivals found.' 
    : `No ${feature.shortTitle ? feature.shortTitle.toLowerCase() : 'items'} found.`;
  const shareButtonLabel = isFestival 
    ? 'Share a Festival' 
    : `Share ${feature.shortTitle || 'Tradition'}`;

  return (
    <section className="feature-items-view">
      {/* Back Navigation Bar */}
      <div className="dashboard-nav-container">
        <button 
          id="btn-back-to-state-dashboard"
          className="btn-back"
          onClick={onBackClick}
          aria-label={`Back to ${state.name} Overview`}
        >
          <ArrowLeft size={18} />
          <span>Back to {state.name} Overview</span>
        </button>

        {/* Breadcrumb indicator */}
        <div className="breadcrumbs-nav">
          <span className="crumb-dim">States</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-dim">{state.name}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{feature.title}</span>
        </div>
      </div>

      {/* Feature Header */}
      <div className="feature-view-header">
        <div className="feature-view-badge">
          <span className="feature-emoji-header">{feature.icon}</span>
          <span>{feature.title} in {state.name}</span>
        </div>

        <h1 className="feature-view-title">{feature.title}</h1>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="feature-view-subtext">
          Explore the living traditions of {state.name}. Uncover their history, preserve your family memories, or share a cherished tradition with Bharat Sanskriti.
        </p>

        {/* Discover -> Learn -> Preserve -> Share Concept Indicator */}
        <div className="concept-flow-strip">
          <div className="flow-step">
            <Compass size={14} className="step-icon" />
            <span>1. Discover</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <BookOpen size={14} className="step-icon" />
            <span>2. Learn</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <HeartHandshake size={14} className="step-icon" />
            <span>3. Preserve</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step flow-step-share">
            <Share2 size={14} className="step-icon" />
            <span>4. Share</span>
          </div>
        </div>
      </div>

      {/* Search & Share Action Bar */}
      <div className="feature-view-action-bar">
        <div className="search-bar-wrap">
          <Search size={18} className="search-icon-inside" />
          <input
            id="input-feature-search"
            type="text"
            className="feature-search-input"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={searchPlaceholder}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <button
          id="btn-share-cultural-item"
          type="button"
          className="btn-share-cultural"
          onClick={() => setIsShareModalOpen(true)}
        >
          <Plus size={16} />
          <span>{shareButtonLabel}</span>
        </button>
      </div>

      {/* Cultural Items Grid / Clean Cards */}
      {filteredItems.length > 0 ? (
        <div className="cultural-items-grid">
          {filteredItems.map((item, index) => (
            <article 
              key={item.id} 
              id={`cultural-item-card-${item.id}`}
              className="cultural-item-card clean-item-card"
              tabIndex={0}
              role="button"
              onClick={() => onSelectItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectItem(item);
                }
              }}
            >
              {/* Card Header Top */}
              <div className="item-card-top">
                <span className="item-num-badge">0{index + 1}</span>
                <span className="item-category-pill">{item.category}</span>
              </div>

              {/* Cultural Item Name */}
              <h2 className="item-card-name">{item.name}</h2>

              {/* Existing Yellow-Line Short Sentence */}
              <p className="item-card-tagline">{item.tagline}</p>

              {/* Action Buttons: Discover & Learn, Preserve Story */}
              <div className="item-card-actions">
                <button
                  type="button"
                  className="btn-discover-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(item);
                  }}
                >
                  <span>Discover & Learn</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  className="btn-preserve-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreserveItem(item);
                  }}
                  title={`Preserve a personal or family story about ${item.name}`}
                >
                  <HeartHandshake size={15} />
                  <span>Preserve Story</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="no-items-empty-state" role="status">
          <p className="no-items-text">{noResultsText}</p>
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search-empty"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Share Modal */}
      <ShareCulturalItemModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        state={state}
        feature={feature}
        onItemCreated={handleItemCreated}
      />
    </section>
  );
}
