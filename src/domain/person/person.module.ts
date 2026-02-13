import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from '../../interfaces/http/person/person.controller';

@Module({
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {}
