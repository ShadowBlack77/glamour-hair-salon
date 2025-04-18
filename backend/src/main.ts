import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = '/api/v1';

  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
