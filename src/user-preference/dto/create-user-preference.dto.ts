import { IsBoolean, IsString, IsEnum, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for Channels
class NotificationChannelsDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

// DTO for Preferences
class UserPreferencesDto {
  @IsBoolean()
  marketing: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsBoolean()
  updates: boolean;

  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @ValidateNested()
  @Type(() => NotificationChannelsDto)
  channels: NotificationChannelsDto;
}

// Main DTO
export class CreateUserPreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => UserPreferencesDto)
  preferences: UserPreferencesDto;

  @IsString()
  timezone: string;
}
