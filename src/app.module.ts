import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { CsvService } from './csv.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Yüklenen dosyaların kaydedileceği klasör
    }),
  ],
  controllers: [DataController],
  providers: [DataService, CsvService, PrismaService],
})
export class AppModule {}
