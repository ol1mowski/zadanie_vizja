import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeComponent } from './components/WelcomeComponent.component';
import { StudentDashboard } from './components/StudentDashboard.component';
import { AdminDashboard } from './components/AdminDashboard.component';
import { CandidateDashboard } from './components/CandidateDashboard.component';

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Routes>
              <Route path="/" element={<WelcomeComponent />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/candidate" element={<CandidateDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
