import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { getValidatedEntity } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { userSchema } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userSchema)
    private readonly usersRepository: Repository<userSchema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await getValidatedEntity(id, this.usersRepository, 'User');
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const currentUser = await getValidatedEntity(
      id,
      this.usersRepository,
      'User',
    );
    if (updatePasswordDto.oldPassword !== currentUser.password) {
      throw new ForbiddenException('Old password is wrong');
    }
    currentUser.password = updatePasswordDto.newPassword;
    return await this.usersRepository.save(currentUser);
  }

  async remove(id: string) {
    getValidatedEntity(id, this.usersRepository, 'User');
    await this.usersRepository.delete(id);
  }
}
