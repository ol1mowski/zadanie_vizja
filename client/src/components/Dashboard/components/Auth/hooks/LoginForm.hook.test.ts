import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './LoginForm.hook';
import { vi, describe, it, expect } from 'vitest';


describe('useLoginForm', () => {
  it('waliduje puste pola i ustawia błędy', () => {
    const { result } = renderHook(() => useLoginForm('student'));
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    act(() => {
      void result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(result.current.errors.email).toBe('Login jest wymagany');
    expect(result.current.errors.password).toBe('Hasło jest wymagane');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('wysyła poprawny formularz i resetuje po zamknięciu', async () => {
    const { result } = renderHook(() => useLoginForm('admin'));

    act(() => {
      result.current.handleInputChange({ target: { name: 'email', value: 'a@b.c' } } as unknown as React.ChangeEvent<HTMLInputElement>);
      result.current.handleInputChange({ target: { name: 'password', value: 'secret6' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    const onSubmit = vi.fn();
    const onClose = vi.fn();

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent, onSubmit, onClose);
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret6', userType: 'admin' });
    expect(onClose).toHaveBeenCalled();

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({ email: '', password: '', userType: 'admin' });
  });
});


