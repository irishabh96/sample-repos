import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';

import { OpenaiModule } from 'src/openai/openai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';

@Module({
  imports: [OpenaiModule, TypeOrmModule.forFeature([Summary])],
  providers: [SummaryService],
  controllers: [SummaryController],
})
export class SummaryModule {}
