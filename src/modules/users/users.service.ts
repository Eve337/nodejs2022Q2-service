import { InMemoryDB } from './../../utils/InMemoryDB';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './model/user';
import { getValidatedEntity, removeEntity } from 'src/utils/utils';
@Injectable()
export class UsersService {
  db: typeof InMemoryDB;
  constructor() {
    this.db = InMemoryDB;
  }

  create(createUserDto: CreateUserDto) {
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
    return getValidatedEntity(id, this.db.users, 'User');
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
    this.db.users = removeEntity(id, this.db.users);
  }
}
