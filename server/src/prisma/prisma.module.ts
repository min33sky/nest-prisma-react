import { Global, Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { PrismaService } from './prisma.service';
import { UserRepository } from './user.repository';

@Global()
@Module({
  providers: [PrismaService, BoardRepository, UserRepository],
  exports: [PrismaService, BoardRepository, UserRepository],
})
export class PrismaModule {}
