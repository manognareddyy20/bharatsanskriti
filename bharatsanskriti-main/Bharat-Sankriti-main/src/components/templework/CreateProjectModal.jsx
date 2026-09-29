import React, { useState, useMemo } from 'react';
import { X, Landmark, Plus, Sparkles, AlertCircle, Image, Calculator, Info, CheckCircle2 } from 'lucide-react';
import { getCurrentUser } from '../../services/authService';
import { calculateSuggestedBudget, BUDGET_NOTE } from '../../services/templeWorkService';

export default function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const currentUser = getCurrentUser();
  const templeProfile = currentUser?.templeProfile;

  const [title, setTitle] = useState('');
  const [craft, setCraft] = useState('Traditional stone carving');
  const [customCraft, setCustomCraft] = useState('');
  const [materials, setMaterials] = useState('');
  const [location, setLocation] = useState(templeProfile?.location || 'Telangana');
  const [timeline, setTimeline] = useState('3 Months');
  const [experienceRequired, setExperienceRequired] = useState('8+ Years master experience');
  const [description, setDescription] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState('');
  const [error, setError] = useState('');

  // 7 Budget Suggestion Parameters
  const [scale, setScale] = useState('Medium'); // 'Small' | 'Medium' | 'Large'
  const [complexity, setComplexity] = useState('Standard'); // 'Basic' | 'Standard' | 'Complex' | 'High Precision'
  const [numArtisans, setNumArtisans] = useState('2-3 Artisans'); // '1 Solo Master' | '2-3 Artisans' | '4-10 Team' | '10+ Guild'
  const [materialsProvided, setMaterialsProvided] = useState('Shared Procurement'); // 'Temple Provides All' | 'Shared Procurement' | 'Artisan Procures Special Materials'
  const [expertise, setExpertise] = useState('Senior Craftsman'); // 'Skilled Artisan' | 'Senior Craftsman' | 'Master Sthapathi'
  const [userEditedBudget, setUserEditedBudget] = useState(null); // Custom edited budget

  const craftOptions = [
    'Traditional stone carving',
    'Wood carving',
    'Bronze casting',
    'Mural painting',
    'Traditional painting',
    'Heritage restoration',
    'Traditional architecture',
    'Metalwork',
    'Heritage documentation',
    'Other / Custom Craft'
  ];

  // Dynamic calculation of budget suggestion
  const budgetEstimate = useMemo(() => {
    const finalCraft = craft === 'Other / Custom Craft' ? (customCraft || 'Traditional stone carving') : craft;
    return calculateSuggestedBudget({
      workCategory: finalCraft,
      scale,
      complexity,
      duration: timeline,
      numArtisans,
      materialsProvided,
      expertise
    });
  }, [craft, customCraft, scale, complexity, timeline, numArtisans, materialsProvided, expertise]);

  // Current offered budget is either user typed or suggested default
  const currentOfferedBudget = userEditedBudget !== null ? userEditedBudget : budgetEstimate.suggestedDefault;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a project title.');
      return;
    }

    if (!description.trim()) {
      setError('Please describe the project requirements.');
      return;
    }

    const finalCraft = craft === 'Other / Custom Craft' 
      ? (customCraft.trim() || 'Traditional Heritage Craft') 
      : craft;

    const payload = {
      title: title.trim(),
      requiredCraft: finalCraft,
      scale,
      complexity,
      numArtisans,
      materialsProvided,
      expertise,
      offeredBudget: Number(currentOfferedBudget) || budgetEstimate.suggestedDefault,
      budgetRange: budgetEstimate.formattedRange,
      materials: materials.trim() || 'Traditional temple grade materials',
      location: location.trim() || templeProfile?.location || 'India',
      timeline: timeline.trim() || '3 Months',
      experienceRequired: experienceRequired.trim(),
      description: description.trim(),
      referenceImages: referenceImageUrl.trim() 
        ? [referenceImageUrl.trim()] 
        : ['https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80'],
      templeId: templeProfile?.templeId || 'temple-ramappa',
      templeName: templeProfile?.templeName || 'Temple Administration'
    };

    if (onProjectCreated) {
      onProjectCreated(payload);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card create-project-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Project Creation Modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Landmark size={14} />
            <span>TempleWork Heritage Commissioning</span>
          </div>
          <h2 className="modal-title">Commission Heritage Craft Project</h2>
          <p className="modal-subtitle">
            Enter project parameters to receive an intelligent reference budget estimation before publishing your temple commission.
          </p>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="create-project-form">
          {/* Step 1: Work Details */}
          <div className="form-group">
            <label className="form-label">
              Project Title <span className="required-star">*</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Sanctum Fluted Granite Pillar Restoration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">1. Work Category</label>
              <select 
                className="form-input"
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
              >
                {craftOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {craft === 'Other / Custom Craft' && (
              <div className="form-group flex-1">
                <label className="form-label">Custom Craft Specification</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Terracotta Temple Frieze"
                  value={customCraft}
                  onChange={(e) => setCustomCraft(e.target.value)}
                />
              </div>
            )}

            <div className="form-group flex-1">
              <label className="form-label">2. Project Size / Scale</label>
              <div className="scale-toggle-group">
                {['Small', 'Medium', 'Large'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`scale-btn ${scale === s ? 'active' : ''}`}
                    onClick={() => setScale(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">3. Complexity Level</label>
              <select 
                className="form-input"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
              >
                <option value="Basic">Basic (Standard Repairs)</option>
                <option value="Standard">Standard (Traditional Sculpting)</option>
                <option value="Complex">Complex (Detailed Reliefs & Inlay)</option>
                <option value="High Precision">High Precision / Agama Iconography</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label">4. Expected Duration</label>
              <select 
                className="form-input"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months (Phased)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">5. Number of Artisans</label>
              <select 
                className="form-input"
                value={numArtisans}
                onChange={(e) => setNumArtisans(e.target.value)}
              >
                <option value="1 Solo Master">1 Solo Master</option>
                <option value="2-3 Artisans">2-3 Artisans</option>
                <option value="4-10 Team">4-10 Artisans Team</option>
                <option value="10+ Guild">10+ Guild / Workshop</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label">6. Materials Handling</label>
              <select 
                className="form-input"
                value={materialsProvided}
                onChange={(e) => setMaterialsProvided(e.target.value)}
              >
                <option value="Temple Provides All">Temple Provides All Materials</option>
                <option value="Shared Procurement">Shared Procurement</option>
                <option value="Artisan Procures Special Materials">Artisan Procures Special Materials</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label">7. Required Expertise</label>
              <select 
                className="form-input"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              >
                <option value="Skilled Artisan">Skilled Artisan (3+ Yrs)</option>
                <option value="Senior Craftsman">Senior Craftsman (8+ Yrs)</option>
                <option value="Master Sthapathi">Master Sthapathi (15+ Yrs)</option>
              </select>
            </div>
          </div>

          {/* INTELLIGENT BUDGET SUGGESTION DISPLAY BANNER */}
          <div className="budget-suggestion-card">
            <div className="budget-card-header">
              <div className="budget-header-title">
                <Sparkles size={18} className="sparkle-gold-icon" />
                <span>Intelligent Project-Budget Suggestion</span>
              </div>
              <span className="budget-range-pill">{budgetEstimate.formattedRange}</span>
            </div>

            <div className="budget-calc-meta">
              <div className="meta-col">
                <span className="meta-lbl">Work Category:</span>
                <span className="meta-val">{craft} ({scale} Scale)</span>
              </div>
              <div className="meta-col">
                <span className="meta-lbl">Calculated Range:</span>
                <span className="meta-val highlight">{budgetEstimate.formattedRange}</span>
              </div>
            </div>

            {/* MANDATORY DISCLAIMER NOTE */}
            <div className="budget-disclaimer-note">
              <Info size={15} className="info-blue-icon" />
              <p>
                <strong>Indicative estimate only.</strong> Final amount is mutually agreed between the temple and artisan based on project requirements.
              </p>
            </div>

            {/* Editable Offered Budget Input */}
            <div className="editable-budget-group">
              <label className="form-label">
                Offered / Allocated Project Budget (₹) <span className="required-star">*</span>
              </label>
              <div className="budget-input-wrapper">
                <span className="rupee-symbol">₹</span>
                <input 
                  type="number" 
                  className="form-input budget-num-input"
                  min="1000"
                  step="1000"
                  value={currentOfferedBudget}
                  onChange={(e) => setUserEditedBudget(Number(e.target.value))}
                  required
                />
                {userEditedBudget !== null && (
                  <button 
                    type="button" 
                    className="btn-reset-suggested"
                    onClick={() => setUserEditedBudget(null)}
                    title="Reset to system suggested default"
                  >
                    Reset to Suggested (₹{budgetEstimate.suggestedDefault.toLocaleString('en-IN')})
                  </button>
                )}
              </div>

              {/* 10% Platform Fee & 90% Net Payout Breakdown */}
              <div className="platform-commission-breakdown">
                <div className="comm-row">
                  <span className="comm-lbl">Total Project Escrow Amount:</span>
                  <span className="comm-val bold">₹{Number(currentOfferedBudget).toLocaleString('en-IN')}</span>
                </div>
                <div className="comm-row platform-share">
                  <span className="comm-lbl">✦ Platform Maintenance Fee (10% to Us):</span>
                  <span className="comm-val fee">₹{Math.round(Number(currentOfferedBudget) * 0.10).toLocaleString('en-IN')}</span>
                </div>
                <div className="comm-row artisan-share">
                  <span className="comm-lbl">✓ Net Artisan Direct Payout (90%):</span>
                  <span className="comm-val net">₹{Math.round(Number(currentOfferedBudget) * 0.90).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="budget-hint">
                You can freely edit or adjust this suggested amount before publishing.
              </p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Traditional Materials Details</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Dravidian Granite, Panchaloha, Teakwood"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Temple Location / State</label>
              <input 
                type="text" 
                className="form-input" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Detailed Scope & Architectural Guidelines <span className="required-star">*</span>
            </label>
            <textarea 
              className="form-textarea" 
              rows={3}
              placeholder="Describe the architectural context, traditional iconography standards (Agama / Shilpa Shastra), and hand-craft requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reference Image URL (Optional)</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://images.unsplash.com/..."
              value={referenceImageUrl}
              onChange={(e) => setReferenceImageUrl(e.target.value)}
            />
          </div>

          <div className="modal-actions-bar">
            <button type="button" className="btn-secondary-modal" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-modal">
              <Plus size={16} />
              <span>Publish TempleWork Project (₹{Number(currentOfferedBudget).toLocaleString('en-IN')})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

