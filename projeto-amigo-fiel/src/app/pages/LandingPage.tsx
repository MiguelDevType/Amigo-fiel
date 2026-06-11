import { useNavigate } from 'react-router';
import {
  Heart, PawPrint, Users, Shield, ArrowRight,
  Star, Home, CheckCircle,
} from 'lucide-react';

const stats = [
  { value: '1.200+', label: 'Pets Adotados' },
  { value: '340+',   label: 'ONGs Parceiras' },
  { value: '15k+',   label: 'Famílias Felizes' },
  { value: '98%',    label: 'Satisfação' },
];

const steps = [
  {
    icon: PawPrint,
    title: 'Conheça os pets',
    desc: 'Navegue pelo catálogo com fotos, personalidade e informações de cada animal disponível para adoção.',
  },
  {
    icon: Heart,
    title: 'Demonstre interesse',
    desc: 'Encontrou seu match? Envie uma solicitação de adoção em poucos cliques, sem burocracia.',
  },
  {
    icon: Home,
    title: 'Leve para casa',
    desc: 'Nossa equipe e as ONGs parceiras cuidam de todo o processo até seu novo amigo chegar em segurança.',
  },
];

const testimonials = [
  {
    name: 'Mariana Costa',
    text: 'Adotei a Mel pelo Amigo Fiel e foi a melhor decisão da minha vida. O processo foi super simples!',
    pet: 'Adotante da Mel 🐶',
  },
  {
    name: 'Carlos Andrade',
    text: 'Plataforma incrível! Encontrei o Milo em minutos. A ONG parceira foi muito atenciosa.',
    pet: 'Adotante do Milo 🐱',
  },
  {
    name: 'ONG Patinhas do Bem',
    text: 'Desde que nos cadastramos no Amigo Fiel, as adoções triplicaram. Ferramenta essencial para quem cuida de animais.',
    pet: 'Parceira ONG ❤️',
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #264653 100%)' }}
      >
        {/* decorative paws */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-10">
          {[...Array(12)].map((_, i) => (
            <PawPrint
              key={i}
              className="absolute text-white"
              style={{
                width: 40 + (i % 3) * 20,
                top: `${(i * 17) % 90}%`,
                left: `${(i * 13 + 5) % 95}%`,
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Plataforma de Adoção Responsável
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Todo pet merece<br />
            <span style={{ color: '#F4A261' }}>um lar com amor</span>
          </h1>

          <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            O Amigo Fiel conecta pets abandonados a famílias que querem dar uma nova chance.
            Simples, seguro e cheio de carinho.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4A261' }}
            >
              Ver Pets para Adoção
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}
            >
              Criar conta gratuita
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f8fffe' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold" style={{ color: '#2A9D8F' }}>{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTÓRIA ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Ícone visual */}
            <div className="flex justify-center">
              <div
                className="w-72 h-72 rounded-3xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e8f8f6 0%, #d0f0ec 100%)' }}
              >
                <div className="text-center">
                  <PawPrint className="w-24 h-24 mx-auto mb-4" style={{ color: '#2A9D8F' }} />
                  <p className="text-lg font-semibold" style={{ color: '#2A9D8F' }}>Amigo Fiel</p>
                  <p className="text-sm text-gray-500">Desde 2024</p>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#F4A261' }}>
                Nossa História
              </span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6 leading-tight">
                Nascemos de uma causa
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  O <strong style={{ color: '#2A9D8F' }}>Amigo Fiel</strong> surgiu em 2024 de uma ideia simples, mas poderosa:
                  usar a tecnologia para dar visibilidade aos animais abandonados e aproximá-los de quem
                  pode oferecer um lar.
                </p>
                <p>
                  Desenvolvido por estudantes apaixonados por animais e por inovação, o projeto nasceu
                  como trabalho acadêmico e cresceu para algo muito maior — uma plataforma que já conectou
                  mais de mil pets às suas famílias definitivas.
                </p>
                <p>
                  Trabalhamos em parceria com ONGs, abrigos e protetores independentes para garantir que
                  cada adoção seja feita com responsabilidade, transparência e muito amor.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Adoção Responsável', 'Bem-Estar Animal', 'Tecnologia Social'].map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#e8f8f6', color: '#2A9D8F' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fffe' }}>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#F4A261' }}>
            Simples assim
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-12">Como funciona?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: '#e8f8f6' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#2A9D8F' }} />
                  </div>
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: '#F4A261' }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#F4A261' }}>
              Histórias reais
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">Quem já adotou conta</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: '#F4A261' }} fill="#F4A261" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: '#2A9D8F' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #264653 100%)' }}
      >
        <div className="max-w-2xl mx-auto text-white">
          <Heart className="w-14 h-14 mx-auto mb-6 opacity-80" fill="currentColor" />
          <h2 className="text-4xl font-bold mb-4">Pronto para mudar uma vida?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Cada adoção é uma história de amor que começa aqui.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 mx-auto px-10 py-4 rounded-2xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: '#F4A261' }}
          >
            Encontrar meu pet
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
