// Utility functions for authentication state management

export const getStoredAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('authToken');
};

export const getStoredUserEmail = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('userEmail');
};

export const storeAuthData = (token: string, email: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
  }
};

export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }
};

export interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}