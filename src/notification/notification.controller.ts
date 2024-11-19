import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';


@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/send')
  async sendNotification(@Body() sendDto: SendNotificationDto) {
    return this.notificationService.sendNotification(sendDto);
  }

  @Get(':userId/logs')
  async getLogs(@Param('userId') userId: string) {
    return this.notificationService.getLogs(userId);
  }

  @Get('/stats')
  async getStats() {
    return this.notificationService.getStats();
  }
}
