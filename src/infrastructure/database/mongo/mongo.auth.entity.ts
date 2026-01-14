export class MongoAuthEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    username: string;
    hashedPassword: string;
    addCustomer(): bigint {
        return 1n;
    } 

}