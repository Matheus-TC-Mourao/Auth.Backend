# Projeto de Autenticação em Node.js com MongoDB, Express e JWT

Esta API foi desenvolvida para fornecer um sistema de autenticação e gerenciamento de usuários, construída em Node.js utilizando Express, MongoDB e JWT para autenticação. Ela oferece uma estrutura escalável e de fácil manutenção.

## Estrutura de Pastas

```plaintext
src/
├── controllers/       # Controladores para lidar com a lógica das rotas
├── db/                # Configuração e conexão com o banco de dados MongoDB
├── middleware/        # Middlewares, incluindo autenticação com JWT
├── models/            # Modelos Mongoose para definir os schemas do MongoDB
├── routes/            # Definição das rotas da API
└── app.ts             # Arquivo principal para iniciar a aplicação
```

## Rotas

### Rotas Públicas

- **GET /**
  Rota raiz da API. Pode ser utilizada para retornar uma mensagem de boas-vindas ou informações gerais do sistema.

- **POST /login**
  Rota para autenticação do usuário. Espera receber credenciais (como email e senha) e, se forem válidas, retorna um token JWT para utilização nas rotas privadas.

- **POST /register**
  Rota para registro de um novo usuário. Ao registrar o usuário, um token JWT pode ser gerado e retornado.

### Rota Privada

- **GET /dashboard**
  Rota protegida que requer a presença de um token JWT válido no header da requisição (via `Authorization: Bearer <token>`). Utiliza um middleware para verificar a validade do token antes de permitir o acesso.

## Tecnologias Utilizadas

- **Node.js & Express:** Framework e runtime para construir a API.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos usuários e demais informações.
- **Mongoose:** Biblioteca para modelagem de objetos MongoDB e conexão com o banco de dados.
- **JSON Web Token (JWT):** Para autenticação e autorização de usuários.
- **TypeScript :** Projeto deve estar configurado com TypeScript para tipagem estática.

## Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (ou uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
MONGO_URL=mongodb://localhost:27017/seuBancoDeDados
JWT_SECRET=suaChaveSecreta
PORT=3300
```

> **Atenção:** Se estiver utilizando o MongoDB Atlas, altere o `MONGO_URL` para o URI fornecido pela plataforma.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

### Rodando a Aplicação

Inicie o servidor com:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3300`.

## Uso

### Exemplo de Requisições

- **Registro de Usuário (POST /register):**

  ```json
  POST http://localhost:3300/register
  Content-Type: application/json

  {
    "nome": "Fulano",
    "email": "fulano@example.com",
    "senha": "suaSenhaSegura"
  }
  ```

- **Login (POST /login):**

  ```json
  POST http://localhost:3000/login
  Content-Type: application/json

  {
    "email": "fulano@example.com",
    "senha": "suaSenhaSegura"
  }
  ```

  O login retornará um token JWT que deverá ser utilizado para acessar a rota protegida.

- **Acesso à Rota Privada (GET /authRoute):**

  ```http
  GET http://localhost:3000/dashboard
  Authorization: Bearer <seu_token_jwt>
  ```

  Se o token for válido, o acesso à rota será permitido.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para maiores informações, abra uma _issue_ ou envie um _pull request_.

