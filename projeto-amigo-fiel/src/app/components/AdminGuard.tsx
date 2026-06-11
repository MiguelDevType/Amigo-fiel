import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn } = useAuth();

  // Não logado → redireciona direto para login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logado, mas como usuário comum → tela de acesso negado
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: '#fff0f0' }}
          >
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl mb-2 text-gray-800">Acesso Negado</h2>
          <p className="text-gray-500 mb-6">
            Esta área é exclusiva para administradores e ONGs parceiras.
            Sua conta de adotante não tem permissão para acessar este painel.
          </p>
          <div className="space-y-3">
            <a
              href="/login"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white"
              style={{ backgroundColor: '#2A9D8F' }}
            >
              <Shield className="w-4 h-4" />
              Entrar como Admin / ONG
            </a>
            <a
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Voltar para a Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
