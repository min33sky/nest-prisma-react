import {
  Injectable,
  OnModuleInit,
  INestApplication,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

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

  async createUser({ username, password }: AuthCredentialDto) {
    try {
      return await this.user.create({
        data: {
          username,
          password,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Username already exists');
        }
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
