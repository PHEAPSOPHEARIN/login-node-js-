// src/util/auth.ts

// Type for decoded JWT payload
export interface DecodedToken {
  exp?: number;
  iat?: number;
  email?: string;
  [key: string]: any;
}

// Get token from localStorage
export const getToken = (): string | null => {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    console.error("Failed to get token from localStorage", err);
    return null;
  }
};

// Save token to localStorage
export const setToken = (token: string) => {
  try {
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Failed to set token in localStorage", err);
  }
};

// Remove token from localStorage
export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    console.error("Failed to remove token from localStorage", err);
  }
};

// Decode JWT token safely
export const decodeToken = (token?: string): DecodedToken | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token?: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
