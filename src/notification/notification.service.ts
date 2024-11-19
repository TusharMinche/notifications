import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';


@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationLog.name)
    private readonly notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(sendDto: SendNotificationDto) {
    // Simulate sending a notification
    const status = Math.random() > 0.2 ? 'sent' : 'failed'; // 80% success rate
    const log = new this.notificationLogModel({
      ...sendDto,
      status,
      sentAt: status === 'sent' ? new Date() : undefined,
      failureReason: status === 'failed' ? 'Simulated failure' : undefined,
    });
    return log.save();
  }

  async getLogs(userId: string) {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getStats() {
    const total = await this.notificationLogModel.countDocuments().exec();
    const sent = await this.notificationLogModel
      .countDocuments({ status: 'sent' })
      .exec();
    const failed = await this.notificationLogModel
      .countDocuments({ status: 'failed' })
      .exec();
    return { total, sent, failed };
  }
}
