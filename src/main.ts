import { NestFactory } from '@nestjs/core'; // Import NestFactory
import { AppModule } from './app.module'; // Import AppModule
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Import Swagger-related modules

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Notification Preferences API')
    .setDescription('API for managing user notification preferences')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
