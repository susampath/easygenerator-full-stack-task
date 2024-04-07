# Getting Started with Micro Service

This project was developed with [Nest JS](https://docs.nestjs.com/).

## Set Up
Clone the repository and move into the directory.
Install dependencies using `npm install`

### Environment Configuration

To configure environment variables, create a .env file in the root directory of your project.

1. Add a `.env` file in the root directory of your project.
2. Add the necessary variables referring to .sample.env file:\
   `Example : PORT=4000`

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.


### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app  to the `dist` folder.

Builds the app for production to the dist folder.
It correctly bundles NestJS in production mode and optimizes the build for the best performance.

### `npm run start:prod`
Runs the app in production mode.
Make sure to build the app first using npm run build.



### Logger Implementation
For logging purposes, I have integrated Winston with the NestJS logger. There are two types of loggers utilized in this setup.

The first logger serves as a middleware, capturing and logging request details. It provides insights into incoming requests, enabling the tracking of request paths, HTTP methods, and other pertinent information.

The second logger functions as a general-purpose logger, equipped with various log levels such as error, info, warn, etc. \
This logger is instrumental in recording application events, errors, informational messages, and warnings, facilitating comprehensive monitoring and debugging of the application's behavior.

### Swagger Documentation
To view swagger documentation please visit this url:\
[Swagger Link](http://localhost:4000/api/v1/swagger-documentation)

### Husky with GitHooks
The Husky package has been utilized in this project to manage Git hooks, \
ensuring the maintenance of code quality standards. Specifically, two Git hooks,\
namely Prettier and Unit Tests, have been configured as pre-commit hooks. \
These hooks are instrumental in automatically formatting code and executing unit tests before committing changes,\
thereby promoting consistency and reliability across the codebase.



## NodeJS version
Please note that use Node.js version v18.19.0 for this backend app for compatibility purposes.


