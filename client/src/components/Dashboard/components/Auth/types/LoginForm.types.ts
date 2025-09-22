export interface LoginFormData {
  email: string;
  password: string;
  userType: 'student' | 'admin';
}

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LoginFormData) => void;
  userType: 'student' | 'admin';
}
