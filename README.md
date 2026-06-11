# 🐾 Amigo Fiel — Sistema de Adoção de Pets

> Conectando pets abandonados a famílias que querem dar uma nova chance.

---

## 📖 Sobre o Projeto

O **Amigo Fiel** é uma plataforma web de adoção responsável de animais, desenvolvida como projeto acadêmico. A ideia nasceu da necessidade de dar mais visibilidade aos pets em situação de abandono, conectando-os a famílias dispostas a oferecer um lar com amor.

A plataforma permite que ONGs e abrigos cadastrem animais disponíveis para adoção, enquanto usuários podem navegar pelo catálogo, conhecer cada pet e solicitar a adoção de forma simples e rápida.

---

## ✨ Funcionalidades

### Para Usuários (Adotantes)
- 🔍 Busca e filtro de pets por tipo, porte, idade e temperamento
- 🐶 Página detalhada de cada pet com fotos, história e características
- 📋 Solicitação de adoção com formulário completo
- 👤 Cadastro e login de conta

### Para Administradores / ONGs
- ➕ Cadastro e edição de pets
- 🗑️ Remoção de pets do catálogo
- ✅ Aprovação ou rejeição de pedidos de adoção
- 📊 Dashboard com estatísticas gerais

### Geral
- 🏠 Landing page com história e apresentação do projeto
- 📞 Página de contato
- 📱 Design responsivo

---

## 🎯 Público Alvo

- Pessoas interessadas em adotar um animal de estimação
- ONGs e abrigos que desejam divulgar pets disponíveis para adoção
- Protetores independentes de animais

---

## 🛠️ Tecnologias Utilizadas

- **React 18** — biblioteca de interface
- **TypeScript** — tipagem estática
- **React Router v7** — navegação entre páginas
- **Tailwind CSS** — estilização
- **Vite** — bundler e servidor de desenvolvimento
- **Lucide React** — ícones

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) v18 ou superior
- npm (já vem com o Node)

### Passo a passo

**1. Clone o repositório:**
```bash
git clone https://github.com/MiguelDevType/Amigo-fiel.git
cd Amigo-fiel/projeto-amigo-fiel
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Rode o projeto:**
```bash
npm run dev
```

**4. Acesse no navegador:**
```
http://localhost:5173
```

---

## 🔐 Credenciais de Acesso (Demo)

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Administrador | `admin.gmail.com@teste` | `admin123` |
| ONG | `ong@amigofiel.com` | `ong123` |

> Usuários comuns podem se cadastrar normalmente pela tela de login.

---

## 📁 Estrutura do Projeto

```
projeto-amigo-fiel/
├── src/
│   ├── app/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── context/       # Contexto de autenticação
│   │   ├── data/          # Dados mockados (pets, pedidos)
│   │   ├── layouts/       # Layout principal
│   │   └── pages/         # Páginas da aplicação
│   └── styles/            # Estilos globais
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🌐 Deploy

O projeto está hospedado na **Vercel**:  
🔗  amigo-fiel-efo8.vercel.app

---

## 👨‍💻 Desenvolvido por

**Miguel Lucena**
**Pietro Toledo**
**João Guilherme**
**Nathan Rodrigues**
**Enrico**
**Rodrigo**
**Arthur Miranda**


---

*Projeto acadêmico desenvolvido com 💚 para ajudar pets a encontrarem um lar.*
