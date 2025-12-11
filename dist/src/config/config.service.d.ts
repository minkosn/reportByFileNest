import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private nestConfigService;
    constructor(nestConfigService: NestConfigService);
    get(key: string): string;
}
