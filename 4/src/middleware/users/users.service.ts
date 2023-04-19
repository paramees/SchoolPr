import { Injectable } from '@nestjs/common';

export type User = {
    userId: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'chris',
          password: 'secret',
        },
        {
          userId: 3,
          username: 'maria',
          password: 'guess',
        },
      ];
    
      async findOne(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
      }

      async register(username: string, password: string): Promise<User> {
        const userId = this.users.length + 1;
        const newUser: User = {
          userId,
          username,
          password,
        };
        this.users.push(newUser);
        return newUser;
      }
}
