import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(name, pass) {
    console.log('name', name, pass)
    const user = await this.usersService.findByName(name);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
