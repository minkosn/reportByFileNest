import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { PersonController } from '../../interfaces/http/person/person.controller';

@Module({
    imports: [DatabaseModule.forRoot()],
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {}
