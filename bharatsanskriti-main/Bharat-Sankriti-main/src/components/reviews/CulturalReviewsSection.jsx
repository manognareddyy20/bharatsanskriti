import React, { useState, useMemo } from 'react';
import { 
  Star, MessageSquare, Flag, Shield, CheckCircle, 
  AlertCircle, Clock, X, Send, Award, ThumbsUp 
} from 'lucide-react';
import { getCurrentUser } from '../../services/authService';
import { 
  getAllModerationReviews, 
  submitVerifiedCulturalReview, 
  reportCulturalReview, 
  checkUserEligibilityToReview,
  getVerificationBadge 
} from '../../services/contentVerificationService';

export default function CulturalReviewsSection({
  itemId,
  itemType = 'seva', // 'seva' | 'templework' | 'heritage' | 'story'
  itemTitle = 'Heritage Activity',
  hasCompletedExperience = false
}) {
  const [dataRevision, setDataRevision] = useState(0);
  const currentUser = getCurrentUser();

  // Form states
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState(null); // { type: 'success'|'warning'|'error', text, badge }

  // Report Modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingReview, setReportingReview] = useState(null);
  const [reportReason, setReportReason] = useState('False Information');
  const [reportUserNote, setReportUserNote] = useState('');
  const [reportSuccess, setReportSuccess] = useState('');

  // Fetch all reviews for this item
  const allReviews = useMemo(() => {
    return getAllModerationReviews();
  }, [dataRevision]);

  const itemReviews = useMemo(() => {
    return allReviews.filter(r => r.itemId === itemId || r.itemType === itemType && r.itemTitle === itemTitle);
  }, [allReviews, itemId, itemType, itemTitle]);

  // Check user eligibility
  const eligibility = useMemo(() => {
    return checkUserEligibilityToReview({
      currentUser,
      itemType,
      itemId
    });
  }, [currentUser, itemType, itemId]);

  // Handle submitting review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFeedbackBanner(null);

    if (!currentUser) {
      setFeedbackBanner({
        type: 'error',
        text: 'Please sign in to write a review.'
      });
      return;
    }

    if (!reviewText.trim()) {
      setFeedbackBanner({
        type: 'error',
        text: 'Please enter your review feedback.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitVerifiedCulturalReview({
        itemId,
        itemType,
        itemTitle,
        rating,
        reviewText,
        currentUser,
        hasCompletedExperience: hasCompletedExperience || eligibility.isEligible
      });

      setIsSubmitting(false);

      if (res.verification) {
        const { isValid, outcome, status, reason, badge } = res.verification;

        if (outcome === 'APPROVED') {
          setFeedbackBanner({
            type: 'success',
            text: `Review Published! ${reason}`,
            badge: badge || getVerificationBadge('APPROVED')
          });
          setReviewText('');
          setDataRevision(prev => prev + 1);
        } else if (outcome === 'ADMIN_REVIEW' || outcome === 'FLAGGED_FOR_REVIEW') {
          setFeedbackBanner({
            type: 'warning',
            text: `Your review has been submitted and is under moderation: ${reason}`,
            badge: badge || getVerificationBadge('ADMIN_REVIEW')
          });
          setReviewText('');
          setDataRevision(prev => prev + 1);
        } else {
          setFeedbackBanner({
            type: 'error',
            text: `Review Submission Blocked: ${reason}`,
            badge: badge || getVerificationBadge('REJECTED')
          });
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setFeedbackBanner({
        type: 'error',
        text: err.message || 'Error submitting review.'
      });
    }
  };

  // Open Report Dialog
  const handleOpenReportModal = (review) => {
    setReportingReview(review);
    setReportReason('False Information');
    setReportUserNote('');
    setReportSuccess('');
    setIsReportModalOpen(true);
  };

  // Submit Report
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!reportingReview) return;

    try {
      reportCulturalReview({
        reviewId: reportingReview.id,
        reason: reportReason,
        userNote: reportUserNote,
        reportedByName: currentUser?.name || 'Community Devotee'
      });

      setReportSuccess('Thank you. This review has been flagged and sent to the Temple Admin Moderation Dashboard.');
      setTimeout(() => {
        setIsReportModalOpen(false);
        setReportingReview(null);
        setDataRevision(prev => prev + 1);
      }, 1800);
    } catch (err) {
      alert(err.message || 'Error submitting report');
    }
  };

  return (
    <div className="cultural-reviews-section">
      <div className="reviews-section-header">
        <div className="reviews-header-left">
          <MessageSquare size={18} className="header-icon-gold" />
          <h3 className="reviews-section-title">
            Cultural Reviews & Volunteer Experiences ({itemReviews.length})
          </h3>
        </div>
        <span className="reviews-moderation-pill">
          <Shield size={12} />
          <span>Content Verified & Moderated</span>
        </span>
      </div>

      {/* Write a Review Section */}
      <div className="write-review-card">
        <h4 className="write-review-heading">Write a Review for {itemTitle}</h4>

        {/* Participation Check Notice */}
        {(itemType === 'seva' || itemType === 'templework') && !eligibility.isEligible && !hasCompletedExperience ? (
          <div className="review-eligibility-warning">
            <AlertCircle size={16} />
            <span>
              <strong>Verified Participation Required:</strong> Only users who have completed or been accepted for this Seva / TempleWork can submit a review.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="review-form">
            {feedbackBanner && (
              <div className={`review-feedback-banner ${feedbackBanner.type}`}>
                {feedbackBanner.type === 'success' && <CheckCircle size={16} />}
                {feedbackBanner.type === 'warning' && <Clock size={16} />}
                {feedbackBanner.type === 'error' && <AlertCircle size={16} />}
                <div className="banner-text-wrap">
                  <span>{feedbackBanner.text}</span>
                  {feedbackBanner.badge && (
                    <span className={`status-badge-inline ${feedbackBanner.badge.class}`}>
                      {feedbackBanner.badge.icon} {feedbackBanner.badge.label}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Rating Stars */}
            <div className="form-group">
              <label className="form-label">Rating</label>
              <div className="rating-stars-input">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    className={`star-btn ${starVal <= rating ? 'active' : ''}`}
                    onClick={() => setRating(starVal)}
                    aria-label={`Rate ${starVal} Stars`}
                  >
                    <Star size={20} fill={starVal <= rating ? '#e0a938' : 'none'} stroke="#e0a938" />
                  </button>
                ))}
                <span className="rating-val-text">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Review Text */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-text-input">
                Your Review & Cultural Feedback <span className="required-star">*</span>
              </label>
              <textarea
                id="review-text-input"
                className="form-textarea"
                rows={3}
                placeholder="Share your experience, cultural learnings, or constructive feedback regarding organization, tradition, or coordination..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              <span className="form-input-hint">
                Authentic feedback (including genuine organizational criticism) is welcomed and protected. Unrelated promotional spam will be filtered.
              </span>
            </div>

            <button
              type="submit"
              className="btn-primary-sm"
              disabled={isSubmitting}
            >
              <Send size={14} />
              <span>{isSubmitting ? 'Verifying & Submitting...' : 'Submit Review'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Published Reviews List */}
      <div className="published-reviews-list">
        {itemReviews.length === 0 ? (
          <div className="empty-reviews-card">
            <MessageSquare size={28} className="empty-icon-subtle" />
            <p>No verified reviews submitted yet.</p>
          </div>
        ) : (
          itemReviews.map((rev) => {
            const badge = rev.badge || getVerificationBadge(rev.status || rev.outcome);
            const isReported = rev.outcome === 'REPORTED' || rev.status === 'REPORTED';

            return (
              <div key={rev.id} className={`cultural-review-card ${isReported ? 'reported' : ''}`}>
                <div className="review-card-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{rev.reviewerName.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong className="reviewer-name">{rev.reviewerName}</strong>
                      <div className="review-meta-row">
                        <span className="review-date">
                          {new Date(rev.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {rev.verifiedExperience && (
                          <span className="verified-participant-pill">
                            <Award size={11} /> Verified Participant
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="review-status-wrap">
                    <span className={`status-badge-pill ${badge.class}`}>
                      {badge.icon} {badge.label}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="review-rating-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < rev.rating ? '#e0a938' : 'none'}
                      stroke="#e0a938"
                    />
                  ))}
                  <span className="rating-number">{rev.rating}.0</span>
                </div>

                {/* Review Text */}
                <p className="review-text">{rev.reviewText}</p>

                {/* Report Action Button */}
                <div className="review-card-footer">
                  <span className="review-outcome-note">
                    Outcome: {rev.outcomeReason || rev.outcome}
                  </span>

                  {!isReported ? (
                    <button
                      type="button"
                      className="btn-report-review"
                      onClick={() => handleOpenReportModal(rev)}
                      title="Report misleading or fake review"
                    >
                      <Flag size={13} />
                      <span>Report</span>
                    </button>
                  ) : (
                    <span className="reported-flag-pill">
                      🚩 Reported to Admin
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Report Review Modal */}
      {isReportModalOpen && reportingReview && (
        <div className="modal-overlay" onClick={() => setIsReportModalOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-card report-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsReportModalOpen(false)}
              aria-label="Close Report Dialog"
            >
              <X size={20} />
            </button>

            <div className="modal-header-standard">
              <div className="modal-badge warning">
                <Flag size={14} />
                <span>Report Content</span>
              </div>
              <h3 className="modal-title">Report Review</h3>
              <p className="modal-subtitle">
                Flag this review if it contains fake claims, spam, or false information.
              </p>
            </div>

            {reportSuccess ? (
              <div className="report-success-banner">
                <CheckCircle size={20} />
                <span>{reportSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="report-form">
                <div className="reported-review-preview">
                  <strong>Review by {reportingReview.reviewerName}:</strong>
                  <p>“{reportingReview.reviewText}”</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Report Reason <span className="required-star">*</span></label>
                  <select
                    className="form-select"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  >
                    <option value="Fake Review">Fake Review</option>
                    <option value="Unrelated Content">Unrelated Content / Spam</option>
                    <option value="Offensive Content">Offensive or Inappropriate Content</option>
                    <option value="False Information">False Information / Misleading Claims</option>
                    <option value="Duplicate Review">Duplicate Review</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Details (Optional)</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Provide details for temple moderators..."
                    value={reportUserNote}
                    onChange={(e) => setReportUserNote(e.target.value)}
                  />
                </div>

                <div className="modal-actions-bar">
                  <button
                    type="button"
                    className="btn-secondary-modal"
                    onClick={() => setIsReportModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-warning-modal">
                    <Flag size={15} />
                    <span>Submit Report</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
