import React from 'react';
import { 
  MapPin, Calendar, Clock, Users, Sparkles, CheckCircle, 
  AlertCircle, ChevronRight, HeartHandshake, Shield 
} from 'lucide-react';

export default function SevaCard({
  seva,
  matchData = null,
  applicationStatus = null, // null | 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'
  onOpenDetails,
  onApply
}) {
  const isCompleted = seva.status === 'COMPLETED' || applicationStatus === 'COMPLETED';
  const isFull = seva.spotsRemaining <= 0;

  return (
    <article className={`seva-card ${applicationStatus ? `app-status-${applicationStatus.toLowerCase()}` : ''}`}>
      {/* Top Banner Image with Overlay */}
      <div className="seva-card-image-wrap">
        <img 
          src={seva.templeImage} 
          alt={seva.templeName} 
          className="seva-card-img" 
          loading="lazy"
        />
        <div className="seva-card-gradient-overlay" />
        
        {/* Category Badge */}
        <span className="seva-category-pill">
          {seva.category}
        </span>

        {/* Status / Application Badge */}
        {applicationStatus ? (
          <span className={`seva-application-pill status-${applicationStatus.toLowerCase()}`}>
            {applicationStatus === 'PENDING' && '⏳ Application Pending'}
            {applicationStatus === 'ACCEPTED' && '✓ Application Accepted'}
            {applicationStatus === 'REJECTED' && '✕ Application Declined'}
            {applicationStatus === 'COMPLETED' && '★ Seva Completed'}
          </span>
        ) : isCompleted ? (
          <span className="seva-application-pill status-completed">
            ★ Seva Concluded
          </span>
        ) : isFull ? (
          <span className="seva-application-pill status-full">
            All Spots Filled
          </span>
        ) : null}
      </div>

      <div className="seva-card-body">
        {/* Temple Name & Location */}
        <div className="seva-temple-meta">
          <span className="seva-temple-name">{seva.templeName}</span>
          <span className="seva-temple-loc">
            <MapPin size={13} />
            <span>{seva.location}</span>
          </span>
        </div>

        {/* Seva Title */}
        <h3 className="seva-title" onClick={() => onOpenDetails(seva)}>
          {seva.title}
        </h3>

        {/* AI-Assisted Match Pill if recommended */}
        {matchData && matchData.isRecommended && (
          <div className="seva-ai-match-strip">
            <Sparkles size={13} className="ai-sparkle-icon" />
            <span className="ai-match-text">
              <strong>{matchData.matchScore}% Match</strong> — {matchData.matchReasons[0]}
            </span>
          </div>
        )}

        {/* Logistics Strip */}
        <div className="seva-logistics-grid">
          <div className="logistic-item">
            <Calendar size={13} />
            <span>{seva.date}</span>
          </div>
          <div className="logistic-item">
            <Clock size={13} />
            <span>{seva.duration}</span>
          </div>
          <div className="logistic-item">
            <Users size={13} />
            <span>
              <strong>{seva.spotsRemaining}</strong> of {seva.peopleNeeded} spots left
            </span>
          </div>
        </div>

        {/* Skills Required Tags */}
        <div className="seva-skills-tags">
          {(seva.skillsRequired || []).slice(0, 3).map((skill, i) => (
            <span key={i} className="skill-tag">
              {skill}
            </span>
          ))}
          {(seva.skillsRequired || []).length > 3 && (
            <span className="skill-tag-more">
              +{(seva.skillsRequired.length - 3)} more
            </span>
          )}
        </div>

        {/* Description Excerpt */}
        <p className="seva-desc-excerpt">
          {seva.description ? seva.description.slice(0, 115) + (seva.description.length > 115 ? '...' : '') : ''}
        </p>

        {/* Card Footer Actions */}
        <div className="seva-card-footer">
          <button 
            type="button" 
            className="btn-seva-details"
            onClick={() => onOpenDetails(seva)}
          >
            <span>View Details</span>
            <ChevronRight size={15} />
          </button>

          {!applicationStatus && !isCompleted && !isFull && (
            <button 
              type="button" 
              className="btn-seva-apply"
              onClick={() => onApply(seva)}
            >
              <HeartHandshake size={15} />
              <span>I CAN HELP</span>
            </button>
          )}

          {applicationStatus === 'PENDING' && (
            <span className="status-note pending-note">
              Under Temple Review
            </span>
          )}

          {applicationStatus === 'ACCEPTED' && (
            <span className="status-note accepted-note">
              <CheckCircle size={14} /> Volunteer Confirmed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
