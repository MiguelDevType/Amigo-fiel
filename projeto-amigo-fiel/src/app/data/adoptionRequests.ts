export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export const adoptionRequests: AdoptionRequest[] = [
  {
    id: '1',
    petId: '1',
    petName: 'Max',
    applicantName: 'João Silva',
    applicantEmail: 'joao@email.com',
    status: 'pending',
    date: '2026-03-20',
  },
  {
    id: '2',
    petId: '2',
    petName: 'Luna',
    applicantName: 'Maria Santos',
    applicantEmail: 'maria@email.com',
    status: 'pending',
    date: '2026-03-22',
  },
  {
    id: '3',
    petId: '5',
    petName: 'Buddy',
    applicantName: 'Carlos Oliveira',
    applicantEmail: 'carlos@email.com',
    status: 'approved',
    date: '2026-03-18',
  },
  {
    id: '4',
    petId: '3',
    petName: 'Rocky',
    applicantName: 'Ana Costa',
    applicantEmail: 'ana@email.com',
    status: 'pending',
    date: '2026-03-24',
  },
];
