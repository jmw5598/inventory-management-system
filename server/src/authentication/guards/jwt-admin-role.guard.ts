import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../models/roles.enum';

@Injectable()
export class JwtAdminRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (user && user.roles && user.roles.includes(Roles.ADMIN)) {      
      return user;
    }
    throw new ForbiddenException();
  }
}