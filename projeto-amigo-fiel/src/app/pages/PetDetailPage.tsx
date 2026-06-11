import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Calendar, Ruler, User, Heart, Clock, Scissors, LogIn, Lock, ArrowUp } from 'lucide-react';
import { pets } from '../data/pets';
import { AdoptionModal } from '../components/AdoptionModal';
import { useAuth } from '../context/AuthContext';

export function PetDetailPage() {
  const { id }                                = useParams();
  const navigate                              = useNavigate();
  const { isLoggedIn }                        = useAuth();
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showLoginPrompt,   setShowLoginPrompt]   = useState(false);

  const pet = pets.find(p => p.id === id);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Pet não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: '#F4A261', color: 'white' }}
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const sizeLabels   = { small: 'Pequeno', medium: 'Médio', large: 'Grande' };
  const genderLabels = { male: 'Macho', female: 'Fêmea' };

  const handleAdoptClick = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    } else {
      setShowAdoptionModal(true);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#2A9D8F] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 p-8 items-start">

            {/* Photo Gallery — rola normalmente */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              {pet.gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {pet.gallery.slice(0, 3).map((img, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={img} alt={`${pet.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Details — fixo na tela no desktop */}
            <div className="flex flex-col lg:sticky lg:top-20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl mb-2">{pet.name}</h1>
                  <p className="text-xl text-gray-600">{pet.breed}</p>
                </div>
                {pet.status === 'adopted' && (
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">Adotado</span>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: '#2A9D8F' }} />
                  <p className="text-sm text-gray-600 mb-1">Idade</p>
                  <p>{pet.age} {pet.age === 1 ? 'ano' : 'anos'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Ruler className="w-6 h-6 mx-auto mb-2" style={{ color: '#2A9D8F' }} />
                  <p className="text-sm text-gray-600 mb-1">Tamanho</p>
                  <p>{sizeLabels[pet.size]}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <User className="w-6 h-6 mx-auto mb-2" style={{ color: '#2A9D8F' }} />
                  <p className="text-sm text-gray-600 mb-1">Gênero</p>
                  <p>{genderLabels[pet.gender]}</p>
                </div>
              </div>

              {/* Technical Data */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-sm text-gray-600 mb-4">Dados Técnicos</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Cor</span>
                    </div>
                    <span className="text-sm">{pet.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Castrado</span>
                    </div>
                    <span className="text-sm">{pet.neutered ? 'Sim' : 'Não'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Tempo no Abrigo</span>
                    </div>
                    <span className="text-sm">{pet.timeInShelter} {pet.timeInShelter === 1 ? 'mês' : 'meses'}</span>
                  </div>
                </div>
              </div>

              {/* Temperament */}
              <div className="mb-8">
                <h3 className="text-sm text-gray-600 mb-3">Temperamento</h3>
                <div className="flex flex-wrap gap-2">
                  {pet.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: '#E6F5F3', color: '#2A9D8F' }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-600 mb-3">Sobre {pet.name}</h3>
                <p className="text-gray-700 leading-relaxed">{pet.description}</p>
              </div>

              {/* History */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-gray-600">História</h3>
                  <button
                    onClick={scrollToTop}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all hover:shadow-sm"
                    style={{ backgroundColor: '#E6F5F3', color: '#2A9D8F' }}
                  >
                    <ArrowUp className="w-3 h-3" />
                    Voltar ao topo
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{pet.history}</p>
              </div>

              {/* Adopt Button */}
              <button
                disabled={pet.status === 'adopted'}
                onClick={handleAdoptClick}
                className="w-full py-4 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                style={{ backgroundColor: '#F4A261' }}
              >
                {pet.status === 'adopted' ? 'Pet já foi adotado' : 'Quero Adotar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: '#fff7f0' }}
            >
              <Lock className="w-8 h-8" style={{ color: '#F4A261' }} />
            </div>
            <h3 className="text-xl mb-2 text-gray-800">Faça login para continuar</h3>
            <p className="text-gray-500 text-sm mb-6">
              Para solicitar a adoção de <strong>{pet.name}</strong> você precisa ter uma conta. É rápido e gratuito!
            </p>
            <div className="space-y-3">
              <Link
                to="/login"
                state={{ from: `/pet/${pet.id}` }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#F4A261' }}
                onClick={() => setShowLoginPrompt(false)}
              >
                <LogIn className="w-4 h-4" />
                Entrar / Cadastrar
              </Link>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adoption modal */}
      {showAdoptionModal && (
        <AdoptionModal
          petName={pet.name}
          onClose={() => setShowAdoptionModal(false)}
        />
      )}
    </div>
  );
}
