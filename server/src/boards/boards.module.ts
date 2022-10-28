import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], //? AuthModule에서 Export하는 어떤 것도 사용가능하다
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
