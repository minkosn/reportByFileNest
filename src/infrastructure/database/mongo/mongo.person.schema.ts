import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MongoUser } from './mongo.user.schema';

@Schema({ collection: 'person' })
export class MongoPerson {
    @Prop()
    id: number;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    birth_date: Date;

    @Prop()
    inserted_on: Date;

    @Prop()
    updated_on: Date;

    @Prop()
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MongoUser' })
    fk_user_id: MongoUser;

    constructor() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.birth_date = new Date();
        this.inserted_on = new Date();
        this.updated_on = new Date();
        this.status = '';
        this.fk_user_id = new MongoUser();
    }
}

export type MongoPersonDocument = mongoose.HydratedDocument<MongoPerson>;
export const MongoPersonSchema = SchemaFactory.createForClass(MongoPerson);
