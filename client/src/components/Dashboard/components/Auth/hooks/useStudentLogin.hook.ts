import { useCallback, useState } from 'react';

export interface StudentLoginData {
  albumNumber: string;
  password: string;
  userType: 'student';
}

export interface StudentLoginErrors {
  albumNumber?: string;
  password?: string;
  server?: string;
}

export const useStudentLogin = () => {
  const [formData, setFormData] = useState<StudentLoginData>({
    albumNumber: '',
    password: '',
    userType: 'student'
  });

  const [errors, setErrors] = useState<StudentLoginErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: StudentLoginErrors = {};

    if (!formData.albumNumber.trim()) {
      newErrors.albumNumber = 'Numer albumu jest wymagany';
    } else if (!/^\d{6,8}$/.test(formData.albumNumber.trim())) {
      newErrors.albumNumber = 'Numer albumu musi mieć 6-8 cyfr';
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
    
    if (errors[name as keyof StudentLoginErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    if (errors.server) {
      setErrors((prev) => ({
        ...prev,
        server: undefined
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    onSubmit: (data: StudentLoginData) => void,
    onClose: () => void
  ) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
        onClose();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Wystąpił błąd podczas logowania';
        setErrors(prev => ({ ...prev, server: errorMessage }));
        console.error('Student login error:', error);
      }
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({
      albumNumber: '',
      password: '',
      userType: 'student'
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
