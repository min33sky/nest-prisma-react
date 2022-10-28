import {
  Injectable,
  OnModuleInit,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { UpdateBoardDto } from 'src/boards/dto/update-board.dto';

@Injectable()
export class BoardRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async createBoard({ title, description, status }: CreateBoardDto) {
    const board = await this.board.create({
      data: {
        title,
        description,
        status,
      },
    });
    return board;
  }

  async getAllBoards() {
    const boards = await this.board.findMany();
    return boards;
  }

  async getBoardById(id: string) {
    const board = await this.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return board;
  }

  async updateBoard(id: string, updateBoardDto: UpdateBoardDto) {
    const { title, description, status } = updateBoardDto;
    const board = await this.board.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
      },
    });
    return board;
  }

  async deleteBoard(id: string) {
    const board = await this.board.delete({
      where: {
        id,
      },
    });
    return board;
  }
}
