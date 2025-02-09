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
import { SaveMessagesService } from './save-messages.service';
import { SaveMessagesController } from './save-messages.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Yüklenen dosyaların kaydedileceği klasör
    }),
  ],
  controllers: [DataController, FindSimilarController, SaveMessagesController],
  providers: [
    DataService,
    CsvService,
    PrismaService,
    FindSimilarServiceBooks,
    FindSimilarServiceMovies,
    SaveMessagesService,
  ],
})
export class AppModule {}
