// src/types/auth.ts

// Request body for login
export interface LoginRequest {
  email: string;
  password: string;
}

// Response from login API
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add other fields your API returns
  };
}
