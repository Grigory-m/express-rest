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
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { toResponse } from '../common/to_response';
import { VerifyGuard } from '../guards/verify.guard';

@Controller('users')
@UseGuards(VerifyGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IUser[]> {
    const users = await this.usersService.findAll();
    return users.map(toResponse);
  }

  @Get(':id')
  async findOne(
    @Response() res,
    @Param('id') id: string
  ): Promise<IUser | void> {
    try {
      const user = await this.usersService.findOne(id);
      if (user) {
        res.status(HttpStatus.OK).json(toResponse(user));
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser | void> {
    try {
      const user = await this.usersService.create(createUserDto);
      if (user) {
        return toResponse(user);
      }
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
      if (user) {
        return toResponse(user);
      }
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
