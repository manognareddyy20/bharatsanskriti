import React, { useState } from 'react';
import { 
  HeartHandshake, Hammer, Mic, LayoutDashboard, 
  Sparkles, Landmark, User, ArrowLeft 
} from 'lucide-react';
import { getCurrentUser, switchRole } from '../services/authService';
import SevaExchangeView from './seva/SevaExchangeView';
import TempleWorkView from './templework/TempleWorkView';
import CulturalStoriesModule from './stories/CulturalStoriesModule';
import UserHeritageDashboard from './dashboard/UserHeritageDashboard';
import TempleAdminDashboard from './dashboard/TempleAdminDashboard';
import AuthModal from './AuthModal';
import CreateSevaModal from './seva/CreateSevaModal';
import CreateProjectModal from './templework/CreateProjectModal';

export default function HeritageConnectHub({
  initialTab = null,
  onBackToHome,
  onToast,
  onOpenAuth
}) {
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  // Default to 'dashboard' for temple admin, or 'dashboard' for user, or 'seva' if visitor
  const defaultTab = initialTab || (isTempleAdmin ? 'dashboard' : currentUser ? 'dashboard' : 'seva');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateSevaOpen, setIsCreateSevaOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [revision, setRevision] = useState(0);

  const handleAuthSuccess = (account) => {
    setRevision(prev => prev + 1);
    if (account.role === 'temple_admin') {
      setActiveTab('dashboard');
    }
    if (onToast) {
      onToast(`Signed in as ${account.role === 'temple_admin' ? 'Temple Administrator' : 'User'}: ${account.name}`);
    }
  };

  const handleQuickSwitchAdmin = () => {
    const adminAcc = switchRole('temple_admin');
    setRevision(prev => prev + 1);
    setActiveTab('dashboard');
    if (onToast) {
      onToast(`Switched to Temple Administrator (${adminAcc?.templeProfile?.templeName || adminAcc?.name}). You can now verify or reject stories!`);
    }
  };

  const handleQuickSwitchUser = () => {
    const userAcc = switchRole('user');
    setRevision(prev => prev + 1);
    setActiveTab('dashboard');
    if (onToast) {
      onToast(`Switched to User Account (${userAcc?.name || 'Devotee'}).`);
    }
  };

  const openAuth = () => {
    if (onOpenAuth) onOpenAuth();
    else setIsAuthModalOpen(true);
  };

  return (
    <div className="heritage-connect-hub-view" key={revision}>
      {/* Top Back Nav & Quick Role Switcher Strip */}
      <div className="dashboard-nav-container heritage-hub-topbar">
        <button 
          id="btn-back-to-home"
          className="btn-back"
          onClick={onBackToHome}
          aria-label="Back to Exploration"
        >
          <ArrowLeft size={18} />
          <span>Back to Exploration</span>
        </button>

        {/* Quick Temple Admin Moderation Toggle Button */}
        <div className="hub-role-indicator">
          {!isTempleAdmin ? (
            <button 
              type="button" 
              className="btn-quick-admin-switch"
              onClick={handleQuickSwitchAdmin}
              title="Click to switch to Temple Administrator console to verify or reject stories & reviews"
            >
              <Landmark size={15} />
              <span>🏛️ Switch to Temple Admin Moderation Console</span>
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-quick-admin-switch active-admin"
              onClick={handleQuickSwitchUser}
              title="Currently in Temple Administrator Mode. Click to switch back to User view."
            >
              <User size={15} />
              <span>👤 Temple Admin (Active) — Switch to User</span>
            </button>
          )}

          {currentUser ? (
            <button 
              type="button" 
              className={`hub-role-badge-btn ${isTempleAdmin ? 'admin-badge' : 'user-badge'}`}
              onClick={openAuth}
              title="Click to switch account or log in as a different role"
            >
              {isTempleAdmin ? (
                <>
                  <Landmark size={14} />
                  <span>Admin: <strong>{currentUser?.templeProfile?.templeName?.slice(0, 24) || currentUser?.name || 'Temple'}...</strong></span>
                </>
              ) : (
                <>
                  <User size={14} />
                  <span>User: <strong>{currentUser?.name || 'Devotee'}</strong></span>
                </>
              )}
            </button>
          ) : (
            <button 
              type="button" 
              className="hub-role-badge-btn user-badge"
              onClick={openAuth}
            >
              <User size={14} />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Heritage Masthead */}
      <header className="heritage-connect-masthead">
        <div className="masthead-badge">
          <Sparkles size={14} />
          <span>HERITAGE</span>
          <Sparkles size={14} />
        </div>

        <h1 className="masthead-title">Bharat Heritage & Seva</h1>

        <p className="masthead-tagline">“Participate. Create. Preserve.”</p>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="masthead-core-message">
          “Don’t just experience India’s heritage. Be part of preserving it.”
        </p>
      </header>

      {/* 4 Main Module Navigation Tabs */}
      <nav className="heritage-connect-tabs" aria-label="Heritage Module Navigation">
        <button 
          id="tab-heritage-dashboard"
          type="button"
          className={`hub-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('dashboard');
            window.scrollTo({ top: 280, behavior: 'smooth' });
          }}
        >
          <div className="hub-tab-icon">
            <LayoutDashboard size={20} />
          </div>
          <div className="hub-tab-labels">
            <span className="tab-pill-label">{isTempleAdmin ? 'Temple Console' : 'User Portal'}</span>
            <span className="tab-main-title">{isTempleAdmin ? 'Admin Dashboard' : 'User Dashboard'}</span>
          </div>
        </button>

        <button 
          id="tab-seva-exchange"
          type="button"
          className={`hub-tab-btn ${activeTab === 'seva' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('seva');
            window.scrollTo({ top: 280, behavior: 'smooth' });
          }}
        >
          <div className="hub-tab-icon">
            <HeartHandshake size={20} />
          </div>
          <div className="hub-tab-labels">
            <span className="tab-pill-label">Opportunities</span>
            <span className="tab-main-title">Seva Exchange</span>
          </div>
        </button>

        <button 
          id="tab-templework"
          type="button"
          className={`hub-tab-btn ${activeTab === 'templework' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('templework');
            window.scrollTo({ top: 280, behavior: 'smooth' });
          }}
        >
          <div className="hub-tab-icon">
            <Hammer size={20} />
          </div>
          <div className="hub-tab-labels">
            <span className="tab-pill-label">Heritage Projects</span>
            <span className="tab-main-title">TempleWork</span>
          </div>
        </button>

        <button 
          id="tab-cultural-stories"
          type="button"
          className={`hub-tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('stories');
            window.scrollTo({ top: 280, behavior: 'smooth' });
          }}
        >
          <div className="hub-tab-icon">
            <Mic size={20} />
          </div>
          <div className="hub-tab-labels">
            <span className="tab-pill-label">Living Archive</span>
            <span className="tab-main-title">Cultural Stories</span>
          </div>
        </button>
      </nav>

      {/* Main Tab Content Area */}
      <main className="heritage-module-content">
        {/* DASHBOARD: STRICT ROLE-BASED ACCESS */}
        {activeTab === 'dashboard' && (
          isTempleAdmin ? (
            <TempleAdminDashboard 
              onNavigateTab={(t) => setActiveTab(t)}
              onOpenRoleSwitcher={openAuth}
              onCreateSevaClick={() => setIsCreateSevaOpen(true)}
              onCommissionProjectClick={() => setIsCreateProjectOpen(true)}
            />
          ) : (
            <UserHeritageDashboard 
              onNavigateTab={(t) => setActiveTab(t)}
              onOpenRoleSwitcher={openAuth}
              onOpenAuth={openAuth}
            />
          )
        )}

        {/* MODULE 1: TEMPLE SEVA EXCHANGE (OPPORTUNITIES) */}
        {activeTab === 'seva' && (
          <SevaExchangeView 
            onToast={onToast}
            onOpenRoleSwitcher={openAuth}
          />
        )}

        {/* MODULE 2: TEMPLEWORK (PHOTO-FREE ARTISANS) */}
        {activeTab === 'templework' && (
          <TempleWorkView 
            onToast={onToast}
            onOpenRoleSwitcher={openAuth}
          />
        )}

        {/* MODULE 3: CULTURAL STORIES */}
        {activeTab === 'stories' && (
          <CulturalStoriesModule 
            onToast={onToast}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Modals triggerable from dashboard */}
      <CreateSevaModal 
        isOpen={isCreateSevaOpen}
        onClose={() => setIsCreateSevaOpen(false)}
        onSevaCreated={() => {
          setRevision(prev => prev + 1);
          if (onToast) onToast('New Seva requirement created and published!');
        }}
      />

      <CreateProjectModal 
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onProjectCreated={() => {
          setRevision(prev => prev + 1);
          if (onToast) onToast('New TempleWork project published!');
        }}
      />
    </div>
  );
}
