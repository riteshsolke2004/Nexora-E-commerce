const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar?: string;
  role: string;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: User;
  };
}

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Save token to localStorage
const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove token from localStorage
const removeToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// API request helper
async function authRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Auth API Error:', error);
    throw error;
  }
}

// Signup
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await authRequest<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.data.token) {
    saveToken(response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response;
};

// Login
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await authRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.data.token) {
    saveToken(response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response;
};

// Get current user profile
export const getProfile = async (): Promise<{ success: boolean; data: User }> => {
  return await authRequest<{ success: boolean; data: User }>('/auth/me');
};

// Update profile
export const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; data: User }> => {
  const response = await authRequest<{ success: boolean; data: User }>('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });

  // Update localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response;
};

// Change password
export const changePassword = async (passwords: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  return await authRequest<{ success: boolean; message: string }>('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwords),
  });
};

// Logout
export const logout = (): void => {
  removeToken();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};
