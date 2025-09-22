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
};

export const VisitFields: React.FC<Props> = ({ date, time, topic, description, timeOptions, minDate, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data wizyty *</label>
          <input type="date" name="date" value={date} onChange={onChange} min={minDate} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Godzina wizyty *</label>
          <select name="time" value={time} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Wybierz godzinę</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Temat wizyty *</label>
        <input type="text" name="topic" value={topic} onChange={onChange} required maxLength={500} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <SecureTextArea
        name="description"
        label="Opis wizyty *"
        value={description}
        required
        rows={4}
        maxLength={2000}
        onValueChange={(name, value) =>
          onChange({ target: { name, value } } as unknown as React.ChangeEvent<HTMLTextAreaElement>)
        }
      />
    </>
  );
};


