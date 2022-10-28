import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '@prisma/client';

@Injectable()
export class BoardStatusValidationPipe implements PipeTransform {
  /**
   *? Custom Pipe 연습용
   */

  private statusList = Object.values(BoardStatus);

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `"${value}" is an invalid status... 'PUBLIC' OR 'PRIVATE'`,
      );
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.statusList.indexOf(status);
    return idx !== -1;
  }
}
