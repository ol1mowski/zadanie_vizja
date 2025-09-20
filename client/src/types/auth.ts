export type UserRole = 'student' | 'candidate' | 'employee' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  studentNumber?: string; // tylko dla studentów
  department?: string; // tylko dla pracowników
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  roles: UserRole[];
  icon?: string;
}
