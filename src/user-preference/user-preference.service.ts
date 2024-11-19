import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './user-preference.schema';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  async createPreference(createDto: CreateUserPreferenceDto) {
    const newPreference = new this.userPreferenceModel(createDto);
    return newPreference.save();
  }

  async getPreference(userId: string) {
    const preference = await this.userPreferenceModel.findOne({ userId }).exec();
    if (!preference) {
      throw new NotFoundException(`User Preference for ${userId} not found.`);
    }
    return preference;
  }

  async updatePreference(userId: string, updateDto: UpdateUserPreferenceDto) {
    const updatedPreference = await this.userPreferenceModel
      .findOneAndUpdate({ userId }, updateDto, { new: true })
      .exec();
    if (!updatedPreference) {
      throw new NotFoundException(`User Preference for ${userId} not found.`);
    }
    return updatedPreference;
  }

  async deletePreference(userId: string) {
    const result = await this.userPreferenceModel
      .deleteOne({ userId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User Preference for ${userId} not found.`);
    }
    return { message: `User Preference for ${userId} deleted.` };
  }
}
