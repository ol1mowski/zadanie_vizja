import { useCallback, useState } from 'react';
import type { LoginFormData, LoginFormErrors } from '../types/LoginForm.types';

export const useLoginForm = (userType: 'student' | 'admin') => {
  const [formData, setFormData] = useState<LoginFormData>({
    password: '',
    userType,
    ...(userType === 'student' ? { albumNumber: '' } : { email: '' })
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.password.trim()) newErrors.password = 'Hasło jest wymagane';
    else if (formData.password.length < 6) newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';

    if (formData.userType === 'student') {
      if (!formData.albumNumber?.trim()) newErrors.albumNumber = 'Numer albumu jest wymagany';
      else if (!/^\d{6,8}$/.test(formData.albumNumber.trim())) {
        newErrors.albumNumber = 'Numer albumu musi mieć 6-8 cyfr';
      }
    } else {
      if (!formData.email?.trim()) newErrors.email = 'E-mail jest wymagany';
      else if (!/^[^@]+@uczelnia\.[^@]+$/.test(formData.email.trim())) {
        newErrors.email = 'E-mail pracownika musi mieć domenę uczelnia.*';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.albumNumber, formData.password, formData.userType]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    onSubmit: (data: LoginFormData) => void,
    onClose: () => void
  ) => {
    e.preventDefault();
    if (validateForm()) {
      await Promise.resolve(onSubmit(formData));
      onClose();
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({
      password: '',
      userType,
      ...(userType === 'student' ? { albumNumber: '' } : { email: '' })
    });
    setErrors({});
  }, [userType]);

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm
  } as const;
};
