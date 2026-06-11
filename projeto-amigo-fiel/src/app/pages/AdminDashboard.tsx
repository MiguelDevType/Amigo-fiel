import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, Tag } from 'lucide-react';
import { pets as initialPets } from '../data/pets';
import { adoptionRequests as initialAdoptionRequests } from '../data/adoptionRequests';
import type { Pet } from '../data/pets';

const DEFAULT_DOG_IMAGE = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const DEFAULT_CAT_IMAGE = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const TEMPERAMENT_OPTIONS = [
  'Friendly', 'Energetic', 'Loyal', 'Quiet', 'Affectionate',
  'Independent', 'Playful', 'Curious', 'Calm', 'Gentle',
  'Vocal', 'Social', 'Intelligent', 'Protective',
];

interface NewPetForm {
  name: string;
  type: 'dog' | 'cat';
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  breed: string;
  color: string;
  neutered: boolean;
  timeInShelter: number;
  temperament: string[];
  description: string;
  history: string;
  image: string;
}

const emptyForm: NewPetForm = {
  name: '',
  type: 'dog',
  age: 1,
  gender: 'male',
  size: 'medium',
  breed: '',
  color: '',
  neutered: false,
  timeInShelter: 1,
  temperament: [],
  description: '',
  history: '',
  image: '',
};

export function AdminDashboard() {
  const [pets, setPets] = useState(initialPets);
  const [requests, setRequests] = useState(initialAdoptionRequests);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<'pets' | 'requests'>('pets');
  const [form, setForm] = useState<NewPetForm>(emptyForm);
  const [customTemperament, setCustomTemperament] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const typeLabels = { dog: 'Cachorro', cat: 'Gato' };
  const sizeLabels = { small: 'Pequeno', medium: 'Médio', large: 'Grande' };
  const statusLabels = { available: 'Disponível', adopted: 'Adotado' };
  const requestStatusLabels = { pending: 'Pendente', approved: 'Aprovado', rejected: 'Rejeitado' };
  const genderLabels = { male: 'Macho', female: 'Fêmea' };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pet?')) {
      setPets(pets.filter(pet => pet.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setPets(pets.map(pet =>
      pet.id === id ? { ...pet, status: pet.status === 'available' ? 'adopted' : 'available' } : pet
    ));
  };

  const handleRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
  };

  const toggleTemperament = (trait: string) => {
    setForm(prev => ({
      ...prev,
      temperament: prev.temperament.includes(trait)
        ? prev.temperament.filter(t => t !== trait)
        : [...prev.temperament, trait],
    }));
  };

  const addCustomTemperament = () => {
    const val = customTemperament.trim();
    if (val && !form.temperament.includes(val)) {
      setForm(prev => ({ ...prev, temperament: [...prev.temperament, val] }));
      setCustomTemperament('');
    }
  };

  const openAddModal = () => {
    setEditingPet(null);
    setForm(emptyForm);
    setShowAddModal(true);
  };

  const openEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setForm({
      name: pet.name,
      type: pet.type,
      age: pet.age,
      gender: pet.gender,
      size: pet.size,
      breed: pet.breed,
      color: pet.color,
      neutered: pet.neutered,
      timeInShelter: pet.timeInShelter,
      temperament: [...pet.temperament],
      description: pet.description,
      history: pet.history,
      image: pet.image,
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.temperament.length === 0) {
      alert('Adicione pelo menos uma característica de temperamento.');
      return;
    }

    const imageUrl = form.image || (form.type === 'dog' ? DEFAULT_DOG_IMAGE : DEFAULT_CAT_IMAGE);

    if (editingPet) {
      setPets(pets.map(p =>
        p.id === editingPet.id
          ? { ...p, ...form, image: imageUrl, gallery: [imageUrl] }
          : p
      ));
      showSuccess('Pet atualizado com sucesso!');
    } else {
      const newPet: Pet = {
        id: String(Date.now()),
        ...form,
        image: imageUrl,
        gallery: [imageUrl],
        status: 'available',
      };
      setPets(prev => [newPet, ...prev]);
      showSuccess('Pet adicionado com sucesso!');
    }

    setShowAddModal(false);
    setForm(emptyForm);
    setEditingPet(null);
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = requests.filter(req => req.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Dashboard Administrativo</h1>
            <p className="text-gray-600">Gerencie pets e pedidos de adoção</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#F4A261' }}
          >
            <Plus className="w-5 h-5" />
            Adicionar Pet
          </button>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg">
            <Check className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de Pets', value: pets.length, color: '#2A9D8F' },
            { label: 'Disponíveis', value: pets.filter(p => p.status === 'available').length, color: '#2A9D8F' },
            { label: 'Adotados', value: pets.filter(p => p.status === 'adopted').length, color: '#9ca3af' },
            { label: 'Pedidos Pendentes', value: pendingRequests.length, color: '#F4A261' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-3xl" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSection('pets')}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeSection === 'pets' ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
            }`}
            style={activeSection === 'pets' ? { backgroundColor: '#2A9D8F' } : {}}
          >
            Pets Cadastrados
          </button>
          <button
            onClick={() => setActiveSection('requests')}
            className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeSection === 'requests' ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
            }`}
            style={activeSection === 'requests' ? { backgroundColor: '#2A9D8F' } : {}}
          >
            Pedidos de Adoção
            {pendingRequests.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeSection === 'requests' ? 'bg-white/20' : 'bg-orange-100 text-orange-700'
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>
        </div>

        {/* PETS SECTION */}
        {activeSection === 'pets' && (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome ou raça..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Foto</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Nome</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Tipo</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Raça</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Idade</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Tamanho</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Status</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPets.map((pet) => (
                      <tr key={pet.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <img src={pet.image} alt={pet.name} className="w-12 h-12 rounded-lg object-cover" />
                        </td>
                        <td className="px-6 py-4">{pet.name}</td>
                        <td className="px-6 py-4 text-gray-600">{typeLabels[pet.type]}</td>
                        <td className="px-6 py-4 text-gray-600">{pet.breed}</td>
                        <td className="px-6 py-4 text-gray-600">{pet.age} {pet.age === 1 ? 'ano' : 'anos'}</td>
                        <td className="px-6 py-4 text-gray-600">{sizeLabels[pet.size]}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(pet.id)}
                            className={`px-3 py-1 rounded-full text-xs ${
                              pet.status === 'available'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {statusLabels[pet.status]}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(pet)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Pencil className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDelete(pet.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredPets.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-4">
                    {searchTerm ? 'Nenhum pet encontrado.' : 'Nenhum pet cadastrado.'}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={openAddModal}
                      className="px-6 py-3 rounded-xl text-white"
                      style={{ backgroundColor: '#F4A261' }}
                    >
                      Adicionar Primeiro Pet
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* REQUESTS SECTION */}
        {activeSection === 'requests' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Pet</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Solicitante</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">E-mail</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Data</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{req.petName}</td>
                      <td className="px-6 py-4">{req.applicantName}</td>
                      <td className="px-6 py-4 text-gray-600">{req.applicantEmail}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(req.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          req.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {requestStatusLabels[req.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {req.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRequestStatus(req.id, 'approved')}
                              className="px-3 py-1 rounded-lg text-xs text-white bg-green-500 hover:bg-green-600 transition-colors"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() => handleRequestStatus(req.id, 'rejected')}
                              className="px-3 py-1 rounded-lg text-xs text-white bg-red-500 hover:bg-red-600 transition-colors"
                            >
                              Rejeitar
                            </button>
                          </div>
                        )}
                        {req.status !== 'pending' && (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ===== ADD / EDIT PET MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl" style={{ color: '#2A9D8F' }}>
                {editingPet ? 'Editar Pet' : 'Adicionar Novo Pet'}
              </h2>
              <button
                onClick={() => { setShowAddModal(false); setEditingPet(null); setForm(emptyForm); }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              {/* Row 1: Name + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nome *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="Ex: Max"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tipo *</label>
                  <div className="flex gap-2">
                    {(['dog', 'cat'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type }))}
                        className={`flex-1 py-2.5 rounded-xl border-2 transition-all ${
                          form.type === type
                            ? 'border-[#2A9D8F] text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        style={form.type === type ? { backgroundColor: '#2A9D8F' } : {}}
                      >
                        {type === 'dog' ? '🐕 Cachorro' : '🐱 Gato'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Breed + Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Raça *</label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={e => setForm(f => ({ ...f, breed: e.target.value }))}
                    required
                    placeholder="Ex: Golden Retriever"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Cor *</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    required
                    placeholder="Ex: Dourado"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
              </div>

              {/* Row 3: Age + Size + Gender */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Idade (anos) *</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))}
                    required
                    min={0}
                    max={25}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Porte *</label>
                  <select
                    value={form.size}
                    onChange={e => setForm(f => ({ ...f, size: e.target.value as 'small' | 'medium' | 'large' }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] bg-white"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gênero *</label>
                  <select
                    value={form.gender}
                    onChange={e => setForm(f => ({ ...f, gender: e.target.value as 'male' | 'female' }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] bg-white"
                  >
                    <option value="male">Macho</option>
                    <option value="female">Fêmea</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Time in Shelter + Neutered */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tempo no Abrigo (meses) *</label>
                  <input
                    type="number"
                    value={form.timeInShelter}
                    onChange={e => setForm(f => ({ ...f, timeInShelter: Number(e.target.value) }))}
                    required
                    min={0}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm(f => ({ ...f, neutered: !f.neutered }))}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        form.neutered ? '' : 'bg-gray-200'
                      }`}
                      style={form.neutered ? { backgroundColor: '#2A9D8F' } : {}}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        form.neutered ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </div>
                    <span className="text-sm text-gray-700">
                      {form.neutered ? 'Castrado(a)' : 'Não castrado(a)'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Temperament */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Temperamento * <span className="text-gray-400">(selecione ao menos um)</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {TEMPERAMENT_OPTIONS.map(trait => (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => toggleTemperament(trait)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                        form.temperament.includes(trait)
                          ? 'text-white border-transparent'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                      style={form.temperament.includes(trait) ? { backgroundColor: '#2A9D8F' } : {}}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
                {/* Custom temperament */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={customTemperament}
                      onChange={e => setCustomTemperament(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomTemperament())}
                      placeholder="Adicionar outra característica..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addCustomTemperament}
                    className="px-4 py-2 rounded-xl text-white text-sm"
                    style={{ backgroundColor: '#2A9D8F' }}
                  >
                    Adicionar
                  </button>
                </div>
                {form.temperament.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {form.temperament.map(t => (
                      <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#F4A261' }}>
                        {t}
                        <button type="button" onClick={() => toggleTemperament(t)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Descrição *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                  rows={3}
                  placeholder="Descreva a personalidade e características do pet..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] resize-none"
                />
              </div>

              {/* History */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Histórico</label>
                <textarea
                  value={form.history}
                  onChange={e => setForm(f => ({ ...f, history: e.target.value }))}
                  rows={2}
                  placeholder="Conte a história do pet (como chegou ao abrigo, estado de saúde...)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">URL da Foto</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  placeholder="https://... (deixe em branco para usar foto padrão)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                />
                {form.image && (
                  <div className="mt-2">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                      onError={e => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingPet(null); setForm(emptyForm); }}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#F4A261' }}
                >
                  {editingPet ? 'Salvar Alterações' : 'Adicionar Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
