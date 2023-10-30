import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Will Smith' })
  @IsNotEmpty()
  name: string;
}
