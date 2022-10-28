import { BoardStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional({})
  title: string;

  @IsOptional({})
  description: string;

  @IsEnum(BoardStatus, {
    always: false,
    message: `status must be either 'PUBLIC' or 'PRIVATE'`,
  })
  status: BoardStatus;
}
