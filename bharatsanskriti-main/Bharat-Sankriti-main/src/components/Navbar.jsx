import React, { useState } from 'react';
import { Menu, X, Compass, Home, BookOpen, HeartHandshake, User, Landmark, LogOut } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../services/authService';

export default function Navbar({ currentView, onNavigate, onOpenAuth, onLogoutSuccess }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = getCurrentUser();

  const handleNavClick = (viewName) => {
    if (onNavigate && viewName) {
      onNavigate(viewName);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    if (onLogoutSuccess) onLogoutSuccess();
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      {/* Left side: Bharat Sanskriti with Indian heritage logo */}
      <div 
        className="brand-logo" 
        onClick={() => handleNavClick('landing')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavClick('landing'); }}
        aria-label="Bharat Sanskriti Home"
      >
        {/* Heritage Logo: Minimal, Modern & Premium Indian Cultural Motif */}
        <svg 
          className="navbar-brand-logo-icon" 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heritageGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dfc89a" />
              <stop offset="50%" stopColor="#b88e44" />
              <stop offset="100%" stopColor="#8c6239" />
            </linearGradient>
            <radialGradient id="maroonBgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7b2033" />
              <stop offset="100%" stopColor="#4d101d" />
            </radialGradient>
          </defs>
          {/* Subtle Heritage Shield Base */}
          <rect width="32" height="32" rx="8" fill="url(#maroonBgGrad)" stroke="#b88e44" strokeWidth="1.2" />
          {/* Sacred Diya Flame / Pinnacle */}
          <path d="M16 6.5C16.8 8.8 18.2 10.8 18.2 12.5C18.2 14.2 17.2 15.5 16 15.5C14.8 15.5 13.8 14.2 13.8 12.5C13.8 10.8 15.2 8.8 16 6.5Z" fill="url(#heritageGoldGrad)" />
          {/* Central Lotus Petal */}
          <path d="M16 13C17.5 16 18.8 19 18.8 21C18.8 22.8 17.5 24 16 24C14.5 24 13.2 22.8 13.2 21C13.2 19 14.5 16 16 13Z" fill="url(#heritageGoldGrad)" opacity="0.9" />
          {/* Left Petal */}
          <path d="M16 21.5C13 21 9.5 18.5 9 15.5C11.5 15.5 14.5 17.8 16 21.5Z" fill="url(#heritageGoldGrad)" />
          {/* Right Petal */}
          <path d="M16 21.5C19 21 22.5 18.5 23 15.5C20.5 15.5 17.5 17.8 16 21.5Z" fill="url(#heritageGoldGrad)" />
          {/* Diya Base Arch */}
          <path d="M10.5 22.5C12.2 24.5 14 25.2 16 25.2C18 25.2 19.8 24.5 21.5 22.5" stroke="url(#heritageGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
          {/* Center Sacred Accent Dot */}
          <circle cx="16" cy="19.5" r="1.1" fill="#faf8f4" />
        </svg>

        <span className="brand-title">Bharat Sanskriti</span>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Right side navigation links */}
      <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <button 
          id="nav-home"
          className={`nav-item ${currentView === 'landing' ? 'active' : ''}`}
          onClick={() => handleNavClick('landing')}
          type="button"
        >
          <Home size={16} className="nav-icon" />
          <span>Home</span>
        </button>

        <button 
          id="nav-explore"
          className={`nav-item ${currentView === 'choose-state' || currentView === 'state-dashboard' || currentView === 'feature-items' || currentView === 'item-detail' ? 'active' : ''}`}
          onClick={() => handleNavClick('choose-state')}
          type="button"
        >
          <Compass size={16} className="nav-icon" />
          <span>Explore</span>
        </button>

        {/* Heritage Nav Item - "New" tag removed as requested */}
        <button 
          id="nav-heritage-connect"
          className={`nav-item nav-item-heritage ${currentView === 'heritage-connect' ? 'active' : ''}`}
          type="button"
          onClick={() => handleNavClick('heritage-connect')}
        >
          <HeartHandshake size={16} className="nav-icon heritage-nav-icon" />
          <span>Heritage & Moderation</span>
          <span className="nav-badge-pill">Verification</span>
        </button>

        <button 
          id="nav-stories-memories"
          className={`nav-item ${currentView === 'stories-memories' ? 'active' : ''}`}
          type="button"
          onClick={() => handleNavClick('stories-memories')}
        >
          <BookOpen size={16} className="nav-icon" />
          <span>Stories & Memories</span>
        </button>

        {/* Dynamic Auth / Account Pill */}
        {currentUser ? (
          <div className="nav-account-pill-wrap">
            <button
              type="button"
              className={`nav-account-btn ${currentUser.role === 'temple_admin' ? 'admin' : 'user'}`}
              onClick={() => handleNavClick('heritage-connect')}
              title={`Logged in as ${currentUser.role === 'temple_admin' ? 'Temple Administrator' : 'User'}: ${currentUser.name}`}
            >
              {currentUser.role === 'temple_admin' ? (
                <>
                  <Landmark size={14} className="account-role-icon" />
                  <span className="account-name-text">
                    Admin: {currentUser.templeProfile?.templeName ? currentUser.templeProfile.templeName.slice(0, 16) + '...' : currentUser.name}
                  </span>
                </>
              ) : (
                <>
                  <User size={14} className="account-role-icon" />
                  <span className="account-name-text">{currentUser.name}</span>
                </>
              )}
            </button>
            <button
              type="button"
              className="nav-logout-btn"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="nav-signin-cta"
            onClick={() => {
              if (onOpenAuth) onOpenAuth();
              setMobileMenuOpen(false);
            }}
          >
            <User size={14} />
            <span>Sign In</span>
          </button>
        )}
      </nav>
    </header>
  );
}
