# 📝 Stage 2 Day 4 - Mini Store
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic & Task
Day 4 - **Prisma Transaction**, and **Middleware** (Case: Stock CRUD)

* Set up Prisma Schema for the Products, Stocks, and Suppliers tables.
* Manage simultaneous stock updates from multiple suppliers using Batch Queries.
* Validate stock items to ensure new stock values are not negative.
* Implement Exception Handling with Middleware to handle stock-related errors, such as negative stock or "supplier not found."
* Create a `/suppliers/stock` endpoint using Transactions and Batch Queries to update stock items from multiple suppliers at once.
* Add Custom Validation to ensure updated stock values cannot be negative.
* Create Middleware to handle errors using Exception Handling, such as invalid stock or "supplier not found."

## 🛠️ How to Setup Typescript 
```text
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
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  model Product {
    id        Int      @id @default(autoincrement())
    name      String
    price     Float
    createdAt DateTime @default(now())
  }

- npx prisma generate                                       # generate the client code
- npx prisma migrate dev --name init                        # push schema to PostgreSQL
- npx prisma studio                                         # to see Data in localhost:555, execute at other bash
```

## 🛠️ How to do Seeding
```text
- Edit the model in schema.prisma
    model User {
      id     Int     @id @default(autoincrement())
      name   String
      email  String  @unique
      orders Order[]
    }

    model Product {
      id     Int     @id @default(autoincrement())
      name   String
      price  Int
      stock  Int
      orders Order[]
    }

    model Order {
      id        Int @id @default(autoincrement())
      userId    Int
      productId Int
      quantity  Int

      user    User    @relation(fields: [userId], references: [id])
      product Product @relation(fields: [productId], references: [id])
    }
- npx prisma migrate dev --name init
- npx prisma generate
- add src/connection/seed.ts
- add your code seed.ts
- edit package.json,
    "prisma": {
        "seed": "ts-node src/connection/seed.ts"
      }, 
- npx prisma db seed
```

## 🛠️ Step to setup Day 4 project
```text
- Edit schema.prisma (Add your new model/fields).
- Edit seed.ts (Update your dummy data).
- Run npx prisma migrate dev --name init (This creates the migration and generates types).
- Run npx prisma migrate reset (This wipes the mess, applies migrations, generates types again, and runs your seed).
- Run npx prisma db seed (Execute the Seed, not necessary)
- Run npx prisma studio (check the database)
- add code to src/controllers/transferPoints-controller.ts
- add code to src/routes/transferPoints-route.ts
- add code to app.ts
```

## 📂 Project Structure
```text
├── prisma/
│   ├── schema.prisma           # Prisma Schema (v6 style)
│   └── migrations/             # Database migration history
├── src/
│   ├── app.ts                  # Entry point
│   ├── connection/
│   │   ├── seed.ts             # to perform seeding
│   │   └── client.ts           # Prisma Client instantiation
│   ├── routes/
│   │   ├── transferPoint-route.ts
│   │   ├── product-route.ts    
│   │   └── order-route.ts      
│   ├── controllers/
│   │   ├── transferPoint-controller.ts
│   │   ├── product-controller.ts
│   │   └── order-controller.ts
│   └── middlewares/            # to bridge proccess
│       └── validateStockUpdate-middleware.ts 
├── .env                        # Environment variables (DB URL)
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🚀 Implementation Flow
```text
1. Setup TypeScript: Configure the compiler and folder structure.
2. Setup Prisma 6: Install specific version 6 to match learning materials.
3. Model Definition: Define the Product table in schema.prisma.
4. Seeding: Create Data based on model and insert Datas to the Database
5. Migration: Use npx prisma migrate dev to create the table in PostgreSQL.
6. Controller Logic: Use prisma.product.create/findMany/update/delete in your controllers.
7. Middleware : to handle validation between process (perform ACID)

💡 Note on Naming Conventions: > In Express, it is common to use kebab-case (e.g., post-controller.ts) or camelCase for files. Consistency is key!
```

### 💡 Helpful Tips
- Prisma Client: In src/connection/client.ts, simply use:
```text
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

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