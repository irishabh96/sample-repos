import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

import { IsNotExist } from '../../utils/validators/is-not-exists.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'Will Smith' })
  @IsNotEmpty()
  name: string | null;

  hash?: string | null;
}
