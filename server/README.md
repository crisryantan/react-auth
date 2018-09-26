# React auth

### Tech stack

- **Express** - Node web framework
- **MongoDB** - Datebase

### Setup and Run

- `yarn install` - to install dependencies.
- `yarn start` - Runs the app in development mode.

### Questions

- packages/libraries used.

  - [express-js](https://expressjs.com/) - is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  - [mongoose](https://mongoosejs.com/) - provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
  - [cors](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
  - [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate/) - A highly scalable, offline-first foundation with the best developer experience and a focus on performance and best practices.

- file structure backend

  - Top Level

  ```
  server
  │
  │
  ├── controllers
  │   └── user.js
  │
  ├── middlewares
  │   └── auth.js
  │
  ├── models
  │   └── user-model.js
  │
  ├── routes
  │   └── routes.js
  |
  ├── utils
  │   └── index.js
  │
  ├── config.json
  ├── README.md
  └── app.js
  ```
