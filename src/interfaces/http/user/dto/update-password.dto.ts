import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly newPassword: string;
    
    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}

