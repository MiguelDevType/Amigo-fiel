import { useState } from 'react';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4">Entre em Contato</h1>
            <p className="text-lg text-gray-600">
              Tem alguma dúvida? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl mb-6">Informações de Contato</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6F5F3' }}>
                      <Mail className="w-6 h-6" style={{ color: '#2A9D8F' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">E-mail</p>
                      <p className="text-lg">contato@amigofiel.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6F5F3' }}>
                      <MessageSquare className="w-6 h-6" style={{ color: '#2A9D8F' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                      <p className="text-lg">(11) 99999-9999</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2A9D8F] to-[#21867a] rounded-2xl p-8 text-white">
                <h3 className="text-xl mb-3">Horário de Atendimento</h3>
                <div className="space-y-2 text-white/90">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 13h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl mb-3">Visite-nos</h3>
                <p className="text-gray-600 mb-4">
                  Rua dos Animais, 123<br />
                  Bairro Pet Amigo<br />
                  São Paulo - SP<br />
                  CEP: 01234-567
                </p>
                <p className="text-sm text-gray-500">
                  Agende uma visita para conhecer nossos pets pessoalmente!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl mb-6">Envie uma Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nome *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F]"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Mensagem *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2A9D8F] resize-none"
                      placeholder="Como podemos ajudar?"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#F4A261' }}
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Responderemos sua mensagem em até 24 horas úteis.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
