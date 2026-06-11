import { AdminGuard } from './AdminGuard';
import { AdminDashboard } from '../pages/AdminDashboard';

export function ProtectedAdmin() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
