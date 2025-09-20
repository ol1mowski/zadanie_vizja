import React from 'react';
import { CalendarIcon } from '../../icons';

export const FooterLogo: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <CalendarIcon className="h-8 w-8 text-blue-400" />
        <h3 className="ml-2 text-xl font-bold">Portal Rezerwacji Wizyt</h3>
      </div>
      <p className="text-gray-600 text-sm">
        Internetowy system rezerwacji wizyt dla studentów, kandydatów i pracowników. 
        Zarządzaj swoimi spotkaniami w prosty i intuicyjny sposób.
      </p>
    </div>
  );
};
