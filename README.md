# Daily Expenses Sharing Application

This is a Node.js application built using Express.js and MongoDB Atlas to help users share and track daily expenses.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
  - [Installing Dependencies](#Setup Up MongoDB Atlas)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Expense Routes](#expense-routes)


## Installation

### Prerequisites

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)


### Cloning the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/MoinZargar/Daily-Expenses-sharing-app.git
cd Daily-Expenses-sharing-app
```
### Installing Dependencies
```
npm install
```
### Setup Up MongoDB Atlas

Create a free account on MongoDB Atlas, set up a new cluster, and obtain the database connection string.


### Setting Up Environment Variables

Create a .env file in the root directory and add the following environment variables.

```
PORT= port on which app is running maily 8000
MONGODB_URI= your mongodb atlas connection string
CORS_ORIGIN= * 
ACCESS_TOKEN_SECRET= random string for access token secret
ACCESS_TOKEN_EXPIRY = time span of access token e.g 1d
REFRESH_TOKEN_SECRET =random string for refresh token secret
REFRESH_TOKEN_EXPIRY =time span of refresh token e.g 10d
```

### Running the Application

```
npm run dev 
```

## api-endpoints
### user-endpoints

#### Create user
```
API End Point : http://localhost:8000/api/v1/users/register
```
#### Login user
```
API End Point : http://localhost:8000/api/v1/users/login
```
#### Retreive user details
```
API End Point : http://localhost:8000/api/v1/users/info
```

#### Logout user
```
API End Point : http://localhost:8000/api/v1/users/logout
```
### expense-endpoints

#### Add Expense
```
API End Point : http://localhost:8000/api/v1/expenses/addExpense
```

#### Retrieve individual user expenses. 
```
API End Point : http://localhost:8000/api/v1/expenses/individualExpense
```
#### Retrieve overall expenses. 
```
API End Point : http://localhost:8000/api/v1/expenses/balanceSheet
```


