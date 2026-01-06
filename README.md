# 📝 Stage 2 Day 1 - Blog / Checkpoint 1
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic - Task
Day 1 - Basic Express with Typescipt(without database, Dummy data)
- Setup Express
- Create Create & Read Post (Blog)

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
- edit package.json, define inside scripts "dev": "ts-node-dev src/app.ts"
- npm run dev                                               # to run app.ts

```

## 📂 Project Structure
```text
This project follows a modular structure to separate concerns:

├── src/
│   ├── app.ts                # Application entry point & configuration
│   ├── routes/               # API endpoint definitions (URL paths)
│   │   └── post-route.ts     # Routes for Post-related resources
│   ├── controllers/          # Request handling & business logic
│   │   └── post-controller.ts # Logic for Post operations
│   ├── models/               # Data schemas & database interactions
│   │   └── post-model.ts      # Post data structure (e.g., Mongoose/Sequelize)
│   └── ...
└── package.json              # Project dependencies & scripts
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
---

#### Notes
- Read about "naming convention files & folders in express js"