import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './LoginForm.hook';
import { vi, describe, it, expect } from 'vitest';


describe('useLoginForm', () => {
  it('waliduje puste pola i ustawia błędy (admin: email + hasło)', () => {
    const { result } = renderHook(() => useLoginForm('admin'));
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    act(() => {
      void result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(result.current.errors.email).toBe('E-mail jest wymagany');
    expect(result.current.errors.password).toBe('Hasło jest wymagane');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('waliduje puste pola i ustawia błędy (student: album + hasło)', () => {
    const { result } = renderHook(() => useLoginForm('student'));
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    act(() => {
      void result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(result.current.errors.albumNumber).toBe('Numer albumu jest wymagany');
    expect(result.current.errors.password).toBe('Hasło jest wymagane');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('wysyła poprawny formularz (admin) i resetuje po zamknięciu', async () => {
    const { result } = renderHook(() => useLoginForm('admin'));

    act(() => {
      result.current.handleInputChange({ target: { name: 'email', value: 'jan@uczelnia.pl' } } as unknown as React.ChangeEvent<HTMLInputElement>);
      result.current.handleInputChange({ target: { name: 'password', value: 'secret6' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    const onSubmit = vi.fn();
    const onClose = vi.fn();

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'jan@uczelnia.pl', password: 'secret6', userType: 'admin' });
    expect(onClose).toHaveBeenCalled();

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({ email: '', password: '', userType: 'admin' });
  });

  it('wysyła poprawny formularz (student) i resetuje po zamknięciu', async () => {
    const { result } = renderHook(() => useLoginForm('student'));

    act(() => {
      result.current.handleInputChange({ target: { name: 'albumNumber', value: '123456' } } as unknown as React.ChangeEvent<HTMLInputElement>);
      result.current.handleInputChange({ target: { name: 'password', value: 'secret6' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    const onSubmit = vi.fn();
    const onClose = vi.fn();

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(onSubmit).toHaveBeenCalledWith({ albumNumber: '123456', password: 'secret6', userType: 'student' });
    expect(onClose).toHaveBeenCalled();

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({ albumNumber: '', password: '', userType: 'student' });
  });
});


