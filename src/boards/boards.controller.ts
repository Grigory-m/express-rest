import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { VerifyGuard } from '../guards/verify.guard';

@Controller('boards')
@UseGuards(VerifyGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Board[]> {
    const boards = await this.boardsService.findAll();
    return boards;
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<Board | void> {
    try {
      const board = await this.boardsService.findOne(id);
      if (board) {
        res.status(HttpStatus.OK).json(board);
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board | void> {
    try {
      const board = await this.boardsService.create(createBoardDto);
      return board;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<Board | void> {
    try {
      const board = await this.boardsService.update(id, updateBoardDto);
      return board;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.boardsService.remove(id);
      return null;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
