import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, Sparkles, Mic, Square, RotateCcw, 
  CheckCircle, AlertCircle, Upload, FileText 
} from 'lucide-react';
import { saveCustomItem } from '../services/customItemsStorage';
import { saveStoryToArchive } from '../services/storyStorage';

export default function ShareCulturalItemModal({
  isOpen,
  onClose,
  state,
  feature,
  onItemCreated,
}) {
  const getFeatureConfig = () => {
    switch (feature?.id) {
      case 'festivals':
        return {
          title: 'Share a Festival',
          subtitle: 'Know a festival from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Festival Name',
          namePlaceholder: 'e.g. Nagoba Jathara, Chenchu Jathara, or a village harvest festival',
          infoLabel: 'Festival Information',
          infoPlaceholder: 'Describe the rituals, traditions, community celebrations, history, and sacred significance...',
          submitLabel: 'Share Festival',
        };
      case 'arts':
        return {
          title: 'Share an Art or Craft',
          subtitle: 'Know a traditional art or craft from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Art / Craft Name',
          namePlaceholder: 'e.g. Gonde painting, Kolam art, or rural brass craft',
          infoLabel: 'Craft Information',
          infoPlaceholder: 'Describe the materials, techniques, historical roots, and artisans behind this craft...',
          submitLabel: 'Share Art & Craft',
        };
      case 'dance':
        return {
          title: 'Share a Dance or Music Tradition',
          subtitle: 'Know a dance or musical tradition from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Dance / Music Name',
          namePlaceholder: 'e.g. Gussadi dance, Burra Katha, or regional folk ballad',
          infoLabel: 'Performance Information',
          infoPlaceholder: 'Describe the instruments, rhythmic patterns, costumes, and folklore behind this art...',
          submitLabel: 'Share Tradition',
        };
      case 'cuisine':
        return {
          title: 'Share a Traditional Dish',
          subtitle: 'Know a regional dish or culinary tradition from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Dish / Recipe Name',
          namePlaceholder: 'e.g. Pachi Pulusu, Jowar Roti, or festive sweet',
          infoLabel: 'Culinary Information',
          infoPlaceholder: 'Describe the heritage ingredients, cooking technique, cultural context, and flavors...',
          submitLabel: 'Share Traditional Dish',
        };
      case 'heritage-places':
        return {
          title: 'Share a Heritage Place',
          subtitle: 'Know a sacred site, historic monument, or temple from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Heritage Site Name',
          namePlaceholder: 'e.g. Keesaragutta Temple, Rachakonda Fort, or ancient stepwell',
          infoLabel: 'Heritage Information',
          infoPlaceholder: 'Describe the architecture, historical dynasty, legends, and significance of this place...',
          submitLabel: 'Share Heritage Place',
        };
      default:
        return {
          title: 'Share a Cultural Tradition',
          subtitle: 'Know a tradition from this state that deserves to be remembered? Share it with Bharat Sanskriti.',
          nameLabel: 'Tradition Name',
          namePlaceholder: 'Name of the cultural tradition',
          infoLabel: 'Cultural Information',
          infoPlaceholder: 'Describe the significance, practice, and living memory of this tradition...',
          submitLabel: 'Share Tradition',
        };
    }
  };

  const config = getFeatureConfig();

  // Form Fields
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [information, setInformation] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [storyText, setStoryText] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);

  // Audio Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [audioDurationSec, setAudioDurationSec] = useState(0);
  const audioMediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioTimerRef = useRef(null);

  // Validation
  const [validationError, setValidationError] = useState('');
  const [mediaError, setMediaError] = useState('');

  const stopAudioStreams = useCallback(() => {
    if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    if (audioMediaRecorderRef.current && audioMediaRecorderRef.current.state === 'recording') {
      audioMediaRecorderRef.current.stop();
    }
  }, []);

  // Clean up recording streams on close
  useEffect(() => {
    return () => {
      stopAudioStreams();
    };
  }, [stopAudioStreams]);

  if (!isOpen) return null;

  // Format mm:ss
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('Image size should be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageDataUrl(event.target.result);
        setImageUrlInput('');
        setValidationError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Audio Recording Handlers
  const startAudioRecording = async () => {
    setMediaError('');
    audioChunksRef.current = [];
    setAudioBlobUrl(null);
    setAudioDurationSec(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Audio recording not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioMediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecordingAudio(true);

      audioTimerRef.current = setInterval(() => {
        setAudioDurationSec((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone error:', err);
      setMediaError('Could not access microphone. You can still type your story in the text box below.');
      setIsRecordingAudio(false);
    }
  };

  const stopAudioRecording = () => {
    if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    if (audioMediaRecorderRef.current && audioMediaRecorderRef.current.state === 'recording') {
      audioMediaRecorderRef.current.stop();
    }
    setIsRecordingAudio(false);
  };

  const resetAudio = () => {
    stopAudioRecording();
    setAudioBlobUrl(null);
    setAudioDurationSec(0);
    setMediaError('');
  };

  // Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Name is required
    if (!name || name.trim() === '') {
      setValidationError(`Please enter the ${config.nameLabel}.`);
      return;
    }

    // Short Description is required (becomes the yellow-line tagline)
    if (!tagline || tagline.trim() === '') {
      setValidationError('Please enter a Short Description (this will appear on the card).');
      return;
    }

    const finalImage = imageDataUrl || imageUrlInput.trim() || null;

    // Construct cultural item payload
    const itemPayload = {
      name: name.trim(),
      stateId: state.id,
      stateName: state.name,
      featureId: feature.id,
      category: feature.title,
      tagline: tagline.trim(),
      shortIntro: information.trim() || tagline.trim(),
      information: information.trim(),
      image: finalImage,
      audioUrl: audioBlobUrl,
      audioDuration: audioDurationSec > 0 ? formatTimer(audioDurationSec) : null,
      storyText: storyText.trim() || null,
      contributorName: contributorName.trim() || 'A Cultural Contributor',
    };

    const savedItem = saveCustomItem(itemPayload);

    // If user also wrote a story or recorded audio, save it directly to the Stories & Memories archive
    if (storyText.trim().length > 0 || audioBlobUrl) {
      try {
        saveStoryToArchive({
          state: state.name,
          feature: feature.title,
          culturalItem: savedItem.name,
          storyTitle: `${savedItem.name} — Living Tradition & Personal Story`,
          contributorName: contributorName.trim() || 'A Cultural Contributor',
          contentType: audioBlobUrl ? 'audio' : 'text',
          textContent: storyText.trim() || information.trim(),
          mediaUrl: audioBlobUrl || finalImage || '',
          audioDuration: audioDurationSec > 0 ? formatTimer(audioDurationSec) : '',
        });
      } catch (err) {
        console.warn('Error archiving story with item:', err);
      }
    }

    stopAudioStreams();

    if (onItemCreated) {
      onItemCreated(savedItem);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card share-cultural-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Share Dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="share-modal-header">
          <div className="share-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Living Cultural Platform</span>
          </div>

          <h2 className="modal-title">{config.title}</h2>
          
          <p className="share-modal-subtitle">
            <em>{config.subtitle}</em>
          </p>

          {/* Current State Auto-Lock Indicator */}
          <div className="state-autolocked-badge">
            <span className="autolock-label">State:</span>
            <span className="autolock-value">{state.name}</span>
            <span className="autolock-feature">• {feature.title}</span>
          </div>
        </div>

        {/* Validation Banner */}
        {validationError && (
          <div className="form-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        {/* Media Warning */}
        {mediaError && (
          <div className="media-warning-banner">
            <AlertCircle size={16} />
            <span>{mediaError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="share-modal-form">
          {/* 1. Item Name */}
          <div className="form-group">
            <label htmlFor="share-item-name" className="form-label">
              {config.nameLabel} <span className="required-star">*</span>
            </label>
            <input
              id="share-item-name"
              type="text"
              className="form-input"
              placeholder={config.namePlaceholder}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationError) setValidationError('');
              }}
              required
            />
          </div>

          {/* 2. Short Description (Yellow line sentence) */}
          <div className="form-group">
            <label htmlFor="share-item-tagline" className="form-label">
              Short Description <span className="required-star">*</span>
              <span className="form-sublabel-hint"> (This becomes the yellow-line sentence on the card)</span>
            </label>
            <input
              id="share-item-tagline"
              type="text"
              className="form-input"
              placeholder="e.g. Centuries-old sacred harvest festival celebrating mother nature and rural harmony"
              value={tagline}
              onChange={(e) => {
                setTagline(e.target.value);
                if (validationError) setValidationError('');
              }}
              required
            />
          </div>

          {/* 3. Add Images */}
          <div className="form-group">
            <label className="form-label">
              Add Images <span className="optional-tag">(Optional)</span>
            </label>

            {!imageDataUrl && !imageUrlInput ? (
              <div className="image-input-container">
                <label className="share-photo-dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    className="photo-file-input"
                    onChange={handleImageUpload}
                  />
                  <Upload size={24} className="dropzone-icon" />
                  <span className="dropzone-text">Click or drop image file here</span>
                  <span className="dropzone-sub">PNG, JPG, or WebP up to 5MB</span>
                </label>

                <div className="url-toggle-bar">
                  <button
                    type="button"
                    className="btn-link-toggle"
                    onClick={() => setShowUrlField(!showUrlField)}
                  >
                    {showUrlField ? '— Hide Image URL Option' : '+ Or provide an Image Web Link'}
                  </button>
                </div>

                {showUrlField && (
                  <input
                    type="url"
                    className="form-input mt-2"
                    placeholder="https://example.com/festival-image.jpg"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                  />
                )}
              </div>
            ) : (
              <div className="share-image-preview-wrap">
                <img
                  src={imageDataUrl || imageUrlInput}
                  alt="Cultural entry preview"
                  className="share-image-preview-thumb"
                />
                <button
                  type="button"
                  className="btn-remove-preview"
                  onClick={() => {
                    setImageDataUrl('');
                    setImageUrlInput('');
                  }}
                >
                  <X size={14} />
                  <span>Remove Image</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Cultural Information */}
          <div className="form-group">
            <label htmlFor="share-item-info" className="form-label">
              {config.infoLabel}
              <span className="form-sublabel-hint"> (Traditions, celebrations, significance, rituals)</span>
            </label>
            <textarea
              id="share-item-info"
              className="form-textarea"
              rows={4}
              placeholder={config.infoPlaceholder}
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>

          {/* 5. Share a Story & Voice Memory */}
          <div className="share-story-section">
            <div className="share-story-header">
              <FileText size={16} className="section-icon" />
              <span className="section-title">Share a Story / Experience</span>
              <span className="optional-tag">(Optional)</span>
            </div>

            <div className="form-group mt-2">
              <label htmlFor="share-contributor-name" className="sub-label">
                Your Name / Contributor
              </label>
              <input
                id="share-contributor-name"
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Reddy or Family of Hyderabad"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="share-story-text" className="sub-label">
                Personal Memory or Family Experience
              </label>
              <textarea
                id="share-story-text"
                className="form-textarea-sm"
                rows={3}
                placeholder="Share your childhood memories, how your family celebrates this, or unique customs passed down..."
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
              />
            </div>

            {/* In-Browser Voice Recording */}
            <div className="share-audio-box">
              <span className="sub-label">Record a Voice Story (Oral Memory):</span>
              
              {!audioBlobUrl ? (
                <div className="audio-record-inline">
                  {!isRecordingAudio ? (
                    <button
                      type="button"
                      className="btn-recorder-inline"
                      onClick={startAudioRecording}
                    >
                      <Mic size={15} />
                      <span>Record Voice Story</span>
                    </button>
                  ) : (
                    <div className="recording-active-inline">
                      <span className="pulse-dot" />
                      <span className="timer-display">{formatTimer(audioDurationSec)}</span>
                      <button
                        type="button"
                        className="btn-stop-inline"
                        onClick={stopAudioRecording}
                      >
                        <Square size={14} />
                        <span>Stop</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="audio-recorded-inline">
                  <div className="audio-recorded-tag">
                    <CheckCircle size={14} />
                    <span>Voice Memory Recorded ({formatTimer(audioDurationSec)})</span>
                  </div>
                  <audio controls src={audioBlobUrl} className="custom-audio-player-sm" />
                  <button type="button" className="btn-re-record-sm" onClick={resetAudio}>
                    <RotateCcw size={12} />
                    <span>Re-record</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer / Action */}
          <div className="share-modal-footer">
            <button
              type="button"
              className="btn-secondary-modal"
              onClick={() => {
                stopAudioStreams();
                onClose();
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-submit-shared-festival"
              className="btn-primary-modal"
            >
              <Sparkles size={16} />
              <span>{config.submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
