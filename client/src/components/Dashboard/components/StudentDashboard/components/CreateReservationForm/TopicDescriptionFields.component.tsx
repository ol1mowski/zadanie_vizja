import React from 'react';
import { SecureTextArea } from '../../../../../../Form/SecureTextArea.component';

type Props = {
  topic: string;
  description?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const TopicDescriptionFields: React.FC<Props> = ({ topic, description = '', onChange }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Temat wizyty *
        </label>
        <input
          type="text"
          name="topic"
          value={topic}
          onChange={onChange}
          placeholder="Np. Konsultacje dotyczące pracy dyplomowej"
          required
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <SecureTextArea
        name="description"
        label="Opis wizyty (opcjonalnie)"
        value={description}
        placeholder="Dodatkowe informacje dotyczące wizyty..."
        rows={4}
        maxLength={2000}
        onValueChange={(name, value) =>
          onChange({
            target: { name, value },
          } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
        }
      />
    </>
  );
};


