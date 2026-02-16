import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { open } from 'node:fs/promises';
import { Response } from 'express';

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
});

//Add logint and get the token before all tests

describe('File Controller (e2e)', () => {
    let token: string | null = null;
    let userId: number | null = null;
    //Get credentials
    it('/api/users/login (POST) should return a token for valid credentials', async () => {
        return request(app.getHttpServer())
            .post('/api/users/login')
            .send({ username: 'firsto_2', password: '222' })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('token');
                expect(typeof res.body.token).toBe('string');
                token = res.body.token as string;
                expect(res.body).toHaveProperty('userId');
                expect(typeof res.body.userId).toBe('number');
                userId = res.body.userId as number;
            });
    });

    it('/ upload files', async () => {
        let fh = null;
        let fileBuffer;
        try {
            fh = await open('./ReadMe.md');
            const fileContent = await fh.readFile({ encoding: 'utf8' });
            fileBuffer = Buffer.from(fileContent);
        } finally {
            await fh?.close();
        }

        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('Authorization', `Bearer ${token ?? ''}`)
            .attach('files', fileBuffer, 'testfile.txt')
            .field('year', '2023')
            .field('month', '01')
            .expect(201)
            .expect((res: Response & { body: { message: string } }) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toBe('Files uploaded successfully');
            });
    });
});
