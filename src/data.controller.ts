import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('upload-books')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBooks(@UploadedFile() file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const filePath = file.path; // Dosya yolu
    await this.dataService.saveBooksFromCsv(filePath);
    return {
      message: 'Books CSV data successfully uploaded and saved to database.',
    };
  }

  @Post('upload-movies')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMovies(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('Dosya yüklenmedi!');
      }

      const filePath = file.path; // Dosya yolu
      await this.dataService.saveMoviesFromCsv(filePath);
  
      return {
        message: 'Movies CSV data successfully uploaded and saved to database.',
      };
    } catch (error) {
      console.error('UploadMovies hata:', error);

      return {
        message: 'Movies CSV upload failed!',
        error: error.message || 'Bilinmeyen bir hata oluştu',
      };
    }
  }
}
