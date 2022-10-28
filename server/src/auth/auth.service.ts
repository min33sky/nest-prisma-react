import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/prisma/user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn({ username, password }: AuthCredentialDto) {
    const user = await this.userRepository.findUserByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }
}
