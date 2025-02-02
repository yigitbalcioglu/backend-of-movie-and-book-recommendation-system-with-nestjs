import { Controller, Post, Body } from '@nestjs/common';
import { FindSimilarService } from './find-similar.service';

@Controller('find-similar')
export class FindSimilarController {
  constructor(private readonly findSimilarService: FindSimilarService) {}

  @Post()
  async findSimilar(@Body("text") text: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //texti döndürsün
    return text;
    //return this.findSimilarService.findMostSimilarMovie(text);
  }
}
