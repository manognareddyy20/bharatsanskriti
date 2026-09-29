// ============================================================
// BHARAT SANSKRITI - INDEXEDDB AUDIO STORAGE SERVICE
// Stores real recorded audio Blobs persistently across page reloads.
// Guarantees that user microphone recordings survive browser refresh.
// ============================================================

const DB_NAME = 'bharat_sanskriti_audio_db';
const DB_VERSION = 1;
const STORE_NAME = 'audio_recordings';

/**
 * Open or initialize the IndexedDB database
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Save an audio Blob with a unique identifier
 * @param {string} id - Unique identifier (e.g., story ID)
 * @param {Blob} audioBlob - Recorded audio Blob from MediaRecorder
 * @param {string} mimeType - e.g. 'audio/webm'
 * @returns {Promise<string>} - The ID
 */
export async function saveAudioBlob(id, audioBlob, mimeType = 'audio/webm') {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record = {
        id,
        blob: audioBlob,
        mimeType: mimeType || audioBlob.type || 'audio/webm',
        size: audioBlob.size,
        savedAt: new Date().toISOString()
      };

      const request = store.put(record);

      request.onsuccess = () => {
        resolve(id);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.error('Error saving audio blob to IndexedDB:', err);
    throw err;
  }
}

/**
 * Get an audio Blob by its ID
 * @param {string} id
 * @returns {Promise<Blob|null>}
 */
export async function getAudioBlob(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result && request.result.blob) {
          resolve(request.result.blob);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn(`Could not retrieve audio for ${id} from IndexedDB:`, err);
    return null;
  }
}

/**
 * Get a playable Object URL for a stored audio blob
 * @param {string} id
 * @returns {Promise<string|null>}
 */
export async function getAudioBlobUrl(id) {
  const blob = await getAudioBlob(id);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

/**
 * Delete an audio Blob from IndexedDB
 * @param {string} id
 */
export async function deleteAudioBlob(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn(`Could not delete audio for ${id}:`, err);
    return false;
  }
}
