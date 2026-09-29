// ============================================================
// BHARAT SANSKRITI - FRONTEND API CLIENT
// Wrapper around fetch API with JWT auth header injection & fallback detection
// ============================================================

const API_BASE_URL = ''; // Relative path, rely on Vite proxy /api or direct localhost

/**
 * Get JWT token stored in localStorage
 */
export function getAuthToken() {
  try {
    return localStorage.getItem('bharat_sanskriti_token') || null;
  } catch (e) {
    return null;
  }
}

/**
 * Save JWT token into localStorage
 */
export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem('bharat_sanskriti_token', token);
    } else {
      localStorage.removeItem('bharat_sanskriti_token');
    }
  } catch (e) {
    console.error('Error saving auth token:', e);
  }
}

/**
 * Universal API Request Handler
 */
export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.error || data.message || `HTTP error ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If request failed because network or server is offline
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      console.warn(`[ApiClient] Network connection failed for ${endpoint}. Fallback mode active.`);
    }
    throw err;
  }
}

export const apiClient = {
  get: (endpoint, headers) => apiRequest(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
  put: (endpoint, body, headers) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body), headers }),
  patch: (endpoint, body, headers) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(body), headers }),
  delete: (endpoint, headers) => apiRequest(endpoint, { method: 'DELETE', headers })
};

export default apiClient;
