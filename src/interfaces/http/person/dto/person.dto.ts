import { IsDate, IsString } from 'class-validator';

export class PersonDto {
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsDate()
    birth_date: Date;
}