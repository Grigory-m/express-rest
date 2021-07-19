import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { login, password } = request.body;
    const user = await this.authService.validateUser(login, password);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
