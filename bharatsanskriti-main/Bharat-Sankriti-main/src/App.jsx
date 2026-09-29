import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StateSelector from './components/StateSelector';
import StateDashboard from './components/StateDashboard';
import FeatureItemsView from './components/FeatureItemsView';
import CulturalItemDetail from './components/CulturalItemDetail';
import StoriesAndMemoriesView from './components/StoriesAndMemoriesView';
import PreserveStoryModal from './components/PreserveStoryModal';
import AskBharat from './components/AskBharat';
import HeritageConnectHub from './components/HeritageConnectHub';
import AuthModal from './components/AuthModal';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation View State:
  // 'landing' | 'choose-state' | 'state-dashboard' | 'feature-items' | 'item-detail' | 'stories-memories' | 'ask-bharat' | 'heritage-connect'
  const [currentView, setCurrentView] = useState('landing');
  const [previousView, setPreviousView] = useState('landing');
  
  // Selection States
  const [selectedState, setSelectedState] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [storiesSearchQuery, setStoriesSearchQuery] = useState('');

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [appAuthRevision, setAppAuthRevision] = useState(0);

  // Preserve Story Modal State (Reusable for all 45 items!)
  const [preserveModalOpen, setPreserveModalOpen] = useState(false);
  const [preserveContext, setPreserveContext] = useState({
    state: '',
    feature: '',
    culturalItem: '',
  });

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Show a temporary success toast
  const triggerToast = (msg, actionCallback = null, actionLabel = null) => {
    setToastMessage({ text: msg, callback: actionCallback, label: actionLabel });
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // State selection handler
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setCurrentView('state-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Feature selection handler (Festivals, Arts, Dance, Cuisine, Heritage)
  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
    setCurrentView('feature-items');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cultural Item selection handler (Bathukamma, Biryani, etc.)
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setCurrentView('item-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Preserve Modal with locked context
  const handleOpenPreserve = (itemToPreserve = null) => {
    const item = itemToPreserve || selectedItem;
    const stName = selectedState?.name || 'Telangana';
    const ftTitle = selectedFeature?.shortTitle || selectedFeature?.title || item?.category || 'Festivals';
    const itName = item?.name || 'Bathukamma';

    setPreserveContext({
      state: stName,
      feature: ftTitle,
      culturalItem: itName,
    });
    setPreserveModalOpen(true);
  };

  // Story saved callback
  const handleStorySaved = (savedStory) => {
    triggerToast(
      `“${savedStory.storyTitle}” has been successfully preserved in the national archive!`,
      () => {
        setStoriesSearchQuery(savedStory.culturalItem);
        setCurrentView('stories-memories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      'View in Stories & Memories'
    );
  };

  // View stories for a specific cultural item
  const handleViewStoriesForItem = (itemName) => {
    setStoriesSearchQuery(itemName);
    setCurrentView('stories-memories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back Navigation Handlers
  const handleBackToStates = () => {
    setCurrentView('choose-state');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedState(null);
    setSelectedFeature(null);
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStateDashboard = () => {
    setCurrentView('state-dashboard');
    setSelectedFeature(null);
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeatureItems = () => {
    setCurrentView('feature-items');
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromAskBharat = () => {
    setCurrentView(previousView || 'landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" key={appAuthRevision}>
      {/* Traditional Indian subtle motif texture */}
      <div className="cultural-pattern-overlay" />

      <div className="content-wrapper">
        {/* Navigation Bar */}
        <Navbar 
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'stories-memories') {
              setStoriesSearchQuery('');
            }
            if (view === 'ask-bharat' && currentView !== 'ask-bharat') {
              setPreviousView(currentView);
            }
            setCurrentView(view);
            if (view === 'landing') {
              setSelectedState(null);
              setSelectedFeature(null);
              setSelectedItem(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={() => setAuthModalOpen(true)}
          onLogoutSuccess={() => {
            setAppAuthRevision(r => r + 1);
            triggerToast('Signed out successfully.');
          }}
        />

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="toast-notification" role="status">
            <div className="toast-icon-wrap">
              <CheckCircle size={20} className="toast-check-icon" />
            </div>
            <div className="toast-content">
              <p className="toast-text">{toastMessage.text}</p>
              {toastMessage.callback && (
                <button
                  type="button"
                  className="toast-action-btn"
                  onClick={() => {
                    toastMessage.callback();
                    setToastMessage(null);
                  }}
                >
                  <span>{toastMessage.label}</span>
                  <Sparkles size={13} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main 
          className="main-content-animated" 
          key={currentView + (selectedState?.id || '') + (selectedFeature?.id || '') + (selectedItem?.id || '')}
        >
          {/* VIEW 1: LANDING PAGE */}
          {currentView === 'landing' && (
            <HeroSection 
              onExploreClick={() => {
                setCurrentView('choose-state');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onHeritageClick={() => {
                setCurrentView('heritage-connect');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* VIEW 2: CHOOSE STATE */}
          {currentView === 'choose-state' && (
            <StateSelector 
              onBackClick={handleBackToLanding}
              onSelectState={handleStateSelect}
            />
          )}

          {/* VIEW 3: STATE DASHBOARD (5 FEATURES) */}
          {currentView === 'state-dashboard' && (
            <StateDashboard 
              state={selectedState}
              onBackClick={handleBackToStates}
              onSelectFeature={handleFeatureSelect}
            />
          )}

          {/* VIEW 4: FEATURE ITEMS VIEW (3 CULTURAL ITEMS FOR THIS FEATURE) */}
          {currentView === 'feature-items' && selectedState && selectedFeature && (
            <FeatureItemsView
              state={selectedState}
              feature={selectedFeature}
              onBackClick={handleBackToStateDashboard}
              onSelectItem={handleItemSelect}
              onPreserveItem={(item) => handleOpenPreserve(item)}
              onToast={triggerToast}
            />
          )}

          {/* VIEW 5: CULTURAL ITEM DETAIL PAGE (DISCOVER -> LEARN -> PRESERVE) */}
          {currentView === 'item-detail' && selectedState && selectedFeature && selectedItem && (
            <CulturalItemDetail
              state={selectedState}
              feature={selectedFeature}
              item={selectedItem}
              onBackClick={handleBackToFeatureItems}
              onOpenPreserve={() => handleOpenPreserve(selectedItem)}
              onViewStories={handleViewStoriesForItem}
            />
          )}

          {/* VIEW 6: STORIES & MEMORIES (LIVING ARCHIVE) */}
          {currentView === 'stories-memories' && (
            <StoriesAndMemoriesView
              initialSearch={storiesSearchQuery}
              onBackToHome={() => {
                if (selectedItem) setCurrentView('item-detail');
                else if (selectedFeature) setCurrentView('feature-items');
                else if (selectedState) setCurrentView('state-dashboard');
                else setCurrentView('choose-state');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* VIEW 7: ASK BHARAT (COMMON AI CULTURAL GUIDE) */}
          {currentView === 'ask-bharat' && (
            <AskBharat onBackClick={handleBackFromAskBharat} />
          )}

          {/* VIEW 8: HERITAGE (OPPORTUNITIES, ARTISANS, CULTURAL STORIES, DASHBOARD) */}
          {currentView === 'heritage-connect' && (
            <HeritageConnectHub 
              onBackToHome={handleBackToLanding}
              onToast={triggerToast}
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          )}
        </main>

        {/* Clean Cultural Footer */}
        <footer className="footer">
          <p>
            <span className="footer-highlight">Bharat Sanskriti</span> — Preserving India's Living Heritage & Traditions
          </p>
        </footer>
      </div>

      {/* Global Auth Modal for Dual Role Login / Signup */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(account) => {
          setAppAuthRevision(r => r + 1);
          triggerToast(`Welcome, ${account.name}! Signed in as ${account.role === 'temple_admin' ? 'Temple Administrator' : 'User'}.`);
        }}
      />

      {/* Reusable Preservation System for all 45 items */}
      <PreserveStoryModal
        isOpen={preserveModalOpen}
        onClose={() => setPreserveModalOpen(false)}
        state={preserveContext.state}
        feature={preserveContext.feature}
        culturalItem={preserveContext.culturalItem}
        onStorySaved={handleStorySaved}
      />
    </div>
  );
}
