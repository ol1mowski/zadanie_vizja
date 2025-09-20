import React from 'react';

interface LegalLink {
  label: string;
  href: string;
}

const legalLinks: LegalLink[] = [
  { label: 'Polityka prywatności', href: '/privacy' },
  { label: 'Regulamin', href: '/terms' },
  { label: 'Pomoc', href: '/help' }
];

export const FooterBottom: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-200 mt-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {currentYear} Portal Rezerwacji Wizyt. Wszystkie prawa zastrzeżone.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {legalLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
