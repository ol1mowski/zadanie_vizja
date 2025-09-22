import { Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeComponent } from './components/Shared/WelcomeComponent.component';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard.component';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard.component';
import { CandidateDashboard } from './components/CandidateDashboard/CandidateDashboard.component';
import { ProtectedRoute } from '../ProtectedRoute';
import { UserType } from '../../types/user';

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Routes>
              <Route path="/" element={<WelcomeComponent />} />
              <Route path="/student" element={
                <ProtectedRoute requiredRole={UserType.STUDENT}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole={UserType.ADMIN}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate" element={<CandidateDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
