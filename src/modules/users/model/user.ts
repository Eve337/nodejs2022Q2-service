import { IsNumber, IsString } from 'class-validator';

export class User {
  @IsString()
  readonly id: string; // uuid v4
  @IsString()
  readonly login: string;
  @IsString()
  password: string;
  @IsNumber()
  version: number;
  @IsNumber() // integer number, increments on update
  createdAt: number;
  @IsNumber() // timestamp of creation
  updatedAt: number; // timestamp of last update
}
