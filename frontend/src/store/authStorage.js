const STORAGE_KEY = 'auth';

export const loadAuthFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveAuthToStorage = (authState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  } catch {
    // ignore
  }
};

export const clearAuthStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

const COOKIE_NAME = 'auth_token';

export const setAuthCookie = (token, maxAgeSeconds = 60 * 60 * 24 * 7) => {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
};

export const clearAuthCookie = () => {
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
};
