import React from 'react';
import { UserType } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import { WelcomeComponent } from './components/WelcomeComponent.component';
import { StudentDashboard } from './components/StudentDashboard.component';
import { AdminDashboard } from './components/AdminDashboard.component';
import { CandidateDashboard } from './components/CandidateDashboard.component';

export const Dashboard: React.FC = () => {
  const { userType } = useUser();
  const renderDashboard = () => {
    switch (userType) {
      case UserType.UNAUTHENTICATED:
        return <WelcomeComponent />;
      case UserType.STUDENT:
        return <StudentDashboard />;
      case UserType.ADMIN:
        return <AdminDashboard />;
      case UserType.CANDIDATE:
        return <CandidateDashboard />;
      default:
        return <WelcomeComponent />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {renderDashboard()}
          </div>
        </div>
      </div>
    </div>
  );
};
