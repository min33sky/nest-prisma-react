import { BoardStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty({})
  title: string;

  @IsNotEmpty({})
  description: string;

  @IsEnum(BoardStatus)
  status: BoardStatus;
}
