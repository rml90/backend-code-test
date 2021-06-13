Welcome to this code test! :)

The main objective of this technical excercise is for you to get a good grasp of what kind of problems we encounter on Genially. We wouldn't want you to find some nasty surprises if you decide to join us.

# Test description

_The test is an extremely simplified version of the Genially API. We don't want you to spend more time than necessary but keep in mind that what we will value is the quality of the code you write. Therefore, it is preferable that you do your best in a partial and incomplete solution and describe how you would approach the rest of the test, rather than trying to deliver a complete, but low-quality, implementation._

In Genially we want to create a new (and amazing) API for our platform since our old (and problematic) API is too coupled to our infrastructure, among other problems. Our team has therefore decided to design it according to the principles of Clean Architecture. The main purpose of Clean Architecture is to improve maintainability and testability, as well as not depending on a particular database or a trendy framework.

The development has already started but our teammate has gone on a well-deserved holidays and you have to continue the work, implementing some features defined by our product team. Fortunately, our team documented the project structure:

| Name                           | Description                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **src**                        | Contains source code that will be compiled to the dist dir                                                                                              |
| **src/api**                    | Contains source code related to express api                                                                                                             |
| **src/api**/server.ts          | Entry point to express api                                                                                                                              |
| **src/api/controllers**        | Controllers define functions that respond to various http requests                                                                                      |
| **src/contexts**               | Bounded contexts (in terms of Domain-Driven Design) of our domain. Don't worry about the meaning, you can consider it another way of organizing code ;) |
| **src/contexts/core**          | Core (and only) bounded context of our domain                                                                                                           |
| **src/contexts/core/genially** | Module of the core context                                                                                                                              |
| jest.config.js                 | Used to configure Jest running tests written in TypeScript                                                                                              |
| package.json                   | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                                              |
| tsconfig.json                  | Config settings for compiling server code written in TypeScript                                                                                         |
| .eslintrc                      | Config settings for ESLint code style checking                                                                                                          |
| .eslintignore                  | Config settings for paths to exclude from linting                                                                                                       |

Additionally, each module of a bounded context is organized in different layers:

| Name               | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **application**    | Contains application services (i.e. use cases) that communicate with our domain                    |
| **domain**         | Contains building blocks that conform our domain                                                   |
| **infrastructure** | Contains artifacts that interact with external world, such as a particular database or web service |

As you will see, the project is in a very initial stage but some code has already been developed. Therefore, all the provided code (and the project structure) is under development and you can modify it if necessary.

# Test requirements

Our product team has asked us to implement some small features. The development of these features has been divided into stages for this test.

## Stage 1: Basic features

- **Create a new genially**: You have to create a new endpoint to enable the creation of new geniallys in our platform. There are some constraints to consider:

  - The name of a genially cannot be empty and its length has to be from 3 to 20 characters.
  - The description of a genially is limited to 125 characters.

- **Delete an existing genially**: You have to create a new endpoint to remove an existing genially. For internal requirements, when a genially is deleted, it is not removed in the database, you simply have to set the deletion date.

- **Rename an existing genially**: You have to create a new endpoint to change the name of an existing genially. When the genially is renamed, the modification date must be updated too.

In order to implement these features, you can use the given repository to persist in an in-memory database. Repository is a popular pattern used to mediate between the domain and persistence layer.

## Stage 2: Persistence

Once basic features have been implemented, we want to use a real database to persist our data. To do this, our team chose a document-based database, Mongo (https://www.mongodb.com/).

In this stage, you have to provide an **alternative implementation of GeniallyRepository in order to communicate with a Mongo database**. This implementation should be interchangeable with the provided InMemoryGeniallyRepository.

Feel free to use any framework or library as you need.

## Stage 3: Advanced features

- **Count the number of geniallys created**: For internal analytics, we want to know the number of geniallys that are created in our platform. When a new genially is created, this counter is increased. But if a genially is deleted, this counter should not be decreased.

# Technology included

As you can see, the code test is a simple API, with some included libraries and some code bundled with it. Let's go through some of the main technologies.

## Node.js

Node.js is the server-side JavaScript runtime environment.

https://nodejs.org/

## Express

Express.js, or simply Express, is a web application framework for Node.js, It has been called the de facto standard server framework for Node.js.

https://expressjs.com/

## Typescript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS.

https://www.typescriptlang.org/

# Contact

If you have any questions about the test, you can contact any of us:

- Chema (chema@genial.ly)
- Rubén (ruben@genial.ly)
- Francisco (francisco@genial.ly)

Good Luck!

***
# Changes in test code

## Project structure

The table below shows the new files and folders added to the project.

|Name  |Description  |
|---------|---------|
|**src/api/config/dependency-injection**| it contains the configuration files of the dependency injection container
|**src/api/config**/config.js| source code responsible for loading the configuration file to run the express api (according to the execution environment).
|**src/api/config**/{default\|dev\|production\|test}.json| configuration files for each execution environment. Each file contains the URL of MongoDB connection. 
|**src/contexts/core/analytics**| new module of core context
|**src/contexts/shared**| shared context
|cucumber.js| configuration to execute acceptance tests with cucumber
|**test/src**|folder containing unit and acceptance tests
|**test/src/api**|acceptance tests for the api using cucumber
|**test/src/contexts**|unit tests for the different modules of the core bounded context. It's organized in the different layers (application, domain and infrastructure)


## NPM Packages installed

|Name       |Description|
|-----------|-----------|
|cucumber|it allows to run automated tests written in plain language. it is used to write acceptance tests|
|supertest|it provides a high-level abstraction for testing HTTP. it is used with cucumber to test the api
|http-status|it provides a list of http codes that is used in the api responses
|convict|it helps with the configuration of the api
|mongodb|official MongoDB driver for Nodejs
|node-dependency-injection|dependecy injection container
|Mockdate|it allows to mock the Date object. It's used to make sure that a date stays fixed to the ms. So, it can be tested that dates of creation, modification and deletion are set properly in the different use cases
|uuid|it allows to create random uuids. it is used in the tests

## Assumptions

- A genially marked as deleted is the same as a non existing genially. So, a GeniallyNotExist error is thrown if a deleted genially try to be renamed or deleted.
- I suppose this api will have a lot of traffic and every second counts if you manage 100M requests per day. So, I decided to use MongoDB driver rather than Mongoose.

## Improvements

- Test that the counter of created geniallys is incremented when an event GeniallyCreatedDomainEvent is received.
- Create an endpoint for getting the number of created geniallys.
- Create a workflow in github actions to run tests.

## How to start project

1. Install mongodb if not install yet.
1. Install dependencies: `npm install`
1. Start server
    1. Production mode:
        - `npm run build`
        - `npm run start`
    1. Development mode:
        - `npm run dev`: it detects changes in ts and json files (dependency injection files) and restarts the server automatically.
  
## Tests execution

|Command|Description|
|-------|-----------|
|`npm run test`| run unit and acceptance tests
|`npm run test:unit`| run unit tests
|`npm run test:features`| run acceptance tests of express api


