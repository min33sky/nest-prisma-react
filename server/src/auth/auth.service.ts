import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/prisma/user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto);
  }
}
