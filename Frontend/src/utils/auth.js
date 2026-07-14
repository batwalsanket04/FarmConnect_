const AUTH_KEY = 'auth';
const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const USER_KEY = 'user';
const FARMER_ID_KEY = 'farmer_id';
const FARMER_TOKEN_KEY = 'farmerToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const normalizeAuthData = (authData = {}) => {
  const role = (authData.role || authData.userType || 'user').toString().trim().toLowerCase();
  const userType = (authData.userType || role).toString().trim().toLowerCase();

  return {
    token: authData.token || '',
    role,
    user: authData.user || null,
    farmer: authData.farmer || null,
    refreshToken: authData.refreshToken || '',
    userType,
  };
};

export const getStoredAuth = () => {
  if (typeof window === 'undefined') return null;

  try {
    const rawAuth = window.localStorage.getItem(AUTH_KEY);
    if (!rawAuth) return null;
    return normalizeAuthData(JSON.parse(rawAuth));
  } catch {
    return null;
  }
};

export const setStoredAuth = (authData = {}) => {
  if (typeof window === 'undefined') return;

  const normalizedAuth = normalizeAuthData(authData);

  window.localStorage.setItem(AUTH_KEY, JSON.stringify(normalizedAuth));
  window.localStorage.setItem(TOKEN_KEY, normalizedAuth.token);
  window.localStorage.setItem(ROLE_KEY, normalizedAuth.role);

  if (normalizedAuth.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, normalizedAuth.refreshToken);
  } else {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  if (normalizedAuth.user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(normalizedAuth.user));
  } else {
    window.localStorage.removeItem(USER_KEY);
  }

  if (normalizedAuth.farmer?.id) {
    window.localStorage.setItem(FARMER_ID_KEY, String(normalizedAuth.farmer.id));
  } else {
    window.localStorage.removeItem(FARMER_ID_KEY);
  }

  if (normalizedAuth.role === 'farmer') {
    window.localStorage.setItem(FARMER_TOKEN_KEY, normalizedAuth.token);
  } else {
    window.localStorage.removeItem(FARMER_TOKEN_KEY);
  }
};

export const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(AUTH_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(FARMER_ID_KEY);
  window.localStorage.removeItem(FARMER_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = () => Boolean(getStoredAuth()?.token);
export const getAuthRole = () => getStoredAuth()?.role || null;
