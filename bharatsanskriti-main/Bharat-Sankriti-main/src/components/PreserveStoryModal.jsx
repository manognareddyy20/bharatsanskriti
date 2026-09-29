import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Mic, Video, Image, FileText, Square, RotateCcw, 
  CheckCircle, AlertCircle, Sparkles, Upload 
} from 'lucide-react';
import { saveStoryToArchive } from '../services/storyStorage';

export default function PreserveStoryModal({
  isOpen,
  onClose,
  state,
  feature,
  culturalItem,
  onStorySaved,
}) {
  // Active method tab: 'text' | 'audio' | 'video' | 'photo'
  const [activeMethod, setActiveMethod] = useState('text');

  // Form Fields
  const [storyTitle, setStoryTitle] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState('');

  // Audio Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [audioDurationSec, setAudioDurationSec] = useState(0);
  const audioMediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioTimerRef = useRef(null);

  // Video Recording State
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [videoDurationSec, setVideoDurationSec] = useState(0);
  const videoMediaRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const videoTimerRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const videoStreamRef = useRef(null);

  // Status and Validation
  const [validationError, setValidationError] = useState('');
  const [mediaError, setMediaError] = useState('');

  // Reset errors when opening
  useEffect(() => {
    if (isOpen) {
      setValidationError('');
      setMediaError('');
    }
  }, [isOpen]);

  // Clean up media streams on unmount or close
  useEffect(() => {
    return () => {
      stopAllMediaStreams();
    };
  }, []);

  const stopAllMediaStreams = () => {
    if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    if (videoTimerRef.current) clearInterval(videoTimerRef.current);

    if (audioMediaRecorderRef.current && audioMediaRecorderRef.current.state === 'recording') {
      audioMediaRecorderRef.current.stop();
    }
    if (videoMediaRecorderRef.current && videoMediaRecorderRef.current.state === 'recording') {
      videoMediaRecorderRef.current.stop();
    }
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
  };

  if (!isOpen) return null;

  // ----------------------------------------------------
  // Audio Recording Handlers
  // ----------------------------------------------------
  const startAudioRecording = async () => {
    setMediaError('');
    audioChunksRef.current = [];
    setAudioBlobUrl(null);
    setAudioDurationSec(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Audio recording is not supported in this browser.');
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
      console.warn('Microphone access error:', err);
      setMediaError(
        'Could not access microphone. Please check browser microphone permissions or use text/photo options.'
      );
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

  // ----------------------------------------------------
  // Video Recording Handlers
  // ----------------------------------------------------
  const startVideoRecording = async () => {
    setMediaError('');
    videoChunksRef.current = [];
    setVideoBlobUrl(null);
    setVideoDurationSec(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Video recording is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoStreamRef.current = stream;

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      videoMediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          videoChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(videoBlob);
        setVideoBlobUrl(url);
        stream.getTracks().forEach((t) => t.stop());
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
      };

      recorder.start();
      setIsRecordingVideo(true);

      videoTimerRef.current = setInterval(() => {
        setVideoDurationSec((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Camera access error:', err);
      setMediaError(
        'Could not access camera/microphone. Please ensure permissions are granted or use text/photo options.'
      );
      setIsRecordingVideo(false);
    }
  };

  const stopVideoRecording = () => {
    if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    if (videoMediaRecorderRef.current && videoMediaRecorderRef.current.state === 'recording') {
      videoMediaRecorderRef.current.stop();
    }
    setIsRecordingVideo(false);
  };

  const resetVideo = () => {
    stopVideoRecording();
    setVideoBlobUrl(null);
    setVideoDurationSec(0);
    setMediaError('');
  };

  // ----------------------------------------------------
  // Photo Upload Handler
  // ----------------------------------------------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('Image size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoDataUrl(event.target.result);
        setValidationError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Format seconds to mm:ss
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // Validation & Save Story
  // ----------------------------------------------------
  const handleSaveClick = () => {
    setValidationError('');

    // Rule 1: Story Title is required
    if (!storyTitle || storyTitle.trim() === '') {
      setValidationError('Please enter a Story Title (e.g. "My Grandmother\'s Bathukamma Memories").');
      return;
    }

    // Rule 2: Contributor Name is required
    if (!contributorName || contributorName.trim() === '') {
      setValidationError('Please enter your name as the contributor.');
      return;
    }

    // Rule 3: At least one contribution is provided according to active method
    let hasContribution = false;
    let finalContentType = activeMethod;

    if (activeMethod === 'text' && textContent.trim().length > 0) {
      hasContribution = true;
    } else if (activeMethod === 'audio' && audioBlobUrl) {
      hasContribution = true;
    } else if (activeMethod === 'video' && videoBlobUrl) {
      hasContribution = true;
    } else if (activeMethod === 'photo' && photoDataUrl) {
      hasContribution = true;
    }

    // If active method didn't have content, check if another method has content
    if (!hasContribution) {
      if (textContent.trim().length > 0) {
        hasContribution = true;
        finalContentType = 'text';
      } else if (audioBlobUrl) {
        hasContribution = true;
        finalContentType = 'audio';
      } else if (videoBlobUrl) {
        hasContribution = true;
        finalContentType = 'video';
      } else if (photoDataUrl) {
        hasContribution = true;
        finalContentType = 'photo';
      }
    }

    if (!hasContribution) {
      setValidationError(
        'Please provide at least one story contribution (write a story, record audio, record video, or upload a photo).'
      );
      return;
    }

    // Proceed directly to permanent save (no login modal required)
    performPermanentSave(finalContentType);
  };

  const performPermanentSave = (determinedContentType) => {
    const payload = {
      state: state || 'Telangana',
      feature: feature || 'Festivals',
      culturalItem: culturalItem || 'Bathukamma',
      storyTitle: storyTitle.trim(),
      contributorName: contributorName.trim(),
      contentType: determinedContentType,
      textContent: textContent.trim(),
      mediaUrl: 
        determinedContentType === 'photo' 
          ? photoDataUrl 
          : determinedContentType === 'audio' 
            ? audioBlobUrl 
            : determinedContentType === 'video' 
              ? videoBlobUrl 
              : '',
      audioDuration: audioDurationSec > 0 ? formatTimer(audioDurationSec) : '',
      videoDuration: videoDurationSec > 0 ? formatTimer(videoDurationSec) : '',
    };

    const savedStory = saveStoryToArchive(payload);

    stopAllMediaStreams();

    if (onStorySaved) {
      onStorySaved(savedStory);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <div className="modal-card preserve-modal-card" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Preserve Story Dialog"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="preserve-modal-header">
            <div className="preserve-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Cultural Preservation</span>
            </div>
            <h2 className="modal-title">Preserve a Story</h2>
            <p className="preserve-item-highlight">
              Preserve a story about <span className="highlight-item-name">{culturalItem}</span>
            </p>
            <div className="auto-organized-tags">
              <span className="meta-pill">State: <strong>{state}</strong></span>
              <span className="meta-pill">Feature: <strong>{feature}</strong></span>
              <span className="meta-pill">Item: <strong>{culturalItem}</strong></span>
            </div>
          </div>

          {/* Validation Banner */}
          {validationError && (
            <div className="form-error-banner" role="alert">
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Media Warning Banner */}
          {mediaError && (
            <div className="media-warning-banner">
              <AlertCircle size={16} />
              <span>{mediaError}</span>
            </div>
          )}

          {/* Core Required Fields */}
          <div className="preserve-core-fields">
            <div className="form-group">
              <label htmlFor="story-title-input" className="form-label">
                Story Title <span className="required-star">*</span>
              </label>
              <input
                id="story-title-input"
                type="text"
                className="form-input"
                placeholder={`e.g. My Grandmother's ${culturalItem} Memories`}
                value={storyTitle}
                onChange={(e) => {
                  setStoryTitle(e.target.value);
                  if (validationError) setValidationError('');
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contributor-name-input" className="form-label">
                Your Name <span className="required-star">*</span>
              </label>
              <input
                id="contributor-name-input"
                type="text"
                className="form-input"
                placeholder="e.g. Shruthi Rao"
                value={contributorName}
                onChange={(e) => {
                  setContributorName(e.target.value);
                  if (validationError) setValidationError('');
                }}
              />
            </div>
          </div>

          {/* Contribution Method Navigation Tabs */}
          <div className="method-selector-container">
            <span className="method-selector-label">Choose How You Wish to Preserve:</span>
            <div className="method-tabs-grid">
              <button
                type="button"
                className={`method-tab-btn ${activeMethod === 'text' ? 'active' : ''}`}
                onClick={() => setActiveMethod('text')}
              >
                <FileText size={18} />
                <span>Write Story</span>
              </button>

              <button
                type="button"
                className={`method-tab-btn ${activeMethod === 'audio' ? 'active' : ''}`}
                onClick={() => setActiveMethod('audio')}
              >
                <Mic size={18} />
                <span>Record Audio</span>
                {audioBlobUrl && <span className="method-badge-recorded">Recorded</span>}
              </button>

              <button
                type="button"
                className={`method-tab-btn ${activeMethod === 'video' ? 'active' : ''}`}
                onClick={() => setActiveMethod('video')}
              >
                <Video size={18} />
                <span>Record Video</span>
                {videoBlobUrl && <span className="method-badge-recorded">Recorded</span>}
              </button>

              <button
                type="button"
                className={`method-tab-btn ${activeMethod === 'photo' ? 'active' : ''}`}
                onClick={() => setActiveMethod('photo')}
              >
                <Image size={18} />
                <span>Upload Photo</span>
                {photoDataUrl && <span className="method-badge-recorded">Uploaded</span>}
              </button>
            </div>
          </div>

          {/* Contribution Content Area */}
          <div className="method-content-panel">
            {/* METHOD A: WRITE A STORY */}
            {activeMethod === 'text' && (
              <div className="method-view method-text-view">
                <label htmlFor="story-textarea" className="sub-label">
                  Write your story, family memory, or cultural experience:
                </label>
                <textarea
                  id="story-textarea"
                  className="form-textarea"
                  rows={5}
                  placeholder={`Write about your personal or family experience with ${culturalItem}. What does it mean to you? How do you celebrate or practice it?`}
                  value={textContent}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                />
                <div className="textarea-footer-info">
                  <span>{textContent.length} characters written</span>
                  <span className="textarea-hint">Personal details, generational memories, and regional variations are welcomed!</span>
                </div>
              </div>
            )}

            {/* METHOD B: RECORD AUDIO */}
            {activeMethod === 'audio' && (
              <div className="method-view method-audio-view">
                <div className="recorder-panel">
                  {!audioBlobUrl ? (
                    <>
                      <div className={`audio-pulse-visualizer ${isRecordingAudio ? 'recording' : ''}`}>
                        <Mic size={36} className="visualizer-mic" />
                        {isRecordingAudio && <div className="pulse-ring" />}
                      </div>

                      <div className="recording-timer">
                        {formatTimer(audioDurationSec)}
                      </div>

                      <p className="recorder-instructions">
                        {isRecordingAudio 
                          ? 'Recording your voice... Speak your memories clearly.' 
                          : 'Click below to record your voice reciting a memory or song.'}
                      </p>

                      <div className="recorder-controls">
                        {!isRecordingAudio ? (
                          <button
                            type="button"
                            className="btn-recorder-start"
                            onClick={startAudioRecording}
                          >
                            <Mic size={18} />
                            <span>Start Audio Recording</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-recorder-stop"
                            onClick={stopAudioRecording}
                          >
                            <Square size={18} />
                            <span>Stop Recording</span>
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="recorded-preview-box">
                      <div className="recorded-success-tag">
                        <CheckCircle size={16} />
                        <span>Audio Memory Recorded ({formatTimer(audioDurationSec)})</span>
                      </div>
                      <audio controls src={audioBlobUrl} className="custom-audio-player" />
                      <div className="recorded-actions">
                        <button type="button" className="btn-secondary-sm" onClick={resetAudio}>
                          <RotateCcw size={14} />
                          <span>Re-record Audio</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional written note accompanying audio */}
                <div className="form-group mt-3">
                  <label htmlFor="audio-notes" className="sub-label">
                    Accompanying Story Notes <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea
                    id="audio-notes"
                    className="form-textarea-sm"
                    rows={2}
                    placeholder="Brief summary of what this audio recording covers..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* METHOD C: RECORD VIDEO */}
            {activeMethod === 'video' && (
              <div className="method-view method-video-view">
                <div className="recorder-panel">
                  {!videoBlobUrl ? (
                    <>
                      <div className="video-viewport-container">
                        <video 
                          ref={videoPreviewRef} 
                          className={`video-preview-stream ${isRecordingVideo ? 'active-stream' : ''}`}
                          playsInline 
                          muted 
                        />
                        {!isRecordingVideo && (
                          <div className="video-standby-overlay">
                            <Video size={40} />
                            <span>Camera preview will start when recording begins</span>
                          </div>
                        )}
                        {isRecordingVideo && (
                          <div className="video-recording-indicator">
                            <span className="red-recording-dot" />
                            <span>REC {formatTimer(videoDurationSec)}</span>
                          </div>
                        )}
                      </div>

                      <div className="recorder-controls mt-3">
                        {!isRecordingVideo ? (
                          <button
                            type="button"
                            className="btn-recorder-start"
                            onClick={startVideoRecording}
                          >
                            <Video size={18} />
                            <span>Start Video Recording</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-recorder-stop"
                            onClick={stopVideoRecording}
                          >
                            <Square size={18} />
                            <span>Stop Video Recording</span>
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="recorded-preview-box">
                      <div className="recorded-success-tag">
                        <CheckCircle size={16} />
                        <span>Video Memory Recorded ({formatTimer(videoDurationSec)})</span>
                      </div>
                      <video controls src={videoBlobUrl} className="custom-video-player" />
                      <div className="recorded-actions">
                        <button type="button" className="btn-secondary-sm" onClick={resetVideo}>
                          <RotateCcw size={14} />
                          <span>Re-record Video</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="video-notes" className="sub-label">
                    Accompanying Story Notes <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea
                    id="video-notes"
                    className="form-textarea-sm"
                    rows={2}
                    placeholder="Brief description of your video message..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* METHOD D: UPLOAD A PHOTO */}
            {activeMethod === 'photo' && (
              <div className="method-view method-photo-view">
                {!photoDataUrl ? (
                  <label className="photo-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      className="photo-file-input"
                      onChange={handlePhotoUpload}
                    />
                    <Upload size={36} className="dropzone-icon" />
                    <span className="dropzone-title">Click or Drag & Drop Photo Here</span>
                    <span className="dropzone-hint">PNG, JPG, or WebP up to 5MB (Family photos, festive setups, traditional attire)</span>
                  </label>
                ) : (
                  <div className="photo-preview-container">
                    <img src={photoDataUrl} alt="Preserved Memory" className="photo-preview-img" />
                    <div className="photo-preview-overlay">
                      <button
                        type="button"
                        className="btn-secondary-sm"
                        onClick={() => setPhotoDataUrl('')}
                      >
                        <X size={14} />
                        <span>Remove Photo</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="form-group mt-3">
                  <label htmlFor="photo-caption" className="sub-label">
                    Photo Description & Story <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="photo-caption"
                    className="form-textarea"
                    rows={3}
                    placeholder={`Describe who is in this photo, where and when it was taken, and its connection to ${culturalItem}...`}
                    value={textContent}
                    onChange={(e) => {
                      setTextContent(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="preserve-modal-footer">
            <button 
              type="button" 
              className="btn-secondary-modal"
              onClick={() => {
                stopAllMediaStreams();
                onClose();
              }}
            >
              Cancel
            </button>

            <button 
              type="button" 
              id="btn-save-story"
              className="btn-primary-modal"
              onClick={handleSaveClick}
            >
              <CheckCircle size={18} />
              <span>Save to Stories & Memories</span>
            </button>
          </div>
        </div>
      </div>
    );
}
