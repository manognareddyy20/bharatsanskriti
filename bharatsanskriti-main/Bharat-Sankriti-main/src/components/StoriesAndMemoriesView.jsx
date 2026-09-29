import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Mic, Video, Image, FileText, 
  Calendar, User, Landmark, Sparkles, X, ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { getStoriesHierarchical, filterPreservedStories } from '../services/storyStorage';
import { FEATURE_DEFINITIONS, getAllCulturalItems } from '../data/culturalData';

export default function StoriesAndMemoriesView({ onBackToHome, initialSearch = '' }) {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState('all');
  const [selectedItem, setSelectedItem] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Selected story for full modal viewer
  const [activeStoryModal, setActiveStoryModal] = useState(null);

  // All cultural item names for the dropdown
  const allCulturalItems = useMemo(() => {
    return getAllCulturalItems();
  }, []);

  // Filtered item options based on selected state and feature
  const filteredItemOptions = useMemo(() => {
    let items = allCulturalItems;
    if (selectedState !== 'all') {
      items = items.filter(
        (i) => i.stateId === selectedState || i.stateName.toLowerCase() === selectedState.toLowerCase()
      );
    }
    if (selectedFeature !== 'all') {
      items = items.filter(
        (i) => i.featureId === selectedFeature || i.category.toLowerCase().includes(selectedFeature.toLowerCase())
      );
    }
    return Array.from(new Set(items.map((i) => i.name)));
  }, [selectedState, selectedFeature, allCulturalItems]);

  // Compute filtered stories
  const filteredStories = useMemo(() => {
    return filterPreservedStories({
      state: selectedState,
      feature: selectedFeature,
      culturalItem: selectedItem,
      contentType: selectedContentType,
      searchQuery: searchQuery,
    });
  }, [selectedState, selectedFeature, selectedItem, selectedContentType, searchQuery]);

  // Compute hierarchical structure of the filtered stories
  const hierarchicalStories = useMemo(() => {
    return getStoriesHierarchical(filteredStories);
  }, [filteredStories]);

  const statesList = Object.keys(hierarchicalStories);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedFeature('all');
    setSelectedItem('all');
    setSelectedContentType('all');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedState !== 'all' || 
    selectedFeature !== 'all' || 
    selectedItem !== 'all' || 
    selectedContentType !== 'all';

  return (
    <section className="stories-memories-view">
      {/* Top Back Nav */}
      <div className="dashboard-nav-container">
        <button 
          id="btn-back-to-home"
          className="btn-back"
          onClick={onBackToHome}
          aria-label="Back to Exploration"
        >
          <ArrowLeft size={18} />
          <span>Back to Exploration</span>
        </button>

        <div className="archive-count-pill">
          <BookOpen size={14} />
          <span>Living Heritage Archive • {filteredStories.length} Preserved {filteredStories.length === 1 ? 'Memory' : 'Memories'}</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="stories-view-header">
        <div className="stories-header-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Preserving India's Living Heritage</span>
          <Sparkles size={14} className="sparkle-icon" />
        </div>

        <h1 className="stories-view-title">Stories & Memories</h1>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="stories-view-quote">
          “Learn the culture that exists today, and preserve the stories that may disappear tomorrow.”
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="archive-filter-bar">
        {/* Search Box */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            id="archive-search-input"
            type="text"
            className="search-input"
            placeholder="Search stories by title, cultural item (e.g. Bathukamma), contributor, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dropdowns Row */}
        <div className="filter-dropdowns-row">
          {/* State Filter */}
          <div className="filter-select-group">
            <label htmlFor="filter-state-select" className="filter-label">State:</label>
            <select
              id="filter-state-select"
              className="filter-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedItem('all'); // reset item when state changes
              }}
            >
              <option value="all">All States</option>
              <option value="telangana">Telangana</option>
              <option value="andhra-pradesh">Andhra Pradesh</option>
              <option value="rajasthan">Rajasthan</option>
            </select>
          </div>

          {/* Feature Filter */}
          <div className="filter-select-group">
            <label htmlFor="filter-feature-select" className="filter-label">Feature:</label>
            <select
              id="filter-feature-select"
              className="filter-select"
              value={selectedFeature}
              onChange={(e) => {
                setSelectedFeature(e.target.value);
                setSelectedItem('all');
              }}
            >
              <option value="all">All Features</option>
              {FEATURE_DEFINITIONS.map((f) => (
                <option key={f.id} value={f.id}>{f.shortTitle}</option>
              ))}
            </select>
          </div>

          {/* Cultural Item Filter */}
          <div className="filter-select-group">
            <label htmlFor="filter-item-select" className="filter-label">Cultural Item:</label>
            <select
              id="filter-item-select"
              className="filter-select"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="all">All Cultural Items</option>
              {filteredItemOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Content Type Filter */}
          <div className="filter-select-group">
            <label htmlFor="filter-type-select" className="filter-label">Type:</label>
            <select
              id="filter-type-select"
              className="filter-select"
              value={selectedContentType}
              onChange={(e) => setSelectedContentType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="text">📝 Written Stories</option>
              <option value="audio">🎙️ Audio Recordings</option>
              <option value="video">🎥 Video Recordings</option>
              <option value="photo">📷 Photo Memories</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={handleResetFilters}
            >
              <X size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Automatic Hierarchical Presentation */}
      <div className="archive-results-container">
        {statesList.length === 0 ? (
          <div className="empty-archive-card">
            <BookOpen size={48} className="empty-icon" />
            <h3>No Preserved Stories Found</h3>
            <p>
              No memories match your current search and filter criteria. Try adjusting your query or be the first to preserve a story!
            </p>
            {hasActiveFilters && (
              <button 
                type="button" 
                className="btn-primary-sm mt-3"
                onClick={handleResetFilters}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="hierarchical-archive-tree">
            {statesList.map((stateName) => {
              const featuresMap = hierarchicalStories[stateName];
              const featuresList = Object.keys(featuresMap);

              return (
                <section key={stateName} className="tree-state-branch">
                  {/* LEVEL 1: STATE HEADER */}
                  <div className="tree-state-header">
                    <div className="tree-state-title-wrap">
                      <Landmark size={22} className="tree-state-icon" />
                      <h2 className="tree-state-name">{stateName}</h2>
                    </div>
                    <span className="tree-state-badge">
                      State Heritage Archive
                    </span>
                  </div>

                  {/* LEVEL 2: FEATURES UNDER STATE */}
                  <div className="tree-state-features-container">
                    {featuresList.map((featureName) => {
                      const itemsMap = featuresMap[featureName];
                      const itemsList = Object.keys(itemsMap);

                      return (
                        <div key={featureName} className="tree-feature-branch">
                          {/* Feature Subheading */}
                          <div className="tree-feature-header">
                            <span className="tree-branch-indicator">↳</span>
                            <h3 className="tree-feature-title">{featureName}</h3>
                          </div>

                          {/* LEVEL 3: CULTURAL ITEMS UNDER FEATURE */}
                          <div className="tree-items-container">
                            {itemsList.map((culturalItemName) => {
                              const stories = itemsMap[culturalItemName];

                              return (
                                <div key={culturalItemName} className="tree-item-group">
                                  {/* Cultural Item Section Heading */}
                                  <div className="tree-item-header">
                                    <div className="tree-item-tag">
                                      <Sparkles size={13} />
                                      <span>{culturalItemName}</span>
                                    </div>
                                    <span className="tree-story-count">
                                      {stories.length} {stories.length === 1 ? 'preserved story' : 'preserved stories'}
                                    </span>
                                  </div>

                                  {/* LEVEL 4: PRESERVED STORIES CARDS */}
                                  <div className="stories-card-grid">
                                    {stories.map((story) => (
                                      <article
                                        key={story.id}
                                        className="preserved-story-card"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setActiveStoryModal(story)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' || e.key === ' ') {
                                            setActiveStoryModal(story);
                                          }
                                        }}
                                      >
                                        {/* Card Top Strip: Content Type & Date */}
                                        <div className="story-card-top-strip">
                                          <ContentTypeBadge type={story.contentType} />
                                          <span className="story-card-date">
                                            <Calendar size={12} />
                                            <span>{story.formattedDate || 'Recently Added'}</span>
                                          </span>
                                        </div>

                                        {/* Story Title */}
                                        <h4 className="story-card-title">{story.storyTitle}</h4>

                                        {/* Contributor Name */}
                                        <div className="story-card-contributor">
                                          <User size={13} className="contributor-icon" />
                                          <span>Preserved by <strong>{story.contributorName}</strong></span>
                                        </div>

                                        {/* Hierarchical Badges */}
                                        <div className="story-card-hierarchy-tags">
                                          <span className="mini-tag tag-state">{story.state}</span>
                                          <span className="mini-tag tag-feature">{story.feature}</span>
                                          <span className="mini-tag tag-item">{story.culturalItem}</span>
                                        </div>

                                        {/* Story Media / Content Preview */}
                                        <div className="story-card-preview-area">
                                          {story.contentType === 'text' && (
                                            <p className="story-text-preview">
                                              {story.textContent ? story.textContent.slice(0, 160) + (story.textContent.length > 160 ? '...' : '') : 'No written excerpt.'}
                                            </p>
                                          )}

                                          {story.contentType === 'audio' && (
                                            <div className="story-audio-preview" onClick={(e) => e.stopPropagation()}>
                                              {story.mediaUrl ? (
                                                <audio controls src={story.mediaUrl} className="embedded-audio-player" />
                                              ) : (
                                                <div className="audio-voice-box">
                                                  <Mic size={18} className="voice-mic-icon" />
                                                  <span>Recorded Oral History {story.audioDuration ? `(${story.audioDuration})` : ''}</span>
                                                </div>
                                              )}
                                              {story.textContent && (
                                                <p className="story-text-snippet">"{story.textContent.slice(0, 110)}..."</p>
                                              )}
                                            </div>
                                          )}

                                          {story.contentType === 'video' && (
                                            <div className="story-video-preview" onClick={(e) => e.stopPropagation()}>
                                              {story.mediaUrl ? (
                                                <video controls src={story.mediaUrl} className="embedded-video-player" />
                                              ) : (
                                                <div className="video-standby-card">
                                                  <Video size={24} className="video-cam-icon" />
                                                  <span>Recorded Video Memory {story.videoDuration ? `(${story.videoDuration})` : ''}</span>
                                                </div>
                                              )}
                                              {story.textContent && (
                                                <p className="story-text-snippet">"{story.textContent.slice(0, 100)}..."</p>
                                              )}
                                            </div>
                                          )}

                                          {story.contentType === 'photo' && (
                                            <div className="story-photo-preview">
                                              {story.mediaUrl ? (
                                                <div className="photo-thumb-wrap">
                                                  <img src={story.mediaUrl} alt={story.storyTitle} className="photo-thumb" />
                                                </div>
                                              ) : (
                                                <div className="photo-placeholder-box">
                                                  <Image size={24} />
                                                  <span>Archival Photo</span>
                                                </div>
                                              )}
                                              {story.textContent && (
                                                <p className="story-photo-caption">"{story.textContent.slice(0, 100)}..."</p>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        {/* Card Read Full Story Link */}
                                        <div className="story-card-footer">
                                          <span className="btn-read-memory">
                                            <span>Read Full Memory</span>
                                            <ChevronRight size={14} />
                                          </span>
                                        </div>
                                      </article>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL STORY DETAIL MODAL */}
      {activeStoryModal && (
        <StoryDetailModal
          story={activeStoryModal}
          onClose={() => setActiveStoryModal(null)}
        />
      )}
    </section>
  );
}

// Helper: Content Type Badge
function ContentTypeBadge({ type }) {
  switch (type) {
    case 'audio':
      return (
        <span className="type-badge badge-audio">
          <Mic size={12} />
          <span>Audio Memory</span>
        </span>
      );
    case 'video':
      return (
        <span className="type-badge badge-video">
          <Video size={12} />
          <span>Video Memory</span>
        </span>
      );
    case 'photo':
      return (
        <span className="type-badge badge-photo">
          <Image size={12} />
          <span>Photo Memory</span>
        </span>
      );
    default:
      return (
        <span className="type-badge badge-text">
          <FileText size={12} />
          <span>Written Story</span>
        </span>
      );
  }
}

// Modal component to view the full preserved story
function StoryDetailModal({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card story-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Story Dialog"
        >
          <X size={20} />
        </button>

        {/* Header Strip */}
        <div className="story-modal-header">
          <ContentTypeBadge type={story.contentType} />
          <span className="story-modal-date">
            <Calendar size={13} />
            <span>Preserved on {story.formattedDate}</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="story-modal-title">{story.storyTitle}</h2>

        {/* Contributor Byline */}
        <div className="story-modal-byline">
          <User size={15} />
          <span>Contributed by <strong>{story.contributorName}</strong></span>
        </div>

        {/* Hierarchical Breadcrumb Tag */}
        <div className="story-modal-breadcrumb">
          <span className="mb-state">{story.state}</span>
          <span className="mb-sep">→</span>
          <span className="mb-feature">{story.feature}</span>
          <span className="mb-sep">→</span>
          <span className="mb-item">{story.culturalItem}</span>
        </div>

        <div className="ornament-divider modal-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        {/* Media Player Section */}
        {story.contentType === 'audio' && story.mediaUrl && (
          <div className="modal-media-block">
            <h4 className="media-block-title">Recorded Audio Memory</h4>
            <audio controls autoPlay src={story.mediaUrl} className="custom-audio-player w-full" />
          </div>
        )}

        {story.contentType === 'video' && story.mediaUrl && (
          <div className="modal-media-block">
            <h4 className="media-block-title">Recorded Video Memory</h4>
            <video controls autoPlay src={story.mediaUrl} className="custom-video-player w-full" />
          </div>
        )}

        {story.contentType === 'photo' && story.mediaUrl && (
          <div className="modal-media-block photo-modal-block">
            <img src={story.mediaUrl} alt={story.storyTitle} className="modal-photo-full" />
          </div>
        )}

        {/* Full Text Story Content */}
        {story.textContent && (
          <div className="story-modal-body">
            <span className="modal-quote-glyph">“</span>
            <p className="story-modal-paragraphs">
              {story.textContent}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="story-modal-footer">
          <span className="archive-stamp">
            Bharat Sanskriti National Living Cultural Archive
          </span>
          <button type="button" className="btn-secondary-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
