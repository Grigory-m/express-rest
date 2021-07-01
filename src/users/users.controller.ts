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
  Response,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IUser[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(
    @Response() res,
    @Param('id') id: string
  ): Promise<IUser | void> {
    try {
      const user = await this.usersService.findOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser | void> {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUser | void> {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return null;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
