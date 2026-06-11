import { useState } from 'react';
import {
  User, Search, Heart, ClipboardList, Settings, CheckCircle,
  ArrowRight, Clock, Star, MapPin, Briefcase, ChevronDown, ChevronUp,
  Shield, Building2, PawPrint
} from 'lucide-react';

interface JourneyStep {
  icon: React.ReactNode;
  action: string;
  detail: string;
  screen: string;
}

interface Persona {
  id: string;
  category: 'user' | 'ong' | 'admin';
  name: string;
  age?: number;
  role: string;
  location: string;
  photo: string;
  motivation: string;
  quote: string;
  goal: string;
  useCases: string[];
  journey: JourneyStep[];
  outcome: string;
  outcomeColor: string;
}

const personas: Persona[] = [
  {
    id: 'rebeca',
    category: 'user',
    name: 'Rebeca Almeida',
    age: 28,
    role: 'Professora do Ensino Médio',
    location: 'São Paulo, SP',
    photo: 'https://images.unsplash.com/photo-1660700508065-879917d364dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'Mora sozinha em um apartamento e quer companhia. Sempre amou gatos e acredita que um animal de estimação vai melhorar sua qualidade de vida.',
    quote: '"Quero um companheiro calmo que caiba bem no meu estilo de vida."',
    goal: 'Adotar um gato adulto, calmo e adaptado à vida em apartamento.',
    useCases: [
      'UC-01: Visualizar pets disponíveis na homepage',
      'UC-02: Filtrar pets por tipo (gato), porte (pequeno/médio) e temperamento (calmo)',
      'UC-03: Visualizar perfil detalhado da Luna',
      'UC-04: Criar conta de usuária',
      'UC-05: Preencher formulário de adoção em 3 etapas',
      'UC-06: Enviar pedido e aguardar aprovação',
    ],
    journey: [
      { icon: <Search className="w-4 h-4" />, action: 'Descoberta', detail: 'Encontrou o Amigo Fiel via busca orgânica no Google após pesquisar "adoção gatos SP".', screen: 'Homepage' },
      { icon: <Heart className="w-4 h-4" />, action: 'Exploração', detail: 'Visualizou a seção "Pets em Destaque" e se interessou pelos gatos disponíveis.', screen: 'Homepage' },
      { icon: <Search className="w-4 h-4" />, action: 'Filtragem', detail: 'Usou a busca avançada filtrando: Tipo = Gato, Temperamento = Quiet, Tamanho = Pequeno.', screen: 'Busca Avançada' },
      { icon: <User className="w-4 h-4" />, action: 'Detalhes', detail: 'Clicou no perfil da Luna, leu descrição, histórico e galeria de fotos. Ficou encantada.', screen: 'Página do Pet' },
      { icon: <ClipboardList className="w-4 h-4" />, action: 'Cadastro', detail: 'Criou sua conta com e-mail e senha para poder prosseguir com a adoção.', screen: 'Login / Cadastro' },
      { icon: <CheckCircle className="w-4 h-4" />, action: 'Adoção', detail: 'Preencheu o modal de adoção: dados pessoais, tipo de moradia (apartamento), motivação e termos.', screen: 'Modal de Adoção' },
    ],
    outcome: 'Pedido de adoção da Luna enviado com sucesso. Aguarda contato da ONG em até 5 dias úteis.',
    outcomeColor: '#2A9D8F',
  },
  {
    id: 'joao',
    category: 'user',
    name: 'João Silva',
    age: 35,
    role: 'Engenheiro de Software',
    location: 'Campinas, SP',
    photo: 'https://images.unsplash.com/photo-1692895039161-e4f9554a757d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'Pai de dois filhos (7 e 10 anos). Quer dar um cachorro à família. Um amigo adotou pelo site e recomendou.',
    quote: '"Procuro um cão amigável que brinque com meus filhos no quintal."',
    goal: 'Adotar um cão de médio/grande porte, enérgico e amigável com crianças.',
    useCases: [
      'UC-01: Acessar a plataforma por indicação direta',
      'UC-02: Filtrar por tipo (cachorro), tamanho (médio/grande) e temperamento (friendly, playful)',
      'UC-03: Comparar perfis de Rocky e Buddy',
      'UC-04: Fazer login com conta Google',
      'UC-05: Solicitar adoção do Rocky',
      'UC-06: Contatar a ONG via formulário de contato',
    ],
    journey: [
      { icon: <User className="w-4 h-4" />, action: 'Indicação', detail: 'Acessou o site diretamente pelo link enviado por um amigo no WhatsApp.', screen: 'Homepage' },
      { icon: <Search className="w-4 h-4" />, action: 'Busca', detail: 'Filtrou cães de porte médio/grande com temperamento Playful e Friendly.', screen: 'Busca Avançada' },
      { icon: <Heart className="w-4 h-4" />, action: 'Comparação', detail: 'Abriu o Rocky e o Buddy em abas diferentes para comparar perfis e históricos.', screen: 'Página do Pet' },
      { icon: <User className="w-4 h-4" />, action: 'Login Rápido', detail: 'Fez login com Google para agilizar o processo sem criar senha nova.', screen: 'Login' },
      { icon: <ClipboardList className="w-4 h-4" />, action: 'Adoção', detail: 'Escolheu o Rocky. Preencheu o formulário informando quintal e crianças em casa.', screen: 'Modal de Adoção' },
      { icon: <CheckCircle className="w-4 h-4" />, action: 'Contato', detail: 'Enviou mensagem na página de Contato perguntando sobre visita prévia ao abrigo.', screen: 'Contato' },
    ],
    outcome: 'Pedido aprovado pela ONG. Visita ao abrigo agendada para o fim de semana.',
    outcomeColor: '#2A9D8F',
  },
  {
    id: 'maria',
    category: 'user',
    name: 'Maria Santos',
    age: 42,
    role: 'Médica Veterinária',
    location: 'Belo Horizonte, MG',
    photo: 'https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'Profissional da área animal, quer adotar um pet com necessidades especiais ou mais difícil de colocar para adoção. Tem expertise para cuidar.',
    quote: '"Prefiro adotar um pet mais velho ou com histórico difícil — são eles que mais precisam."',
    goal: 'Adotar um pet adulto ou sênior que outras pessoas hesitam em escolher.',
    useCases: [
      'UC-01: Buscar pets por faixa etária e histórico',
      'UC-02: Visualizar perfil completo com histórico clínico',
      'UC-03: Filtrar por status de castração',
      'UC-04: Verificar pets com mais tempo no abrigo',
      'UC-05: Enviar pedido de adoção',
    ],
    journey: [
      { icon: <Search className="w-4 h-4" />, action: 'Busca Avançada', detail: 'Usou filtros de idade (adulto) e tempo no abrigo para encontrar pets esperando há mais tempo.', screen: 'Busca Avançada' },
      { icon: <Heart className="w-4 h-4" />, action: 'Perfil', detail: 'Analisou o histórico do Rex (Pastor Alemão, 6 anos), especialmente informações de saúde.', screen: 'Página do Pet' },
      { icon: <ClipboardList className="w-4 h-4" />, action: 'Decisão', detail: 'Escolheu o Rex após verificar que está vacinado, castrado e sem condições especiais.', screen: 'Página do Pet' },
      { icon: <CheckCircle className="w-4 h-4" />, action: 'Adoção', detail: 'Preencheu o formulário destacando sua experiência profissional como veterinária.', screen: 'Modal de Adoção' },
    ],
    outcome: 'Rex encontrou um lar com uma veterinária especializada. Caso de sucesso destacado pela ONG.',
    outcomeColor: '#F4A261',
  },
  {
    id: 'ana',
    category: 'user',
    name: 'Ana Costa',
    age: 23,
    role: 'Estudante de Design',
    location: 'Rio de Janeiro, RJ',
    photo: 'https://images.unsplash.com/photo-1770564513018-79915efba870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'Viu um post da plataforma no Instagram. Quer adotar mas mora de aluguel e ainda não tem certeza se o proprietário vai permitir.',
    quote: '"Amei o site! Quando resolver a situação do apartamento, já sei onde vou adotar."',
    goal: 'Explorar pets disponíveis e salvar favoritos para quando puder adotar.',
    useCases: [
      'UC-01: Navegar pela homepage e ver pets em destaque',
      'UC-02: Visualizar perfis de pets sem precisar criar conta',
      'UC-03: Buscar por tipo e temperamento',
      'UC-04: Acessar página de Contato para esclarecer dúvidas',
    ],
    journey: [
      { icon: <Heart className="w-4 h-4" />, action: 'Redes Sociais', detail: 'Chegou ao site via link no Instagram do Amigo Fiel com post sobre um filhote.', screen: 'Homepage' },
      { icon: <Search className="w-4 h-4" />, action: 'Navegação', detail: 'Visualizou todos os gatos disponíveis e se apaixonou pelo Simba (Siamês).', screen: 'Busca' },
      { icon: <User className="w-4 h-4" />, action: 'Dúvidas', detail: 'Enviou mensagem pelo formulário de Contato perguntando sobre adoção em imóvel alugado.', screen: 'Contato' },
    ],
    outcome: 'Usuária potencial. Criará conta quando resolver situação de moradia. Demonstrou alta intenção.',
    outcomeColor: '#6366f1',
  },
  {
    id: 'ong',
    category: 'ong',
    name: 'ONG Patinhas do Bem',
    role: 'Organização Parceira de Resgate Animal',
    location: 'São Paulo, SP',
    photo: 'https://images.unsplash.com/photo-1592498815124-9b3be542b732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'ONG com 12 anos de atuação que precisava de uma plataforma digital para divulgar seus animais e gerenciar pedidos de adoção de forma centralizada.',
    quote: '"Antes usávamos WhatsApp e planilhas. Agora temos um sistema real!"',
    goal: 'Cadastrar pets resgatados, divulgar para adotantes e aprovar/rejeitar pedidos de adoção.',
    useCases: [
      'UC-A01: Login como Administrador/ONG',
      'UC-A02: Cadastrar novo pet resgatado com foto, histórico e temperamento',
      'UC-A03: Editar informações de pets existentes',
      'UC-A04: Alterar status do pet (Disponível ↔ Adotado)',
      'UC-A05: Visualizar pedidos de adoção recebidos',
      'UC-A06: Aprovar ou rejeitar pedidos de adoção',
      'UC-A07: Excluir pet cadastrado incorretamente',
    ],
    journey: [
      { icon: <Shield className="w-4 h-4" />, action: 'Acesso', detail: 'Fez login na aba "Admin / ONG" com credenciais institucionais fornecidas pelo sistema.', screen: 'Login — Aba Admin' },
      { icon: <Plus className="w-4 h-4" />, action: 'Cadastro', detail: 'Cadastrou 3 cães resgatados de um sítio, com fotos, descrições e temperamentos.', screen: 'Dashboard — Adicionar Pet' },
      { icon: <ClipboardList className="w-4 h-4" />, action: 'Gestão', detail: 'Acessou a aba "Pedidos de Adoção" e analisou os solicitantes com pedidos pendentes.', screen: 'Dashboard — Pedidos' },
      { icon: <CheckCircle className="w-4 h-4" />, action: 'Aprovação', detail: 'Aprovou o pedido de João Silva para o Rocky após verificar perfil adequado.', screen: 'Dashboard — Pedidos' },
      { icon: <Settings className="w-4 h-4" />, action: 'Atualização', detail: 'Editou o status da Mia para "Adotado" após conclusão bem-sucedida do processo.', screen: 'Dashboard — Pets' },
    ],
    outcome: 'Plataforma reduziu em 60% o tempo de gestão. Todos os animais têm perfil digital completo.',
    outcomeColor: '#2A9D8F',
  },
  {
    id: 'carlos',
    category: 'admin',
    name: 'Carlos Lima',
    age: 39,
    role: 'Administrador da Plataforma',
    location: 'São Paulo, SP',
    photo: 'https://images.unsplash.com/photo-1581092919535-7146ff1a590b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    motivation: 'Responsável técnico pelo Amigo Fiel. Garante que a plataforma funcione, que os dados estejam corretos e que as ONGs parceiras sejam bem atendidas.',
    quote: '"Meu objetivo é que cada pet encontre um lar em menos tempo."',
    goal: 'Supervisionar todos os pets, pedidos e usuários da plataforma.',
    useCases: [
      'UC-A01: Login como administrador com credenciais master',
      'UC-A02: Monitorar estatísticas gerais no dashboard',
      'UC-A03: Gerenciar qualquer pet cadastrado por qualquer ONG',
      'UC-A04: Revisar e intervir em pedidos de adoção',
      'UC-A05: Garantir qualidade dos cadastros de pets',
    ],
    journey: [
      { icon: <Shield className="w-4 h-4" />, action: 'Login Seguro', detail: 'Acessou a aba "Admin / ONG" com credenciais master (admin@amigofiel.com).', screen: 'Login — Aba Admin' },
      { icon: <Settings className="w-4 h-4" />, action: 'Monitoramento', detail: 'Verificou o painel: 8 pets cadastrados, 3 pedidos pendentes, 1 adotado.', screen: 'Dashboard' },
      { icon: <Search className="w-4 h-4" />, action: 'Revisão', detail: 'Buscou pets com mais de 6 meses no abrigo para priorizar divulgação.', screen: 'Dashboard — Busca' },
      { icon: <CheckCircle className="w-4 h-4" />, action: 'Ação', detail: 'Aprovou 2 pedidos pendentes e rejeitou 1 caso incompatível com o perfil do pet.', screen: 'Dashboard — Pedidos' },
    ],
    outcome: 'Dashboard permite visão 360° da operação. Taxa de adoção subiu 40% desde a implantação.',
    outcomeColor: '#2A9D8F',
  },
];

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

const categoryConfig = {
  user: { label: 'Usuário Adotante', color: '#2A9D8F', bg: '#f0faf9', icon: <User className="w-4 h-4" /> },
  ong: { label: 'ONG Parceira', color: '#F4A261', bg: '#fff8f0', icon: <Building2 className="w-4 h-4" /> },
  admin: { label: 'Administrador', color: '#6366f1', bg: '#f5f3ff', icon: <Shield className="w-4 h-4" /> },
};

const systemUseCases = [
  {
    id: 'UC-01', actor: 'Usuário / Visitante', name: 'Visualizar Pets Disponíveis',
    description: 'Qualquer visitante pode navegar pela homepage e ver os pets disponíveis para adoção sem necessidade de login.',
    precondition: 'Nenhuma', postcondition: 'Usuário visualiza lista de pets', priority: 'Alta',
  },
  {
    id: 'UC-02', actor: 'Usuário / Visitante', name: 'Buscar e Filtrar Pets',
    description: 'O usuário pode usar filtros avançados (tipo, porte, gênero, temperamento, idade) para encontrar o pet ideal.',
    precondition: 'Estar na página de Busca', postcondition: 'Lista filtrada exibida', priority: 'Alta',
  },
  {
    id: 'UC-03', actor: 'Usuário / Visitante', name: 'Visualizar Perfil Detalhado do Pet',
    description: 'O usuário acessa página completa com descrição, galeria, temperamento, histórico e status de castração.',
    precondition: 'Pet deve estar cadastrado', postcondition: 'Perfil completo exibido', priority: 'Alta',
  },
  {
    id: 'UC-04', actor: 'Visitante', name: 'Criar Conta de Usuário',
    description: 'O visitante se cadastra com e-mail/senha ou via login social (Google, Facebook) para acessar recursos exclusivos.',
    precondition: 'E-mail não cadastrado', postcondition: 'Conta criada e usuário autenticado', priority: 'Alta',
  },
  {
    id: 'UC-05', actor: 'Usuário Autenticado', name: 'Solicitar Adoção de Pet',
    description: 'Usuário preenche formulário multi-step: dados pessoais, tipo de moradia, motivação e aceite dos termos.',
    precondition: 'Usuário autenticado; pet disponível', postcondition: 'Pedido registrado com status "Pendente"', priority: 'Alta',
  },
  {
    id: 'UC-06', actor: 'Visitante / Usuário', name: 'Enviar Mensagem de Contato',
    description: 'Qualquer pessoa pode enviar mensagem através do formulário de Contato para tirar dúvidas.',
    precondition: 'Nenhuma', postcondition: 'Mensagem enviada à equipe', priority: 'Média',
  },
  {
    id: 'UC-A01', actor: 'Admin / ONG', name: 'Fazer Login como Administrador',
    description: 'Usuário com credenciais admin acessa aba "Admin/ONG" na página de Login e é redirecionado ao Dashboard.',
    precondition: 'Credenciais válidas', postcondition: 'Acesso ao Dashboard concedido', priority: 'Alta',
  },
  {
    id: 'UC-A02', actor: 'Admin / ONG', name: 'Cadastrar Novo Pet',
    description: 'Admin preenche formulário completo: nome, tipo, raça, cor, porte, gênero, temperamento, descrição, histórico e foto.',
    precondition: 'Usuário autenticado como admin', postcondition: 'Pet cadastrado e visível na plataforma', priority: 'Alta',
  },
  {
    id: 'UC-A03', actor: 'Admin / ONG', name: 'Editar Informações do Pet',
    description: 'Admin pode editar qualquer campo de um pet já cadastrado via botão de edição na tabela.',
    precondition: 'Pet já cadastrado', postcondition: 'Dados do pet atualizados', priority: 'Alta',
  },
  {
    id: 'UC-A04', actor: 'Admin / ONG', name: 'Gerenciar Pedidos de Adoção',
    description: 'Admin visualiza todos os pedidos na aba Pedidos e pode aprovar ou rejeitar cada solicitação.',
    precondition: 'Existir pedido pendente', postcondition: 'Status do pedido atualizado', priority: 'Alta',
  },
  {
    id: 'UC-A05', actor: 'Admin / ONG', name: 'Alterar Status do Pet',
    description: 'Admin pode marcar um pet como "Adotado" ou reverter para "Disponível" diretamente na tabela.',
    precondition: 'Pet cadastrado', postcondition: 'Status atualizado no sistema', priority: 'Média',
  },
  {
    id: 'UC-A06', actor: 'Admin / ONG', name: 'Excluir Pet Cadastrado',
    description: 'Admin pode remover um pet do sistema após confirmação. Operação irreversível.',
    precondition: 'Pet cadastrado', postcondition: 'Pet removido da plataforma', priority: 'Baixa',
  },
];

const stats = [
  { label: 'Casos de Uso Totais', value: '12', icon: <ClipboardList className="w-6 h-6" />, color: '#2A9D8F' },
  { label: 'Personas Mapeadas', value: '6', icon: <User className="w-6 h-6" />, color: '#F4A261' },
  { label: 'Perfis de Usuário', value: '3', icon: <Shield className="w-6 h-6" />, color: '#6366f1' },
  { label: 'Telas do Sistema', value: '6', icon: <Settings className="w-6 h-6" />, color: '#2A9D8F' },
];

export function UseCasesPage() {
  const [expandedPersona, setExpandedPersona] = useState<string | null>('rebeca');
  const [filterCategory, setFilterCategory] = useState<'all' | 'user' | 'ong' | 'admin'>('all');
  const [expandedUC, setExpandedUC] = useState<string | null>(null);

  const filteredPersonas = filterCategory === 'all'
    ? personas
    : personas.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="text-white py-16 px-4" style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #21867a 100%)' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <PawPrint className="w-8 h-8 text-white/70" />
            <span className="text-white/80 text-sm uppercase tracking-widest">Amigo Fiel — Documentação</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Relatório de Casos de Uso</h1>
          <p className="text-white/80 max-w-2xl">
            Mapeamento completo de personas e jornadas dos usuários da plataforma Amigo Fiel. 
            Entenda como diferentes perfis interagem com o sistema e quais funcionalidades são mais relevantes para cada um.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>Gerado em 29 de Abril de 2026 — versão 1.0</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <p className="text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* PERSONAS SECTION */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl mb-1">Personas e Jornadas de Usuário</h2>
              <p className="text-gray-500 text-sm">Perfis reais mapeados a partir dos fluxos do sistema</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'user', 'ong', 'admin'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all border ${
                    filterCategory === cat
                      ? 'text-white border-transparent shadow-md'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                  }`}
                  style={filterCategory === cat ? { backgroundColor: '#2A9D8F' } : {}}
                >
                  {cat === 'all' ? 'Todos' : cat === 'user' ? 'Adotantes' : cat === 'ong' ? 'ONGs' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPersonas.map(persona => {
              const config = categoryConfig[persona.category];
              const isOpen = expandedPersona === persona.id;

              return (
                <div key={persona.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Card Header */}
                  <button
                    className="w-full text-left p-6 flex items-start gap-5 hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedPersona(isOpen ? null : persona.id)}
                  >
                    <img
                      src={persona.photo}
                      alt={persona.name}
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg">
                              {persona.name}{persona.age ? `, ${persona.age} anos` : ''}
                            </h3>
                            <span
                              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                              style={{ backgroundColor: config.bg, color: config.color }}
                            >
                              {config.icon}
                              {config.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" /> {persona.role}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {persona.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {persona.quote}
                      </p>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="border-t border-gray-100 p-6 space-y-6">
                      {/* Motivation + Goal */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb' }}>
                          <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wide">Motivação</h4>
                          <p className="text-sm text-gray-700">{persona.motivation}</p>
                        </div>
                        <div className="rounded-xl p-4" style={{ backgroundColor: config.bg }}>
                          <h4 className="text-sm mb-1 uppercase tracking-wide" style={{ color: config.color }}>Objetivo Principal</h4>
                          <p className="text-sm text-gray-700">{persona.goal}</p>
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-3">Casos de Uso Envolvidos</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.useCases.map(uc => (
                            <span key={uc} className="px-3 py-1 rounded-xl text-xs bg-gray-100 text-gray-700 border border-gray-200">
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Journey */}
                      <div>
                        <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-4">Jornada no Sistema</h4>
                        <div className="relative">
                          {/* Line */}
                          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-200" />
                          <div className="space-y-4">
                            {persona.journey.map((step, i) => (
                              <div key={i} className="flex gap-4 relative">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white z-10"
                                  style={{ backgroundColor: config.color }}
                                >
                                  {step.icon}
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                                    <span className="text-sm font-medium text-gray-800">{step.action}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500">
                                      {step.screen}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600">{step.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Outcome */}
                      <div
                        className="rounded-xl p-4 flex items-start gap-3"
                        style={{ backgroundColor: persona.outcomeColor + '15', borderLeft: `4px solid ${persona.outcomeColor}` }}
                      >
                        <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: persona.outcomeColor }} />
                        <div>
                          <h4 className="text-sm mb-1" style={{ color: persona.outcomeColor }}>Resultado / Desfecho</h4>
                          <p className="text-sm text-gray-700">{persona.outcome}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* USE CASES TABLE */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl mb-1">Tabela de Casos de Uso do Sistema</h2>
            <p className="text-gray-500 text-sm">Documentação formal de todos os casos de uso identificados</p>
          </div>

          <div className="space-y-3">
            {systemUseCases.map(uc => (
              <div key={uc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedUC(expandedUC === uc.id ? null : uc.id)}
                >
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs flex-shrink-0 font-mono"
                    style={{
                      backgroundColor: uc.id.startsWith('UC-A') ? '#f5f3ff' : '#f0faf9',
                      color: uc.id.startsWith('UC-A') ? '#6366f1' : '#2A9D8F',
                    }}
                  >
                    {uc.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-800">{uc.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        {uc.actor}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        uc.priority === 'Alta' ? 'bg-red-50 text-red-600' :
                        uc.priority === 'Média' ? 'bg-amber-50 text-amber-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {uc.priority}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${expandedUC === uc.id ? 'rotate-90' : ''}`} />
                </button>

                {expandedUC === uc.id && (
                  <div className="border-t border-gray-100 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-700 mb-3">{uc.description}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Pré-condição</p>
                      <p className="text-sm text-gray-700">{uc.precondition}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Pós-condição</p>
                      <p className="text-sm text-gray-700">{uc.postcondition}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Ator Principal</p>
                      <p className="text-sm text-gray-700">{uc.actor}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-12 p-6 rounded-2xl text-center" style={{ backgroundColor: '#f0faf9' }}>
          <PawPrint className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A9D8F' }} />
          <h3 className="text-lg mb-2" style={{ color: '#2A9D8F' }}>Amigo Fiel — Documentação v1.0</h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Este relatório foi gerado para fins de documentação de requisitos. 
            Todos os casos de uso estão implementados e funcionais na plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
