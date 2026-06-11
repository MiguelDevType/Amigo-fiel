import { useState } from 'react';
import { Search } from 'lucide-react';
import { PetCard } from '../components/PetCard';
import { pets } from '../data/pets';

export function HomePage() {
  const [searchType, setSearchType] = useState<'all' | 'dog' | 'cat'>('all');

  const filteredPets = pets.filter(pet => {
    if (searchType === 'all') return true;
    return pet.type === searchType;
  });

  const availablePets = filteredPets.filter(pet => pet.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2A9D8F] to-[#21867a] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Encontre seu Amigo Fiel
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90">
              Milhares de animais esperando por um lar cheio de amor e carinho
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-3 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'all' | 'dog' | 'cat')}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 cursor-pointer"
                  >
                    <option value="all">Todos os pets</option>
                    <option value="dog">Cachorros</option>
                    <option value="cat">Gatos</option>
                  </select>
                </div>
                
                <button
                  className="px-8 py-3 rounded-xl transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#F4A261', color: 'white' }}
                >
                  Buscar
                </button>
              </div>
            </div>

            <p className="mt-6 text-white/80">
              {availablePets.length} {availablePets.length === 1 ? 'pet disponível' : 'pets disponíveis'} para adoção
            </p>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availablePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          {availablePets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Nenhum pet disponível nesta categoria no momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
