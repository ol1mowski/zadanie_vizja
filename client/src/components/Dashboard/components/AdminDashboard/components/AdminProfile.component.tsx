import React, { useEffect, useState } from 'react';
import { authApi, type AdminProfileData } from '../../../../../api/auth';
import { useToast } from '../../../../Toast/ToastProvider';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await authApi.getAdminProfile();
        setProfile(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Nie udało się pobrać profilu';
        setError(msg);
        showToast(msg, 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Ładowanie profilu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">{error}</div>
    );
  }

  if (!profile) {
    return <div className="text-center text-gray-500 p-8">Brak danych profilu</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profil pracownika</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {profile.role}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dane podstawowe */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Dane podstawowe
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Imię</div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                {profile.firstName || 'Nie podano'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Nazwisko</div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                {profile.lastName || 'Nie podano'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Login</div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md font-mono">
                {profile.username}
              </div>
            </div>
          </div>
        </div>

        {/* Dane kontaktowe */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Dane kontaktowe
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">E-mail</div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                {profile.email || 'Nie podano'}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Informacja</h4>
                  <div className="mt-1 text-sm text-blue-700">
                    Aby zmienić dane osobowe, skontaktuj się z administratorem systemu.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


