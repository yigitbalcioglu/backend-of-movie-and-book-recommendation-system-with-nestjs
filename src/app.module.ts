import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { CsvService } from './csv.service';
import { PrismaService } from './prisma.service';
import { FindSimilarController } from './find-similar.controller';
import {
  FindSimilarServiceBooks,
  FindSimilarServiceMovies,
} from './find-similar.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Yüklenen dosyaların kaydedileceği klasör
    }),
  ],
  controllers: [DataController, FindSimilarController],
  providers: [
    DataService,
    CsvService,
    PrismaService,
    FindSimilarServiceBooks,
    FindSimilarServiceMovies,
  ],
})
export class AppModule {}
