# Amigo Fiel: Sistema de Adoção de Pets

Plataforma web que conecta animais abandonados a famílias dispostas a adotar, e que ajuda ONGs e abrigos a divulgar os pets disponíveis.

**Demo:** [amigo-fiel-efo8.vercel.app](https://amigo-fiel-efo8.vercel.app)

## Problema e objetivo

**Problema:** muitos animais em abrigos e ONGs têm pouca visibilidade, e o processo de adoção costuma ser informal e difícil de acompanhar.

**Objetivo:** criar um catálogo online onde ONGs cadastram os pets e adotantes encontram, conhecem e solicitam a adoção de forma simples. O administrador acompanha e responde os pedidos em um só lugar.

**Público:** pessoas que querem adotar, ONGs, abrigos e protetores independentes.

## Funcionalidades

**Adotantes**
- Busca e filtro por tipo, porte, idade e temperamento
- Página detalhada de cada pet (fotos, história, características)
- Formulário de solicitação de adoção
- Cadastro e login

**Administradores e ONGs**
- Cadastro, edição e remoção de pets
- Aprovação ou rejeição de pedidos de adoção
- Dashboard com estatísticas gerais

**Geral**
- Landing page, página de contato e design responsivo

## Minha contribuição

Eu (Miguel Lucena) fiz todo o desenvolvimento do projeto:

- Planejamento e estrutura da aplicação
- Todas as páginas e componentes (catálogo, filtros, detalhe do pet, formulário de adoção, login, painel administrativo e landing page)
- Contexto de autenticação e dados fictícios
- Estilização responsiva com Tailwind CSS
- Deploy na Vercel
- Organização do repositório e documentação

João Guilherme participou da equipe do projeto acadêmico.

## Ferramentas e métodos

| Tecnologia | Uso |
|---|---|
| React 18 | Interface |
| TypeScript | Tipagem estática |
| React Router v7 | Navegação entre páginas |
| Tailwind CSS | Estilização |
| Vite | Bundler e servidor de desenvolvimento |
| Lucide React | Ícones |
| Vercel | Hospedagem |

Os dados (pets e pedidos) são fictícios e ficam em `src/app/data`. O projeto não usa banco de dados.

## Como executar

Requisitos: [Node.js](https://nodejs.org) v18+ e npm.

```bash
git clone https://github.com/MiguelDevType/Amigo-fiel.git
cd Amigo-fiel/projeto-amigo-fiel
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Acesso de demonstração

Contas fictícias, criadas apenas para testar o sistema:

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin.gmail.com@teste` | `admin123` |
| ONG | `ong@amigofiel.com` | `ong123` |

Usuários comuns podem se cadastrar na tela de login.

## Evidências

Demo online: [amigo-fiel-efo8.vercel.app](https://amigo-fiel-efo8.vercel.app)

(Adicione aqui prints das telas principais: catálogo, detalhe do pet e dashboard.)

## Estrutura do projeto

```
projeto-amigo-fiel/
├── src/
│   ├── app/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── context/      # Contexto de autenticação
│   │   ├── data/         # Dados mockados (pets, pedidos)
│   │   ├── layouts/      # Layout principal
│   │   └── pages/        # Páginas da aplicação
│   └── styles/           # Estilos globais
├── index.html
├── vite.config.ts
└── package.json
```

## Aprendizados e limitações

**O que aprendi**
- Organizar um projeto React com TypeScript e rotas
- Trabalhar com Git e GitHub
- Publicar uma aplicação na Vercel

**Limitações atuais**
- Os dados são mockados, sem back-end nem banco de dados
- A autenticação é simulada e não é segura para uso real
- Não há testes automatizados

## Próximos passos

- [ ] Criar um back-end com API e banco de dados
- [ ] Implementar autenticação real
- [ ] Adicionar testes automatizados
- [ ] Revisar acessibilidade (contraste, teclado, leitores de tela)
- [ ] Permitir upload real de fotos dos pets

## Referências e créditos

- [React](https://react.dev), [Vite](https://vitejs.dev), [Tailwind CSS](https://tailwindcss.com), [Lucide](https://lucide.dev)

## Autores

- [Miguel Lucena](https://github.com/MiguelDevType)
- Pietro Toledo
- João Guilherme
- Enrico

Projeto acadêmico, UNIPÊ.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
