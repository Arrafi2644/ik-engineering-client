// localStorage utility for managing application data
// This is a temporary solution. Will be replaced with backend API calls soon.

export const storage = {
  get: (key: string, defaultValue: any = null) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  },

  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },
};
