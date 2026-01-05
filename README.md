# Stage 2 Day 1 - Shopping Cart / Checkpoint 2
Repository to store our learning progress at Dumbways.id Bootcamp

## Topic & Task
Day 1 - Basic Express with Typescipt(without database, Dummy data)
- Setup Express
- Create CRUD Product
- Create CRUD Order related to Product (Shopping Cart)
- Create Postman Documentation

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
- edit package.json, define inside scripts "dev": "ts-node-dev src/app.ts"
- npm run dev                                               # to run app.ts

```

## 🛠️ Project Setup
```text
- Create files & folders so the structure like these:

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

- Import Express in app.ts
- add code in routes
- add code in models
- add code in controllers


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