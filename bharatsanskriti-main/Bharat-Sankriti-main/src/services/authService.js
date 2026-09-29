// ============================================================
// BHARAT SANSKRITI - ROLE-BASED AUTHENTICATION SERVICE
// Supports Centralized Backend REST API with JWT Auth + LocalStorage Fallback
// Account Roles: USER (Devotee/Volunteer) & TEMPLE_ADMIN
// ============================================================

import { DEMO_TEMPLES } from '../data/heritageConnectData.js';
import apiClient, { setAuthToken } from './api/apiClient.js';

const USERS_STORAGE_KEY = 'bharat_sanskriti_users_v2';
const ADMINS_STORAGE_KEY = 'bharat_sanskriti_admins_v2';
const CURRENT_SESSION_KEY = 'bharat_sanskriti_current_account_v2';

// Standard Pre-configured Temple Administrator fallback
const DEFAULT_PRESET_ADMIN = {
  id: 'admin-ramappa-1',
  name: 'Venkata Ramana (Temple Admin)',
  email: 'admin@ramappa.org',
  password: 'admin123',
  role: 'temple_admin',
  location: 'Telangana, India',
  skills: ['Temple Administration', 'Heritage Trust Management'],
  availability: 'Full-time Temple Administration',
  bio: 'Temple Administrator & Heritage Trustee.',
  avatarInitial: 'T',
  joinedAt: '2026-06-01T09:00:00.000Z',
  templeProfile: {
    templeId: 'temple-ramappa',
    templeName: 'Ramappa Temple (Rudreshwara)',
    location: 'Palampet, Mulugu District, Telangana',
    deity: 'Lord Shiva (Ramalingeswara)',
    era: '1213 CE / Kakatiya Dynasty',
    contactDesignation: 'Executive Trustee'
  }
};

// ------------------------------------------------------------
// Registered Users Storage (Fallback)
// ------------------------------------------------------------
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving registered users to localStorage:', e);
  }
}

// ------------------------------------------------------------
// Temple Administrators Storage (Fallback)
// ------------------------------------------------------------
export function getTempleAdmins() {
  try {
    const raw = localStorage.getItem(ADMINS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify([DEFAULT_PRESET_ADMIN]));
      return [DEFAULT_PRESET_ADMIN];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify([DEFAULT_PRESET_ADMIN]));
      return [DEFAULT_PRESET_ADMIN];
    }
    return parsed;
  } catch (e) {
    return [DEFAULT_PRESET_ADMIN];
  }
}

function saveTempleAdmins(admins) {
  try {
    localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(admins));
  } catch (e) {
    console.error('Error saving temple admins to localStorage:', e);
  }
}

// ------------------------------------------------------------
// Current Session Management
// ------------------------------------------------------------
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function isLoggedIn() {
  return getCurrentUser() !== null;
}

export function isTempleAdmin() {
  const user = getCurrentUser();
  return user?.role === 'temple_admin' || user?.role === 'TEMPLE_ADMIN';
}

function setCurrentSession(account) {
  try {
    if (!account) {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    } else {
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(account));
    }
  } catch (e) {
    console.error('Error saving current session:', e);
  }
}

// ------------------------------------------------------------
// User Authentication (Create Account & Sign In)
// ------------------------------------------------------------

/**
 * Register a new real User account via API or fallback.
 */
export async function registerUser({
  name,
  email,
  password,
  location = 'Telangana, India',
  skills = ['Cultural Service', 'Documentation'],
  availability = 'Weekends',
  bio = 'Cultural enthusiast contributing to Bharat Sanskriti.'
}) {
  if (!name || name.trim() === '') {
    throw new Error('Full Name is required to create an account.');
  }
  if (!email || email.trim() === '') {
    throw new Error('Email address is required.');
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // Attempt backend API registration
    const res = await apiClient.post('/api/auth/register', {
      name: name.trim(),
      email: cleanEmail,
      password: password || 'user123',
      role: 'USER',
      location: location.trim() || 'Telangana, India',
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean),
      bio: bio.trim()
    });

    if (res.token && res.user) {
      setAuthToken(res.token);
      const sessionUser = {
        ...res.user,
        role: 'user', // UI expects lowercase
        avatarInitial: res.user.avatarInitial || name.trim().charAt(0).toUpperCase()
      };
      setCurrentSession(sessionUser);
      return sessionUser;
    }
  } catch (err) {
    if (err.data?.error) {
      throw err; // Re-throw validation / server errors if server replied
    }
    console.warn('API registerUser failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const users = getRegisteredUsers();
  const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const newUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    email: cleanEmail,
    password: password || 'user123',
    role: 'user',
    location: location.trim() || 'Telangana, India',
    skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean),
    availability: availability || 'Weekends',
    bio: bio.trim(),
    avatarInitial: name.trim().charAt(0).toUpperCase(),
    joinedAt: new Date().toISOString(),
    templeProfile: null
  };

  const updatedUsers = [newUser, ...users];
  saveRegisteredUsers(updatedUsers);
  setCurrentSession(newUser);
  return newUser;
}

/**
 * Log in using an existing registered User account.
 */
export async function loginUser({ email, password }) {
  if (!email || email.trim() === '') {
    throw new Error('Email address is required.');
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const res = await apiClient.post('/api/auth/login', {
      email: cleanEmail,
      password: password || 'user123'
    });

    if (res.token && res.user) {
      setAuthToken(res.token);
      const sessionUser = {
        ...res.user,
        role: res.user.role === 'TEMPLE_ADMIN' ? 'temple_admin' : 'user',
        avatarInitial: res.user.avatarInitial || res.user.name.charAt(0).toUpperCase()
      };
      setCurrentSession(sessionUser);
      return sessionUser;
    }
  } catch (err) {
    if (err.data?.error) {
      throw err;
    }
    console.warn('API loginUser failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const users = getRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    throw new Error('No user account found with this email. Please create an account first.');
  }

  if (password && user.password && user.password !== password) {
    throw new Error('Incorrect password. Please try again.');
  }

  setCurrentSession(user);
  return user;
}

// ------------------------------------------------------------
// Temple Administrator Authentication
// ------------------------------------------------------------

/**
 * Log in as Temple Administrator.
 */
export async function loginTempleAdmin({ email, password }) {
  if (!email || email.trim() === '') {
    throw new Error('Administrator Email is required.');
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const res = await apiClient.post('/api/auth/login', {
      email: cleanEmail,
      password: password || 'admin123'
    });

    if (res.token && res.user) {
      setAuthToken(res.token);
      const sessionUser = {
        ...res.user,
        role: 'temple_admin',
        avatarInitial: res.user.avatarInitial || res.user.name.charAt(0).toUpperCase(),
        templeProfile: res.user.templeProfile || {
          templeId: 'temple-ramappa',
          templeName: res.user.temple_name || 'Ramappa Temple',
          location: res.user.location || 'India',
          deity: 'Lord Shiva',
          era: '1213 CE / Kakatiya Dynasty',
          contactDesignation: 'Executive Trustee'
        }
      };
      setCurrentSession(sessionUser);
      return sessionUser;
    }
  } catch (err) {
    if (err.data?.error) {
      throw err;
    }
    console.warn('API loginTempleAdmin failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const admins = getTempleAdmins();
  const admin = admins.find(a => a.email.toLowerCase() === cleanEmail);
  if (!admin) {
    throw new Error('No Temple Administrator account found with this email.');
  }

  if (password && admin.password && admin.password !== password) {
    throw new Error('Incorrect administrator password.');
  }

  setCurrentSession(admin);
  return admin;
}

/**
 * Register a new Temple Administrator account.
 */
export async function registerTempleAdmin({
  name,
  email,
  password = 'admin123',
  templeName,
  location = 'India',
  deity = 'Lord Shiva',
  era = 'Ancient Heritage'
}) {
  if (!name || name.trim() === '') {
    throw new Error('Administrator Name is required.');
  }
  if (!email || email.trim() === '') {
    throw new Error('Administrator Email is required.');
  }
  if (!templeName || templeName.trim() === '') {
    throw new Error('Temple or Trust Name is required.');
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const res = await apiClient.post('/api/auth/register', {
      name: name.trim(),
      email: cleanEmail,
      password: password.trim() || 'admin123',
      role: 'TEMPLE_ADMIN',
      location: location.trim() || 'India',
      temple_name: templeName.trim(),
      skills: ['Temple Administration', 'Heritage Conservation', 'Volunteer Coordination'],
      bio: `Administrator for ${templeName.trim()}.`
    });

    if (res.token && res.user) {
      setAuthToken(res.token);
      const sessionUser = {
        ...res.user,
        role: 'temple_admin',
        avatarInitial: res.user.avatarInitial || name.trim().charAt(0).toUpperCase(),
        templeProfile: {
          templeId: `temple-${Date.now()}`,
          templeName: templeName.trim(),
          location: location.trim() || 'India',
          deity: deity.trim(),
          era: era.trim(),
          contactDesignation: 'Executive Trustee & Seva Supervisor'
        }
      };
      setCurrentSession(sessionUser);
      return sessionUser;
    }
  } catch (err) {
    if (err.data?.error) {
      throw err;
    }
    console.warn('API registerTempleAdmin failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const admins = getTempleAdmins();
  const existing = admins.find(a => a.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An administrator account with this email already exists. Please log in.');
  }

  const newAdmin = {
    id: `admin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    email: cleanEmail,
    password: password.trim() || 'admin123',
    role: 'temple_admin',
    location: location.trim() || 'Telangana, India',
    skills: ['Temple Administration', 'Heritage Conservation', 'Volunteer Coordination'],
    availability: 'Full-time Temple Administration',
    bio: `Administrator for ${templeName.trim()}.`,
    avatarInitial: name.trim().charAt(0).toUpperCase(),
    joinedAt: new Date().toISOString(),
    templeProfile: {
      templeId: `temple-${Date.now()}`,
      templeName: templeName.trim(),
      location: location.trim() || 'India',
      deity: deity.trim(),
      era: era.trim(),
      contactDesignation: 'Executive Trustee & Seva Supervisor'
    }
  };

  const updatedAdmins = [newAdmin, ...admins];
  saveTempleAdmins(updatedAdmins);
  setCurrentSession(newAdmin);
  return newAdmin;
}

// ------------------------------------------------------------
// Session Updates & Logout
// ------------------------------------------------------------
export function updateUserProfile(updates) {
  const current = getCurrentUser();
  if (!current) return null;

  const updated = {
    ...current,
    ...updates,
    avatarInitial: (updates.name || current.name).trim().charAt(0).toUpperCase()
  };

  setCurrentSession(updated);

  if (updated.role === 'temple_admin') {
    const admins = getTempleAdmins();
    const idx = admins.findIndex(a => a.id === updated.id);
    if (idx !== -1) {
      admins[idx] = updated;
      saveTempleAdmins(admins);
    }
  } else {
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      users[idx] = updated;
      saveRegisteredUsers(users);
    }
  }

  return updated;
}

export function logoutUser() {
  setAuthToken(null);
  setCurrentSession(null);
  return true;
}

/**
 * Quick switch between pre-configured accounts for testing
 */
export function switchRole(newRole, chosenTempleId = null) {
  if (newRole === 'temple_admin') {
    const temple = DEMO_TEMPLES.find(t => t.id === chosenTempleId) || DEMO_TEMPLES[4];
    const admins = getTempleAdmins();
    const existing = admins.find(a => a.templeProfile?.templeId === temple.id) || admins[0];
    setCurrentSession(existing);
    return existing;
  } else {
    const users = getRegisteredUsers();
    if (users.length > 0) {
      setCurrentSession(users[0]);
      return users[0];
    } else {
      logoutUser();
      return null;
    }
  }
}
