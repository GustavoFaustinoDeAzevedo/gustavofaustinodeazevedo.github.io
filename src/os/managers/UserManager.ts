import { User } from '../models';

class UserManager {
  private users: Map<number, User> = new Map();

  constructor() {
    // Usuário root padrão
    this.addUser({ uid: 0, username: 'root', groups: ['admin'] });
  }

  addUser(user: User) {
    if (this.users.has(user.uid)) throw new Error('UID já existe');
    this.users.set(user.uid, user);
  }

  getUser(uid: number): User | undefined {
    return this.users.get(uid);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  removeUser(uid: number) {
    this.users.delete(uid);
  }

  isAdmin(uid: number): boolean {
    return this.users.get(uid)?.groups.includes('admin') ?? false;
  }
}

export default UserManager;
