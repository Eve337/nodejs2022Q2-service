import { userSchema } from './../../database/entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([userSchema])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
