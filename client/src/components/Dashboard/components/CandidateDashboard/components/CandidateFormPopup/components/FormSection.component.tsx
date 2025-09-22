import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  children, 
  bgColor = 'bg-gray-50' 
}) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {title}
    </h3>
    {children}
  </div>
);


