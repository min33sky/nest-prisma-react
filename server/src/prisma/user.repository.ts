import {
  Injectable,
  OnModuleInit,
  INestApplication,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  /**
   * 회원 가입
   */
  async createUser({ username, password }: AuthCredentialDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      return await this.user.create({
        data: {
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Username already exists');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async findUserByUsername(username: string) {
    const user = await this.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true, // TODO: password 필드 제외한 함수를 따로 만들어서 사용하는게 나을듯. (인증용이랑 정보제공용이랑 구별)
        boards: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
