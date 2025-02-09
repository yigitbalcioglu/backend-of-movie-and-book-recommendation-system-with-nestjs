import { Controller, Post, Body } from '@nestjs/common';
import { SaveMessagesService } from './save-messages.service';

@Controller('api/save')
export class SaveMessagesController {
  constructor(private readonly saveMessagesService: SaveMessagesService) {}

  @Post('/message')
  async saveMessage(
    @Body('userMessage') userMessage: string,
    @Body('systemMessage') systemMessage: string,
    @Body('userId') userId: string,
    @Body('convName') convName: string,
    @Body('conversationId') conversationId: string, // Frontend'den gelen conversationId (0 olabilir)
  ) {
    return await this.saveMessagesService.saveMessages(
      userMessage,
      systemMessage,
      userId,
      convName,
      conversationId,
    );
  }
}
