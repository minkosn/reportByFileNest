// src/infrastructure/database/mongo/mongo.user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class MongoUser {
    @Prop()
    id: number;
    
    @Prop()
    user_name: string;
    
    @Prop()
    user_password: string;
    
    @Prop()
    user_inserted_on: Date;
      
    @Prop()
    userupdated_on: Date;
      
    @Prop()
    status: string;
    constructor() {
        this.id = 0;
        this.user_name = '';
        this.user_password = '';
        this.user_inserted_on = new Date();
        this.userupdated_on = new Date();
        this.status = '';
    }
}

export type MongoUserDocument = MongoUser & Document;
export const MongoUserSchema = SchemaFactory.createForClass(MongoUser);
