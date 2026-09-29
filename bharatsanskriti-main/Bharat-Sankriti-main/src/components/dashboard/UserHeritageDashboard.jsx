import React, { useState, useMemo } from 'react';
import { 
  User, MapPin, Clock, HeartHandshake, Bookmark, 
  BookOpen, CheckCircle, Sparkles, ChevronRight, 
  XCircle, Calendar, Users, Landmark, Send 
} from 'lucide-react';
import { getCurrentUser } from '../../services/authService';
import { 
  getUserApplications, 
  getAllSevas, 
  applyForSeva 
} from '../../services/sevaService';
import { getSavedArtisanIds } from '../../services/favoritesService';
import { getAllArtisans } from '../../services/templeWorkService';
import { getAllCulturalStories } from '../../services/storyStorage';
import { getVerificationBadge } from '../../services/contentVerificationService';

export default function UserHeritageDashboard({
  onNavigateTab,
  onOpenRoleSwitcher,
  onOpenAuth
}) {
  const [dataRevision, setDataRevision] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const user = getCurrentUser();
  const allOpportunities = useMemo(() => getAllSevas(), [dataRevision]);
  const applications = useMemo(() => {
    if (!user?.id) return [];
    return getUserApplications(user.id);
  }, [user?.id, dataRevision]);

  const savedArtisanIds = useMemo(() => getSavedArtisanIds(), []);
  const allArtisans = getAllArtisans();
  const savedArtisans = useMemo(() => {
    return allArtisans.filter(a => savedArtisanIds.includes(a.id));
  }, [allArtisans, savedArtisanIds]);

  const allStories = getAllCulturalStories();
  const userStories = useMemo(() => {
    return allStories.filter(s => 
      (s.preservedBy || '').toLowerCase() === (user?.name || '').toLowerCase() ||
      s.hasAudio
    );
  }, [allStories, user?.name]);

  const acceptedCount = applications.filter(a => a.status === 'ACCEPTED').length;
  const pendingCount = applications.filter(a => a.status === 'PENDING').length;

  const handleApplyClick = (opp) => {
    setSelectedOpportunity(opp);
    setApplyMessage('');
    setApplyError('');
    setApplySuccess(false);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplyError('');

    if (!user) {
      setApplyError('Please sign in with your User account to submit an application.');
      return;
    }

    try {
      applyForSeva({
        sevaId: selectedOpportunity.id,
        user,
        message: applyMessage
      });
      setApplySuccess(true);
      setDataRevision(prev => prev + 1);
      setTimeout(() => {
        setSelectedOpportunity(null);
        setApplySuccess(false);
      }, 1800);
    } catch (err) {
      setApplyError(err.message || 'Error submitting application.');
    }
  };

  return (
    <div className="user-heritage-dashboard" key={dataRevision}>
      {/* User Welcome Profile Header */}
      <div className="dashboard-profile-hero">
        <div className="profile-hero-left">
          <div className="profile-avatar-large">
            {user?.avatarInitial || user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="profile-hero-info">
            <div className="profile-role-badge">
              <User size={13} />
              <span>User Dashboard</span>
            </div>
            <h2 className="profile-user-name">Welcome, {user?.name || 'Devotee'}</h2>
            <div className="profile-meta-pills">
              <span className="profile-pill">
                <MapPin size={12} /> {user?.location || 'Telangana, India'}
              </span>
              <span className="profile-pill">
                <Clock size={12} /> {user?.availability || 'Flexible'}
              </span>
            </div>
            <div className="profile-skills-row">
              <span className="skills-lead">Skills:</span>
              {(user?.skills || ['Cultural Service']).map((sk, i) => (
                <span key={i} className="skill-tag-sm">{sk}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-hero-actions">
          <button 
            type="button" 
            className="btn-edit-profile-action"
            onClick={onOpenRoleSwitcher}
          >
            <span>Edit Profile & Skills</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="dashboard-metrics-grid">
        <div className="metric-stat-card">
          <div className="stat-icon-wrap gold">
            <HeartHandshake size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">My Applications</span>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="stat-icon-wrap blue">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="stat-icon-wrap green">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{acceptedCount}</span>
            <span className="stat-label">Accepted Opportunities</span>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="stat-icon-wrap maroon">
            <Sparkles size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{allOpportunities.length}</span>
            <span className="stat-label">Available Opportunities</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: AVAILABLE OPPORTUNITIES */}
      <section className="dashboard-section-box">
        <div className="section-box-header">
          <div className="section-title-wrap">
            <Sparkles size={18} className="icon-maroon" />
            <h3 className="section-heading">Available Opportunities ({allOpportunities.length})</h3>
          </div>
          <span className="section-subtext">Created by Temple Administrators</span>
        </div>

        {allOpportunities.length === 0 ? (
          <div className="dashboard-empty-card">
            <HeartHandshake size={36} className="empty-icon-subtle" />
            <p className="empty-state-primary">No opportunities available yet.</p>
            <p className="empty-state-sub">
              Opportunities created by Temple Administrators will appear here for you to apply.
            </p>
          </div>
        ) : (
          <div className="available-opps-grid">
            {allOpportunities.map((opp) => {
              const userApp = applications.find(a => a.sevaId === opp.id);
              const hasApplied = Boolean(userApp);

              return (
                <div key={opp.id} className="user-opp-card">
                  <div className="user-opp-header">
                    <span className="user-opp-cat">{opp.category || 'Cultural Service'}</span>
                    <span className="user-opp-location">
                      <MapPin size={12} /> {opp.location}
                    </span>
                  </div>

                  <h4 className="user-opp-title">{opp.title}</h4>
                  
                  <div className="user-opp-temple">
                    <Landmark size={13} />
                    <span>{opp.templeName}</span>
                  </div>

                  <p className="user-opp-desc">
                    {opp.description ? opp.description.slice(0, 130) + '...' : ''}
                  </p>

                  <div className="user-opp-meta-row">
                    <span className="user-opp-date">
                      <Calendar size={12} /> {opp.date}
                    </span>
                    <span className="user-opp-spots">
                      <Users size={12} /> {opp.spotsRemaining || opp.peopleNeeded} spots
                    </span>
                  </div>

                  {opp.skillsRequired && opp.skillsRequired.length > 0 && (
                    <div className="user-opp-skills">
                      {opp.skillsRequired.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="skill-tag-sm">{sk}</span>
                      ))}
                    </div>
                  )}

                  <div className="user-opp-footer">
                    {hasApplied ? (
                      <div className={`applied-status-pill status-${userApp.status.toLowerCase()}`}>
                        {userApp.status === 'PENDING' && '⏳ Application Submitted • Status: Pending'}
                        {userApp.status === 'ACCEPTED' && '✓ Application Accepted • Status: Accepted'}
                        {userApp.status === 'REJECTED' && '✕ Application Rejected • Status: Rejected'}
                      </div>
                    ) : (
                      <button 
                        type="button" 
                        className="btn-apply-opp-cta"
                        onClick={() => handleApplyClick(opp)}
                      >
                        <HeartHandshake size={14} />
                        <span>Apply (I CAN HELP)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: MY APPLICATIONS & STATUS */}
      <section className="dashboard-section-box">
        <div className="section-box-header">
          <div className="section-title-wrap">
            <HeartHandshake size={18} className="icon-maroon" />
            <h3 className="section-heading">My Applications ({applications.length})</h3>
          </div>
          <span className="section-subtext">Track your application review status</span>
        </div>

        {applications.length === 0 ? (
          <div className="dashboard-empty-card">
            <HeartHandshake size={36} className="empty-icon-subtle" />
            <p className="empty-state-primary">No applications received yet.</p>
            <p className="empty-state-sub">
              When you select and apply for an opportunity above, your application status will be tracked here.
            </p>
          </div>
        ) : (
          <div className="applications-table-wrap">
            <table className="dashboard-data-table">
              <thead>
                <tr>
                  <th>Opportunity Title</th>
                  <th>Temple / Organization</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="table-seva-name">{app.sevaTitle}</div>
                    </td>
                    <td>
                      <span className="table-temple-name">{app.templeName}</span>
                    </td>
                    <td>
                      <span className="table-date-text">
                        {new Date(app.appliedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td>
                      <span className={`table-status-badge status-${app.status.toLowerCase()}`}>
                        {app.status === 'PENDING' && (
                          <>
                            <span className="status-indicator yellow" />
                            <strong>Pending</strong>
                            <span className="status-sub">waiting for temple administrator</span>
                          </>
                        )}
                        {app.status === 'ACCEPTED' && (
                          <>
                            <span className="status-indicator green" />
                            <strong>Accepted</strong>
                            <span className="status-sub">selected</span>
                          </>
                        )}
                        {app.status === 'REJECTED' && (
                          <>
                            <span className="status-indicator red" />
                            <strong>Rejected</strong>
                            <span className="status-sub">not selected</span>
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>



      {/* SECTION 4: PRESERVED CULTURAL MEMORIES */}
      <section className="dashboard-section-box">
        <div className="section-box-header">
          <div className="section-title-wrap">
            <BookOpen size={18} className="icon-maroon" />
            <h3 className="section-heading">My Preserved Cultural Stories ({userStories.length})</h3>
          </div>
          <button 
            type="button" 
            className="btn-link-action"
            onClick={() => onNavigateTab && onNavigateTab('stories')}
          >
            <span>Cultural Stories</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {userStories.length === 0 ? (
          <div className="dashboard-empty-card">
            <BookOpen size={32} className="empty-icon-subtle" />
            <p>You haven't recorded any oral histories or family memories yet.</p>
          </div>
        ) : (
          <div className="dashboard-stories-list">
            {userStories.map((story) => {
              const badge = story.verificationBadge || getVerificationBadge(story.verificationStatus || 'CULTURALLY_RELEVANT');

              return (
                <div key={story.id} className="dash-story-card">
                  <div className="dash-story-top">
                    <span className="dash-story-trad">{story.tradition}</span>
                    <span className={`status-badge-pill ${badge.class}`}>
                      {badge.icon} {badge.label}
                    </span>
                  </div>
                  <h4 className="dash-story-title">{story.title}</h4>
                  <p className="dash-story-snippet">
                    {story.description ? story.description.slice(0, 110) + '...' : ''}
                  </p>
                  {story.hasAudio && (
                    <span className="dash-audio-badge">🎙️ Voice Recording Preserved</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* OPPORTUNITY DETAIL & APPLICATION MODAL */}
      {selectedOpportunity && (
        <div className="modal-overlay" onClick={() => setSelectedOpportunity(null)} role="dialog" aria-modal="true">
          <div className="modal-card user-opp-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedOpportunity(null)}
              aria-label="Close Opportunity Modal"
            >
              <XCircle size={20} />
            </button>

            <div className="opp-detail-header">
              <span className="opp-detail-cat">{selectedOpportunity.category}</span>
              <h2 className="opp-detail-title">{selectedOpportunity.title}</h2>
              <div className="opp-detail-temple-row">
                <Landmark size={15} />
                <strong>{selectedOpportunity.templeName}</strong>
                <span className="dot-sep">•</span>
                <MapPin size={14} />
                <span>{selectedOpportunity.location}</span>
              </div>
            </div>

            <div className="opp-detail-body">
              <div className="opp-metrics-bar">
                <div className="opp-metric">
                  <span className="m-label">Schedule / Date</span>
                  <span className="m-val">{selectedOpportunity.date}</span>
                </div>
                <div className="opp-metric">
                  <span className="m-label">Duration</span>
                  <span className="m-val">{selectedOpportunity.duration}</span>
                </div>
                <div className="opp-metric">
                  <span className="m-label">Spots Available</span>
                  <span className="m-val">{selectedOpportunity.spotsRemaining || selectedOpportunity.peopleNeeded}</span>
                </div>
              </div>

              <div className="opp-detail-section">
                <h4 className="opp-section-title">Description & Purpose</h4>
                <p className="opp-section-text">{selectedOpportunity.description}</p>
              </div>

              {selectedOpportunity.skillsRequired && selectedOpportunity.skillsRequired.length > 0 && (
                <div className="opp-detail-section">
                  <h4 className="opp-section-title">Required Skills & Details</h4>
                  <div className="opp-skills-list">
                    {selectedOpportunity.skillsRequired.map((sk, i) => (
                      <span key={i} className="skill-pill-large">{sk}</span>
                    ))}
                  </div>
                </div>
              )}

              {applySuccess ? (
                <div className="apply-success-banner">
                  <CheckCircle size={22} className="success-icon" />
                  <div>
                    <strong>Application Submitted!</strong>
                    <p>Status: <strong>Pending</strong>. Waiting for temple administrator review.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="opp-apply-form">
                  <h4 className="opp-section-title">
                    <HeartHandshake size={16} /> Submit Your Voluntary Seva Offer
                  </h4>

                  {applyError && <div className="form-error-banner">{applyError}</div>}

                  <div className="applicant-id-summary">
                    <span>Applying as: <strong>{user?.name}</strong> ({user?.email})</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Message / Availability Note <span className="optional-tag">(Optional)</span>
                    </label>
                    <textarea 
                      className="form-textarea"
                      rows={3}
                      placeholder="Brief note on your background, skills, or times you are available to contribute..."
                      value={applyMessage}
                      onChange={(e) => setApplyMessage(e.target.value)}
                    />
                  </div>

                  <div className="modal-actions-bar">
                    <button 
                      type="button" 
                      className="btn-secondary-modal" 
                      onClick={() => setSelectedOpportunity(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-modal">
                      <Send size={15} />
                      <span>Submit Application (I CAN HELP)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
