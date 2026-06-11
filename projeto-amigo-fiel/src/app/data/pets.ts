export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  breed: string;
  temperament: string[];
  description: string;
  image: string;
  gallery: string[];
  status: 'available' | 'adopted';
  color: string;
  neutered: boolean;
  timeInShelter: number; // in months
  history: string;
}

export const pets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    age: 3,
    gender: 'male',
    size: 'large',
    breed: 'Golden Retriever',
    temperament: ['Friendly', 'Energetic', 'Loyal'],
    description: 'Max é um Golden Retriever adorável e cheio de energia. Ele adora brincar, correr no parque e é extremamente amigável com crianças. Procura uma família ativa que possa acompanhar sua energia.',
    image: 'https://images.unsplash.com/photo-1609348490161-a879e4327ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDQ0NzEwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1609348490161-a879e4327ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDQ0NzEwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1609348490161-a879e4327ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDQ0NzEwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Dourado',
    neutered: true,
    timeInShelter: 2,
    history: 'Max foi resgatado de uma situação de abandono há 2 meses. Ele se adaptou muito bem ao abrigo e demonstra ser um cão saudável e sociável.',
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    age: 2,
    gender: 'female',
    size: 'small',
    breed: 'Tabby',
    temperament: ['Quiet', 'Affectionate', 'Independent'],
    description: 'Luna é uma gatinha linda e tranquila. Ela adora carinho, mas também aprecia seus momentos de independência. Perfeita para quem busca uma companheira calma e afetuosa.',
    image: 'https://images.unsplash.com/photo-1719305406153-b0d36aa305ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ0MTI3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1719305406153-b0d36aa305ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ0MTI3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1719305406153-b0d36aa305ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ0MTI3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Rajado',
    neutered: true,
    timeInShelter: 4,
    history: 'Luna foi encontrada nas ruas quando filhote. Após cuidados veterinários, ela está pronta para encontrar um lar amoroso.',
  },
  {
    id: '3',
    name: 'Rocky',
    type: 'dog',
    age: 4,
    gender: 'male',
    size: 'medium',
    breed: 'Beagle',
    temperament: ['Playful', 'Curious', 'Friendly'],
    description: 'Rocky é um Beagle brincalhão e curioso. Ele adora explorar novos lugares e fazer novos amigos. Muito sociável e ótimo com outras pessoas e animais.',
    image: 'https://images.unsplash.com/photo-1715033777082-86139553c35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwYmVhZ2xlJTIwZG9nfGVufDF8fHx8MTc3NDQ3MzEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1715033777082-86139553c35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwYmVhZ2xlJTIwZG9nfGVufDF8fHx8MTc3NDQ3MzEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1715033777082-86139553c35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwYmVhZ2xlJTIwZG9nfGVufDF8fHx8MTc3NDQ3MzEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Tricolor',
    neutered: false,
    timeInShelter: 1,
    history: 'Rocky foi entregue ao abrigo por uma família que não podia mais cuidar dele. Ele é muito bem treinado e socializado.',
  },
  {
    id: '4',
    name: 'Mia',
    type: 'cat',
    age: 5,
    gender: 'female',
    size: 'medium',
    breed: 'Persian',
    temperament: ['Calm', 'Gentle', 'Quiet'],
    description: 'Mia é uma gata persa elegante e calma. Ela adora um ambiente tranquilo e aprecia carinho e atenção. Ideal para quem busca uma companheira serena.',
    image: 'https://images.unsplash.com/photo-1599907370836-939f2d59b897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVmZnklMjBwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc3NDQ2NDI1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1599907370836-939f2d59b897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVmZnklMjBwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc3NDQ2NDI1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1599907370836-939f2d59b897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVmZnklMjBwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc3NDQ2NDI1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'adopted',
    color: 'Branco',
    neutered: true,
    timeInShelter: 6,
    history: 'Mia foi resgatada de uma situação de maus-tratos e passou por recuperação completa. Agora está saudável e pronta para adoção.',
  },
  {
    id: '5',
    name: 'Buddy',
    type: 'dog',
    age: 1,
    gender: 'male',
    size: 'medium',
    breed: 'Labrador',
    temperament: ['Energetic', 'Friendly', 'Playful'],
    description: 'Buddy é um filhote de Labrador super amigável e enérgico. Ele adora brincar e está sempre pronto para uma aventura. Perfeito para famílias ativas!',
    image: 'https://images.unsplash.com/photo-1761053079602-5217aad67aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGxhYnJhZG9yJTIwcHVwcHl8ZW58MXx8fHwxNzc0NDczMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1761053079602-5217aad67aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGxhYnJhZG9yJTIwcHVwcHl8ZW58MXx8fHwxNzc0NDczMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1761053079602-5217aad67aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGxhYnJhZG9yJTIwcHVwcHl8ZW58MXx8fHwxNzc0NDczMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Preto',
    neutered: false,
    timeInShelter: 3,
    history: 'Buddy nasceu no abrigo de uma mãe resgatada. Ele cresceu em um ambiente seguro e está pronto para sua nova família.',
  },
  {
    id: '6',
    name: 'Simba',
    type: 'cat',
    age: 3,
    gender: 'male',
    size: 'small',
    breed: 'Siamese',
    temperament: ['Vocal', 'Social', 'Intelligent'],
    description: 'Simba é um gato siamês inteligente e comunicativo. Ele adora "conversar" com seus humanos e é muito social. Ideal para quem quer um companheiro interativo.',
    image: 'https://images.unsplash.com/photo-1636898057788-62419a43964c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwYmx1ZSUyMGV5ZXN8ZW58MXx8fHwxNzc0NDUyMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1636898057788-62419a43964c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwYmx1ZSUyMGV5ZXN8ZW58MXx8fHwxNzc0NDUyMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1636898057788-62419a43964c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwYmx1ZSUyMGV5ZXN8ZW58MXx8fHwxNzc0NDUyMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Creme',
    neutered: true,
    timeInShelter: 5,
    history: 'Simba foi resgatado das ruas após ser abandonado. Ele é muito saudável e ama interagir com pessoas.',
  },
  {
    id: '7',
    name: 'Rex',
    type: 'dog',
    age: 6,
    gender: 'male',
    size: 'large',
    breed: 'German Shepherd',
    temperament: ['Loyal', 'Protective', 'Intelligent'],
    description: 'Rex é um Pastor Alemão leal e protetor. Muito inteligente e obediente, ele é perfeito para quem busca um companheiro confiável e dedicado.',
    image: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NzQ0MDk4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NzQ0MDk4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NzQ0MDk4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Preto e Marrom',
    neutered: true,
    timeInShelter: 7,
    history: 'Rex foi entregue ao abrigo após o falecimento de seu dono. Ele é muito bem treinado e obediente.',
  },
  {
    id: '8',
    name: 'Whiskers',
    type: 'cat',
    age: 1,
    gender: 'male',
    size: 'small',
    breed: 'Orange Tabby',
    temperament: ['Playful', 'Energetic', 'Curious'],
    description: 'Whiskers é um gatinho laranja cheio de energia! Ele adora brincar e explorar cada canto da casa. Perfeito para quem quer um companheiro divertido.',
    image: 'https://images.unsplash.com/photo-1620021743366-971187586f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGtpdHRlbnxlbnwxfHx8fDE3NzQ0NzMxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    gallery: [
      'https://images.unsplash.com/photo-1620021743366-971187586f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGtpdHRlbnxlbnwxfHx8fDE3NzQ0NzMxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
      'https://images.unsplash.com/photo-1620021743366-971187586f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGtpdHRlbnxlbnwxfHx8fDE3NzQ0NzMxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=amigofiel&utm_medium=referral',
    ],
    status: 'available',
    color: 'Laranja',
    neutered: false,
    timeInShelter: 2,
    history: 'Whiskers foi encontrado sozinho na rua quando filhote. Ele se recuperou completamente e está cheio de vida.',
  },
];