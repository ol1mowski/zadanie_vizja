import React from 'react';

type Props = {
  date: string;
  time: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  timeOptions: string[];
  minDate: string;
};

export const DateTimeFields: React.FC<Props> = ({ date, time, onChange, timeOptions, minDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data wizyty *
        </label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={onChange}
          min={minDate}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Godzina wizyty *
        </label>
        <select
          name="time"
          value={time}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Wybierz godzinę</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
};


