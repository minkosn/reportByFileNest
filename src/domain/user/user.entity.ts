
export class User {
    constructor(
        private id: number,
        private user_name: string,
        private user_password: string,
        private user_inserted_on: Date,
        private userupdated_on: Date,
        private status: string
        //private user_role: string,
    ) {

    }
}