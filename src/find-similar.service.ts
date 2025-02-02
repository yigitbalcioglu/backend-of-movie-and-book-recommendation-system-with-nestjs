import { Injectable } from "@nestjs/common";
import { PrismaService } from './prisma.service';
import { pipeline } from '@xenova/transformers';

@Injectable()
export class FindSimilarService {
  constructor(private prisma: PrismaService) {}

  async findMostSimilarMovie(text: string) {
    // 🔹 1. Transformer Modelini Yükle ve Embedding Hesapla
    const embedder = await pipeline(
      'feature-extraction',
      'Xenova/paraphrase-multilingual-MiniLM-L12-v2',
    );
    const inputEmbedding = await embedder(text, {
      pooling: 'mean',
      normalize: true,
    });

    // 🔹 2. Veritabanındaki Filmleri ve Embeddinglerini Çek
    const movies = await this.prisma.movie.findMany();

    // bestMovie bir string olsun
    let bestMovie = '';
    let bestSimilarity = -1;

    for (const movie of movies) {
      const movieEmbedding = JSON.parse(movie.embedding); // JSONB'den Float[] olarak çek
      
      // 🔹 3. Kosinüs Benzerliği Hesapla
      const similarity = this.cosineSimilarity(inputEmbedding, movieEmbedding);

      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMovie = movie.film;
      }
    }

    return { movie: bestMovie, similarity: bestSimilarity };
  }

  // 🔹 Kosinüs Benzerliği Hesaplama Fonksiyonu
  cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    return dotProduct / (magnitudeA * magnitudeB);
  }
}
