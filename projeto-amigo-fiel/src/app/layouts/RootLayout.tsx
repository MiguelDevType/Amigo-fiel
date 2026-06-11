import { Outlet, useLocation } from 'react-router';
import { Header } from '../components/Header';

export function RootLayout() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}