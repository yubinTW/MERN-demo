# MERN Demo

Mongo + Fastify + React + Node

## Create frontend (React) project

```
npx create-react-app frontend --template typescript
```

## Create backend (Fastify) project

[ref](https://www.fastify.io/docs/latest/TypeScript/)

```
mkdir backend
cd backend
npm init -y
npm i fastify fastify-static pino-pretty
npm i -D typescript @types/node
npx tsc --init
```
