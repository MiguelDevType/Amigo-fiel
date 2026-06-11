import { Link } from 'react-router';
import { Calendar } from 'lucide-react';
import type { Pet } from '../data/pets';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link
      to={`/pet/${pet.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl mb-1">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.breed}</p>
          </div>
          
          {pet.status === 'adopted' && (
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
              Adotado
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" style={{ color: '#2A9D8F' }} />
          <span>{pet.age} {pet.age === 1 ? 'ano' : 'anos'}</span>
        </div>
      </div>
    </Link>
  );
}
