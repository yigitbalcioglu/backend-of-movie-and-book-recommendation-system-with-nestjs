import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Conversations, Messages } from '@prisma/client'; // Prisma modelleri

@Injectable()
export class SaveMessagesService {
  constructor(private prisma: PrismaService) {}

  async saveMessages(
    userMessage: string,
    systemMessage: string,
    userId: string,
    convName: string,
    conversationId: string,
  ): Promise<{ conversationId: string }> {
    if (conversationId === '0') {
      // Yeni bir konuşma oluştur ve ilk mesajı ekle
      const newConversation: Conversations = await this.prisma.conversations.create({
        data: {
          id: uuidv4(),
          user_id: userId,
          conv_name: convName,
          messages: {
            create: [
              {
                system_message: systemMessage,
                user_message: userMessage,
                user_id: userId,
              },
            ],
          },
        },
      });

      return { conversationId: newConversation.id };
    } 
    
    // Eğer conversationId 0 değilse, mevcut konuşmayı getir
    const existingConversation: Conversations | null = await this.prisma.conversations.findUnique({
      where: { id: conversationId },
    });

    if (!existingConversation) {
      throw new Error('Conversation not found');
    }

    // Yeni mesajı mevcut konuşmaya ekle
    await this.prisma.conversations.update({
      where: { id: conversationId },
      data: {
        messages: {
          create: {
            system_message: systemMessage,
            user_message: userMessage,
            user_id: userId,
          },
        },
      },
    });

    return { conversationId };
  }
}
