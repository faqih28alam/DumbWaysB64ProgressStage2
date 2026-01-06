# 📝 Stage 2 Day 2 - Shopping Cart
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic & Task
Day 2 - Express + Prisma Basic CRUD
- Define Products's Table Schema
- Migrate Products's Table Database using **Prisma** CLI
- Create API to Update & Delate Products's Table using Prisma

## 🛠️ How to 
```text
- make a folder to contain the project
- npm init -y                                               # to initiliaze Node.js Environment
- npm install express                                       # to install Express Framework
- npm install -D typescript ts-node-dev @types/express      # to install typscript
- npx tsc --init                                            # execute typescript package
- make dir src at root
- create app.ts file inside src
- edit tsconfig.json, define root folder ex: ("rootDir": "./src")
- edit package.json, define inside scripts "dev": "ts-node-dev src/app.ts"
- npm run dev                                               # to run app.ts

```

## 📂 Project Structure
```text
This project follows a modular structure to separate concerns:

├── src/
│   ├── app.ts                  # Entry point (Express setup)
│   ├── routes/
│   │   ├── product-route.ts    # Routes for CRUD Product
│   │   └── order-route.ts      # Routes for CRUD Order (Cart)
│   ├── controllers/
│   │   ├── product-controller.ts
│   │   └── order-controller.ts
│   ├── models/
│   │   ├── product-model.ts    # Product Schema (Name, Price, etc.)
│   │   └── order-model.ts      # Order Schema (linked to Product ID)
│   └── middlewares/            # Optional: for validation
└── package.json
```

## 🚀 Implementation Flow
```text
1. Model: Define the interface/type.
2. Controller: Write functions to handle CRUD.
3. Routes: Map the controller functions to HTTP methods (GET/POST).
4. App: Import and use the routes in app.ts.

💡 Note on Naming Conventions: > In Express, it is common to use kebab-case (e.g., post-controller.ts) or camelCase for files. Consistency is key!
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