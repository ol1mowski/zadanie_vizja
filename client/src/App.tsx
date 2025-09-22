import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast/ToastProvider';
import { ToastContainer } from './components/Toast/ToastContainer';

const App: React.FC = () => {
  return (
      <UserProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <ToastProvider>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main>
                  <Dashboard />
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </ToastProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </UserProvider>
  );
};

export default App
