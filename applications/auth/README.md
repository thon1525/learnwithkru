# Auth Service

## Table of Contents
- [Auth Service](#auth-service)
  - [Table of Contents](#table-of-contents)
  - [About the Service](#about-the-service)
    - [Description](#description)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Service](#running-the-service)
  - [Usage](#usage)
    - [Making Requests](#making-requests)
    - [Endpoints](#endpoints)
  - [Contact](#contact)
    - [Email](#email)
    - [Social Media](#social-media)
    - [Troubleshooting](#troubleshooting)

## About the Service

### Description
- Secure user authentication mechanisms.
- Multi-factor authentication (MFA) support.
- Session management for maintaining authentication state.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/)
- You have installed [npm](https://www.npmjs.com/get-npm) (Node Package Manager) or [yarn](https://yarnpkg.com/)
- You have terminal or command prompt access

### Installation
1. **Clone the Repository**
    ```sh
    git clone 
    ```
2. **Navigate to the Service Directory**
    ```sh
    cd learnwithkru-monorepo/packages/auth
    ```
3. **Install Dependencies**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn
    ```

### Configuration
1. **Create a `.env` File**
    - Navigate to configs folder and you see create a `.env` file and past content below into it
    - Add necessary environment variables. click this link to copy content env:
  [click-here](https://www.notion.so/Auth-Envaironment-content-36595d9726b748ddb00684f11a3c6b98?pvs=4)
       
### Running the Service
1. **Start the Server**
    ```sh
    yarn start:dev
    ```
2. **Run Tests**
    ```sh
    yarn test
    ```
## Usage

### Making Requests
To use the Auth, you will typically make HTTP requests to it. Here are some common examples:

1. **GET Request Example**
    ```sh
    curl -X GET http://localhost:3000/path/to/your/service
    ```

2. **POST Request Example**
    ```sh
    curl -X POST http://localhost:3000/path/to/your/service \
    -H "Content-Type: application/json" \
    -d '{"key1":"value1", "key2":"value2"}'
    ```

### Endpoints
List the main endpoints provided by your API Gateway. For example:

 **Auth Service Endpoint**
```
GET /api/v1/signup: Signs up a new user.
GET /api/v1/verify: Verifies a user's Email.
POST /api/v1/login: Logs in a user.
POST /api/v1/logout: Logs out a user.
POST /api/v1/password-reset/verify: Verifies a password reset request.
POST /api/v1/password-reset/request: Requests a password reset.
POST /api/v1/reset-password: Resets a user's password.
GET /api/v1/google: Initiates Google OAuth.
GET /api/v1/google/callback: Handles Google OAuth callback.
GET /api/v1/facebook: Initiates Facebook OAuth.
GET /api/v1/facebook/callback: Handles Facebook OAuth callback.
```

## Contact

If you have any questions, issues, or suggestions, please feel free to reach out to us. Here are some ways you can contact the maintainers of this project:

### Email
- *Support Email:* [vatgaming287@gmail.com](mailto:vatgaming287@gmail.com)
- *Maintainer Email:* [learnwithkru@gmail.com](mailto:learnwithkru@gmail.com)

### Social Media
- Follow us on Facebook: @Learnwithkru
### Troubleshooting
If you encounter any issues, check the following:
- Ensure Node.js and npm/yarn are installed and up to date.
- Verify the environment variables in the `.env` file are correctly set.