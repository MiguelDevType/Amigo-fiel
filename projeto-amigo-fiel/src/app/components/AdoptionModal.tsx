import { useState } from 'react';
import { X, Check, AlertCircle, ChevronRight, ChevronLeft, User, MapPin, Home, MessageSquare } from 'lucide-react';

interface AdoptionModalProps {
  petName: string;
  onClose: () => void;
}

type FormData = {
  fullName: string; email: string; phone: string; age: string;
  address: string;  city: string;  state: string; zipCode: string;
  hasExperience: string; hasOtherPets: string; hasFencedYard: string; workSchedule: string;
  whyAdopt: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

// ── helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v: string) => v.replace(/\D/g, '').length >= 10;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {msg}
    </p>
  );
}

const STEP_META = [
  { icon: User,          label: 'Dados Pessoais'  },
  { icon: MapPin,        label: 'Endereço'         },
  { icon: Home,          label: 'Sobre o Lar'      },
  { icon: MessageSquare, label: 'Motivação'        },
];

// ── validators per step ──────────────────────────────────────────────────────
function validateStep(step: number, data: FormData): Errors {
  const errs: Errors = {};

  if (step === 1) {
    if (!data.fullName.trim())
      errs.fullName = 'Seu nome completo é obrigatório.';
    else if (data.fullName.trim().split(' ').length < 2)
      errs.fullName = 'Por favor, informe nome e sobrenome.';

    if (!data.email.trim())
      errs.email = 'O e-mail é obrigatório.';
    else if (!isValidEmail(data.email))
      errs.email = 'Digite um e-mail válido (ex: voce@email.com).';

    if (!data.phone.trim())
      errs.phone = 'O telefone é obrigatório.';
    else if (!isValidPhone(data.phone))
      errs.phone = 'Informe um telefone válido com DDD (ex: 11 98765-4321).';

    if (!data.age.trim())
      errs.age = 'A idade é obrigatória.';
    else if (Number(data.age) < 18)
      errs.age = 'É preciso ter 18 anos ou mais para adotar.';
    else if (Number(data.age) > 120)
      errs.age = 'Idade inválida.';
  }

  if (step === 2) {
    if (!data.address.trim())
      errs.address = 'O endereço é obrigatório.';
    if (!data.city.trim())
      errs.city = 'A cidade é obrigatória.';
    if (!data.state.trim())
      errs.state = 'O estado é obrigatório.';
    else if (data.state.trim().length !== 2)
      errs.state = 'Use a sigla do estado (ex: SP, RJ).';
    if (!data.zipCode.trim())
      errs.zipCode = 'O CEP é obrigatório.';
    else if (data.zipCode.replace(/\D/g, '').length !== 8)
      errs.zipCode = 'CEP inválido. Use o formato 00000-000.';
  }

  if (step === 3) {
    if (!data.hasExperience)
      errs.hasExperience = 'Selecione uma opção.';
    if (!data.hasOtherPets)
      errs.hasOtherPets = 'Selecione uma opção.';
    if (!data.hasFencedYard)
      errs.hasFencedYard = 'Selecione uma opção.';
    if (!data.workSchedule.trim())
      errs.workSchedule = 'Informe seu horário de trabalho.';
  }

  if (step === 4) {
    if (!data.whyAdopt.trim())
      errs.whyAdopt = 'Conte-nos suas motivações para adotar.';
    else if (data.whyAdopt.trim().length < 30)
      errs.whyAdopt = `Escreva pelo menos 30 caracteres (${data.whyAdopt.trim().length}/30).`;
  }

  return errs;
}

// ── Input helpers ─────────────────────────────────────────────────────────────
function inputCls(error?: string) {
  return `w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
    error
      ? 'border-red-400 bg-red-50 focus:border-red-500'
      : 'border-gray-200 focus:border-[#2A9D8F]'
  }`;
}

// ═════════════════════════════════════════════════════════════════════════════
export function AdoptionModal({ petName, onClose }: AdoptionModalProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', age: '',
    address: '', city: '', state: '', zipCode: '',
    hasExperience: '', hasOtherPets: '', hasFencedYard: '', workSchedule: '',
    whyAdopt: '',
  });

  const totalSteps = 4;
  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(d => ({ ...d, [key]: e.target.value }));
    setErrors(err => ({ ...err, [key]: undefined }));
  };

  const handleNext = () => {
    const errs = validateStep(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    const errs = validateStep(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  // ── submitted ─────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-10 text-center shadow-2xl">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#f0faf9' }}
          >
            <Check className="w-10 h-10" style={{ color: '#2A9D8F' }} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl mb-3 text-gray-800">Pedido enviado!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Sua solicitação de adoção para <strong>{petName}</strong> foi recebida com sucesso.
          </p>
          <p className="text-gray-400 text-xs mb-8">
            Nossa equipe analisará seu perfil e entrará em contato em até <strong>48 horas</strong> para agendar uma visita ao abrigo.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#F4A261' }}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto flex flex-col">

        {/* ── Header ── */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-800">Pedido de Adoção</h2>
              <p className="text-sm text-gray-500 mt-0.5">Para adotar <strong>{petName}</strong></p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {STEP_META.map((meta, i) => {
              const StepIcon = meta.icon;
              const done    = i + 1 < step;
              const active  = i + 1 === step;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full h-1.5 rounded-full transition-all ${
                      done || active ? 'bg-[#2A9D8F]' : 'bg-gray-200'
                    }`}
                  />
                  <div className={`hidden sm:flex items-center gap-1 text-xs mt-0.5 ${
                    active ? 'text-[#2A9D8F]' : done ? 'text-gray-400' : 'text-gray-300'
                  }`}>
                    <StepIcon className="w-3 h-3" />
                    <span>{meta.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Error banner */}
          {hasErrors && (
            <div className="flex items-start gap-2.5 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              Preencha todos os campos obrigatórios antes de continuar.
            </div>
          )}
        </div>

        {/* ── Form Body ── */}
        <div className="p-6 flex-1">

          {/* STEP 1 — Dados Pessoais */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-800 mb-1">Informações Pessoais</h3>
              <p className="text-sm text-gray-500 mb-4">Precisamos conhecer você para garantir o melhor lar para {petName}.</p>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Nome Completo *</label>
                <input type="text" value={formData.fullName} onChange={set('fullName')}
                  className={inputCls(errors.fullName)} placeholder="Nome e sobrenome" />
                <FieldError msg={errors.fullName} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">E-mail *</label>
                <input type="email" value={formData.email} onChange={set('email')}
                  className={inputCls(errors.email)} placeholder="seu@email.com" />
                <FieldError msg={errors.email} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Telefone com DDD *</label>
                <input type="tel" value={formData.phone} onChange={set('phone')}
                  className={inputCls(errors.phone)} placeholder="(11) 98765-4321" />
                <FieldError msg={errors.phone} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Sua idade *</label>
                <input type="number" min={18} max={120} value={formData.age} onChange={set('age')}
                  className={inputCls(errors.age)} placeholder="Ex: 28" />
                <FieldError msg={errors.age} />
                {!errors.age && <p className="text-xs text-gray-400 mt-1">É necessário ter 18 anos ou mais.</p>}
              </div>
            </div>
          )}

          {/* STEP 2 — Endereço */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-800 mb-1">Endereço Residencial</h3>
              <p className="text-sm text-gray-500 mb-4">Informe onde {petName} irá morar.</p>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Endereço completo *</label>
                <input type="text" value={formData.address} onChange={set('address')}
                  className={inputCls(errors.address)} placeholder="Rua, número, complemento" />
                <FieldError msg={errors.address} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Cidade *</label>
                  <input type="text" value={formData.city} onChange={set('city')}
                    className={inputCls(errors.city)} placeholder="Sua cidade" />
                  <FieldError msg={errors.city} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Estado (UF) *</label>
                  <input type="text" maxLength={2} value={formData.state} onChange={set('state')}
                    className={inputCls(errors.state)} placeholder="SP" />
                  <FieldError msg={errors.state} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">CEP *</label>
                <input type="text" maxLength={9} value={formData.zipCode} onChange={set('zipCode')}
                  className={inputCls(errors.zipCode)} placeholder="00000-000" />
                <FieldError msg={errors.zipCode} />
              </div>
            </div>
          )}

          {/* STEP 3 — Sobre o Lar */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-gray-800 mb-1">Informações sobre o Lar</h3>
              <p className="text-sm text-gray-500 mb-4">Queremos garantir que {petName} terá todo o conforto e segurança que merece.</p>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Você tem experiência com pets? *</label>
                <select value={formData.hasExperience} onChange={set('hasExperience')}
                  className={inputCls(errors.hasExperience)}>
                  <option value="">Selecione uma opção...</option>
                  <option value="yes">Sim, já tive ou tenho pets</option>
                  <option value="no">Não, será meu primeiro pet</option>
                </select>
                <FieldError msg={errors.hasExperience} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Você tem outros animais em casa? *</label>
                <select value={formData.hasOtherPets} onChange={set('hasOtherPets')}
                  className={inputCls(errors.hasOtherPets)}>
                  <option value="">Selecione uma opção...</option>
                  <option value="yes">Sim, tenho outros animais</option>
                  <option value="no">Não, serei o único animal</option>
                </select>
                <FieldError msg={errors.hasOtherPets} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Sua residência tem quintal cercado? *</label>
                <select value={formData.hasFencedYard} onChange={set('hasFencedYard')}
                  className={inputCls(errors.hasFencedYard)}>
                  <option value="">Selecione uma opção...</option>
                  <option value="yes">Sim, tenho quintal cercado</option>
                  <option value="no">Não tenho quintal</option>
                  <option value="na">Moro em apartamento</option>
                </select>
                <FieldError msg={errors.hasFencedYard} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Qual seu horário de trabalho? *</label>
                <input type="text" value={formData.workSchedule} onChange={set('workSchedule')}
                  className={inputCls(errors.workSchedule)} placeholder="Ex: 9h às 18h, trabalho em casa..." />
                <FieldError msg={errors.workSchedule} />
              </div>
            </div>
          )}

          {/* STEP 4 — Motivação */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-gray-800 mb-1">Sua Motivação</h3>
              <p className="text-sm text-gray-500 mb-4">Esta é a parte mais importante! Conte-nos com carinho por que {petName} é o companheiro ideal para você.</p>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Por que você deseja adotar {petName}? *
                </label>
                <textarea
                  value={formData.whyAdopt}
                  onChange={set('whyAdopt')}
                  rows={6}
                  className={`${inputCls(errors.whyAdopt)} resize-none`}
                  placeholder="Ex: Sempre tive paixão por animais e sinto que {petName} se encaixaria perfeitamente na nossa rotina..."
                />
                <div className="flex items-start justify-between mt-1.5">
                  <FieldError msg={errors.whyAdopt} />
                  <span className={`text-xs ml-auto ${formData.whyAdopt.trim().length >= 30 ? 'text-[#2A9D8F]' : 'text-gray-400'}`}>
                    {formData.whyAdopt.trim().length}/30 caracteres mín.
                  </span>
                </div>
              </div>

              {/* Resumo */}
              <div className="bg-[#f0faf9] rounded-2xl p-4 mt-2">
                <p className="text-sm text-[#2A9D8F] mb-3">Resumo do seu pedido</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p><span className="text-gray-400">Nome:</span> {formData.fullName}</p>
                  <p><span className="text-gray-400">E-mail:</span> {formData.email}</p>
                  <p><span className="text-gray-400">Cidade:</span> {formData.city} – {formData.state}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-green-800">
                    Após o envio, nossa equipe analisará seu perfil e entrará em contato em até <strong>48 horas</strong> para agendar uma visita ao abrigo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 rounded-b-3xl">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </button>
            )}

            <div className="flex-1" />

            <span className="text-xs text-gray-400">
              Etapa {step} de {totalSteps}
            </span>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all text-sm"
                style={{ backgroundColor: '#F4A261' }}
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all text-sm"
                style={{ backgroundColor: '#2A9D8F' }}
              >
                <Check className="w-4 h-4" />
                Enviar Pedido
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
