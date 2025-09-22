import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
      <UserProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Dashboard />
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </UserProvider>
  );
};

export default App
