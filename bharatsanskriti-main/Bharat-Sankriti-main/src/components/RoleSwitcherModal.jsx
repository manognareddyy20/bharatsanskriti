import React, { useState } from 'react';
import { X, User, Landmark, Check, Sparkles, Shield, MapPin, Award, Clock } from 'lucide-react';
import { getCurrentUser, switchRole, updateUserProfile } from '../services/authService';
import { DEMO_TEMPLES } from '../data/heritageConnectData';

export default function RoleSwitcherModal({ isOpen, onClose, onRoleChanged }) {
  const currentUser = getCurrentUser();
  const [activeRole, setActiveRole] = useState(currentUser?.role || 'user');
  const [selectedTempleId, setSelectedTempleId] = useState(
    currentUser?.templeProfile?.templeId || 'temple-ramappa'
  );
  
  // User profile fields
  const [userName, setUserName] = useState(currentUser?.name || 'Ananya Sharma');
  const [userLocation, setUserLocation] = useState(currentUser?.location || 'Hyderabad, Telangana');
  const [userSkills, setUserSkills] = useState(
    (currentUser?.skills || ['Photography', 'Documentation', 'Translation']).join(', ')
  );
  const [userAvailability, setUserAvailability] = useState(currentUser?.availability || 'Weekends');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();

    if (activeRole === 'temple_admin') {
      const updated = switchRole('temple_admin', selectedTempleId);
      if (onRoleChanged) onRoleChanged(updated);
    } else {
      const skillsArray = userSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const updated = updateUserProfile({
        role: 'user',
        name: userName.trim(),
        location: userLocation.trim(),
        skills: skillsArray.length > 0 ? skillsArray : ['Photography', 'Documentation'],
        availability: userAvailability
      });
      if (onRoleChanged) onRoleChanged(updated);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card role-switcher-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Role Switcher"
        >
          <X size={20} />
        </button>

        <div className="role-modal-header">
          <div className="role-badge">
            <Sparkles size={14} />
            <span>HeritageConnect Account & Role</span>
          </div>
          <h2 className="modal-title">Select Your Active Role</h2>
          <p className="modal-subtitle">
            Switch between contributing as a voluntary Sevak or managing heritage requirements as a Temple Administrator.
          </p>
        </div>

        {/* Dual Role Selector Tabs */}
        <div className="role-select-cards-grid">
          {/* Option 1: Volunteer / Contributor */}
          <div 
            className={`role-select-card ${activeRole === 'user' ? 'selected' : ''}`}
            onClick={() => setActiveRole('user')}
            role="button"
            tabIndex={0}
          >
            <div className="role-card-top">
              <div className="role-avatar-circle user-circle">
                <User size={24} />
              </div>
              {activeRole === 'user' && (
                <span className="active-check-badge">
                  <Check size={14} /> Active
                </span>
              )}
            </div>
            <h3 className="role-card-title">Volunteer & Contributor</h3>
            <p className="role-card-desc">
              Discover skill-based Sevas, apply with “I CAN HELP”, track your service, and preserve family cultural stories.
            </p>
          </div>

          {/* Option 2: Temple Administrator */}
          <div 
            className={`role-select-card ${activeRole === 'temple_admin' ? 'selected' : ''}`}
            onClick={() => setActiveRole('temple_admin')}
            role="button"
            tabIndex={0}
          >
            <div className="role-card-top">
              <div className="role-avatar-circle admin-circle">
                <Landmark size={24} />
              </div>
              {activeRole === 'temple_admin' && (
                <span className="active-check-badge">
                  <Check size={14} /> Active
                </span>
              )}
            </div>
            <h3 className="role-card-title">Temple Administrator</h3>
            <p className="role-card-desc">
              Post temple Seva needs, review & accept volunteer applications, and commission traditional artisans for TempleWork.
            </p>
          </div>
        </div>

        {/* Form configurations based on role */}
        <form onSubmit={handleSave} className="role-config-form">
          {activeRole === 'user' ? (
            <div className="role-settings-box">
              <h4 className="settings-section-title">
                <Award size={16} /> Volunteer Profile & Skills
              </h4>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">
                    <MapPin size={13} /> Your Location / City
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Hyderabad, Telangana" 
                    value={userLocation} 
                    onChange={(e) => setUserLocation(e.target.value)} 
                  />
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">
                    <Clock size={13} /> Availability
                  </label>
                  <select 
                    className="form-input"
                    value={userAvailability}
                    onChange={(e) => setUserAvailability(e.target.value)}
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Flexible">Flexible (Weekdays & Weekends)</option>
                    <option value="Festival Holidays">Festival Holidays</option>
                    <option value="Remote / Digital">Remote / Digital Volunteer</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Skills & Contributions (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Photography, Translation, Documentation, Music" 
                  value={userSkills} 
                  onChange={(e) => setUserSkills(e.target.value)} 
                />
                <span className="form-help-text">
                  Used by the AI engine to match you with relevant temple Seva opportunities.
                </span>
              </div>
            </div>
          ) : (
            <div className="role-settings-box">
              <h4 className="settings-section-title">
                <Landmark size={16} /> Managed Temple Complex
              </h4>

              <div className="form-group">
                <label className="form-label">Select Active Temple Trust</label>
                <select 
                  className="form-input"
                  value={selectedTempleId}
                  onChange={(e) => setSelectedTempleId(e.target.value)}
                >
                  {DEMO_TEMPLES.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Temple Preview Info */}
              {(() => {
                const t = DEMO_TEMPLES.find(item => item.id === selectedTempleId);
                if (!t) return null;
                return (
                  <div className="temple-preview-card">
                    <img src={t.image} alt={t.name} className="temple-preview-thumb" />
                    <div className="temple-preview-details">
                      <strong>{t.name}</strong>
                      <span className="preview-deity">Deity: {t.deity}</span>
                      <span className="preview-era">{t.era}</span>
                      <span className="preview-contact">Trustee in charge: {t.contactPerson}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="modal-actions-bar">
            <button type="button" className="btn-secondary-modal" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-modal">
              <Check size={16} />
              <span>Apply & Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
