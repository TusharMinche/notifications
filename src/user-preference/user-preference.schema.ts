import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserPreference extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    type: {
      marketing: Boolean,
      newsletter: Boolean,
      updates: Boolean,
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'] },
      channels: {
        email: Boolean,
        sms: Boolean,
        push: Boolean,
      },
    },
  })
  preferences: Record<string, any>;

  @Prop({ required: true })
  timezone: string;

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
