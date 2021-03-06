import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { Task } from '../tasks/task.entity';
import { Columns } from './column.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async findAll(): Promise<Board[]> {
    const boards = await this.boardsRepository.find();
    return boards;
  }

  async findOne(id: string): Promise<Board | void> {
    const board = await this.boardsRepository.findOne(id);
    return board;
  }

  async create(dto: CreateBoardDto): Promise<Board | void> {
    let board = new Board();
    const { columns } = dto;
    const newColumns: Columns[] = columns.map(
      (column: { title: string; order: number }) => {
        let newColumn = new Columns();
        newColumn.id = uuid();
        newColumn = { id: newColumn.id, ...column };
        return newColumn;
      }
    );
    board = { id: board.id, ...dto, columns: newColumns };
    const newBoard = await this.boardsRepository.save(board);
    return newBoard;
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board | void> {
    let updatedBoard = await this.boardsRepository.findOne(id);
    if (updatedBoard) {
      updatedBoard = { id: updatedBoard.id, ...dto };
      await this.boardsRepository.save(updatedBoard);
    }
    return updatedBoard;
  }

  async remove(id: string): Promise<void> {
    const board = await this.boardsRepository.findOne(id);
    if (board) {
      await this.boardsRepository.remove(board);
      const tasks = await this.tasksRepository.find({ boardId: id });
      await Promise.all(
        tasks.map(async (task) => {
          const promise = await this.tasksRepository.remove(task);
          return promise;
        })
      );
    }
  }
}
