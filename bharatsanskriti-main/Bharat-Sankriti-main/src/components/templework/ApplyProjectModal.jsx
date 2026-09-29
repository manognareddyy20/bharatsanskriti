import React, { useState } from 'react';
import { X, Send, Landmark, IndianRupee, Clock, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { submitProjectApplication, calculatePlatformFee } from '../../services/templeWorkService';
import { getCurrentUser } from '../../services/authService';

export default function ApplyProjectModal({ isOpen, onClose, project, artisan = null, onApplicationSubmitted }) {
  const currentUser = getCurrentUser();
  const applicantName = currentUser?.name || artisan?.name || 'Registered Artisan / Contributor';

  const [proposedQuote, setProposedQuote] = useState(project?.offeredBudget || 50000);
  const [timeline, setTimeline] = useState(project?.timeline || '3 Months');
  const [proposalNote, setProposalNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !project) return null;

  const feeBreakdown = calculatePlatformFee(proposedQuote);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!proposedQuote || Number(proposedQuote) <= 0) {
      setError('Please enter a valid proposed quote amount.');
      return;
    }

    if (!proposalNote.trim()) {
      setError('Please provide a brief technical proposal note.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newApp = submitProjectApplication({
        projectId: project.id,
        artisanId: currentUser?.id || artisan?.id || `user-${Date.now()}`,
        artisanName: applicantName,
        artisanCraft: artisan?.craft || project.requiredCraft,
        proposedQuote: Number(proposedQuote),
        timeline,
        proposalNote
      });

      setIsSubmitting(false);
      if (onApplicationSubmitted) onApplicationSubmitted(newApp);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to submit application');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card apply-project-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Application Modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Send size={14} />
            <span>Artisan Application Submission</span>
          </div>
          <h2 className="modal-title">Apply for Heritage Project</h2>
          <p className="modal-subtitle">
            Applying as <strong>{applicantName}</strong> for <strong>{project.title}</strong> by {project.templeName}.
          </p>
        </div>

        {currentUser?.role === 'temple_admin' && (
          <div className="form-error-banner" style={{ background: '#fff3cd', color: '#856404', borderColor: '#ffeeba', marginBottom: '1rem' }}>
            ⚠️ <strong>Role Note:</strong> You are currently logged in as a <strong>Temple Administrator</strong>. Temple Admins post and manage projects. Switch to a User / Artisan account to submit applications.
          </div>
        )}

        {error && <div className="form-error-banner">{error}</div>}

        <div className="project-summary-box">
          <div className="summary-row">
            <span className="sum-lbl"><Landmark size={13} /> Temple:</span>
            <span className="sum-val">{project.templeName} ({project.location})</span>
          </div>
          <div className="summary-row">
            <span className="sum-lbl"><UserCheck size={13} /> Applying User:</span>
            <span className="sum-val font-bold">{applicantName}</span>
          </div>
          <div className="summary-row">
            <span className="sum-lbl">Temple Offered Budget:</span>
            <span className="sum-val highlight">₹{Number(project.offeredBudget || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="create-project-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Your Proposed Quote (₹) <span className="required-star">*</span></label>
              <div className="budget-input-wrapper">
                <span className="rupee-symbol">₹</span>
                <input 
                  type="number"
                  className="form-input budget-num-input"
                  value={proposedQuote}
                  onChange={(e) => setProposedQuote(e.target.value)}
                  min="1000"
                  step="1000"
                  required
                />
              </div>
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Proposed Timeline <span className="required-star">*</span></label>
              <input 
                type="text"
                className="form-input"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. 3 Months (Phased)"
                required
              />
            </div>
          </div>

          {/* 10% PLATFORM FEE BREAKDOWN */}
          <div className="platform-commission-breakdown">
            <div className="comm-row">
              <span className="comm-lbl">Your Total Proposed Quote:</span>
              <span className="comm-val bold">₹{feeBreakdown.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="comm-row platform-share">
              <span className="comm-lbl">✦ Bharat Sanskriti Service Fee (10% to Us):</span>
              <span className="comm-val fee">₹{feeBreakdown.platformFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="comm-row artisan-share">
              <span className="comm-lbl">✓ Your Net Direct Payout (90%):</span>
              <span className="comm-val net">₹{feeBreakdown.netArtisanPayout.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Technical Proposal & Execution Approach <span className="required-star">*</span>
            </label>
            <textarea 
              className="form-textarea"
              rows={3}
              placeholder="Describe your studio's approach, material sourcing, traditional tools (chisels/herbal binders), and past experience..."
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions-bar">
            <button type="button" className="btn-secondary-modal" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-modal" disabled={isSubmitting}>
              <Send size={15} />
              <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

