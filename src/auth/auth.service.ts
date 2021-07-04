import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { toResponse } from '../common/to_response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const users = await this.usersService.findAll();
    const user = users.find((user) => user.login === login);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return toResponse(user);
      }
      return null;
    }
    return null;
  }

  async login(user: { id: string, login: string }) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
