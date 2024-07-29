# Daily Expenses Sharing Application

This backend helps run a daily-expenses sharing app. Users can add their expenses and split them in three ways: exact amounts, percentages, or equal shares. The backend manages user details, checks inputs for accuracy, and creates downloadable balance sheets to keep track of expenses. This app is build using Node.js,Express.js and MongoDB.



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
Feilds required for creating user
Name, Email, Mobile Number , Password
Request (Postman) : <br>

![1](https://github.com/user-attachments/assets/bfe895ce-7d97-4d6b-bc11-1803fc3dda85)

Response : <br>

![1 op](https://github.com/user-attachments/assets/9ff2a8af-945c-4fab-bb83-7500c93e1870)


#### Login user
```
API End Point : http://localhost:8000/api/v1/users/login
```
Request : <br>

![2](https://github.com/user-attachments/assets/7050b7a1-8a05-4c58-a826-59300fdc18a9)

Response : <br>

![2 op](https://github.com/user-attachments/assets/94e70c92-9f6f-4669-b9da-316b3eb54223)

#### Retreive user details   
***Secured Route***
```
API End Point : http://localhost:8000/api/v1/users/info
```

![3](https://github.com/user-attachments/assets/3e4e4585-1ab4-487e-adb6-31712ce0f74d)

#### Logout user
***Secured Route***
```
API End Point : http://localhost:8000/api/v1/users/logout
```
![8](https://github.com/user-attachments/assets/af2afe7b-e195-43fd-84bc-8f083fdd92d6)

### Expense-endpoints

#### Add Expense
***Secured Routes***
```
API End Point : http://localhost:8000/api/v1/expenses/addExpense
```

**Request  for exact split** <br>
![4](https://github.com/user-attachments/assets/eed89ef0-aa03-4018-ab2b-9ec069c9037c)

Response <br>

![4 op](https://github.com/user-attachments/assets/b52a4ef1-40f9-47b4-9574-eb8d8538e28b)

**Request  for percentage split** <br>
![4 2](https://github.com/user-attachments/assets/620e5e61-b445-471c-bea9-57b3f044d05c)

Resposne <br>
![4 2 op](https://github.com/user-attachments/assets/8d62ce80-5237-4396-a633-939d0134991f)

**Request  for equal split**  <br>

![4 3](https://github.com/user-attachments/assets/5c81e5e7-41dd-472c-8753-e3d301638128)

Response <br>
![4 3 op](https://github.com/user-attachments/assets/6f1b9bdd-ff53-4a6a-9e1a-c689eeec5ba4)

#### Retrieve individual user expenses. 
***Secured Route***
```
API End Point : http://localhost:8000/api/v1/expenses/individualExpense

```

![5](https://github.com/user-attachments/assets/08237e70-2d89-4deb-8f0e-9be40df4e9d7)




#### Retrieve overall expenses. 
***Secured Route***
```
API End Point : http://localhost:8000/api/v1/expenses/balanceSheet
```

![6](https://github.com/user-attachments/assets/89562ca7-25a9-4412-b224-4f8ac20b24a6)


#### Download Balance Sheet.
***Secured Route***

![7](https://github.com/user-attachments/assets/3e79c37e-23bf-4950-b2ea-836e768c0fb8)


### Data Validation
Data validation is done to handle all edge cases, such as ensuring that user inputs are accurate. Additionally, the percentage split method is validated to ensure that the total adds up to 100%.