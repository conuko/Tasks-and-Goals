# Shortlist

This is the FrontEnd of Shortlist - the modern To Do Application.

## Getting Started

1. `yarn` to install deps.
2. `yarn dev` to start the development server.
3. `yarn test` to run the tests.

## Tech stack

1. Built with [React 17](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/). Packed with Vite.
2. Styled with 7-1 [Sass](https://sass-lang.com/) Architecture.
3. [React Router](https://reacttraining.com/react-router/).
4. Client Side Form Validation with [yup](https://github.com/jquense/yup) and [React Hook Form](https://react-hook-form.com/).

## Architecture

## Usage

1. The user can Signin or Register.
2. After Signin or Register, the user can see his home screen with his name and his functions.
3. The user can go to his To Do List.
4. The user can add a new To Do that is not longer than 30 characters (it's a short-list :-)).
5. The user can see a list of his own To Dos.
6. The user can toggle/untoggle a To Do.
7. The user can delete a To Do.
8. The user can logout.

## Authentication

- Uses JWT for token-based authentication. [JSON Web Token](https://jwt.io/)
- Uses bcrypt for securely hash and salt passwords. [bcrypt](https://www.npmjs.com/package/bcryptjs)

![Authentication](https://user-images.githubusercontent.com/50672977/166125473-7d32be27-ef26-4053-8c7a-0bc0a4cabf8d.png)

## Back End

- [Shortlist Backend](https://github.com/conuko/tasks-and-goals-backend)
