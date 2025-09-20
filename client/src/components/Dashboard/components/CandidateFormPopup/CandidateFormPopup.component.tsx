import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCandidateForm } from './CandidateFormPopup.hook';
import type { CandidateFormPopupProps } from './CandidateFormPopup.types';
import {
  FormHeader,
  FormButtons,
  PersonalInfoSection,
  ContactInfoSection,
  VisitDetailsSection,
  PreferredTimeSection
} from './CandidateFormPopup.components';

export const CandidateFormPopup: React.FC<CandidateFormPopupProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { formData, errors, handleInputChange, handleSubmit } = useCandidateForm();

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
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <FormHeader onClose={onClose} />
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <PersonalInfoSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                
                <ContactInfoSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                
                <VisitDetailsSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                
                <PreferredTimeSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                
                <FormButtons onClose={onClose} />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
