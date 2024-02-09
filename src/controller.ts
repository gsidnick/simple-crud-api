import { Users, ControllerProps } from './types';
import db from './db';

const getUsers = ({ res }: ControllerProps): void => {
  const users: Users = db;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(users));
};

export default {
  getUsers,
};
