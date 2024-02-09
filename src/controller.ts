import { Users, ControllerProps } from './types';
import { UUID_PATTERN } from './constants';
import db from './db';

const getUsers = ({ res }: ControllerProps): void => {
  const users: Users = db;

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

  const records = db.filter((item) => item.id === id);

  if (records.length === 0) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
    return;
  }

  const [user] = records;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(user));
};

export default {
  getUsers,
  getUser,
};
