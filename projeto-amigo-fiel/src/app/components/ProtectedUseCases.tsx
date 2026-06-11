import { AdminGuard } from './AdminGuard';
import { UseCasesPage } from '../pages/UseCasesPage';

export function ProtectedUseCases() {
  return (
    <AdminGuard>
      <UseCasesPage />
    </AdminGuard>
  );
}
