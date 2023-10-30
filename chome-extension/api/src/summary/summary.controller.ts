import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SummaryService } from './summary.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SummaryDto } from './dto/create-summary.dto';
import { User } from 'src/users/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Summary')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'summary',
  version: '1',
})
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSummary(
    @Body() summaryDto: SummaryDto,
    @User() user: UserEntity,
  ) {
    return await this.summaryService.generateSummary(summaryDto.text, user);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  async getSummary(@User() user: UserEntity) {
    const summaries = await this.summaryService.findAll({ userId: user.id });

    summaries.map((item) => (item.id = item.id?.toString()));
    return {
      summary: summaries,
    };
  }
}
