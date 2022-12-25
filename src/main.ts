import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  app.listen();
}

bootstrap();
