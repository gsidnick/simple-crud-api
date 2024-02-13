import { Users, User } from './types';

class Database {
  // eslint-disable-next-line no-use-before-define
  static instance: Database;

  private db: Users;

  constructor() {
    this.db = [];
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getUsers(): Users {
    return this.db;
  }

  public getUser(id: string): User | null {
    const user = this.db.filter((item) => item.id === id);
    if (user.length === 0) {
      return null;
    }
    return user[0];
  }

  public addUser(user: User): void {
    this.db.push(user);
  }

  public updateUser(user: User): void {
    const users = this.db.map((item) => {
      if (item.id === user.id) {
        return { ...item, ...user };
      }
      return item;
    });

    this.db = users;
  }

  public deleteUser(id: string): void {
    this.db.forEach((item, index) => {
      if (item.id === id) this.db.splice(index, 1);
    });
  }
}

export default Database.getInstance();
