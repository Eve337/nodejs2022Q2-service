import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class User {
  @IsString()
  readonly id: string; // uuid v4
  @IsString()
  readonly login: string;
  @IsString()
  @Exclude()
  password: string;
  @IsNumber()
  version: number;
  @IsNumber() // integer number, increments on update
  createdAt: Date | number;
  @IsNumber() // timestamp of creation
  updatedAt: Date | number; // timestamp of last update

  constructor(partial: Partial<User>) {
    partial.createdAt = partial.createdAt.valueOf();
    partial.updatedAt = partial.updatedAt.valueOf();
    Object.assign(this, partial);
  }
}
