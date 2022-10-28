import { Global, Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, BoardRepository],
  exports: [PrismaService, BoardRepository],
})
export class PrismaModule {}
