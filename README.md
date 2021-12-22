<div align="center">

![DevSchools](./docs/DevSchoolsLogo.svg)

</div>

<h1 align="center">🚧 Under development 🚧</h1>

![DevSchools-example01](./docs/example-01.gif)

# Table of contents
<!--ts-->

- [Prerequisites](#Prerequisites)
- [How to run the application](#How-to-run-the-application)
  - [Backend setup & start](#Backend-setup-&-start)
  - [Frontend setup & start](#Frontend-setup-&-start)
- [Tecnologies](#Tecnologies)
- [Author](#Author)
- [Features](/features.md)
<!--te-->

# Prerequisites

Before starting, you're gonna nedd to have [Docker](https://www.docker.com/get-started) installed on your machine. Besides that, a text editor like [VSCode](https://code.visualstudio.com/) is recommended.

# How to run the application

## Backend setup & start

1. Create a file `.env`
2. Copy what is inside `.env.example` and paste in `.env`
3. Change the necessary fields in `.env` [(setup Mailtrap)](/setupMailtrap.md)
4. Open the terminal at the backend folder and type the command bellow to build the backend and database containers:
   ```bash
   > docker-compose up --build -d
   ```
5. Run all the migrations:
   ```bash
   > docker exec devschools_backend yarn typeorm migration:run
   ```
6. Watch the backend logs:
   ```bash
   > docker logs -f devschools_backend
   ```

## Frontend setup & start

1. Open the terminal at the frontend folder and type the command bellow to install the required packages:
   ```bash
   > yarn
   ```
2. In frontend folder, type the command bellow:
   ```bash
   > yarn start
   ```

# Tecnologies

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

# Author

<a href="https://github.com/DanielGustavo">
  <img width=100 alt="Daniel Gustavo" src="https://avatars0.githubusercontent.com/u/51492635?v=4">
</a>

<p>Made by <a href="https://github.com/DanielGustavo"><b>Daniel Gustavo</b></a></p>

[![Gmail Badge](https://img.shields.io/badge/-danielgustavo5205@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:danielgustavo5205@gmail.com)](mailto:danielgustavo5205@gmail.com)