import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
      <UserProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Dashboard />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
  );
};

export default App
