# WasteCollector

Sistema de coleta e gerenciamento de resíduos recicláveis.

## Tecnologias

### Backend (NestJS)
- Node.js
- NestJS
- Prisma (PostgreSQL)
- JWT Authentication
- Swagger
- Jest

### Frontend (React)
- React 19
- TypeScript
- Material-UI v5
- React Router v6
- Axios

## Estrutura do Projeto

```
wastecollector/
├── backend/               # API NestJS
│   ├── src/
│   │   ├── modules/      # Módulos da aplicação
│   │   ├── controllers/  # Controladores
│   │   ├── services/     # Serviços
│   │   └── app.ts        # Arquivo principal
│   ├── prisma/           # Configuração do Prisma
│   └── tests/            # Testes
│
└── frontend/             # Aplicação React
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── contexts/     # Contextos React
    │   ├── pages/        # Páginas da aplicação
    │   ├── services/     # Serviços e APIs
    │   ├── App.tsx       # Componente principal
    │   └── theme.tsx     # Tema Material-UI
    └── public/           # Arquivos estáticos
```

## Como Executar

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o ambiente:
```bash
cp .env.example .env
```

4. Inicie o Docker (banco de dados):
```bash
docker-compose up -d
```

5. Execute as migrações:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

A API estará disponível em `http://localhost:3000`
Documentação Swagger: `http://localhost:3000/api`

### Frontend

1. Em outro terminal, entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend estará disponível em `http://localhost:3001`

## Scripts Disponíveis

### Backend
```bash
npm run start:dev    # Inicia em modo desenvolvimento
npm run start:prod   # Inicia em modo produção
npm run test        # Executa os testes
npm run lint        # Executa o linter
npm run format      # Formata o código
```

### Frontend
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Compila para produção
npm test          # Executa os testes
npm run eject     # Ejecta do Create React App
```

## Funcionalidades

- Autenticação de usuários (JWT)
- Gerenciamento de tipos de resíduo
- Registro de coletas
- Dashboard com estatísticas
- Histórico de coletas
- Informações sobre reciclagem

## Desenvolvimento

O backend utiliza NestJS com Prisma como ORM, oferecendo uma API RESTful com autenticação JWT e documentação Swagger.

O frontend é uma aplicação React moderna usando Material-UI para a interface, com roteamento via React Router e gerenciamento de estado através de Context API.


