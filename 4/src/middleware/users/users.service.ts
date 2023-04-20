import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersEntity)
  private usersRepository: Repository<UsersEntity>) {}
    
      async findOne(username: string): Promise<UsersEntity> {
        return await this.usersRepository.findOne({ where: { username: username} });
      }

      async register(username: string, password: string, role: string): Promise<UsersEntity> {
        const existUser = await this.usersRepository.findOne({ where: { username: username} });
        if (existUser) return null
        const user = new UsersEntity();
        user.username = username;
        user.password = password;
        user.role = role;
        return this.usersRepository.save(user);
      }
}
