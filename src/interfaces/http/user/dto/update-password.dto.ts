import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly newPassword: string;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;

    constructor() {
        this.token = '';
        this.newPassword = '';
        this.userId = 0;
    }
}
