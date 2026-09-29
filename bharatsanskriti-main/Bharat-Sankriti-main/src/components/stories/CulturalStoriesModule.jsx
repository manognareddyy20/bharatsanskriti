import React, { useState, useMemo } from 'react';
import { 
  Mic, Search, Star, Sparkles, Plus, BookOpen, 
  X, AlertCircle, CheckCircle, Volume2, ArrowRight, User 
} from 'lucide-react';
import { 
  getAllCulturalStories, 
  saveCulturalStory, 
  deleteCulturalStory,
  updateStoryVerificationStatus
} from '../../services/storyStorage';
import { saveAudioBlob } from '../../services/audioStorageService';
import { getCurrentUser } from '../../services/authService';
import RealAudioRecorder from './RealAudioRecorder';
import CulturalStoryCard from './CulturalStoryCard';
import AIStoryStructureModal from './AIStoryStructureModal';

export default function CulturalStoriesModule({ onToast }) {
  const [dataRevision, setDataRevision] = useState(0);
  const currentUser = getCurrentUser();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // New Story Drawer / Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form Fields for New Story
  const [title, setTitle] = useState('');
  const [person, setPerson] = useState('');
  const [place, setPlace] = useState(currentUser?.location || '');
  const [tradition, setTradition] = useState('');
  const [description, setDescription] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null); // { blob, url, durationFormatted }
  const [structuredData, setStructuredData] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load all stories
  const stories = useMemo(() => {
    return getAllCulturalStories();
  }, [dataRevision]);

  // Filtered stories (Strict Visibility Rule: Unverified pending stories are hidden from public until Temple Admin verifies them!)
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const isPending = story.verificationStatus === 'NEEDS_VERIFICATION' || story.verificationStatus === 'ADMIN_REVIEW';
      const isRejected = story.verificationStatus === 'NOT_RELEVANT' || story.verificationStatus === 'REJECTED';
      const isAuthor = currentUser && (
        (story.preservedBy || '').toLowerCase() === (currentUser.name || '').toLowerCase() ||
        (story.person || '').toLowerCase() === (currentUser.name || '').toLowerCase()
      );
      const isTempleAdmin = currentUser && currentUser.role === 'temple_admin';

      if (isRejected && !isTempleAdmin && !isAuthor) return false;

      // UNTIL VERIFIED BY TEMPLE ADMIN, NO ONE CAN SEE EXCEPT TEMPLE ADMIN AND THE AUTHOR WHO KEPT THAT STORY!
      if (isPending && !isAuthor && !isTempleAdmin) {
        return false;
      }

      if (onlyFavorites && !story.isFavorite) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (story.title || '').toLowerCase().includes(q);
        const personMatch = (story.person || '').toLowerCase().includes(q);
        const placeMatch = (story.place || '').toLowerCase().includes(q);
        const tradMatch = (story.tradition || '').toLowerCase().includes(q);
        const descMatch = (story.description || '').toLowerCase().includes(q);
        if (!titleMatch && !personMatch && !placeMatch && !tradMatch && !descMatch) return false;
      }

      return true;
    });
  }, [stories, searchQuery, onlyFavorites, currentUser]);

  const handleVerifyStory = (storyId, newStatus) => {
    try {
      const updated = updateStoryVerificationStatus(storyId, newStatus, `Verified by Temple Admin as ${newStatus}`);
      setDataRevision(prev => prev + 1);
      if (onToast) {
        onToast(`Story Verified! Status set to: ${updated.verificationBadge?.icon || ''} ${updated.verificationBadge?.label || newStatus}`);
      }
    } catch (err) {
      console.error('Error verifying story:', err);
    }
  };

  // Open modal reset
  const handleOpenRecordModal = () => {
    setTitle('');
    setPerson('');
    setPlace(currentUser?.location || 'India');
    setTradition('');
    setDescription('');
    setRecordedAudio(null);
    setStructuredData(null);
    setFormError('');
    setIsRecordModalOpen(true);
  };

  // Handle saving new cultural story
  const handleSaveStory = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a title for your cultural story.');
      return;
    }

    if (!person.trim()) {
      setFormError('Please enter the name of the elder or relative who shared this tradition.');
      return;
    }

    if (!description.trim() && !recordedAudio) {
      setFormError('Please record audio or enter story text before saving.');
      return;
    }

    setIsSaving(true);

    try {
      let audioId = null;

      // If user recorded real audio, persist the actual Blob into IndexedDB!
      if (recordedAudio && recordedAudio.blob) {
        audioId = `audio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        await saveAudioBlob(audioId, recordedAudio.blob, 'audio/webm');
      }

      const newStory = saveCulturalStory({
        title: title.trim(),
        person: person.trim(),
        place: place.trim() || 'India',
        tradition: tradition.trim() || 'Oral Cultural Tradition',
        description: description.trim(),
        preservedBy: currentUser?.name || 'Family Contributor',
        hasAudio: Boolean(recordedAudio),
        audioDuration: recordedAudio?.durationFormatted || '',
        audioId: audioId,
        structuredData: structuredData
      });

      setIsSaving(false);

      if (newStory.verificationStatus === 'NOT_RELEVANT') {
        setFormError(`Content Rejected: ${newStory.verificationReason || 'Story does not pertain to Indian culture or heritage.'}`);
        return;
      }

      setIsRecordModalOpen(false);
      setDataRevision(prev => prev + 1);

      if (onToast) {
        const badgeLabel = newStory.verificationBadge?.label || 'Culturally Relevant';
        const badgeIcon = newStory.verificationBadge?.icon || '🟢';
        onToast(`“${newStory.title}” saved! Status: ${badgeIcon} ${badgeLabel}`);
      }
    } catch (err) {
      console.error('Error saving cultural story:', err);
      setIsSaving(false);
      setFormError('Could not save story. Please try again.');
    }
  };

  const handleDeleteStory = (storyId) => {
    if (window.confirm('Are you sure you want to remove this memory from your archive?')) {
      deleteCulturalStory(storyId);
      setDataRevision(prev => prev + 1);
      if (onToast) {
        onToast('Memory removed from archive.');
      }
    }
  };

  return (
    <div className="cultural-stories-module">
      {/* Header Section */}
      <header className="module-view-header">
        <div className="module-header-badge">
          <Sparkles size={14} />
          <span>Family → Future</span>
          <Sparkles size={14} />
        </div>

        <h1 className="module-view-title">Cultural Stories</h1>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="module-view-quote">
          “Preserve the living memories, songs, and traditions shared by family elders before they fade from oral memory.”
        </p>
      </header>

      {/* Toolbar & Record Action */}
      <div className="archive-filter-bar stories-filter-bar">
        {/* Search */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search cultural stories by title, elder, tradition, or place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear Search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Favorite Filter Toggle */}
        <div className="filter-dropdowns-row">
          <button 
            type="button"
            className={`btn-fav-filter-toggle ${onlyFavorites ? 'active' : ''}`}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
          >
            <Star size={15} fill={onlyFavorites ? '#b88e44' : 'none'} />
            <span>Starred Memories ({stories.filter(s => s.isFavorite).length})</span>
          </button>

          {/* Record Cultural Story CTA Button */}
          <button 
            type="button" 
            className="btn-record-story-main"
            onClick={handleOpenRecordModal}
          >
            <Mic size={16} />
            <span>Record Cultural Story</span>
          </button>
        </div>
      </div>

      {/* Stories Results Grid */}
      <div className="stories-grid-container">
        {filteredStories.length === 0 ? (
          <div className="empty-archive-card">
            <Mic size={48} className="empty-icon" />
            <h3>No stories yet</h3>
            <p>
              Record your first cultural memory. Capture how your family celebrates festivals, elder recipes, or folk songs.
            </p>
            <button 
              type="button" 
              className="btn-primary-sm mt-3"
              onClick={handleOpenRecordModal}
            >
              <Mic size={15} />
              <span>Record Your First Memory</span>
            </button>
          </div>
        ) : (
          <div className="cultural-stories-grid">
            {filteredStories.map(story => (
              <CulturalStoryCard 
                key={story.id}
                story={story}
                onFavoriteToggled={(id, isFav) => {
                  setDataRevision(prev => prev + 1);
                  if (onToast) {
                    onToast(isFav ? 'Added to starred memories ★' : 'Removed from starred memories ☆');
                  }
                }}
                onDelete={handleDeleteStory}
                onVerifyStory={handleVerifyStory}
              />
            ))}
          </div>
        )}
      </div>

      {/* Record Cultural Story Modal */}
      {isRecordModalOpen && (
        <div className="modal-overlay" onClick={() => setIsRecordModalOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-card record-story-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setIsRecordModalOpen(false)}
              aria-label="Close Story Record Modal"
            >
              <X size={20} />
            </button>

            <div className="modal-header-standard">
              <div className="modal-badge">
                <Mic size={14} />
                <span>Living Oral Archive</span>
              </div>
              <h2 className="modal-title">Record Cultural Memory</h2>
              <p className="modal-subtitle">
                Capture the voice of elders or write family traditions to preserve them permanently.
              </p>
            </div>

            {formError && <div className="form-error-banner">{formError}</div>}

            <form onSubmit={handleSaveStory} className="record-story-form">
              {/* REAL MICROPHONE AUDIO RECORDER */}
              <div className="form-audio-recorder-section">
                <RealAudioRecorder 
                  onRecordingComplete={(rec) => {
                    setRecordedAudio(rec);
                  }}
                  onReset={() => {
                    setRecordedAudio(null);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Memory Title <span className="required-star">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. My Grandmother's Bathukamma Songs and Flower Stacking"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">
                    Told / Shared By (Person) <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Satyavati Amma (Grandmother)"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">Place / Ancestral Village</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Warangal, Telangana"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Festival or Tradition</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Bathukamma / Sankranti Muggu / Temple Bronze Casting"
                  value={tradition}
                  onChange={(e) => setTradition(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="label-with-ai-action">
                  <label className="form-label">
                    Story Description or Transcript
                  </label>
                  <button 
                    type="button" 
                    className="btn-trigger-ai-structure"
                    onClick={() => setIsAIModalOpen(true)}
                  >
                    <Sparkles size={13} />
                    <span>Structure with AI</span>
                  </button>
                </div>
                <textarea 
                  className="form-textarea"
                  rows={4}
                  placeholder="Write out the story, recipes, advice, or songs shared by your family elders..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {structuredData && (
                <div className="structured-preview-pill">
                  <CheckCircle size={14} className="check-gold" />
                  <span>AI Structured: “{structuredData.title}”</span>
                </div>
              )}

              <div className="modal-actions-bar">
                <button 
                  type="button" 
                  className="btn-secondary-modal"
                  onClick={() => setIsRecordModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary-modal"
                  disabled={isSaving}
                >
                  <CheckCircle size={16} />
                  <span>{isSaving ? 'Saving to Archive...' : 'Save Cultural Story'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Story Structuring Modal */}
      {isAIModalOpen && (
        <AIStoryStructureModal 
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          initialText={description}
          initialMetadata={{
            person: person || 'Family Elder',
            place: place || currentUser?.location || 'India',
            tradition: tradition || 'Oral Tradition',
            contributorName: currentUser?.name || 'Family Member'
          }}
          onStructureApplied={(res) => {
            setTitle(res.title);
            setPerson(res.person);
            setPlace(res.place);
            setTradition(res.tradition);
            setDescription(res.structuredStory);
            setStructuredData(res);
          }}
        />
      )}
    </div>
  );
}
