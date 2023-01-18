# Backend Developer Exercise

## Introduction

- your task is to implement a simple single-user blogging engine in Node.js
- we realize that some subtasks can be very time consuming, if you just don't have the time, you can write short text description of how would you solve the problem

## Technologies

- Apollo Server
- Express
- PostgreSQL
- Sequelize
- Docker
- Chai/Mocha
- Typescript
- Docker

## The Exercise

- design the API yourself and document it
  - GraphQL documentation comments in schema
  - for GraphQL, expose GraphiQL or GraphQL Playground
- dockerize your app
  - create a Dockerfile for your app
  - create a docker-compose file that can be used to run your app with all dependencies

- implement login
  - the user should just need a password to login
  - seed the database with user data
- create simple CRUD for blog posts (articles)
  - each article should have title, perex and content
  - each article should also have a unique generated id
  - each article should also have a timestamp
- add the possibility to add comments to articles
  - a comment should have an author (just a string) and content
  - each comment should also have a timestamp
  - comments are flat, with relation only to article
    - nested comments are for bonus points
- add the possibility to vote on comments (Reddit-style + and -)
  - votes should identified by IP address and unique
- add the option to make commenting and voting realtime
  - via GraphQL Subscriptions or WebSockets
- present your ability to test the code
  - You don't have to test everything, add at least some unit tests
  - Optionally also include some integration and e2e tests
