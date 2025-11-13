// Login types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Register types
export interface RegisterRequest {
  name: string;
  email: string;
  tel: string;
  role: string;
  password: string;
  createdAt: string;
}

export interface RegisterResponse {
  success: boolean;
  _id: string;
  name: string;
  email: string;
  token: string;
}

// User type
export interface User {
  _id: string;
  name: string;
  email: string;
  tel?: string;
  role: 'admin' | 'member';
  createdAt: string;
}
