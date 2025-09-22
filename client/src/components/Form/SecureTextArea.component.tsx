import { useEffect, useState } from 'react';

type SecureTextAreaProps = {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  onValueChange: (name: string, value: string) => void;
};

const sanitizeText = (input: string): string => {
  const withoutTags = input.replace(/<[^>]*>/g, '');
  return withoutTags.replace(/\s+/g, ' ').trimStart();
};

export const SecureTextArea: React.FC<SecureTextAreaProps> = ({
  name,
  label,
  value,
  placeholder,
  required = false,
  rows = 4,
  maxLength = 2000,
  disabled = false,
  className = '',
  onValueChange,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? '');

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.target.value;
    const sanitized = sanitizeText(raw).slice(0, maxLength);
    setInternalValue(sanitized);
    onValueChange(name, sanitized);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const sanitized = sanitizeText(text);
    const next = (internalValue + ' ' + sanitized).slice(0, maxLength);
    setInternalValue(next);
    onValueChange(name, next);
  };

  const remaining = Math.max(0, maxLength - (internalValue?.length ?? 0));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}{required ? ' *' : ''}</label>
      <textarea
        name={name}
        value={internalValue}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${className}`}
      />
      <div className="mt-1 text-xs text-gray-500 text-right">Pozostało znaków: {remaining}</div>
    </div>
  );
};


