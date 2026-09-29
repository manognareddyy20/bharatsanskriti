import React, { useState } from 'react';
import { X, Sparkles, Check, BookOpen, AlertCircle, FileText } from 'lucide-react';
import { structureCulturalStory } from '../../services/aiService';

export default function AIStoryStructureModal({
  isOpen,
  onClose,
  initialText = '',
  initialMetadata = {},
  onStructureApplied
}) {
  const [inputText, setInputText] = useState(initialText);
  const [person, setPerson] = useState(initialMetadata.person || 'Grandmother');
  const [place, setPlace] = useState(initialMetadata.place || 'Hyderabad, Telangana');
  const [tradition, setTradition] = useState(initialMetadata.tradition || 'Bathukamma Festivities');
  const [structuredResult, setStructuredResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStructure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = structureCulturalStory(inputText, {
        person,
        place,
        tradition,
        contributorName: initialMetadata.contributorName || 'Family Member'
      });
      setStructuredResult(result);
      setIsProcessing(false);
    }, 500);
  };

  const handleApply = () => {
    if (onStructureApplied && structuredResult) {
      onStructureApplied(structuredResult);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card ai-structure-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close AI Structuring"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Sparkles size={14} />
            <span>AI Story Structuring Assistant</span>
          </div>
          <h2 className="modal-title">Structure Your Family Oral Memory</h2>
          <p className="modal-subtitle">
            Format unwritten family memories into an organized cultural record for future generations.
          </p>
        </div>

        <div className="ai-structure-body">
          {!structuredResult ? (
            <div className="ai-input-step">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">Elder or Relative Who Shared</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Satyavati Amma (Grandmother)"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                  />
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">Ancestral Place / Village</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Warangal, Telangana"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">Festival or Tradition</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Bathukamma Saddulu Making"
                    value={tradition}
                    onChange={(e) => setTradition(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Your Spoken or Written Story Notes
                </label>
                <textarea 
                  className="form-textarea"
                  rows={6}
                  placeholder="Paste or type what your elders told you—how they gathered flowers, what songs were sung, or the recipes passed down..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <button 
                type="button" 
                className="btn-structure-trigger"
                onClick={handleStructure}
                disabled={isProcessing}
              >
                <Sparkles size={16} />
                <span>{isProcessing ? 'Structuring Cultural Memory...' : 'Structure Memory with AI'}</span>
              </button>
            </div>
          ) : (
            <div className="ai-result-preview-step">
              <div className="ai-structured-label-banner">
                <Sparkles size={16} />
                <span>AI-structured from your family-contributed story.</span>
              </div>

              <div className="structured-fields-display">
                <div className="field-block">
                  <span className="field-title">Proposed Title:</span>
                  <p className="field-val highlight-title">{structuredResult.title}</p>
                </div>

                <div className="field-grid-three">
                  <div className="field-block">
                    <span className="field-title">Person:</span>
                    <p className="field-val">{structuredResult.person}</p>
                  </div>
                  <div className="field-block">
                    <span className="field-title">Place:</span>
                    <p className="field-val">{structuredResult.place}</p>
                  </div>
                  <div className="field-block">
                    <span className="field-title">Tradition:</span>
                    <p className="field-val">{structuredResult.tradition}</p>
                  </div>
                </div>

                <div className="field-block">
                  <span className="field-title">Family Living Practice:</span>
                  <p className="field-val">{structuredResult.familyPractice}</p>
                </div>

                <div className="field-block">
                  <span className="field-title">Cultural & Ecological Meaning:</span>
                  <p className="field-val">{structuredResult.culturalMeaning}</p>
                </div>

                <div className="field-block">
                  <span className="field-title">Living Narrative:</span>
                  <p className="field-val narrative-text">{structuredResult.structuredStory}</p>
                </div>

                <div className="heritage-distinction-note">
                  <AlertCircle size={14} />
                  <span>
                    <strong>Distinction:</strong> This entry preserves lived family memory and elder oral lore. It is not an unverified historical claim.
                  </span>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button 
                  type="button" 
                  className="btn-secondary-modal"
                  onClick={() => setStructuredResult(null)}
                >
                  Edit Input
                </button>
                <button 
                  type="button" 
                  className="btn-primary-modal"
                  onClick={handleApply}
                >
                  <Check size={16} />
                  <span>Apply Structured Fields</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
