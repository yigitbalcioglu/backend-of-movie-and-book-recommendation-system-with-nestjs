import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { pipeline, Tensor } from '@xenova/transformers';

@Injectable()
export class FindSimilarService {
  constructor(private prisma: PrismaService) {}

  async findMostSimilarMovies(text: string) {
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

    // 🔹 3. Benzerlikleri Hesapla ve En Yüksek 5 Filmi Bul
    const moviesWithSimilarity = movies.map((movie) => {
      const similarity = this.cosineSimilarity(inputEmbedding, movie.embedding);
      return {
        ...movie,
        similarity,
      };
    });

    // Benzerliğe göre sırala ve en yüksek 5 filmi al
    const top5Movies = moviesWithSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map((movie) => {
        // Embedding özelliğini çıkar ve film bilgilerini döndür
        const { embedding, ...movieInfo } = movie;
        return movieInfo;
      });

    return { movies: top5Movies };
  }

  // 🔹 Kosinüs Benzerliği Hesaplama Fonksiyonu
  cosineSimilarity(inputEmbedding: Tensor, movieEmbedding: number[]): number {
    // movieEmbedding'i Tensor'e dönüştür
    const movieTensor = new Tensor('float32', movieEmbedding, [
      movieEmbedding.length,
    ]);

    // inputEmbedding ve movieTensor'dan verileri alın
    const inputData = Array.from(inputEmbedding.data as Float32Array);
    const movieData = Array.from(movieTensor.data as Float32Array);

    // Dot product hesapla
    const dotProduct = inputData.reduce(
      (sum, val, i) => sum + val * movieData[i],
      0,
    );

    // Normları hesapla
    const normA = Math.sqrt(inputData.reduce((sum, val) => sum + val ** 2, 0));
    const normB = Math.sqrt(movieData.reduce((sum, val) => sum + val ** 2, 0));

    // Kosinüs benzerliğini hesapla
    const similarity = dotProduct / (normA * normB);

    return similarity;
  }
}
