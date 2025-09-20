import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { UserType } from './types/user';

const App: React.FC = () => {
  const currentUserType: UserType = UserType.UNAUTHENTICATED;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Dashboard userType={currentUserType} />
      </main>
      <Footer />
    </div>
  );
};

export default App
