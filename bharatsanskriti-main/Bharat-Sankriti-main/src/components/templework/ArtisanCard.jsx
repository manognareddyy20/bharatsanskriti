import React from 'react';
import { 
  MapPin, Award, Bookmark, Star, Sparkles, 
  ChevronRight, Shield, Hammer 
} from 'lucide-react';
import { isArtisanSaved, toggleSaveArtisan } from '../../services/favoritesService';

export default function ArtisanCard({
  artisan,
  matchData = null,
  onOpenProfile,
  onBookmarkChanged
}) {
  const isSaved = isArtisanSaved(artisan.id);

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    const newStatus = toggleSaveArtisan(artisan.id);
    if (onBookmarkChanged) {
      onBookmarkChanged(artisan.id, newStatus);
    }
  };

  // Generate clean initials badge without any photograph
  const initials = artisan.name
    ? artisan.name
        .split(' ')
        .filter(part => !['Shilpi', 'Master', 'Acharya'].includes(part))
        .map(n => n[0])
        .slice(0, 2)
        .join('')
    : 'AR';

  return (
    <article className="artisan-card clean-design" onClick={() => onOpenProfile(artisan)}>
      {/* Clean Photo-Free Heritage Header (Requirement 10) */}
      <div className="artisan-clean-top-strip">
        <div className="artisan-badge-left">
          <div className="artisan-initials-circle" aria-hidden="true">
            {initials}
          </div>
          <div className="artisan-identity-brief">
            <span className="artisan-craft-label">{artisan.craft}</span>
            <span className="artisan-verification-chip">
              <Shield size={11} /> Master Artisan
            </span>
          </div>
        </div>

        {/* Bookmark Save Button */}
        <button 
          type="button" 
          className={`btn-artisan-bookmark ${isSaved ? 'saved' : ''}`}
          onClick={handleBookmarkToggle}
          title={isSaved ? 'Remove from saved artisans' : 'Save artisan to profile'}
          aria-label="Save Artisan"
        >
          <Bookmark size={16} fill={isSaved ? '#b88e44' : 'none'} color={isSaved ? '#b88e44' : '#631726'} />
        </button>
      </div>

      <div className="artisan-card-body">
        {/* Region / Location */}
        <div className="artisan-loc-row">
          <MapPin size={12} />
          <span>{artisan.region}</span>
          <span className="dot-sep">•</span>
          <span className="artisan-exp">{artisan.yearsOfExperience} yrs exp</span>
        </div>

        {/* Artisan Name */}
        <h3 className="artisan-name">{artisan.name}</h3>

        {/* Specialization */}
        <p className="artisan-spec">{artisan.specialization}</p>

        {/* AI-Assisted Match Strip if provided */}
        {matchData && matchData.isRecommended && (
          <div className="artisan-ai-match-strip">
            <Sparkles size={13} className="ai-sparkle-icon" />
            <span>
              <strong>{matchData.matchScore}% Match</strong> — {matchData.matchReasons[0]}
            </span>
          </div>
        )}

        {/* Bio Snippet */}
        <p className="artisan-bio-snippet">
          {artisan.bio.slice(0, 120)}...
        </p>

        {/* Skills Tags */}
        <div className="artisan-skills-tags">
          {(artisan.skills || []).slice(0, 3).map((sk, idx) => (
            <span key={idx} className="skill-tag-sm">{sk}</span>
          ))}
        </div>

        {/* Card Footer */}
        <div className="artisan-card-footer">
          <div className="artisan-metrics-mini">
            <span className="metric-works">
              <strong>{artisan.completedTempleWorks}</strong> Temple Works
            </span>
            <span className="metric-rating">
              <Star size={12} fill="#b88e44" color="#b88e44" />
              <span>{artisan.rating}</span>
            </span>
          </div>

          <button 
            type="button" 
            className="btn-artisan-profile"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProfile(artisan);
            }}
          >
            <span>View Portfolio</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
