# Hours and tasks

Application create for tracking tasks and working hours on projects. 
Application based on REST architecture, for frontend is used ReactJS library
Hours and tasks is open-source project.

Demo version of projects: hours-and-tasks.herokuapp.com/

User: test
Password: password

**Dont use your private data on demo version**

## Technologies
### Backend
* Java
* Spring boot
* Spring security
* Liquibase
* H2 database for development
* PostgreSQL for production
### Frontend
* ReactJS
* Reactstrap
* Fontawesome

## Installation

1. Clone project to your PC or server
2. Go to project folder
3. Modify ***src/main/resources/application-xxx.properties*** if needed
4. Modify ***src/main/webapp/src/services/API.js*** if needed change API endpoint for frontend
4. Run one of next commands in terminal:

## Run

For run just backend:
 ```
spring-boot:run -P development-backend 
```
For run frontend and backend
```
spring-boot:run -P development 
```
For run on production with PostgreSQL
 ```
spring-boot:run -P production 
```

All dependencies and libraries will download automatically


## Test

For run UI tests on local machine:
1. Set development profile
2. Make build
3. Run tests

## Project structure
* Folder ***src/main/java*** contains backend
* Folder ***src/main/webapp*** contains frontend
* Folder ***src/main/resources*** contains backend configuration