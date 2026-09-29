import React, { useState } from 'react';
import { X, Landmark, Plus, Sparkles, AlertCircle, Image } from 'lucide-react';
import { getCurrentUser } from '../../services/authService';

export default function CreateSevaModal({ isOpen, onClose, onSevaCreated }) {
  const currentUser = getCurrentUser();
  const templeProfile = currentUser?.templeProfile;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Festival Volunteer');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [location, setLocation] = useState(templeProfile?.location || 'Telangana');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('2 Days');
  const [peopleNeeded, setPeopleNeeded] = useState(4);
  const [referenceImage, setReferenceImage] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const categories = [
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
    'Technical Support',
    'Other / Custom'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a Seva title.');
      return;
    }

    if (!description.trim()) {
      setError('Please describe the Seva requirements.');
      return;
    }

    const finalCategory = category === 'Other / Custom' 
      ? (customCategory.trim() || 'General Seva') 
      : category;

    const skillsArray = skillsRequired
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      category: finalCategory,
      description: description.trim(),
      skillsRequired: skillsArray.length > 0 ? skillsArray : ['General Service'],
      location: location.trim() || templeProfile?.location || 'India',
      date: date.trim() || 'Upcoming Festival',
      duration: duration.trim() || 'Flexible',
      peopleNeeded: parseInt(peopleNeeded, 10) || 2,
      templeImage: referenceImage.trim() || undefined,
      additionalRequirements: additionalRequirements.trim(),
      templeId: templeProfile?.templeId || 'temple-ramappa',
      templeName: templeProfile?.templeName || 'Temple Administration'
    };

    if (onSevaCreated) {
      onSevaCreated(payload);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card create-seva-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Create Seva Modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Landmark size={14} />
            <span>Temple Administrator Portal</span>
          </div>
          <h2 className="modal-title">Create New Temple Seva</h2>
          <p className="modal-subtitle">
            Post voluntary skill service requirements for {templeProfile?.templeName || 'your temple'}.
          </p>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="create-seva-form">
          <div className="form-group">
            <label className="form-label">
              Seva Title <span className="required-star">*</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Temple Fresco Cleaning & Photographic Archiving"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Category</label>
              <select 
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {category === 'Other / Custom' && (
              <div className="form-group flex-1">
                <label className="form-label">Custom Category Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sanskrit Chanting Transcription"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              </div>
            )}

            <div className="form-group flex-1">
              <label className="form-label">Location / State</label>
              <input 
                type="text" 
                className="form-input" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Dates / Schedule</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Oct 24 - Oct 26 or Flexible"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Duration</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 2 Days (Weekend) or 10 Hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Volunteers Needed</label>
              <input 
                type="number" 
                min="1"
                max="50"
                className="form-input" 
                value={peopleNeeded}
                onChange={(e) => setPeopleNeeded(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Skills Required (Comma separated)
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Photography, Documentation, Lighting, Telugu, Sanskrit"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
            />
            <span className="form-help-text">
              Enter any combination of skills. Temple Administrators can define any requirement.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              Seva Description & Purpose <span className="required-star">*</span>
            </label>
            <textarea 
              className="form-textarea" 
              rows={3}
              placeholder="Explain the background, what sevaks will do, and why their contribution is meaningful..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Additional Notes / Volunteer Instructions (Optional)
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Bring your own camera. Traditional attire required within inner sanctum."
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reference Image URL (Optional)</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://..."
              value={referenceImage}
              onChange={(e) => setReferenceImage(e.target.value)}
            />
          </div>

          <div className="modal-actions-bar">
            <button type="button" className="btn-secondary-modal" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-modal">
              <Plus size={16} />
              <span>Create & Publish Seva</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
