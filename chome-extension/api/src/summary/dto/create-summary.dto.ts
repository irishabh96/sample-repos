import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SummaryDto {
  @ApiProperty({ example: 'How to bake cake' })
  @IsNotEmpty()
  text: string;
}
