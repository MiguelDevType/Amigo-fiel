import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Heart, Settings, User as UserIcon, Menu, X, ClipboardList, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  // Links visíveis para todos (incluindo visitantes e usuários)
  const publicLinks = [
    { to: '/home', label: 'Início' },
    { to: '/search', label: 'Buscar' },
    { to: '/contact', label: 'Contato' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8" style={{ color: '#2A9D8F' }} fill="#2A9D8F" />
            <span className="text-xl" style={{ color: '#2A9D8F' }}>
              Amigo Fiel
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#2A9D8F]'
                    : 'text-gray-600 hover:text-[#2A9D8F]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Exclusivo para Admin */}
            {isAdmin && (
              <>
                <Link
                  to="/use-cases"
                  className={`flex items-center gap-1.5 transition-colors ${
                    location.pathname === '/use-cases'
                      ? 'text-[#2A9D8F]'
                      : 'text-gray-600 hover:text-[#2A9D8F]'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  Casos de Uso
                </Link>

                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 transition-colors ${
                    location.pathname.startsWith('/admin')
                      ? 'text-[#2A9D8F]'
                      : 'text-gray-600 hover:text-[#2A9D8F]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Dashboard
                </Link>
              </>
            )}

            {/* Não logado: botão Entrar */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:shadow-lg transition-all"
                style={{ backgroundColor: '#F4A261' }}
              >
                <UserIcon className="w-4 h-4" />
                Entrar
              </Link>
            )}

            {/* Logado: menu do usuário */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-[#2A9D8F] transition-all"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: isAdmin ? '#6366f1' : '#2A9D8F' }}
                  >
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700">{currentUser?.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-800">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500">{currentUser?.email}</p>
                      <span
                        className="mt-1 inline-block px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: isAdmin ? '#f5f3ff' : '#f0faf9',
                          color: isAdmin ? '#6366f1' : '#2A9D8F',
                        }}
                      >
                        {isAdmin ? 'Administrador' : 'Adotante'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da conta
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-gray-600" />
              : <Menu className="w-5 h-5 text-gray-600" />
            }
          </button>
        </div>

        {/* ── Mobile Nav ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {/* Usuário logado: info */}
            {isLoggedIn && (
              <div className="px-4 py-3 mb-2 rounded-xl mx-2" style={{ backgroundColor: '#f9fafb' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: isAdmin ? '#6366f1' : '#2A9D8F' }}
                  >
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{isAdmin ? 'Administrador' : 'Adotante'}</p>
                  </div>
                </div>
              </div>
            )}

            {publicLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl mx-2 transition-colors ${
                  location.pathname === link.to
                    ? 'bg-[#f0faf9] text-[#2A9D8F]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Exclusivo Admin no mobile */}
            {isAdmin && (
              <>
                <Link
                  to="/use-cases"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl mx-2 transition-colors ${
                    location.pathname === '/use-cases'
                      ? 'bg-[#f0faf9] text-[#2A9D8F]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  Casos de Uso
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl mx-2 transition-colors ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-[#f0faf9] text-[#2A9D8F]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Dashboard
                </Link>
              </>
            )}

            <div className="px-4 pt-2 mx-2">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white"
                  style={{ backgroundColor: '#F4A261' }}
                >
                  <UserIcon className="w-4 h-4" />
                  Entrar
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair da conta
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fecha o menu de usuário ao clicar fora */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
