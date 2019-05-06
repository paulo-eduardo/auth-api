# auth-api

This is an exemplo of an authentication API using Redis, Postgres and Node

### How to run

- run `npm install` inside auth folder
- on the root folder of the project run `docker-compose up -d --build` to build and run your project

### Endpoints

- Register
  - `localhost:3001/register`, { usuario: string, password: string }
- Signin
  - `localhost:3001/signin`, { usuario: string, password: string }
