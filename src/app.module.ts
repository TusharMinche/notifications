import { Module, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { NotificationModule } from './notification/notification.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserPreferenceModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      Logger.error('MONGO_URI is not defined in the environment variables');
      process.exit(1);
    }
  }

  async onApplicationBootstrap() {
    // Listen to Mongoose connection events
    mongoose.connection.on('connected', () => {
      Logger.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (error) => {
      Logger.error('Failed to connect to MongoDB', error.stack);
      process.exit(1);
    });
  }
}