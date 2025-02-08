import { Controller, Post, Body } from '@nestjs/common';
import {
  FindSimilarServiceMovies,
  FindSimilarServiceBooks,
} from './find-similar.service';

@Controller('api/search')
export class FindSimilarController {
  constructor(
    private readonly findSimilarMoviesService: FindSimilarServiceMovies,
    private readonly findSimilarBooksService: FindSimilarServiceBooks,
  ) {}

  @Post('/movies')
  findSimilarMovies(@Body('text') text: string) {
    return this.findSimilarMoviesService.findMostSimilarMovies(text);
  }

  @Post('/books')
  findSimilarBooks(@Body('text') text: string) {
    return this.findSimilarBooksService.findMostSimilarBooks(text);
  }
}
