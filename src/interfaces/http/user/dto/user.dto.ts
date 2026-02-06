import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3) //@MinLength(6)
    readonly password: string;

    constructor() {
        this.username = '';
        this.password = '';
    }
}
