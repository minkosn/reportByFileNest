import { Inject, Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PG_CONNECTION } from '../infrastructure/database/database.providers';
// import { MailerService } from '../mailer/mailer.service'; // To be created
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  private readonly TOKEN_RESET_TYPE = 'reset_password';

  constructor(
    @Inject(PG_CONNECTION) private db: Pool,
    private jwtService: JwtService,
    // private mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, firstName, lastName, birthDate } = registerDto;
    const { rows: users } = await this.db.query('SELECT * FROM "user".users WHERE user_name = $1', [username]);

    if (users.length > 0) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let outPersonId; // In NestJS, we would handle this differently, perhaps returning the ID from the procedure.

    try {
      await this.db.query('CALL "user".proc_add_customer($1, $2, $3, $4, $5, $6, $7)', [
        firstName,
        lastName,
        email,
        birthDate,
        username,
        hashedPassword,
        outPersonId,
      ]);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string; userId: any; }> {
    const { username, password } = loginDto;
    const { rows } = await this.db.query('SELECT * FROM "user".users WHERE user_name = $1', [username]);
    const user = rows[0];

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    return { token, userId: user.id };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email } = resetPasswordDto;
    const userResult = await this.db.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
    const userId = userResult?.rows[0]?.user_id;

    if (!userId) {
      throw new NotFoundException('User not found for the provided email');
    }

    const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
    await this.db.query('CALL "user".proc_add_token($1, $2, $3)', [this.TOKEN_RESET_TYPE, userId, token]);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    const resetLink = `${frontendUrl}/validate-token?token=${token}`;

    console.log(`Password reset link: ${resetLink}`);
    // await this.mailerService.sendMail({ to: email, subject: 'Password Reset', text: `Click this link to reset your password: ${resetLink}` });
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{ message: string; }> {
    const { token, newPassword, userId } = updatePasswordDto;
    try {
      const decoded = this.jwtService.verify(token);
      const { rows: resetTokens } = await this.db.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
        this.TOKEN_RESET_TYPE,
        userId,
        null,
        null,
        token,
      ]);

      if (resetTokens.length === 0) {
        throw new UnauthorizedException('Token not found by the user!');
      }

      const dbToken = this.jwtService.verify(resetTokens[0]?.token_user);
      if (dbToken.email !== decoded.email) {
        throw new UnauthorizedException('Invalid data in the token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.db.query('UPDATE "user".users SET user_password = $1 WHERE id = $2', [hashedPassword, userId]);
      await this.db.query('DELETE FROM "user".token WHERE "user" = $1', [userId]);

      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getUserById(id: any): Promise<any> {
    const { rows } = await this.db.query('SELECT id, user_name FROM "user".users WHERE id = $1', [id]);
    if (rows.length === 0) {
      throw new NotFoundException('User not found');
    }
    return rows[0];
  }

  async verifyResetPasswordToken(token: string): Promise<{ userId: any; }> {
    try {
      const decoded = this.jwtService.verify(token);
      const { email } = decoded;

      const { rows: resetTokens } = await this.db.query('SELECT * FROM "user".fn_get_token($1, $2, $3, $4, $5)', [
        this.TOKEN_RESET_TYPE,
        null,
        null,
        null,
        token,
      ]);

      if (resetTokens.length === 0) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      const userResult = await this.db.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
      const userId = userResult?.rows[0]?.user_id;

      if (!userId) {
        throw new NotFoundException('User not found for the provided email');
      }

      return { userId };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
