### Microservice Architecture

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="##About The Microservice">About the Mircroservice</a>
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

## About The Microservice
Microservices architecture represents a significant advancement in software development, offering numerous benefits such as improved scalability, flexibility, and resilience. However, it also comes with its own set of challenges that require careful consideration and management. As businesses continue to seek agility and efficiency in their software systems, microservices provide a powerful paradigm to meet these evolving needs. Understanding the principles, advantages, and challenges of microservices is essential for any organization looking to adopt this architecture and achieve successful digital transformation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Structure
The Learnwithkru project follows a monorepo structure. Here’s a brief overview:

```sh
learnwithkru-monorepo/
├── packages/
│   ├── api-gateway/
│   ├── auth/
│   ├── notification/
│   ├── student/
│   ├── teacher/
│   ├── user/
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

1. Build and Run the Docker:
   Use the following command to build the Docker images. This will set up the necessary environment for your project.

```sh
    yarn build-up:docker
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


<!-- _For more examples and detailed instructions, please refer to the [Documentation](https://example.com)_ -->
<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=**for**-the-badge
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
