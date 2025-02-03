import { Controller, Post, Body } from '@nestjs/common';
import { FindSimilarService } from './find-similar.service';

@Controller('api/search')
export class FindSimilarController {
  constructor(private readonly findSimilarService: FindSimilarService) {}

  @Post()
  findSimilar(@Body('text') text: string) {
    return this.findSimilarService.findMostSimilarMovies(text);
  }
}
