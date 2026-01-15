import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../interfaces/decorators/public.decorator';

//import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const [type = null, token = null] = request.headers.authorization?.split(' ') ?? [];
        
        if (!token || type !== 'Bearer') {
            throw new UnauthorizedException('No token provided');
        }   
        try {
            await this.jwtService.verifyAsync(token);
            const payload = await this.jwtService.decode(token);
            request.user = payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }
}