import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepository: Repository<Summary>,
    private readonly openAIService: OpenaiService,
  ) {}

  async generateSummary(
    text: string,
    user: User,
  ): Promise<{ summary: Summary }> {
    const responseFromAI = await this.openAIService.getTextCompletion(text);

    const summary = await this.summaryRepository.save(
      this.summaryRepository.create({
        text,
        summary: responseFromAI,
        userId: user.id,
      }),
    );

    summary.id = summary.id?.toString();

    return { summary };
  }

  findAll(fields: EntityCondition<Summary>) {
    return this.summaryRepository.find({
      where: fields,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
