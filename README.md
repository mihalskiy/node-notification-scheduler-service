# This repo houses code for Send users to message  (using Sequelize, rabbitMQ, and PostgreSQL)"

If you dont have install  node-js, please go this link [https://nodejs.org](https://nodejs.org)

# Sequelize Setup

Let's begin by installing Sequelize CLI package. ```npm install -g sequelize-cli```

# PostgreSQL Setup for LINUX 

### You need to add the latest PostgreSQL repository for the latest version.
  
```sudo add-apt-repository "deb https://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"```

### Update and Install PostgreSQL on ubuntu 18.04, please go this link [install-and-use-postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

# Downloading and Installing RabbitMQ
  
### Update and Install RabbitMQ, please go this link [install-and-use-rabbitMQ](https://www.rabbitmq.com/download.html)

# Config Setup

#### go to directory /you_project/server/config and open file config.json and change settings under your database

```$xslt
{
  "development": {
    "username": "you_DATABASE_username",
    "password": "you_DATABASE_password",
    "database": "you_DATABASE_name",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
}
```


# Project Setup

1. Use command  ```npm install``` for install dependices
2. create in core project file ```.env```
```$xslt
EXAMPLE .env file
USERS=10000 // this is example of how many you need to generate users
HTTP_PORT=8080 //this is an example for a run your project on port 

//To make things a little easier, an object literal 
//syntax is also supported, like in this example which 
//will log a message every Sunday at 10:53pm:
HOUR=10 //(0-23)
MINUTE=53 //(0-59)
DAY_OF_WEEK=0 //(0-6) Starting with Sunday
```
3. Now try running the migrate ```npm run migrate```
3. Now try running the seed users ```npm run generate-users```
4. Now try running the application server ```npm start```
and visiting [http://localhost:8080](http://localhost:8080). 

Have fun! smile


