# 📚 Livraria Digital

Sistema web de **Livraria Digital**, onde usuários podem visualizar, comprar livros físicos ou digitais, e donos de livraria podem gerenciar seu catálogo.  
O projeto é dividido em **Front-end (React)** e **Back-end (Laravel API)**, com autenticação via **Laravel Sanctum**.

---

## 🚀 Tecnologias Utilizadas

### Front-end

- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Back-end

- PHP (Laravel)
- Laravel Sanctum (autenticação)
- MySQL
- Eloquent ORM

## 📂 Estrutura do Projeto

## ⚙️ Requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (v18 ou superior)
- npm ou yarn
- PHP (8.1 ou superior)
- Composer
- MySQL
- Git

## 🔧 Instalação do Back-end (Laravel)

### 1️⃣ Acesse a pasta do back-end

```bash
cd backend

Instale as dependências do Laravel
bash
Copiar código
composer install

Crie o arquivo .env
bash
Copiar código
cp .env.example .env

Configure o .env
Edite o arquivo .env e ajuste os dados do banco:

env
Copiar código
DB_DATABASE=laravel1_202502_win
DB_USERNAME=sail
DB_PASSWORD=password

Gere a chave da aplicação
bash
Copiar código
php artisan key:generate

Execute as migrations
bash
Copiar código
php artisan migrate

Crie o link do storage (OBRIGATÓRIO para imagens)
bash
Copiar código
php artisan storage:link

Inicie o servidor Laravel
bash
Copiar código
php artisan serve

O back-end estará disponível em:
http://localhost:8080


🎨 Instalação do Front-end (React)

Acesse a pasta do front-end
bash
Copiar código
cd frontend

Instale as dependências
bash
Copiar código
npm install
ou

bash
Copiar código
yarn

Inicie o projeto React
bash
Copiar código
npm run dev

O front-end estará disponível em:
http://localhost:5173


🔐 Autenticação
O sistema utiliza Laravel Sanctum

O token é armazenado no localStorage

Tipos de usuários:

usuariocomum

donodalivraria


🖼️ Imagens dos Livros
As imagens são armazenadas no back-end em:

swift
Copiar código
storage/app/public/livros_imagens
A API retorna as imagens usando:

bash
Copiar código
http://localhost:8080/storage/...
É obrigatório rodar:

bash
Copiar código
php artisan storage:link


🛒 Compras
Usuários comuns podem:

Comprar livros físicos

Comprar livros digitais

Livros digitais aparecem na aba "Meus Livros Digitais"

Livros físicos seguem o fluxo normal de compra


Rotas Importantes da API
Públicas
POST /api/v1/login

POST /api/v1/usuarios

POST /api/v1/redefinir-senha

GET /api/v1/livros

Protegidas (auth:sanctum)
POST /api/v1/compras

POST /api/v1/livros

PUT /api/v1/livros/{id}

DELETE /api/v1/livros/{id}


🧪 Testes com Postman
Utilize o token retornado no login

Envie no header:

makefile
Copiar código
Authorization: Bearer SEU_TOKEN


📌 Observações Importantes
O projeto segue boas práticas de separação entre front-end e back-end

As telas de Login, Cadastro e Redefinir Senha não utilizam layout com header

O layout principal é aplicado apenas após autenticação


✅ Status do Projeto
✔️ Em desenvolvimento
✔️ Funcional
✔️ Estrutura organizada
```
