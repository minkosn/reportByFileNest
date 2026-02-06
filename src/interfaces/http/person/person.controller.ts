import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from 'src/domain/person/person.service';
import { Person } from 'src/domain/person/person.entity';

@Controller('persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    async findAll(): Promise<Person[]> {
        return this.personService.getAllPersons();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Person[]> {
        return this.personService.getPersonByName(name);
    }
}
