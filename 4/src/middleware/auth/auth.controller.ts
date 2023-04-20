import { Request, Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from '../roles.decorator';
import { RoleGuard } from './guards/role.guard';


@ApiTags("Authentication")
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiBody({schema: {type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' }}}})
    @ApiResponse({ status: 200, description: 'Login!' })
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiBody({schema: {type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' }, isAdmin: { type: 'boolean' }}}})
    @ApiResponse({ status: 200, description: 'Register!' })
    async register(@Body() body: {username: string, password: string, isAdmin: boolean}) {
      const user = await this.authService.register({username: body.username, password: body.password, role: body.isAdmin ? "admin" : "user"});
      return user ? user : "Username is already used!"
    }

    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('profile')
    getProfile(@Request() req) {
    return req.user;
    }
}
