import React from 'react';

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Rezerwacja wizyty', href: '/reservation' },
  { label: 'Moje wizyty', href: '/my-appointments' },
  { label: 'Panel pracownika', href: '/employee-dashboard' }
];

export const FooterNavigation: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-blue-400">Nawigacja</h4>
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a 
              href={item.href} 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
