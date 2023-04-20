import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, pass: string): Promise<Omit<UsersEntity, 'password'>> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
        return result;
    }
    throw new UnauthorizedException();
    }

    async login(user: Omit<UsersEntity, 'password'>) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: Omit<UsersEntity, 'id'>) {
        return await this.usersService.register(user.username, user.password, user.role);
    }
}
