import { useState } from 'react';
import type { LoginFormData } from './LoginForm.types';

export const useLoginForm = (userType: 'student' | 'admin') => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    userType
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Login jest wymagany';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LoginFormData) => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev: Partial<LoginFormData>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent, onSubmit: (data: LoginFormData) => void, onClose: () => void) => {
    e.preventDefault();
    if (validateForm()) {
      await Promise.resolve(onSubmit(formData));
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      userType
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
