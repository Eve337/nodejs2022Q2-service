import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { getValidatedEntity, removeEntity } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { userSchema } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userSchema)
    private readonly usersTable: Repository<userSchema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const indx = await this.usersTable.insert(createUserDto);
    return await this.findOne(indx.identifiers[0].id);
  }

  async findAll() {
    return await this.usersTable.find();
  }

  async findOne(id: string) {
    return await getValidatedEntity(id, this.usersTable, 'User');
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const currentUser = await getValidatedEntity(id, this.usersTable, 'User');
    if (updatePasswordDto.oldPassword !== currentUser.password) {
      throw new ForbiddenException('Old password is wrong');
    }
    return await this.usersTable.save({ id: id, ...currentUser });
  }

  async remove(id: string) {
    getValidatedEntity(id, this.usersTable, 'User');
    await this.usersTable.delete(id);
  }
}
