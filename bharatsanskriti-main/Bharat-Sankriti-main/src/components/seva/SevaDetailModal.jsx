import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Clock, Users, Sparkles, 
  HeartHandshake, CheckCircle, AlertCircle, Landmark, 
  Tag, Shield, Check
} from 'lucide-react';
import { getCurrentUser } from '../../services/authService';
import CulturalReviewsSection from '../reviews/CulturalReviewsSection';

export default function SevaDetailModal({
  isOpen,
  onClose,
  seva,
  matchData = null,
  applicationStatus = null,
  onApplySubmit
}) {
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !seva) return null;

  const currentUser = getCurrentUser();
  const isCompleted = seva.status === 'COMPLETED' || applicationStatus === 'COMPLETED';
  const isFull = seva.spotsRemaining <= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('Please sign in to submit a Seva application.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onApplySubmit) {
        onApplySubmit(seva.id, applicationMessage);
      }
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Error submitting application.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card seva-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Seva Details"
        >
          <X size={20} />
        </button>

        {/* Modal Header with Temple Imagery */}
        <div className="seva-modal-hero">
          <img src={seva.templeImage} alt={seva.templeName} className="seva-modal-hero-img" />
          <div className="seva-modal-hero-overlay">
            <span className="seva-category-pill">{seva.category}</span>
            <h2 className="seva-modal-title">{seva.title}</h2>
            <div className="seva-modal-temple-row">
              <Landmark size={15} />
              <span>{seva.templeName}</span>
              <span className="dot-sep">•</span>
              <MapPin size={14} />
              <span>{seva.location}</span>
            </div>
          </div>
        </div>

        <div className="seva-modal-content-body">
          {/* AI-Assisted Match Breakdown Card */}
          {matchData && (
            <div className="seva-ai-breakdown-box">
              <div className="ai-breakdown-header">
                <Sparkles size={16} className="ai-sparkle-icon" />
                <span className="ai-badge-title">
                  AI-assisted matching: <strong>{matchData.matchScore}% Match for You</strong>
                </span>
              </div>
              <ul className="ai-reasons-list">
                {matchData.matchReasons.map((reason, idx) => (
                  <li key={idx}>
                    <Check size={14} className="reason-check" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Metrics Strip */}
          <div className="seva-modal-metrics">
            <div className="metric-box">
              <span className="metric-label">Dates</span>
              <span className="metric-val">{seva.date}</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Duration</span>
              <span className="metric-val">{seva.duration}</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Spots Remaining</span>
              <span className="metric-val highlight">
                {seva.spotsRemaining} / {seva.peopleNeeded}
              </span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Status</span>
              <span className="metric-val status-val">
                {applicationStatus || seva.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="seva-detail-section">
            <h4 className="detail-heading">Seva Description & Purpose</h4>
            <p className="detail-paragraph">{seva.description}</p>
          </div>

          {/* Skills Required */}
          <div className="seva-detail-section">
            <h4 className="detail-heading">Skills & Contributions Required</h4>
            <div className="detail-skills-wrap">
              {(seva.skillsRequired || []).map((skill, i) => (
                <span key={i} className="skill-tag large">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Requirements */}
          {seva.additionalRequirements && (
            <div className="seva-detail-section">
              <h4 className="detail-heading">Preparation & Notes for Volunteers</h4>
              <p className="detail-paragraph note-text">{seva.additionalRequirements}</p>
            </div>
          )}

          {/* Application Status Banner if already applied */}
          {applicationStatus ? (
            <div className={`application-status-banner status-${applicationStatus.toLowerCase()}`}>
              {applicationStatus === 'PENDING' && (
                <>
                  <Clock size={20} />
                  <div>
                    <strong>Application Pending Temple Review</strong>
                    <p>The temple administration has received your voluntary Seva offer and is reviewing your profile.</p>
                  </div>
                </>
              )}
              {applicationStatus === 'ACCEPTED' && (
                <>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Application Accepted!</strong>
                    <p>You have been accepted for this sacred Seva. Please coordinate with temple staff upon arrival.</p>
                  </div>
                </>
              )}
              {applicationStatus === 'REJECTED' && (
                <>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Application Not Accepted</strong>
                    <p>The temple was unable to accommodate your application for this session due to limited capacity.</p>
                  </div>
                </>
              )}
              {applicationStatus === 'COMPLETED' && (
                <>
                  <Sparkles size={20} />
                  <div>
                    <strong>Seva Completed!</strong>
                    <p>Thank you for contributing your skills to the preservation of temple heritage.</p>
                  </div>
                </>
              )}
            </div>
          ) : isFull ? (
            <div className="form-info-banner">
              All volunteer spots for this Seva session are currently filled.
            </div>
          ) : isCompleted ? (
            <div className="form-info-banner">
              This Seva has concluded.
            </div>
          ) : (
            /* Application Form ("I CAN HELP") */
            <form onSubmit={handleSubmit} className="seva-apply-form">
              <h4 className="detail-heading">
                <HeartHandshake size={16} /> Apply for this Seva — “I Can Help”
              </h4>

              {error && <div className="form-error-banner">{error}</div>}

              <div className="applicant-profile-summary">
                <span className="applicant-name">
                  Applying as: <strong>{currentUser?.name || 'Devotee Sevak'}</strong>
                </span>
                <span className="applicant-meta">
                  Location: {currentUser?.location || 'India'} | Skills: {(currentUser?.skills || []).join(', ') || 'General Volunteer'}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="seva-app-message">
                  How can you contribute to this Seva? (Optional Note)
                </label>
                <textarea
                  id="seva-app-message"
                  className="form-textarea"
                  rows={3}
                  placeholder="Share a brief note about your experience, tools you can bring, or your devotion to this heritage tradition..."
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn-secondary-modal" onClick={onClose}>
                  Close
                </button>
                <button type="submit" className="btn-primary-modal" disabled={isSubmitting}>
                  <HeartHandshake size={16} />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application (I CAN HELP)'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Cultural Reviews & Moderated Feedback Section */}
          <div className="modal-reviews-wrap mt-4">
            <CulturalReviewsSection 
              itemId={seva.id}
              itemType="seva"
              itemTitle={seva.title}
              hasCompletedExperience={isCompleted || applicationStatus === 'ACCEPTED' || applicationStatus === 'COMPLETED'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
