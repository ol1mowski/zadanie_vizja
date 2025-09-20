import React from 'react';
import { CalendarIcon } from '../../icons';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center">
        <CalendarIcon className="h-8 w-8 text-blue-600" />
        <h1 className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
          Portal Rezerwacji Wizyt
        </h1>
        <h1 className="ml-2 text-lg font-bold text-gray-900 sm:hidden">
          PRW
        </h1>
      </div>
    </div>
  );
};
