export interface User {
  name: string;
  email: string;
  role: string;
}

export interface HeaderProps {
  isAuthenticated?: boolean;
  user?: User | null;
}

export interface MenuState {
  isMobileMenuOpen: boolean;
  isUserMenuOpen: boolean;
}

export interface MenuActions {
  toggleMobileMenu: () => void;
  toggleUserMenu: () => void;
  closeMobileMenu: () => void;
  handleLogout: () => void;
}
