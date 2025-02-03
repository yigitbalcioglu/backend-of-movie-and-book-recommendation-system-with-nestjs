import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS'u aç
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js frontend adresi
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Eğer çerez kullanıyorsan bunu aç
  });

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
