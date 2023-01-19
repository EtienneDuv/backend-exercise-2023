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
- sequelize + db
- dockerize
- tests
- new features

# Run app

`docker run --name postgreDb --env-file .env -p 15432:5432 -d postgres`