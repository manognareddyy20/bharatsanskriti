import React, { useState } from 'react';
import { 
  Landmark, Users, Calendar, CheckCircle, XCircle, 
  Trash2, Edit3, Plus, ArrowLeft, Clock, MapPin, 
  Sparkles, Check, AlertCircle 
} from 'lucide-react';
import { 
  getTempleApplications, 
  reviewApplication, 
  markSevaCompleted, 
  deleteSeva 
} from '../../services/sevaService';
import CreateSevaModal from './CreateSevaModal';

export default function TempleAdminSevaManager({
  templeAdminProfile,
  sevas,
  onRefreshData,
  onBackClick,
  onCreateSevaClick
}) {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'sevas'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState(null);

  const templeId = templeAdminProfile?.templeProfile?.templeId || 'temple-ramappa';
  const templeName = templeAdminProfile?.templeProfile?.templeName || 'Temple Trust';

  // Filter sevas belonging to this temple
  const templeSevas = sevas.filter(s => s.templeId === templeId);
  const applications = getTempleApplications(templeId);

  const filteredApplications = applications.filter(a => {
    if (statusFilter === 'ALL') return true;
    return a.status === statusFilter;
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleAccept = (appId) => {
    try {
      reviewApplication(appId, 'ACCEPTED');
      showToast('Volunteer application ACCEPTED! Spot confirmed.');
      if (onRefreshData) onRefreshData();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleReject = (appId) => {
    try {
      reviewApplication(appId, 'REJECTED');
      showToast('Volunteer application marked REJECTED.');
      if (onRefreshData) onRefreshData();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleMarkComplete = (sevaId) => {
    if (window.confirm('Are you sure you want to mark this Seva as COMPLETED? All accepted volunteers will receive completion credit.')) {
      markSevaCompleted(sevaId);
      showToast('Seva marked as COMPLETED! Volunteers credited.');
      if (onRefreshData) onRefreshData();
    }
  };

  const handleDeleteSeva = (sevaId) => {
    if (window.confirm('Are you sure you want to cancel and remove this Seva posting?')) {
      deleteSeva(sevaId);
      showToast('Seva requirement cancelled and removed.');
      if (onRefreshData) onRefreshData();
    }
  };

  return (
    <div className="temple-admin-seva-manager">
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast-banner" role="status">
          <CheckCircle size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="manager-header">
        <div className="manager-title-group">
          <div className="manager-temple-badge">
            <Landmark size={14} />
            <span>{templeName}</span>
          </div>
          <h2 className="manager-title">Temple Seva Management Console</h2>
          <p className="manager-subtitle">
            Review volunteer applications, manage active Seva listings, and confirm completed services.
          </p>
        </div>

        <div className="manager-actions">
          <button 
            type="button" 
            className="btn-create-seva-cta"
            onClick={onCreateSevaClick}
          >
            <Plus size={16} />
            <span>Create New Seva</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="manager-tabs-bar">
        <button 
          type="button" 
          className={`manager-tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Users size={16} />
          <span>Volunteer Applications ({applications.length})</span>
        </button>

        <button 
          type="button" 
          className={`manager-tab ${activeTab === 'sevas' ? 'active' : ''}`}
          onClick={() => setActiveTab('sevas')}
        >
          <Calendar size={16} />
          <span>Temple Seva Listings ({templeSevas.length})</span>
        </button>
      </div>

      {/* TAB 1: VOLUNTEER APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="manager-tab-content">
          {/* Status Filter Pills */}
          <div className="status-filter-pills">
            {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'].map((status) => (
              <button 
                key={status}
                type="button"
                className={`filter-pill-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status === 'ALL' ? `All (${applications.length})` : `${status} (${applications.filter(a => a.status === status).length})`}
              </button>
            ))}
          </div>

          {filteredApplications.length === 0 ? (
            <div className="manager-empty-box">
              <Users size={40} className="empty-icon-dim" />
              <h4>No Applications in this Category</h4>
              <p>Applications from devotees offering skills will appear here for review.</p>
            </div>
          ) : (
            <div className="applications-list-grid">
              {filteredApplications.map((app) => (
                <div key={app.id} className={`application-card status-${app.status.toLowerCase()}`}>
                  <div className="app-card-header">
                    <div className="app-user-info">
                      <span className="app-applicant-name">{app.applicantName}</span>
                      <span className="app-applicant-loc">
                        <MapPin size={12} /> {app.applicantLocation || 'India'}
                      </span>
                    </div>

                    <span className={`app-status-badge badge-${app.status.toLowerCase()}`}>
                      {app.status === 'PENDING' && '⏳ Pending Review'}
                      {app.status === 'ACCEPTED' && '✓ Accepted'}
                      {app.status === 'REJECTED' && '✕ Declined'}
                      {app.status === 'COMPLETED' && '★ Completed'}
                    </span>
                  </div>

                  <div className="app-target-seva">
                    <span className="target-label">Target Seva:</span>
                    <strong className="target-title">{app.sevaTitle}</strong>
                  </div>

                  {/* Skills */}
                  <div className="app-skills-row">
                    {(app.applicantSkills || []).map((sk, i) => (
                      <span key={i} className="skill-tag-sm">{sk}</span>
                    ))}
                  </div>

                  {/* Message */}
                  {app.message && (
                    <div className="app-message-box">
                      <p className="app-msg-quote">“{app.message}”</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="app-meta-footer">
                    <span className="app-time">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </span>

                    {/* Action Buttons */}
                    <div className="app-action-buttons">
                      {app.status === 'PENDING' && (
                        <>
                          <button 
                            type="button" 
                            className="btn-app-accept"
                            onClick={() => handleAccept(app.id)}
                            title="Accept volunteer"
                          >
                            <Check size={14} /> Accept
                          </button>
                          <button 
                            type="button" 
                            className="btn-app-reject"
                            onClick={() => handleReject(app.id)}
                            title="Reject volunteer"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </>
                      )}

                      {app.status === 'ACCEPTED' && (
                        <button 
                          type="button" 
                          className="btn-app-reject-subtle"
                          onClick={() => handleReject(app.id)}
                        >
                          Revoke Acceptance
                        </button>
                      )}

                      {app.status === 'REJECTED' && (
                        <button 
                          type="button" 
                          className="btn-app-accept-subtle"
                          onClick={() => handleAccept(app.id)}
                        >
                          Re-Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TEMPLE SEVA LISTINGS */}
      {activeTab === 'sevas' && (
        <div className="manager-tab-content">
          {templeSevas.length === 0 ? (
            <div className="manager-empty-box">
              <Calendar size={40} className="empty-icon-dim" />
              <h4>No Seva Listings Created Yet</h4>
              <p>Click “Create New Seva” above to post a skill requirement for your temple.</p>
            </div>
          ) : (
            <div className="admin-sevas-table-wrap">
              <table className="admin-sevas-table">
                <thead>
                  <tr>
                    <th>Title & Category</th>
                    <th>Schedule</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templeSevas.map((s) => {
                    const sevaApps = applications.filter(a => a.sevaId === s.id);
                    const acceptedCount = sevaApps.filter(a => a.status === 'ACCEPTED').length;

                    return (
                      <tr key={s.id} className={s.status === 'COMPLETED' ? 'row-completed' : ''}>
                        <td>
                          <div className="table-seva-title">{s.title}</div>
                          <span className="table-category-tag">{s.category}</span>
                        </td>
                        <td>
                          <div>{s.date}</div>
                          <span className="table-duration-tag">{s.duration}</span>
                        </td>
                        <td>
                          <div><strong>{s.spotsRemaining}</strong> spots left</div>
                          <span className="table-capacity-note">
                            {acceptedCount} accepted / {s.peopleNeeded} needed
                          </span>
                        </td>
                        <td>
                          <span className={`table-status-pill status-${s.status.toLowerCase()}`}>
                            {s.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            {s.status !== 'COMPLETED' && (
                              <button 
                                type="button" 
                                className="btn-table-complete"
                                onClick={() => handleMarkComplete(s.id)}
                                title="Mark Seva as concluded & completed"
                              >
                                <CheckCircle size={14} /> Complete
                              </button>
                            )}
                            <button 
                              type="button" 
                              className="btn-table-delete"
                              onClick={() => handleDeleteSeva(s.id)}
                              title="Delete/cancel Seva listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
