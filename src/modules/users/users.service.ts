import { InMemoryDB } from './../../utils/InMemoryDB';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from './model/user';
import { getValidatedEntity } from 'src/utils/utils';
@Injectable()
export class UsersService {
  db: typeof InMemoryDB;
  constructor() {
    this.db = InMemoryDB;
  }

  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('body does not contain required fields');
    }

    const timestamp = +new Date();
    const newUser: User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
    };
    this.db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const copyDb = Object.assign({}, this.db);
    console.log(copyDb);
    return getValidatedEntity(id, copyDb.users, 'User');
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const currentUser = getValidatedEntity(id, this.db.users, 'User');
    if (updatePasswordDto.oldPassword !== currentUser.password) {
      throw new ForbiddenException('Old password is wrong');
    } else {
      currentUser.password = updatePasswordDto.newPassword;
    }
    return currentUser;
  }

  remove(id: string) {
    getValidatedEntity(id, this.db.users, 'User');
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
