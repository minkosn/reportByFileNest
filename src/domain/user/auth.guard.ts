import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../../interfaces/decorators/public.decorator';
//Auth guard - glob used to verify existing token in the requests
//with exception for some public paths as 'register' and 'login'  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //check the request was mark as public in the decorator of the controller
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        //try to get authorization
        const request = context.switchToHttp().getRequest<Request>();
        const [type = null, token = null] = request.headers.authorization?.split(' ') ?? [];

        if (!token || type !== 'Bearer') {
            throw new UnauthorizedException('No token provided');
        }
        //verify attached token
        try {
            const payload = await this.jwtService.verifyAsync<{ userId: number; token: string }>(token);
            request.user = payload;
        } catch (err) {
            throw new UnauthorizedException(`Invalid token! ${JSON.stringify(err)}`);
        }

        return true;
    }
}
