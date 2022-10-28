import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/prisma/user.repository';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      console.log('유저가 없어요 ㅠㅠㅠ');
      throw new UnauthorizedException();
    }

    delete user.password;

    /**
     ** Passport는 validate() 메서드의 반환값을 req.user에 저장한다.
     *? 그런데 이대로 끝내면 Request 객체에 user가 존재하지 않는다.
     *? 요청을 받는 핸들러에서 @UseGuards(AuthGuard()) 데코레이터를 사용해야 한다.
     */
    return user;
  }
}
