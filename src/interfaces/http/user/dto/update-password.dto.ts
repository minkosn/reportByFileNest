import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly newPassword: string;
    
    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}

