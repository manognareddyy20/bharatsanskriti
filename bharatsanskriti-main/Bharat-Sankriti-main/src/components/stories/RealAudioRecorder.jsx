import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, RotateCcw, AlertCircle, Volume2, CheckCircle } from 'lucide-react';

export default function RealAudioRecorder({ onRecordingComplete, onReset }) {
  // Recording states: 'idle' | 'recording' | 'recorded'
  const [recorderState, setRecorderState] = useState('idle');
  const [durationSec, setDurationSec] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [micError, setMicError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const streamRef = useRef(null);

  // Clean up streams on unmount
  useEffect(() => {
    return () => {
      stopTracks();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setMicError('');
    setAudioBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    audioChunksRef.current = [];
    setDurationSec(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser.');
      }

      // Request real microphone audio stream from user
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        // Stop microphone hardware tracks immediately
        stopTracks();

        if (audioChunksRef.current.length > 0) {
          const finalBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(finalBlob);
          setAudioBlob(finalBlob);
          setPreviewUrl(url);
          setRecorderState('recorded');

          if (onRecordingComplete) {
            onRecordingComplete({
              blob: finalBlob,
              url: url,
              durationSec: durationSec,
              durationFormatted: formatTimer(durationSec)
            });
          }
        }
      };

      recorder.start(250); // collect in 250ms chunks
      setRecorderState('recording');

      timerIntervalRef.current = setInterval(() => {
        setDurationSec((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone error:', err);
      setMicError('Microphone permission is required to record your story. Please enable microphone permissions in your browser settings.');
      setRecorderState('idle');
      stopTracks();
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const resetRecording = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    stopTracks();
    setAudioBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    audioChunksRef.current = [];
    setDurationSec(0);
    setRecorderState('idle');
    setMicError('');
    if (onReset) onReset();
  };

  return (
    <div className="real-audio-recorder-widget">
      {micError && (
        <div className="recorder-error-alert" role="alert">
          <AlertCircle size={18} />
          <span>{micError}</span>
        </div>
      )}

      {/* STATE 1: IDLE */}
      {recorderState === 'idle' && (
        <div className="recorder-box idle-box">
          <div className="recorder-mic-circle">
            <Mic size={32} className="mic-icon-gold" />
          </div>
          <h4 className="recorder-heading">Record Real Cultural Story</h4>
          <p className="recorder-subtext">
            Use your real microphone to record stories, songs, and traditions spoken by elders.
          </p>
          <button 
            type="button" 
            className="btn-start-record"
            onClick={startRecording}
          >
            <Mic size={18} />
            <span>Start Recording</span>
          </button>
        </div>
      )}

      {/* STATE 2: RECORDING */}
      {recorderState === 'recording' && (
        <div className="recorder-box recording-box">
          <div className="recording-live-indicator">
            <span className="red-pulse-dot" />
            <span className="live-rec-text">🔴 Recording Real Audio</span>
          </div>

          <div className="recording-timer-display">
            {formatTimer(durationSec)}
          </div>

          <p className="recording-hint-text">
            Speak into your microphone clearly. When finished sharing your cultural memory, click stop.
          </p>

          <button 
            type="button" 
            className="btn-stop-record"
            onClick={stopRecording}
          >
            <Square size={18} />
            <span>Stop Recording</span>
          </button>
        </div>
      )}

      {/* STATE 3: RECORDED PREVIEW */}
      {recorderState === 'recorded' && previewUrl && (
        <div className="recorder-box recorded-box">
          <div className="recorded-success-tag">
            <CheckCircle size={16} />
            <span>Microphone Audio Captured Successfully ({formatTimer(durationSec)})</span>
          </div>

          {/* Native HTML5 Audio Player with real voice */}
          <div className="recorded-audio-playback">
            <audio controls src={previewUrl} className="real-audio-player">
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="recorded-actions-row">
            <button 
              type="button" 
              className="btn-rerecord"
              onClick={resetRecording}
            >
              <RotateCcw size={15} />
              <span>Record Again</span>
            </button>
            <span className="recorder-ready-note">
              ✓ Ready to save into archive
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
