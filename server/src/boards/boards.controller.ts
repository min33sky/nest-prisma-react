import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(AuthGuard()) //? 모든 핸들러에 AuthGuard()를 적용한다
export class BoardsController {
  private logger = new Logger('BoardsController');

  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(@GetUser() user: User) {
    this.logger.verbose(`User "${user.username}" retrieving all boards.`);
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDto) {
    return this.boardsService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateBoard(@Param('id') id: string, @Body() body: UpdateBoardDto) {
    return this.boardsService.updateBoard(id, body);
  }
}
