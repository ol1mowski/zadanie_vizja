import React from 'react';
import { SecureTextArea } from '../../../../../../Form/SecureTextArea.component';

type Props = {
  date: string;
  time: string;
  topic: string;
  description: string;
  timeOptions: string[];
  minDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  fieldErrors: Partial<Record<string, string>>;
};

export const VisitFields: React.FC<Props> = ({ date, time, topic, description, timeOptions, minDate, onChange, fieldErrors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data wizyty *</label>
          <input 
            type="date" 
            name="date" 
            value={date} 
            onChange={onChange} 
            min={minDate} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`} 
          />
          {fieldErrors.date && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.date}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Godzina wizyty *</label>
          <select 
            name="time" 
            value={time} 
            onChange={onChange} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.time ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Wybierz godzinę</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {fieldErrors.time && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.time}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Temat wizyty *</label>
        <input 
          type="text" 
          name="topic" 
          value={topic} 
          onChange={onChange} 
          maxLength={500} 
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            fieldErrors.topic ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`} 
        />
        {fieldErrors.topic && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.topic}</p>
        )}
      </div>

      <SecureTextArea
        name="description"
        label="Opis wizyty *"
        value={description}
        rows={4}
        maxLength={2000}
        error={fieldErrors.description}
        onValueChange={(name, value) =>
          onChange({ target: { name, value } } as unknown as React.ChangeEvent<HTMLTextAreaElement>)
        }
      />
    </>
  );
};


