import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './model/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(await this.usersService.create(createUserDto));
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return new User(this.usersService.findOne(id));
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return new User(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
