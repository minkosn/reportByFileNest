import { AuthRepository, CreateUserParams } from '../../../../domain/user/auth.repository';
import { PostgresAuthEntity } from './postgres.auth.entity';
import { Repository, DataSource } from 'typeorm';

export class PostgresAuthRepository implements AuthRepository {
    constructor(
        private readonly repo: Repository<PostgresAuthEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async addCustomer(newCustomer: CreateUserParams): Promise<number> {
        const { firstName, lastName, email, birthDate, username, hashedPassword } = newCustomer;

        const result = await this.repo.query<{ person_id: number }[]>(
            'CALL "user".proc_add_customer($1, $2, $3, $4, $5, $6, $7)',
            [firstName, lastName, email, birthDate, username, hashedPassword, null],
        );

        if (result.length === 0) {
            throw new Error('Failed to add customer');
        }
        return result[0]?.person_id;
    }

    async getUserIdByEmail(email: string): Promise<number> {
        const result: { user_id: number }[] = await this.repo.query(
            'SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)',
            [email],
        );
        return result[0]?.user_id;
    }

    async addTokenToUser(tokenType: string, userId: number, token: string): Promise<void> {
        await this.repo.query('CALL "user".proc_add_token($1, $2, $3)', [tokenType, userId, token]);
    }

    async getTokenUser(tokenType: string, userId: number, token: string): Promise<{ token_user: string }[]> {
        return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            userId,
            null,
            null,
            token,
        ]);
    }

    async setPasswordAndClearResetToken(hashedPassword: string, userId: number): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query('UPDATE "user".users SET user_password = $1 WHERE id = $2', [
                hashedPassword,
                userId,
            ]);
            await queryRunner.query('DELETE FROM "user".token WHERE "user" = $1', [userId]);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();

            if (err instanceof Error) {
                Object.assign(err, { type: 'DBError' });
                throw err;
            }
            throw new Error('Unknown error during password reset transaction');
        } finally {
            await queryRunner.release();
        }
    }

    async getToken(tokenType: string, token: string): Promise<{ token_user: string }[]> {
        return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            null,
            null,
            null,
            token,
        ]);
    }
}
