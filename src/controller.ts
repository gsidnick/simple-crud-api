import { v4 as uuidv4 } from 'uuid';
import { Users, ControllerProps } from './types';
import { UUID_PATTERN } from './constants';
import database from './database';

const isJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const isUser = (data: string): boolean => {
  if (!isJSON(data)) return false;

  const user = JSON.parse(data);

  if (Array.isArray(user)) return false;

  const template = ['username', 'age', 'hobbies'];
  const keys = Object.keys(user);

  if (keys.length === 0) return false;

  for (let k = 0; k < template.length; k += 1) {
    if (!keys.includes(template[k])) {
      return false;
    }
  }

  const properties = Object.entries(user);

  for (let p = 0; p < properties.length; p += 1) {
    const [key, value] = properties[p];
    switch (key) {
      case 'username':
        if (typeof value !== 'string') return false;
        break;
      case 'age':
        if (typeof value !== 'number') return false;
        break;
      case 'hobbies':
        if (!Array.isArray(value)) return false;
        for (let v = 0; v < value.length; v += 1) {
          if (typeof value[v] !== 'string') return false;
        }
        break;
      default:
        return false;
    }
  }

  return true;
};

const getUsers = ({ res }: ControllerProps): void => {
  const users: Users = database.getUsers();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(users));
};

const getUser = ({ res, params }: ControllerProps): void => {
  let id: string = '';
  if (params) id = params.id;

  if (id && !UUID_PATTERN.test(id)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('400 Bad Request');
    return;
  }

  const user = database.getUser(id);

  if (user === null) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(user));
};

const addUser = ({ req, res }: ControllerProps): void => {
  let data: string = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    if (!isUser(data)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('400 Bad Request');
      return;
    }

    const newUser = { id: uuidv4(), ...JSON.parse(data) };

    database.addUser(newUser);

    res.statusCode = 201;
    res.end(JSON.stringify(newUser));
  });

  req.on('error', () => {
    res.statusCode = 500;
    res.end('500 Internal Server Error');
  });
};

const updateUser = ({ req, res, params }: ControllerProps): void => {
  let data = '';
  let id: string = '';
  if (params) id = params.id;

  if (id && !UUID_PATTERN.test(id)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('400 Bad Request');
    return;
  }

  const user = database.getUser(id);

  if (user === null) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
    return;
  }

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    const updatedUser = { ...user, ...JSON.parse(data) };

    database.updateUser(updatedUser);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(updatedUser));
  });

  req.on('error', () => {
    res.statusCode = 500;
    res.end('500 Internal Server Error');
  });
};

const deleteUser = ({ res, params }: ControllerProps): void => {
  let id: string = '';
  if (params) id = params.id;

  if (id && !UUID_PATTERN.test(id)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('400 Bad Request');
    return;
  }

  const user = database.getUser(id);

  if (user === null) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
    return;
  }

  database.deleteUser(id);

  res.statusCode = 204;
  res.end();
};

export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
