import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerHeader = request.headers.authorization;
    if (bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      if (bearerToken) {
        try {
          const decoded = this.jwtService.verify(bearerToken);
          if (decoded) {
            request.token = bearerToken;
            return true;
          }
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
