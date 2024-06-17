# API Gateway

## Table of Contents
- [API Gateway](#api-gateway)
  - [Table of Contents](#table-of-contents)
  - [About the Service](#about-the-service)
    - [Description](#description)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
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
The API Gateway functions as global middleman, checking all requests that users make to each service in a microservice architecture. It serves as the first line of security, validating user requests.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- You need to install [Node.js](https://nodejs.org/)
- You need to install [npm](https://www.npmjs.com/get-npm) (Node Package Manager) or [yarn](https://yarnpkg.com/)
- You need to terminal or command prompt access

### Installation
1. **Clone the Repository**
    ```sh
    git clone 
    ```
2. **Navigate to the Service Directory**
    ```sh
    cd learnwithkru-monorepo/packages/api-gateway
    ```
3. **Install Dependencies**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn
    ```

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
To use the API Gateway, you will typically make HTTP requests to it. Here are some common examples:

1. **GET Request Example**
    ```sh
    curl -X GET http://localhost:3000/path/to/api/service
    ```

2. **POST Request Example**
    ```sh
    curl -X POST http://localhost:3000/path/to/api/service \
    -H "Content-Type: application/json" \
    -d '{"key1":"value1", "key2":"value2"}'
    ```

### Endpoints
Below is the Endpoint of API Gateway that need to across before the services:

**http://localhost:3000/path/to/api/service**


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