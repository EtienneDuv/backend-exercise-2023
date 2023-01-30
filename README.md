# Applifting Blog Engine fullstack exercise

### Relevant links

- [Assignment](https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md)
- [Prototype](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=2%3A3&viewport=148%2C245%2C0.12103988230228424&scaling=min-zoom)
- [Screens](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-|-Full-Stack-Cvičení)
- [OpenAPI specification](https://github.com/Applifting/fullstack-exercise/blob/master/api.yml)
- [JSON schema specification for WebSocket API](https://github.com/Applifting/fullstack-exercise/blob/master/ws.json)
- [Deployed Backend](https://fullstack.exercise.applifting.cz) `https://fullstack.exercise.applifting.cz`

# TODO

- ✔ server
- ✔ basic structure
- ✔ sequelize + db
- ✔ authentication
- ✔ type generation codegen
- ✔ dockerize
- ✔ tests
- ✔ CI/CD
- new features:
  - ✔ Article CRUD
  - ✔ Comment CR
  - Comment +/-
  - Nested comments

# Dev tools

## Codegen

When dev app is running (port 3000), `npm run codegen` generates the types from exposed graphQL schema. 
These generated types (`src/generated`) are used to type args in all queries/mutations. 

# Run app

## Dev environment

**Run postgres container**

`docker run --name devPostgres --env-file .env.dev -p 5432:5432 -d postgres`

**Create tables**

`npm run db:migrate`

**Seed tables**

`npm run db:seed`

**Run the api**

`npm run start:dev`

## "Prod"

- Copy the `.env` file in root folder
- `npm run compose:prod`
- Access Apollo sandbox at `http://localhost:13000`

Or same setup but using `.env.dev`:
- `npm run compose:dev`