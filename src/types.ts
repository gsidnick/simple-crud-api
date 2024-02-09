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
