import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { BoardRepository } from 'src/prisma/board.repository';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards() {
    return this.boardRepository.getAllBoards();
  }

  createBoard(createBoardDto: CreateBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: string) {
    const board = this.boardRepository.getBoardById(id);
    return board;
  }

  deleteBoard(id: string) {
    return this.boardRepository.deleteBoard(id);
  }

  updateBoard(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.updateBoard(id, updateBoardDto);
  }
}
