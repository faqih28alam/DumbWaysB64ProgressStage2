# 📝 Stage 2 Day 1 - Blog
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic & Task
Day 2 - Express + Prisma Basic CRUD
- Setup PostgreSQL + Prisma
- Migrate database for users & posts table
- Create API for CRUD users & posts using **prisma**

## 🛠️ How to Setup Typescript
```text
Follow these steps to initialize the TypeScript environment:

- make a folder to contain the project
- npm init -y                                               # to initiliaze Node.js Environment
- npm install express                                       # to install Express Framework
- npm install -D typescript ts-node-dev @types/express      # to install typscript
- npx tsc --init                                            # execute typescript package
- make dir src at root
- create app.ts file inside src
- edit tsconfig.json, define root folder ex: ("rootDir": "./src")
- edit package.json, define inside scripts "dev": "ts-node-dev --respawn src/app.ts"
- npm run dev                                               # to run app.ts

```

## 🛠️ How to Setup Prisma 6 with PostgreSQL
```text
- npm install prisma@6 --save-dev                           # install Prisma CLI v6
- npm install @prisma/client@6                              # install Prisma Client v6
- create database in pgAdmin (e.g., "mini_store_db")
- npx prisma init                                           # initialize Prisma folder
- edit .env file:
  DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

- edit prisma/schema.prisma (Ensure URL is inside the datasource block):
  generator client {
    provider = "prisma-client-js"
    output   = "../src/generated/prisma"
  }

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  model posts {
    id        Int      @id @default(autoincrement())
    title     String
    content   String
    author    String
    createdAt DateTime @default(now())
  }

- npx prisma generate                                       # generate the client code
- npx prisma migrate dev --name init                        # push schema to PostgreSQL
- create src/connection/client.ts
```

## 📂 Project Structure
```text
This project follows a modular structure to separate concerns:

├── src/
│   ├── app.ts                  # Application entry point & configuration
│   ├── connection/
│   │   └── client.ts           # Prisma Client instantiation
│   ├── routes/                 # API endpoint definitions (URL paths)
│   │   ├── post-route.ts       # Routes for Post-related resources
│   │   └── user-route.ts       # Routes for User-related resources
│   ├── controllers/            # Request handling & business logic
│   │   ├── post-controller.ts  # Logic for Post operations
│   │   └── user-controller.ts  # Logic for User operations
│   ├── models/                 # Data schemas & database interactions
│   │   └── post-model.ts       # Post data structure (e.g., Mongoose/Sequelize)
│   └── ...
├── .env                        # Environment variables (DB URL)
├── package.json                # Project dependencies & scripts
└── tsconfig.json
```

---
## 🚀 Implementation Flow
```text
1. Model: Define the Post interface/type.
2. Controller: Write functions to handle getPosts and createPost.
3. Routes: Map the controller functions to HTTP methods (GET/POST).
4. App: Import and use the routes in app.ts.

💡 Note on Naming Conventions: > In Express, it is common to use kebab-case (e.g., post-controller.ts) or camelCase for files. Consistency is key!
```

### 💡 Helpful Tips
- Prisma Client: In src/connection/client.ts, simply use:
```text
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

---

#### Notes
- Read about "naming convention files & folders in express js"
- tsconfig.json template:
```text
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

```
- prisma documentation : https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/postgresql
- prisma CRUD : https://www.prisma.io/docs/orm/prisma-client/queries/crud