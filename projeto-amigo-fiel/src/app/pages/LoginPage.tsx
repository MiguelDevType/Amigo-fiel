import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Heart, Mail, Lock, User, Shield, Building2,
  Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Tab = 'user' | 'admin';
type UserMode = 'login' | 'register' | 'forgot';

const ADMIN_CREDENTIALS = { email: 'admin.gmail.com@teste', password: 'admin123' };
const ONG_CREDENTIALS   = { email: 'ong@amigofiel.com',     password: 'ong123'   };

// ─── tiny helpers ────────────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {msg}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function LoginPage() {
  const [activeTab, setActiveTab]   = useState<Tab>('user');
  const [userMode, setUserMode]     = useState<UserMode>('login');

  /* ---- user form fields ---- */
  const [userName,     setUserName]     = useState('');
  const [userEmail,    setUserEmail]    = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPwd,      setShowPwd]      = useState(false);
  const [userErrors,   setUserErrors]   = useState<Record<string, string>>({});
  const [touched,      setTouched]      = useState<Record<string, boolean>>({});

  /* ---- forgot-password flow ---- */
  const [forgotEmail,   setForgotEmail]   = useState('');
  const [forgotSent,    setForgotSent]    = useState(false);
  const [forgotError,   setForgotError]   = useState('');

  /* ---- admin form fields ---- */
  const [adminEmail,    setAdminEmail]    = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPwd,  setShowAdminPwd]  = useState(false);
  const [adminError,    setAdminError]    = useState('');

  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  // if we were redirected here from a protected page, go back after login
  const from = (location.state as { from?: string })?.from ?? '/';

  // ── validation helpers ─────────────────────────────────────────────────────
  const blurField = (name: string) => setTouched(t => ({ ...t, [name]: true }));

  const validateUserForm = () => {
    const errs: Record<string, string> = {};
    if (userMode === 'register' && !userName.trim())
      errs.name = 'Informe seu nome completo.';
    if (!userEmail.trim())
      errs.email = 'O e-mail é obrigatório.';
    else if (!isValidEmail(userEmail))
      errs.email = 'Digite um e-mail válido (ex: voce@email.com).';
    if (!userPassword)
      errs.password = 'A senha é obrigatória.';
    else if (userMode === 'register' && userPassword.length < 8)
      errs.password = 'A senha precisa ter pelo menos 8 caracteres.';
    return errs;
  };

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateUserForm();
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errs).length) { setUserErrors(errs); return; }
    setUserErrors({});
    const name = userMode === 'register'
      ? userName.trim()
      : (userEmail.split('@')[0] ?? 'Usuário');
    login({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: userEmail.trim(),
      role: 'user',
    });
    navigate(from, { replace: true });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) { setForgotError('Informe seu e-mail.'); return; }
    if (!isValidEmail(forgotEmail)) { setForgotError('Digite um e-mail válido.'); return; }
    // simulação: qualquer e-mail é "encontrado"
    setForgotSent(true);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (!adminEmail.trim() || !adminPassword) {
      setAdminError('Preencha o e-mail e a senha antes de continuar.');
      return;
    }
    if (!isValidEmail(adminEmail)) {
      setAdminError('O e-mail informado não parece válido. Verifique e tente novamente.');
      return;
    }
    if (adminEmail === ADMIN_CREDENTIALS.email && adminPassword === ADMIN_CREDENTIALS.password) {
      login({ name: 'Administrador', email: adminEmail, role: 'admin' });
      navigate('/admin');
    } else if (adminEmail === ONG_CREDENTIALS.email && adminPassword === ONG_CREDENTIALS.password) {
      login({ name: 'ONG Patinhas do Bem', email: adminEmail, role: 'admin' });
      navigate('/admin');
    } else {
      setAdminError('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.');
    }
  };

  // ── reusable input class ───────────────────────────────────────────────────
  const inputCls = (field: string) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border transition-colors focus:outline-none ${
      touched[field] && userErrors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 focus:border-[#2A9D8F]'
    }`;

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10" style={{ color: '#2A9D8F' }} fill="#2A9D8F" />
            <span className="text-2xl" style={{ color: '#2A9D8F' }}>Amigo Fiel</span>
          </div>
          <h2 className="text-3xl mb-2">
            {activeTab === 'admin'
              ? 'Acesso Restrito'
              : userMode === 'login'    ? 'Bem-vindo de volta'
              : userMode === 'register' ? 'Crie sua conta'
              : 'Recuperar Senha'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'admin'
              ? 'Área exclusiva para administradores e ONGs'
              : userMode === 'login'    ? 'Entre para continuar sua jornada'
              : userMode === 'register' ? 'Junte-se a nós para ajudar pets'
              : 'Enviaremos um link para o seu e-mail'}
          </p>
        </div>

        {/* Tab switcher — oculto na tela de recuperação */}
        {userMode !== 'forgot' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                activeTab === 'user' ? 'text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === 'user' ? { backgroundColor: '#2A9D8F' } : {}}
            >
              <User className="w-4 h-4" />
              Sou Adotante
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                activeTab === 'admin' ? 'text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === 'admin' ? { backgroundColor: '#2A9D8F' } : {}}
            >
              <Shield className="w-4 h-4" />
              Admin / ONG
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          {/* ═══════════════ USER TAB ═══════════════ */}
          {activeTab === 'user' && userMode !== 'forgot' && (
            <>
              {/* Social buttons */}
              <div className="space-y-3 mb-6">
                {['Google', 'Facebook'].map(p => (
                  <button
                    key={p}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[#2A9D8F] text-gray-700 transition-colors"
                  >
                    {p === 'Google' ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    <span>Continuar com {p}</span>
                  </button>
                ))}
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Ou com e-mail</span>
                </div>
              </div>

              <form onSubmit={handleUserSubmit} noValidate className="space-y-4">
                {/* Nome (só no registro) */}
                {userMode === 'register' && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Nome Completo *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={userName}
                        onChange={e => { setUserName(e.target.value); setUserErrors(err => ({ ...err, name: '' })); }}
                        onBlur={() => blurField('name')}
                        className={inputCls('name')}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <FieldError msg={touched.name ? userErrors.name : ''} />
                  </div>
                )}

                {/* E-mail */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={userEmail}
                      onChange={e => { setUserEmail(e.target.value); setUserErrors(err => ({ ...err, email: '' })); }}
                      onBlur={() => blurField('email')}
                      className={inputCls('email')}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <FieldError msg={touched.email ? userErrors.email : ''} />
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPwd ? 'text' : 'password'}
                      value={userPassword}
                      onChange={e => { setUserPassword(e.target.value); setUserErrors(err => ({ ...err, password: '' })); }}
                      onBlur={() => blurField('password')}
                      className={`${inputCls('password')} pr-10`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <FieldError msg={touched.password ? userErrors.password : ''} />
                  {userMode === 'register' && !userErrors.password && (
                    <p className="text-xs text-gray-400 mt-1.5">Mínimo de 8 caracteres.</p>
                  )}
                </div>

                {/* Lembrar / Esqueceu */}
                {userMode === 'login' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" className="w-4 h-4 accent-[#2A9D8F]" />
                      <span className="text-gray-600">Lembrar de mim</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => { setUserMode('forgot'); setForgotSent(false); setForgotError(''); setForgotEmail(''); }}
                      className="text-[#2A9D8F] hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all mt-2"
                  style={{ backgroundColor: '#F4A261' }}
                >
                  {userMode === 'login' ? 'Entrar' : 'Criar Conta'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                {userMode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                <button
                  type="button"
                  onClick={() => { setUserMode(userMode === 'login' ? 'register' : 'login'); setUserErrors({}); setTouched({}); }}
                  className="text-[#2A9D8F] hover:underline"
                >
                  {userMode === 'login' ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </>
          )}

          {/* ═══════════════ FORGOT PASSWORD ═══════════════ */}
          {activeTab === 'user' && userMode === 'forgot' && (
            <>
              <button
                type="button"
                onClick={() => setUserMode('login')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2A9D8F] mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </button>

              {!forgotSent ? (
                <>
                  <p className="text-gray-600 text-sm mb-6">
                    Informe o e-mail cadastrado na sua conta e enviaremos um link para você criar uma nova senha.
                  </p>

                  <form onSubmit={handleForgotSubmit} noValidate className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5">E-mail cadastrado *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={e => { setForgotEmail(e.target.value); setForgotError(''); }}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                            forgotError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#2A9D8F]'
                          }`}
                          placeholder="seu@email.com"
                        />
                      </div>
                      {forgotError && <FieldError msg={forgotError} />}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: '#2A9D8F' }}
                    >
                      Enviar link de recuperação
                    </button>
                  </form>
                </>
              ) : (
                /* ── Sucesso de envio ── */
                <div className="text-center py-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: '#f0faf9' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: '#2A9D8F' }} />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-800">E-mail enviado!</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Se o endereço <span className="text-gray-800">{forgotEmail}</span> estiver cadastrado, você receberá as instruções de recuperação em alguns minutos.
                  </p>
                  <p className="text-gray-400 text-xs mb-8">
                    Não recebeu? Verifique a pasta de spam ou tente novamente.
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setForgotSent(false)}
                      className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Tentar com outro e-mail
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserMode('login')}
                      className="w-full py-3 rounded-xl text-white text-sm"
                      style={{ backgroundColor: '#F4A261' }}
                    >
                      Voltar para o login
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════════════ ADMIN TAB ═══════════════ */}
          {activeTab === 'admin' && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl mb-6" style={{ backgroundColor: '#f0faf9' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2A9D8F' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2A9D8F' }}>Acesso Administrativo</p>
                  <p className="text-xs text-gray-500">Apenas pessoal autorizado e ONGs parceiras</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-700">
                <p className="mb-1"><strong>Demo — Credenciais de teste:</strong></p>
                <p>Admin: <span className="font-mono">admin.gmail.com@teste</span> / <span className="font-mono">admin123</span></p>
                <p>ONG: <span className="font-mono">ong@amigofiel.com</span> / <span className="font-mono">ong123</span></p>
              </div>

              <form onSubmit={handleAdminSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">E-mail institucional *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={e => { setAdminEmail(e.target.value); setAdminError(''); }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                      placeholder="admin.gmail.com@teste"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showAdminPwd ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={e => { setAdminPassword(e.target.value); setAdminError(''); }}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showAdminPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {adminError && (
                  <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    {adminError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#2A9D8F' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Acessar Painel
                  </div>
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-6">
                Problemas de acesso? Entre em contato com{' '}
                <a href="mailto:suporte@amigofiel.com" className="text-[#2A9D8F] hover:underline">
                  suporte@amigofiel.com
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
