# E-commerce Demo

This project is a demo e-commerce application built with Next.js, Prisma, Stripe, and MUI. It showcases a simple integration of various technologies to create a functional online store.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)

## Getting Started

To get started with the project, clone the repository and install the necessary dependencies:

```bash
git clone [repository-url]
cd ecommerce-demo
npm install
```

## Scripts

The following scripts are available in this project:

- **Development**

  - `dev:next`: Runs the Next.js development server.
  - `dev:stripe`: Listens for Stripe webhook events and forwards them to your local server.
  - `dev:email`: Starts a development server for handling email templates located in `src/email`.
  - `dev:prisma`: Opens Prisma Studio for database management.

- **Build and Start**

  - `build`: Builds the Next.js application for production.
  - `start`: Starts the Next.js application in production mode.

- **Linting**
  - `lint`: Runs ESLint to analyze the code for potential errors.

## Tech Stack

### Frontend

- **Next.js**: A powerful React framework that enables server-side rendering, static site generation, and a seamless development experience for creating high-performance web applications.
- **React**: A popular JavaScript library for building user interfaces. React allows for the creation of reusable UI components, making the development process more efficient and scalable.
- **MUI (Material-UI)**: A robust UI library for React that implements Google's Material Design. MUI provides a comprehensive set of pre-built components, enabling developers to create beautiful and responsive interfaces with ease.
- **Framer Motion**: A popular animation library for React, used to create smooth and fluid animations, enhancing the user experience with dynamic interactions and transitions.
- **React Email**: A React-based library that simplifies the creation and management of email templates, making it easier to handle dynamic email content.

### Backend

- **Prisma**: An ORM (Object-Relational Mapper) that simplifies database management by providing a type-safe API for interacting with the database. Prisma integrates seamlessly with TypeScript and allows developers to work with databases more efficiently.
- **Stripe**: A leading payment processing platform that enables secure and easy-to-implement payment solutions. This project integrates Stripe for handling payments, subscriptions, and webhook events.
- **Resend**: A service for sending transactional emails at scale. It integrates with React Email to deliver dynamic and responsive emails, ensuring reliable communication with users.

### Other

- **TypeScript**: A superset of JavaScript that introduces static types, TypeScript enhances code quality and developer productivity by catching errors early in the development process.
- **Zod**: A TypeScript-first schema declaration and validation library that ensures data integrity and type safety throughout the application. Zod is used to validate and manage complex data structures.
- **ESLint**: A static code analysis tool that helps maintain code quality by identifying and fixing potential issues in the codebase. ESLint is configured to enforce best practices and coding standards.
