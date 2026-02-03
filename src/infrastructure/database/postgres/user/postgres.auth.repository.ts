import { AuthRepository, AddCustomer } from '../../../../domain/user/auth.repository';
import { PostgresAuthEntity } from './postgres.auth.entity';
import { Repository, DataSource } from 'typeorm';

export class PostgresAuthRepository implements AuthRepository {
    constructor(
        private readonly repo: Repository<PostgresAuthEntity>,
        private readonly dataSource: DataSource,
    ) {}  

    async addCustomer(newCustomer : AddCustomer): Promise<BigInteger> {
        const { firstName, lastName, email, birthDate, username, hashedPassword } = newCustomer;
        
        //let outPersonId: BigInteger;    
        
        const result = await this.repo.query('CALL "user".proc_add_customer($1, $2, $3, $4, $5, $6, $7)', [
            firstName,
            lastName,
            email,
            birthDate,
            username,
            hashedPassword,
            //outPersonId
        ]);

        return result[0]?.out_person_id;
    }

    async getUserIdByEmail(email: string): Promise<BigInteger> {
        const result = await this.repo.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
        return result[0]?.user_id;
    }

    async addTokenToUser(tokenType: string , userId: any, token: string): Promise<void> {
        await this.repo.query('CALL "user".proc_add_token($1, $2, $3)', [tokenType, userId, token]);
    }

    async getTokenUser(tokenType: string, userId: string, token: string): Promise<{token_user: string}[] | null> {
        return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            userId,
            null,
            null,
            token,
        ]);
    }

    async setPasswordAndClearResetToken(hashedPassword: string, userId: string): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query('UPDATE "user".users SET user_password = $1 WHERE id = $2', [hashedPassword, userId]);
            await queryRunner.query('DELETE FROM "user".token WHERE "user" = $1', [userId]);
            await queryRunner.commitTransaction();
        } catch (err: any) {
            await queryRunner.rollbackTransaction();
            throw {...err, type: 'DBError'};
        } finally {     
            await queryRunner.release();
        }    
    }

    async get_token(tokenType: string, token: string): Promise<{token_user: string}[] | null> {
        return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            null,
            null,
            null,
            token,
        ]);
    }
}