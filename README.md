<div align="center">
  <!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
  <a name="readme-top"></a>
  <!--
  *** Thanks for checking out the Best-README-Template. If you have a suggestion
  *** that would make this better, please fork the repo and create a pull request
  *** or simply open an issue with the tag "enhancement".
  *** Don't forget to give the project a star!
  *** Thanks again! Now go create something AMAZING! :D
  -->

  <!-- PROJECT SHIELDS -->
  <!--
  *** I'm using markdown "reference style" links for readability.
  *** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
  *** See the bottom of this document for the declaration of the reference variables
  *** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
  *** https://www.markdownguide.org/basic-syntax/#reference-style-links
  -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

  <br />
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://learnwithkru.com/_next/image?url=%2FLogos%2FKruLogo.png&w=640&q=75" alt="Logo" width="115" height="110">
  </a>
  <h1 align="center">Learnwithkru</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

today's interconnected world, the demand for personalized education is at an all-time high. Learners seek tailored experiences to fit their unique needs and schedules, while educators want flexible platforms to reach more students and offer impactful, individualized instruction. Our project addresses this by creating an innovative platform, similar to Preply, that connects students and teachers for one-on-one educational experiences.

Utilizing advanced technology, our platform ensures seamless interactions through a user-friendly interface, robust search functions, and secure communication tools. This allows learners to find the ideal teacher for their needs and helps teachers access a wider student base.

Our goal is to make personalized education accessible and effective, whether for mastering languages, excelling in academics, or acquiring new skills. Join us in transforming education, fostering connections that drive growth and success.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Product Vision board
Explore our comprehensive vision for the future of our product:

[**Vision**](https://www.canva.com/design/DAGGHgrSSvY/jn45WLCq-MH1G-k0o2kfng/edit?utm_content=DAGGHgrSSvY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### Mission
Our mission centers on democratizing education. They strive to leverage cutting-edge technology to make educational opportunities affordable and accessible for a global audience. This focus on affordability and technological innovation allows them to empower individuals worldwide to achieve their language learning goals.


### Business Canva Model
Review our strategic business model and how we create value:

[**Business Canva Model**](https://www.canva.com/design/DAGFFUI1wjs/s-bTcLUb1luvpemtPvv9yA/view?utm_content=DAGFFUI1wjs&utm_campaign=designshare&utm_medium=link&utm_source=editor)

## UI design

This User Interface enhances clarity and usability, ensuring an intuitive experience for users of this project.

[![Figma]](https://www.figma.com/design/ij4jlwjEniD1K69xLpaSt0/KRU-UI?node-id=3512-2368&t=fYhAChYZ5bjfHov7-0)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section lists major frameworks and libraries used in the Learnwithkru project:

- ![Next.js][Next.js]
- ![Node.js][Node.js]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Express][Express.js]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LINKS -->

[Node.js-url]: https://nodejs.org/
[TypeScript-url]: https://www.typescriptlang.org/
[Express-url]: https://expressjs.com/
[MongoDB-url]: https://www.mongodb.com/

### Project Structure

The Learnwithkru project follows a monorepo structure. Here’s a brief overview:

```sh
learnwithkru-monorepo/
├── application/
│   └── frontend/
├── packages/
│   ├── api-gateway/
│   ├── auth/
│   ├── notification/
│   ├── student/
│   ├── teacher/
│   ├── user/
│   └── volomes/
├── libs/
│   ├──  shared-libs/
│   └──  config-libs/
├── docs/
├── node_modules
├── package.json
├── docker-compose.yaml
└── README.md
```

Each package has its own set of dependencies and configuration files, allowing for modular development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- GETTING STARTED -->

## Getting Started

### With Docker

Follow these steps to set up this project locally using Docker.

#### Prerequisites

Ensure you have the following software installed before proceeding:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/en)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

#### Setup Steps

1. Clone the project:

Open your terminal and run the following command to clone the project repository:

```sh
    git clone https://github.com/Vath-Song99/learnwithkru-monorepo.git
```

2. Navigate to the `Learnwithkru-monorepo` folder:

Open your terminal and change the directory to the Learnwithkru-monorepo folder. Replace path/to with the actual path to the project directory on your machine.

```sh
    cd path/to/learnwithkru-monorepo
```

3. Build the Docker images:
   Use the following command to build the Docker images. This will set up the necessary environment for your project.

```sh
    yarn build:docker
```

4. To run the Docker containers:
   Use the following command to build and start the Docker containers. This will set up the necessary environment for your project.

```sh
    yarn start:docker
```
5. To run the Application (Front-end):

```sh
    yarn start:app
```

After completing these steps, your project will be successfully set up locally!

##### Others command

- Restart Docker

```sh
    yarn restart:docker
```

- Stop Docker

```sh
    yarn stop:docker
```

- Remove Docker Containers

```sh
    yarn remove:containers
```

## To see The application:
After run the follow command above you make request to the Application of Learnwithkru plateform:

```sh
    http:localhost:8000
```


## To test API 
If you prefer to test the API Docs you can do by make the request to the endpoint below: 

  ``` 
  http://localhost:service-port/swagger
  ```  
  #### sample endpoint for auth api:
  ``` 
  http://localhost:3001/swagger
  ```

## Services

1. **Authentication Service**: Securely authenticate users accessing the system.
2. **Teacher Service**: Manage data and actions related to teachers.
3. **Student Service**: Handle student-related functionalities.
4. **User Service**: Manage user accounts and basic user-related functionalities.
5. **Notification Service**: Handle notifications and communication within the system.

Each service is designed to be modular, scalable, and easy to integrate with other components of the system.

## Features

### Authentication Service

- Secure user authentication mechanisms.
- Multi-factor authentication (MFA) support.
- Session management for maintaining authentication state.

### Teacher Service

- Profile management for teachers.
- Listing profile functionalities.
- feedback tools.

### Student Service

- Joining management for students.
- Progress tracking features.

### User Service

- Account creation and management.
- Integration with the authentication service.
- Role-based access control.

### Notification Service

- Push and email notifications.
- Customizable notification templates.

## Architecture

- **Microservices Architecture**: Each service is implemented as an independent microservice.
- **API Gateway**: Handles routing requests and cross-cutting concerns like authentication.
- **Containerization**: Services are containerized using Docker.
<!-- - **Orchestration**: Kubernetes is used for orchestrating containers. -->
- **Logging and Monitoring**: Centralized logging and monitoring solutions are implemented.
- **Security**: Security best practices are followed, including encryption and regular security audits.

For detailed instructions on setting up and using each service, please refer to their respective README files.

<!-- _For more examples and detailed instructions, please refer to the [Documentation](https://example.com)_ -->
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

[@Vath-Song99](https://github.com/Vath-Song99)
[@nareth347](https://github.com/nareth347)
[@seaporhai](https://github.com/seaporhai)
[@thon1525](https://github.com/thon1525)

Learnwithkru - (https://www.facebook.com/profile.php?id=100092631759554) - learnwithkru287@gmail.com

Project Link: [Learnwithkru-monorepo](https://github.com/Vath-Song99/learnwithkru-monorepo.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Vath-Song99/learnwithkru-monorepo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/Vath-Song99/learnwithkru-monorepo/forks
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/Vath-Song99/learnwithkru-monorepo/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Vath-Song99/learnwithkru-monorepo/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://www.figma.com/design/ij4jlwjEniD1K69xLpaSt0/KRU-UI?m=dev&node-id=13-2&t=JM8rD22nxHWmXm5T-1
# learnwithkru
