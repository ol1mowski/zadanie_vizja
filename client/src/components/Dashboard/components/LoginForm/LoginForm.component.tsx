import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginForm } from './LoginForm.hook';
import type { LoginFormProps } from './LoginForm.types';
import {
  LoginFormHeader,
  LoginFormField,
  LoginFormButtons,
  LoginFormInfo
} from './LoginForm.components';

export const LoginForm: React.FC<LoginFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userType
}) => {
  const { formData, errors, handleInputChange, handleSubmit } = useLoginForm(userType);

  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, onSubmit, onClose);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <LoginFormHeader userType={userType} onClose={onClose} />
              
              <LoginFormInfo userType={userType} />
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <LoginFormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="Wprowadź swój email"
                  required
                />
                
                <LoginFormField
                  label="Hasło"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Wprowadź hasło"
                  required
                />
                
                <LoginFormButtons userType={userType} onClose={onClose} />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
