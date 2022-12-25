import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://uaiqttac:sIqevVUNDaN2DmO_ozBOxkFPMHsEiJKe@jackal.rmq.cloudamqp.com/uaiqttac',
      ],
      queue: 'notification_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);

  console.log(`App is running on port ${await app.getUrl()}`);
}

bootstrap();
