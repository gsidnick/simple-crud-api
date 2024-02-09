# Simple CRUD API

### About Server

It is a simple CRUD API Server implemented using in-file database underneath.

### Technical Requirements

- Used Typescript
- Used 20 LTS version of Node.js
- Used asynchronous API

### Install server packages

```
npm install
```

### Run server in development mode

```
npm run start:dev
```

### Run server in production mode

```
npm run start:prod
```

### Run server tests

```
npm run test
```

### Endpoints

- `GET api/users` get all users
- `GET api/users/{userId}` get one user by id (UUID v4 format, example `397e1e39-6550-45e7-a755-d33e92a5153f`)
- `POST api/users` add new user, send request body in JSON format
- `PUT api/users/{userId}` update user, send request body in JSON format
- `DELETE api/users/{userId}` delete user by id

### Body JSON Format

```json
{
  "username": "Ervin Howell",
  "age": 23,
  "hobbies": ["Traveling", "Fishing"]
}
```
