import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
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
            .expect(200)
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

describe('AuthController (e2e)', () => {
    
    const uniqueUsername = `user_test_auth_${Date.now()}`;
    const uniqueEmail = `email_test_auth_${Date.now()}@example.com`;
    const password = 'test_password';
    const firstName = 'Test';
    const lastName = 'User';
    const birthDate = '1990-01-01';

    let userIdLogged: number | null = null;
    const resetPassword = 'new_test_password';
    let tokenRegistered: string | null = null;

    //Step 1 - register new user
    it('/api/users/register (POST) register a new user', async () => {
        return request(app.getHttpServer())
            .post('/api/users/register')
            .send({ 
                username: uniqueUsername,
                password,
                email: uniqueEmail,
                firstName,
                lastName,
                birthDate
            })
            .expect(201);
    });

    //Step 2 - login user the new registered user
    it('/api/users/login (POST) login registered user', async () => {
        return request(app.getHttpServer())
            .post('/api/users/login')
            .send({ username: uniqueUsername, password })
            .expect(200)
            .expect((res : Response & { body: {token: string, userId: number} }) => {
                expect(res.body).toHaveProperty('token');
                expect(typeof res.body.token).toBe('string');
                expect(res.body).toHaveProperty('userId');
                expect(typeof res.body.userId).toBe('number');
                userIdLogged = res.body.userId;
                tokenRegistered = res.body.token;
            });
    });

    //Step 3 - reset password for new registered user as use token returned from login request
    it('/api/users/reset-password (POST) initiate password reset', async () => {
        return request(app.getHttpServer())
            .post('/api/users/reset-password')
            .set('Authorization', `Bearer ${tokenRegistered ?? ''}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({ email: uniqueEmail })
            .expect(202);
    });
    //Step 4 update the password with new one
    it('/api/users/update-password (POST) update the password', async () => {
        const consoleOutput : string[] = [''];
        let token: string | null = null;
        const originConsoleLog : typeof console.log = console.log; 
        
        try {
            
            console.log = (...args: any[]) => {
                consoleOutput.push(args.join(' '));
                originConsoleLog(...args);
            };

            await request(app.getHttpServer())
                .post('/api/users/reset-password')
                .set('Authorization', `Bearer ${tokenRegistered ?? ''}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ email: uniqueEmail })
                .expect(202);

            // Extract the token from the console log (this is a bit tricky in real tests, you might want to mock the email sending)
            const tokenMatch = consoleOutput.join('').match(/token=([^ ]+)/);
            token = tokenMatch ? tokenMatch[1] : null;

            console.log('token from console:', token);

            expect(token).not.toBeNull();
        } finally {
            console.log = originConsoleLog;
        };
        // First, initiate password reset to get the token
        
        // Now, update the password using the token
        return request(app.getHttpServer())
            .post('/api/users/update-password')
            .set('Authorization', `Bearer ${tokenRegistered ?? ''}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({ 
                token, 
                newPassword: resetPassword, 
                userId: userIdLogged 
            })
            .expect(200)
            .expect((res: Response & { body: {message: string} }) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toBe('Password updated successfully');
            });
    });

    //Step 5 try to login with new - updated password
    it('/api/users/login (POST) Login with new(updated) password', async () => {
        return request(app.getHttpServer())
            .post('/api/users/login')
            .send({ username: uniqueUsername, password: resetPassword })
            .expect(200)
            .expect((res: Response & { body: {token: string, userId: number} }) => {
                expect(res.body).toHaveProperty('token');
                expect(typeof res.body.token).toBe('string');
                expect(res.body).toHaveProperty('userId');
                expect(typeof res.body.userId).toBe('number');
                expect(res.body.userId).toBe(userIdLogged);
            });
    });


});
