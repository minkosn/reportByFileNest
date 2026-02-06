export class PostgresAuthEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    username: string;
    hashedPassword: string;
    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.birthDate = '';
        this.username = '';
        this.hashedPassword = '';
    }
    addCustomer(): bigint {
        return 1n;
    }
}
