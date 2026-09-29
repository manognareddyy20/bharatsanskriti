import React, { useState } from 'react';
import { 
  X, Landmark, MapPin, Sparkles, Send, Clock, 
  CheckCircle2, Info, ShieldCheck, IndianRupee, FileText, UserCheck 
} from 'lucide-react';
import { getApplicationsForProject } from '../../services/templeWorkService';
import { getCurrentUser } from '../../services/authService';
import CulturalReviewsSection from '../reviews/CulturalReviewsSection';

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
  onOpenApplyModal,
  onOpenTrackerModal
}) {
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  if (!isOpen || !project) return null;

  const applications = getApplicationsForProject(project.id);
  const status = project.status || 'OPEN';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card project-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Project Details"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="modal-header-standard">
          <div className="modal-badge-row">
            <span className="modal-badge">
              <Landmark size={14} />
              <span>{project.templeName}</span>
            </span>
            
            <span className={`project-status-pill ${status.toLowerCase()}-pill`}>
              {status === 'OPEN' && 'OPEN FOR ARTISAN APPLICATIONS'}
              {status === 'APPLICATION_RECEIVED' && `APPLICATIONS RECEIVED (${applications.length})`}
              {status === 'OFFER_MADE' && 'OFFER LETTER SENT'}
              {status === 'OFFER_ACCEPTED' && 'OFFER ACCEPTED BY ARTISAN'}
              {status === 'PROJECT_CONFIRMED' && 'PROJECT CONFIRMED & ESCROW PAID'}
            </span>
          </div>

          <h2 className="modal-title">{project.title}</h2>
          
          <div className="project-location-meta">
            <MapPin size={14} />
            <span>{project.location}</span>
            <span className="dot-sep">•</span>
            <Clock size={14} />
            <span>Posted by {project.templeName}</span>
          </div>
        </div>

        <div className="project-detail-modal-body">
          {/* BUDGET SUGGESTION DISPLAY BANNER */}
          <div className="budget-suggestion-card">
            <div className="budget-card-header">
              <div className="budget-header-title">
                <Sparkles size={18} className="sparkle-gold-icon" />
                <span>Temple Allocated Budget & System Reference Range</span>
              </div>
              <span className="budget-range-pill">Offered: ₹{Number(project.offeredBudget || 50000).toLocaleString('en-IN')}</span>
            </div>

            <div className="budget-calc-meta">
              <div className="meta-col">
                <span className="meta-lbl">Temple Offered Budget:</span>
                <span className="meta-val highlight">₹{Number(project.offeredBudget || 50000).toLocaleString('en-IN')}</span>
              </div>
              {project.budgetRange && (
                <div className="meta-col">
                  <span className="meta-lbl">Indicative Reference Range:</span>
                  <span className="meta-val">{project.budgetRange}</span>
                </div>
              )}
              {project.scale && (
                <div className="meta-col">
                  <span className="meta-lbl">Project Scale & Complexity:</span>
                  <span className="meta-val">{project.scale} Scale • {project.complexity || 'Standard'}</span>
                </div>
              )}
            </div>

            {/* MANDATORY DISCLAIMER NOTE */}
            <div className="budget-disclaimer-note">
              <Info size={15} className="info-blue-icon" />
              <p>
                <strong>Indicative estimate only.</strong> Final amount is mutually agreed between the temple and artisan based on project requirements.
              </p>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="project-specs-grid modal-specs">
            <div className="spec-item">
              <span className="spec-label">Required Craft</span>
              <span className="spec-value">{project.requiredCraft}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Materials</span>
              <span className="spec-value">{project.materials || 'Traditional grade'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Timeline</span>
              <span className="spec-value">{project.timeline || 'Flexible'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Required Experience</span>
              <span className="spec-value">{project.experienceRequired || '5+ Years'}</span>
            </div>
          </div>

          {/* Description & Guidelines */}
          <div className="artisan-section">
            <h4 className="section-title">
              <FileText size={16} /> Scope of Work & Architectural Guidelines
            </h4>
            <p className="artisan-bio-text">{project.description}</p>
          </div>

          {/* Reference Image if available */}
          {project.referenceImages && project.referenceImages.length > 0 && (
            <div className="artisan-section">
              <h4 className="section-title">Architectural Reference & Site Photos</h4>
              <div className="project-ref-images-grid">
                {project.referenceImages.map((img, i) => (
                  <img key={i} src={img} alt="Project Reference" className="project-ref-img" />
                ))}
              </div>
            </div>
          )}

          {/* STRICT ROLE-BASED ACTIONS */}
          <div className="project-modal-role-actions">
            {/* TEMPLE ADMIN ROLE: ONLY ADMIN ACTIONS */}
            {isTempleAdmin ? (
              <div className="role-action-box temple-admin-box">
                <div className="role-box-header">
                  <UserCheck size={18} className="role-icon" />
                  <div>
                    <strong>Temple Admin Management:</strong>
                    <p>Applicants: <strong>{applications.length}</strong>. Review received proposals, select master artisans, and issue formal offer letters.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-primary-modal btn-review-offers"
                  onClick={() => {
                    onClose();
                    if (onOpenTrackerModal) onOpenTrackerModal();
                  }}
                >
                  <Sparkles size={15} />
                  <span>View Applicants & Issue Offer Letter ({applications.length})</span>
                </button>
              </div>
            ) : (
              /* USER / ARTISAN ROLE: ONLY APPLICANT ACTIONS */
              <div className="role-action-box artisan-apply-box">
                <div className="role-box-header">
                  <Send size={18} className="role-icon" />
                  <div>
                    <strong>For Artisans & Cultural Contributors:</strong>
                    <p>Apply for this temple commission with your proposed quote, timeline, and technical execution approach.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-primary-modal btn-apply-now"
                  onClick={() => {
                    onClose();
                    if (onOpenApplyModal) onOpenApplyModal(project);
                  }}
                >
                  <Send size={15} />
                  <span>Apply for Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Cultural Reviews Section */}
          <div className="modal-reviews-wrap mt-4">
            <CulturalReviewsSection 
              itemId={project.id}
              itemType="templework"
              itemTitle={project.title}
              hasCompletedExperience={status === 'PROJECT_CONFIRMED' || status === 'OFFER_ACCEPTED'}
            />
          </div>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-secondary-modal" onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
