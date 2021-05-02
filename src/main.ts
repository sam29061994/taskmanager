import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose'],
  });
  app.use(helmet());
  app.enableCors();
  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(`Application is listening on port ${port}`);
}
bootstrap();
