import { IsBoolean, IsEnum, IsObject, IsString } from 'class-validator';

export class UpdateUserPreferenceDto {
  @IsBoolean()
  marketing?: boolean;

  @IsBoolean()
  newsletter?: boolean;

  @IsBoolean()
  updates?: boolean;

  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency?: 'daily' | 'weekly' | 'monthly' | 'never';

  @IsObject()
  channels?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };

  @IsString()
  timezone?: string;
}
