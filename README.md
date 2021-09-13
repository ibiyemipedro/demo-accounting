# Demo Accounting System

A sample demo accounting system api

**Author:** Ibiyemi Pedro

## Environments

Node version - v14.15.1

**This application uses the following technologies:**

- nodeJs
- expressJs
- jest
- Docker

note: `run all commands in the applications root directory`
`

## Installation

### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure

The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:

- CONFIG - containing config data and files
- CONSTANT - containing application constants
- CONTROLLER - contains the files that receives data from the routes and call the services
- DB - containing in app db file
- MIDDLEWARES - containing middleware functions
- ROUTES - containing files that handles the request routes and forward to appropriate controller
- SERVICES - containing services files that handles requests functionalities
- STARTUP - containing the start-up set up for the server
- TESTS - containing test files
- UTILS - containing utility functions
- VALIDATIONS - containing validation set-up for api calls.

## Set - Up

Clone the source file from github the github repo [https://github.com/ibiyemipedro/demo-accounting.](https://github.com/ibiyemipedro/demo-accounting) or unzip the source file to your project folder.

<br><br>

### **WITHOUT DOCKER**

<br>
### Install Dependencies

To install the dependencies of the project

Navigate to the root folder of the project, open a terminal and run the following command

```bash
npm install
```

### Start the project

At this point, everything should be set and project ready to run.

Run the following command to start

```bash
npm run start
```

Run the following command to start in development with nodemon

```bash
npm run start:dev
```

If everything runs fine, navigate to your browser and open http://localhost:8000. The project will be running on the endpoint.

<br><br>

### **WITH DOCKER**

<br>

### Start the project

Run the following command to start

```bash
npm run docker:start
```

## To test the application

Run the following command to run the application tests

```
npm test
```

## EndPoints

### Base URL

**App Base URL** `http://localhost:8000/api/v1/`

## Get user account infomation

**Endpoint** `{BASE_URL}/account` - method (GET)

- Fetches the account balance of the single user

**Response**

```bash
{
    "msg": "Account info fetched successfully",
    "data": {
        "id": "qwerty-123",
        "balance": 0,
        "createdAt": "2021-05-22T09:35:29.831Z",
        "updatedAt": "2021-05-22T09:35:29.831Z"
    }
}
```

### Get Transaction History

**Endpoint** `{BASE_URL}/transaction` - method (GET)

- Fetch the transaction history for an user account

**Response**

```bash
{
    "msg": "Transactions fetched successfully",
    "data": [
        {
            "txRef": "bP_l0MMR2",
            "amount": 800,
            "userId": "qwerty-123",
            "transactionType": "CREDIT",
            "status": "COMPLETED",
            "createdAt": 1621673864194,
            "updatedAt": 1621673864194
        },
        {
            "txRef": "T5bwTyRZs",
            "amount": 800,
            "userId": "qwerty-123",
            "transactionType": "CREDIT",
            "status": "COMPLETED",
            "createdAt": 1621673869125,
            "updatedAt": 1621673869125
        },
        {
            "txRef": "HWXTCK9CZ",
            "amount": 800,
            "userId": "qwerty-123",
            "transactionType": "DEBIT",
            "status": "COMPLETED",
            "createdAt": 1621673881338,
            "updatedAt": 1621673881338
        },
        {
            "txRef": "KgeB5fI8x",
            "amount": 200,
            "userId": "qwerty-123",
            "transactionType": "DEBIT",
            "status": "COMPLETED",
            "createdAt": 1621673901061,
            "updatedAt": 1621673901061
        }
    ]
}
```

### Credit User Account

**Endpoint** `{BASE_URL}/account/credit` - method (POST)

- Credits a user account

**Payload**

```bash
{
    "userId": "qwerty-123",
    "transactionType": "credit",
    "amount" : 800
}
```

**Response**

```bash
{
    "msg": "Transaction successfull",
    "data": {
        "id": "qwerty-123",
        "balance": 1600,
        "createdAt": "2021-05-22T08:57:36.862Z",
        "updatedAt": "2021-05-22T08:57:49.125Z"
    }
}
```

### Debit User Account

**Endpoint** `{BASE_URL}/account/debit` - method (POST)

- Credits a user account

**Payload**

```bash
{
    "userId": "qwerty-123",
    "transactionType": "debit",
    "amount" : 800
}
```

**Response**

```bash
{
    "msg": "Transaction successfull",
    "data": {
        "id": "qwerty-123",
        "balance": 600,
        "createdAt": "2021-05-22T08:57:36.862Z",
        "updatedAt": "2021-05-22T08:58:21.061Z"
    }
}
```

## Contributing and Improvements

- More Test Cases
