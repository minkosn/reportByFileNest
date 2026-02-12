import { Injectable } from '@nestjs/common';

// check the app is up
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello App is on!';
    }
}
