import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, MapPin, Plus, Send, 
  Landmark, Bookmark, ArrowRight, Shield, Award, 
  Hammer, ChevronRight, X, Clock, Calendar, CheckCircle2, ShieldCheck, IndianRupee, Eye, UserCheck 
} from 'lucide-react';
import { 
  getAllProjects, 
  createProject, 
  getAllEnquiries,
  getAllApplications,
  getApplicationsForProject
} from '../../services/templeWorkService';
import { getCurrentUser } from '../../services/authService';
import CreateProjectModal from './CreateProjectModal';
import EnquiryTrackerModal from './EnquiryTrackerModal';
import ApplyProjectModal from './ApplyProjectModal';
import ProjectDetailModal from './ProjectDetailModal';

export default function TempleWorkView({ onToast, onOpenRoleSwitcher }) {
  const [dataRevision, setDataRevision] = useState(0);
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  // Modals
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isEnquiryTrackerOpen, setIsEnquiryTrackerOpen] = useState(false);
  const [selectedProjectForApply, setSelectedProjectForApply] = useState(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);

  // Data
  const projects = useMemo(() => {
    return getAllProjects();
  }, [dataRevision]);

  const allApps = useMemo(() => {
    return getAllApplications();
  }, [dataRevision]);

  const enquiriesCount = useMemo(() => {
    const enq = getAllEnquiries().length;
    return enq + allApps.length;
  }, [allApps, dataRevision]);

  // User specific apps count
  const userAppsCount = useMemo(() => {
    if (!currentUser) return allApps.length;
    return allApps.filter(a => a.artisanId === currentUser.id || a.artisanName === currentUser.name).length;
  }, [allApps, currentUser]);

  // Craft filter options
  const craftFilters = [
    'ALL',
    'Traditional stone carving',
    'Mural painting',
    'Bronze casting',
    'Wood carving',
    'Traditional architecture',
    'Metalwork',
    'Heritage restoration'
  ];

  // Region filter options
  const regionFilters = [
    'ALL',
    'Tamil Nadu',
    'Odisha',
    'Telangana',
    'Karnataka',
    'Kerala',
    'Rajasthan',
    'Andhra Pradesh'
  ];

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = project.title.toLowerCase().includes(q);
        const templeMatch = project.templeName.toLowerCase().includes(q);
        const craftMatch = project.requiredCraft.toLowerCase().includes(q);
        const descMatch = project.description.toLowerCase().includes(q);
        if (!titleMatch && !templeMatch && !craftMatch && !descMatch) return false;
      }

      if (selectedCraft !== 'ALL') {
        const c = project.requiredCraft.toLowerCase();
        if (!c.includes(selectedCraft.toLowerCase())) return false;
      }

      if (selectedRegion !== 'ALL') {
        const l = (project.location || '').toLowerCase();
        if (!l.includes(selectedRegion.toLowerCase())) return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedCraft, selectedRegion]);

  const handleProjectCreated = (newProjectData) => {
    try {
      const created = createProject(newProjectData, currentUser);
      setDataRevision(prev => prev + 1);
      if (onToast) {
        onToast(`Heritage project "${created.title}" published with offered budget ₹${Number(created.offeredBudget || 0).toLocaleString('en-IN')}!`);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleApplicationSubmitted = (app) => {
    setDataRevision(prev => prev + 1);
    if (onToast) {
      onToast(`Application submitted for "${app.projectTitle}" (Status: APPLICATION RECEIVED)!`);
    }
  };

  return (
    <div className="templework-module">
      {/* Module Header */}
      <header className="module-view-header">
        <div className="module-header-badge">
          <Hammer size={14} />
          <span>Temple → Heritage Restoration Projects</span>
          <Hammer size={14} />
        </div>

        <h1 className="module-view-title">TempleWork</h1>

        <div className="ornament-divider">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ ॐ ✦</span>
          <div className="ornament-line" />
        </div>

        <p className="module-view-quote">
          “Connecting temples directly with sacred heritage restoration projects and traditional craftsmanship.”
        </p>
      </header>

      {/* Primary Sub-Navigation Bar */}
      <div className="templework-subnav-bar">
        <div className="subnav-left">
          <div className="subnav-pill active">
            <span>Temple Heritage Projects ({projects.length})</span>
          </div>
        </div>

        <div className="subnav-right">
          {/* Tracker Button - Customized by Role */}
          <button 
            type="button" 
            className="btn-enquiry-tracker-link"
            onClick={() => setIsEnquiryTrackerOpen(true)}
          >
            {isTempleAdmin ? <UserCheck size={14} /> : <Send size={14} />}
            <span>{isTempleAdmin ? `View Applicants & Tracker (${enquiriesCount})` : `My Applications & Offers (${userAppsCount})`}</span>
          </button>

          {/* TEMPLE ADMIN ONLY BUTTON */}
          {isTempleAdmin && (
            <button 
              type="button" 
              className="btn-commission-project"
              onClick={() => setIsCreateProjectModalOpen(true)}
            >
              <Plus size={15} />
              <span>Post TempleWork</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="archive-filter-bar templework-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search temple projects by title, craft, location..."
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

        <div className="filter-dropdowns-row">
          <div className="filter-select-group">
            <label className="filter-label">Craft:</label>
            <select 
              className="filter-select"
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
            >
              {craftFilters.map(c => (
                <option key={c} value={c}>{c === 'ALL' ? 'All Traditional Crafts' : c}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label className="filter-label">Region:</label>
            <select 
              className="filter-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regionFilters.map(r => (
                <option key={r} value={r}>{r === 'ALL' ? 'All States' : r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TEMPLE HERITAGE PROJECTS */}
      <div className="templework-projects-container">
        {filteredProjects.length === 0 ? (
          <div className="empty-archive-card">
            <Landmark size={48} className="empty-icon" />
            <h3>No Temple Projects Found</h3>
            <p>No heritage commission projects match your current search filters.</p>
          </div>
        ) : (
          <div className="projects-card-grid">
            {filteredProjects.map(project => {
              const status = project.status || 'OPEN';
              const projectApps = getApplicationsForProject(project.id);
              const myApp = currentUser 
                ? projectApps.find(a => a.artisanId === currentUser.id || a.artisanName === currentUser.name)
                : null;

              return (
                <div key={project.id} className="project-commission-card">
                  <div className="project-card-header">
                    <span className="project-craft-pill">{project.requiredCraft}</span>
                    
                    <div className="project-status-badges">
                      {isTempleAdmin ? (
                        <span className="project-status-pill app-rec-pill">
                          <UserCheck size={12} /> Applicants: {projectApps.length}
                        </span>
                      ) : (
                        <>
                          {status === 'OPEN' && <span className="project-status-pill open-pill">OPEN FOR ARTISANS</span>}
                          {status === 'APPLICATION_RECEIVED' && <span className="project-status-pill app-rec-pill">APPLICATIONS RECEIVED</span>}
                          {status === 'OFFER_MADE' && <span className="project-status-pill offer-pill">OFFER SENT</span>}
                          {status === 'OFFER_ACCEPTED' && <span className="project-status-pill accept-pill">OFFER ACCEPTED</span>}
                          {status === 'PROJECT_CONFIRMED' && <span className="project-status-pill confirmed-pill">PROJECT CONFIRMED</span>}
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>

                  <div className="project-temple-meta">
                    <Landmark size={13} />
                    <span>{project.templeName}</span>
                    <span className="dot-sep">•</span>
                    <MapPin size={13} />
                    <span>{project.location}</span>
                  </div>

                  {/* BUDGET SUGGESTION DISPLAY BADGE ON CARD */}
                  <div className="project-card-budget-banner">
                    <div className="budget-banner-left">
                      <span className="budget-lbl">Offered Budget:</span>
                      <span className="budget-val">₹{Number(project.offeredBudget || 50000).toLocaleString('en-IN')}</span>
                    </div>
                    {project.budgetRange && (
                      <div className="budget-banner-right">
                        <span className="range-lbl">Suggested Range:</span>
                        <span className="range-val">{project.budgetRange}</span>
                      </div>
                    )}
                  </div>

                  <div className="project-specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Materials</span>
                      <span className="spec-value">{project.materials}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Timeline</span>
                      <span className="spec-value">{project.timeline}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Experience</span>
                      <span className="spec-value">{project.experienceRequired}</span>
                    </div>
                  </div>

                  <p className="project-desc-snippet">{project.description}</p>

                  {/* ROLE-SPECIFIC CARD FOOTER ACTIONS */}
                  <div className="project-card-footer">
                    <button 
                      type="button" 
                      className="btn-view-matched-artisans"
                      onClick={() => setSelectedProjectForDetail(project)}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>

                    {/* TEMPLE ADMIN CONTROLS: NEVER SHOW APPLY BUTTON */}
                    {isTempleAdmin ? (
                      <button 
                        type="button" 
                        className="btn-admin-view-applicants"
                        onClick={() => setIsEnquiryTrackerOpen(true)}
                      >
                        <UserCheck size={14} />
                        <span>View Applicants ({projectApps.length})</span>
                      </button>
                    ) : (
                      /* USER / ARTISAN CONTROLS: SHOW APPLY OR MY APPLICATION STATUS */
                      <>
                        {myApp ? (
                          <button 
                            type="button" 
                            className="btn-already-applied"
                            onClick={() => setIsEnquiryTrackerOpen(true)}
                          >
                            <CheckCircle2 size={14} />
                            <span>{myApp.status === 'OFFER_MADE' ? 'View Offer' : 'View Application'}</span>
                          </button>
                        ) : (
                          <button 
                            type="button" 
                            className="btn-apply-project-card"
                            onClick={() => setSelectedProjectForApply(project)}
                          >
                            <Send size={14} />
                            <span>Apply</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Project Modal for Temple Admin */}
      <CreateProjectModal 
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      {/* Project Detail Modal */}
      {selectedProjectForDetail && (
        <ProjectDetailModal 
          isOpen={Boolean(selectedProjectForDetail)}
          onClose={() => setSelectedProjectForDetail(null)}
          project={selectedProjectForDetail}
          onOpenApplyModal={(proj) => setSelectedProjectForApply(proj)}
          onOpenTrackerModal={() => setIsEnquiryTrackerOpen(true)}
        />
      )}

      {/* Apply Project Modal for Artisans */}
      {selectedProjectForApply && (
        <ApplyProjectModal 
          isOpen={Boolean(selectedProjectForApply)}
          onClose={() => setSelectedProjectForApply(null)}
          project={selectedProjectForApply}
          onApplicationSubmitted={handleApplicationSubmitted}
        />
      )}

      {/* Enquiry & Project Lifecycle Tracker Modal */}
      <EnquiryTrackerModal 
        isOpen={isEnquiryTrackerOpen}
        onClose={() => setIsEnquiryTrackerOpen(false)}
        onRefreshData={() => setDataRevision(prev => prev + 1)}
      />
    </div>
  );
}



