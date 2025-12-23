
export class User {
    constructor(
        public id: number,
        public user_name: string,
        public user_password: string,
        public user_inserted_on: Date,
        public userupdated_on: Date,
        public status: string
        //private user_role: string,
    ) {}
    
    getId(): number {
        return this.id;
    }
    

}