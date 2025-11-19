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
  id: string; // Added for NextAuth compatibility
  _id: string;
  name: string;
  email: string;
  tel?: string;
  role: 'admin' | 'member';
  createdAt: string;
}

// AuthorizedUser type for NextAuth's authorize function
export interface AuthorizedUser extends User {
  token: string;
  success: boolean;
  iat: number;
  exp: number;
  jti: string;
}

// Get Me types
export interface GetMeResponse {
  success: boolean;
  data: User;
}
