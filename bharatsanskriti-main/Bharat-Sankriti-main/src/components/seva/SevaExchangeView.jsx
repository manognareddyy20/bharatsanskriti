import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, MapPin, Plus, HeartHandshake, 
  Landmark, UserCheck, X, ChevronRight, SlidersHorizontal, 
  CheckCircle, ArrowRight, Shield, Award 
} from 'lucide-react';
import { getAllSevas, createSeva, applyForSeva, getUserApplications } from '../../services/sevaService';
import { getCurrentUser } from '../../services/authService';
import { matchSevasForUser } from '../../services/aiService';
import SevaCard from './SevaCard';
import SevaDetailModal from './SevaDetailModal';
import CreateSevaModal from './CreateSevaModal';
import TempleAdminSevaManager from './TempleAdminSevaManager';

export default function SevaExchangeView({ onToast, onOpenRoleSwitcher }) {
  const [dataRevision, setDataRevision] = useState(0);
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [adminViewMode, setAdminViewMode] = useState(false); // If true, opens TempleAdminSevaManager

  // Modals
  const [detailModalSeva, setDetailModalSeva] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Load sevas
  const sevas = useMemo(() => {
    return getAllSevas();
  }, [dataRevision]);

  // Load user applications to display badge on cards
  const userApplications = useMemo(() => {
    if (!currentUser?.id) return [];
    return getUserApplications(currentUser.id);
  }, [currentUser?.id, dataRevision]);

  // AI Matching calculations
  const matchResultsMap = useMemo(() => {
    const matchedList = matchSevasForUser(sevas, currentUser);
    const map = {};
    matchedList.forEach(item => {
      map[item.seva.id] = item;
    });
    return map;
  }, [sevas, currentUser]);

  // Filter Categories
  const categories = [
    'ALL',
    'Festival Volunteer',
    'Photography',
    'Videography',
    'Translation',
    'Graphic Design',
    'Documentation',
    'Music',
    'Event Support',
    'Cultural Research',
    'Cleaning / Service',
    'Technical Support'
  ];

  // Filter Locations
  const locations = [
    'ALL',
    'Telangana',
    'Tamil Nadu',
    'Karnataka',
    'Andhra Pradesh',
    'Odisha',
    'Rajasthan',
    'Kerala'
  ];

  // Filter logic
  const filteredSevas = useMemo(() => {
    return sevas.filter(seva => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (seva.title || '').toLowerCase().includes(q);
        const templeMatch = (seva.templeName || '').toLowerCase().includes(q);
        const descMatch = (seva.description || '').toLowerCase().includes(q);
        const skillMatch = (seva.skillsRequired || []).some(s => s.toLowerCase().includes(q));
        if (!titleMatch && !templeMatch && !descMatch && !skillMatch) return false;
      }

      // 2. Category
      if (selectedCategory !== 'ALL') {
        const cat = (seva.category || '').toLowerCase();
        if (!cat.includes(selectedCategory.toLowerCase())) return false;
      }

      // 3. Location
      if (selectedLocation !== 'ALL') {
        const loc = (seva.location || seva.templeLocation || '').toLowerCase();
        if (!loc.includes(selectedLocation.toLowerCase())) return false;
      }

      // 4. Only Recommended
      if (onlyRecommended) {
        const match = matchResultsMap[seva.id];
        if (!match || !match.isRecommended) return false;
      }

      return true;
    });
  }, [sevas, searchQuery, selectedCategory, selectedLocation, onlyRecommended, matchResultsMap]);

  // Handlers
  const handleApplyClick = (seva) => {
    setDetailModalSeva(seva);
  };

  const handleApplySubmit = (sevaId, message) => {
    try {
      const app = applyForSeva({ sevaId, user: currentUser, message });
      setDataRevision(prev => prev + 1);
      if (onToast) {
        onToast(`Your application for "${app.sevaTitle}" has been submitted as PENDING!`);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSevaCreated = (newSevaData) => {
    try {
      const created = createSeva(newSevaData, currentUser);
      setDataRevision(prev => prev + 1);
      if (onToast) {
        onToast(`Seva "${created.title}" successfully created and published!`);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="seva-exchange-module">
      {/* Role Banner / Context Switcher */}
      <div className="role-context-banner">
        <div className="role-context-info">
          {isTempleAdmin ? (
            <>
              <div className="role-badge-icon admin-glow">
                <Landmark size={18} />
              </div>
              <div className="role-context-text">
                <span className="role-label-chip admin-chip">Temple Administrator Mode</span>
                <span className="role-temple-title">
                  Managing Seva for <strong>{currentUser?.templeProfile?.templeName || 'Temple Trust'}</strong>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="role-badge-icon user-glow">
                <UserCheck size={18} />
              </div>
              <div className="role-context-text">
                <span className="role-label-chip user-chip">Devotee Sevak Mode</span>
                <span className="role-user-skills">
                  Skills: <strong>{(currentUser?.skills || []).join(', ') || 'General Service'}</strong> • Location: <strong>{currentUser?.location || 'India'}</strong>
                </span>
              </div>
            </>
          )}
        </div>

        <div className="role-context-actions">
          {isTempleAdmin ? (
            <button 
              type="button" 
              className={`btn-mode-toggle ${adminViewMode ? 'active' : ''}`}
              onClick={() => setAdminViewMode(!adminViewMode)}
            >
              <Landmark size={15} />
              <span>{adminViewMode ? 'Browse Public Sevas' : 'Open Temple Admin Console'}</span>
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-switch-role-inline"
              onClick={onOpenRoleSwitcher}
            >
              <span>Switch to Temple Admin</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* If Temple Admin in Manager Mode, show TempleAdminSevaManager */}
      {isTempleAdmin && adminViewMode ? (
        <TempleAdminSevaManager 
          templeAdminProfile={currentUser}
          sevas={sevas}
          onRefreshData={() => setDataRevision(prev => prev + 1)}
          onBackClick={() => setAdminViewMode(false)}
          onCreateSevaClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <>
          {/* Main Module Header */}
          <header className="module-view-header">
            <div className="module-header-badge">
              <Sparkles size={14} />
              <span>People → Temple</span>
              <Sparkles size={14} />
            </div>

            <h1 className="module-view-title">Temple Seva Exchange</h1>

            <div className="ornament-divider">
              <div className="ornament-line" />
              <span className="ornament-symbol">✦ ॐ ✦</span>
              <div className="ornament-line" />
            </div>

            <p className="module-view-quote">
              “Don’t just donate money. Connect with ancient sanctums through skills, devotion, and voluntary service.”
            </p>
          </header>

          {/* Search & Filter Toolbar */}
          <div className="archive-filter-bar seva-filter-bar">
            {/* Search Box */}
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                className="search-input"
                placeholder="Search Seva by title, temple, skills (e.g. Photography), or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown Filters Row */}
            <div className="filter-dropdowns-row">
              {/* Category Filter */}
              <div className="filter-select-group">
                <label className="filter-label">Category:</label>
                <select 
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="filter-select-group">
                <label className="filter-label">Location:</label>
                <select 
                  className="filter-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(l => (
                    <option key={l} value={l}>{l === 'ALL' ? 'All Regions' : l}</option>
                  ))}
                </select>
              </div>

              {/* AI-Assisted Match Toggle */}
              <button 
                type="button" 
                className={`btn-ai-filter-toggle ${onlyRecommended ? 'active' : ''}`}
                onClick={() => setOnlyRecommended(!onlyRecommended)}
                title="Show Sevas matching your profile skills and location"
              >
                <Sparkles size={14} className="sparkle-toggle-icon" />
                <span>AI-Assisted Matching</span>
                {onlyRecommended && <span className="active-dot" />}
              </button>

              {/* Temple Admin Post Button */}
              {isTempleAdmin && (
                <button 
                  type="button" 
                  className="btn-create-seva-toolbar"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus size={16} />
                  <span>Post Seva Requirement</span>
                </button>
              )}
            </div>
          </div>

          {/* Seva Cards Grid */}
          <div className="seva-cards-container">
            {filteredSevas.length === 0 ? (
              <div className="empty-archive-card">
                <HeartHandshake size={48} className="empty-icon" />
                <h3>No Matching Seva Opportunities Found</h3>
                <p>
                  Try clearing your search query or selecting “All Categories” to explore more temple requirements.
                </p>
                {(searchQuery || selectedCategory !== 'ALL' || selectedLocation !== 'ALL' || onlyRecommended) && (
                  <button 
                    type="button" 
                    className="btn-primary-sm mt-3"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                      setSelectedLocation('ALL');
                      setOnlyRecommended(false);
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="seva-grid">
                {filteredSevas.map(seva => {
                  const match = matchResultsMap[seva.id];
                  const existingApp = userApplications.find(a => a.sevaId === seva.id);

                  return (
                    <SevaCard 
                      key={seva.id}
                      seva={seva}
                      matchData={match}
                      applicationStatus={existingApp ? existingApp.status : null}
                      onOpenDetails={(s) => setDetailModalSeva(s)}
                      onApply={(s) => handleApplyClick(s)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Seva Detail Modal with "I CAN HELP" Form */}
      {detailModalSeva && (
        <SevaDetailModal 
          isOpen={Boolean(detailModalSeva)}
          onClose={() => setDetailModalSeva(null)}
          seva={detailModalSeva}
          matchData={matchResultsMap[detailModalSeva.id]}
          applicationStatus={
            userApplications.find(a => a.sevaId === detailModalSeva.id)?.status || null
          }
          onApplySubmit={handleApplySubmit}
        />
      )}

      {/* Create Seva Modal for Temple Admin */}
      <CreateSevaModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSevaCreated={handleSevaCreated}
      />
    </div>
  );
}
