import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto'; // This should point to the new file
import { UserPreferenceService } from './user-preference.service'; // Make sure it's correct

@Controller('api/preferences')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}
  
    @Post()
    async createPreference(@Body() createDto: CreateUserPreferenceDto) {
      return this.userPreferenceService.createPreference(createDto);
    }
  
    @Get(':userId')
    async getPreference(@Param('userId') userId: string) {
      return this.userPreferenceService.getPreference(userId);
    }
  
    @Patch(':userId')
    async updatePreference(
      @Param('userId') userId: string,
      @Body() updateDto: UpdateUserPreferenceDto,
    ) {
      return this.userPreferenceService.updatePreference(userId, updateDto);
    }
  
    @Delete(':userId')
    async deletePreference(@Param('userId') userId: string) {
      return this.userPreferenceService.deletePreference(userId);
    }
  }
  