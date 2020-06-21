# Mini project


## Usage

- Clone the repo: `git clone --recursive`

### For server development

#### Build
1. `npm run install-server` to install dependencies
2. Create a .env file in ./server with the help of .env.example
3. Manually create the database with the same name of the variable name `TYPEORM_DATABASE` in .env
4. `npm run typeorm migration:run` to run the db migrations
5. `npm run start-server` to start the server

#### Generating a new migration through typeorm
`npm run typeorm migration:generate -- -n MigrationName`

#### Revert last migration through typeorm
`npm run typeorm migration:revert`

#### Tests
1. `npm run install-server` to install dependencies
2. Create a .env.test file in ./server with the help of .env.example
3. `npm run test-server` to start the server

### For client development

1. `npm run install-client` to install dependencies
2. `npm run start-client` to start the client
3. `npm run build-client` to compile client code (ts)

### Technologies

- [Node](https://nodejs.org/en/download/)
- [Vue.js](https://cli.vuejs.org/guide/installation.html)
