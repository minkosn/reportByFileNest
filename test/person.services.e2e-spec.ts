import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
//import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PersonService } from '../src/domain/person/person.service';
import { Person } from '../src/domain/person/person.entity';

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
});

describe('Person Service (e2e)', () => {
    
    it('/ GET all persons', async () => {
        const personService = app.get(PersonService);
        const personList: Person[] = await personService.getAllPersons();
        expect(personList).toBeInstanceOf(Array);
        console.log('personList -> ', personList.map(p => p.first_name).join(', '));
        
    });

});

