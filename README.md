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
  - Comment CR
  - Comment +/-
  - Nested comments

# Run app

## Dev environment

**Run postgres container**
`docker run --name devPostgres --env-file .env.dev -p 5432:5432 -d postgres`

**Run the api**
`npm run start:dev`

## Prod

- Copy the `.env` file in root folder

`docker-compose up -d`

Access Apollo sandbox at `http://localhost:13000`
