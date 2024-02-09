import { IncomingMessage, ServerResponse } from 'node:http';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type Users = User[];

export interface Params {
  [key: string]: string;
}

export interface ControllerProps {
  req: IncomingMessage;
  res: ServerResponse;
  params?: Params;
}
