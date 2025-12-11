"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const database_providers_1 = require("../database/database.providers");
let AuthService = class AuthService {
    constructor(db, jwtService) {
        this.db = db;
        this.jwtService = jwtService;
        this.TOKEN_RESET_TYPE = 'reset_password';
    }
    async register(registerDto) {
        const { username, password, email, firstName, lastName, birthDate } = registerDto;
        const { rows: users } = await this.db.query('SELECT * FROM "user".users WHERE user_name = $1', [username]);
        if (users.length > 0) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let outPersonId;
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
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw new common_1.InternalServerErrorException('Error registering user');
        }
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const { rows } = await this.db.query('SELECT * FROM "user".users WHERE user_name = $1', [username]);
        const user = rows[0];
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id };
        const token = this.jwtService.sign(payload);
        return { token, userId: user.id };
    }
    async resetPassword(resetPasswordDto) {
        const { email } = resetPasswordDto;
        const userResult = await this.db.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
        const userId = userResult?.rows[0]?.user_id;
        if (!userId) {
            throw new common_1.NotFoundException('User not found for the provided email');
        }
        const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
        await this.db.query('CALL "user".proc_add_token($1, $2, $3)', [this.TOKEN_RESET_TYPE, userId, token]);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
        const resetLink = `${frontendUrl}/validate-token?token=${token}`;
        console.log(`Password reset link: ${resetLink}`);
    }
    async updatePassword(updatePasswordDto) {
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
                throw new common_1.UnauthorizedException('Token not found by the user!');
            }
            const dbToken = this.jwtService.verify(resetTokens[0]?.token_user);
            if (dbToken.email !== decoded.email) {
                throw new common_1.UnauthorizedException('Invalid data in the token');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.db.query('UPDATE "user".users SET user_password = $1 WHERE id = $2', [hashedPassword, userId]);
            await this.db.query('DELETE FROM "user".token WHERE "user" = $1', [userId]);
            return { message: 'Password updated successfully' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async getUserById(id) {
        const { rows } = await this.db.query('SELECT id, user_name FROM "user".users WHERE id = $1', [id]);
        if (rows.length === 0) {
            throw new common_1.NotFoundException('User not found');
        }
        return rows[0];
    }
    async verifyResetPasswordToken(token) {
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
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            const userResult = await this.db.query('SELECT get_user_id_by_email as user_id FROM "user".get_user_id_by_email($1)', [email]);
            const userId = userResult?.rows[0]?.user_id;
            if (!userId) {
                throw new common_1.NotFoundException('User not found for the provided email');
            }
            return { userId };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_providers_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [pg_1.Pool, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map