import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { PetCard } from '../components/PetCard';
import { pets } from '../data/pets';

interface Filters {
  species: 'all' | 'dog' | 'cat';
  color: string;
  ageRange: [number, number];
  neutered: 'all' | 'yes' | 'no';
  timeInShelter: number;
  breed: string;
  size: 'all' | 'small' | 'medium' | 'large';
}

export function SearchPage() {
  const [filters, setFilters] = useState<Filters>({
    species: 'all',
    color: '',
    ageRange: [0, 10],
    neutered: 'all',
    timeInShelter: 12,
    breed: '',
    size: 'all',
  });

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      if (filters.species !== 'all' && pet.type !== filters.species) return false;
      if (filters.size !== 'all' && pet.size !== filters.size) return false;
      if (filters.color && !pet.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
      if (pet.age < filters.ageRange[0] || pet.age > filters.ageRange[1]) return false;
      if (filters.neutered === 'yes' && !pet.neutered) return false;
      if (filters.neutered === 'no' && pet.neutered) return false;
      if (pet.timeInShelter > filters.timeInShelter) return false;
      if (filters.breed && !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) return false;
      if (pet.status !== 'available') return false;
      
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SlidersHorizontal className="w-6 h-6" style={{ color: '#2A9D8F' }} />
          <h1 className="text-3xl">Busca Avançada</h1>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-24">
            <h2 className="text-lg mb-6">Filtros</h2>
            
            <div className="space-y-6">
              {/* Species */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">Espécie</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'dog', label: 'Cachorro' },
                    { value: 'cat', label: 'Gato' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="species"
                        value={option.value}
                        checked={filters.species === option.value}
                        onChange={(e) => setFilters({ ...filters, species: e.target.value as any })}
                        className="w-4 h-4 accent-[#2A9D8F]"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">Tamanho</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'small', label: 'Pequeno' },
                    { value: 'medium', label: 'Médio' },
                    { value: 'large', label: 'Grande' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={option.value}
                        checked={filters.size === option.value}
                        onChange={(e) => setFilters({ ...filters, size: e.target.value as any })}
                        className="w-4 h-4 accent-[#2A9D8F]"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">Cor</label>
                <input
                  type="text"
                  placeholder="Ex: Preto, Branco..."
                  value={filters.color}
                  onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                />
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  Idade: {filters.ageRange[0]} - {filters.ageRange[1]} anos
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.ageRange[0]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      ageRange: [parseInt(e.target.value), filters.ageRange[1]] 
                    })}
                    className="w-full accent-[#2A9D8F]"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.ageRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      ageRange: [filters.ageRange[0], parseInt(e.target.value)] 
                    })}
                    className="w-full accent-[#2A9D8F]"
                  />
                </div>
              </div>

              {/* Neutered */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">Castrado</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'yes', label: 'Sim' },
                    { value: 'no', label: 'Não' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="neutered"
                        value={option.value}
                        checked={filters.neutered === option.value}
                        onChange={(e) => setFilters({ ...filters, neutered: e.target.value as any })}
                        className="w-4 h-4 accent-[#2A9D8F]"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time in Shelter */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  Tempo no Abrigo: até {filters.timeInShelter} {filters.timeInShelter === 1 ? 'mês' : 'meses'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={filters.timeInShelter}
                  onChange={(e) => setFilters({ ...filters, timeInShelter: parseInt(e.target.value) })}
                  className="w-full accent-[#2A9D8F]"
                />
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">Raça</label>
                <input
                  type="text"
                  placeholder="Ex: Labrador..."
                  value={filters.breed}
                  onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setFilters({
                  species: 'all',
                  color: '',
                  ageRange: [0, 10],
                  neutered: 'all',
                  timeInShelter: 12,
                  breed: '',
                  size: 'all',
                })}
                className="w-full py-2 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <div>
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredPets.length} {filteredPets.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>

            {filteredPets.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">
                  Nenhum pet encontrado com esses filtros.
                </p>
                <p className="text-gray-400">
                  Tente ajustar os filtros para ver mais resultados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
