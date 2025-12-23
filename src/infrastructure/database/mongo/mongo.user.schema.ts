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
}

export type MongoUserDocument = MongoUser & Document;
export const MongoUserSchema = SchemaFactory.createForClass(MongoUser);
