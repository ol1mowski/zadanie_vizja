import { useCallback, useState } from 'react';

export interface AdminLoginData {
  email: string;
  password: string;
  userType: 'admin';
}

export interface AdminLoginErrors {
  email?: string;
  password?: string;
  server?: string;
}

export const useAdminLogin = () => {
  const [formData, setFormData] = useState<AdminLoginData>({
    email: '',
    password: '',
    userType: 'admin'
  });

  const [errors, setErrors] = useState<AdminLoginErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: AdminLoginErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail jest wymagany';
    } else if (!/^[^@]+@uczelnia\.[^@]+$/.test(formData.email.trim())) {
      newErrors.email = 'E-mail pracownika musi mieć domenę uczelnia.*';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof AdminLoginErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear server error when user starts typing
    if (errors.server) {
      setErrors((prev) => ({
        ...prev,
        server: undefined
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    onSubmit: (data: AdminLoginData) => void,
    onClose: () => void
  ) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
        onClose();
      } catch (error) {
        // Handle server error
        const errorMessage = error instanceof Error ? error.message : 'Wystąpił błąd podczas logowania';
        setErrors(prev => ({ ...prev, server: errorMessage }));
        console.error('Admin login error:', error);
      }
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      userType: 'admin'
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm
  } as const;
};
