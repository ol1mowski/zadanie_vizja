import React from 'react';
import { motion } from 'framer-motion';

interface FormHeaderProps {
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ onClose }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Rezerwacja Wizyty - Kandydat
    </h2>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="text-gray-400 hover:text-gray-600 transition-colors"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  </div>
);


