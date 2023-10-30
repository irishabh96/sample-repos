import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

type JwtPayload = Pick<User, 'id' | 'email' | 'name'> & {
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public async validate(payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({ email: payload.email });
    if (!user) throw new UnauthorizedException();

    return payload;
  }
}
