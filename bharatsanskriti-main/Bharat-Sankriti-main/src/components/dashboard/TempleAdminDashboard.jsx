import React, { useState, useMemo } from 'react';
import { 
  Landmark, Users, Calendar, CheckCircle, Clock, 
  Plus, MapPin, ChevronRight, XCircle, 
  Check, Mail, Shield, Flag, ShieldCheck, Trash2, MessageSquare
} from 'lucide-react';
import { getCurrentUser, getRegisteredUsers } from '../../services/authService';
import { 
  getAllSevas, 
  getTempleApplications, 
  reviewApplication, 
  createSeva,
  deleteSeva 
} from '../../services/sevaService';
import { 
  getAllModerationReviews, 
  approveModeratedReview, 
  rejectModeratedReview, 
  deleteModeratedReview, 
  getVerificationBadge 
} from '../../services/contentVerificationService';
import { 
  getAllStoriesNeedingVerification, 
  updateStoryVerificationStatus 
} from '../../services/storyStorage';
import CreateSevaModal from '../seva/CreateSevaModal';

export default function TempleAdminDashboard({
  onNavigateTab,
  onOpenRoleSwitcher
}) {
  const [dataRevision, setDataRevision] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'opportunities' | 'applications' | 'workers' | 'moderation'
  const [appStatusFilter, setAppStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'
  const [moderationFilter, setModerationFilter] = useState('STORIES'); // 'STORIES' | 'ALL' | 'PENDING' | 'REPORTED' | 'APPROVED' | 'REJECTED'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const user = getCurrentUser();
  const templeProfile = user?.templeProfile;
  const templeId = templeProfile?.templeId || 'temple-ramappa';
  const templeName = templeProfile?.templeName || 'Temple Administration';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Dynamic Opportunities
  const allSevas = useMemo(() => getAllSevas(), [dataRevision]);
  const templeSevas = useMemo(() => {
    return allSevas.filter(s => s.templeId === templeId || s.adminId === user?.id);
  }, [allSevas, templeId, user?.id]);

  // 2. Dynamic Applications
  const applications = useMemo(() => {
    return getTempleApplications(templeId, user?.id);
  }, [templeId, user?.id, dataRevision]);

  const pendingApps = useMemo(() => applications.filter(a => a.status === 'PENDING'), [applications]);
  const acceptedApps = useMemo(() => applications.filter(a => a.status === 'ACCEPTED'), [applications]);
  const rejectedApps = useMemo(() => applications.filter(a => a.status === 'REJECTED'), [applications]);

  // 3. Dynamic Registered Users
  const registeredUsers = useMemo(() => {
    return getRegisteredUsers();
  }, [dataRevision]);

  // 4. Cultural Content & Review Moderation Data
  const allModerationReviews = useMemo(() => getAllModerationReviews(), [dataRevision]);
  const storiesNeedingVerification = useMemo(() => getAllStoriesNeedingVerification(), [dataRevision]);

  const pendingReviews = useMemo(() => allModerationReviews.filter(r => r.outcome === 'FLAGGED_FOR_REVIEW' || r.outcome === 'ADMIN_REVIEW' || r.status === 'ADMIN_REVIEW'), [allModerationReviews]);
  const reportedReviews = useMemo(() => allModerationReviews.filter(r => r.outcome === 'REPORTED' || r.status === 'REPORTED'), [allModerationReviews]);
  const approvedReviews = useMemo(() => allModerationReviews.filter(r => r.outcome === 'APPROVED' || r.status === 'APPROVED'), [allModerationReviews]);
  const rejectedReviews = useMemo(() => allModerationReviews.filter(r => r.outcome === 'REJECTED' || r.status === 'REJECTED'), [allModerationReviews]);

  // Filtered Applications for display
  const filteredApps = useMemo(() => {
    if (appStatusFilter === 'ALL') return applications;
    return applications.filter(a => a.status === appStatusFilter);
  }, [applications, appStatusFilter]);

  // Filtered Moderation Reviews for display
  const filteredModerationReviews = useMemo(() => {
    if (moderationFilter === 'ALL') return allModerationReviews;
    if (moderationFilter === 'PENDING') return pendingReviews;
    if (moderationFilter === 'REPORTED') return reportedReviews;
    if (moderationFilter === 'APPROVED') return approvedReviews;
    if (moderationFilter === 'REJECTED') return rejectedReviews;
    return allModerationReviews;
  }, [allModerationReviews, pendingReviews, reportedReviews, approvedReviews, rejectedReviews, moderationFilter]);

  const handleAccept = (appId) => {
    try {
      reviewApplication(appId, 'ACCEPTED');
      showToast('Application ACCEPTED! Worker has been added to Accepted Workers.');
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleReject = (appId) => {
    try {
      reviewApplication(appId, 'REJECTED');
      showToast('Application REJECTED.');
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleOpportunityCreated = (newOppData) => {
    try {
      const created = createSeva(newOppData, user);
      showToast(`Opportunity "${created.title}" successfully published!`);
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteOpp = (oppId) => {
    if (window.confirm('Are you sure you want to remove this opportunity?')) {
      deleteSeva(oppId);
      showToast('Opportunity removed.');
      setDataRevision(prev => prev + 1);
    }
  };

  // Moderation Handlers
  const handleApproveReview = (revId) => {
    try {
      approveModeratedReview(revId);
      showToast('Review Approved & Published.');
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleRejectReview = (revId) => {
    try {
      rejectModeratedReview(revId);
      showToast('Review Rejected.');
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteReview = (revId) => {
    if (window.confirm('Are you sure you want to delete this review record?')) {
      deleteModeratedReview(revId);
      showToast('Review deleted permanently.');
      setDataRevision(prev => prev + 1);
    }
  };

  const handleApproveStory = (storyId, newStatus) => {
    try {
      updateStoryVerificationStatus(storyId, newStatus, `Verified by Temple Admin as ${newStatus}`);
      showToast(`Story status updated to ${newStatus}`);
      setDataRevision(prev => prev + 1);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="temple-admin-dashboard" key={dataRevision}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-banner" role="status">
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Temple Admin Masthead / Hero */}
      <div className="temple-dashboard-hero">
        <div className="temple-hero-left">
          <div className="temple-admin-badge-icon">
            <Landmark size={28} />
          </div>
          <div className="temple-hero-info">
            <div className="temple-admin-pill">
              <Shield size={12} />
              <span>Temple Administrator</span>
            </div>
            <h2 className="temple-hero-title">{templeName}</h2>
            <div className="temple-hero-meta">
              <span className="hero-meta-item">
                <MapPin size={13} /> {templeProfile?.location || 'Telangana, India'}
              </span>
              <span className="dot-sep">•</span>
              <span className="hero-meta-item">
                Administrator: <strong>{user?.name || 'Administrator'}</strong>
              </span>
              <span className="dot-sep">•</span>
              <span className="hero-meta-item">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="temple-hero-actions">
          <button 
            type="button" 
            className="btn-create-opp-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span>Create Opportunity</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="dashboard-metrics-grid four-col">
        {/* 1. Opportunities Created */}
        <div className="metric-stat-card">
          <div className="stat-icon-wrap maroon">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{templeSevas.length}</span>
            <span className="stat-label">Opportunities Created</span>
          </div>
        </div>

        {/* 2. Pending Applications */}
        <div className="metric-stat-card">
          <div className="stat-icon-wrap gold">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{pendingApps.length}</span>
            <span className="stat-label">Pending Applications</span>
          </div>
        </div>

        {/* 3. Content Moderation Items */}
        <div className="metric-stat-card" onClick={() => setActiveSubTab('moderation')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-wrap purple">
            <ShieldCheck size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{reportedReviews.length + pendingReviews.length}</span>
            <span className="stat-label">Moderation Items</span>
          </div>
        </div>

        {/* 4. New Applicants / Registered Users */}
        <div className="metric-stat-card">
          <div className="stat-icon-wrap blue">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{registeredUsers.length}</span>
            <span className="stat-label">New Applicants</span>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="admin-section-tabs-bar">
        <button 
          type="button" 
          className={`admin-sec-tab ${activeSubTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('overview')}
        >
          <span>Console Overview</span>
        </button>
        <button 
          type="button" 
          className={`admin-sec-tab ${activeSubTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('opportunities')}
        >
          <span>My Opportunities ({templeSevas.length})</span>
        </button>
        <button 
          type="button" 
          className={`admin-sec-tab ${activeSubTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('applications')}
        >
          <span>Applications ({applications.length})</span>
        </button>
        <button 
          type="button" 
          className={`admin-sec-tab ${activeSubTab === 'workers' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('workers')}
        >
          <span>Workers & Applicants ({acceptedApps.length} / {registeredUsers.length})</span>
        </button>
        <button 
          type="button" 
          className={`admin-sec-tab ${activeSubTab === 'moderation' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('moderation')}
        >
          <span>Content Moderation ({reportedReviews.length + pendingReviews.length})</span>
        </button>
      </div>

      {/* TAB 1: CONSOLE OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="admin-overview-stack">
          {/* SECTION: PENDING APPLICATIONS QUICK ACTION */}
          <section className="dashboard-section-box">
            <div className="section-box-header">
              <div className="section-title-wrap">
                <Clock size={18} className="icon-maroon" />
                <h3 className="section-heading">
                  Applications Requiring Review ({pendingApps.length})
                </h3>
              </div>
              <button 
                type="button" 
                className="btn-link-action"
                onClick={() => setActiveSubTab('applications')}
              >
                <span>View All Applications</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {pendingApps.length === 0 ? (
              <div className="dashboard-empty-card">
                <CheckCircle size={32} className="empty-icon-subtle green" />
                <p className="empty-state-primary">No applications received yet.</p>
                <p className="empty-state-sub">
                  When registered users apply for your opportunities, their applications will appear here for review.
                </p>
              </div>
            ) : (
              <div className="pending-apps-list">
                {pendingApps.map((app) => (
                  <div key={app.id} className="admin-app-card pending">
                    <div className="app-card-top-row">
                      <div className="app-user-meta">
                        <strong className="app-user-name">{app.applicantName}</strong>
                        <span className="app-user-email"><Mail size={11} /> {app.applicantEmail}</span>
                        <span className="app-user-loc"><MapPin size={11} /> {app.applicantLocation || 'India'}</span>
                      </div>
                      <span className="app-status-badge badge-pending">
                        ⏳ Status: Pending
                      </span>
                    </div>

                    <div className="app-opp-title-row">
                      <span className="label-dim">Applied for Opportunity:</span>
                      <strong>{app.sevaTitle}</strong>
                    </div>

                    {app.applicantSkills && app.applicantSkills.length > 0 && (
                      <div className="app-skills-row">
                        {app.applicantSkills.map((sk, idx) => (
                          <span key={idx} className="skill-tag-sm">{sk}</span>
                        ))}
                      </div>
                    )}

                    {app.message && (
                      <div className="app-note-box">
                        <p className="app-note-text">“{app.message}”</p>
                      </div>
                    )}

                    <div className="app-card-footer-row">
                      <span className="app-applied-time">
                        Applied On: {new Date(app.appliedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>

                      <div className="app-decision-buttons">
                        <button 
                          type="button" 
                          className="btn-accept-app"
                          onClick={() => handleAccept(app.id)}
                        >
                          <Check size={14} />
                          <span>Accept</span>
                        </button>
                        <button 
                          type="button" 
                          className="btn-reject-app"
                          onClick={() => handleReject(app.id)}
                        >
                          <XCircle size={14} />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* QUICK MODERATION ALERT BANNER */}
          {(reportedReviews.length > 0 || storiesNeedingVerification.length > 0) && (
            <section className="dashboard-section-box alert-box">
              <div className="section-box-header">
                <div className="section-title-wrap">
                  <Flag size={18} className="icon-gold" />
                  <h3 className="section-heading">Content Moderation Alerts</h3>
                </div>
                <button 
                  type="button" 
                  className="btn-primary-sm"
                  onClick={() => setActiveSubTab('moderation')}
                >
                  Go to Moderation Console
                </button>
              </div>
              <p className="empty-state-sub">
                You have {reportedReviews.length} reported review(s) and {storiesNeedingVerification.length} story/stories awaiting verification.
              </p>
            </section>
          )}

          {/* SECTION: RECENT MY OPPORTUNITIES */}
          <section className="dashboard-section-box">
            <div className="section-box-header">
              <div className="section-title-wrap">
                <Calendar size={18} className="icon-gold" />
                <h3 className="section-heading">My Opportunities ({templeSevas.length})</h3>
              </div>
              <button 
                type="button" 
                className="btn-primary-sm"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus size={14} />
                <span>Create Opportunity</span>
              </button>
            </div>

            {templeSevas.length === 0 ? (
              <div className="dashboard-empty-card">
                <Calendar size={32} className="empty-icon-subtle" />
                <p className="empty-state-primary">No opportunities available yet.</p>
                <p className="empty-state-sub">
                  Click “Create Opportunity” above to post and publish your first seva requirement.
                </p>
              </div>
            ) : (
              <div className="admin-sevas-summary-grid">
                {templeSevas.map((opp) => {
                  const oppApps = applications.filter(a => a.sevaId === opp.id);
                  const oppAccepted = oppApps.filter(a => a.status === 'ACCEPTED');

                  return (
                    <div key={opp.id} className="admin-seva-summary-card">
                      <div className="summary-card-top">
                        <span className="summary-cat">{opp.category}</span>
                        <span className={`summary-status ${opp.status.toLowerCase()}`}>
                          {opp.status}
                        </span>
                      </div>
                      <h4 className="summary-title">{opp.title}</h4>
                      <div className="summary-meta">
                        <span><Calendar size={12} /> {opp.date}</span>
                        <span className="dot-sep">•</span>
                        <span><MapPin size={12} /> {opp.location}</span>
                      </div>
                      <div className="summary-capacity-bar">
                        <div className="capacity-label">
                          <span>Workers: {oppAccepted.length} / {opp.peopleNeeded}</span>
                          <span>{opp.spotsRemaining} spots left</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: MY OPPORTUNITIES */}
      {activeSubTab === 'opportunities' && (
        <section className="dashboard-section-box">
          <div className="section-box-header">
            <div className="section-title-wrap">
              <Calendar size={18} className="icon-gold" />
              <h3 className="section-heading">My Opportunities ({templeSevas.length})</h3>
            </div>
            <button 
              type="button" 
              className="btn-create-opp-primary"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={15} />
              <span>Create Opportunity</span>
            </button>
          </div>

          {templeSevas.length === 0 ? (
            <div className="dashboard-empty-card">
              <Calendar size={36} className="empty-icon-subtle" />
              <p className="empty-state-primary">No opportunities available yet.</p>
              <p className="empty-state-sub">
                Publish an opportunity to invite applications from registered users.
              </p>
              <button 
                type="button" 
                className="btn-primary-sm mt-3"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Opportunity Now
              </button>
            </div>
          ) : (
            <div className="admin-detailed-opps-list">
              {templeSevas.map((opp) => {
                const oppApps = applications.filter(a => a.sevaId === opp.id);
                const accepted = oppApps.filter(a => a.status === 'ACCEPTED');
                const pending = oppApps.filter(a => a.status === 'PENDING');

                return (
                  <div key={opp.id} className="admin-detailed-opp-card">
                    <div className="opp-card-left">
                      <span className="opp-category-badge">{opp.category}</span>
                      <h4 className="opp-heading">{opp.title}</h4>
                      <p className="opp-desc">{opp.description}</p>
                      
                      <div className="opp-specs-line">
                        <span><MapPin size={12} /> {opp.location}</span>
                        <span className="dot-sep">•</span>
                        <span><Calendar size={12} /> {opp.date}</span>
                        <span className="dot-sep">•</span>
                        <span>Duration: {opp.duration}</span>
                      </div>

                      {opp.skillsRequired && opp.skillsRequired.length > 0 && (
                        <div className="opp-skills-tags">
                          {opp.skillsRequired.map((sk, idx) => (
                            <span key={idx} className="skill-tag-sm">{sk}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="opp-card-right">
                      <div className="opp-stats-box">
                        <div className="opp-stat-num">{oppApps.length}</div>
                        <div className="opp-stat-desc">Total Applications</div>
                        <div className="opp-stat-sub">
                          {accepted.length} accepted • {pending.length} pending
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="btn-delete-opp"
                        onClick={() => handleDeleteOpp(opp.id)}
                        title="Delete Opportunity"
                      >
                        Remove Listing
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* TAB 3: APPLICATIONS */}
      {activeSubTab === 'applications' && (
        <section className="dashboard-section-box">
          <div className="section-box-header">
            <div className="section-title-wrap">
              <Users size={18} className="icon-maroon" />
              <h3 className="section-heading">Applications Received ({applications.length})</h3>
            </div>

            <div className="status-filter-pills">
              {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((st) => (
                <button 
                  key={st}
                  type="button" 
                  className={`filter-pill-btn ${appStatusFilter === st ? 'active' : ''}`}
                  onClick={() => setAppStatusFilter(st)}
                >
                  {st === 'ALL' ? `All (${applications.length})` : 
                   st === 'PENDING' ? `Pending (${pendingApps.length})` :
                   st === 'ACCEPTED' ? `Accepted (${acceptedApps.length})` :
                   `Rejected (${rejectedApps.length})`}
                </button>
              ))}
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="dashboard-empty-card">
              <Users size={36} className="empty-icon-subtle" />
              <p className="empty-state-primary">No applications received yet.</p>
              <p className="empty-state-sub">
                Applications submitted by users will appear here with full applicant details for you to Accept or Reject.
              </p>
            </div>
          ) : (
            <div className="admin-applications-grid">
              {filteredApps.map((app) => (
                <div key={app.id} className={`admin-app-card ${app.status.toLowerCase()}`}>
                  <div className="app-card-top-row">
                    <div className="app-user-meta">
                      <strong className="app-user-name">{app.applicantName}</strong>
                      <span className="app-user-email"><Mail size={12} /> {app.applicantEmail}</span>
                      <span className="app-user-loc"><MapPin size={12} /> {app.applicantLocation || 'India'}</span>
                    </div>

                    <span className={`app-status-badge badge-${app.status.toLowerCase()}`}>
                      {app.status === 'PENDING' && '⏳ Status: Pending'}
                      {app.status === 'ACCEPTED' && '✓ Status: Accepted'}
                      {app.status === 'REJECTED' && '✕ Status: Rejected'}
                    </span>
                  </div>

                  <div className="app-opp-title-row">
                    <span className="label-dim">Applied Opportunity:</span>
                    <strong>{app.sevaTitle}</strong>
                  </div>

                  {app.applicantSkills && app.applicantSkills.length > 0 && (
                    <div className="app-skills-row">
                      {app.applicantSkills.map((sk, idx) => (
                        <span key={idx} className="skill-tag-sm">{sk}</span>
                      ))}
                    </div>
                  )}

                  {app.message && (
                    <div className="app-note-box">
                      <span className="app-note-label">Applicant Note / Details:</span>
                      <p className="app-note-text">“{app.message}”</p>
                    </div>
                  )}

                  <div className="app-card-footer-row">
                    <span className="app-applied-time">
                      Date: {new Date(app.appliedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>

                    <div className="app-decision-buttons">
                      {app.status === 'PENDING' ? (
                        <>
                          <button 
                            type="button" 
                            className="btn-accept-app"
                            onClick={() => handleAccept(app.id)}
                          >
                            <Check size={14} />
                            <span>Accept</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-reject-app"
                            onClick={() => handleReject(app.id)}
                          >
                            <XCircle size={14} />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : app.status === 'ACCEPTED' ? (
                        <div className="reviewed-action-group">
                          <span className="status-locked accepted">
                            <CheckCircle size={14} /> Selected Worker
                          </span>
                          <button 
                            type="button" 
                            className="btn-change-decision"
                            onClick={() => handleReject(app.id)}
                          >
                            Change to Rejected
                          </button>
                        </div>
                      ) : (
                        <div className="reviewed-action-group">
                          <span className="status-locked rejected">
                            <XCircle size={14} /> Not Selected
                          </span>
                          <button 
                            type="button" 
                            className="btn-change-decision"
                            onClick={() => handleAccept(app.id)}
                          >
                            Re-Accept
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 4: WORKERS / APPLICANTS */}
      {activeSubTab === 'workers' && (
        <div className="workers-applicants-stack">
          {/* SUBSECTION A: ACCEPTED WORKERS */}
          <section className="dashboard-section-box">
            <div className="section-box-header">
              <div className="section-title-wrap">
                <CheckCircle size={18} className="icon-green" />
                <h3 className="section-heading">Accepted Workers ({acceptedApps.length})</h3>
              </div>
              <span className="section-subtext">Registered users accepted for temple opportunities</span>
            </div>

            {acceptedApps.length === 0 ? (
              <div className="dashboard-empty-card">
                <CheckCircle size={36} className="empty-icon-subtle green" />
                <p className="empty-state-primary">
                  No workers yet. Workers will appear when registered users apply for opportunities.
                </p>
                <p className="empty-state-sub">
                  Only real users whose applications you accept will appear in this list. Zero fake workers are generated.
                </p>
              </div>
            ) : (
              <div className="accepted-workers-table-wrap">
                <table className="dashboard-data-table">
                  <thead>
                    <tr>
                      <th>Worker Name</th>
                      <th>Email Address</th>
                      <th>Location</th>
                      <th>Accepted Opportunity</th>
                      <th>Skills</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedApps.map((worker) => (
                      <tr key={worker.id}>
                        <td>
                          <strong>{worker.applicantName}</strong>
                        </td>
                        <td>{worker.applicantEmail}</td>
                        <td>{worker.applicantLocation || 'India'}</td>
                        <td>
                          <span className="table-highlight">{worker.sevaTitle}</span>
                        </td>
                        <td>
                          {(worker.applicantSkills || []).slice(0, 2).join(', ')}
                        </td>
                        <td>
                          <span className="status-pill-accepted">
                            <CheckCircle size={13} /> Accepted Worker
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* SUBSECTION B: REGISTERED USERS AVAILABLE */}
          <section className="dashboard-section-box">
            <div className="section-box-header">
              <div className="section-title-wrap">
                <Users size={18} className="icon-blue" />
                <h3 className="section-heading">
                  Newly Registered Users Available to Apply ({registeredUsers.length})
                </h3>
              </div>
              <span className="section-subtext">Real accounts created in Bharat Sanskriti</span>
            </div>

            {registeredUsers.length === 0 ? (
              <div className="dashboard-empty-card">
                <Users size={36} className="empty-icon-subtle" />
                <p className="empty-state-primary">No registered users yet.</p>
                <p className="empty-state-sub">
                  When new users sign up on Bharat Sanskriti, their accounts will dynamically appear here.
                </p>
              </div>
            ) : (
              <div className="registered-users-table-wrap">
                <table className="dashboard-data-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Skills</th>
                      <th>Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((regUser) => (
                      <tr key={regUser.id}>
                        <td>
                          <div className="user-name-cell">
                            <div className="user-avatar-tiny">{regUser.name.charAt(0).toUpperCase()}</div>
                            <strong>{regUser.name}</strong>
                          </div>
                        </td>
                        <td>{regUser.email}</td>
                        <td>{regUser.location || 'India'}</td>
                        <td>
                          {(regUser.skills || []).slice(0, 3).join(', ')}
                        </td>
                        <td>
                          {new Date(regUser.joinedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 5: CULTURAL CONTENT & REVIEW MODERATION */}
      {activeSubTab === 'moderation' && (
        <div className="admin-moderation-stack">
          <section className="dashboard-section-box">
            <div className="section-box-header">
              <div className="section-title-wrap">
                <ShieldCheck size={18} className="icon-gold" />
                <h3 className="section-heading">Cultural Content & Review Moderation Console</h3>
              </div>
              <span className="section-subtext">Verified Content & Community Trust Review</span>
            </div>

            {/* Moderation Filter Pills */}
            <div className="status-filter-pills flex-wrap">
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setModerationFilter('ALL')}
              >
                All Reviews ({allModerationReviews.length})
              </button>
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'PENDING' ? 'active' : ''}`}
                onClick={() => setModerationFilter('PENDING')}
              >
                Pending Review ({pendingReviews.length})
              </button>
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'REPORTED' ? 'active' : ''}`}
                onClick={() => setModerationFilter('REPORTED')}
              >
                🚩 Flagged & Reported ({reportedReviews.length})
              </button>
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'APPROVED' ? 'active' : ''}`}
                onClick={() => setModerationFilter('APPROVED')}
              >
                ✓ Approved ({approvedReviews.length})
              </button>
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'REJECTED' ? 'active' : ''}`}
                onClick={() => setModerationFilter('REJECTED')}
              >
                ✕ Rejected ({rejectedReviews.length})
              </button>
              <button 
                type="button" 
                className={`filter-pill-btn ${moderationFilter === 'STORIES' ? 'active' : ''}`}
                onClick={() => setModerationFilter('STORIES')}
              >
                📜 Stories Needing Verification ({storiesNeedingVerification.length})
              </button>
            </div>

            {/* MODERATION CONTENT LIST */}
            {moderationFilter === 'STORIES' ? (
              /* STORIES NEEDING VERIFICATION DISPLAY */
              <div className="stories-moderation-grid">
                {storiesNeedingVerification.length === 0 ? (
                  <div className="dashboard-empty-card">
                    <CheckCircle size={32} className="empty-icon-subtle green" />
                    <p className="empty-state-primary">No stories currently requiring verification.</p>
                  </div>
                ) : (
                  storiesNeedingVerification.map((story) => (
                    <div key={story.id} className="admin-moderation-item-card story-item">
                      <div className="item-header-row">
                        <div className="item-title-meta">
                          <span className="item-category-tag">Cultural Story ({story.storyType || 'Historical Claim'})</span>
                          <h4 className="item-title">{story.title}</h4>
                          <span className="item-author">Contributed by: {story.preservedBy || story.person}</span>
                        </div>
                        <span className={`status-badge-pill ${story.verificationBadge?.class || 'badge-needs-verification'}`}>
                          {story.verificationBadge?.icon || '🟡'} {story.verificationBadge?.label || story.verificationStatus}
                        </span>
                      </div>

                      <p className="item-body-text">“{story.description}”</p>
                      <div className="item-reason-note">
                        <strong>Verification Note:</strong> {story.verificationReason || 'Claim requires factual verification.'}
                      </div>

                      <div className="item-actions-row">
                        <button 
                          type="button" 
                          className="btn-accept-app"
                          onClick={() => handleApproveStory(story.id, 'SUPPORTED_FACT')}
                        >
                          <Check size={14} />
                          <span>Approve as Supported Fact</span>
                        </button>
                        <button 
                          type="button" 
                          className="btn-secondary-sm"
                          onClick={() => handleApproveStory(story.id, 'PERSONAL_STORY')}
                        >
                          <span>Mark as Personal Story</span>
                        </button>
                        <button 
                          type="button" 
                          className="btn-reject-app"
                          onClick={() => handleApproveStory(story.id, 'NOT_RELEVANT')}
                        >
                          <XCircle size={14} />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* REVIEWS MODERATION DISPLAY */
              <div className="reviews-moderation-list">
                {filteredModerationReviews.length === 0 ? (
                  <div className="dashboard-empty-card">
                    <CheckCircle size={32} className="empty-icon-subtle green" />
                    <p className="empty-state-primary">No reviews matching this moderation filter.</p>
                  </div>
                ) : (
                  filteredModerationReviews.map((rev) => {
                    const badge = rev.badge || getVerificationBadge(rev.status || rev.outcome);
                    const isReported = rev.outcome === 'REPORTED' || rev.status === 'REPORTED';

                    return (
                      <div key={rev.id} className={`admin-moderation-item-card ${isReported ? 'flagged' : ''}`}>
                        <div className="item-header-row">
                          <div className="item-title-meta">
                            <span className="item-category-tag">{rev.itemType?.toUpperCase()} REVIEW • {rev.itemTitle}</span>
                            <h4 className="item-title">{rev.reviewerName}</h4>
                            <span className="item-rating">{rev.rating} / 5 Stars</span>
                          </div>

                          <span className={`status-badge-pill ${badge.class}`}>
                            {badge.icon} {badge.label}
                          </span>
                        </div>

                        <p className="item-body-text">“{rev.reviewText}”</p>

                        <div className="item-reason-note">
                          <strong>Moderation Reason:</strong> {rev.outcomeReason || rev.reason || 'Verified cultural score: ' + (rev.culturalRelevanceScore || 80) + '%'}
                        </div>

                        {rev.reportDetails && (
                          <div className="report-details-box">
                            <strong>🚩 Flagged Report Details:</strong>
                            <div>Reason: <strong>{rev.reportDetails.reason}</strong></div>
                            <div>Reported By: {rev.reportDetails.reportedBy}</div>
                            {rev.reportDetails.userNote && <div>User Note: “{rev.reportDetails.userNote}”</div>}
                          </div>
                        )}

                        <div className="item-actions-row">
                          <button 
                            type="button" 
                            className="btn-accept-app"
                            onClick={() => handleApproveReview(rev.id)}
                          >
                            <Check size={14} />
                            <span>Approve Review</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-reject-app"
                            onClick={() => handleRejectReview(rev.id)}
                          >
                            <XCircle size={14} />
                            <span>Reject Review</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-delete-opp"
                            onClick={() => handleDeleteReview(rev.id)}
                            title="Delete Review"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {/* CREATE OPPORTUNITY MODAL */}
      <CreateSevaModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSevaCreated={handleOpportunityCreated}
      />
    </div>
  );
}
