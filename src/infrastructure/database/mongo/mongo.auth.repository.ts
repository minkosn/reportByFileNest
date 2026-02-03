import { AuthRepository, AddCustomer } from '../../../domain/user/auth.repository';
import { MongoAuthEntity } from './mongo.auth.entity';
import { Repository, DataSource } from 'typeorm';

export class MongoAuthRepository implements AuthRepository {
    constructor(
        private readonly repo: Repository<MongoAuthEntity>,
        private readonly dataSource: DataSource,
    ) {}  

    /*register(registerDto: RegisterDto): Promise<void> {
        throw new Error('Method not implemented.');
    };
        
    login(loginDto: LoginDto): Promise<{ token: string; userId: any; }> {
        throw new Error('Method not implemented.');
    };
    
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        throw new Error('Method not implemented.');
    };
    
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{ message: string; }> {
        throw new Error('Method not implemented.');
    };
    
    getUserById(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    };
    
    verifyResetPasswordToken(token: string): Promise<{ userId: any; }> {
        throw new Error('Method not implemented.');
    };
    */

    async addCustomer(newCustomer : AddCustomer): Promise<BigInteger> {
        const { firstName, lastName, email, birthDate, username, hashedPassword } = newCustomer;
        /*
        let outPersonId: BigInteger;    
         TO DO: Implement the stored procedure call for MongoDB
        await this.repo.query('CALL "user".proc_add_customer($1, $2, $3, $4, $5, $6, $7)', [
            firstName,
            lastName,
            email,
            birthDate,
            username,
            hashedPassword,
            outPersonId
        ]);
        
        return outPersonId;
        */
       throw new Error('Method not implemented.');
    }

    async getUserIdByEmail(email: string): Promise<BigInteger> {
        // TO DO: Implement the stored procedure call for MongoDB
        return 0n as unknown as BigInteger;
        //const result = await this.repo.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
        //return result?.rows[0]?.user_id;
    }

    async addTokenToUser(tokenType: string , userId: any, token: string): Promise<void> {
        // TO DO: Implement the stored procedure call for MongoDB
        //await this.repo.query('CALL "user".proc_add_token($1, $2, $3)', [tokenType, userId, token]);
    }

    async getTokenUser(tokenType: string, userId: string, token: string): Promise<{token_user: string}[] | null> {
        /*return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            userId,
            null,
            null,
            token,
        ]);*/
        return null;
    }

    async setPasswordAndClearResetToken(hashedPassword: string, userId: string): Promise<void> {
        /*const queryRunner = this.dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query('UPDATE "user".users SET user_password = $1 WHERE id = $2', [hashedPassword, userId]);
            await queryRunner.query('DELETE FROM "user".token WHERE "user" = $1', [userId]);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw {...err, type: 'DBError'};
        } finally {     
            await queryRunner.release();
        }    
            */
        return;   
    }

    async get_token(tokenType: string, token: string): Promise<{token_user: string}[] | null> {
        /*
        return this.repo.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
            tokenType,
            null,
            null,
            null,
            token,
        ]);
        */
        return null;
    }
}