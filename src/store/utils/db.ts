import Dexie, { Table } from 'dexie';
import User from './db.types';



export class database extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super('database');
    this.version(1).stores({
      users: '++id,name,config',
    });
  }
}

export const db = new database();
