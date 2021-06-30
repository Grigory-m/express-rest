import { Body, Controller, Get, HttpCode, Param, Post, Put, Delete, HttpStatus } from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Board[]> {
    const boards = await this.boardsService.findAll();
    return boards;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id:string): Promise<Board | void> {
    const board = await this.boardsService.findOne(id);
    return board;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board | void> {    
    const board = await this.boardsService.create(createBoardDto);
    return board;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<Board | void> {
    const board = await this.boardsService.update(id, updateBoardDto);
    return board;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.boardsService.remove(id);
    return null;
  }

}