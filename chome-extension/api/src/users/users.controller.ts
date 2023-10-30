import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto) {
    return this.usersService.create(createProfileDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: id });
  }
}
