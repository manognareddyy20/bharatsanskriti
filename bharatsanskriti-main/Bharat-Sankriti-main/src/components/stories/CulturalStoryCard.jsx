import React, { useState, useEffect } from 'react';
import { 
  Star, Mic, Calendar, User, MapPin, Sparkles, 
  Trash2, Volume2, AlertCircle, ChevronDown, ChevronUp, ShieldCheck, Check, X 
} from 'lucide-react';
import { getAudioBlobUrl } from '../../services/audioStorageService';
import { toggleCulturalStoryFavorite } from '../../services/storyStorage';
import { getVerificationBadge } from '../../services/contentVerificationService';
import { getCurrentUser } from '../../services/authService';

export default function CulturalStoryCard({
  story,
  onFavoriteToggled,
  onDelete,
  onVerifyStory
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [isFavorite, setIsFavorite] = useState(story.isFavorite || false);
  const [isExpanded, setIsExpanded] = useState(false);
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  // Sync favorite state if prop updates
  useEffect(() => {
    setIsFavorite(story.isFavorite || false);
  }, [story.isFavorite]);

  // Load audio from IndexedDB if this story has recorded audio
  useEffect(() => {
    let active = true;
    let createdUrl = null;

    if (story.hasAudio && story.audioId) {
      setLoadingAudio(true);
      getAudioBlobUrl(story.audioId)
        .then(url => {
          if (active && url) {
            createdUrl = url;
            setAudioUrl(url);
          }
          if (active) setLoadingAudio(false);
        })
        .catch(err => {
          console.warn('Could not load audio blob:', err);
          if (active) setLoadingAudio(false);
        });
    }

    return () => {
      active = false;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [story.hasAudio, story.audioId]);

  const handleStarClick = (e) => {
    e.stopPropagation();
    const newStatus = toggleCulturalStoryFavorite(story.id);
    setIsFavorite(newStatus);
    if (onFavoriteToggled) {
      onFavoriteToggled(story.id, newStatus);
    }
  };

  const badge = story.verificationBadge || getVerificationBadge(story.verificationStatus || 'CULTURALLY_RELEVANT');

  return (
    <article className="cultural-story-card">
      {/* Top Header Strip */}
      <div className="story-card-header-row">
        <div className="story-header-left-badges">
          <div className="story-tradition-pill">
            <Sparkles size={12} className="sparkle-gold" />
            <span>{story.tradition || 'Living Tradition'}</span>
          </div>

          {/* Cultural Verification Status Badge */}
          {badge && (
            <span className={`story-verification-badge ${badge.class}`} title={story.verificationReason || badge.label}>
              {badge.icon} {badge.label}
            </span>
          )}
        </div>

        <div className="story-header-actions">
          {/* Favourite Star Toggle: ☆ ↔ ★ */}
          <button 
            type="button" 
            className={`btn-fav-star ${isFavorite ? 'active' : ''}`}
            onClick={handleStarClick}
            title={isFavorite ? 'Unfavourite memory' : 'Mark as favourite'}
            aria-label={isFavorite ? 'Favourite' : 'Not favourite'}
          >
            <Star 
              size={18} 
              fill={isFavorite ? '#b88e44' : 'none'} 
              color={isFavorite ? '#b88e44' : '#737b8a'} 
            />
          </button>

          {onDelete && (
            <button 
              type="button" 
              className="btn-delete-story"
              onClick={() => onDelete(story.id)}
              title="Delete memory"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Story Title */}
      <h3 className="story-card-title">{story.title}</h3>

      {/* Person & Place Meta */}
      <div className="story-attribution-row">
        <div className="attrib-item">
          <User size={13} className="attrib-icon" />
          <span>Told by: <strong>{story.person || 'Family Elder'}</strong></span>
        </div>

        <div className="attrib-item">
          <MapPin size={13} className="attrib-icon" />
          <span>{story.place || 'India'}</span>
        </div>
      </div>

      {/* Real Audio Player (Survives Refresh via IndexedDB) */}
      {story.hasAudio ? (
        <div className="story-audio-container">
          <div className="audio-header-strip">
            <div className="audio-live-tag">
              <Mic size={14} className="mic-pulse" />
              <span>Real Voice Recording</span>
            </div>
            {story.audioDuration && (
              <span className="audio-duration-tag">{story.audioDuration}</span>
            )}
          </div>

          {loadingAudio ? (
            <div className="audio-loading-placeholder">
              <span>Loading saved voice recording...</span>
            </div>
          ) : audioUrl ? (
            <audio controls src={audioUrl} className="story-audio-element">
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div className="audio-fallback-note">
              <Volume2 size={14} />
              <span>Voice memory preserved in local archive.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="story-text-record-badge">
          <span>📝 Written Family Memory</span>
        </div>
      )}

      {/* Narrative Excerpt / Description */}
      <p className="story-description-text">
        {story.description}
      </p>

      {/* Structured Details if available */}
      {story.structuredData && (
        <div className="story-structured-accordion">
          <button 
            type="button" 
            className="btn-toggle-structured"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? 'Hide AI Structuring' : 'View AI Cultural Breakdown'}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isExpanded && (
            <div className="structured-drawer-body">
              <div className="drawer-item">
                <strong>Family Practice:</strong>
                <p>{story.structuredData.familyPractice}</p>
              </div>
              <div className="drawer-item">
                <strong>Cultural Meaning:</strong>
                <p>{story.structuredData.culturalMeaning}</p>
              </div>
              <div className="drawer-distinction-note">
                <AlertCircle size={12} />
                <span>{story.structuredData.attributionNote}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Verification Reason Note */}
      {story.verificationReason && (
        <div className="story-verification-note">
          <ShieldCheck size={12} />
          <span>Verification Note: {story.verificationReason}</span>
        </div>
      )}

      {/* DIRECT INLINE TEMPLE VERIFICATION OPTION */}
      {(isTempleAdmin || story.verificationStatus === 'NEEDS_VERIFICATION' || story.verificationStatus === 'ADMIN_REVIEW') && (
        <div className="card-inline-admin-verification">
          <div className="admin-verification-title-strip">
            <ShieldCheck size={14} />
            <span>Temple Verification Option:</span>
          </div>
          <div className="admin-verification-btns">
            <button 
              type="button" 
              className="btn-verify-action approve-personal"
              onClick={() => onVerifyStory && onVerifyStory(story.id, 'PERSONAL_STORY')}
              title="Verify & Approve as Personal/Community Story (🔵)"
            >
              <Check size={13} />
              <span>Approve (Personal Story 🔵)</span>
            </button>
            <button 
              type="button" 
              className="btn-verify-action approve-fact"
              onClick={() => onVerifyStory && onVerifyStory(story.id, 'SUPPORTED_FACT')}
              title="Verify & Approve as Supported Fact (🟢)"
            >
              <Check size={13} />
              <span>Approve (Supported Fact 🟢)</span>
            </button>
            <button 
              type="button" 
              className="btn-verify-action reject-story"
              onClick={() => onVerifyStory && onVerifyStory(story.id, 'NOT_RELEVANT')}
              title="Reject Story (🔴)"
            >
              <X size={13} />
              <span>Reject (🔴)</span>
            </button>
          </div>
        </div>
      )}

      {/* Card Footer: Preserved By & Date */}
      <div className="story-card-footer-meta">
        <span className="preserved-by-text">
          Preserved by: <strong>{story.preservedBy || 'Family Member'}</strong>
        </span>
        <span className="preserved-date-text">
          <Calendar size={12} />
          <span>{story.formattedDate || 'Recently Added'}</span>
        </span>
      </div>
    </article>
  );
}
