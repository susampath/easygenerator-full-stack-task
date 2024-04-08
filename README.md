#### ================================Backend==============================
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

#### ================================Frontend==============================

# Getting Started with Create React App

This project was developed with [Create React App](https://github.com/facebook/create-react-app).

## Set Up

Clone the repository and move into the directory.
Install dependencies using `npm install`

### Setting up the .env file

To configure the backend API base URL and frontend webapp port for your React app, follow these steps:

1. Add a `.env` file in the root directory of your project.FYI : Sample env file has been attached in the root directory.
2. Add the following lines:

REACT_APP_BACKEND_API_BASE_URL=http://localhost:4000/api/v1 \
REACT_APP_BACKEND_API_BASE_URL will use for the backend api base url.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

FYI : I have only wrote unit test for the login container due to time constraints.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### Husky with GitHooks

The Husky package has been utilized in this project to manage Git hooks, \
ensuring the maintenance of code quality standards. Specifically, two Git hooks,\
namely Prettier and Unit Tests, have been configured as pre-commit hooks. \
These hooks are instrumental in automatically formatting code and executing unit tests before committing changes,\
thereby promoting consistency and reliability across the codebase.

## NodeJS version

Please note that use NodeJS version v18.19.0 for this frontend app to compatibility purposes.

### ===========================DB===================================

A sample MongoDB collection has been uploaded to the mongodb-backup folder.

### ===========================Postman================================

A postman collection has been uploaded to the postman folder.This include environment and apis.
