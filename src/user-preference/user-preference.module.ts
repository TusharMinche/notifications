import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreference, UserPreferenceSchema } from './user-preference.schema';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceController } from './user-preference.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreference.name, schema: UserPreferenceSchema }]),
  ],
  controllers: [UserPreferenceController],
  providers: [UserPreferenceService],
})
export class UserPreferenceModule {}
