import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const trueRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!trueRoles) {
      return true;
    }
    return trueRoles.includes(context.switchToHttp().getRequest().user.role)
  }
}