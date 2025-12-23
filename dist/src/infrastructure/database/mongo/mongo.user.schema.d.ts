import { Document } from 'mongoose';
export declare class MongoUser {
    id: number;
    user_name: string;
    user_password: string;
    user_inserted_on: Date;
    userupdated_on: Date;
    status: string;
}
export type MongoUserDocument = MongoUser & Document;
export declare const MongoUserSchema: import("mongoose").Schema<MongoUser, import("mongoose").Model<MongoUser, any, any, any, Document<unknown, any, MongoUser, any, import("mongoose").DefaultSchemaOptions> & MongoUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, MongoUser>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<number, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    user_name?: import("mongoose").SchemaDefinitionProperty<string, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    user_password?: import("mongoose").SchemaDefinitionProperty<string, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    user_inserted_on?: import("mongoose").SchemaDefinitionProperty<Date, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    userupdated_on?: import("mongoose").SchemaDefinitionProperty<Date, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, MongoUser, Document<unknown, {}, MongoUser, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & MongoUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}, MongoUser>;
