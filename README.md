# Stage 2 Day 1
Repository to store our learning progress at Dumbways.id Bootcamp

## Topic
Day 1 - Basic Express with Typescipt(without database, Dummy data)

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
│   ├── app.ts                      #
│   ├── routes/                     # 
|   |   └──  post-route.ts
│   ├── controllers/                # 
|   |   └──  post-controller.ts
│   └── models/                     # 
|       └──  post-model.ts
│             
└── package.json                    # Project dependencies & scripts

- Import Express in app.ts
- add code in post-route.ts
- add code in post-model.ts  
- add code in post-controller.ts


```

#### Notes
- Read about "naming convention files & folders in express js"