import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;  

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly password: string;  

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
    
    @IsOptional()
    @IsDateString()
    readonly birthDate?: string;
}