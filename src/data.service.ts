import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CsvService } from './csv.service';

interface BookRow {
  name: string;
  author: string;
  publisher: string;
  publication_year: string; // CSV'den string gelir, sayıya çevrilecek
  ISBN: string;
  book_type: string;
  explanation: string;
  book_img: string;
  embedding: string; // CSV'de string gelir, Float[] olacak
}

interface MovieRow {
  film: string;
  ozet: string;
  oyuncular: string;
  yönetmen: string;
  tür: string;
  vizyon: string; // Date formatına çevrilecek
  sure: string; // CSV'den string gelir, Int olacak
  embedding: string; // CSV'de string gelir, Float[] olacak
}

@Injectable()
export class DataService {
  constructor(
    private prisma: PrismaService,
    private csvService: CsvService,
  ) {}

  async saveBooksFromCsv(filePath: string): Promise<void> {
    const booksData: BookRow[] = await this.csvService.readCsv(filePath);

    for (const row of booksData) {
      await this.prisma.book.create({
        data: {
          name: row.name,
          author: row.author,
          publisher: row.publisher,
          publication_year: parseInt(row.publication_year, 10),
          ISBN: row.ISBN,
          book_type: row.book_type,
          explanation: row.explanation,
          book_img: row.book_img,
          embedding: JSON.parse(row.embedding) as number[], // Float[] olacak
        },
      });
    }
  }

  async saveMoviesFromCsv(filePath: string): Promise<void> {
    const moviesData: MovieRow[] = await this.csvService.readCsv(filePath);
    for (const row of moviesData) {
      await this.prisma.movie.create({
        data: {
          film: row.film,
          ozet: row.ozet,
          oyuncular: row.oyuncular,
          yönetmen: row.yönetmen,
          tür: row.tür,
          vizyon: row.vizyon,
          sure: row.sure,
          embedding: JSON.parse(row.embedding) as number[], // Float[] olacak
        },
      });
    }
  }
}
