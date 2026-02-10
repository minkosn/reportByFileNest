import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
//import { UserService } from '../src/domain/user/user.service';


//TO DO 
 /*
 1. register user
 2. login user
 3. gte user by name

 4. reset-password
 5. update-password

 files ...
 */

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
});

describe('AppController (e2e)', () => {
    
    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/api/').expect(200).expect('Hello App is on!');
    });

});


describe('UserController (e2e)', () => {
    
    //wrong credential - have to fail
    it('/api/users/login (POST) should fail for incorrect credentials', async () => {
        return request(app.getHttpServer())
            .post('/api/users/login')
            .send({ username: 'firsto_2', password: 'incorrect_password' })
            .expect(401)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toBe('Invalid credentials');
            });
    });

    let tokkenLogged: string | null = null;
    let userIdLogged: number | null = null;
    //Have to pass - correct credential
    it('/api/users/login (POST) should return a token for valid credentials', async () => {
        return request(app.getHttpServer())
            .post('/api/users/login')
            .send({ username: 'firsto_2', password: '222' })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('token');
                expect(typeof res.body.token).toBe('string');
                tokkenLogged = res.body.token as string;
                expect(res.body).toHaveProperty('userId');
                expect(typeof res.body.userId).toBe('number');
                userIdLogged = res.body.userId as number;
            });
    });

    it('/api/users - GET users should fail on unauthorized access', async () => {
        return request(app.getHttpServer())
            .get('/api/users')
            .expect(401);
    });

    it('/api/users - GET users list', async () => {
        return request(app.getHttpServer())
            .get('/api/users')
            .set('Authorization', `Bearer ${tokkenLogged}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length).toBeGreaterThan(0);
            });
    });

    it('/api/users/:id - GET user by id', async () => {
        return request(app.getHttpServer())
            .get(`/api/users/${userIdLogged}`)
            .set('Authorization', `Bearer ${tokkenLogged}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.id).toBe(userIdLogged);
            });
        });        
});
