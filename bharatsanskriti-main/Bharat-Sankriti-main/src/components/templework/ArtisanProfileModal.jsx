import React, { useState } from 'react';
import { 
  X, MapPin, Award, Star, Shield, Send, Check, 
  Sparkles, CheckCircle, Landmark, Languages, 
  Briefcase, BookOpen, Bookmark 
} from 'lucide-react';
import { getCurrentUser } from '../../services/authService';
import { isArtisanSaved, toggleSaveArtisan } from '../../services/favoritesService';
import { sendArtisanEnquiry, getAllProjects } from '../../services/templeWorkService';

export default function ArtisanProfileModal({
  isOpen,
  onClose,
  artisan,
  activeProject = null,
  matchData = null,
  onEnquirySent
}) {
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  const [selectedProjectId, setSelectedProjectId] = useState(activeProject?.id || '');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(isArtisanSaved(artisan?.id));

  if (!isOpen || !artisan) return null;

  const templeProjects = getAllProjects();

  const handleSaveToggle = () => {
    const updated = toggleSaveArtisan(artisan.id);
    setIsSaved(updated);
  };

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const chosenProj = templeProjects.find(p => p.id === selectedProjectId) || activeProject;
      const enquiry = sendArtisanEnquiry({
        projectId: chosenProj?.id,
        artisanId: artisan.id,
        templeAdminProfile: currentUser,
        customMessage: enquiryMessage
      });

      setIsSending(false);
      setEnquirySuccess(true);
      if (onEnquirySent) onEnquirySent(enquiry);
    } catch (err) {
      setIsSending(false);
      alert(err.message || 'Error sending enquiry');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card artisan-profile-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Artisan Profile"
        >
          <X size={20} />
        </button>

        {/* Hero Banner with Clean Initials Badge (No Photos) */}
        <div className="artisan-modal-hero">
          <div className="artisan-hero-left">
            <div className="artisan-initials-modal-avatar">
              {artisan.name
                ? artisan.name
                    .split(' ')
                    .filter(part => !['Shilpi', 'Master', 'Acharya'].includes(part))
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                : 'AR'}
            </div>
          </div>

          <div className="artisan-hero-details">
            <div className="artisan-badge-row">
              <span className="artisan-craft-badge large">{artisan.craft}</span>
              <span className="artisan-demo-badge">
                <Shield size={12} />
                <span>Demo Master Profile</span>
              </span>
            </div>

            <h2 className="artisan-modal-title">{artisan.name}</h2>

            <div className="artisan-modal-loc">
              <MapPin size={14} />
              <span>{artisan.region}</span>
              <span className="dot-sep">•</span>
              <Award size={14} />
              <span>{artisan.yearsOfExperience} Years Dedicated Practice</span>
            </div>

            <p className="artisan-modal-spec">
              Specialization: <strong>{artisan.specialization}</strong>
            </p>

            <div className="artisan-quick-pills">
              <span className="quick-pill">
                <Star size={13} fill="#b88e44" color="#b88e44" />
                <span>{artisan.rating} Client Score</span>
              </span>
              <span className="quick-pill">
                <Landmark size={13} />
                <span>{artisan.completedTempleWorks} Consecrated Works</span>
              </span>
              <span className="quick-pill">
                <Languages size={13} />
                <span>{(artisan.languages || []).join(', ')}</span>
              </span>
            </div>
          </div>

          <div className="artisan-hero-right-actions">
            <button 
              type="button" 
              className={`btn-modal-bookmark ${isSaved ? 'saved' : ''}`}
              onClick={handleSaveToggle}
              title={isSaved ? 'Saved to profile' : 'Save artisan to profile'}
            >
              <Bookmark size={16} fill={isSaved ? '#b88e44' : 'none'} color={isSaved ? '#b88e44' : '#631726'} />
              <span>{isSaved ? 'Saved to Profile' : 'Save Artisan'}</span>
            </button>
          </div>
        </div>

        <div className="artisan-modal-body">
          {/* AI-Assisted Match Breakdown if viewing in context of a project */}
          {matchData && (
            <div className="artisan-ai-match-box">
              <div className="ai-match-box-header">
                <Sparkles size={16} className="ai-sparkle-icon" />
                <span className="ai-match-headline">
                  AI-assisted matching — prototype: <strong>{matchData.matchScore}% Match for Heritage Project</strong>
                </span>
              </div>
              <ul className="ai-match-criteria-list">
                {matchData.matchReasons.map((reason, i) => (
                  <li key={i}>
                    <Check size={14} className="reason-check-icon" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Master Biography */}
          <div className="artisan-section">
            <h4 className="section-title">
              <BookOpen size={16} /> Heritage Lineage & Master Biography
            </h4>
            <p className="artisan-bio-text">{artisan.bio}</p>
          </div>

          {/* Master Portfolio Gallery / List */}
          <div className="artisan-section">
            <h4 className="section-title">
              <Briefcase size={16} /> Selected Master Portfolio
            </h4>
            <div className="portfolio-items-grid">
              {(artisan.portfolio || []).map((item, idx) => (
                <div key={idx} className="portfolio-item-card">
                  <span className="portfolio-item-bullet">✦</span>
                  <span className="portfolio-item-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Consecrated Temple Projects */}
          <div className="artisan-section">
            <h4 className="section-title">
              <Landmark size={16} /> Consecrated Temple Works & Restorations
            </h4>
            <div className="temple-works-list">
              {(artisan.previousProjects || []).map((proj, idx) => (
                <div key={idx} className="temple-work-badge">
                  <CheckCircle size={14} className="consecrated-icon" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Master Skills Tags */}
          <div className="artisan-section">
            <h4 className="section-title">Traditional Skills & Sthapatya Competencies</h4>
            <div className="artisan-all-skills">
              {(artisan.skills || []).map((sk, i) => (
                <span key={i} className="skill-pill-large">{sk}</span>
              ))}
            </div>
          </div>

          {/* TEMPLE ENQUIRY COMMISSION SECTION (For Temple Admin or User) */}
          <div className="enquiry-commission-box">
            <h4 className="enquiry-box-title">
              <Send size={16} /> Send Heritage Commission Enquiry
            </h4>

            {enquirySuccess ? (
              <div className="enquiry-success-banner">
                <CheckCircle size={22} className="success-icon" />
                <div>
                  <strong>Enquiry Sent Successfully!</strong>
                  <p>
                    Status: <span className="status-highlight">ENQUIRY SENT</span>. The artisan profile and specifications have been logged in your TempleWork Enquiry Tracker.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendEnquiry} className="artisan-enquiry-form">
                <p className="enquiry-instructions">
                  Connect your temple administration directly with <strong>{artisan.name}</strong> for traditional craft restoration, sculpting, or sacred metalwork.
                </p>

                <div className="form-group">
                  <label className="form-label">Associate with Temple Project</label>
                  <select 
                    className="form-input"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                  >
                    <option value="">-- General Sacred Heritage Consultation --</option>
                    {templeProjects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.requiredCraft})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Message to Artisan Studio <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea 
                    className="form-textarea"
                    rows={3}
                    placeholder={`Respected ${artisan.name}, we would like to consult your studio regarding stone/mural heritage work for our temple trust...`}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                  />
                </div>

                <div className="modal-actions-bar">
                  <button type="button" className="btn-secondary-modal" onClick={onClose}>
                    Close Profile
                  </button>
                  <button type="submit" className="btn-primary-modal" disabled={isSending}>
                    <Send size={15} />
                    <span>{isSending ? 'Sending Enquiry...' : 'Send Enquiry (Status: ENQUIRY SENT)'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
