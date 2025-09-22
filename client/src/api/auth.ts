const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export interface LoginRequest {
  username: string;
  password: string;
  userType: 'student' | 'admin';
}

export interface LoginResponse {
  username: string;
  role: string;
}

export interface UserInfo {
  username: string;
  role: string;
}

export interface StudentProfileData {
  username: string;
  studentAlbumNumber: string;
  email: string | null;
  role: string;
}

export interface AdminProfileData {
  username: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Login failed');
    }
    
    return response.json();
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  getCurrentUser: async (): Promise<UserInfo> => {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    
    return response.json();
  },

  getStudentProfile: async (): Promise<StudentProfileData> => {
    const response = await fetch(`${API_BASE}/api/auth/student/profile`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to get student profile');
    }
    
    return response.json();
  },

  getAdminProfile: async (): Promise<AdminProfileData> => {
    const response = await fetch(`${API_BASE}/api/auth/admin/profile`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to get admin profile');
    }
    
    return response.json();
  }
};
