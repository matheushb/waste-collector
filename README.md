# WasteCollect - Sistema de Coleta de Resíduos

WasteCollect é uma aplicação web moderna para gerenciamento de coleta de resíduos recicláveis, desenvolvida com NestJS (backend) e React (frontend). O sistema permite que usuários registrem suas coletas de resíduos, acumulem pontos e acompanhem seu histórico de reciclagem.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS**: Framework Node.js para construção de aplicações server-side
- **Prisma**: ORM moderno para banco de dados
- **PostgreSQL**: Banco de dados relacional
- **TypeScript**: Superset JavaScript com tipagem estática
- **JWT**: Autenticação baseada em tokens
- **Class Validator**: Validação de dados
- **Passport**: Autenticação e autorização

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset JavaScript com tipagem estática
- **Material-UI**: Biblioteca de componentes React
- **React Router**: Roteamento da aplicação
- **Axios**: Cliente HTTP para requisições
- **React Query**: Gerenciamento de estado e cache
- **Emotion**: Estilização CSS-in-JS

## 📋 Estrutura do Projeto

```
wastecollect/
├── backend/                 # Aplicação NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticação
│   │   ├── collections/    # Módulo de coletas
│   │   ├── users/         # Módulo de usuários
│   │   ├── waste-types/   # Módulo de tipos de resíduos
│   │   └── prisma/        # Configuração do Prisma
│   └── prisma/
│       └── schema.prisma   # Schema do banco de dados
│
└── frontend/               # Aplicação React
    ├── src/
    │   ├── components/    # Componentes reutilizáveis
    │   ├── pages/        # Páginas da aplicação
    │   ├── services/     # Serviços e APIs
    │   ├── hooks/        # Custom hooks
    │   └── types/        # Definições de tipos
    └── public/           # Arquivos estáticos
```

## 🛠️ Funcionalidades Principais

### Autenticação e Usuários
- Registro de novos usuários
- Login com email e senha
- Proteção de rotas
- Gerenciamento de sessão com JWT

### Coleta de Resíduos
- Registro de coletas com tipo e peso
- Cálculo automático de pontos
- Histórico de coletas
- Dashboard com estatísticas

### Tipos de Resíduos
- Catálogo de materiais recicláveis
- Pontuação específica por tipo
- Guia de reciclagem
- Dicas de separação

### Dashboard
- Total de pontos acumulados
- Número total de coletas
- Média de pontos por coleta
- Coletas recentes

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v16 ou superior)
- PostgreSQL
- npm ou yarn

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo .env com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run start:dev
```

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível em:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## 📝 Modelo de Dados

### Usuário (User)
- id: UUID
- email: String (único)
- password: String (hash)
- name: String
- createdAt: DateTime
- updatedAt: DateTime

### Tipo de Resíduo (WasteType)
- id: UUID
- name: String
- description: String
- pointsPerKg: Float
- createdAt: DateTime
- updatedAt: DateTime

### Coleta (Collection)
- id: UUID
- userId: UUID (referência ao User)
- wasteTypeId: UUID (referência ao WasteType)
- weight: Float
- points: Float
- date: DateTime
- createdAt: DateTime
- updatedAt: DateTime

## 🔒 Segurança

- Autenticação JWT
- Senhas criptografadas com bcrypt
- Validação de dados com class-validator
- Proteção contra CSRF
- Rate limiting
- Sanitização de inputs

## 🎨 Interface do Usuário

### Componentes Principais
- Navbar: Navegação principal
- Dashboard: Visão geral das coletas
- Formulário de Coleta: Registro de novas coletas
- Histórico: Lista de coletas anteriores
- Guia de Reciclagem: Informações sobre tipos de resíduos

### Design System
- Material-UI como base
- Tema personalizado com cores da reciclagem
- Layout responsivo
- Componentes reutilizáveis
- Feedback visual para ações do usuário

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔄 Fluxo de Trabalho

1. Usuário faz login/registro
2. Acessa o dashboard para ver estatísticas
3. Registra novas coletas
4. Consulta histórico de coletas
5. Acessa guia de reciclagem para informações

## 🧪 Testes

### Backend
```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

### Frontend
```bash
# Testes unitários
npm test

# Testes e2e (com Cypress)
npm run cypress:open
```

## 📈 Próximos Passos

- [ ] Implementar sistema de recompensas
- [ ] Adicionar gamificação
- [ ] Integrar com mapas para pontos de coleta
- [ ] Desenvolver aplicativo mobile
- [ ] Adicionar relatórios e análises
- [ ] Implementar sistema de notificações

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - Desenvolvimento inicial

## 🙏 Agradecimentos

- Material-UI pela biblioteca de componentes
- NestJS pela estrutura robusta do backend
- Prisma pelo ORM moderno e intuitivo
- Comunidade open source por todas as ferramentas utilizadas 