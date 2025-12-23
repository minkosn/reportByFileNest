export declare class User {
    id: number;
    user_name: string;
    user_password: string;
    user_inserted_on: Date;
    userupdated_on: Date;
    status: string;
    constructor(id: number, user_name: string, user_password: string, user_inserted_on: Date, userupdated_on: Date, status: string);
    getId(): number;
}
