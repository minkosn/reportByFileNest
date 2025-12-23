// src/infrastructure/database/mongo/mongo.strategy.ts
import { Injectable } from '@nestjs/common';
import { DatabaseStrategy } from '../db-strategy.interface';

@Injectable()
export class MongoStrategy implements DatabaseStrategy {
  async connect() {
    // Usually handled by MongooseModule.forRoot
  }

  async disconnect() {
    // Usually handled by Nest lifecycle
  }
}
