import React, { useState } from 'react';
import { 
  X, User, Landmark, UserCheck, KeyRound, Mail, 
  MapPin, Award, ArrowRight, Shield, CheckCircle 
} from 'lucide-react';
import { 
  registerUser, 
  loginUser, 
  loginTempleAdmin, 
  registerTempleAdmin 
} from '../services/authService';

export default function AuthModal({ isOpen, onClose, onSuccess, initialRole = 'user' }) {
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'user' | 'temple_admin'
  const [userMode, setUserMode] = useState('register'); // 'register' | 'login'
  const [adminMode, setAdminMode] = useState('login'); // 'login' | 'register'

  // User fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');

  // Temple Admin fields
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [templeName, setTempleName] = useState('');
  const [templeLocation, setTempleLocation] = useState('');

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setLocation('');
    setSkills('');
    setAdminEmail('');
    setAdminPassword('');
    setAdminName('');
    setTempleName('');
    setTempleLocation('');
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      let account;
      if (userMode === 'register') {
        if (!name.trim()) {
          setError('Please enter your full name.');
          return;
        }
        if (!email.trim()) {
          setError('Please enter your email address.');
          return;
        }
        account = registerUser({
          name: name.trim(),
          email: email.trim(),
          password: password || 'user123',
          location: location.trim() || 'Telangana, India',
          skills: skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : ['Cultural Service']
        });
      } else {
        if (!email.trim()) {
          setError('Please enter your email address.');
          return;
        }
        account = loginUser({
          email: email.trim(),
          password: password || 'user123'
        });
      }

      if (onSuccess) onSuccess(account);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication error. Please try again.');
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      let account;
      if (adminMode === 'login') {
        if (!adminEmail.trim()) {
          setError('Please enter your administrator email.');
          return;
        }
        account = loginTempleAdmin({
          email: adminEmail.trim(),
          password: adminPassword || 'admin123'
        });
      } else {
        if (!adminName.trim() || !templeName.trim() || !adminEmail.trim()) {
          setError('Please fill in Administrator Name, Temple Name, and Email.');
          return;
        }
        account = registerTempleAdmin({
          name: adminName.trim(),
          templeName: templeName.trim(),
          email: adminEmail.trim(),
          password: adminPassword || 'admin123',
          location: templeLocation.trim() || 'Telangana, India'
        });
      }

      if (onSuccess) onSuccess(account);
      onClose();
    } catch (err) {
      setError(err.message || 'Administrator authentication error.');
    }
  };

  const handleFillDemoAdmin = () => {
    setAdminEmail('admin@ramappa.org');
    setAdminPassword('admin123');
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card auth-modal-card-v2" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Authentication Dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header-strip">
          <span className="auth-kicker">Account Access</span>
          <h2 className="auth-headline">Bharat Sanskriti Authentication</h2>
          <p className="auth-subhead">
            Select your account type to continue. Normal users and Temple Administrators have separate dashboards and roles.
          </p>
        </div>

        {/* Step 1: Role Selection ("Continue as") */}
        <div className="role-selection-grid">
          <button 
            type="button"
            className={`role-choice-card ${selectedRole === 'user' ? 'active' : ''}`}
            onClick={() => {
              setSelectedRole('user');
              setError('');
            }}
          >
            <div className="role-choice-icon-wrap user-bg">
              <User size={22} />
            </div>
            <div className="role-choice-text">
              <span className="role-choice-tag">Continue as</span>
              <h3 className="role-choice-title">User</h3>
              <p className="role-choice-desc">
                Create account, browse opportunities, apply for seva, and track application status.
              </p>
            </div>
          </button>

          <button 
            type="button"
            className={`role-choice-card ${selectedRole === 'temple_admin' ? 'active' : ''}`}
            onClick={() => {
              setSelectedRole('temple_admin');
              setError('');
            }}
          >
            <div className="role-choice-icon-wrap admin-bg">
              <Landmark size={22} />
            </div>
            <div className="role-choice-text">
              <span className="role-choice-tag">Continue as</span>
              <h3 className="role-choice-title">Temple Administrator</h3>
              <p className="role-choice-desc">
                Post opportunities, review applications, and manage accepted workers.
              </p>
            </div>
          </button>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        {/* Step 2: Form Area Based on Selected Role */}
        {selectedRole === 'user' ? (
          <div className="auth-role-form-container">
            {/* Mode Switcher Tabs for User */}
            <div className="auth-submode-tabs">
              <button 
                type="button" 
                className={`auth-submode-tab ${userMode === 'register' ? 'active' : ''}`}
                onClick={() => { setUserMode('register'); setError(''); }}
              >
                Create Account
              </button>
              <button 
                type="button" 
                className={`auth-submode-tab ${userMode === 'login' ? 'active' : ''}`}
                onClick={() => { setUserMode('login'); setError(''); }}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="auth-interactive-form">
              {userMode === 'register' && (
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Ramesh Chandra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password <span className="required-star">*</span>
                </label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {userMode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      Location / District <span className="optional-tag">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Warangal, Telangana"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Skills & Interests <span className="optional-tag">(Optional, comma separated)</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Photography, Documentation, Translation"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="modal-actions-bar">
                <button type="button" className="btn-secondary-modal" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modal">
                  <UserCheck size={16} />
                  <span>{userMode === 'register' ? 'Create User Account' : 'Sign In as User'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="auth-role-form-container">
            {/* Mode Switcher Tabs for Temple Admin */}
            <div className="auth-submode-tabs">
              <button 
                type="button" 
                className={`auth-submode-tab ${adminMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAdminMode('login'); setError(''); }}
              >
                Administrator Login
              </button>
              <button 
                type="button" 
                className={`auth-submode-tab ${adminMode === 'register' ? 'active' : ''}`}
                onClick={() => { setAdminMode('register'); setError(''); }}
              >
                Register Temple Admin
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="auth-interactive-form">
              {adminMode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      Administrator Name <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Sri Venkata Ramana"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Temple or Heritage Trust Name <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Sri Rudreshwara (Ramappa) Temple Trust"
                      value={templeName}
                      onChange={(e) => setTempleName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Temple Location</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Palampet, Mulugu District, Telangana"
                      value={templeLocation}
                      onChange={(e) => setTempleLocation(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">
                  Administrator Email <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. admin@ramappa.org"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password <span className="required-star">*</span>
                </label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>

              {adminMode === 'login' && (
                <div className="admin-demo-cred-card">
                  <div className="admin-cred-badge">
                    <Shield size={13} />
                    <span>Demo Administrator Credentials</span>
                  </div>
                  <p className="admin-cred-text">
                    Email: <strong>admin@ramappa.org</strong> | Password: <strong>admin123</strong>
                  </p>
                  <button 
                    type="button" 
                    className="btn-autofill-cred"
                    onClick={handleFillDemoAdmin}
                  >
                    Auto-Fill Demo Admin Credentials
                  </button>
                </div>
              )}

              <div className="modal-actions-bar">
                <button type="button" className="btn-secondary-modal" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modal">
                  <Landmark size={16} />
                  <span>{adminMode === 'login' ? 'Log In as Administrator' : 'Register Temple Admin'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
