# Applifting Blog Engine fullstack exercise

- [Assignment](./assignment.md)

# Dev tools

## Codegen

When dev api is running (port 3000), `npm run codegen` generates the types from exposed graphQL schema.

These generated types (`src/generated/types.ts`) are used to type args in all queries/mutations. 

# Run and try api

## Dev environment

**Run postgres container**
`docker run --name devPostgres --env-file .env.dev -p 5432:5432 -d postgres`

**Create tables**
`npm run db:migrate:dev`

**Seed tables**
`npm run db:seed:dev`

**Run the api**
`npm run start:dev`

**Access sandbox** 
`localhost:3000`. You can play around and see documentation

## Prod environment - docker-compose



- `npm run compose:dev` will use `.env.dev` file. When hosting the api, we would run `npm run compose:prod` and copy `.env` file on the server.
- try the api:
  - Access Apollo sandbox at `http://localhost:13000`
  - Import `postman_collection.json` in Postman to have prepared queries