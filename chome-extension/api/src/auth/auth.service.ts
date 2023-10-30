import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    user.id = user.id?.toString();

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return { token, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async register(
    dto: AuthRegisterLoginDto,
  ): Promise<{ token: string; user: User }> {
    // intentionally
    const userExists = await this.usersService.findOne({ email: dto.email });

    if (userExists) {
      return this.validateLogin(dto);
    }

    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
      name: dto.name,
    });

    user.id = user.id?.toString();

    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return { token, user };
  }

  async me(user: User): Promise<User> {
    return await this.usersService.findOne({
      id: user.id,
    });
  }
}
