import type { User } from '../types/types';

export const MOCK_USER: User = {
  name: 'Jan Kowalski',
  email: 'jan.kowalski@example.com',
  role: 'Student'
};

export const MOBILE_MENU_MAX_HEIGHT = 'max-h-96';
export const MOBILE_MENU_MIN_HEIGHT = 'max-h-0';

export const ANIMATION_DURATION = {
  FAST: 'duration-150',
  NORMAL: 'duration-200',
  SLOW: 'duration-300'
} as const;

export const COMMON_CLASSES = {
  BUTTON_BASE: 'transition-all duration-200 transform hover:scale-105',
  LINK_BASE: 'transition-all duration-200 transform hover:scale-105',
  MOBILE_MENU_BASE: 'md:hidden mobile-menu transition-all duration-300 ease-in-out overflow-hidden'
} as const;
