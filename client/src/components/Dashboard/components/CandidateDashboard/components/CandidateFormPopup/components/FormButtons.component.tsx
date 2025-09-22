import React from 'react';
import { motion } from 'framer-motion';

interface FormButtonsProps {
  onClose: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ onClose }) => (
  <div className="flex justify-end space-x-4 pt-4 border-t">
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Anuluj
    </motion.button>
    <motion.button
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Zarezerwuj Wizytę
    </motion.button>
  </div>
);


